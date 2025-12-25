# Obchodní stezky

Obchodní stezky umožňují přepravu zboží mezi osadami a doménami. Zahrnují pozemní karavany, říční lodě a námořní obchod.

---

## Typy obchodních tras

### Pozemní karavany

Základní způsob přepravy zboží po souši.

| Typ karavany | Kapacita | Rychlost | Cena založení | Údržba/měsíc |
|--------------|----------|----------|---------------|--------------|
| Nosiči | 500 kg | 2 hexy/den | 10 | 2 |
| Mulí karavana | 2 000 kg | 3 hexy/den | 50 | 10 |
| Vozová karavana | 10 000 kg | 2 hexy/den | 200 | 40 |
| Velká karavana | 30 000 kg | 2 hexy/den | 500 | 100 |

**Herní atributy karavany:**

| Atribut | Typ | Popis |
|---------|-----|-------|
| `caravan_id` | string | Unikátní identifikátor |
| `owner_domain` | string | Vlastnící doména |
| `type` | enum | Typ karavany |
| `cargo` | array | Náklad (zdroj + množství) |
| `current_hex` | string | Aktuální pozice |
| `destination` | string | Cílová osada |
| `route` | array | Plánovaná trasa (hexy) |
| `guards` | number | Počet strážců |
| `status` | enum | `traveling`, `loading`, `unloading`, `waiting` |

### Říční lodě

Efektivní přeprava po řekách.

| Typ lodi | Kapacita | Rychlost | Cena | Údržba/měsíc |
|----------|----------|----------|------|--------------|
| Člun | 1 000 kg | 4 hexy/den | 30 | 5 |
| Říční bárka | 5 000 kg | 3 hexy/den | 100 | 15 |
| Říční loď | 15 000 kg | 3 hexy/den | 300 | 40 |
| Velká říční loď | 40 000 kg | 2 hexy/den | 800 | 80 |

**Omezení:**
- Pouze po hexech s řekou
- Proti proudu -50% rychlost
- V zimě zamrzlé řeky = nelze plout

### Námořní lodě

Obchod mezi přístavními městy.

| Typ lodi | Kapacita | Rychlost | Cena | Údržba/měsíc | Posádka |
|----------|----------|----------|------|--------------|---------|
| Rybářská loď | 2 000 kg | 4 hexy/den | 50 | 10 | 5 |
| Obchodní kogga | 20 000 kg | 5 hexů/den | 500 | 80 | 20 |
| Karaka | 50 000 kg | 4 hexy/den | 1 500 | 200 | 50 |
| Velká karaka | 100 000 kg | 3 hexy/den | 4 000 | 400 | 100 |

**Omezení:**
- Vyžaduje přístav pro nakládku/vykládku
- Bouře: 10% šance ztráty nákladu, 2% šance ztroskotání
- Piráti: riziko podle oblasti

---

## Obchodní trasy

### Struktura trasy

| Atribut | Typ | Popis |
|---------|-----|-------|
| `route_id` | string | Unikátní identifikátor |
| `name` | string | Název trasy |
| `start_hamlet` | string | Počáteční osada |
| `end_hamlet` | string | Koncová osada |
| `waypoints` | array | Průchozí body (osady) |
| `type` | enum | `land`, `river`, `sea`, `mixed` |
| `distance` | number | Délka v hexech |
| `safety` | 0-100 | Bezpečnost trasy |
| `toll_total` | number | Celkové mýtné na trase |
| `active_caravans` | number | Počet aktivních karavan |

### Vytvoření trasy

**Požadavky:**
- Obchodní smlouva mezi doménami (pokud trasa překračuje hranice)
- Osady na obou koncích
- Průchodný terén

**Cena založení trasy:**
```
cena = vzdálenost × 5 + počet_průchozích_domén × 20
```

### Bonusy z obchodních tras

| Faktor | Bonus |
|--------|-------|
| Trasa existuje 1+ let | +5% zisk |
| Trasa existuje 5+ let | +10% zisk |
| Trasa existuje 10+ let | +15% zisk |
| Dlážděná silnice na trase | +20% rychlost |
| Říční část trasy | +30% rychlost, −20% náklady |
| Námořní část trasy | +50% kapacita, −30% náklady |

---

## Mýtné a cla

### Mýtné

Poplatek za průchod kontrolovaným bodem (most, průsmyk, brána).

| Typ bodu | Typická sazba |
|----------|---------------|
| Most | 1-3% hodnoty nákladu |
| Horský průsmyk | 2-5% hodnoty nákladu |
| Městská brána | 1-2% hodnoty nákladu |
| Říční přístav | 1-2% hodnoty nákladu |

### Cla

Poplatek za dovoz zboží do domény.

| Typ zboží | Typická sazba |
|-----------|---------------|
| Potraviny | 5% |
| Základní kovy | 10% |
| Drahé kovy | 15% |
| Luxusní zboží | 20% |
| Magické materiály | 15-25% |
| Zakázané zboží | 50%+ (černý trh) |

### Obchodní smlouvy

Smlouvy mohou upravit cla a mýtné:

| Typ smlouvy | Efekt |
|-------------|-------|
| Obchodní dohoda | −25% cla |
| Volný obchod | −50% cla |
| Celní unie | 0% cla mezi členy |
| Exkluzivní práva | Monopol na určité zboží |

---

## Rizika obchodu

### Přepadení

| Oblast | Riziko/hex | Ztráta při přepadení |
|--------|------------|---------------------|
| Bezpečná cesta | 1% | 10-30% nákladu |
| Neutrální území | 5% | 20-50% nákladu |
| Divoká oblast | 15% | 30-70% nákladu |
| Válečná zóna | 30% | 50-100% nákladu |

**Snížení rizika:**
- Strážci: −2% riziko za každých 10 strážců
- Ozbrojená karavana: −5% riziko
- Eskortní smlouva s doménou: −10% riziko

### Ztráta zboží

| Příčina | Pravděpodobnost | Ztráta |
|---------|-----------------|--------|
| Špatné počasí | 5%/měsíc | 5-15% kazícího se zboží |
| Nehoda (vůz) | 2%/hex v horách | 10-30% nákladu |
| Nemoc tažných zvířat | 3%/měsíc | Zpoždění 1-2 týdny |
| Bouře (námořní) | 10%/plavba | 10-50% nákladu |
| Ztroskotání | 2%/plavba | 100% nákladu + loď |

### Piráti (námořní)

| Oblast | Riziko |
|--------|--------|
| Chráněné vody | 2% |
| Neutrální vody | 10% |
| Pirátské vody | 25% |
| Válečná zóna | 40% |

---

## Obchodníci a gildy

### Obchodní gildy

Gildy kontrolují obchod v určitých oblastech nebo s určitým zbožím.

| Atribut | Typ | Popis |
|---------|-----|-------|
| `guild_id` | string | Identifikátor |
| `name` | string | Název gildy |
| `headquarters` | string | Sídlo |
| `specialization` | array | Typy zboží |
| `controlled_routes` | array | Kontrolované trasy |
| `influence` | number | Vliv (0-100) |
| `treasury` | number | Pokladna |

### Bonusy gild

| Úroveň vlivu | Bonus |
|--------------|-------|
| 0-25 | Žádný |
| 26-50 | −10% náklady na karavany |
| 51-75 | −20% náklady, +10% ceny prodeje |
| 76-100 | −30% náklady, +20% ceny, exkluzivní kontrakty |

### Nezávislí obchodníci

NPC obchodníci, kteří přepravují zboží mezi osadami.

**Generování:**
- Každá osada generuje 1 obchodníka za 1000 obyvatel ročně
- Obchodníci preferují ziskové trasy
- Přinášejí zlato a vzácné zboží

---

## Trhy a ceny

### Lokální trh

Každá osada má lokální trh s cenami ovlivněnými:
- Místní nabídkou/poptávkou
- Vzdáleností od zdroje
- Obchodními trasami

### Cenový vzorec

```
lokální_cena = základní_cena
    × (1 + vzdálenost_od_zdroje × 0.02)
    × (1 - počet_obchodních_tras × 0.05)
    × nabídka_poptávka_modifikátor
```

### Arbitráž

Hráč (doména) může využít cenové rozdíly:

```
zisk = (cena_cíl - cena_zdroj) × množství - náklady_na_přepravu - cla - mýtné
```

**Omezení:**
- Maximální arbitrážní zisk klesá s počtem transakcí (trh se vyrovnává)
- Velké objemy mohou narušit lokální trhy

---

## Speciální typy obchodu

### Černý trh

Obchod se zakázaným zbožím (některé krystaly, jedy, otroky).

| Aspekt | Hodnota |
|--------|---------|
| Cenový bonus | +100% až +300% |
| Riziko odhalení | 10-30%/transakce |
| Trest při odhalení | Ztráta zboží, pokuta, diplomatický skandál |
| Dostupnost | Pouze ve velkých městech |

### Dálkový obchod

Obchod se vzdálenými regiony (exotické zboží).

| Aspekt | Hodnota |
|--------|---------|
| Doba trvání | 6-24 měsíců |
| Riziko | Vysoké (30% ztráta) |
| Zisk | +200% až +500% |
| Investice | Vysoká (1000+ zlata) |

### Kontrakty

Dlouhodobé obchodní smlouvy.

| Typ kontraktu | Délka | Výhoda |
|---------------|-------|--------|
| Dodavatelský | 1 rok | Garantovaná cena |
| Exkluzivní | 2-5 let | Monopol na zboží v oblasti |
| Partnerský | Neurčitá | Sdílení zisků a rizik |

---

## Herní akce obchodu

### Založit karavanu

| Parametr | Hodnota |
|----------|---------|
| Náklady | Cena karavany + náklad |
| Čas | Okamžitě |
| Požadavky | Osada s trhem, dostupné zboží |

### Vyslat karavanu

| Parametr | Hodnota |
|----------|---------|
| Náklady | Údržba + mýtné + cla |
| Čas | Podle vzdálenosti |
| Požadavky | Průchodná trasa, obchodní smlouva (pokud cizí území) |

### Založit obchodní trasu

| Parametr | Hodnota |
|----------|---------|
| Náklady | 5 zlata/hex + diplomatické náklady |
| Čas | 1 měsíc na vyjednání |
| Požadavky | Obchodní smlouva s průchozími doménami |

### Postavit přístav

| Parametr | Hodnota |
|----------|---------|
| Náklady | 200-1000 zlata (podle velikosti) |
| Čas | 6-24 měsíců |
| Požadavky | Pobřeží nebo velká řeka |
| Efekt | Umožňuje námořní/říční obchod |
