# Postavy

Postavy jsou jednotlivci, kteří vedou domény, slouží jako rádci, velitelé nebo agenti. Systém postav je inspirován Crusader Kings 3.

## Základní atributy

Každá postava má 6 základních atributů na škále 0-20:

| Atribut | Popis | Vliv na doménu |
|---------|-------|----------------|
| Diplomacie | Sociální schopnosti | Vztahy, smlouvy |
| Válečnictví | Vojenské schopnosti | Bojová síla, taktika |
| Správa | Organizační schopnosti | Daně, efektivita |
| Intriky | Tajné operace | Špionáž, vraždy |
| Učenost | Vzdělání a moudrost | Výzkum, magie |
| Zbožnost | Náboženská oddanost | Legitimita, víra |

### Generování atributů

Základní hodnota: 5-10 (průměr)

Modifikátory:
- Vzdělání: +0 až +5
- Vlastnosti: -3 až +3 za vlastnost
- Věk: Zkušenost vs. úpadek
- Rasa: Různé bonusy

### Věkové kategorie

| Věk | Kategorie | Efekt |
|-----|-----------|-------|
| 0-5 | Nemluvně | Nemůže vládnout |
| 6-15 | Dítě | Regentství, vzdělávání |
| 16-20 | Mladík | -2 všechny atributy |
| 21-40 | Dospělý | Plná síla |
| 41-60 | Zralý | +1 správa, učenost |
| 61-70 | Starý | -1 válečnictví |
| 71+ | Kmet | -2 válečnictví, riziko smrti |

## Vlastnosti (Traits)

Vlastnosti definují charakter postavy a ovlivňují její schopnosti.

### Osobnostní vlastnosti

| Vlastnost | Efekt | Protějšek |
|-----------|-------|-----------|
| Statečný | +2 válečnictví, +morálka | Zbabělý |
| Čestný | +diplomacie, -intriky | Úskočný |
| Štědrý | +vztahy, -zlato | Lakomý |
| Spravedlivý | +kontrola, +legitimita | Tyranský |
| Trpělivý | +obléhání, +intriky | Netrpělivý |
| Pracovitý | +správa | Líný |
| Cudný | +zbožnost | Vilný |
| Střídmý | +zdraví | Obžerný |
| Pokorný | +zbožnost, +vztahy vazalů | Pyšný |
| Klidný | +diplomacie | Prchlivý |

### Vzdělávací vlastnosti

| Vlastnost | Požadavek | Efekt |
|-----------|-----------|-------|
| Diplomat | Vysoká diplomacie | +3 diplomacie |
| Stratég | Vysoké válečnictví | +3 válečnictví |
| Správce | Vysoká správa | +3 správa |
| Spiklenec | Vysoké intriky | +3 intriky |
| Učenec | Vysoká učenost | +3 učenost |
| Teolog | Vysoká zbožnost | +3 zbožnost |

### Fyzické vlastnosti

| Vlastnost | Efekt |
|-----------|-------|
| Silný | +2 válečnictví, +zdraví |
| Hezký/Krásná | +2 diplomacie |
| Génius | +5 učenost |
| Rychlý | +2 intriky, +1 válečnictví |
| Obří postava | +3 válečnictví, -1 intriky |

### Negativní vlastnosti

| Vlastnost | Efekt | Získání |
|-----------|-------|---------|
| Chromý | -2 válečnictví | Zranění |
| Slepý | -4 válečnictví, +2 intriky | Nemoc, zranění |
| Hluchý | -2 diplomacie | Věk |
| Nemocný | -všechny atributy | Nemoc |
| Šílený | Nepředvídatelné chování | Události, stres |
| Posedlý | +intriky, -vztahy | Okultismus |
| Stigmatizovaný | -diplomacie, -vztahy | Skandál |

### Životní styl

Postava si může zvolit životní styl, který poskytuje bonusy:

| Životní styl | Bonus | Speciální schopnosti |
|--------------|-------|---------------------|
| Diplomat | +2 diplomacie | Sňatková aliance |
| Válečník | +2 válečnictví | Osobní souboj |
| Správce | +2 správa | Efektivní daně |
| Intrikán | +2 intriky | Síť informátorů |
| Učenec | +2 učenost | Výzkum |
| Mnich/Mniška | +2 zbožnost | Božská přízeň |

## Vztahy mezi postavami

### Rodinné vztahy

| Vztah | Modifikátor názoru |
|-------|-------------------|
| Rodič | +20 |
| Dítě | +25 |
| Sourozenec | +15 |
| Manžel/ka | +30 až -20 |
| Vzdálená rodina | +5 |

### Osobní vztahy

| Vztah | Rozsah | Efekt |
|-------|--------|-------|
| Přítel | +30 až +50 | Loajalita, podpora |
| Rival | -20 až -40 | Sabotáž, intriky |
| Milenec | +40 | Skandál, nelegitimní děti |
| Nepřítel | -50 až -100 | Vražedné úmysly |
| Mentor | +20 | Vzdělávací bonus |

### Faktory názoru

| Faktor | Modifikátor |
|--------|-------------|
| Stejná víra | +10 |
| Jiná víra | -10 až -30 |
| Stejná kultura | +5 |
| Dar | +5 až +30 |
| Urážka | -10 |
| Zrada | -50 |
| Pomsta (provedená) | +20 |

## Role postav

### Vládce

Hlava domény. Atributy vládce přímo ovlivňují doménu.

```
bonus_domény = (atribut_vládce - 10) × 0.05
```

### Rádci

Až 5 pozic rádců, každý poskytuje bonus podle svého atributu:

| Pozice | Klíčový atribut | Efekt |
|--------|-----------------|-------|
| Kancléř | Diplomacie | +diplomacie domény |
| Maršál | Válečnictví | +vojsko domény |
| Správce | Správa | +správcovství domény |
| Špeh | Intriky | +špehování domény |
| Kaplan | Zbožnost | +víra domény |

```
bonus_rádce = (atribut_rádce × 0.3)
```

### Velitelé

Vedou armády v bitvě.

```
velitelský_bonus = (válečnictví × 0.02) + speciální_schopnosti
```

### Agenti

Provádějí tajné operace.

```
šance_na_úspěch = základní_šance × (1 + intriky × 0.05)
```

### Šampioni

Osobní bojovníci pro souboje a turnaje.

## Události postav

### Životní události

| Událost | Trigger | Efekt |
|---------|---------|-------|
| Narození | Těhotenství | Nová postava |
| Dosažení dospělosti | Věk 16 | Plná práva |
| Sňatek | Nabídka/souhlas | Aliance, děti |
| Smrt | Věk, nemoc, bitva | Nástupnictví |

### Náhodné události

| Událost | Pravděpodobnost | Efekt |
|---------|-----------------|-------|
| Nemoc | Různá | Postihy, možná smrt |
| Zranění | Bitva, turnaj | Trvalé postihy |
| Osvícení | Nízká | +učenost, nová vlastnost |
| Skandál | Střední | -prestiž, -vztahy |
| Zázrak | Velmi nízká | +zbožnost, +legitimita |

### Stres

Stres se hromadí při negativních událostech:

| Úroveň stresu | Efekt |
|---------------|-------|
| 0-25 | Žádný |
| 26-50 | -1 všechny atributy |
| 51-75 | -2 všechny atributy, riziko šílenství |
| 76-100 | Mentální zhroucení |

**Zdroje stresu:**
- Smrt blízkého: +30
- Prohra v bitvě: +10
- Zrada: +20
- Neúspěch intriky: +15

**Zmírnění stresu:**
- Hostina: -10
- Lov: -5
- Modlitba: -5
- Intriky (pro intrikány): -10

## Dynastie

### Prestiž dynastie

Akumuluje se přes generace:

```
prestiž_dynastie += prestiž_člena × 0.1 při smrti
```

### Dědičné vlastnosti

Některé vlastnosti se mohou dědit:

| Vlastnost | Šance dědičnosti |
|-----------|------------------|
| Génius | 15% |
| Silný | 25% |
| Hezký | 30% |
| Šílenství | 10% |
| Nemoc (genetická) | 20% |

### Příbuzenství

Příliš blízké příbuzenství zvyšuje šanci na negativní dědičné vlastnosti:

| Vztah | Penalizace |
|-------|------------|
| Bratranci | +5% negativní vlastnost |
| Strýc/Neteř | +15% negativní vlastnost |
| Sourozenci | +40% negativní vlastnost |

### Legitimita potomků

| Status | Nástupnická práva | Názor ostatních |
|--------|-------------------|-----------------|
| Legitimní | Plná | Normální |
| Legitimizovaný | Snížená | -10 |
| Nelegitimní | Žádná | -30 |

## Nábor postav

### Zdroje postav

| Zdroj | Kvalita | Cena |
|-------|---------|------|
| Místní šlechta | Střední | Vazalství |
| Dobrodruzi | Různá | Zlato |
| Cizinci | Různá | Zlato + vztahy |
| Vzdělávací instituce | Vysoká | Čas + zlato |

### Loajalita

| Úroveň | Chování |
|--------|---------|
| Fanatická (90+) | Zemře za vládce |
| Vysoká (70-89) | Spolehlivá |
| Normální (40-69) | Běžná služba |
| Nízká (20-39) | Nespokojenost |
| Nebezpečná (0-19) | Možná zrada |

**Faktory loajality:**
- Plat: +10 až -20
- Vztah s vládcem: +/- názor
- Vlastnosti (čestný): +10
- Ambice vs. pozice: +/- 20
