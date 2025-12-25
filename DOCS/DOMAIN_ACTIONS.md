# Akce domén

Akce jsou činnosti, které doména může provádět. Každá akce vyžaduje čas, zdroje a má šanci na úspěch.

---

## Struktura akce

| Atribut | Typ | Popis |
|---------|-----|-------|
| `action_key` | string | Unikátní klíč akce |
| `type` | enum | Kategorie (stewardship, diplomacy, trade, military, spying, magic, faith) |
| `actor` | string | Doména provádějící akci |
| `target` | string | Cíl akce (osada, doména, postava) |
| `cost_gold` | number | Cena ve zlatě |
| `cost_influence` | number | Cena ve vlivu |
| `duration` | number | Doba trvání (dny) |
| `success_chance` | number | Základní šance na úspěch (0-100) |
| `assignee` | string | Postava přiřazená k akci |

---

## Správcovské akce (Stewardship)

### Výběr daní (tax_collection)

Pravidelný výběr daní z osad.

| Parametr | Hodnota |
|----------|---------|
| Cena | Žádná |
| Trvání | 1 měsíc (automaticky každý měsíc) |
| Šance na úspěch | 100% (ale výnos závisí na kontrole) |
| Cíl | Všechny osady domény |

**Výnos:**
```
daně = Σ(osada.populace × daňová_sazba × osada.kontrola/100 × správcovství_bonus)
správcovství_bonus = 1 + (správcovství - 10) × 0.05
```

**Důsledky vysokých daní:**
- Sazba > 100%: −5 kontrola/měsíc
- Sazba > 150%: −10 kontrola/měsíc, emigrace
- Sazba > 200%: Riziko povstání

---

### Těžba zdroje (resource_extraction)

Aktivace těžby na nalezišti.

| Parametr | Hodnota |
|----------|---------|
| Cena | 10-100 zlata (podle infrastruktury) |
| Trvání | Průběžné |
| Šance na úspěch | 100% |
| Cíl | Naleziště přiřazené k osadě |

**Výnos:**
Viz vzorec v [RESOURCES.md](./RESOURCES.md).

---

### Stavba budovy (construct_building)

Výstavba nové budovy v osadě.

| Parametr | Hodnota |
|----------|---------|
| Cena | 50-2000 zlata (podle budovy) |
| Trvání | 1-24 měsíců |
| Šance na úspěch | 95% (může selhat při katastrofě) |
| Cíl | Osada |

**Modifikátory doby stavby:**
- Správcovství > 15: −20% čas
- Nedostatek materiálů: +50% čas
- Zima: +30% čas

---

### Vylepšení infrastruktury (upgrade_infrastructure)

Vylepšení cest, mostů, přístavů.

| Parametr | Hodnota |
|----------|---------|
| Cena | 10-200 zlata/hex |
| Trvání | 1-6 měsíců |
| Šance na úspěch | 100% |
| Cíl | Hex |

---

### Kolonizace (colonization)

Založení nové osady v divočině.

| Parametr | Hodnota |
|----------|---------|
| Cena | 100-500 zlata |
| Trvání | 6-12 měsíců |
| Šance na úspěch | 50-90% (podle terénu) |
| Cíl | Neosídlený hex |

**Požadavky:**
- Hex musí být v dosahu existující osady (max 3 hexy)
- Vhodný terén
- Dostupní kolonisté (min. 50)

---

## Diplomatické akce (Diplomacy)

### Přesvědčování (persuasion)

Pokus o změnu názoru jiné domény.

| Parametr | Hodnota |
|----------|---------|
| Cena | 5 vlivu |
| Trvání | Okamžité |
| Šance na úspěch | 30-80% (podle diplomacie a vztahů) |
| Cíl | Doména |

**Výpočet úspěchu:**
```
šance = 30 + diplomacie × 2 + vztahy/2 + dar_bonus
```

**Výsledky:**
- Úspěch: +10 až +30 vztahy
- Neúspěch: +0 až +5 vztahy
- Kritický neúspěch: −10 vztahy (urážka)

---

### Uzavření smlouvy (negotiate_treaty)

Vyjednání formální smlouvy.

| Parametr | Hodnota |
|----------|---------|
| Cena | 10-30 vlivu |
| Trvání | 1-4 týdny |
| Šance na úspěch | 20-90% (podle typu a vztahů) |
| Cíl | Doména |

**Typy smluv:**
- Příměří: 10 vlivu, +30% šance
- Neútočení: 15 vlivu, +20% šance
- Obchodní dohoda: 20 vlivu, +10% šance
- Spojenectví: 30 vlivu, +0% šance

---

### Dynastický sňatek (arrange_marriage)

Uspořádání sňatku mezi rody.

| Parametr | Hodnota |
|----------|---------|
| Cena | 20-50 vlivu + věno |
| Trvání | 1-3 měsíce |
| Šance na úspěch | 40-80% |
| Cíl | Dvě postavy z různých domén |

**Efekty:**
- +20 až +40 vztahy
- Možné dědické nároky
- Spojenecká vazba

---

### Vyhlášení války (declare_war)

Formální vyhlášení války.

| Parametr | Hodnota |
|----------|---------|
| Cena | 0-50 vlivu (podle casus belli) |
| Trvání | Okamžité |
| Šance na úspěch | 100% (ale důsledky závisí na legitimitě) |
| Cíl | Doména |

**Casus belli viz [WARFARE.md](./WARFARE.md).**

---

### Vyjednávání míru (negotiate_peace)

Ukončení války.

| Parametr | Hodnota |
|----------|---------|
| Cena | 5-30 vlivu |
| Trvání | 1-4 týdny |
| Šance na úspěch | Závisí na válečném skóre |
| Cíl | Nepřátelská doména |

---

## Obchodní akce (Trade)

### Městská dílna (town_workshop)

Zpracování surovin na výrobky.

| Parametr | Hodnota |
|----------|---------|
| Cena | 50-200 zlata (založení) |
| Trvání | Průběžné |
| Šance na úspěch | 100% |
| Cíl | Osada s trhem |

**Výnos:**
```
zisk = (cena_výrobku - cena_suroviny) × množství × obchod_bonus
obchod_bonus = 1 + (obchod - 10) × 0.05
```

---

### Vyslání karavany (send_caravan)

Odeslání obchodní karavany.

| Parametr | Hodnota |
|----------|---------|
| Cena | Cena karavany + náklad + údržba |
| Trvání | Podle vzdálenosti |
| Šance na úspěch | 70-95% (podle bezpečnosti trasy) |
| Cíl | Cílová osada |

**Viz [TRADE_ROUTES.md](./TRADE_ROUTES.md) pro detaily.**

---

### Obchodní loď (trading_ship)

Námořní obchodní expedice.

| Parametr | Hodnota |
|----------|---------|
| Cena | Cena lodi + náklad + posádka |
| Trvání | Podle vzdálenosti |
| Šance na úspěch | 60-90% |
| Cíl | Cílový přístav |

---

### Půjčování peněz (money_lending)

Poskytování úvěrů.

| Parametr | Hodnota |
|----------|---------|
| Cena | Půjčená částka |
| Trvání | Doba splácení (měsíce/roky) |
| Šance na úspěch | 70-95% (podle dlužníka) |
| Cíl | Doména nebo postava |

**Výnos:**
```
úrok = jistina × úroková_sazba × doba
typická_sazba = 10-30% ročně
```

**Rizika:**
- Nesplacení: Ztráta jistiny, možný casus belli
- Bankrot dlužníka: Částečná ztráta

---

## Vojenské akce (Military)

### Ochrana (guarding)

Přidělení vojáků k ochranným úkolům.

| Parametr | Hodnota |
|----------|---------|
| Cena | Údržba vojska |
| Trvání | Průběžné |
| Šance na úspěch | 100% |
| Cíl | Osada, karavana, osoba |

**Efekty:**
- +kontrola v osadě
- Snížení rizika přepadení karavan
- Ochrana důležitých osob

---

### Žoldnéřství (mercenary_contract)

Pronájem vojáků jiné doméně.

| Parametr | Hodnota |
|----------|---------|
| Cena | Žádná (příjem) |
| Trvání | Doba kontraktu |
| Šance na úspěch | 100% |
| Cíl | Najímající doména |

**Výnos:**
```
příjem = počet_vojáků × kvalita × 2 zlata/měsíc
```

**Rizika:**
- Ztráty v boji
- Reputační poškození při prohře

---

### Rekrutace (recruit_troops)

Nábor nových vojáků.

| Parametr | Hodnota |
|----------|---------|
| Cena | Cena jednotky |
| Trvání | 1-4 týdny |
| Šance na úspěch | 100% |
| Cíl | Osada |

**Limity:**
```
max_rekrutů = osada.populace × 0.05
rychlost = základní_rychlost × (1 + vojenský_atribut × 0.05)
```

---

### Tažení (military_campaign)

Vojenská operace proti nepříteli.

| Parametr | Hodnota |
|----------|---------|
| Cena | Vysoká (zásobování, údržba) |
| Trvání | Různé |
| Šance na úspěch | Závisí na síle |
| Cíl | Nepřátelské území |

**Viz [WARFARE.md](./WARFARE.md) pro detaily.**

---

## Špionážní akce (Spying)

### Odhalení tajemství (reveal_secret)

Získání kompromitujících informací.

| Parametr | Hodnota |
|----------|---------|
| Cena | 10-50 zlata |
| Trvání | 1-6 měsíců |
| Šance na úspěch | 20-60% |
| Cíl | Postava |
| Riziko odhalení | 10-30% |

**Výsledky:**
- Tajemství lze použít k vydírání
- Bonus k diplomatickým akcím
- Možnost skandálu

---

### Krádeže (thievery)

Organizovaná drobná kriminalita.

| Parametr | Hodnota |
|----------|---------|
| Cena | 5 zlata |
| Trvání | Průběžné |
| Šance na úspěch | 60-80% |
| Cíl | Osada |
| Riziko odhalení | 15% |

**Výnos:**
```
zisk = osada.bohatství × 0.01 × špehování_bonus
```

---

### Loupež (robbery)

Plánovaná krádež cenného předmětu.

| Parametr | Hodnota |
|----------|---------|
| Cena | 20-100 zlata |
| Trvání | 1-3 měsíce |
| Šance na úspěch | 30-50% |
| Cíl | Předmět/pokladna |
| Riziko odhalení | 30% |

---

### Únos (kidnapping)

Unesení důležité osoby.

| Parametr | Hodnota |
|----------|---------|
| Cena | 50-200 zlata |
| Trvání | 1-3 měsíce |
| Šance na úspěch | 20-40% |
| Cíl | Postava |
| Riziko odhalení | 40% |

**Využití rukojmí:**
- Výkupné
- Vyjednávací páka
- Výměna zajatců

---

### Vražda (assassination)

Plánovaná likvidace cíle.

| Parametr | Hodnota |
|----------|---------|
| Cena | 100-500 zlata |
| Trvání | 1-6 měsíců |
| Šance na úspěch | 10-30% |
| Cíl | Postava |
| Riziko odhalení | 50% |

**Důsledky odhalení:**
- −50 vztahy se všemi
- Možný casus belli
- Ztráta legitimity

---

## Magické akce (Magic)

### Alchymistická laboratoř (alchemical_laboratory)

Výroba magických předmětů a lektvarů.

| Parametr | Hodnota |
|----------|---------|
| Cena | 100 zlata (založení) + materiály |
| Trvání | Průběžné |
| Šance na úspěch | 100% (kvalita závisí na magii) |
| Cíl | Osada |

**Produkce:**
```
kvalita = 1 + (magie - 10) × 0.1
výstup = vstupy × kvalita
```

---

### Magická akademie (magic_academy)

Magický výzkum a vzdělávání.

| Parametr | Hodnota |
|----------|---------|
| Cena | 500 zlata (založení) + údržba |
| Trvání | Průběžné |
| Šance na úspěch | 100% |
| Cíl | Osada (large_city+) |

**Efekty:**
- Generuje magické znalosti
- Trénuje mágy
- Umožňuje výzkum kouzel

---

### Očarování oblasti (enchant_area)

Aplikace magického efektu na hex.

| Parametr | Hodnota |
|----------|---------|
| Cena | 50-500 zlata + krystaly |
| Trvání | 1-3 měsíce |
| Šance na úspěch | 40-80% |
| Cíl | Hex |

**Typy očarování:**
- Ochranné: Bonus k obraně
- Úrodnost: Bonus k produkci
- Skrytí: Snížení viditelnosti
- Prokletí: Postihy pro nepřátele

---

## Náboženské akce (Faith)

### Veřejné mínění (public_opinion)

Ovlivňování názoru obyvatel na doménu.

| Parametr | Hodnota |
|----------|---------|
| Cena | 10 vlivu |
| Trvání | 1 měsíc |
| Šance na úspěch | 50-80% |
| Cíl | Osada nebo doména |

**Efekty:**
- +/−10 až 30 k názoru na cílovou doménu
- Ovlivňuje kontrolu v osadách

---

### Udělení legitimity (grant_legitimacy)

Náboženské potvrzení nároku.

| Parametr | Hodnota |
|----------|---------|
| Cena | 20 vlivu |
| Trvání | 1 týden |
| Šance na úspěch | 60-90% |
| Cíl | Postava nebo doména |

**Efekty:**
- +20 legitimita
- Silnější nároky
- Bonus k diplomatickým akcím

---

### Exkomunikace (excommunication)

Vyloučení z náboženského společenství.

| Parametr | Hodnota |
|----------|---------|
| Cena | 30 vlivu |
| Trvání | Okamžité |
| Šance na úspěch | 40-70% |
| Cíl | Postava nebo doména |

**Efekty:**
- −30 legitimita
- −20 vztahy se stejně věřícími
- Možný casus belli pro "svatou válku"

---

### Svatořečení (canonization)

Prohlášení osoby za svatou.

| Parametr | Hodnota |
|----------|---------|
| Cena | 50 vlivu |
| Trvání | 1-3 měsíce |
| Šance na úspěch | 30-50% |
| Cíl | Mrtvá postava s vysokou zbožností |

**Efekty:**
- +30 prestiž dynastie
- Bonus k víře v doméně
- Možnost poutního místa
