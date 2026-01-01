# Postavy

Postavy jsou jednotlivci, kteří vedou domény, slouží jako rádci, velitelé nebo agenti.

## Základní atributy

Každá postava má 7 základních atributů na škále 0-10:

| Atribut      | Popis                        | Vliv na doménu       |
|--------------|------------------------------|----------------------|
| Správcovství | Organizační schopnosti       | Daně, efektivita     |
| Diplomacie   | Sociální schopnosti          | Vztahy, smlouvy      |
| Obchod       | Obchodní dovednosti          | Zisk z obchodu       |
| Vojsko       | Vojenské schopnosti          | Bojová síla, taktika |
| Špehování    | Tajné operace                | Špionáž, vraždy      |
| Magie        | Výzkum magie a její aplikace | Magické účinky       |
| Víra         | Náboženská oddanost          | Legitimita, víra     |

### Generování atributů

Základní hodnota: 2-5 (průměr)

Modifikátory:
- Vzdělání: +0 až +2
- Vlastnosti: -1 až +1 za vlastnost
- Věk: Zkušenost vs. úpadek
- Rasa
- Povolání

### Věkové kategorie

| Věk   | Kategorie | Efekt                        |
|-------|-----------|------------------------------|
| 0-5   | Nemluvně | Nemůže vládnout              |
| 6-15  | Dítě | Regentství, vzdělávání       |
| 16-20 | Mladík | -1 všechny atributy          |
| 21-40 | Dospělý | Plná síla                    |
| 41-60 | Zralý | +1 správa, učenost           |
| 61-70 | Starý | -1 válečnictví               |
| 71+   | Kmet | -2 válečnictví, riziko smrti |

## Vlastnosti (Traits)

Vlastnosti definují charakter postavy a ovlivňují její schopnosti.

### Vzdělávací vlastnosti

K získání vlastností ze vzdělání je nutné nákladné vzdělání od osobního učitele či na univerzitě.

| Vlastnost | Efekt          |
|-----------|----------------|
| Správce   | +2 správa      |
| Diplomat  | +2 diplomacie  |
| Obchodník | +2 správa      |
| Stratég   | +2 válečnictví |
| Spiklenec | +2 intriky     |
| Mág       | +2 magie       |
| Teolog    | +2 zbožnost    |

### Atributy postavy (platí pro aplikaci pravidel Svitky Hrdinů)

Každý z atributů postavy ovlivňuje základní atributy dle výše atributu. Atributy postavy se pohybují na škále 1-10 (stejně jako základní atributy).

| Atribut postavy | Bonus/Postih k základním atributům |
|-----------------|------------------------------------|
| 1-3             | -1                                 |
| 4               | 0                                  |
| 5               | +1                                 |
| 6               | +2                                 |
| 7-10            | +3                                 |

| Vlastnost  | Ovlivňuje základní atributy                   |
|------------|-----------------------------------------------|
| Nezdolnost | Vojsko                                        |
| Hbitost    | Vojsko, Špehování                             |
| Srdnatost  | Správcovství, Diplomacie, Obchod, Magie, Víra |
| Důvtip     | Správcovství, Obchod, Magie, Víra             |
| Lstivost   | Špehování, Diplomacie                         |

### Osobnostní vlastnosti

| Vlastnost    | Efekt                        | Protějšek  |
|--------------|------------------------------|------------|
| Statečný     | +2 Vojsko                    | Zbabělý    |
| Čestný       | +1 Diplomacie, -1 Špehování  | Úskočný    |
| Štědrý       | +vztahy ???, -zlato ???      | Lakomý     |
| Spravedlivý  | +kontrola ???, +legitimita ??? | Tyranský   |
| Trpělivý     | +obléhání ???, +1 Špehování  | Netrpělivý |
| Pracovitý    | +1 Správcovství              | Líný       |
| Pokorný      | +1 Víra, +vztahy vazalů ???  | Pyšný      |
| Klidný       | +1 Diplomacie                | Prchlivý   |
| Pevné zdraví | +1 ke všem atributům         | Nemocný    |
| Hezký        | +1 Diplomacie                | Ošklivý    |

## Vztahy mezi postavami

### Rodinné vztahy

| Vztah           | Modifikátor názoru |
|-----------------|--------------------|
| Rodič           | +20                |
| Dítě            | +25                |
| Sourozenec      | +15                |
| Manžel/ka       | +30 až -20         |
| Vzdálená rodina | +5                 |

### Osobní vztahy

| Vztah    | Rozsah      | Efekt                     |
|----------|-------------|---------------------------|
| Přítel   | +30 až +50  | Loajalita, podpora        |
| Rival    | -20 až -40  | Sabotáž, intriky          |
| Milenec  | +40         | Skandál, nelegitimní děti |
| Nepřítel | -50 až -100 | Vražedné úmysly           |
| Mentor   | +20         | Vzdělávací bonus          |

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
