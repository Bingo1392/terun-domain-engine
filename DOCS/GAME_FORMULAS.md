# Herní vzorce a konstanty

Tento dokument obsahuje všechny vzorce a konkrétní číselné hodnoty potřebné pro implementaci simulace. Slouží jako doplněk k ostatním dokumentům a specifikuje přesné mechaniky.

---

## Ekonomické konstanty

### Základní sazby

| Konstanta | Hodnota | Popis |
|-----------|---------|-------|
| `BASE_FOOD_PER_CAPITA` | 2 kg/den | Denní potřeba jídla na osobu |
| `BASE_GROWTH_RATE` | 0.02 | Roční míra růstu populace (2%) |
| `BASE_MORTALITY_RATE` | 0.01 | Roční míra úmrtnosti (1%) |
| `BASE_TAX_RATE` | 0.10 | Základní daňová sazba (10%) |
| `MAX_TAX_RATE` | 0.50 | Maximální daňová sazba (50%) |
| `INFLATION_RATE` | 0.02 | Roční inflace (2%) |

### Měnový systém

| Měna | Hodnota v základní jednotce | Zkratka |
|------|----------------------------|---------|
| Zlatá mince | 400 | zl |
| Stříbrná mince | 20 | st |
| Měděná mince | 1 | mě |

```
1 zlatá = 20 stříbrných = 400 měděných
Ceny v dokumentaci jsou vždy v zlatých mincích.
```

### Přepočet vlivu na zlato

```
1 bod vlivu ≈ 10 zlatých (orientační hodnota)
Vliv nelze přímo nakoupit, pouze získat akcemi.
```

---

## Populační vzorce

### Základní růst osady

```typescript
function calculateHamletGrowth(hamlet: Hamlet, state: WorldState): number {
  // Základ podle velikosti osady
  const baseGrowth = getBaseGrowthBySize(hamlet.size);

  // Modifikátory
  const foodMod = calculateFoodModifier(hamlet);
  const controlMod = calculateControlModifier(hamlet);
  const tradeMod = calculateTradeModifier(hamlet);
  const terrainMod = calculateTerrainModifier(hamlet.hex);
  const waterMod = hamlet.hex.has_river || hamlet.hex.has_lake ? 1.1 : 1.0;
  const eventMod = getEventModifiers(hamlet);

  // Výpočet
  let growth = baseGrowth * foodMod * controlMod * tradeMod * terrainMod * waterMod * eventMod;

  // Limit změny
  return clamp(growth, -10, +10);
}
```

### Základní růst podle velikosti

| Velikost osady | Základní růst/rok |
|---------------|-------------------|
| wilderness | 0 |
| poor_village | +2 |
| village | +3 |
| prosperous_village | +2 |
| small_city | +1 |
| medium_city | +0.5 |
| large_city | +0.3 |
| huge_city | +0.2 |
| gargantuan_city | +0.1 |

*Větší osady rostou pomaleji, protože je těžší udržet infrastrukturu.*

### Modifikátor potravin

```typescript
function calculateFoodModifier(hamlet: Hamlet): number {
  const foodNeeded = getPopulation(hamlet) * BASE_FOOD_PER_CAPITA * 365;
  const foodAvailable = getFoodSupply(hamlet);
  const ratio = foodAvailable / foodNeeded;

  if (ratio >= 1.5) return 1.5;      // Hojnost: +5 růst
  if (ratio >= 1.2) return 1.2;      // Dostatek: +3 růst
  if (ratio >= 1.0) return 1.0;      // Přesně dost: +1 růst
  if (ratio >= 0.8) return 0.5;      // Mírný nedostatek: -3 růst
  if (ratio >= 0.5) return -1.0;     // Vážný nedostatek: -5 růst
  return -2.0;                        // Hladomor: -10 růst
}
```

### Modifikátor kontroly

```typescript
function calculateControlModifier(hamlet: Hamlet): number {
  const control = hamlet.control; // 0-100

  if (control >= 80) return 1.3;   // +3 růst
  if (control >= 60) return 1.1;   // +1 růst
  if (control >= 40) return 1.0;   // 0 růst
  if (control >= 20) return 0.5;   // -2 růst
  return -0.5;                      // -5 růst (anarchie)
}
```

### Modifikátor obchodu

```typescript
function calculateTradeModifier(hamlet: Hamlet): number {
  const tradeRoutes = countTradeRoutes(hamlet);
  const roadQuality = hamlet.hex.road_type;

  let bonus = 0;
  bonus += tradeRoutes * 0.5;          // +0.5 za každou obchodní trasu
  bonus += ROAD_BONUS[roadQuality];    // Viz tabulka níže

  return 1.0 + (bonus / 10); // Maximálně +30% růstu
}
```

| Typ cesty | Bonus k růstu |
|-----------|---------------|
| none | 0 |
| trail | +0.5 |
| dirt | +1 |
| paved | +2 |
| stone | +3 |

---

## Ekonomické vzorce

### Kompletní vzorec produkce

```typescript
function calculateProduction(deposit: Deposit, hamlet: Hamlet, domain: Domain, state: WorldState): number {
  const resource = RESOURCES[deposit.resource_key];

  // Základní výtěžnost
  const baseYield = resource.base_yield;

  // Modifikátory
  const qualityMod = 0.5 + (deposit.quality * 0.25);           // Kvalita 1-5 → 0.75-1.75
  const sizeMod = SIZE_MODIFIERS[deposit.size];                 // Viz RESOURCES.md
  const depletionMod = 1 - (deposit.depletion / 100);          // 0-100% vyčerpání
  const workerEfficiency = Math.min(deposit.workers_assigned / resource.optimal_workers, 1.0);
  const infraMod = INFRASTRUCTURE_MODIFIERS[deposit.infrastructure_level]; // Viz RESOURCES.md
  const terrainMod = getTerrainProductionMod(hamlet.hex.terrain_type, deposit.resource_key);
  const seasonMod = getSeasonModifier(state.date.season, deposit.resource_key);
  const randomMod = state.random.range(0.9, 1.1);              // ±10% náhoda

  // Finální výpočet
  return baseYield
    * qualityMod
    * sizeMod
    * depletionMod
    * workerEfficiency
    * infraMod
    * terrainMod
    * seasonMod
    * randomMod;
}
```

### Tabulka optimálních pracovníků podle zdroje

| Zdroj | Optimální pracovníků (medium) | Max pracovníků (medium) |
|-------|------------------------------|-------------------------|
| Obilí | 50 | 150 |
| Pastviny | 30 | 100 |
| Ryby | 40 | 120 |
| Železo | 100 | 300 |
| Měď | 80 | 250 |
| Cín | 70 | 200 |
| Olovo | 60 | 180 |
| Zlato | 50 | 150 |
| Stříbro | 70 | 200 |
| Drahokamy | 30 | 100 |
| Krystaly | 20 | 60 |
| Emeret | 30 | 80 |
| Adak | 40 | 100 |
| Akimora | 25 | 75 |
| Megwa | 35 | 100 |

### Vzorec tržní ceny

```typescript
function calculateMarketPrice(
  resource: string,
  market: Market,
  state: WorldState
): number {
  const basePrice = RESOURCES[resource].base_price;

  // Nabídka a poptávka
  const supply = market.supply[resource] || 0;
  const demand = market.demand[resource] || 0;
  const supplyDemandRatio = Math.max(0.1, supply) / Math.max(0.1, demand);

  // Volatilita
  const volatility = RESOURCES[resource].volatility;
  const volatilityRange = {
    'stable': 0.05,
    'medium': 0.15,
    'high': 0.30,
    'extreme': 0.50
  }[volatility];

  const volatilityMod = 1 + state.random.range(-volatilityRange, volatilityRange);

  // Vzdálenost od zdroje
  const distanceMod = 1 + (market.distance_from_source * 0.02);

  // Sezónní modifikátor
  const seasonMod = getSeasonDemandMod(state.date.season, resource);

  // Finální cena
  let price = basePrice
    * Math.pow(supplyDemandRatio, -0.5)  // Inverze S/D s odmocninou
    * volatilityMod
    * distanceMod
    * seasonMod;

  // Cenový floor a strop
  const floor = RESOURCES[resource].price_floor || (basePrice * 0.5);
  const ceiling = RESOURCES[resource].price_ceiling || (basePrice * 3.0);

  return clamp(price, floor, ceiling);
}
```

### Cenové regulace - kompletní tabulka

| Zdroj | Floor | Strop | Důvod |
|-------|-------|-------|-------|
| Obilí | 0.05 | 0.20 | Základní potrava |
| Pastviny | 0.08 | 0.25 | Základní potrava |
| Ryby | 0.08 | 0.30 | Základní potrava |
| Železo | 0.002 | 0.005 | Strategický materiál |
| Zlato | 15.0 | 30.0 | Měnová stabilita |
| Stříbro | 0.50 | 1.00 | Měnová stabilita |

---

## Vzorce pro postavy

### Generování atributů

```typescript
function generateCharacterAttributes(
  age: number,
  education: string,
  traits: Trait[],
  dynasty: Dynasty
): Attributes {
  // Základní hodnota 5-10
  const base = {
    diplomacy: random.range(5, 10),
    warfare: random.range(5, 10),
    stewardship: random.range(5, 10),
    intrigue: random.range(5, 10),
    learning: random.range(5, 10),
    piety: random.range(5, 10)
  };

  // Vzdělání bonus (+0 až +5)
  const educationBonus = EDUCATION_BONUSES[education];
  base[educationBonus.primary] += random.range(2, 5);
  base[educationBonus.secondary] += random.range(0, 2);

  // Traits modifikátory
  for (const trait of traits) {
    for (const [attr, mod] of Object.entries(trait.attribute_modifiers)) {
      base[attr] = clamp(base[attr] + mod, 0, 20);
    }
  }

  // Věkový modifikátor
  const ageMod = getAgeModifier(age);
  for (const [attr, mod] of Object.entries(ageMod)) {
    base[attr] = clamp(base[attr] + mod, 0, 20);
  }

  // Dědičné vlastnosti z dynastie (malá šance)
  if (dynasty.genetic_traits && random.chance(0.15)) {
    const inheritedTrait = random.pick(dynasty.genetic_traits);
    // Aplikovat dědičnou vlastnost
  }

  return base;
}
```

### Vzdělávací bonusy

| Vzdělání | Primární atribut | Sekundární atribut | Bonus |
|----------|------------------|-------------------|-------|
| Diplomat | diplomacy | learning | +2-5, +0-2 |
| Stratég | warfare | stewardship | +2-5, +0-2 |
| Správce | stewardship | intrigue | +2-5, +0-2 |
| Spiklenec | intrigue | diplomacy | +2-5, +0-2 |
| Učenec | learning | piety | +2-5, +0-2 |
| Teolog | piety | learning | +2-5, +0-2 |

### Věkové modifikátory (detailní)

| Věk | Diplomacy | Warfare | Stewardship | Intrigue | Learning | Piety |
|-----|-----------|---------|-------------|----------|----------|-------|
| 0-15 | -3 | -5 | -5 | -3 | -2 | 0 |
| 16-20 | -1 | -1 | -2 | 0 | 0 | 0 |
| 21-40 | 0 | 0 | 0 | 0 | 0 | 0 |
| 41-50 | +1 | 0 | +1 | +1 | +1 | +1 |
| 51-60 | +1 | -1 | +2 | +1 | +2 | +2 |
| 61-70 | 0 | -2 | +1 | 0 | +1 | +2 |
| 71-80 | -1 | -3 | 0 | -1 | 0 | +2 |
| 81+ | -2 | -5 | -1 | -2 | -1 | +3 |

### Vzorec loajality

```typescript
function calculateLoyalty(character: Character, ruler: Character, domain: Domain): number {
  let loyalty = 50; // Základní hodnota

  // Plat
  const expectedSalary = getExpectedSalary(character.position);
  const actualSalary = character.salary;
  const salaryRatio = actualSalary / expectedSalary;
  loyalty += (salaryRatio - 1.0) * 20; // ±20 bodů

  // Vztah s vládcem
  const opinion = getOpinion(character, ruler);
  loyalty += opinion * 0.3; // -30 až +30 bodů

  // Vlastnosti
  if (character.hasTrait('honest')) loyalty += 10;
  if (character.hasTrait('deceitful')) loyalty -= 10;
  if (character.hasTrait('ambitious')) {
    const positionMismatch = character.desired_position_tier - character.current_position_tier;
    loyalty -= positionMismatch * 10; // Ambiciózní chtějí vyšší pozici
  }
  if (character.hasTrait('content')) loyalty += 15;

  // Legitimita vládce
  const legitimacy = ruler.legitimacy;
  if (legitimacy < 40) loyalty -= 20;
  else if (legitimacy < 60) loyalty -= 10;
  else if (legitimacy >= 80) loyalty += 10;

  // Délka služby
  const yearsOfService = (currentDate - character.service_start_date) / 365;
  loyalty += Math.min(yearsOfService * 2, 20); // Max +20 za dlouhou službu

  return clamp(loyalty, 0, 100);
}
```

### Tabulka očekávaných platů

| Pozice | Očekávaný plat/měsíc (zlaté) |
|--------|------------------------------|
| Kancléř | 10 |
| Maršál | 10 |
| Správce | 8 |
| Spymaster | 8 |
| Kaplan | 6 |
| Velitel armády | 5 |
| Agent | 3 |
| Dvořan | 2 |

---

## Vojenské vzorce

### Kompletní vzorec bojové síly

```typescript
function calculateCombatStrength(army: Army, battle: Battle, state: WorldState): number {
  let totalStrength = 0;

  for (const unit of army.units) {
    const baseStrength = unit.count * UNIT_TYPES[unit.type].strength;
    const moraleMod = unit.morale / 100;
    const experienceMod = 1 + (unit.experience * 0.1); // Max +100% za veterány

    totalStrength += baseStrength * moraleMod * experienceMod;
  }

  // Terénní bonus
  const terrainMod = getTerrainCombatMod(battle.hex.terrain_type, army.is_defender);

  // Velitelský bonus
  const commanderMod = 1 + (army.commander.warfare * 0.02);

  // Magický bonus (pokud má mágové)
  const magicMod = calculateMagicBonus(army);

  // Bonus za pozici
  const positionMod = army.is_defender ? 1.1 : 1.0; // Obránce má +10%

  return totalStrength * terrainMod * commanderMod * magicMod * positionMod;
}
```

### Magický bonus v bitvě

```typescript
function calculateMagicBonus(army: Army): number {
  const mages = army.units.filter(u => u.type === 'mage');
  if (mages.length === 0) return 1.0;

  let magicPower = 0;
  for (const mage of mages) {
    magicPower += mage.count * mage.average_skill * 0.01;
  }

  // Maximální bonus je +50%
  return 1 + Math.min(magicPower, 0.5);
}
```

### Vzorec pro ztráty v bitvě

```typescript
function calculateBattleLosses(
  winner: Army,
  loser: Army,
  strengthRatio: number,
  battle: Battle
): BattleLosses {
  // Ztráty poraženého
  let loserLossRate = 0.20 + (strengthRatio - 1) * 0.10;
  loserLossRate = clamp(loserLossRate, 0.10, 0.80);

  // Ztráty vítěze
  let winnerLossRate = 0.05 + (1 / strengthRatio - 1) * 0.05;
  winnerLossRate = clamp(winnerLossRate, 0.02, 0.30);

  // Modifikátor pronásledování
  if (battle.pursuit_enabled) {
    loserLossRate *= 1.2; // +20% ztráty při pronásledování
  }

  // Modifikátor útěku přes obtížný terén
  const escapeTerrainMod = TERRAIN_ESCAPE_DIFFICULTY[battle.hex.terrain_type];
  loserLossRate *= escapeTerrainMod;

  return {
    winner_losses: Math.floor(winner.total_count * winnerLossRate),
    loser_losses: Math.floor(loser.total_count * loserLossRate),
    loser_prisoners: Math.floor(loser.total_count * loserLossRate * 0.2) // 20% ztrát je zajatců
  };
}
```

### Terénní obtížnost útěku

| Terén | Modifikátor |
|-------|-------------|
| plains | 0.8 |
| steppe | 0.8 |
| hills | 1.0 |
| forest | 1.2 |
| mountains | 1.4 |
| marshes | 1.5 |
| jungle | 1.6 |

### Vzorec obléhání

```typescript
function calculateSiegeProgress(siege: Siege, state: WorldState): number {
  const fortificationStrength = FORTIFICATION_LEVELS[siege.target.fortification_level];
  const attackerStrength = siege.attacker.total_count;
  const siegeEngines = siege.attacker.siege_engines;

  // Základní progres za den
  let dailyProgress = attackerStrength / (fortificationStrength * 100);

  // Bonus za obléhací stroje
  dailyProgress *= (1 + siegeEngines * 0.5);

  // Modifikátor sezóny
  const seasonMod = SEASON_SIEGE_MODIFIERS[state.date.season];
  dailyProgress *= seasonMod;

  // Modifikátor zásobování obránce
  const defenderSupplyRatio = siege.target.supplies / siege.target.max_supplies;
  if (defenderSupplyRatio < 0.3) {
    dailyProgress *= 1.5; // Hladovějící obránci
  }

  return dailyProgress;
}
```

### Hodnoty opevnění (rozšířené)

| Typ opevnění | Hodnota | Dny k dobytí (1000 vojáků, bez strojů) |
|--------------|---------|----------------------------------------|
| Žádné | 0 | 0 |
| Palisáda | 1 | 10 |
| Dřevěná hradba | 2 | 20 |
| Kamenná hradba | 5 | 50 |
| Mohutné hradby | 10 | 100 |
| Citadela | 20 | 200 |
| Nedobytná pevnost | 50 | 500 |

### Sezónní modifikátory obléhání

| Sezóna | Modifikátor |
|--------|-------------|
| Jaro | 0.8 |
| Léto | 1.0 |
| Podzim | 0.9 |
| Zima | 0.5 |

---

## Diplomatické vzorce

### Vzorec úspěšnosti vyjednávání

```typescript
function calculateNegotiationSuccess(
  initiator: Domain,
  target: Domain,
  treaty_type: string,
  offer_value: number,
  demand_value: number
): number {
  // Základní šance podle typu smlouvy
  let baseChance = TREATY_BASE_CHANCES[treaty_type];

  // Modifikátor vztahů
  const relations = getRelations(initiator, target);
  const relationsMod = relations * 0.5; // -50 až +50 bodů

  // Modifikátor diplomacie
  const diplomacyDiff = initiator.ruler.diplomacy - target.ruler.diplomacy;
  const diplomacyMod = diplomacyDiff * 2; // -20 až +20 bodů

  // Modifikátor hodnoty nabídky vs. požadavků
  const valueMod = (offer_value - demand_value) * 0.1;

  // Modifikátor vlivu
  const influenceMod = (initiator.influence - target.influence) * 0.05;

  // Finální šance
  let chance = baseChance + relationsMod + diplomacyMod + valueMod + influenceMod;

  return clamp(chance, 5, 95); // Vždy alespoň 5% a max 95%
}
```

### Základní šance smluv

| Typ smlouvy | Základní šance | Požadované vztahy |
|-------------|----------------|-------------------|
| truce | 70% | > -60 |
| non_aggression_pact | 50% | > 0 |
| trade_agreement | 40% | > -20 |
| military_access | 35% | > +20 |
| defensive_pact | 25% | > +40 |
| alliance | 15% | > +60 |
| vassalage | 10% | > +40 nebo vojenská porážka |

### Přirozený úbytek vztahů

```typescript
function decayRelations(relations: Map<string, number>, state: WorldState): void {
  for (const [key, value] of relations) {
    // Extrémní vztahy se vracejí k neutralitě
    if (Math.abs(value) > 50) {
      const decay = value > 0 ? -2 : +2;
      relations.set(key, value + decay);
    } else if (Math.abs(value) > 30) {
      const decay = value > 0 ? -1 : +1;
      relations.set(key, value + decay);
    }
    // Vztahy v rozmezí -30 až +30 jsou stabilní
  }
}
```

---

## Vzorce pro domény

### Vzorec zisku vlivu

```typescript
function calculateMonthlyInfluenceGain(domain: Domain, state: WorldState): number {
  let gain = 0;

  // Pasivní zisk z velikosti domény
  gain += domain.hamlets.length * 0.2;

  // Zisk z prestiže dynastie
  const dynastyPrestige = domain.dynasty.prestige;
  if (dynastyPrestige >= 5000) gain += 5;
  else if (dynastyPrestige >= 2000) gain += 3;
  else if (dynastyPrestige >= 500) gain += 1;

  // Zisk z legitimity
  if (domain.ruler.legitimacy >= 80) gain += 2;
  else if (domain.ruler.legitimacy >= 60) gain += 1;

  // Zisk z honosných budov
  gain += countPrestigiousBuildings(domain) * 0.5;

  // Rozpad vlivu (pokud je vliv > 50)
  if (domain.influence > 50) {
    gain -= domain.influence * 0.05 / 12; // 5% ročně = 0.42% měsíčně
  }

  return gain;
}
```

### Maximální vliv

```
Maximální vliv = 500 bodů
Nad touto hodnotou se automaticky uplatňuje dvojnásobný rozpad.
```

### Tabulka efektů atributů domény

| Atribut | Hodnota 1-5 | 6-10 | 11-15 | 16-20 |
|---------|-------------|------|-------|-------|
| Stewardship | -20% daně | +0% | +25% | +50% |
| Diplomacy | -20% vztahy | +0% | +25% | +50% |
| Trade | -20% obchod | +0% | +25% | +50% |
| Military | -15% síla | +0% | +15% | +30% |
| Spying | -15% operace | +0% | +15% | +30% |
| Magic | -15% magie | +0% | +15% | +30% |
| Faith | -10% kontrola | +0% | +10% | +20% |

---

## Vzorce pro události

### Šance na události (přesné hodnoty)

| Událost | Základní šance/rok | Podmínky modifikátoru |
|---------|-------------------|----------------------|
| Mor | 2% | +5% za válku, +3% za sousední mor, +2% za zimu |
| Sucho | 5% | +10% v létě, +5% pro suché terény |
| Povodeň | 3% | +10% na jaře, pouze u řek |
| Zemětřesení | 1% | +5% pro vulkanické/horské regiony |
| Obchodní boom | 5% | Pouze pokud obchod > 10 |
| Hladomor | 100% | Automaticky při < 50% potravin |
| Zlatá horečka | 1% | Pouze v horách |
| Povstání vazala | 10% | Pouze pokud loajalita < 30 |
| Dědická krize | 100% | Automaticky při smrti bez dědice |
| Korunovace | 100% | Automaticky při novém vládci |
| Atentát | 2% | × počet nepřátel s intriky > 10 |
| Zjevení | 1% | Pouze pokud víra > 15 |
| Hereze | 3% | Pouze pokud víra < 5 |
| Banditismus | 10% | Pouze pokud kontrola < 50 |
| Dezerce | 5%/měsíc | Pouze pokud morálka < 30 |
| Nemoc postavy | 5%/rok | +1% za každých 10 let věku nad 30 |
| Romance | 3%/rok | Pouze pro svobodné/nepokojné |
| Magická anomálie | 2%/rok | Pouze v magických oblastech |

### Výpočet váhy události

```typescript
function calculateEventWeight(event: EventTemplate, state: WorldState, context: any): number {
  let weight = event.base_weight;

  // Modifikátor podmínek
  for (const condition of event.conditions) {
    if (checkCondition(condition, context)) {
      weight *= condition.weight_modifier || 1.0;
    } else {
      return 0; // Podmínka nesplněna
    }
  }

  // Penalizace za nedávné podobné události
  const lastOccurrence = getLastEventOccurrence(event.type, context.target);
  if (lastOccurrence) {
    const daysSince = state.date.daysSince(lastOccurrence);
    if (daysSince < event.cooldown_days) {
      return 0;
    }
    // Postupné obnovování váhy
    weight *= Math.min(1.0, daysSince / (event.cooldown_days * 2));
  }

  // Modifikátor obtížnosti hry
  weight *= state.settings.event_frequency;

  return weight;
}
```

---

## Špionážní vzorce

### Růst špionážní sítě

```typescript
function calculateNetworkGrowth(network: SpyNetwork, state: WorldState): number {
  const spymaster = network.owner.council.spymaster;
  const targetCounterIntel = network.target.counter_intelligence;

  // Základní růst
  let growth = 5; // 5 bodů za měsíc

  // Bonus za spymastera
  growth *= (1 + spymaster.intrigue * 0.05); // +5% za bod intrik

  // Redukce za kontrašpionáž cíle
  growth *= (1 - targetCounterIntel * 0.01); // -1% za bod kontrašpionáže

  // Náhodnost
  growth *= state.random.range(0.8, 1.2);

  // Maximum je 100
  return Math.min(growth, 100 - network.strength);
}
```

### Šance úspěchu operace

```typescript
function calculateOperationSuccess(
  operation: SpyOperation,
  network: SpyNetwork,
  agent: Agent,
  state: WorldState
): number {
  const baseChance = OPERATION_BASE_CHANCES[operation.type];

  // Modifikátor síly sítě
  let chance = baseChance * (network.strength / 100);

  // Modifikátor schopností agenta
  chance *= (1 + agent.skill * 0.05);

  // Modifikátor domácí domény (špionáž)
  const spyingAttribute = network.owner.attributes.spying;
  chance *= (1 + (spyingAttribute - 10) * 0.05);

  // Modifikátor cílové domény (kontrašpionáž)
  const targetContra = network.target.counter_intelligence;
  chance *= (1 - targetContra * 0.01);

  return clamp(chance, 5, 95);
}
```

### Základní šance operací

| Operace | Základní šance | Min síla sítě |
|---------|----------------|---------------|
| gather_intelligence | 70% | 10 |
| uncover_secrets | 40% | 30 |
| surveillance | 60% | 20 |
| sabotage | 35% | 30 |
| assassination | 15% | 40-80 (podle cíle) |
| kidnapping | 25% | 50 |
| support_faction | 50% | 40 |
| incite_rebellion | 30% | 60 |
| spread_disinformation | 50% | 30 |
| steal_secrets | 40% | 40 |
| market_manipulation | 45% | 30 |
| counterfeiting | 35% | 50 |

---

## Magické vzorce

### Propojení krystalů MAGIC.md a RESOURCES.md

Krystaly z RESOURCES.md jsou specifické pro svět Astarog a nahrazují obecné krystaly z MAGIC.md:

| Krystal z RESOURCES.md | Magická afinita | Škola magie |
|------------------------|-----------------|-------------|
| Almazit | Telekineze | Transmutace |
| Aterist | Telepatie | Věštění, Iluze |
| Korint | Transmutace | Transmutace |
| Kurýn | Fyziomatika | Transmutace, Léčení |
| Zaltar | Fotonika | Evokace, Iluze |
| Yris | Sensitiva | Věštění, Iluze |
| Kalaznát | Temperatura | Evokace |
| Deryl | Psychotronika | Nekromancie, Iluze |
| Uryst | Silomatika | Evokace |
| Lepterýn | Duchotika | Nekromancie, Zaklínání |
| Peritýn | Teloconomie | Transmutace (čas) |

### Vzorec regenerace many

```typescript
function calculateManaRegeneration(mage: Mage, state: WorldState): number {
  // Základní regenerace podle hodnosti
  const baseRegen = MAGE_RANK_REGEN[mage.rank];

  // Modifikátor aktivity
  const activityMod = ACTIVITY_MANA_MODIFIERS[mage.current_activity];

  // Modifikátor prostředí
  let environmentMod = 1.0;
  if (mage.location.ley_line) {
    environmentMod += mage.location.ley_line.strength * 0.1;
  }
  if (mage.location.power_site) {
    environmentMod += POWER_SITE_REGEN_BONUS[mage.location.power_site.type];
  }

  // Modifikátor zdraví
  const healthMod = mage.isHealthy() ? 1.0 : 0.5;

  return baseRegen * activityMod * environmentMod * healthMod;
}
```

### Regenerace many podle hodnosti

| Hodnost | Základní regenerace/den | Maximální mana |
|---------|-------------------------|----------------|
| Učedník | 5 | 50 |
| Adept | 10 | 100 |
| Mág | 15 | 200 |
| Arcimág | 25 | 400 |
| Velmistr | 40 | 800 |

### Modifikátory aktivity

| Aktivita | Modifikátor |
|----------|-------------|
| Odpočinek | 1.0 |
| Lehká aktivita | 0.5 |
| Aktivní cestování | 0.2 |
| Boj | 0.0 |
| Meditace | 2.0 |
| U ley linie | +10% za úroveň |
| V místě moci | +20% až +100% |

### Vzorec sesílání kouzla

```typescript
function castSpell(mage: Mage, spell: Spell, target: any, state: WorldState): SpellResult {
  // Kontrola many
  if (mage.mana < spell.mana_cost) {
    return { success: false, reason: 'insufficient_mana' };
  }

  // Kontrola krystalů
  if (!hasRequiredCrystals(mage, spell)) {
    return { success: false, reason: 'missing_crystals' };
  }

  // Šance na úspěch
  const schoolLevel = mage.schools[spell.school] || 0;
  const requiredLevel = spell.tier * 2; // Tier 1 = level 2, Tier 5 = level 10

  let successChance = 50 + (schoolLevel - requiredLevel) * 10;
  successChance = clamp(successChance, 5, 95);

  // Modifikátor prostředí
  if (mage.location.ley_line?.affinity === spell.school) {
    successChance += 10;
  }

  // Roll
  const roll = state.random.range(0, 100);
  const success = roll < successChance;

  // Spotřeba many
  mage.mana -= spell.mana_cost;

  // Spotřeba krystalů (pokud jednorázové)
  if (spell.consumes_crystals) {
    consumeCrystals(mage, spell);
  }

  if (success) {
    applySpellEffect(spell, target, mage, state);
    return { success: true, effect: spell.effect };
  } else {
    // Možný backlash při kritickém selhání
    if (roll > 95) {
      applyBacklash(mage, spell, state);
    }
    return { success: false, reason: 'spell_failed' };
  }
}
```

---

## Konstanty pro balancování

### Globální konstanty

```typescript
const GAME_CONSTANTS = {
  // Ekonomika
  BASE_FOOD_PER_CAPITA: 2,           // kg/den
  BASE_GROWTH_RATE: 0.02,            // ročně
  BASE_TAX_EFFICIENCY: 0.7,          // 70% teoretického výběru
  TRADE_ROUTE_BONUS_PER_YEAR: 0.05,  // +5% za rok existence

  // Populace
  MAX_RECRUITMENT_RATIO: 0.05,       // Max 5% populace do armády
  FAMINE_DEATH_RATE: 0.05,           // 5%/měsíc při hladomoru
  PLAGUE_MORTALITY: 0.30,            // 30% populace při moru

  // Vojenství
  DEFENDER_BONUS: 1.1,               // +10% pro obránce
  SIEGE_DAILY_ATTRITION: 0.001,      // 0.1% denní ztráty při obléhání
  RETREAT_LOSS_MULTIPLIER: 1.2,      // +20% ztráty při ústupu

  // Diplomacie
  RELATION_DECAY_THRESHOLD: 50,      // Od jakého vztahu klesá
  RELATION_DECAY_RATE: 0.02,         // 2% ročně
  TRUCE_BREAK_PENALTY: -40,          // Vztahy za porušení příměří

  // Magie
  MANA_OVERCAST_PENALTY: 0.5,        // Efektivita při přečerpání
  RITUAL_FAILURE_BACKLASH: 0.2,      // 20% šance na backlash

  // Špionáž
  NETWORK_MAX_STRENGTH: 100,
  AGENT_CAPTURE_CHANCE: 0.1,         // 10% šance na zajetí při neúspěchu
  DOUBLE_AGENT_DETECTION: 0.05,      // 5% šance odhalení dvojitého agenta/měsíc

  // Události
  MAX_EVENTS_PER_MONTH: 5,
  EVENT_COOLDOWN_MULTIPLIER: 2,      // Cooldown = 2× základní doba

  // Čas
  DAYS_PER_MONTH: 30,
  MONTHS_PER_YEAR: 12,
  DAYS_PER_YEAR: 360
};
```

---

## Příloha: Vzorové výpočty

### Příklad 1: Produkce obilí

```
Vstup:
- Naleziště: quality=3, size=medium, depletion=10%, infrastructure=2
- Pracovníci: 40/50 (80% optimal)
- Terén: farmland (modifikátor 1.0)
- Sezóna: podzim (modifikátor 1.0)

Výpočet:
base_yield = 3000 kg/pracovník/rok
quality_mod = 0.5 + (3 * 0.25) = 1.25
size_mod = 1.0
depletion_mod = 1 - (10/100) = 0.9
worker_efficiency = 40/50 = 0.8
infra_mod = 1.5
terrain_mod = 1.0
season_mod = 1.0
random_mod = 1.05 (příklad)

roční_produkce = 3000 * 1.25 * 1.0 * 0.9 * 0.8 * 1.5 * 1.0 * 1.0 * 1.05
             = 3000 * 1.417
             = 4251 kg/rok

Za 40 pracovníků: 4251 * 40 = 170 040 kg/rok = 170 tun obilí
```

### Příklad 2: Bitva

```
Vstup:
- Útočník: 1000 kopiníků (síla 10), morálka 70, velitel warfare 12
- Obránce: 500 kopiníků + 200 lučištníků, morálka 80, velitel warfare 15
- Terén: kopce (útočník 0.8, obránce 1.3)

Výpočet síly útočníka:
base = 1000 * 10 = 10000
morale = 10000 * 0.7 = 7000
terrain = 7000 * 0.8 = 5600
commander = 5600 * (1 + 12 * 0.02) = 5600 * 1.24 = 6944

Výpočet síly obránce:
base_kopinicy = 500 * 10 = 5000
base_lucistnici = 200 * 8 = 1600
total_base = 6600
morale = 6600 * 0.8 = 5280
terrain = 5280 * 1.3 = 6864
commander = 6864 * (1 + 15 * 0.02) = 6864 * 1.30 = 8923
defender_bonus = 8923 * 1.1 = 9815

Poměr sil: 6944 / 9815 = 0.71

Výsledek: Těsné vítězství obránce

Ztráty:
- Útočník (poražený): 20% + (0.71 - 1) * 10% = 20% - 2.9% = 17.1% → ~171 mrtvých
- Obránce (vítěz): 5% + (1/0.71 - 1) * 5% = 5% + 2% = 7% → ~49 mrtvých
```

### Příklad 3: Diplomatické vyjednávání

```
Vstup:
- Iniciátor: diplomacie 14, vliv 80, vztahy s cílem +30
- Cíl: diplomacie 10, vliv 50
- Typ smlouvy: defensive_pact (základní šance 25%)
- Nabídka: 100 zlata, požadavek: obranný pakt

Výpočet:
base_chance = 25%
relations_mod = 30 * 0.5 = +15%
diplomacy_mod = (14 - 10) * 2 = +8%
influence_mod = (80 - 50) * 0.05 = +1.5%

total = 25 + 15 + 8 + 1.5 = 49.5%

Šance na úspěch: ~50%
```

---

## Changelog

| Datum | Verze | Změny |
|-------|-------|-------|
| 2025-12-25 | 1.0 | Inicializační verze s kompletními vzorci |
