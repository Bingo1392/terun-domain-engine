# Terén

Mapa je rozdělena hexy o průměru 10 km. Každý hex má převažující typ terénu, který určuje různé vlastnosti jako rychlost pohybu, bonus či postih pro různé druhy jednotek, bonus pro obránce, atd.

---

## Herní atributy hexu

Každý hex na mapě má tyto základní atributy:

| Atribut | Typ | Popis |
|---------|-----|-------|
| `terrain_type` | string | Základní typ terénu |
| `wilderness_level` | 0-5 | Stupeň divočiny (0 = civilizované) |
| `has_river` | boolean | Přítomnost řeky |
| `has_coast` | boolean | Přítomnost pobřeží |
| `has_lake` | boolean | Přítomnost jezera |
| `road_type` | enum | Typ cesty (`none`, `trail`, `dirt`, `paved`, `stone`) |
| `elevation` | number | Nadmořská výška (pro vizualizaci) |
| `climate` | enum | Podnebí (`arctic`, `temperate`, `continental`, `tropical`, `arid`) |

---

## Typy terénu

### Přehledová tabulka

| Terén | Klíč | Pohyb | Obrana | Kolonizace | Možné zdroje |
|-------|------|-------|--------|------------|--------------|
| Poušť | `desert` | 0.7 | 0.9 | 1% | - |
| Pouštní hory | `desert_mountains` | 0.3 | 1.5 | 1% | Kovy, krystaly |
| Suchá země | `dry_lands` | 0.9 | 1.0 | 10% | Pastviny |
| Orná půda | `farmland` | 1.0 | 0.9 | 90% | Obilí |
| Záplavná oblast | `floodplain` | 0.8 | 0.9 | 40% | Obilí (vysoké) |
| Les | `forest` | 0.5 | 1.3 | 15% | Dřevo, zvěř |
| Kopce | `hills` | 0.7 | 1.2 | 20% | Kovy, pastviny |
| Džungle | `jungle` | 0.3 | 1.4 | 2% | Megwa, byliny |
| Hory | `mountains` | 0.25 | 1.6 | 5% | Kovy, krystaly, drahokamy |
| Oázy | `oasis` | 1.0 | 1.0 | 50% | Obilí (malé) |
| Pláně | `plains` | 1.2 | 0.8 | 30% | Pastviny, obilí |
| Stepi | `steppe` | 1.1 | 0.85 | 15% | Pastviny |
| Taiga | `taiga` | 0.5 | 1.2 | 5% | Dřevo, kožešiny |
| Mokřady | `marshes` | 0.4 | 1.3 | 5% | Akimora |
| Pobřeží | `coast` | 0.9 | 1.0 | 35% | Ryby |
| Jezero | `lake` | - | - | 10% | Ryby, Adak |
| Vulkanická oblast | `volcanic` | 0.6 | 1.1 | 2% | Emeret, drahokamy |

---

### Poušť (desert)

Rozsáhlé písečné nebo kamenité oblasti s minimálními srážkami.

**Lorové informace:**
Pohyb pouští je vyčerpávající a bez dostatečných zásob vody smrtelně nebezpečný. Osídlení je možné pouze v oázách. Pouště jsou domovem nomádských kmenů a skrývají ruiny dávných civilizací.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.7 (−30%) |
| Obranný bonus | 0.9 (−10%) |
| Šance kolonizace | 1% |
| Možné zdroje | Žádné |
| Zásobování | −50% (nedostatek vody) |
| Bonus jízdy | +10% (písečná jízda) |

**Speciální pravidla:**
- Armády bez zásob vody ztrácejí 10% mužů denně
- V noci teplota klesá - pohyb v noci je efektivnější

---

### Pouštní hory (desert_mountains)

Skalnaté hory v pouštních oblastech.

**Lorové informace:**
Kombinují náročnost horského terénu s nedostatkem vody. Mohou obsahovat naleziště vzácných kovů a krystalů. Průsmyky v pouštních horách jsou strategicky důležité pro kontrolu obchodních cest.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.3 (−70%) |
| Obranný bonus | 1.5 (+50%) |
| Šance kolonizace | 1% |
| Možné zdroje | Zlato, stříbro, železo, měď, krystaly |
| Zásobování | −60% |
| Bonus jízdy | −50% (nevhodné pro jízdu) |

---

### Suchá země (dry_lands)

Polosucké oblasti s řídkou vegetací.

**Lorové informace:**
Nejsou tak nehostinné jako pouště, ale zemědělství je zde obtížné. Vhodné pro pastevectví koz a ovcí. Časté sucho může způsobit hladomory.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.9 (−10%) |
| Obranný bonus | 1.0 |
| Šance kolonizace | 10% |
| Možné zdroje | Pastviny |
| Zásobování | −20% |
| Modifikátor produkce pastvin | 0.7 (−30%) |

**Speciální pravidla:**
- 20% šance na sucho každý rok (−50% produkce)

---

### Orná půda (farmland)

Úrodná zemědělská půda vhodná pro pěstování obilí a dalších plodin.

**Lorové informace:**
Nejcennější typ terénu pro rozvoj civilizace. Oblasti s ornou půdou přitahují osadníky a jsou často předmětem sporů mezi doménami. Vysoká pravděpodobnost spontánního vzniku lidských osad.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 1.0 |
| Obranný bonus | 0.9 (−10%, otevřený terén) |
| Šance kolonizace | 90% |
| Možné zdroje | Obilí |
| Zásobování | +20% (místní produkce) |
| Modifikátor produkce obilí | 1.0 (základ) |
| Růst osady | +2/rok |

---

### Záplavná oblast (floodplain)

Nížiny podél řek, které jsou pravidelně zaplavovány.

**Lorové informace:**
Mimo období záplav jsou velmi úrodné. Záplavy přinášejí živiny, ale mohou zničit úrodu a osady. Vyžadují stavbu hrází a kanálů pro bezpečné osídlení.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.8 (−20%) |
| Obranný bonus | 0.9 |
| Šance kolonizace | 40% |
| Možné zdroje | Obilí (vysoká kvalita) |
| Modifikátor produkce obilí | 1.5 (+50%) |
| Riziko záplav | 15%/rok (na jaře) |

**Speciální pravidla:**
- Záplavy: 30% šance zničení úrody, 10% poškození osad
- Hráze (budova): snižují riziko záplav na 5%

---

### Les (forest)

Zalesněné oblasti poskytující dřevo, zvěřinu a lesní plody.

**Lorové informace:**
Lesy zpomalují pohyb armád, ale poskytují výborný úkryt pro obránce a partyzány. Lesní osady jsou často skryté a těžko dostupné. Některé lesy jsou domovem elfů a dalších lesních bytostí.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.5 (−50%) |
| Obranný bonus | 1.3 (+30%) |
| Šance kolonizace | 15% |
| Možné zdroje | Dřevo, zvěřina |
| Bonus lučištníků | +20% |
| Bonus jízdy | −30% |
| Skrytí jednotek | +50% |

**Speciální pravidla:**
- Těžba dřeva: 500 kg/pracovník/rok
- Obnovitelný zdroj (stromy dorůstají za 20 let)

---

### Kopce (hills)

Zvlněná krajina mezi rovinami a horami.

**Lorové informace:**
Kopce nabízejí dobré obranné pozice a často obsahují naleziště kovů. Pastevectví je zde běžné. Kopce zpomalují pohyb, ale ne tak výrazně jako hory.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.7 (−30%) |
| Obranný bonus | 1.2 (+20%) |
| Šance kolonizace | 20% |
| Možné zdroje | Železo, měď, cín, olovo, stříbro, palamantin, pastviny |
| Bonus lučištníků | +15% (výšková výhoda) |
| Modifikátor produkce pastvin | 0.8 |

---

### Džungle (jungle)

Husté tropické pralesy s bujnou vegetací.

**Lorové informace:**
Pohyb džunglí je extrémně pomalý a nebezpečný. Džungle skrývají vzácné zdroje jako Megwa a exotické byliny, ale také smrtelné nemoci a nebezpečná stvoření. Civilizace zde vznikají jen obtížně.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.3 (−70%) |
| Obranný bonus | 1.4 (+40%) |
| Šance kolonizace | 2% |
| Možné zdroje | Megwa, exotické byliny |
| Riziko nemocí | 5%/měsíc pro armády |
| Skrytí jednotek | +70% |
| Bonus jízdy | −60% |

**Speciální pravidla:**
- Tropické nemoci: 5% šance na mor pro armády každý měsíc
- Domorodci mohou mít imunitu

---

### Hory (mountains)

Vysokohorské oblasti s drsnými podmínkami.

**Lorové informace:**
Hory jsou téměř neprůchodné pro velké armády a poskytují dokonalou přirozenou obranu. Horské průsmyky jsou strategicky klíčové. V horách se nacházejí naleziště kovů, krystalů a drahokamů. Trpaslíci preferují horské oblasti.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.25 (−75%) |
| Obranný bonus | 1.6 (+60%) |
| Šance kolonizace | 5% (trpasličí 25%) |
| Možné zdroje | Všechny kovy, krystaly, drahokamy, antracit |
| Max velikost armády | 500 (bez průsmyku) |
| Bonus jízdy | −80% |
| Bonus pro obránce | +100% na průsmycích |

**Speciální pravidla:**
- Průsmyky umožňují pohyb větších armád
- V zimě riziko lavin (5% šance ztráty 10% vojáků)

---

### Oázy (oasis)

Zelené ostrovy uprostřed pouští s přístupem k vodě.

**Lorové informace:**
Oázy jsou životně důležité pro přežití v pouštních oblastech a kontrola nad nimi znamená kontrolu nad obchodními cestami. Malé, ale úrodné oblasti vhodné pro intenzivní zemědělství.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 1.0 |
| Obranný bonus | 1.0 |
| Šance kolonizace | 50% |
| Možné zdroje | Obilí (malé naleziště) |
| Max velikost naleziště | `small` |
| Strategická hodnota | Vysoká (kontrola pouštních cest) |

**Speciální pravidla:**
- Jediné místo v poušti, kde lze doplnit zásoby vody
- +30% mýtné z pouštních karavan

---

### Pláně (plains)

Rozsáhlé travnaté roviny.

**Lorové informace:**
Ideální terén pro jízdu a rychlý pohyb armád. Pláně jsou vhodné pro pastevectví a v úrodnějších oblastech i pro zemědělství. Těžko bránitelné - dominuje zde mobilita a síla jezdectva.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 1.2 (+20%) |
| Obranný bonus | 0.8 (−20%) |
| Šance kolonizace | 30% |
| Možné zdroje | Pastviny, obilí (okrajově) |
| Bonus jízdy | +30% |
| Bonus pro útočníka | +10% |

---

### Stepi (steppe)

Suché travnaté pláně s kontinentálním klimatem.

**Lorové informace:**
Horká léta a kruté zimy. Domov nomádských jezdců a kočovných kmenů. Zemědělství je omezené, převládá pastevectví koní a dobytka. Stepní válečníci jsou obávanými jezdci.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 1.1 (+10%) |
| Obranný bonus | 0.85 (−15%) |
| Šance kolonizace | 15% |
| Možné zdroje | Pastviny |
| Bonus jízdy | +40% |
| Modifikátor produkce pastvin | 0.9 |

**Speciální pravidla:**
- Kočovníci: +20% efektivita jízdy
- Kruté zimy: −30% produkce v zimě

---

### Taiga (taiga)

Severské jehličnaté lesy s dlouhými zimami.

**Lorové informace:**
Řídké osídlení kvůli drsnému klimatu. Taiga poskytuje dřevo a kožešiny. Pohyb v zimě je možný pouze na lyžích nebo saních. Domov severských kmenů a mystických bytostí.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.5 (−50%), v zimě 0.3 (−70%) |
| Obranný bonus | 1.2 (+20%) |
| Šance kolonizace | 5% |
| Možné zdroje | Dřevo, kožešiny |
| Sezónní modifikátor (zima) | −40% produkce |

**Speciální pravidla:**
- Zimní přežití: armády bez zimního vybavení ztrácejí 5% mužů/měsíc

---

### Mokřady (marshes)

Bažinaté oblasti s vysokou hladinou spodní vody.

**Lorové informace:**
Pohyb mokřady je pomalý a nebezpečný - hrozí uvíznutí v bahně. Těžko dobyvatelné, poskytují přirozenou obranu. V mokřadech roste Akimora a další vzácné rostliny. Mokřady jsou často považovány za prokleté a vyhýbají se jim.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.4 (−60%) |
| Obranný bonus | 1.3 (+30%) |
| Šance kolonizace | 5% |
| Možné zdroje | Kůra Akimory |
| Bonus jízdy | −70% |
| Riziko uvíznutí | 10% pro těžké jednotky |

**Speciální pravidla:**
- Těžká jízda a vozy mají 10% šanci uvíznout každý hex
- Obléhací stroje nelze použít

---

## Divočina

Divočina je označení pro oblast, která je pod vlivem astrálních trhlin.

**Lorové informace:**
Dlouhodobě je velmi nebezpečné se zdržovat v blízkosti astrálních trhlin. Může docházet k divokým změnám počasí, mutacím fauny či flory a nebo dokonce ke vzniku nových bytostí. Existují magické praktiky, jak astrální trhlinu zavřít. Někteří však nechávají trhliny schválně otevřené, jelikož Divočina je jediné místo, kde mohou samovolně vzniknout Krystaly.

### Stupně divočiny

| Stupeň | Název | Efekty |
|--------|-------|--------|
| 0 | Civilizovaná | Žádné efekty |
| 1 | Divoká | 5% šance na anomálii, možné krystaly |
| 2 | Nebezpečná | 15% šance na anomálii, běžné krystaly |
| 3 | Prokletá | 30% šance na anomálii, časté krystaly |
| 4 | Chaotická | 50% šance na anomálii, bohaté krystaly |
| 5 | Astrální trhlina | 80% šance na anomálii, extrémní krystaly |

### Herní atributy divočiny

| Atribut | Hodnota podle stupně |
|---------|---------------------|
| Šance na anomálii/měsíc | stupeň × 10% |
| Bonus produkce krystalů | stupeň × 20% |
| Riziko pro osady | stupeň × 5%/rok |
| Riziko pro armády | stupeň × 2%/měsíc |
| Šance na spawn nového naleziště krystalů | stupeň × 1%/rok |

### Typy anomálií

| Anomálie | Pravděpodobnost | Efekt |
|----------|-----------------|-------|
| Bouře | 30% | −50% pohyb na 1 den |
| Mutace | 20% | Změna vlastností jednotek |
| Portál | 15% | Spawn nepřátelských bytostí |
| Časová smyčka | 10% | Ztráta 1-7 dní |
| Magická vlna | 15% | +50% nebo −50% magie na hex |
| Proměna terénu | 10% | Změna typu terénu |

---

## Cesta

Na hexech mohou existovat cesty. Cesty dávají bonus k pohybu a prosperitě oblasti.

### Kvalita cest

| Typ | Klíč | Bonus pohybu | Bonus obchodu | Cena stavby | Údržba/rok |
|-----|------|--------------|---------------|-------------|------------|
| Žádná | `none` | 0% | 0% | - | 0 |
| Pěšina | `trail` | +10% | +5% | 0 (vyšlape se) | 0 |
| Polní cesta | `dirt` | +25% | +10% | 10 | 1 |
| Zpevněná cesta | `paved` | +50% | +20% | 50 | 5 |
| Dlážděná silnice | `stone` | +100% | +40% | 200 | 20 |

### Herní atributy cest

| Atribut | Typ | Popis |
|---------|-----|-------|
| `road_type` | enum | Kvalita cesty |
| `road_connections` | array | Hrany hexu, kde cesta pokračuje |
| `bridge` | boolean | Přítomnost mostu |
| `toll_rate` | number | Sazba mýtného (0-10%) |

### Speciální pravidla

- V období dešťů polní cesty ztrácejí 50% bonusu
- Mosty a průsmyky lze zničit (oprava: 50% ceny stavby)
- Kontrola mostu/průsmyku = možnost vybírat mýtné

---

## Řeky

Řeky jsou důležitým geografickým prvkem, který ovlivňuje jak pohyb, tak ekonomiku.

### Herní atributy řek

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu (přechod bez mostu) | 0.3 (−70%) |
| Modifikátor pohybu (po řece lodí) | 1.5 (+50%) |
| Obranný bonus (řeka mezi armádami) | +40% pro obránce |
| Možné zdroje | Ryby, zlato (rýžování) |
| Bonus pro osady | +10% růst |

### Typy řek

| Typ | Šířka | Přechod bez mostu | Kapacita lodí |
|-----|-------|-------------------|---------------|
| Potok | < 5m | Snadný (−20%) | Žádná |
| Říčka | 5-20m | Možný (−50%) | Malé čluny |
| Řeka | 20-100m | Obtížný (−70%) | Říční lodě |
| Velká řeka | > 100m | Nemožný bez lodí | Velké lodě |

### Speciální pravidla

- V zimě zamrzlé řeky umožňují přechod (ale riziko prolomení ledu)
- Říční přístavy: +30% obchodní kapacita

---

## Pobřeží

Hexy při mořském pobřeží mají zvláštní vlastnosti.

### Herní atributy pobřeží

| Atribut | Hodnota |
|---------|---------|
| Modifikátor pohybu | 0.9 (−10%) |
| Možné zdroje | Ryby |
| Šance kolonizace | 35% |
| Možnost přístavu | Ano |
| Riziko pirátů | 10% pro obchodní lodě |

### Typy pobřeží

| Typ | Klíč | Vylodění | Přístav |
|-----|------|----------|---------|
| Pláž | `beach` | Snadné | Ano |
| Útesy | `cliffs` | Nemožné | Ne |
| Skalnaté | `rocky` | Obtížné (−50%) | Malý |
| Mangrovové | `mangrove` | Velmi obtížné | Ne |

---

## Modifikátory produkce podle terénu

Každý terén ovlivňuje efektivitu produkce různých zdrojů:

| Terén | Obilí | Pastviny | Ryby | Kovy | Krystaly | Dřevo |
|-------|-------|----------|------|------|----------|-------|
| farmland | 1.0 | 0.3 | - | - | - | - |
| floodplain | 1.5 | 0.2 | 0.5 | - | - | - |
| plains | 0.5 | 1.0 | - | - | - | - |
| hills | 0.3 | 0.8 | - | 1.0 | 0.5 | 0.3 |
| mountains | - | 0.2 | - | 1.2 | 1.0 | - |
| forest | - | 0.3 | - | - | - | 1.0 |
| jungle | - | - | - | - | - | 0.8 |
| marshes | - | - | 0.5 | - | - | 0.3 |
| steppe | - | 0.9 | - | - | - | - |
| coast | - | - | 1.0 | - | - | - |
| lake | - | - | 0.8 | - | - | - |
| wilderness | - | - | - | - | 1.5+ | - |

*Poznámka: `-` znamená, že daný zdroj na tomto terénu nelze produkovat.*
