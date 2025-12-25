# Události

Systém náhodných a skriptovaných událostí, které přinášejí rozhodnutí a ovlivňují průběh hry.

---

## Typy událostí

### Podle zdroje

| Typ | Popis | Příklad |
|-----|-------|---------|
| Náhodné | Generované podle pravděpodobnosti | Mor, sucho |
| Podmíněné | Spouštěné splněním podmínek | Dědická krize |
| Skriptované | Pevně dané v příběhu | Příchod draka |
| Řetězové | Navazující na předchozí | Důsledky rozhodnutí |
| Periodické | Pravidelně se opakující | Roční slavnosti |

### Podle rozsahu

| Rozsah | Ovlivněné entity | Příklad |
|--------|------------------|---------|
| Osobní | Jedna postava | Nemoc, láska |
| Lokální | Jedna osada | Požár, zločin |
| Regionální | Celá doména | Povstání, mor |
| Globální | Všechny domény | Kometa, invaze |

---

## Struktura události

| Atribut | Typ | Popis |
|---------|-----|-------|
| `event_id` | string | Unikátní identifikátor |
| `title` | string | Název události |
| `description` | string | Popis situace |
| `type` | enum | Typ události |
| `scope` | enum | Rozsah |
| `trigger` | object | Podmínky spuštění |
| `weight` | number | Váha pro náhodný výběr |
| `options` | array | Možná rozhodnutí |
| `effects` | object | Automatické efekty |
| `duration` | string | Trvání (pokud relevantní) |
| `cooldown` | string | Doba před zopakováním |
| `chain` | string | ID navazující události |

### Podmínky spuštění (trigger)

| Typ podmínky | Příklad |
|--------------|---------|
| `has_trait` | Postava má určitý trait |
| `relation_value` | Vztahy v určitém rozmezí |
| `resource_level` | Zásoby nad/pod hranicí |
| `season` | Konkrétní roční období |
| `year_range` | Roky od začátku hry |
| `war_status` | Ve válce / v míru |
| `random_chance` | Náhodná šance |
| `building_exists` | Existence budovy |
| `population_size` | Velikost populace |

---

## Možnosti rozhodnutí

### Struktura možnosti

| Atribut | Typ | Popis |
|---------|-----|-------|
| `option_id` | string | Identifikátor |
| `text` | string | Text možnosti |
| `tooltip` | string | Popis důsledků |
| `requirements` | object | Podmínky pro zobrazení |
| `costs` | object | Cena volby |
| `effects` | array | Důsledky volby |
| `ai_weight` | number | Preference AI |

### Typy efektů

| Efekt | Popis | Příklad |
|-------|-------|---------|
| `modify_resource` | Změna zdrojů | +100 zlata, −50 jídla |
| `modify_relation` | Změna vztahů | +20 s vazalem |
| `add_trait` | Přidání traitu | Postava získá "Štědrý" |
| `remove_trait` | Odebrání traitu | Ztráta "Zdravý" |
| `spawn_unit` | Vytvoření jednotky | 500 banditů |
| `trigger_event` | Spuštění další události | Řetězová reakce |
| `modify_stat` | Změna atributu | +2 diplomacie |
| `kill_character` | Smrt postavy | Mor zabije |
| `create_claim` | Vytvoření nároku | Slabý nárok na titul |
| `change_opinion` | Změna názoru | Vazalové nespokojeni |

---

## Kategorie událostí

### Přírodní katastrofy

#### Mor (plague)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Náhodně, vyšší šance v zimě, ve válce |
| Šance | 2%/rok, +5% pokud sousední doména má mor |
| Efekty | −10% až −40% populace, −50% produkce |
| Trvání | 6-24 měsíců |
| Možnosti | Karanténa, léčba, modlitby, nic |

#### Sucho (drought)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Léto, náhodně |
| Šance | 5%/rok |
| Efekty | −50% produkce potravin |
| Trvání | 3-6 měsíců |
| Možnosti | Import jídla, raciovnání, modlitby |

#### Povodeň (flood)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Jaro (tání), silné deště |
| Šance | 3%/rok u řek |
| Efekty | Zničení úrody, poškození osad |
| Trvání | 1-2 měsíce |
| Možnosti | Evakuace, záchranné práce, modlitby |

#### Zemětřesení (earthquake)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Náhodně, některé regiony |
| Šance | 1%/rok v rizikových oblastech |
| Efekty | Poškození budov, ztráty na životech |
| Trvání | Okamžité |
| Možnosti | Obnova, přesídlení |

### Ekonomické události

#### Obchodní boom (trade_boom)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Vysoká obchodní aktivita, nová trasa |
| Šance | 5%/rok pokud obchod > 10 |
| Efekty | +30% příjmy z obchodu, 2 roky |
| Možnosti | Investovat, zdanit, nechat být |

#### Hladomor (famine)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Nízké zásoby jídla |
| Šance | Automaticky při < 50% potřeb |
| Efekty | −5% populace/měsíc, nepokoje |
| Trvání | Dokud není dostatek jídla |
| Možnosti | Import, racionování, konfiskace |

#### Zlatá horečka (gold_rush)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Objev nového ložiska |
| Šance | 1%/rok v horských regionech |
| Efekty | +50% těžba, +20% imigrace |
| Trvání | 2-5 let |
| Možnosti | Regulovat, volný trh, znárodnit |

### Politické události

#### Povstání vazala (vassal_revolt)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Nízká loajalita, slabý vládce |
| Šance | Loajalita < 30 → 10%/rok |
| Efekty | Válka s vazalem |
| Možnosti | Vyjednávat, potlačit, ústupky |

#### Dědická krize (succession_crisis)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Smrt bez jasného dědice |
| Šance | Automaticky |
| Efekty | Frakce, možná občanská válka |
| Možnosti | Podporovat kandidáta, kompromis |

#### Korunovace (coronation)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Nový vládce |
| Šance | Automaticky |
| Efekty | +20 legitimita, náklady |
| Možnosti | Velkolepá, skromná, žádná |

#### Atentát (assassination_attempt)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Nepřátelé, nízká legitimita |
| Šance | 2%/rok × počet nepřátel |
| Efekty | Smrt/zranění, nebo odhalení |
| Možnosti | Vyšetřovat, popravit, ignorovat |

### Náboženské události

#### Zjevení (divine_vision)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Vysoká zbožnost, místo moci |
| Šance | 1%/rok pokud víra > 15 |
| Efekty | +20 víra, +10 legitimita |
| Možnosti | Oznámit, utajit, využít |

#### Hereze (heresy)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Nízká víra, kontakt s jinověrci |
| Šance | 3%/rok pokud víra < 5 |
| Efekty | Náboženský rozkol, nepokoje |
| Možnosti | Potlačit, tolerovat, konvertovat |

#### Svatá relikvie (holy_relic)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Výprava, dar od církve |
| Šance | 0.5%/rok |
| Efekty | +10 víra, +5 legitimita |
| Možnosti | Vystavit, prodat, darovat |

### Vojenské události

#### Banditismus (banditry)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Nízká bezpečnost, po válce |
| Šance | 10%/rok pokud bezpečnost < 50 |
| Efekty | −20% obchod, útoky na karavany |
| Možnosti | Vojenský zásah, vyjednávat, ignorovat |

#### Nájezd (raid)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Sousední nepřátelská doména |
| Šance | Závisí na vztazích a síle |
| Efekty | Ztráty zdrojů, zabití |
| Možnosti | Bránit se, vzdát se, vyjednávat |

#### Dezerce (desertion)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Nízká morálka, dlouhá válka |
| Šance | 5%/měsíc pokud morálka < 30 |
| Efekty | Ztráta jednotek |
| Možnosti | Popravy, bonus, přeorganizace |

### Osobní události

#### Nemoc (illness)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Náhodně, stáří, mor |
| Šance | 5%/rok + 1%/10 let věku |
| Efekty | −schopnosti, možná smrt |
| Možnosti | Léčit, modlit se, odpočívat |

#### Romance (romance)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Setkání, atraktivní postava |
| Šance | 3%/rok pro svobodné |
| Efekty | Možný sňatek, aféra, bastard |
| Možnosti | Sledovat, odmítnout, využít |

#### Zrození dědice (heir_birth)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Těhotenství |
| Šance | 80% úspěšný porod |
| Efekty | Nový dědic |
| Možnosti | Pojmenování, oslavy |

#### Vzdělávání (education_complete)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Konec výchovy (16 let) |
| Šance | Automaticky |
| Efekty | Finální traity podle učitele |
| Možnosti | Žádné (informativní) |

### Magické události

#### Magická anomálie (magical_anomaly)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Ley linie, místa moci |
| Šance | 2%/rok v magických oblastech |
| Efekty | +/− magická aktivita, mutace |
| Možnosti | Zkoumat, izolovat, využít |

#### Probuzení artefaktu (artifact_awakening)

| Atribut | Hodnota |
|---------|---------|
| Spouštěč | Vlastnictví artefaktu |
| Šance | 1%/rok za artefakt |
| Efekty | Artefakt získá nové schopnosti |
| Možnosti | Přijmout, odmítnout, zničit |

---

## Řetězové události

### Příklad řetězu: Epidemie

```
1. Zprávy o nemoci v sousední doméně
   → Možnosti: Zavřít hranice / Ignorovat / Připravit se

2a. (Pokud ignorováno) Nemoc se šíří
    → Možnosti: Karanténa / Léčba / Modlitby

2b. (Pokud zavřeno) Obchodní ztráty
    → Možnosti: Částečně otevřít / Vydržet

3. Vrchol epidemie
   → Automatické ztráty podle předchozích rozhodnutí

4. Odeznění
   → Možnosti: Oslavy / Obnova / Připisování viny
```

### Struktura řetězu

| Atribut | Typ | Popis |
|---------|-----|-------|
| `chain_id` | string | Identifikátor řetězu |
| `events` | array | Události v řetězu |
| `state` | object | Stav řetězu (rozhodnutí) |
| `current_event` | string | Aktuální událost |
| `completed` | boolean | Dokončen |

---

## Generování událostí

### Periodické kontroly

| Interval | Kontrolované události |
|----------|----------------------|
| Denně | Bitvy, pohyb armád |
| Týdně | Osobní události, lokální |
| Měsíčně | Ekonomické, regionální |
| Sezónně | Počasí, sklizeň |
| Ročně | Globální, politické |

### Váhový systém

```
šance_události = základní_váha
    × podmínky_modifikátor
    × (1 - podobné_nedávné × 0.5)
    × obtížnost_modifikátor
```

### Pool událostí

Pro každou kontrolu se vytvoří pool vhodných událostí:

1. Filtrování podle podmínek
2. Výpočet vah
3. Náhodný výběr podle vah
4. Spuštění události

---

## AI rozhodování

### Preference AI

Každá možnost má `ai_weight` ovlivněný:

| Faktor | Vliv na váhu |
|--------|--------------|
| Personality traity | ±50% |
| Aktuální situace | ±30% |
| Vztahy s dotčenými | ±20% |
| Náhodnost | ±10% |

### Příklad AI rozhodování

```
Událost: Žádost o pomoc od souseda

Možnost A: Pomoci (cost: 100 zlata)
- ai_weight: 50
- laskavý: +20
- vztahy > 50: +15
- zlato < 200: -10
- finální: 75

Možnost B: Odmítnout
- ai_weight: 40
- sobecký: +15
- vztahy < 0: +10
- finální: 65

→ AI vybere Možnost A
```

---

## Modifikátory událostí

### Dočasné modifikátory

Události mohou přidávat dočasné modifikátory:

| Atribut | Typ | Popis |
|---------|-----|-------|
| `modifier_id` | string | Identifikátor |
| `name` | string | Název |
| `effects` | object | Efekty |
| `duration` | string | Trvání |
| `stackable` | boolean | Lze kumulovat |
| `icon` | string | Ikona |

### Příklady modifikátorů

| Modifikátor | Efekt | Trvání |
|-------------|-------|--------|
| Požehnání úrody | +20% potraviny | 1 rok |
| Morová rána | −30% populace | Dokud neskončí |
| Vítězná euforie | +20 morálka | 6 měsíců |
| Ekonomická krize | −25% příjmy | 2 roky |
| Zlatý věk | +20% vše | 10 let |

---

## Herní akce související s událostmi

| Akce | Cena | Efekt |
|------|------|-------|
| Modlit se za ochranu | 10 vlivu | −10% šance negativních událostí |
| Uspořádat festival | 50 zlata | +10 spokojenost, možné pozitivní události |
| Vyhlásit výjimečný stav | 0 | Speciální pravidla, −10 spokojenost |
| Pozvat věštce | 30 zlata | Varování před nadcházejícími událostmi |
| Přinést oběť | 100 zlata | +20% šance pozitivních událostí |
