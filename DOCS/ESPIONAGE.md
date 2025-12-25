# Špionáž a intriky

Systém špionáže umožňuje tajné operace, získávání informací a destabilizaci nepřátel.

---

## Špionážní síť

### Budování sítě

Každá doména může budovat špionážní síť v cizích doménách.

| Atribut | Typ | Popis |
|---------|-----|-------|
| `network_id` | string | Identifikátor |
| `owner_domain` | string | Vlastník sítě |
| `target_domain` | string | Cílová doména |
| `strength` | 0-100 | Síla sítě |
| `agents` | array | Agenti v síti |
| `safe_houses` | number | Počet úkrytů |
| `status` | enum | `building`, `active`, `compromised`, `destroyed` |

### Růst sítě

```
měsíční_růst = základní_růst
    × (1 + spymaster_schopnost × 0.05)
    × (1 - cílová_kontrašpionáž × 0.01)
    × náhoda(0.8, 1.2)
```

| Úroveň sítě | Síla | Možnosti |
|-------------|------|----------|
| Zárodečná | 0-19 | Pouze pozorování |
| Slabá | 20-39 | Základní špionáž |
| Střední | 40-59 | Většina operací |
| Silná | 60-79 | Pokročilé operace |
| Dominantní | 80-100 | Všechny operace, nízké riziko |

---

## Agenti

### Typy agentů

| Typ | Cena/měsíc | Specializace | Riziko odhalení |
|-----|------------|--------------|-----------------|
| Informátor | 5 | Pasivní sběr informací | Nízké |
| Špion | 15 | Aktivní špionáž | Střední |
| Sabotér | 25 | Sabotáže a atentáty | Vysoké |
| Diplomat-špion | 20 | Krytí v ambasádě | Velmi nízké |
| Dvojitý agent | 30 | Dezinformace | Velmi vysoké |

### Struktura agenta

| Atribut | Typ | Popis |
|---------|-----|-------|
| `agent_id` | string | Identifikátor |
| `name` | string | Jméno (nebo krycí jméno) |
| `type` | enum | Typ agenta |
| `skill` | 1-20 | Schopnost |
| `loyalty` | 0-100 | Loajalita |
| `cover` | string | Krytí (povolání) |
| `location` | string | Umístění |
| `status` | enum | `active`, `captured`, `turned`, `dead` |
| `missions_completed` | number | Dokončené mise |

### Verbování agentů

| Zdroj | Cena | Kvalita | Čas |
|-------|------|---------|-----|
| Nábor z ulice | 20 zlata | skill 1-5 | 1 měsíc |
| Gilda zlodějů | 50 zlata | skill 5-10 | 2 týdny |
| Převerbování | 100 zlata | Zachová skill | Okamžitě |
| Výcvik vlastního | 30 zlata + 6 měsíců | skill 3-8 | 6 měsíců |
| Najatý specialista | 100 zlata | skill 10-15 | 1 týden |

---

## Špionážní operace

### Průzkumné operace

#### Získání informací (gather_intelligence)

Sběr obecných informací o cílové doméně.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 10 |
| Čas | 1 měsíc |
| Cena | 10 zlata |
| Úspěch | Informace o armádě, ekonomice, politice |
| Riziko odhalení | 5% |

#### Odhalení tajemství (uncover_secrets)

Získání kompromitujících informací o postavě.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 30 |
| Čas | 2-6 měsíců |
| Cena | 30 zlata |
| Úspěch | Tajemství použitelné k vydírání |
| Riziko odhalení | 15% |

#### Sledování (surveillance)

Monitorování konkrétní osoby.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 20 |
| Čas | Průběžně |
| Cena | 5 zlata/měsíc |
| Úspěch | Znalost pohybu, schůzek, plánů |
| Riziko odhalení | 10%/měsíc |

### Destruktivní operace

#### Sabotáž (sabotage)

Poškození infrastruktury nebo produkce.

| Cíl | Síla sítě | Efekt | Riziko |
|-----|-----------|-------|--------|
| Sklad | > 30 | −30% zásob | 20% |
| Dílna | > 40 | −50% produkce na 3 měsíce | 25% |
| Most | > 50 | Zničení, −100% průchodnost | 30% |
| Hradby | > 60 | −20% obrany | 35% |
| Přístav | > 50 | −50% obchodu na 6 měsíců | 30% |

#### Atentát (assassination)

Zabití cílové osoby.

| Cíl | Síla sítě | Cena | Riziko |
|-----|-----------|------|--------|
| Úředník | > 40 | 50 zlata | 25% |
| Vojevůdce | > 50 | 100 zlata | 35% |
| Vazal | > 60 | 150 zlata | 40% |
| Dědic | > 70 | 200 zlata | 50% |
| Vládce | > 80 | 500 zlata | 60% |

**Důsledky odhalení:**
- −50 vztahy
- Casus belli pro cíl
- Možná válka
- Ztráta legitimity

#### Únos (kidnapping)

Unesení osoby.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 50 |
| Cena | 100 zlata |
| Riziko | 30% |
| Využití | Výkupné, výměna, vydírání |

### Politické operace

#### Podpora frakce (support_faction)

Podpora opozice v cílové doméně.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 40 |
| Cena | 50 zlata/měsíc |
| Efekt | +10% síla frakce/měsíc |
| Riziko | 15% |

#### Podněcování vzpoury (incite_rebellion)

Aktivní podpora povstání.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 60 |
| Cena | 200 zlata |
| Efekt | +30% šance na vzpouru |
| Riziko | 40% |

#### Šíření dezinformací (spread_disinformation)

Šíření falešných zpráv.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 30 |
| Cena | 30 zlata |
| Efekt | −10 legitimita cíle, −10 vztahy s třetí stranou |
| Riziko | 20% |

#### Kompromitace úředníka (compromise_official)

Získání vlivu nad důležitým úředníkem.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 50 |
| Cena | 100 zlata + vydírání/úplatky |
| Efekt | Úředník pracuje pro vás |
| Riziko | 25% |

### Ekonomické operace

#### Kráže obchodních tajemství (steal_secrets)

Získání výrobních postupů.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 40 |
| Cena | 50 zlata |
| Efekt | +10% efektivita produkce daného zboží |
| Riziko | 20% |

#### Manipulace trhu (market_manipulation)

Umělé ovlivnění cen.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 30 |
| Cena | 100 zlata |
| Efekt | ±30% ceny komodity na 3 měsíce |
| Riziko | 15% |

#### Padělání (counterfeiting)

Výroba falešných mincí.

| Atribut | Hodnota |
|---------|---------|
| Síla sítě | > 50 |
| Cena | 50 zlata |
| Efekt | +100 zlata, −10% hodnota měny cíle |
| Riziko | 30% |

---

## Tajemství

### Typy tajemství

| Typ | Závažnost | Využití |
|-----|-----------|---------|
| Nevěra | Střední | Vydírání, skandál |
| Nelegitimní dítě | Vysoká | Dědické spory |
| Vražda | Kritická | Casus belli, vydírání |
| Zrada | Kritická | Odstranění z pozice |
| Hereze | Vysoká | Exkomunikace |
| Korupce | Střední | Vydírání, odstranění |
| Spiknutí | Kritická | Odhalení celé sítě |
| Magické praktiky | Různá | Závisí na kultuře |

### Struktura tajemství

| Atribut | Typ | Popis |
|---------|-----|-------|
| `secret_id` | string | Identifikátor |
| `type` | enum | Typ tajemství |
| `subject` | string | O kom je tajemství |
| `severity` | 1-5 | Závažnost |
| `known_by` | array | Kdo ví |
| `evidence` | number | Síla důkazů (0-100) |
| `discovered_date` | date | Datum odhalení |

### Využití tajemství

| Akce | Efekt | Riziko |
|------|-------|--------|
| Vydírání | Zlato/služby výměnou za mlčení | Cíl může odmítnout |
| Odhalení | Poškození reputace cíle | Důkazy mohou být zpochybněny |
| Prodej | Zlato od třetí strany | Ztráta kontroly nad informací |
| Hromadění | Držení pro budoucí využití | Může být odhaleno |

---

## Kontrašpionáž

### Pasivní ochrana

| Opatření | Cena/měsíc | Efekt |
|----------|------------|-------|
| Hlídky | 10 zlata | −10% šance na infiltraci |
| Tajná policie | 30 zlata | Automatické odhalování (15%/měsíc) |
| Dvorní špion | 20 zlata | Varování před operacemi |
| Dezinformační síť | 25 zlata | Nepřátelská síť roste pomaleji |

### Aktivní operace

#### Lov špionů (counter_intelligence)

Aktivní hledání nepřátelských agentů.

| Atribut | Hodnota |
|---------|---------|
| Cena | 30 zlata/měsíc |
| Efekt | 20% šance odhalení agenta/měsíc |
| Bonus | +10% za každou úroveň spymasterových schopností |

#### Výslech (interrogation)

Získání informací od zajatého agenta.

| Metoda | Šance na úspěch | Důsledky |
|--------|-----------------|----------|
| Laskavá | 30% | Agent může být převerbován |
| Standardní | 50% | Agent zničen |
| Mučení | 80% | −10 legitimita, agent mrtev |

#### Dvojitý agent (turn_agent)

Převerbování nepřátelského agenta.

| Atribut | Hodnota |
|---------|---------|
| Požadavky | Zajatý agent, nízká loajalita |
| Cena | 100 zlata + pravidelný plat |
| Efekt | Dezinformace pro nepřítele |
| Riziko | Může být trojitý agent |

---

## Frakce a konspirace

### Typy frakcí

| Typ | Cíl | Metody |
|-----|-----|--------|
| Nezávislostní | Odtržení od domény | Vzpoura, diplomacie |
| Nároková | Dosazení nového vládce | Převrat, válka |
| Náboženská | Změna státního náboženství | Konverze, povstání |
| Reformní | Změna zákonů | Politický tlak |
| Palácová | Kontrola dvora | Intriky, vraždy |

### Struktura frakce

| Atribut | Typ | Popis |
|---------|-----|-------|
| `faction_id` | string | Identifikátor |
| `type` | enum | Typ frakce |
| `leader` | string | Vůdce |
| `members` | array | Členové |
| `goal` | string | Konkrétní cíl |
| `power` | number | Síla (0-100) |
| `secrecy` | number | Utajení (0-100) |
| `foreign_support` | array | Zahraniční podporovatelé |

### Konspirace

Tajné spiknutí s konkrétním cílem.

| Fáze | Popis | Riziko odhalení |
|------|-------|-----------------|
| Plánování | Shromažďování spiklenců | 5%/měsíc |
| Příprava | Získávání prostředků | 10%/měsíc |
| Provedení | Realizace plánu | 30% |
| Únik | Zahlazení stop | 20% |

---

## Špionážní atributy domény

### Spymaster (Špionážní mistr)

| Schopnost | 1-5 | 6-10 | 11-15 | 16-20 |
|-----------|-----|------|-------|-------|
| Růst sítě | +5% | +15% | +25% | +40% |
| Úspěch operací | +5% | +10% | +15% | +25% |
| Odhalování | +5% | +15% | +25% | +40% |
| Cena operací | 0% | −10% | −20% | −30% |

### Špionážní budovy

| Budova | Cena | Údržba | Efekt |
|--------|------|--------|-------|
| Síť informátorů | 50 | 5/měsíc | +10% pasivní sběr informací |
| Výcvikový tábor | 100 | 10/měsíc | +2 skill nových agentů |
| Tajná kancelář | 200 | 20/měsíc | +20% efektivita operací |
| Mučírna | 150 | 10/měsíc | +30% výslechy (−5 legitimita) |
| Krycí organizace | 300 | 25/měsíc | −30% šance odhalení agentů |

---

## Herní akce - přehled

| Akce | Cena | Síla sítě | Riziko | Efekt |
|------|------|-----------|--------|-------|
| Budovat síť | 20/měsíc | - | 5% | +5-15 síla sítě/měsíc |
| Verbovat agenta | 20-100 | > 10 | - | Nový agent |
| Sběr informací | 10 | > 10 | 5% | Intel o doméně |
| Odhalit tajemství | 30 | > 30 | 15% | Tajemství postavy |
| Sabotáž | 50 | > 30 | 20-35% | Poškození infrastruktury |
| Atentát | 50-500 | > 40 | 25-60% | Smrt cíle |
| Podpora frakce | 50/měsíc | > 40 | 15% | +10% síla frakce |
| Dezinformace | 30 | > 30 | 20% | −10 legitimita |
| Lov špionů | 30/měsíc | - | - | 20% odhalení/měsíc |
| Výslech | 10 | - | - | Informace od zajatce |
