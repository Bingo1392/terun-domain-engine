# Legitimita a nároky

Systém legitimity určuje právoplatnost vlády, dědické nároky a důvody k válce (casus belli).

---

## Legitimita vládce

### Zdroje legitimity

| Zdroj | Bonus | Trvání |
|-------|-------|--------|
| Dědický nárok | +30 | Trvalé |
| Korunovace | +20 | Trvalé |
| Církevní požehnání | +15 | Trvalé |
| Dobytí | +10 | Trvalé |
| Volba (pokud volený systém) | +25 | Trvalé |
| Dlouhá vláda (10+ let) | +10 | Trvalé |
| Vítězná válka | +5 | 5 let |
| Potlačení vzpoury | +5 | 3 roky |
| Populární podpora | +0 až +20 | Proměnlivé |

### Ztráta legitimity

| Příčina | Postih |
|---------|--------|
| Vražda předchůdce | −30 |
| Uzurpace trůnu | −25 |
| Porušení přísahy | −20 |
| Prohra ve válce | −10 |
| Exkomunikace | −20 |
| Porušení smlouvy | −15 |
| Nespravedlivá válka | −10 |
| Tyranie (vysoké daně) | −5 až −15 |
| Hereze | −10 až −25 |

### Efekty legitimity

| Úroveň | Rozsah | Efekty |
|--------|--------|--------|
| Ilegitimní | 0-19 | −50% loajalita vazalů, +100% riziko vzpoury, −30 vztahy |
| Sporná | 20-39 | −25% loajalita vazalů, +50% riziko vzpoury, −15 vztahy |
| Slabá | 40-59 | −10% loajalita vazalů, +20% riziko vzpoury |
| Normální | 60-79 | Žádné modifikátory |
| Silná | 80-89 | +10% loajalita vazalů, −20% riziko vzpoury |
| Absolutní | 90-100 | +20% loajalita vazalů, −50% riziko vzpoury, +10 vztahy |

---

## Legitimita potomků

| Status         | Nástupnická práva | Názor ostatních |
|----------------|-------------------|-----------------|
| Legitimní      | Plná              | Normální        |
| Legitimizovaný | Snížená           | -10             |
| Nelegitimní    | Žádná             | -30             |

---

## Tituly a hodnosti

### Hierarchie titulů

| Úroveň | Titul (mužský/ženský) | Typická velikost | Vazalové |
|--------|----------------------|------------------|----------|
| 5 | Císař / Císařovna | Kontinent | Králové |
| 4 | Král / Královna | Velké království | Vévodové |
| 3 | Vévoda / Vévodkyně | Region | Hrabata |
| 2 | Hrabě / Hraběnka | Provincie | Baroni |
| 1 | Baron / Baronka | Panství | Rytíři |
| 0 | Rytíř / Dáma | Statek | Žádní |

### Struktura titulu

| Atribut | Typ | Popis |
|---------|-----|-------|
| `title_id` | string | Unikátní identifikátor |
| `tier` | 0-5 | Úroveň titulu |
| `name` | string | Název titulu |
| `de_jure_liege` | string | Právně nadřazený titul |
| `de_facto_liege` | string | Skutečný nadřazený titul |
| `holder` | string | Aktuální držitel |
| `heir` | string | Dědic |
| `succession_law` | enum | Dědické právo |
| `claims` | array | Nároky na titul |
| `creation_date` | date | Datum vytvoření |

### Vytvoření titulu

**Požadavky podle úrovně:**

| Úroveň | Požadavky |
|--------|-----------|
| Baron | 1 osada, 50 vlivu |
| Hrabě | 3 osady, 100 vlivu, 1 baron vazal |
| Vévoda | 2 hrabství, 200 vlivu |
| Král | 3 vévodství, 500 vlivu, 50+ legitimita |
| Císař | 3 království, 1000 vlivu, 80+ legitimita |

---

## Dědické právo (Succession Laws)

### Typy dědického práva

#### Primogenitura (primogeniture)

Dědí nejstarší dítě.

| Varianta | Popis |
|----------|-------|
| Mužská | Dědí nejstarší syn, dcery pouze pokud není syn |
| Ženská | Dědí nejstarší dcera, synové pouze pokud není dcera |
| Absolutní | Dědí nejstarší dítě bez ohledu na pohlaví |

#### Ultimogenitura (ultimogeniture)

Dědí nejmladší dítě.

| Varianta | Popis |
|----------|-------|
| Mužská | Dědí nejmladší syn |
| Absolutní | Dědí nejmladší dítě |

#### Seniorát (seniority)

Dědí nejstarší člen dynastie.

| Atribut | Hodnota |
|---------|---------|
| Výhody | Stabilita, zkušený vládce |
| Nevýhody | Krátké vlády, konflikty mezi větvemi |

#### Volební systém (elective)

Dědice volí volitelé.

| Typ volby | Volitelé |
|-----------|----------|
| Feudální volba | Vazalové |
| Církevní volba | Duchovní |
| Lidová volba | Zástupci měst |
| Tanistická | Členové dynastie |

#### Gavelkind (rozdělovací)

Tituly se rozdělí mezi všechny dědice.

| Atribut | Hodnota |
|---------|---------|
| Výhody | Všichni dědicové spokojeni |
| Nevýhody | Fragmentace domény |

### Změna dědického práva

| Požadavky | Hodnota |
|-----------|---------|
| Legitimita | > 60 |
| Vliv | 100 |
| Souhlas vazalů | > 50% |
| Cooldown | 20 let od poslední změny |

---

## Nároky (Claims)

### Typy nároků

| Typ | Síla | Původ | Trvání |
|-----|------|-------|--------|
| Silný (strong) | 100% | Přímé dědictví | Trvalé |
| Slabý (weak) | 50% | Vzdálené příbuzenství | 2 generace |
| Vykovaný (fabricated) | 25% | Falzifikace | 10 let |
| Svatý (holy) | 75% | Církevní udělení | Trvalé |
| Dobyvatelský (conquest) | 50% | Vojenské vítězství | 1 generace |

### Struktura nároku

| Atribut | Typ | Popis |
|---------|-----|-------|
| `claim_id` | string | Identifikátor |
| `claimant` | string | Kdo nárokuje |
| `title` | string | Nárokovaný titul |
| `type` | enum | Typ nároku |
| `strength` | number | Síla nároku (0-100) |
| `pressed` | boolean | Byl nárok uplatněn ve válce? |
| `inherited` | boolean | Zděděný nárok |
| `expiry_date` | date | Datum vypršení (nebo null) |

### Získání nároku

| Metoda | Cena | Čas | Síla |
|--------|------|-----|------|
| Dědictví | 0 | Okamžitě | Silný |
| Sňatek | Diplomatické náklady | Okamžitě | Slabý |
| Fabrication (kancléř) | 50-200 zlata | 1-5 let | Vykovaný |
| Církevní udělení | 100 vlivu + dar | 1 měsíc | Svatý |
| Koupě | 100-500 zlata | Okamžitě | Slabý |

### Dědění nároků

- Silné nároky se dědí jako silné (1 generace), pak slabé
- Slabé nároky se dědí jako slabé (1 generace), pak zanikají
- Vykované nároky se nedědí
- Svaté nároky se nedědí

---

## Casus Belli (Důvody k válce)

### Typy casus belli

#### Nárokový (claim)

Válka o prosazení nároku na titul.

| Atribut | Hodnota |
|---------|---------|
| Požadavky | Platný nárok |
| Cíl | Získání titulu |
| Diplomatický postih | Žádný (silný nárok), −10 (slabý nárok) |
| Vynucení | Přenos titulu na nárokujícího |

#### Svatá válka (holy_war)

Válka proti jinověrcům.

| Atribut | Hodnota |
|---------|---------|
| Požadavky | Jiná víra, církevní souhlas |
| Cíl | Konverze nebo dobytí území |
| Diplomatický postih | Žádný (s posvěcením), −20 (bez) |
| Vynucení | Konverze + případné dobytí |

#### Dobyvatelská válka (conquest)

Válka o území bez nároku.

| Atribut | Hodnota |
|---------|---------|
| Požadavky | 200 vlivu |
| Cíl | Dobytí konkrétního území |
| Diplomatický postih | −20 vztahy s ostatními |
| Vynucení | Anexe území |

#### Vazalská válka (subjugation)

Válka o podmanění celé domény.

| Atribut | Hodnota |
|---------|---------|
| Požadavky | 300 vlivu, výrazně silnější armáda |
| Cíl | Podmanění domény jako vazala |
| Diplomatický postih | −30 vztahy |
| Vynucení | Vazalství |

#### Osvobozovací válka (liberation)

Válka za osvobození utlačovaného lidu.

| Atribut | Hodnota |
|---------|---------|
| Požadavky | Cílová doména má nízkou legitimitu nebo tyranizuje |
| Cíl | Osvobození území |
| Diplomatický postih | +10 (vnímáno pozitivně) |
| Vynucení | Nezávislost nebo změna vládce |

#### Odvetná válka (retaliation)

Válka jako odveta za útok.

| Atribut | Hodnota |
|---------|---------|
| Požadavky | Byl napaden (do 5 let) |
| Cíl | Trest za útok |
| Diplomatický postih | Žádný |
| Vynucení | Reparace, území, nebo vazalství |

#### Sjednocovací válka (unification)

Válka za sjednocení kulturně příbuzných území.

| Atribut | Hodnota |
|---------|---------|
| Požadavky | Stejná kultura, de jure nárok |
| Cíl | Sjednocení pod jeden titul |
| Diplomatický postih | −10 |
| Vynucení | Anexe nebo vazalství |

### Struktura casus belli

| Atribut | Typ | Popis |
|---------|-----|-------|
| `casus_belli_id` | string | Identifikátor |
| `type` | enum | Typ CB |
| `attacker` | string | Útočník |
| `defender` | string | Obránce |
| `war_goal` | string | Cíl války |
| `valid_until` | date | Platnost CB |
| `cost` | number | Cena vyhlášení (vliv) |

---

## Regentství a nástupnictví

### Regentství

Pokud je vládce nezletilý, neschopný nebo nepřítomný.

| Atribut | Typ | Popis |
|---------|-----|-------|
| `regent` | string | Regent |
| `ward` | string | Chráněnec |
| `start_date` | date | Začátek regentství |
| `reason` | enum | `minority`, `incapable`, `absent` |
| `council_power` | number | Moc rady (0-100) |

**Volba regenta:**
1. Matka/Otec
2. Nejbližší dospělý příbuzný
3. Nejvyšší vazal
4. Kancléř

**Rizika regentství:**
- Regent může ukrást peníze (10%/rok šance)
- Regent může ovlivňovat výchovu
- Regent může uzurpovat (5%/rok šance, pokud ambiciózní)

### Interregnum

Období bez vládce.

| Atribut | Hodnota |
|---------|---------|
| Příčina | Smrt bez dědice |
| Trvání | Dokud není zvolen/určen nástupce |
| Efekty | −50% efektivita, +100% riziko vzpoury |
| Řešení | Volba, nejbližší příbuzný, dobytí |

---

## Uzurpace a převraty

### Uzurpace titulu

Násilné převzetí titulu bez legitimního nároku.

| Požadavky | Hodnota |
|-----------|---------|
| Vojenská kontrola | 100% území titulu |
| Vliv | 150 |
| Čas držení | 1 rok |

**Důsledky:**
- Legitimita 0
- Slabý nárok pro původního držitele
- −30 vztahy s ostatními

### Palácový převrat

Svržení vládce zevnitř.

| Faktor | Šance modifikátor |
|--------|-------------------|
| Nízká loajalita rady | +20% |
| Nízká legitimita | +15% |
| Ambiciózní vazal | +10% |
| Vysoké daně | +5% |
| Dlouhá vláda | −10% |
| Oblíbený vládce | −15% |

---

## Dynastické mechaniky

### Prestiž dynastie

Kumulovaná prestiž celé dynastie.

| Úroveň | Body | Efekty |
|--------|------|--------|
| Neznámá | 0-99 | Žádné |
| Menší | 100-499 | +5% diplomatický bonus |
| Významná | 500-1999 | +10% diplomatický bonus |
| Slavná | 2000-4999 | +15% diplomatický bonus, +10 legitimita |
| Legendární | 5000+ | +25% diplomatický bonus, +20 legitimita |

### Kadetní větve

Odnože hlavní dynastie.

| Atribut | Typ | Popis |
|---------|-----|-------|
| `branch_id` | string | Identifikátor |
| `parent_dynasty` | string | Mateřská dynastie |
| `founder` | string | Zakladatel |
| `founding_date` | date | Datum založení |
| `prestige` | number | Vlastní prestiž |

### Dynastické akce

| Akce | Cena | Efekt |
|------|------|-------|
| Založit kadetní větev | 100 vlivu | Nová odnož dynastie |
| Legitimizovat bastarda | 50 vlivu | Bastard se stává legitimním |
| Vydědit dědice | 100 vlivu | Odstranění z nástupnické linie |
| Změnit erb | 25 vlivu | Nový heraldický znak |

---

## Herní akce - přehled

| Akce | Cena (vliv) | Požadavky | Efekt |
|------|-------------|-----------|-------|
| Fabricate Claim | 0 (čas) | Kancléř s diplomacií > 10 | Vykovaný nárok |
| Press Claim | 0 | Platný nárok, armáda | Válka o nárok |
| Request Claim | 50 | Vztahy > +40 s církví | Svatý nárok |
| Usurp Title | 150 | 100% kontrola území | Převzetí titulu |
| Create Title | 50-1000 | Splnění požadavků | Nový titul |
| Destroy Title | 100 | Držení titulu | Zrušení titulu |
| Change Succession | 100 | 60+ legitimita | Změna dědického práva |
| Designate Heir | 50 | Volební/tanistický systém | Určení dědice |
| Disinherit | 100 | Legitimní dědic | Vydědění |
| Legitimize | 50 | Nemanželské dítě | Legitimizace |
