# Diplomacie

Diplomatický systém řídí vztahy mezi doménami, uzavírání smluv a vytváření aliancí.

---

## Vztahy mezi doménami

### Škála vztahů

Vztahy jsou měřeny na škále −100 až +100.

| Rozsah | Stav | Popis |
|--------|------|-------|
| −100 až −80 | Úhlavní nepřátelství | Válka je téměř nevyhnutelná |
| −79 až −60 | Nepřátelství | Vysoké riziko konfliktu |
| −59 až −40 | Rivalita | Aktivní soupeření |
| −39 až −20 | Napětí | Nedůvěra a opatrnost |
| −19 až +19 | Neutralita | Žádný zvláštní vztah |
| +20 až +39 | Sympatie | Mírně pozitivní vztah |
| +40 až +59 | Přátelství | Ochota spolupracovat |
| +60 až +79 | Blízké přátelství | Silná vazba |
| +80 až +100 | Aliance | Nerozlučné spojenectví |

### Faktory ovlivňující vztahy

#### Pozitivní faktory

| Faktor | Modifikátor | Trvání |
|--------|-------------|--------|
| Společný nepřítel | +20 | Dokud trvá |
| Obchodní smlouva | +10 | Dokud trvá |
| Dynastický sňatek | +30 | Trvalé |
| Spojenecká smlouva | +20 | Dokud trvá |
| Vojenská pomoc | +15 | 5 let |
| Dar (malý) | +5 | 1 rok |
| Dar (velký) | +15 | 2 roky |
| Dar (královský) | +25 | 3 roky |
| Stejná víra | +10 | Trvalé |
| Stejná kultura | +5 | Trvalé |
| Pomoc v krizi | +20 | 10 let |
| Splnění slibu | +10 | 5 let |

#### Negativní faktory

| Faktor | Modifikátor | Trvání |
|--------|-------------|--------|
| Územní nárok | −20 | Dokud trvá |
| Přerušení smlouvy | −30 | 10 let |
| Urážka | −10 | 2 roky |
| Špionáž (odhalená) | −25 | 5 let |
| Podpora rivala | −15 | Dokud trvá |
| Jiná víra | −5 až −20 | Trvalé |
| Válka (minulá) | −10 až −30 | 10-30 let |
| Zrada spojenectví | −50 | 20 let |
| Vražda člena rodu | −40 | 30 let |
| Porušení příměří | −40 | 15 let |
| Exkomunikace | −20 | Dokud trvá |

### Přirozený posun vztahů

Vztahy se časem přirozeně posouvají směrem k neutralitě:
- Extrémní vztahy (|vztah| > 50): ±2/rok směrem k 0
- Silné vztahy (|vztah| > 30): ±1/rok směrem k 0

---

## Smlouvy

### Typy smluv

#### Příměří (truce)

Dočasný mír po skončení války.

| Atribut | Hodnota |
|---------|---------|
| Délka | 5-15 let |
| Porušení | −40 vztahy, −20 legitimita |
| Automatické | Po ukončení války |

#### Pakt o neútočení (non_aggression_pact)

Slib nevyhlašovat válku.

| Atribut | Hodnota |
|---------|---------|
| Délka | 10-20 let |
| Cena | 15 vlivu |
| Porušení | −30 vztahy |
| Požadované vztahy | > 0 |

#### Obchodní smlouva (trade_agreement)

Snížení cel a podpora obchodu.

| Atribut | Hodnota |
|---------|---------|
| Délka | Neurčitá |
| Cena | 10 vlivu |
| Efekt | −25% cla, +10 vztahy |
| Požadované vztahy | > −20 |

#### Vojenský přístup (military_access)

Právo pohybovat armádami přes území.

| Atribut | Hodnota |
|---------|---------|
| Délka | 1-5 let nebo neurčitá |
| Cena | 10 vlivu |
| Efekt | Armády mohou procházet |
| Požadované vztahy | > +20 |

#### Obranný pakt (defensive_pact)

Závazek vzájemné obrany.

| Atribut | Hodnota |
|---------|---------|
| Délka | 10-20 let |
| Cena | 20 vlivu |
| Efekt | Automatický vstup do obranné války |
| Požadované vztahy | > +40 |

#### Spojenectví (alliance)

Plné vojenské a politické spojenectví.

| Atribut | Hodnota |
|---------|---------|
| Délka | Neurčitá |
| Cena | 30 vlivu |
| Efekt | Obranný pakt + podpora nároků |
| Požadované vztahy | > +60 |

#### Vazalství (vassalage)

Podřízení jedné domény druhé.

| Atribut | Hodnota |
|---------|---------|
| Délka | Neurčitá |
| Cena | 0 (vynuceno nebo dobrovolné) |
| Efekt | Vazal platí daně, poskytuje vojáky |
| Požadované vztahy | > +40 nebo vojenská porážka |

### Struktura smlouvy

| Atribut | Typ | Popis |
|---------|-----|-------|
| `treaty_id` | string | Unikátní identifikátor |
| `type` | enum | Typ smlouvy |
| `parties` | array | Zúčastněné domény |
| `start_date` | date | Datum uzavření |
| `end_date` | date | Datum vypršení (nebo null) |
| `terms` | object | Specifické podmínky |
| `status` | enum | `active`, `expired`, `broken` |

---

## Aliance

### Vytvoření aliance

Aliance je formální spojenectví více domén.

**Požadavky:**
- Minimálně 2 domény
- Vztahy mezi členy > +40
- Společný zájem (nepřítel, obchod)

### Struktura aliance

| Atribut | Typ | Popis |
|---------|-----|-------|
| `alliance_id` | string | Identifikátor |
| `name` | string | Název aliance |
| `leader` | string | Vedoucí doména |
| `members` | array | Seznam členů |
| `founding_date` | date | Datum založení |
| `war_leader` | string | Kdo rozhoduje ve válce |
| `treasury` | number | Společná pokladna |

### Hlasování v alianci

Důležitá rozhodnutí vyžadují hlasování:
- Vyhlášení války: Většina hlasů
- Přijetí nového člena: Jednomyslně
- Vyloučení člena: 2/3 hlasů
- Změna vedení: 2/3 hlasů

### Opuštění aliance

| Způsob | Důsledky |
|--------|----------|
| Řádný odchod | −20 vztahy s členy |
| Zrada (ve válce) | −50 vztahy, ztráta legitimity |
| Vyloučení | Žádný postih pro vyloučeného |

---

## Diplomatické incidenty

### Urážka (insult)

Formální vyjádření nesouhlasu.

| Atribut | Hodnota |
|---------|---------|
| Efekt | −10 vztahy |
| Trvání | 2 roky |
| Využití | Vyjádření nespokojenosti |

### Ultimátum (ultimatum)

Požadavek pod hrozbou války.

| Atribut | Hodnota |
|---------|---------|
| Efekt | Splnění nebo casus belli |
| Doba na odpověď | 30 dní |
| Přijetí | −20 prestiž |
| Odmítnutí | Válka bez diplomatického postihu |

### Výhrůžka (threat)

Varování před důsledky.

| Atribut | Hodnota |
|---------|---------|
| Efekt | −5 vztahy, možná změna chování |
| Důvěryhodnost | Závisí na vojenské síle |

### Nabídka vazalství (offer_vassalage)

Nabídka stát se vazalem.

| Atribut | Hodnota |
|---------|---------|
| Přijetí | Doména se stává vazalem |
| Odmítnutí | Možný casus belli |
| Faktory | Vojenská síla, hrozby, vztahy |

---

## Diplomatická jednání

### Struktura jednání

| Atribut | Typ | Popis |
|---------|-----|-------|
| `negotiation_id` | string | Identifikátor |
| `initiator` | string | Doména zahajující jednání |
| `target` | string | Cílová doména |
| `type` | enum | Typ jednání |
| `offers` | array | Nabídky |
| `demands` | array | Požadavky |
| `status` | enum | `ongoing`, `accepted`, `rejected` |

### Nabídky a protinabídky

Jednání probíhá výměnou nabídek:

1. Iniciátor předloží návrh
2. Cíl může přijmout, odmítnout nebo protinabídnout
3. Opakuje se dokud nedojde k dohodě nebo přerušení

### Faktory úspěchu

```
šance_přijetí = základní_šance
    + vztahy × 0.5
    + diplomacie_rozdíl × 2
    + hodnota_nabídky × 0.1
    - hodnota_požadavků × 0.2
```

---

## Diplomatické postavy

### Velvyslanec (ambassador)

Stálý zástupce u cizího dvora.

| Atribut | Hodnota |
|---------|---------|
| Cena | 5 zlata/měsíc |
| Efekt | +1 vztahy/rok, lepší informace |
| Požadavky | Vztahy > −40 |

### Vyslanec (envoy)

Jednorázová diplomatická mise.

| Atribut | Hodnota |
|---------|---------|
| Cena | 10 zlata + cestovné |
| Efekt | Bonus k jednání |
| Trvání | Jednorázové |

### Rukojmí (hostage)

Osoba držená jako záruka smlouvy.

| Atribut | Hodnota |
|---------|---------|
| Efekt | +20% šance dodržení smlouvy |
| Riziko | Možná smrt při porušení |
| Typické | Děti šlechticů |

---

## Mezinárodní organizace

### Církev / Náboženská autorita

Nadnárodní náboženská organizace.

**Pravomoci:**
- Exkomunikace
- Udělování legitimity
- Vyhlášení svaté války
- Zprostředkování míru

### Obchodní liga

Spolek obchodních domén.

**Výhody členství:**
- Sdílené obchodní trasy
- Společná obrana obchodu
- Vyjednávací síla

### Císařství

Nadstátní útvar s císařem.

**Struktura:**
- Císař (volený nebo dědičný)
- Kurfiřti (volitelé)
- Říšské stavy (členové)

**Pravomoci císaře:**
- Svolání říšského sněmu
- Rozhodování sporů
- Velení říšské armádě

---

## Diplomatické akce - přehled

| Akce | Cena (vliv) | Požadavek (vztahy) | Efekt |
|------|-------------|-------------------|-------|
| Zlepšit vztahy | 5 | > −60 | +10 až +20 vztahy |
| Urážka | 0 | - | −10 vztahy |
| Nabídnout dar | 0 | - | +5 až +25 vztahy |
| Nabídnout smlouvu | 10-30 | Různé | Smlouva |
| Vyslat velvyslance | 5 | > −40 | Stálé zastoupení |
| Vyhlásit rivalitu | 0 | - | −20 vztahy, casus belli |
| Ultimátum | 10 | - | Splnění nebo válka |
| Požádat o vazalství | 0 | < −20 | Vazalství |
| Nabídnout vazalství | 0 | - | Stát se vazalem |
| Zprostředkovat mír | 15 | > +20 s oběma | Ukončení války |
