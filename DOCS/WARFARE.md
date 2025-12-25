# Válka

Válečný systém řeší konflikty mezi doménami - od drobných šarvátek po velká tažení.

## Casus Belli (Důvod k válce)

Před vyhlášením války je potřeba mít legitimní důvod. Bez něj hrozí:
- -30 vztahy se všemi doménami
- -20 prestiž
- Možná exkomunikace
- Odpor vlastních vazalů

### Typy casus belli

| Typ | Popis | Získání |
|-----|-------|---------|
| Územní nárok | Historický nárok na území | Dědictví, smlouva |
| Svatá válka | Boj proti jinověrcům | Náboženská autorita |
| Reconquista | Znovudobytí ztracených území | Ztráta území < 50 let |
| Vazalská vzpoura | Osvobození od lenního pána | Tyranství, porušení smlouvy |
| Sjednocení | Spojení kulturně příbuzných území | Stejná kultura |
| Odveta | Pomsta za útok | Předchozí útok |
| Dobyvačná | Čistá expanze | Žádný (velká penalizace) |

## Jednotky

### Typy jednotek

#### Pěchota

| Jednotka | Síla | Cena | Údržba/měsíc | Rychlost |
|----------|------|------|--------------|----------|
| Milice | 5 | 2 | 0.5 | 3 hexy/den |
| Kopiníci | 10 | 5 | 1 | 2 hexy/den |
| Těžká pěchota | 15 | 10 | 2 | 2 hexy/den |
| Elitní gardisté | 25 | 25 | 5 | 2 hexy/den |

#### Střelci

| Jednotka | Síla | Cena | Údržba/měsíc | Rychlost |
|----------|------|------|--------------|----------|
| Lučištníci | 8 | 4 | 1 | 3 hexy/den |
| Kušníci | 12 | 8 | 1.5 | 2 hexy/den |
| Elitní lučištníci | 18 | 15 | 3 | 3 hexy/den |

#### Jízda

| Jednotka | Síla | Cena | Údržba/měsíc | Rychlost |
|----------|------|------|--------------|----------|
| Lehká jízda | 12 | 10 | 2 | 5 hexů/den |
| Těžká jízda | 25 | 25 | 5 | 4 hexy/den |
| Rytíři | 40 | 50 | 10 | 4 hexy/den |

#### Speciální jednotky

| Jednotka | Síla | Cena | Údržba/měsíc | Speciální |
|----------|------|------|--------------|-----------|
| Obléhací stroje | 5 | 100 | 10 | +50% obléhání |
| Mágové | 30 | 100 | 20 | Magické útoky |
| Špioni | 5 | 20 | 5 | Průzkum, sabotáž |

### Rekrutace

```
čas_rekrutace = základní_čas × (1 - vojenský_atribut × 0.03)
max_rekrutů = dostupná_populace × 0.05
```

| Velikost osady | Max rekrutů/měsíc |
|----------------|-------------------|
| Vesnice | 10 |
| Prosperující vesnice | 30 |
| Malé město | 100 |
| Střední město | 300 |
| Velké město | 1000 |

### Morálka

Morálka jednotky (0-100) ovlivňuje její bojeschopnost.

**Faktory morálky:**

| Faktor | Efekt |
|--------|-------|
| Čerstvě rekrutováni | 50 |
| Veteráni (5+ bitev) | +20 |
| Vítězství | +10 |
| Prohra | -20 |
| Hlad | -30 |
| Nízká výplata | -20 |
| Charismatický velitel | +15 |
| Daleko od domova | -10 |

**Důsledky nízké morálky:**

| Morálka | Efekt |
|---------|-------|
| 70-100 | Normální |
| 40-69 | -20% bojová síla |
| 20-39 | -40% bojová síla, riziko dezerce |
| 0-19 | Útěk z bitvy, masová dezerce |

## Pohyb armád

### Rychlost pohybu

Základní rychlost závisí na nejpomalejší jednotce v armádě.

### Modifikátory terénu

| Terén | Modifikátor |
|-------|-------------|
| Cesta | +50% |
| Pláně | +0% |
| Kopce | -25% |
| Les | -50% |
| Hory | -75% |
| Mokřady | -60% |
| Džungle | -80% |
| Poušť | -30% (bez vody -80%) |

### Zásobování

Armáda potřebuje zásoby pro přežití:

```
denní_spotřeba = počet_vojáků × 0.5 kg
```

**Zdroje zásob:**
- Vlastní zásobovací vozy
- Drancování (snižuje kontrolu)
- Přátelské osady

**Důsledky nedostatku:**
- Den 1-3: -10 morálka
- Den 4-7: -30 morálka, dezerce
- Den 8+: Smrt hladem

## Bitvy

### Průběh bitvy

1. **Fáze rozmístění** - podle terénu a velitele
2. **Střelecká fáze** - střelci útočí
3. **Střetnutí** - pěchota a jízda
4. **Boj zblízka** - postupné kolo po kole
5. **Pronásledování** - po prolomení nepřítele

### Výpočet síly

```
bojová_síla = Σ(jednotka.síla × jednotka.počet × jednotka.morálka/100)
modifikovaná_síla = bojová_síla × terénní_bonus × velitelský_bonus × magický_bonus
```

### Terénní bonusy

| Terén | Útočník | Obránce |
|-------|---------|---------|
| Pláně | 1.0 | 1.0 |
| Kopce | 0.8 | 1.3 |
| Lesy | 0.7 | 1.2 |
| Hory | 0.5 | 1.5 |
| Mokřady | 0.6 | 1.1 |
| Říční přechod | 0.6 | 1.4 |
| Hradby | 0.3 | 2.0 |

### Bonusy jednotek

| Situace | Bonus |
|---------|-------|
| Jízda na pláních | +30% |
| Jízda proti kopiníkům | -40% |
| Lučištníci na kopci | +20% |
| Těžká pěchota v obraně | +20% |
| Obránce za hradbami | +100% |

### Výsledek bitvy

```
poměr_sil = síla_útočníka / síla_obránce
```

| Poměr | Výsledek |
|-------|----------|
| > 3:1 | Drtivé vítězství útočníka |
| 2:1 - 3:1 | Jasné vítězství útočníka |
| 1.2:1 - 2:1 | Těsné vítězství útočníka |
| 0.8:1 - 1.2:1 | Patová situace |
| 0.5:1 - 0.8:1 | Těsné vítězství obránce |
| < 0.5:1 | Drtivé vítězství obránce |

### Ztráty

```
ztráty_poraženého = 20% + (poměr_sil - 1) × 10%
ztráty_vítěze = 5% + (1/poměr_sil - 1) × 5%
```

Ztráty jsou limitovány na 80% pro poraženého a 30% pro vítěze.

## Obléhání

### Průběh obléhání

1. **Obklíčení** - zabránění zásobování
2. **Ostřelování** - poškozování hradeb
3. **Výpady** - obránce se snaží prorazit
4. **Útok** - pokus o dobytí

### Délka obléhání

```
čas_obléhání = (hradby × 10) / (obléhací_stroje + 1) dní
```

| Typ opevnění | Hodnota hradeb |
|--------------|----------------|
| Palisáda | 1 |
| Dřevěná hradba | 2 |
| Kamenná hradba | 5 |
| Mohutné hradby | 10 |
| Citadela | 20 |

### Možnosti obléhání

| Strategie | Čas | Ztráty útočníka | Ztráty obránce |
|-----------|-----|-----------------|----------------|
| Vyhladovění | Dlouhý | Nízké | Střední |
| Bombardování | Střední | Nízké | Nízké |
| Útok | Krátký | Vysoké | Střední |
| Podkopání | Střední | Střední | Vysoké |

### Kapitulace

Obránce kapituluje, když:
- Dojdou zásoby
- Morálka klesne pod 10
- Hradby jsou zničeny
- Velitel je zabit/zajat

## Válečné cíle

### Typy cílů

| Cíl | Popis | Bodová hodnota |
|----|-------|----------------|
| Dobytí osady | Kontrola nad osadou | 10-50 |
| Zničení armády | Eliminace nepřátelských sil | 20 |
| Zajetí vůdce | Zajmutí důležité osoby | 30 |
| Okupace území | Kontrola hexu | 5 |

### Válečné skóre

```
válečné_skóre = splněné_cíle - vlastní_ztráty + čas_bonus
```

| Skóre | Možný výsledek |
|-------|----------------|
| +100 | Úplné vítězství - všechny požadavky |
| +50 až +99 | Významné vítězství |
| +1 až +49 | Drobné vítězství |
| 0 | Status quo |
| -1 až -49 | Drobná porážka |
| -50 až -99 | Významná porážka |
| -100 | Úplná porážka - všechny požadavky soupeře |

## Mír

### Vyjednávání míru

Pro mír je nutné:
- Válečné skóre > 50 pro vítěze, nebo
- Oboustranný souhlas, nebo
- Vyčerpání obou stran

### Podmínky míru

| Podmínka | Cena (skóre) |
|----------|--------------|
| Odstoupení území | 20 za hex |
| Válečná reparace | 10 za 100 zlata |
| Propuštění zajatců | 5 za osobu |
| Vazalství | 50 |
| Dynastický sňatek | 15 |
| Příměří (10 let) | 0 |

### Příměří

Po uzavření míru platí příměří:
- Minimálně 5 let
- Porušení = -50 vztahy se všemi

## Žoldnéři

### Najímání žoldnéřů

Žoldnéři jsou předem sestavené armády k pronájmu.

| Typ | Síla | Cena/měsíc | Dostupnost |
|----|------|------------|------------|
| Malá banda | 100 | 50 | Běžná |
| Žoldnéřská rota | 500 | 200 | Střední |
| Žoldnéřská armáda | 2000 | 700 | Vzácná |
| Elitní kompanie | 500 | 500 | Velmi vzácná |

### Výhody a nevýhody

**Výhody:**
- Okamžitě dostupní
- Zkušení veteráni
- Žádné vlastní ztráty populace

**Nevýhody:**
- Drazí
- Mohou přeběhnout k lépe platícímu
- Žádná loajalita
- Mohou rabovat

## Vojenské budovy

| Budova | Cena | Efekt |
|--------|------|-------|
| Kasárna | 100 | +50% rychlost rekrutace |
| Zbrojnice | 150 | +10% síla jednotek |
| Stáje | 200 | Umožňuje jízdu |
| Obléhací dílna | 300 | Umožňuje obléhací stroje |
| Hradby | 500 | Obranný bonus |
| Citadela | 2000 | +100% obrana, sídlo velení |
