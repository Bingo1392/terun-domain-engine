# Ekonomika

Ekonomický systém řídí produkci, spotřebu a obchod zdrojů v herním světě.

## Základní principy

1. **Nabídka a poptávka** - ceny se mění podle dostupnosti zdrojů
2. **Sezónnost** - některé zdroje mají sezónní produkci/poptávku
3. **Geografická omezení** - zdroje jsou vázány na konkrétní terény
4. **Transportní náklady** - vzdálenost ovlivňuje cenu

## Měna

### Zlaté mince (Gold)

Základní měna pro velké transakce. 1 zlatá mince = 20 stříbrných = 400 měděných.

### Stříbrné mince (Silver)

Běžná měna pro denní transakce.

### Měděné mince (Copper)

Drobná měna pro malé nákupy.

### Vliv (Influence)

Speciální "měna" pro politické a diplomatické akce. Nelze ji přímo nakoupit, získává se:
- Diplomatickými akcemi
- Správou velkých území
- Náboženským vlivem
- Vojenskou silou

## Produkce zdrojů

### Základní vzorec produkce

```
roční_produkce = počet_pracovníků × efektivita_pracovníka × modifikátory
```

### Modifikátory produkce

| Faktor | Rozsah | Popis |
|--------|--------|-------|
| Terén | 0.5 - 1.5 | Vhodnost terénu pro daný zdroj |
| Technologie | 1.0 - 2.0 | Úroveň vybavení a znalostí |
| Sezóna | 0.6 - 1.3 | Roční období |
| Počasí | 0.5 - 1.2 | Aktuální počasí |
| Kontrola | 0.7 - 1.1 | Míra kontroly nad oblastí |
| Infrastruktura | 0.8 - 1.3 | Kvalita cest, budov |

### Riziko při produkci

Některé zdroje mají riziko nehod. Rizikovost (0-1) určuje šanci na:
- Zranění/smrt pracovníků
- Snížení produkce
- Ztrátu vybavení

| Zdroj | Rizikovost | Typická nehoda |
|-------|------------|----------------|
| Obilí | 0.01 | Zranění při žních |
| Ryby | 0.05 | Utonutí |
| Železo | 0.10 | Důlní neštěstí |
| Olovo | 0.15 | Otrava |
| Zlato | 0.15 | Zával |
| Emeret | 0.20 | Vulkanická aktivita |
| Kalaznát | 0.30 | Popáleniny/omrzliny |
| Deryl | 0.80 | Psychická smrt |
| Lepterýn | 0.90 | Pohlcení duše |
| Peritýn | 0.95 | Časoprostorová anomálie |

## Poptávka

### Typy poptávky

| Typ | Popis | Příklady |
|-----|-------|----------|
| essential | Základní potřeby | Potraviny |
| industrial | Výroba a řemesla | Železo, měď |
| luxury | Luxusní zboží | Zlato, drahokamy |
| magical | Magické potřeby | Krystaly, emeret |
| military | Vojenské potřeby | Železo, adak |

### Elasticita poptávky

```
poptávka = základní_intenzita × populace^populační_elasticita × bohatství^bohatství_elasticita
```

**Populační elasticita:**
- Potraviny: 1.0 (lineární s populací)
- Luxus: 0.3 (pomalý růst s populací)

**Bohatstvová elasticita:**
- Potraviny: 0.2 (bohatí nejedí víc)
- Luxus: 2.0+ (bohatí chtějí mnohem více)

### Sezónní poptávka

| Zdroj | Jaro | Léto | Podzim | Zima |
|-------|------|------|--------|------|
| Obilí | 0.9 | 0.8 | 1.2 | 1.1 |
| Ryby | 1.2 | 1.3 | 0.9 | 0.6 |
| Pastviny | 1.1 | 1.2 | 0.9 | 0.8 |

## Ceny a trhy

### Základní ceny (za kg)

| Zdroj | Cena (zlaté) | Volatilita |
|-------|--------------|------------|
| Obilí | 0.10 | Střední |
| Ryby | 0.15 | Vysoká |
| Pastviny | 0.12 | Střední |
| Železo | 0.003 | Střední |
| Měď | 0.002 | Střední |
| Cín | 0.0025 | Střední |
| Olovo | 0.0012 | Stabilní |
| Stříbro | 0.67 | Střední |
| Zlato | 20.0 | Stabilní |
| Drahokamy | 80.0 | Extrémní |
| Almazit | 25.0 | Střední |
| Deryl | 60.0 | Extrémní |
| Uryst | 80.0 | Vysoká |
| Lepterýn | 150.0 | Extrémní |
| Peritýn | 120.0 | Extrémní |

### Volatilita trhu

| Úroveň | Rozsah změn | Typické zdroje |
|--------|-------------|----------------|
| Stabilní | ±5% | Zlato, olovo |
| Střední | ±15% | Většina kovů, obilí |
| Vysoká | ±30% | Ryby, magické kovy |
| Extrémní | ±50%+ | Nebezpečné krystaly, drahokamy |

### Výpočet tržní ceny

```
tržní_cena = základní_cena × (poptávka / nabídka)^0.5 × volatilita_modifikátor
tržní_cena = clamp(tržní_cena, cenový_floor, cenový_strop)
```

### Cenové regulace

Některé zdroje mají regulované ceny:

| Zdroj | Floor | Strop | Důvod |
|-------|-------|-------|-------|
| Obilí | 0.05 | 0.20 | Prevence hladomorů |
| Ryby | 0.08 | 0.30 | Základní potrava |
| Pastviny | 0.08 | 0.25 | Základní potrava |

## Obchod

### Místní trh

Každá osada má místní trh, kde se obchoduje:
- Bez poplatků
- Okamžitě
- Pouze lokální nabídka/poptávka

### Regionální obchod

Obchod mezi osadami v rámci jedné domény:
- Poplatek 5%
- Transportní náklady podle vzdálenosti
- Sdílená nabídka/poptávka

### Mezinárodní obchod

Obchod mezi doménami:
- Cla a poplatky 10-30%
- Nutnost obchodní smlouvy nebo karavany
- Riziko přepadení

### Transportní náklady

```
náklady_na_transport = vzdálenost_v_hexech × váha × cena_za_hex_kg
```

| Způsob dopravy | Cena za hex/kg | Rychlost | Kapacita |
|----------------|----------------|----------|----------|
| Nosiči | 0.01 | 2 hexy/den | 50 kg |
| Muly | 0.005 | 3 hexy/den | 150 kg |
| Vůz | 0.002 | 2 hexy/den | 1000 kg |
| Říční loď | 0.001 | 4 hexy/den | 5000 kg |
| Námořní loď | 0.0005 | 6 hexů/den | 20000 kg |

## Řemesla a zpracování

Suroviny lze zpracovat na hodnotnější produkty:

### Příklady zpracování

| Surovina | Produkt | Poměr | Hodnota |
|----------|---------|-------|---------|
| Železo | Zbraně | 10:1 | 10× |
| Železo | Nástroje | 5:1 | 3× |
| Železo + Cín | Bronz | 9:1 | 2× |
| Obilí | Pivo | 5:1 | 3× |
| Obilí | Chléb | 2:1 | 2× |
| Zlato + Drahokamy | Šperky | 1:1 | 3× |
| Krystal + Emeret | Magický předmět | 1:1 | 5-20× |

### Požadavky na zpracování

- **Dílna**: základní zpracování
- **Kovárna**: kovové výrobky
- **Alchymistická laboratoř**: magické předměty
- **Přístav**: námořní obchod

## Daně a poplatky

### Typy daní

| Daň | Základní sazba | Kdo platí |
|-----|----------------|-----------|
| Daň z hlavy | 1 stříbrná/osoba/rok | Všichni obyvatelé |
| Pozemková daň | 10% z produkce | Vlastníci půdy |
| Obchodní daň | 5% z obratu | Obchodníci |
| Clo | 10-30% | Zahraniční obchodníci |
| Mýtné | 1-5 měděných | Cestující |

### Vliv kontroly na výběr daní

```
skutečný_výběr = teoretický_výběr × (kontrola / 100)
```

### Důsledky vysokých daní

| Sazba | Efekt |
|-------|-------|
| < 100% | Normální |
| 100-150% | -5 kontrola/rok, pomalejší růst |
| 150-200% | -10 kontrola/rok, emigrace |
| > 200% | Riziko povstání |

## Zásoby a skladování

### Trvanlivost zdrojů

| Zdroj | Trvanlivost | Ztráta/měsíc |
|-------|-------------|--------------|
| Obilí | 2 roky | 1% |
| Ryby (čerstvé) | 3 dny | 100% |
| Ryby (solené) | 1 rok | 2% |
| Maso (čerstvé) | 5 dní | 100% |
| Maso (sušené) | 1 rok | 2% |
| Kovy | Neomezená | 0% |
| Krystaly (stabilní) | Neomezená | 0% |
| Krystaly (nestabilní) | Různá | Riziko anomálie |

### Sýpky a sklady

| Budova | Kapacita | Bonus |
|--------|----------|-------|
| Sýpka | 10 000 kg | -50% ztráta obilí |
| Sklad | 5 000 kg | Univerzální |
| Lednice (magická) | 2 000 kg | Zastavuje kažení |
| Trezor | 500 kg | Ochrana před krádeží |

## Ekonomické události

### Pozitivní

- **Zlatá horečka**: Objeveno nové naleziště (+produkce)
- **Obchodní smlouva**: Nový obchodní partner (+obchod)
- **Dobrá úroda**: +30% produkce potravin

### Negativní

- **Vyčerpání dolu**: -50% produkce rudy
- **Obchodní embargo**: Ztráta obchodního partnera
- **Neúroda**: -50% produkce potravin
- **Inflace**: Znehodnocení měny

### Speciální

- **Černý trh**: Možnost ilegálního obchodu
- **Monopol**: Kontrola nad vzácným zdrojem
- **Spekulace**: Možnost manipulace s cenami
