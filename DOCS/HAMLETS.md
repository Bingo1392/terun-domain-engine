# Osady (Hamlets)

Osady reprezentují populační centra na mapě. Každá osada má svou velikost, typ obyvatel, růst a míru kontroly.

## Velikosti osad

Osady se dělí do 9 kategorií podle populace:

| Velikost | Český název | Populace | Popis                          |
|----------|-------------|----------|--------------------------------|
| wilderness | Divočina | 0 | Neosídlená oblast              |
| poor_village | Chudá vesnice | ~50 | Pár chatrčí, samozásobitelství |
| village | Vesnice | ~150 | Běžná vesnice s návsí          |
| prosperous_village | Prosperující vesnice | ~500 | Bohatá vesnice, možná tržiště  |
| small_city | Malé město | ~1 500 | Hradby, trh, řemeslníci        |
| medium_city | Střední město | ~5 000 | Cechy, chrám, pevnost          |
| large_city | Velké město | ~15 000 | Regionální centrum             |
| huge_city | Obrovské město | ~45 000 | Hlavní město království        |
| gargantuan_city | Gigantické město | ~150 000 | Metropole, div světa           |

## Typ osady

Osady se liší podle druhu obyvatel:

| Typ | Popis |
|-----|-------|
| human | Lidská osada - nejběžnější typ |

*Poznámka: V aktuální verzi je implementován pouze typ `human`.*

## Růst osady

Růst je hodnota od -100 do +100, která určuje směřování osady.

### Mechanika růstu

- **Růst = +100**: Osada povýší na další velikostní kategorii
- **Růst = -100**: Osada degraduje na nižší kategorii
- **Růst = 0**: Osada je stabilní
- Po změně velikosti se růst resetuje na 0

### Omezení růstu

- Divočina nemůže klesnout pod 0 (minimum je wilderness)
- Gigantické město nemůže růst nad 0 (maximum je gargantuan)
- Růst se může změnit maximálně o **10 bodů za rok**

### Faktory ovlivňující růst

**Pozitivní faktory:**
- Dostatek potravin: +1 až +5 za rok
- Bezpečnost (vysoká kontrola): +1 až +3 za rok
- Obchodní stezky: +1 až +3 za rok
- Úrodná půda v okolí: +1 až +2 za rok
- Přístup k vodě (řeka, jezero): +1 za rok

**Negativní faktory:**
- Nedostatek potravin: -3 až -10 za rok
- Nízká kontrola (zločin, nepokoje): -2 až -5 za rok
- Nemoci, epidemie: -5 až -15 za rok
- Válka, obléhání: -5 až -20 za rok
- Přírodní katastrofy: -10 až -30 za rok

### Vzorec růstu

```
roční_změna_růstu = základ + potraviny + bezpečnost + obchod + události
roční_změna_růstu = clamp(roční_změna_růstu, -10, +10)
nový_růst = clamp(růst + roční_změna_růstu, -100, +100)
```

## Kontrola osady

Kontrola je hodnota od 0 do 100, která určuje, jak pevně doména ovládá osadu.

| Kontrola | Stav | Efekty |
|----------|------|--------|
| 0-20 | Anarchie | Vysoká kriminalita, žádné daně, možné povstání |
| 21-40 | Slabá | Nízké daně, časté nepokoje |
| 41-60 | Střední | Normální daně, občasné problémy |
| 61-80 | Dobrá | Plné daně, stabilita |
| 81-100 | Absolutní | Bonus k daním, loajalita |

### Faktory ovlivňující kontrolu

**Zvyšují kontrolu:**
- Přítomnost vojenské posádky
- Spravedlivé zákony a jejich vymáhání
- Prosperita obyvatel
- Legitimita vládce
- Náboženská podpora

**Snižují kontrolu:**
- Vysoké daně
- Hladomor
- Nepopulární vládce
- Cizí agitátoři
- Vzdálenost od hlavního města

## Potřeby osad

Každá osada potřebuje zdroje pro své fungování. Nedostatek zdrojů způsobuje negativní růst.

### Potraviny

Potřeba potravin závisí na velikosti osady. Potraviny mohou být:
- Obilí (grain)
- Ryby (fish)
- Produkty z pastvin (pasture)

| Velikost | Potřeba potravin/rok |
|----------|---------------------|
| poor_village | 100 kg (libovolné) |
| village | 300 kg (libovolné) |
| prosperous_village | 1 000 kg (libovolné) |
| small_city | 2 500 kg obilí + 500 kg ryby/maso |
| medium_city | 7 500 kg obilí + 2 500 kg ryby/maso |
| large_city | 22 500 kg obilí + 6 000 kg maso + 1 500 kg ryby |
| huge_city | 67 500 kg obilí + 18 000 kg maso + 4 500 kg ryby |
| gargantuan_city | 225 000 kg obilí + 60 000 kg maso + 15 000 kg ryby |

### Pracovní síla

Osady poskytují pracovní sílu (population), která může být využita pro:
- Těžbu zdrojů
- Zemědělství
- Řemesla
- Vojenskou službu

| Velikost | Dostupná pracovní síla |
|----------|----------------------|
| poor_village | 50 |
| village | 150 |
| prosperous_village | 500 |
| small_city | 1 500 |
| medium_city | 5 000 |
| large_city | 15 000 |
| huge_city | 45 000 |
| gargantuan_city | 150 000 |

## Spontánní kolonizace

Některé terény mají šanci na spontánní vznik osad. Tato šance závisí na:
- Typu terénu (orná půda má nejvyšší šanci)
- Vzdálenosti od existujících osad
- Přítomnosti cest a obchodních stezek

### Šance na kolonizaci podle terénu

| Terén | Šance (% za rok) | Typ osady |
|-------|------------------|-----------|
| Orná půda | 90% | Lidská |
| Oázy | 50% | Lidská |
| Pláně | 30% | Lidská |
| Kopce | 20% | Lidská/Trpasličí |
| Les | 15% | Lidská/Elfí |
| Poušť | 1% | Lidská |
| Pouštní hory | 1% | Lidská |
| Hory | 5% | Trpasličí |
| Mokřady | 5% | Lidská |
| Džungle | 2% | Lidská |

*Šance se snižuje na polovinu za každý den cesty od nejbližší osady (minimum 1%).*

## Budovy a vylepšení

Osady mohou obsahovat budovy, které poskytují bonusy nebo odemykají nové možnosti.

### Základní budovy

| Budova | Požadavek | Efekt |
|--------|-----------|-------|
| Tržiště | village+ | +10% příjem z obchodu |
| Kovárna | village+ | Umožňuje výrobu zbraní |
| Mlýn | village+ | +20% efektivita obilí |
| Hradby | small_city+ | +50% obrana, pomalejší dobývání |
| Kasárna | small_city+ | Rychlejší rekrutace vojáků |
| Chrám | village+ | +kontrola, legitimita |
| Gilda | small_city+ | +20% příjem z řemesel |
| Přístav | pobřeží/řeka | Umožňuje námořní obchod |
| Magická akademie | large_city+ | Umožňuje magický výzkum |

## Události v osadách

Osady mohou být zasaženy různými událostmi:

### Pozitivní události
- **Dobrá úroda**: +20% produkce potravin na rok
- **Obchodní boom**: +30% příjem z obchodu na rok
- **Náboženské zázraky**: +10 kontrola

### Negativní události
- **Mor**: -10 až -30 růst, -20% populace
- **Požár**: Zničení budov, -10 růst
- **Povstání**: -30 kontrola, možná ztráta osady
- **Hladomor**: -20 růst, emigrace

### Neutrální události
- **Příchod uprchlíků**: +populace, -kontrola
- **Průchod armády**: -zásoby, možné drancování
