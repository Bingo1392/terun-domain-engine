# Časový systém

Definice času, kalendáře, ročních období a herních tahů v simulaci.

---

## Kalendář

### Základní jednotky

| Jednotka | Délka | Herní využití |
|----------|-------|---------------|
| Den | 1 den | Pohyb, bitvy |
| Týden | 7 dní | Osobní události |
| Měsíc | 30 dní | Ekonomika, údržba |
| Sezóna | 3 měsíce | Produkce, počasí |
| Rok | 12 měsíců | Dlouhodobé efekty |

### Měsíce

| Číslo | Název | Sezóna | Charakteristika |
|-------|-------|--------|-----------------|
| 1 | Leden | Zima | Nejchladnější měsíc |
| 2 | Únor | Zima | Konec zimy |
| 3 | Březen | Jaro | Tání, záplavy |
| 4 | Duben | Jaro | Setí |
| 5 | Květen | Jaro | Rozkvět |
| 6 | Červen | Léto | Sklizeň sena |
| 7 | Červenec | Léto | Nejteplejší měsíc |
| 8 | Srpen | Léto | Sklizeň obilí |
| 9 | Září | Podzim | Vinobraní |
| 10 | Říjen | Podzim | Podzimní setí |
| 11 | Listopad | Podzim | Porážky dobytka |
| 12 | Prosinec | Zima | Zimní slunovrat |

### Herní datum

| Atribut | Typ | Popis |
|---------|-----|-------|
| `year` | number | Rok |
| `month` | 1-12 | Měsíc |
| `day` | 1-30 | Den |
| `day_of_week` | 1-7 | Den v týdnu |
| `season` | enum | Roční období |

---

## Roční období

### Jaro (Spring)

| Atribut | Hodnota |
|---------|---------|
| Měsíce | Březen, Duben, Květen |
| Teplota | Mírná, rostoucí |
| Srážky | Střední až vysoké |

**Efekty:**
- Tání sněhu (záplavy v nízkých oblastech)
- Začátek zemědělské sezóny
- +20% pohyb (lepší cesty po rozmrznutí)
- Nemoci ze znečištěné vody (+10% šance)

**Zemědělství:**
- Setí jarních plodin
- Pastva dobytka začíná
- Včelařství aktivní

### Léto (Summer)

| Atribut | Hodnota |
|---------|---------|
| Měsíce | Červen, Červenec, Srpen |
| Teplota | Vysoká |
| Srážky | Nízké až střední |

**Efekty:**
- Nejdelší dny (více pracovního času)
- Sucha možná (+15% šance)
- +100% produkce potravin
- Nejlepší období pro válčení

**Zemědělství:**
- Sklizeň sena (červen)
- Sklizeň obilí (červenec-srpen)
- Peak produkce

### Podzim (Autumn)

| Atribut | Hodnota |
|---------|---------|
| Měsíce | Září, Říjen, Listopad |
| Teplota | Klesající |
| Srážky | Střední |

**Efekty:**
- Kratší dny
- Příprava na zimu
- +50% ceny potravin (před zimou)
- Obchodní sezóna (příprava zásob)

**Zemědělství:**
- Vinobraní (září)
- Podzimní setí (říjen)
- Porážky dobytka (listopad)
- Zpracování a skladování

### Zima (Winter)

| Atribut | Hodnota |
|---------|---------|
| Měsíce | Prosinec, Leden, Únor |
| Teplota | Nízká |
| Srážky | Sníh v chladných oblastech |

**Efekty:**
- −50% pohyb (sníh, led)
- Zamrzlé řeky (−100% říční doprava)
- +20% spotřeba jídla (topení)
- +30% nemoci
- −80% zemědělská produkce
- Vojenské akce obtížné

**Zemědělství:**
- Minimální aktivita
- Spotřeba zásob
- Údržba nástrojů
- Plánování dalšího roku

---

## Sezónní modifikátory

### Produkce podle sezóny

| Zdroj | Jaro | Léto | Podzim | Zima |
|-------|------|------|--------|------|
| Obilí | 0% | 100% | 50% | 0% |
| Zelenina | 20% | 100% | 80% | 0% |
| Ovoce | 0% | 60% | 100% | 0% |
| Maso | 50% | 80% | 100% | 30% |
| Dřevo | 80% | 100% | 80% | 40% |
| Kovy | 100% | 100% | 100% | 60% |
| Textil | 60% | 80% | 100% | 100% |
| Krystaly | 100% | 100% | 100% | 100% |

### Pohyb podle sezóny

| Terén | Jaro | Léto | Podzim | Zima |
|-------|------|------|--------|------|
| Cesta | 80% | 100% | 90% | 50% |
| Pole | 60% | 100% | 80% | 40% |
| Les | 70% | 90% | 80% | 50% |
| Hory | 50% | 100% | 70% | 20% |
| Mokřad | 40% | 80% | 60% | 80%* |
| Řeka | 100% | 100% | 100% | 0% |

*Zamrzlé mokřady jsou lépe průchodné

### Bojové modifikátory

| Aspekt | Jaro | Léto | Podzim | Zima |
|--------|------|------|--------|------|
| Morálka | 90% | 100% | 95% | 70% |
| Zásobování | 80% | 100% | 90% | 50% |
| Obléhání | 70% | 100% | 80% | 40% |
| Námořní boj | 80% | 100% | 70% | 30% |

---

## Herní tahy

### Typ tahu: Reálný čas s pauzou

Engine může běžet v reálném čase s možností pauzy.

| Rychlost | Herní čas za sekundu |
|----------|---------------------|
| Velmi pomalá | 1 hodina |
| Pomalá | 6 hodin |
| Normální | 1 den |
| Rychlá | 3 dny |
| Velmi rychlá | 1 týden |

### Typ tahu: Tahový systém

Alternativně diskrétní tahy.

| Délka tahu | Využití |
|------------|---------|
| 1 den | Taktické bitvy |
| 1 týden | Standardní hra |
| 1 měsíc | Strategická úroveň |
| 1 sezóna | Velmi dlouhodobé hry |

### Zpracování tahu

Pořadí zpracování v každém tahu:

1. **Příjmy a náklady**
   - Daně a poplatky
   - Údržba jednotek
   - Platy úředníků

2. **Produkce**
   - Zemědělství
   - Těžba
   - Řemesla

3. **Obchod**
   - Pohyb karavan
   - Tržní transakce
   - Cla a mýtné

4. **Populace**
   - Růst/úbytek
   - Migrace
   - Potřeby

5. **Vojenské akce**
   - Pohyb armád
   - Bitvy
   - Obléhání

6. **Diplomacie**
   - Vyjednávání
   - Smlouvy
   - Vztahy

7. **Události**
   - Náhodné události
   - Řetězové události
   - Rozhodnutí

8. **Aktualizace**
   - Stavby
   - Výzkum
   - Stárnutí postav

---

## Důležité termíny

### Roční cyklus

| Měsíc | Termín | Popis |
|-------|--------|-------|
| Leden | Nový rok | Roční přehled, plánování |
| Březen | Jarní rovnodennost | Začátek zemědělské sezóny |
| Červen | Letní slunovrat | Nejdelší den |
| Září | Podzimní rovnodennost | Konec hlavní sklizně |
| Prosinec | Zimní slunovrat | Nejkratší den, svátky |

### Daňové termíny

| Frekvence | Termín | Popis |
|-----------|--------|-------|
| Měsíční | 1. den měsíce | Běžné daně |
| Čtvrtletní | 1. sezóny | Sezónní odvody |
| Roční | 1. ledna | Roční zúčtování |

### Feudální povinnosti

| Povinnost | Termín |
|-----------|--------|
| Vojenská služba | Na vyžádání (40 dní/rok) |
| Daňový odvod | Čtvrtletně |
| Dvorská přítomnost | 1× ročně |
| Přísaha věrnosti | Při nástupu |

---

## Události v čase

### Periodické události

| Událost | Frekvence | Měsíc |
|---------|-----------|-------|
| Sklizeň | Ročně | Srpen |
| Daňový výběr | Čtvrtletně | 1. měsíc sezóny |
| Trh | Týdně/Měsíčně | Podle osady |
| Slavnosti | Ročně | Různé |
| Vojenské přehlídky | Ročně | Květen |

### Dožínky a svátky

| Svátek | Měsíc | Efekt |
|--------|-------|-------|
| Jarní slavnosti | Březen | +10 spokojenost |
| Letní slavnosti | Červen | +15 spokojenost |
| Dožínky | Září | +20 spokojenost |
| Zimní slavnosti | Prosinec | +10 spokojenost, −náklady |

---

## Stárnutí a životní cyklus

### Věkové kategorie

| Kategorie | Věk | Charakteristika |
|-----------|-----|-----------------|
| Nemluvně | 0-2 | Vysoká úmrtnost, žádné schopnosti |
| Dítě | 3-11 | Vzdělávání, žádné akce |
| Mladistvý | 12-15 | Učení, omezené akce |
| Dospělý | 16-39 | Plné schopnosti |
| Středního věku | 40-59 | Zkušenosti, mírný úpadek |
| Starý | 60-79 | Moudrost, fyzický úpadek |
| Stařec | 80+ | Vysoká úmrtnost |

### Životní události podle věku

| Věk | Možné události |
|-----|----------------|
| 0 | Narození |
| 6 | Začátek vzdělávání |
| 12 | Výběr vychovatele |
| 16 | Dospělost, první titul |
| 16+ | Sňatek možný |
| 18+ | Vojenská služba |
| 30+ | Šance na nemoci |
| 50+ | Zdravotní problémy |
| 60+ | Významně vyšší úmrtnost |

### Úmrtnost podle věku

```
základní_šance_smrti = 0.5% + (věk - 30)² × 0.01%
```

| Věk | Roční šance smrti |
|-----|-------------------|
| 0-2 | 5% |
| 3-15 | 1% |
| 16-39 | 0.5% |
| 40-49 | 1% |
| 50-59 | 2% |
| 60-69 | 5% |
| 70-79 | 10% |
| 80+ | 20% |

---

## Historické záznamy

### Kronika

Engine automaticky zaznamenává důležité události.

| Typ záznamu | Příklad |
|-------------|---------|
| Narození | "Narodil se syn krále Vladimíra" |
| Smrt | "Zemřel vévoda Karel" |
| Válka | "Vypukla válka mezi X a Y" |
| Smlouva | "Podepsán mír v Z" |
| Katastrofa | "Mor zasáhl provincii" |
| Stavba | "Dokončen hrad Černá Skála" |

### Struktura záznamu

| Atribut | Typ | Popis |
|---------|-----|-------|
| `record_id` | string | Identifikátor |
| `date` | date | Datum události |
| `type` | enum | Typ záznamu |
| `title` | string | Titulek |
| `description` | string | Popis |
| `participants` | array | Zúčastnění |
| `location` | string | Místo |
| `importance` | 1-5 | Důležitost |

---

## Časové utility

### Výpočet vzdálenosti v čase

```
doba_cesty = vzdálenost_v_hexech
    / rychlost_jednotky
    × terén_modifikátor
    × sezóna_modifikátor
    × počasí_modifikátor
```

### Výpočet stáří

```
věk = aktuální_rok - rok_narození
    + (aktuální_měsíc - měsíc_narození) / 12
```

### Doba stavby

```
doba_stavby = základní_doba
    × (1 - schopnost_správce × 0.02)
    × sezóna_modifikátor
    × dostupnost_materiálu
```

---

## Herní akce související s časem

| Akce | Efekt | Cena |
|------|-------|------|
| Zrychlit stavbu | −30% doba | +50% cena |
| Uspořádat slavnost | Spokojenost, čas | Zlato |
| Vyhlásit mobilizaci | Okamžité povolání | Vliv |
| Zimní přípravy | −20% ztráty v zimě | 20 zlata |
| Sezónní obřady | Bonus k produkci | 10 zlata |
