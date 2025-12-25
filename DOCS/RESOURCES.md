# Zdroje

## Základní zdroje

Základní zdroje jsou měnou domény - měříme jejich nominální hodnotu a postupně je utrácíme.

### Zlato

Slouží jako univerzální platidlo. Viz [DOMAINS.md](./DOMAINS.md) pro detaily.

### Vliv

Díky vlivu je možné dosahovat politických cílů a legalizovat chování. Viz [DOMAINS.md](./DOMAINS.md) pro detaily.

---

## Systém produkce zdrojů

Každý zdroj je vázán na **naleziště** (deposit), které se nachází v konkrétním hexu. Naleziště musí být přiřazeno k **osadě**, která poskytuje pracovní sílu pro jeho využívání. Osada patří do **domény**, která z produkce profituje.

```
Hex (terén + naleziště) → Osada (pracovníci) → Doména (vlastník)
```

### Struktura naleziště

Každé naleziště má tyto atributy:

| Atribut | Typ | Popis |
|---------|-----|-------|
| `resource_key` | string | Typ zdroje (např. `iron`, `grain`) |
| `hex_id` | string | Pozice na mapě |
| `hamlet_id` | string | Přiřazená osada |
| `quality` | 1-5 | Kvalita naleziště (bohatost) |
| `size` | enum | `small`, `medium`, `large`, `huge` |
| `depletion` | 0-100 | Míra vyčerpání (0 = plné, 100 = vyčerpané) |
| `workers_assigned` | number | Počet přiřazených pracovníků |
| `infrastructure_level` | 0-4 | Úroveň infrastruktury (doly, pole, atd.) |

### Vzorec produkce

```
roční_produkce = základní_výtěžnost
    × kvalita
    × velikost_modifikátor
    × (1 - vyčerpání/100)
    × min(pracovníci / optimální_pracovníci, 1)
    × infrastruktura_modifikátor
    × terén_modifikátor
    × sezóna_modifikátor
    × náhoda(0.9, 1.1)
```

### Modifikátory velikosti

| Velikost | Modifikátor | Optimální pracovníci | Max pracovníci |
|----------|-------------|---------------------|----------------|
| small | 0.5 | 20 | 50 |
| medium | 1.0 | 50 | 150 |
| large | 2.0 | 150 | 400 |
| huge | 4.0 | 400 | 1000 |

### Modifikátory infrastruktury

| Úroveň | Název | Modifikátor | Cena stavby | Údržba/rok |
|--------|-------|-------------|-------------|------------|
| 0 | Primitivní | 0.5 | - | 0 |
| 1 | Základní | 1.0 | 50 | 5 |
| 2 | Rozvinutá | 1.5 | 150 | 15 |
| 3 | Pokročilá | 2.0 | 400 | 40 |
| 4 | Mistrovská | 2.5 | 1000 | 100 |

---

## Ostatní zdroje

Doména nemusí mít k těmto zdrojům přístup. Přístup ke zdroji lze získat:

- Vlastnictvím místa, kde se zdroj nachází
- Obchodem s doménou, která přístup má
- Obchodem na černém trhu (velmi drahé)

---

## Potraviny

### Obilí (grain)

Obilná pole jsou hlavním zdrojem potravy pro lidské populace.

**Lorové informace:**
Pěstování obilí vyžaduje úrodnou ornou půdu a vhodné klimatické podmínky. Nejvhodnější terény pro zemědělství jsou roviny, říční údolí a mírně zvlněná krajina. Obilí je základem výživy většiny osad. Nedostatek obilí vede k hladomorům, nepokojům a úpadku populace.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `food` |
| Základní výtěžnost | 3 000 kg/pracovník/rok |
| Požadovaný terén | `farmland`, `floodplain`, `oasis` |
| Rizikovost | 0.01 (1%) |
| Trvanlivost | 24 měsíců |
| Ztráta skladováním | 1%/měsíc |
| Základní cena | 0.10 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |

**Sezónní modifikátory produkce:**

| Jaro | Léto | Podzim | Zima |
|------|------|--------|------|
| 0.0 | 0.2 | 1.0 | 0.0 |

*Poznámka: Obilí se sklízí primárně na podzim. Produkce mimo sezónu představuje přípravu půdy a zasívání.*

---

### Pastviny (pasture)

Pastviny poskytují mix živočišných produktů - mléko, mléčné výrobky a maso.

**Lorové informace:**
Chov dobytka, ovcí a koz vyžaduje travnaté oblasti s dostatkem vody. Pastevectví je méně náročné na kvalitu půdy než zemědělství, ale vyžaduje větší rozlohu. Produkty z pastvin jsou luxusnějším zdrojem potravy než obilí.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `food` |
| Základní výtěžnost | 200 kg/pracovník/rok |
| Požadovaný terén | `plains`, `hills`, `steppe`, `dry_lands` |
| Rizikovost | 0.02 (2%) |
| Trvanlivost | 1 měsíc (čerstvé), 12 měsíců (sušené/uzené) |
| Ztráta skladováním | 5%/měsíc (čerstvé), 2%/měsíc (konzervované) |
| Základní cena | 0.12 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Částečně |

**Sezónní modifikátory produkce:**

| Jaro | Léto | Podzim | Zima |
|------|------|--------|------|
| 1.2 | 1.3 | 0.8 | 0.5 |

---

### Ryby (fish)

Loviště ryb jsou důležitým zdrojem potravy pro pobřežní a říční osady.

**Lorové informace:**
Rybolov je možný podél mořského pobřeží, u jezer a podél velkých řek. Ryby jsou rychle se kazícím zbožím, což omezuje jejich transport do vnitrozemí. Sušené a solené ryby však mohou být skladovány a obchodovány na velké vzdálenosti. Práce rybářů je nebezpečná - bouře, převržení lodí a utonutí jsou běžnými riziky.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `food` |
| Základní výtěžnost | 500 kg/pracovník/rok |
| Požadovaný terén | `coast`, `river`, `lake` |
| Rizikovost | 0.05 (5%) |
| Trvanlivost | 3 dny (čerstvé), 12 měsíců (solené) |
| Ztráta skladováním | 100%/týden (čerstvé), 2%/měsíc (solené) |
| Základní cena | 0.15 zlata/kg |
| Obchodovatelné | Ano (pouze konzervované na dálku) |
| Skladovatelné | Ne (čerstvé), Ano (solené) |

**Sezónní modifikátory produkce:**

| Jaro | Léto | Podzim | Zima |
|------|------|--------|------|
| 1.2 | 1.3 | 0.9 | 0.4 |

---

## Základní kovy

### Železo (iron)

Základní kov užívaný k výrobě zbraní, zbrojí a nástrojů.

**Lorové informace:**
Jedná se o nejrozšířenější kov na Astarogu a jeho dostupnost je klíčová pro rozvoj armád i hospodářství. Železné doly se nacházejí především v horských a kopcovitých oblastech. Práce v železných dolech je poměrně bezpečná, ale stále hrozí riziko důlních neštěstí. Železo samo o sobě nemá vysokou hodnotu, ale jeho zpracování v kovářských dílnách vytváří zbraně, nástroje a další výrobky.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `basic_metals` |
| Základní výtěžnost | 100 kg/pracovník/rok |
| Požadovaný terén | `mountains`, `hills` |
| Rizikovost | 0.10 (10%) |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 0.003 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano (pomalu) |

**Rychlost vyčerpání:** 0.5% ročně při plné produkci

---

### Měď (copper)

Všestranný kov s charakteristickou červenohnědou barvou.

**Lorové informace:**
Používá se k výrobě oběživa (měděné mince), ve slitinách s cínem tvoří bronz a s zinkem mosaz. Měď je také důležitá pro výrobu nádob, šperků a dekorativních předmětů. Díky své relativní dostupnosti a mnohostrannosti je měď jedním z nejobchodovanějších kovů.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `basic_metals` |
| Základní výtěžnost | 80 kg/pracovník/rok |
| Požadovaný terén | `mountains`, `hills` |
| Rizikovost | 0.08 (8%) |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 0.002 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano (pomalu) |

**Rychlost vyčerpání:** 0.5% ročně při plné produkci

---

### Cín (tin)

Měkký kov, který se používá především ve slitinách.

**Lorové informace:**
Kombinace cínu a mědi vytváří bronz, který je tvrdší než oba původní kovy. Cín se také používá k pocínování železných předmětů, čímž je chrání před rzí. Naleziště cínu se vyskytují v horských oblastech a jsou poměrně vzácná, což z cínu činí důležitou obchodní komoditu.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `basic_metals` |
| Základní výtěžnost | 90 kg/pracovník/rok |
| Požadovaný terén | `mountains`, `hills` |
| Rizikovost | 0.09 (9%) |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 0.0025 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano (pomalu) |
| Vzácnost spawnu | Střední |

**Rychlost vyčerpání:** 0.8% ročně při plné produkci

---

### Olovo (lead)

Těžký, měkký kov šedé barvy.

**Lorové informace:**
Využívá se v instalatérství pro výrobu potrubí, k výrobě střeliva a jako materiál pro pečetě a závaží. Olovo je také důležité pro stavebnictví. Práce s olovem může být nebezpečná kvůli jeho jedovatosti. Dlouhodobé vystavení olovu způsobuje otravu. Horníci v olověných dolech proto mívají kratší život.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `basic_metals` |
| Základní výtěžnost | 120 kg/pracovník/rok |
| Požadovaný terén | `mountains`, `hills` |
| Rizikovost | 0.15 (15%) - toxické |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 0.0012 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano (pomalu) |

**Speciální:** Pracovníci v olověných dolech mají zkrácenou životnost (-10 let průměrně).

---

## Drahé kovy

### Zlato (gold)

Ušlechtilý kov užívaný ve šperkařství a jako univerzální platidlo.

**Lorové informace:**
Zlato je hlavním platidlem na Astarogu. Jedná se o krásný a vzácný žlutý kov. Říká se mu kov králů. Zlaté doly přinášejí svým držitelům veliké bohatství.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `precious_metals` |
| Základní výtěžnost | 0.5 kg/pracovník/rok |
| Požadovaný terén | `mountains`, `hills`, `river` (rýžování) |
| Rizikovost | 0.15 (15%) |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 20 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano (středně rychle) |
| Vzácnost spawnu | Velmi nízká |

**Rychlost vyčerpání:** 2% ročně při plné produkci

---

### Stříbro (silver)

Ušlechtilý kov užívaný ve šperkařství a pro výrobu oběživa.

**Lorové informace:**
Oproti zlatu se nejedná o tak klíčový kov, ale stále přináší svému držiteli velký výdělek. Stříbro se používá pro ražbu mincí střední hodnoty.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `precious_metals` |
| Základní výtěžnost | 10 kg/pracovník/rok |
| Požadovaný terén | `mountains`, `hills` |
| Rizikovost | 0.12 (12%) |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 0.67 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano (středně rychle) |
| Vzácnost spawnu | Nízká |

**Rychlost vyčerpání:** 1.5% ročně při plné produkci

---

### Drahokamy (gems)

Vzácné kameny užívané ve šperkovnictví.

**Lorové informace:**
Drahokamy jsou velmi výnosným artiklem pro výrobu šperků nebo pro výrobu magických předmětů. Je možné je jednoduše směnit a používat jako platidlo.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `luxury` |
| Základní výtěžnost | 2 kg/pracovník/rok |
| Požadovaný terén | `mountains`, `volcanic` |
| Rizikovost | 0.10 (10%) |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 80 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano (rychle) |
| Vzácnost spawnu | Velmi nízká |

**Rychlost vyčerpání:** 3% ročně při plné produkci

---

## Magické kovy

### Emeretová ruda (emeret)

Vzácný narudlý kov prorostlý rudými až světelkujícími žílami magie.

**Lorové informace:**
Není tak tvrdý jako železo, ale je vhodný k výrobě magických předmětů, jelikož posiluje jejich účinky. Už jen zbraň vyrobena z tohoto kovu má vlastnosti kouzelné zbraně. Žíly emeretové rudy je možné najít v oblasti aktivních sopek. Emeret nasává vibrace a magickou sílu vulkánu. Jakmile je emeret vykután a odnesen pryč od vulkánu, jeho magická síla pomalu vyhasíná a po 6-11 letech vyhasne úplně.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `magical_metals` |
| Základní výtěžnost | 8 kg/pracovník/rok |
| Požadovaný terén | `volcanic` |
| Rizikovost | 0.20 (20%) - vulkanická aktivita |
| Trvanlivost | 6-11 let (magická síla) |
| Ztráta skladováním | 1%/měsíc (magická síla) |
| Základní cena | 40 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano (ale degraduje) |
| Vyčerpatelné | Ano |
| Vzácnost spawnu | Velmi nízká |

**Speciální:** Po vyčerpání magické síly se stává nekvalitním kovem (hodnota 0.001 zlata/kg).

**Obnovení:** Může nabrat sílu zpět po 15-35 letech v blízkosti aktivního vulkánu.

---

### Adaková ruda (adak)

Vzácný neutrální až namodralý kov ze skořápky Slávky adakové.

**Lorové informace:**
Je velmi silný, ale práce s ním je náročná. V klasické výhni s ním není možné pracovat - ke zpracování je nutná magická výheň s antracitem. Adakus se hodí především na výrobu zbraní a zbrojí. Je daleko silnější než ocel. Jeho výhodou a zároveň nevýhodou je odpudivost magie. Naleziště se nachází v oblastech velkých sladkovodních jezer.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `magical_metals` |
| Základní výtěžnost | 12 kg/pracovník/rok |
| Požadovaný terén | `lake` (sladkovodní) |
| Rizikovost | 0.08 (8%) - potápění |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 10 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano (obnovitelné - mlži rostou) |
| Vzácnost spawnu | Velmi nízká |

**Speciální:**
- Vyžaduje antracit pro zpracování
- Odpuzuje magii - nelze očarovat, ale dává odolnost vůči magii
- Obnovitelné: mlži dorůstají, ale pomalu (obnova 5%/rok)

---

### Palamantin

Kámen různých barev, který je jednoduše očarovatelný.

**Lorové informace:**
Díky jeho schopnostem se z něho dají stavět velmi silné a zpevněné budovy. Hodí se i pro stavbu výškových budov. Je skvělý i k dekorativním účelům, jelikož pomocí magie dokáže změnit barvu. Jedná se o velmi žádaný kámen pro stavbu honosných paláců.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `building_materials` |
| Základní výtěžnost | 200 kg/pracovník/rok |
| Požadovaný terén | `mountains`, `hills` |
| Rizikovost | 0.06 (6%) |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 0.02 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano (pomalu) |
| Vzácnost spawnu | Nízká |

**Speciální:** Budovy z palamantinu mají +50% odolnost a mohou být magicky vylepšeny.

---

### Antracit

Vzácný druh černého uhlí s extrémně vysokou výhřevností.

**Lorové informace:**
Používá se ke zpracování Adakové rudy v magických výhních. Běžné uhlí nedokáže vyvinout dostatečný žár.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `fuel` |
| Základní výtěžnost | 150 kg/pracovník/rok |
| Požadovaný terén | `mountains` |
| Rizikovost | 0.12 (12%) |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 0.05 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ano |
| Vzácnost spawnu | Nízká |

**Speciální:** Nutný pro zpracování adaku a některé magické procesy.

---

## Magické rostliny

### Kůra Akimory

Kůra z černé vrby rostoucí v bažinách.

**Lorové informace:**
Akimora je černá vrba, která roste v oblastech bažin. Z tohoto stromu je zajímavá pouze kůra, kterou užívají alchymisté k získání vázané many a tedy i výrobu magických předmětů. Po vyčerpání vázané many se z odpadu vyrábí černá barva. Kůru je možné sklízet ze stromů tlustých alespoň 25 coulů. Po sklizni trvá asi 5 let než kůra opět doroste.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `magical_plants` |
| Základní výtěžnost | 30 kg/pracovník/rok |
| Požadovaný terén | `marshes` |
| Rizikovost | 0.08 (8%) - bažiny jsou nebezpečné |
| Trvanlivost | 24 měsíců |
| Ztráta skladováním | 2%/měsíc (magická síla) |
| Základní cena | 5 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ne (obnovitelné) |
| Vzácnost spawnu | Střední |

**Speciální:**
- Obnovitelný zdroj s 5letým cyklem
- Nadměrná těžba poškozuje stromy (max 20% stromů ročně)

---

### Megwa

Tmavé dřevo prorostlé zelenými žilami magie z tropických pralesů.

**Lorové informace:**
Megwa se nehodí k výrobě zbraní - jedná se o měkké dřevo. Velkou výhodou je, že dokáže v sobě zadržet daleko více magie než jiné materiály. Do výrobků z Megwy můžou alchymisté zaklít více kouzel. Pracovat s Megwou je náročné a nebezpečné. Tam, kde roste mnoho stromů Megwy, může docházet k magickým anomáliím.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `magical_plants` |
| Základní výtěžnost | 50 kg/pracovník/rok |
| Požadovaný terén | `jungle` |
| Rizikovost | 0.15 (15%) - magické anomálie, nemoci |
| Trvanlivost | Neomezená |
| Ztráta skladováním | 0% |
| Základní cena | 8 zlata/kg |
| Obchodovatelné | Ano |
| Skladovatelné | Ano |
| Vyčerpatelné | Ne (obnovitelné) |
| Vzácnost spawnu | Nízká (pouze džungle) |

**Speciální:**
- Magické předměty z Megwy mají +50% kapacitu kouzel
- 5% šance na náhodný magický efekt při zpracování
- Obnovitelný zdroj (stromy dorůstají)

---

## Krystaly

Krystaly využívají alchymisté a čarodějové k výrobě magických předmětů či očarování. Ložiska krystalů je možné najít v horách či v **divočině**. Přístup ke zdroji znamená přístup ke kouzlům.

### Společné vlastnosti krystalů

| Atribut | Hodnota |
|---------|---------|
| Kategorie | `magical_crystals` |
| Požadovaný terén | `mountains`, `wilderness` |
| Trvanlivost | Neomezená (většinou) |
| Ztráta skladováním | 0% (většinou) |
| Obchodovatelné | Záleží na nebezpečnosti |
| Vyčerpatelné | Ano |
| Vzácnost spawnu | Velmi nízká |

### Přehled krystalů

| Krystal | Barva | Schopnost | Rizikovost | Cena/kg | Výtěžnost |
|---------|-------|-----------|------------|---------|-----------|
| Almazit | Růžová | Telekineze | 0.05 | 25 | 3 kg/prac/rok |
| Aterist | Světle modrá | Telepatie | 0.05 | 35 | 3 kg/prac/rok |
| Korint | Oranžová | Transmutace | 0.05 | 30 | 3 kg/prac/rok |
| Kurýn | Zelená | Fyziomatika | 0.02 | 22 | 3 kg/prac/rok |
| Zaltar | Bílá | Fotonika | 0.03 | 28 | 3 kg/prac/rok |
| Yris | Žlutá | Sensitiva | 0.15 | 45 | 2.5 kg/prac/rok |
| Kalaznát | Hnědá | Temperatura | 0.30 | 55 | 2 kg/prac/rok |
| Deryl | Fialová | Psychotronika | 0.80 | 60 | 2 kg/prac/rok |
| Uryst | Rudá | Silomatika | 0.40 | 80 | 1.5 kg/prac/rok |
| Lepterýn | Tmavě modrá | Duchotika | 0.90 | 150 | 1.5 kg/prac/rok |
| Peritýn | Černá | Teloconomie | 0.95 | 120 | 1.2 kg/prac/rok |

---

### Bezpečné krystaly

#### Almazit

Krystal růžové barvy podporující telekinetické schopnosti.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.05 (5%) |
| Skladovatelné | Ano |
| Obchodovatelné | Ano |
| Max pracovníků | 60 |

**Magické využití:** Telekineze - ovládání vzdáleného pohybu neživých předmětů.

---

#### Aterist

Světle modrý krystal propůjčující telepatické schopnosti.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.05 (5%) |
| Skladovatelné | Ano |
| Obchodovatelné | Ano |
| Max pracovníků | 60 |

**Magické využití:** Telepatie - komunikace na dálku.

---

#### Korint

Oranžový krystal pro transmutaci neživých látek.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.05 (5%) |
| Skladovatelné | Ano |
| Obchodovatelné | Ano |
| Max pracovníků | 60 |

**Magické využití:** Transmutace - přeměna neživých látek na jiné.

---

#### Kurýn

Zelený krystal propůjčující schopnost fyziomatiky.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.02 (2%) - nejbezpečnější |
| Skladovatelné | Ano |
| Obchodovatelné | Ano |
| Max pracovníků | 60 |

**Magické využití:** Fyziomatika - moc nad fyzickými vlastnostmi nebo vzhledem.

---

#### Zaltar

Bílý krystal pro ovlivňování světla.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.03 (3%) |
| Skladovatelné | Ano |
| Obchodovatelné | Ano |
| Max pracovníků | 60 |

**Magické využití:** Fotonika - manipulace se světlem.

---

### Mírně nebezpečné krystaly

#### Yris

Žlutý krystal ovlivňující smysly.

**Lorové informace:**
Práce s Yrisem většinou nebývá životu nebezpečná, ale může při neopatrném zacházení způsobovat nepříjemné anomálie jako je ztráta čichu, zvýšení senzitivity na vnější vjemy nebo citlivost na světlo. Po nějaké době účinky většinou odeznívají.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.15 (15%) |
| Skladovatelné | Ano |
| Obchodovatelné | Ano |
| Max pracovníků | 40 |

**Magické využití:** Sensitiva - ovlivňování smyslů (čich, zrak, hmat, bolest).

**Speciální:** Postižení pracovníci mají dočasné senzorické anomálie (1-6 měsíců).

---

#### Kalaznát

Hnědý krystal ovlivňující teplotu.

**Lorové informace:**
Musí se s ním pracovat velmi opatrně, jelikož uštípnutí kousku způsobuje vlnu náhodné změny teploty. V dolech je vysoká pravděpodobnost zranění ohněm či chladem.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.30 (30%) |
| Skladovatelné | Ne - nestabilní |
| Obchodovatelné | Ano (s opatrností) |
| Max pracovníků | 30 |

**Magické využití:** Temperatura - změna teploty předmětů, vzduchu, vody.

**Speciální:**
- Zranění jsou popáleniny nebo omrzliny
- Vyžaduje speciální úložiště (izolované)

---

#### Uryst

Rudý krystal generující čistou energii.

**Lorové informace:**
Práce s Urystem může být nebezpečná - je možný náhodný výbuch, který zničí vše kolem.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.40 (40%) |
| Skladovatelné | Ne - nestabilní |
| Obchodovatelné | Ano |
| Max pracovníků | 50 |

**Magické využití:** Silomatika - generování obrovského množství čisté energie.

**Speciální:**
- 1% šance na katastrofický výbuch při těžbě (zničí infrastrukturu)
- Vyžaduje speciální úložiště

---

### Velmi nebezpečné krystaly

#### Deryl

Fialový krystal zaručující psychotronní schopnosti.

**Lorové informace:**
Jakýkoliv pohled na Deryl způsobuje bytosti blaho a chce se na něj stále dívat. Deryl přehrává své oběti cokoliv, co ona chce. Ta žije v neustálém snu. Zapomene na všechna trápení a dokonce i jíst, pít a spát. Během několika dní zemře oběť na vyčerpání a dehydrataci. Oběť může být nebezpečná i pro ostatní.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.80 (80%) |
| Skladovatelné | Ne - extrémně nebezpečné |
| Obchodovatelné | Ne - zakázaný obchod |
| Max pracovníků | 20 |

**Magické využití:** Psychotronika - ovlivňování mysli jiných.

**Speciální:**
- Pracovníci musí mít speciální ochranu očí
- Černý trh - 3× cena
- Držení může být ilegální v některých doménách

---

#### Lepterýn

Velmi nebezpečný tmavě modrý krystal uvězňující duše.

**Lorové informace:**
Jakmile se živá bytost dotkne Lepterýnu, krystal začne pomalu pohlcovat její duši. Úplné pohlcení může trvat několik kol až dní. Jakmile Lepterýn pohltí duši, celá bytost je magicky pohlcena - zmizí. Pokud je Lepterýn plný, již nepohlcuje další bytosti. Pokud je zničen, uvězněná duše je vysvobozena.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.90 (90%) |
| Skladovatelné | Ne - smrtelně nebezpečné |
| Obchodovatelné | Ne - zakázaný obchod |
| Max pracovníků | 10 |

**Magické využití:** Duchotika - uvěznění duše uvnitř krystalu.

**Speciální:**
- Extrémní bezpečnostní opatření - 5000 zlata údržba/rok
- Téměř jistá smrt bez magické ochrany
- Černý trh - 5× cena
- Držení je ilegální téměř všude

---

#### Peritýn

Vzácný černý krystal ovlivňující časoprostor.

**Lorové informace:**
Ve špatných rukou dokáže Peritýn nadělat paseku. Práce s ním může být velmi nebezpečná - může vzniknout časoprostorová anomálie, která buď přemístí okolí jinam nebo změní rychlost času. Jednou z nejhorších je zestárnutí, umření a proměnění v prach během několika kol.

**Herní atributy:**

| Atribut | Hodnota |
|---------|---------|
| Rizikovost | 0.95 (95%) |
| Skladovatelné | Ne - extrémně nestabilní |
| Obchodovatelné | Ne - zakázaný obchod |
| Max pracovníků | 15 |

**Magické využití:** Teloconomie - ovlivňování časoprostoru.

**Speciální:**
- Nejnebezpečnější krystal
- 2% šance na časoprostorovou anomálii při těžbě
- Anomálie může ovlivnit celý hex
- Vyžaduje magickou ochranu nejvyšší úrovně

---

## Přehledová tabulka všech zdrojů

| Zdroj | Kategorie | Terén | Výtěžnost | Riziko | Cena | Vyčerpatelné |
|-------|-----------|-------|-----------|--------|------|--------------|
| Obilí | food | farmland, floodplain | 3000 | 1% | 0.10 | Ne |
| Pastviny | food | plains, hills, steppe | 200 | 2% | 0.12 | Ne |
| Ryby | food | coast, river, lake | 500 | 5% | 0.15 | Ne |
| Železo | basic_metals | mountains, hills | 100 | 10% | 0.003 | Ano |
| Měď | basic_metals | mountains, hills | 80 | 8% | 0.002 | Ano |
| Cín | basic_metals | mountains, hills | 90 | 9% | 0.0025 | Ano |
| Olovo | basic_metals | mountains, hills | 120 | 15% | 0.0012 | Ano |
| Zlato | precious_metals | mountains, hills, river | 0.5 | 15% | 20 | Ano |
| Stříbro | precious_metals | mountains, hills | 10 | 12% | 0.67 | Ano |
| Drahokamy | luxury | mountains, volcanic | 2 | 10% | 80 | Ano |
| Emeret | magical_metals | volcanic | 8 | 20% | 40 | Ano |
| Adak | magical_metals | lake | 12 | 8% | 10 | Částečně |
| Palamantin | building_materials | mountains, hills | 200 | 6% | 0.02 | Ano |
| Antracit | fuel | mountains | 150 | 12% | 0.05 | Ano |
| Kůra Akimory | magical_plants | marshes | 30 | 8% | 5 | Ne |
| Megwa | magical_plants | jungle | 50 | 15% | 8 | Ne |
| Almazit | magical_crystals | mountains, wilderness | 3 | 5% | 25 | Ano |
| Aterist | magical_crystals | mountains, wilderness | 3 | 5% | 35 | Ano |
| Korint | magical_crystals | mountains, wilderness | 3 | 5% | 30 | Ano |
| Kurýn | magical_crystals | mountains, wilderness | 3 | 2% | 22 | Ano |
| Zaltar | magical_crystals | mountains, wilderness | 3 | 3% | 28 | Ano |
| Yris | magical_crystals | mountains, wilderness | 2.5 | 15% | 45 | Ano |
| Kalaznát | magical_crystals | mountains, wilderness | 2 | 30% | 55 | Ano |
| Deryl | magical_crystals | mountains, wilderness | 2 | 80% | 60 | Ano |
| Uryst | magical_crystals | mountains, wilderness | 1.5 | 40% | 80 | Ano |
| Lepterýn | magical_crystals | mountains, wilderness | 1.5 | 90% | 150 | Ano |
| Peritýn | magical_crystals | mountains, wilderness | 1.2 | 95% | 120 | Ano |
