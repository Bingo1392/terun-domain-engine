# Simulace

Popis jak engine zpracovává jednotlivé kroky simulace, včetně pořadí operací a datových toků.

---

## Architektura enginu

### Základní principy

| Princip | Popis |
|---------|-------|
| Stateless | Engine neuchovává stav mezi voláními |
| Deterministický | Stejný vstup = stejný výstup (s fixním seedem) |
| Event-driven | Změny se propagují přes události |
| Modular | Nezávislé subsystémy |

### Vstup a výstup

**Vstup:**
```typescript
interface SimulationInput {
  world_state: WorldState       // Aktuální stav světa
  player_actions: Action[]      // Akce hráčů
  time_delta: TimeDelta         // Časový posun
  random_seed: number           // Seed pro náhodnost
}
```

**Výstup:**
```typescript
interface SimulationOutput {
  new_world_state: WorldState   // Nový stav světa
  events: Event[]               // Události k zobrazení
  notifications: Notification[] // Notifikace pro hráče
  log: LogEntry[]               // Detailní log pro debug
}
```

---

## Stav světa (WorldState)

### Struktura

```typescript
interface WorldState {
  // Časové informace
  date: GameDate

  // Geografické entity
  hexes: Map<HexId, Hex>
  hamlets: Map<HamletId, Hamlet>
  domains: Map<DomainId, Domain>

  // Mobilní entity
  armies: Map<ArmyId, Army>
  caravans: Map<CaravanId, Caravan>
  characters: Map<CharacterId, Character>

  // Vztahy a smlouvy
  relations: Map<RelationKey, Relation>
  treaties: Map<TreatyId, Treaty>
  alliances: Map<AllianceId, Alliance>

  // Ekonomika
  markets: Map<MarketId, Market>
  trade_routes: Map<RouteId, TradeRoute>

  // Další systémy
  wars: Map<WarId, War>
  factions: Map<FactionId, Faction>
  events_queue: Event[]
  modifiers: Modifier[]
}
```

### Vztahy mezi entitami

```
Domain
  ├── Characters (ruler, council, courtiers)
  ├── Hamlets
  │     ├── Hex (location)
  │     ├── Resources (deposits)
  │     └── Buildings
  ├── Armies
  │     └── Units
  ├── Treaties (with other domains)
  └── Wars (active conflicts)
```

---

## Simulační cyklus

### Hlavní smyčka

```
1. VSTUP
   ├── Načtení world_state
   ├── Validace player_actions
   └── Inicializace random generátoru

2. ZPRACOVÁNÍ AKCÍ HRÁČŮ
   ├── Ekonomické akce
   ├── Vojenské akce
   ├── Diplomatické akce
   └── Ostatní akce

3. SIMULACE ČASU
   ├── Pro každý den v time_delta:
   │     ├── Denní tick
   │     ├── Týdenní tick (pokud konec týdne)
   │     ├── Měsíční tick (pokud konec měsíce)
   │     └── Roční tick (pokud konec roku)
   └── Zpracování front událostí

4. FINALIZACE
   ├── Validace konzistence
   ├── Generování výstupu
   └── Čištění dočasných dat

5. VÝSTUP
   └── Vrácení SimulationOutput
```

### Detailní pořadí operací

#### Denní tick

```
1. Pohyb armád
2. Bitvy (pokud kontakt)
3. Obléhání (pokud aktivní)
4. Pohyb karavan
5. Osobní události postav
6. Aktualizace staveb (progress)
```

#### Týdenní tick

```
1. Lokální tržní transakce
2. Aktualizace cen
3. Osobní události (rozšířené)
4. Frakční aktivity
5. Špionážní operace (progress)
```

#### Měsíční tick

```
1. EKONOMIKA
   ├── Výpočet produkce
   ├── Spotřeba zdrojů
   ├── Výběr daní
   ├── Platba údržby
   └── Aktualizace trhů

2. POPULACE
   ├── Růst/úbytek
   ├── Migrace
   ├── Potřeby (jídlo, bezpečnost)
   └── Spokojenost

3. VZTAHY
   ├── Přirozený posun vztahů
   ├── Expirace modifikátorů
   └── Aktualizace loajality

4. UDÁLOSTI
   ├── Kontrola podmínek
   ├── Generování náhodných událostí
   └── Zpracování front

5. ÚDRŽBA
   ├── Armády (plat, zásoby)
   ├── Budovy
   └── Flotily
```

#### Roční tick

```
1. Stárnutí postav
2. Dědické kontroly
3. Expirace smluv
4. Přehodnocení vztahů
5. Historické záznamy
6. Globální události
```

---

## Subsystémy

### Ekonomický subsystém

```typescript
function simulateEconomy(state: WorldState): EconomyResult {
  const production = calculateProduction(state)
  const consumption = calculateConsumption(state)
  const trade = simulateTrade(state)
  const taxes = collectTaxes(state)
  const maintenance = payMaintenance(state)

  return {
    resource_changes: mergeChanges([
      production,
      consumption,
      trade,
      taxes,
      maintenance
    ]),
    market_updates: updateMarkets(state, trade),
    events: generateEconomicEvents(state)
  }
}
```

#### Výpočet produkce

```
Pro každou osadu:
  Pro každý zdroj v osadě:
    base_production = deposit.yield × quality_modifier

    modifiers = [
      terrain_modifier(hex),
      season_modifier(date),
      infrastructure_modifier(hamlet),
      worker_modifier(hamlet),
      technology_modifier(domain),
      event_modifiers(state)
    ]

    final_production = base_production × product(modifiers)

    depletion_chance = base_risk × (1 - infrastructure_level × 0.1)
    if (random() < depletion_chance):
      deposit.depletion += depletion_rate
```

#### Výpočet spotřeby

```
Pro každou osadu:
  population = hamlet.population

  food_need = population × food_per_capita × season_modifier
  housing_need = population × housing_per_capita
  luxury_need = wealth_level × luxury_coefficient

  satisfaction = min(
    available_food / food_need,
    available_housing / housing_need,
    available_luxury / luxury_need
  )

  if (satisfaction < 1.0):
    generate_shortage_event(hamlet, resource_type)
```

### Populační subsystém

```typescript
function simulatePopulation(state: WorldState): PopulationResult {
  for (const hamlet of state.hamlets.values()) {
    // Základní růst
    const base_growth = hamlet.population * GROWTH_RATE

    // Modifikátory
    const food_modifier = calculateFoodModifier(hamlet)
    const health_modifier = calculateHealthModifier(hamlet)
    const war_modifier = calculateWarModifier(hamlet, state)
    const event_modifier = getEventModifiers(hamlet, state)

    // Finální růst
    const growth = base_growth
      * food_modifier
      * health_modifier
      * war_modifier
      * event_modifier

    // Migrace
    const migration = calculateMigration(hamlet, state)

    hamlet.population += growth + migration

    // Kontrola velikosti osady
    checkHamletSizeChange(hamlet)
  }
}
```

### Vojenský subsystém

```typescript
function simulateMilitary(state: WorldState): MilitaryResult {
  // Pohyb armád
  for (const army of state.armies.values()) {
    if (army.status === 'moving') {
      const movement = calculateMovement(army, state)
      army.position = moveTowards(army.position, army.destination, movement)

      // Kontrola kontaktu s nepřítelem
      const enemies = findEnemiesInRange(army, state)
      if (enemies.length > 0) {
        scheduleEvent(new BattleEvent(army, enemies[0]))
      }
    }
  }

  // Zpracování bitev
  for (const battle of state.pending_battles) {
    const result = resolveBattle(battle, state)
    applyBattleResult(result, state)
  }

  // Obléhání
  for (const siege of state.active_sieges) {
    const progress = calculateSiegeProgress(siege, state)
    siege.progress += progress

    if (siege.progress >= 100) {
      resolveSiege(siege, state)
    }
  }
}
```

#### Rozhodování bitvy

```
1. PŘED BITVOU
   ├── Určení terénu
   ├── Výpočet bonusů (velitel, morálka, terén)
   └── Taktická volba (útok/obrana)

2. FÁZE BITVY
   Pro každé kolo (max 10):
     ├── Střelecká fáze
     │     └── damage = ranged_power × accuracy × terrain_mod
     ├── Šarvátková fáze
     │     └── damage = skirmish_power × mobility
     └── Hlavní střet
           └── damage = melee_power × discipline × morale_mod

     Kontrola morálky:
       if (losses > threshold || morale < 20):
         trigger_rout()

3. PO BITVĚ
   ├── Výpočet ztrát
   ├── Zajatci
   ├── Kořist
   └── Morálka změna
```

### Diplomatický subsystém

```typescript
function simulateDiplomacy(state: WorldState): DiplomacyResult {
  // Přirozený posun vztahů
  for (const relation of state.relations.values()) {
    if (Math.abs(relation.value) > 50) {
      relation.value *= 0.98  // 2% decay k neutralitě
    }
  }

  // Expirace modifikátorů
  for (const modifier of state.modifiers) {
    if (modifier.expiry_date <= state.date) {
      removeModifier(modifier, state)
    }
  }

  // AI diplomatické akce
  for (const domain of getAIDomains(state)) {
    const actions = evaluateDiplomaticOptions(domain, state)
    const best_action = selectBestAction(actions)
    if (best_action) {
      executeDiplomaticAction(best_action, state)
    }
  }

  // Kontrola smluv
  for (const treaty of state.treaties.values()) {
    if (treaty.end_date && treaty.end_date <= state.date) {
      expireTreaty(treaty, state)
    }
  }
}
```

### Eventový subsystém

```typescript
function processEvents(state: WorldState): EventResult {
  const events_to_fire: Event[] = []

  // Kontrola podmíněných událostí
  for (const event_template of EVENT_TEMPLATES) {
    if (checkTriggerConditions(event_template, state)) {
      const weight = calculateEventWeight(event_template, state)
      events_to_fire.push({
        template: event_template,
        weight: weight
      })
    }
  }

  // Náhodný výběr podle vah
  const selected_events = weightedRandomSelect(events_to_fire, MAX_EVENTS_PER_TICK)

  // Zpracování vybraných událostí
  for (const event of selected_events) {
    if (event.requires_decision) {
      // Přidat do fronty pro hráče
      state.events_queue.push(event)
    } else {
      // Automaticky aplikovat efekty
      applyEventEffects(event, state)
    }
  }

  // Zpracování řetězových událostí
  processEventChains(state)
}
```

---

## Náhodnost a determinismus

### Random seed

```typescript
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  next(): number {
    // Lineární kongruenční generátor
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff
    return this.seed / 0x7fffffff
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min)
  }

  chance(probability: number): boolean {
    return this.next() < probability
  }
}
```

### Reprodukovatelnost

Pro stejný vstup (world_state + actions + seed) engine vždy vrátí stejný výstup.

```typescript
// Test reprodukovatelnosti
const output1 = simulate(input)
const output2 = simulate(input)
assert(deepEqual(output1, output2))
```

---

## Validace a konzistence

### Pre-validace

Před simulací:

```typescript
function validateInput(input: SimulationInput): ValidationResult {
  const errors: Error[] = []

  // Kontrola akcí
  for (const action of input.player_actions) {
    if (!canPerformAction(action, input.world_state)) {
      errors.push(new InvalidActionError(action))
    }
  }

  // Kontrola konzistence stavu
  if (!validateWorldState(input.world_state)) {
    errors.push(new InconsistentStateError())
  }

  return { valid: errors.length === 0, errors }
}
```

### Post-validace

Po simulaci:

```typescript
function validateOutput(output: SimulationOutput): boolean {
  // Žádné záporné populace
  for (const hamlet of output.new_world_state.hamlets.values()) {
    if (hamlet.population < 0) return false
  }

  // Žádné záporné zdroje (pokud není povoleno)
  for (const domain of output.new_world_state.domains.values()) {
    for (const [resource, amount] of domain.resources) {
      if (amount < 0 && !ALLOW_NEGATIVE[resource]) return false
    }
  }

  // Všechny reference existují
  for (const army of output.new_world_state.armies.values()) {
    if (!output.new_world_state.domains.has(army.owner)) return false
  }

  return true
}
```

---

## Optimalizace

### Caching

```typescript
// Cache často používané výpočty
const cache = new Map<string, any>()

function getTerrainModifier(hex: Hex, activity: string): number {
  const key = `terrain_${hex.id}_${activity}`

  if (!cache.has(key)) {
    cache.set(key, calculateTerrainModifier(hex, activity))
  }

  return cache.get(key)
}
```

### Prostorové indexování

```typescript
// R-tree pro rychlé prostorové dotazy
class SpatialIndex {
  private rtree: RTree

  findInRadius(center: Position, radius: number): Entity[] {
    return this.rtree.search({
      minX: center.x - radius,
      minY: center.y - radius,
      maxX: center.x + radius,
      maxY: center.y + radius
    })
  }
}
```

### Lazy evaluation

```typescript
// Počítat pouze když je potřeba
class LazyValue<T> {
  private computed: boolean = false
  private value: T | undefined

  constructor(private compute: () => T) {}

  get(): T {
    if (!this.computed) {
      this.value = this.compute()
      this.computed = true
    }
    return this.value!
  }
}
```

---

## Rozšiřitelnost

### Plugin systém

```typescript
interface SimulationPlugin {
  name: string
  version: string

  // Hooks
  onBeforeSimulation?(state: WorldState): void
  onAfterSimulation?(state: WorldState): void
  onBeforeTick?(state: WorldState, tick_type: TickType): void
  onAfterTick?(state: WorldState, tick_type: TickType): void

  // Custom subsystémy
  customSubsystems?: Subsystem[]

  // Custom události
  customEvents?: EventTemplate[]
}
```

### Registrace pluginů

```typescript
const engine = new SimulationEngine()

engine.registerPlugin(new MagicSystemPlugin())
engine.registerPlugin(new ReligionPlugin())
engine.registerPlugin(new CustomEventsPlugin())
```

---

## Debug a logging

### Log úrovně

| Úroveň | Využití |
|--------|---------|
| ERROR | Kritické chyby |
| WARN | Neočekávané stavy |
| INFO | Důležité události |
| DEBUG | Detailní operace |
| TRACE | Všechny výpočty |

### Struktura logu

```typescript
interface LogEntry {
  timestamp: GameDate
  level: LogLevel
  subsystem: string
  message: string
  data?: any
}
```

### Příklad logu

```
[1066-03-15] INFO  ECONOMY   Production calculated for 127 hamlets
[1066-03-15] DEBUG ECONOMY   Hamlet "Riverdale": wheat +150, iron +20
[1066-03-15] INFO  MILITARY  Army "Royal Guard" moved to hex 45,23
[1066-03-15] WARN  POPULATION Famine detected in "Mountain Village"
[1066-03-15] INFO  EVENT     Event triggered: "Plague Outbreak"
```
