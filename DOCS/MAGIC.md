# Magie

Magický systém využívá krystaly jako zdroj magické energie a zahrnuje akademie, očarování a magické rituály.

---

## Magická energie

### Krystaly jako zdroj

Krystaly jsou primárním zdrojem magické energie. Různé typy krystalů mají různé vlastnosti.

| Typ krystalu | Magická afinita | Vzácnost | Základní cena |
|--------------|-----------------|----------|---------------|
| Křemen | Neutrální | Běžný | 5 |
| Ametyst | Mysl, iluze | Neobvyklý | 20 |
| Rubín | Oheň, energie | Vzácný | 50 |
| Safír | Voda, led | Vzácný | 50 |
| Smaragd | Příroda, léčení | Vzácný | 50 |
| Obsidián | Temnota, smrt | Vzácný | 60 |
| Diamant | Čistá magie | Velmi vzácný | 200 |
| Runový krystal | Universální | Legendární | 500 |

### Magická kapacita

```
magická_kapacita = suma(krystal_hodnota × kvalita)
    × (1 + magický_atribut × 0.1)
    × akademie_modifikátor
```

| Kvalita krystalu | Hodnota modifikátor |
|------------------|---------------------|
| Nízká (1) | 0.5 |
| Průměrná (2) | 0.75 |
| Dobrá (3) | 1.0 |
| Výjimečná (4) | 1.5 |
| Perfektní (5) | 2.0 |

---

## Magické školy

### Základní školy

| Škola | Afinita | Primární využití |
|-------|---------|------------------|
| Evokace | Rubín | Přímé bojové kouzla |
| Transmutace | Smaragd | Přeměna hmoty |
| Iluze | Ametyst | Klamání smyslů |
| Nekromancie | Obsidián | Manipulace se smrtí |
| Léčení | Smaragd | Obnova života |
| Věštění | Ametyst | Znalost budoucnosti |
| Zaklínání | Diamant | Přivolávání bytostí |
| Očarování | Safír | Magické předměty |

### Struktura magické školy

| Atribut | Typ | Popis |
|---------|-----|-------|
| `school_id` | string | Identifikátor |
| `name` | string | Název školy |
| `crystal_affinity` | array | Preferované krystaly |
| `difficulty` | 1-5 | Obtížnost učení |
| `legality` | enum | `legal`, `restricted`, `forbidden` |
| `opposing_school` | string | Protichůdná škola |

---

## Mágové a čarodějové

### Typy magiků

| Typ | Popis | Učení | Síla |
|-----|-------|-------|------|
| Učedník | Začátečník | 1-2 roky | Slabé |
| Adept | Pokročilý student | 3-5 let | Střední |
| Mág | Plně vyškolený | 10+ let | Silné |
| Arcimág | Mistr oboru | 20+ let | Velmi silné |
| Velmistr | Legendární mág | 30+ let | Extrémní |

### Struktura mága

| Atribut | Typ | Popis |
|---------|-----|-------|
| `mage_id` | string | Identifikátor |
| `name` | string | Jméno |
| `rank` | enum | Hodnost |
| `schools` | object | Školy a úrovně (1-10) |
| `mana` | number | Aktuální mana |
| `max_mana` | number | Maximální mana |
| `focus_crystal` | string | Osobní krystal |
| `academy` | string | Kde studoval |
| `specialization` | string | Specializace |

### Mana

Mana je osobní zásobu magické energie mága.

```
regenerace_many = základní_regenerace
    × (1 + škola_léčení × 0.05)
    × prostředí_modifikátor
    × stav_modifikátor
```

| Stav | Regenerace |
|------|------------|
| Odpočinek | 10 many/den |
| Lehká aktivita | 5 many/den |
| Aktivní cestování | 2 many/den |
| Boj | 0 many/den |
| Meditace | 20 many/den |

---

## Kouzla

### Struktura kouzla

| Atribut | Typ | Popis |
|---------|-----|-------|
| `spell_id` | string | Identifikátor |
| `name` | string | Název kouzla |
| `school` | enum | Magická škola |
| `tier` | 1-5 | Úroveň kouzla |
| `mana_cost` | number | Cena v maně |
| `crystal_cost` | object | Potřebné krystaly |
| `casting_time` | string | Doba sesílání |
| `range` | string | Dosah |
| `duration` | string | Trvání |
| `effect` | object | Efekt kouzla |

### Úrovně kouzel (Tier)

| Tier | Požadovaná úroveň školy | Mana | Příklad |
|------|-------------------------|------|---------|
| 1 | 1-2 | 5-15 | Světlo, drobné iluze |
| 2 | 3-4 | 15-30 | Ohnivý šíp, léčení ran |
| 3 | 5-6 | 30-50 | Ohnivá koule, neviditelnost |
| 4 | 7-8 | 50-100 | Teleportace, vzkříšení |
| 5 | 9-10 | 100+ | Časová manipulace, přivolání |

### Bojová kouzla

| Kouzlo | Škola | Tier | Mana | Efekt |
|--------|-------|------|------|-------|
| Magický šíp | Evokace | 1 | 10 | 2d6 magického poškození |
| Ohnivá koule | Evokace | 3 | 40 | 6d6 ohnivého poškození v oblasti |
| Blesk | Evokace | 2 | 25 | 4d6 bleskového poškození |
| Ledová zeď | Evokace | 2 | 30 | Blokuje pohyb, 3d6 chladu |
| Meteor | Evokace | 5 | 150 | 15d6 v masivní oblasti |

### Obranná kouzla

| Kouzlo | Škola | Tier | Mana | Efekt |
|--------|-------|------|------|-------|
| Štít | Evokace | 1 | 15 | +2 obrana, 1 hodina |
| Magická bariéra | Evokace | 3 | 50 | Absorbuje 50 poškození |
| Protimagie | Evokace | 4 | 80 | Ruší kouzla do tier 3 |
| Neviditelnost | Iluze | 3 | 40 | Neviditelný, 10 minut |

### Užitková kouzla

| Kouzlo | Škola | Tier | Mana | Efekt |
|--------|-------|------|------|-------|
| Věštba | Věštění | 2 | 30 | Odpověď na jednoduchou otázku |
| Teleportace | Transmutace | 4 | 80 | Přemístění na známé místo |
| Léčení | Léčení | 2 | 25 | Vyléčí 3d8 životů |
| Vzkříšení | Léčení | 5 | 200 | Návrat mrtvého do života |
| Ovládání počasí | Transmutace | 5 | 150 | Změna počasí v regionu |

---

## Rituály

### Typy rituálů

Rituály jsou mocná kouzla vyžadující čas, více účastníků a vzácné komponenty.

| Typ rituálu | Účastníci | Doba | Komponenty |
|-------------|-----------|------|------------|
| Malý | 1-3 | Hodiny | Běžné |
| Střední | 3-7 | Dny | Neobvyklé |
| Velký | 7-13 | Týdny | Vzácné |
| Epický | 13+ | Měsíce | Legendární |

### Struktura rituálu

| Atribut | Typ | Popis |
|---------|-----|-------|
| `ritual_id` | string | Identifikátor |
| `name` | string | Název |
| `tier` | enum | Velikost rituálu |
| `participants` | number | Minimální účastníci |
| `duration` | string | Doba provedení |
| `components` | array | Potřebné komponenty |
| `crystal_cost` | object | Spotřebované krystaly |
| `effect` | object | Efekt rituálu |
| `failure_consequence` | string | Následek selhání |

### Příklady rituálů

| Rituál | Tier | Efekt |
|--------|------|-------|
| Požehnání úrody | Malý | +20% produkce potravin, 1 rok |
| Ochranná bariéra | Střední | +30% obrana osady, 1 rok |
| Přivolání deště | Střední | Ukončení sucha |
| Prokletí nepřítele | Střední | −20% na všechny akce cíle |
| Permanentní teleport | Velký | Trvalý portál mezi místy |
| Probuzení golem | Velký | Vytvoření magické konstruktu |
| Sjednocení ley linií | Epický | +50% magická produkce v regionu |

---

## Magické akademie

### Typy akademií

| Typ | Velikost | Studenti | Mágové | Cena založení |
|----|----------|----------|--------|---------------|
| Kruh | Malý | 5-10 | 1-3 | 200 |
| Věž | Střední | 20-50 | 5-10 | 500 |
| Akademie | Velký | 100-300 | 20-50 | 2000 |
| Univerzita | Obrovský | 500+ | 100+ | 10000 |

### Struktura akademie

| Atribut | Typ | Popis |
|---------|-----|-------|
| `academy_id` | string | Identifikátor |
| `name` | string | Název |
| `type` | enum | Velikost |
| `location` | string | Umístění |
| `schools` | array | Vyučované školy |
| `head_mage` | string | Vedoucí mág |
| `students` | number | Počet studentů |
| `faculty` | array | Učitelský sbor |
| `reputation` | 0-100 | Pověst |
| `library` | number | Velikost knihovny |
| `crystal_reserves` | object | Zásoby krystalů |

### Služby akademie

| Služba | Cena | Čas | Efekt |
|--------|------|-----|-------|
| Výcvik učedníka | 100/rok | 2 roky | Nový mág (učedník) |
| Výcvik adepta | 200/rok | 3 roky | Povýšení na adepta |
| Výzkum kouzla | 50-500 | 1-12 měsíců | Nové kouzlo |
| Identifikace předmětu | 20 | 1 den | Odhalení magie |
| Sesílání na zakázku | Různé | Různé | Kouzlo pro klienta |
| Očarování předmětu | 100+ | 1+ týden | Magický předmět |

---

## Magické předměty

### Typy magických předmětů

| Typ | Příklad | Trvalost | Cena modifikátor |
|----|---------|----------|------------------|
| Jednorázový | Lektvar, svitek | Spotřební | ×0.5 |
| Nabitý | Hůlka, prsten | Omezené použití | ×1 |
| Trvalý | Zbraň, zbroj | Permanentní | ×3 |
| Artefakt | Legendární | Nezničitelný | ×10+ |

### Struktura magického předmětu

| Atribut | Typ | Popis |
|---------|-----|-------|
| `item_id` | string | Identifikátor |
| `name` | string | Název |
| `type` | enum | Typ předmětu |
| `base_item` | string | Základní předmět |
| `enchantments` | array | Očarování |
| `charges` | number | Počet použití (nebo null) |
| `creator` | string | Tvůrce |
| `quality` | 1-5 | Kvalita zpracování |

### Očarování

| Očarování | Efekt | Tier | Krystaly |
|-----------|-------|------|----------|
| Ostrý | +1 až +5 k poškození | 1-3 | Rubín |
| Ochranný | +1 až +5 k obraně | 1-3 | Safír |
| Léčivý | Regenerace 1-5/hodinu | 2-4 | Smaragd |
| Plamenný | +2d6 ohnivého poškození | 2 | Rubín |
| Mrazivý | +2d6 ledového poškození | 2 | Safír |
| Neviditelnosti | 3× denně neviditelnost | 3 | Ametyst |
| Teleportační | 1× denně teleport | 4 | Diamant |
| Inteligentní | Předmět má vlastní vůli | 5 | Runový |

### Výroba magických předmětů

```
cena_výroby = cena_základního_předmětu
    + suma(tier_očarování × 50)
    + cena_krystalů
```

```
čas_výroby = suma(tier_očarování) × 3 dny
```

| Faktor | Modifikátor |
|--------|-------------|
| Mistr řemeslník | −20% čas |
| Kvalitní dílna | −10% cena |
| Arcimág | −30% čas, lepší kvalita |
| Vzácné komponenty | +50% cena, +1 kvalita |

---

## Ley linie a místa moci

### Ley linie

Přírodní toky magické energie.

| Atribut | Typ | Popis |
|---------|-----|-------|
| `ley_line_id` | string | Identifikátor |
| `path` | array | Hexy, kterými prochází |
| `strength` | 1-5 | Síla linie |
| `stability` | 0-100 | Stabilita |
| `nodes` | array | Uzlová body |

**Efekty ley linií:**
- +10% regenerace many za úroveň síly
- Možnost čerpat energii pro rituály
- Zesílení kouzel o +20% za úroveň

### Místa moci

Přirozená místa koncentrace magie.

| Typ | Síla | Vzácnost | Efekt |
|----|------|----------|-------|
| Pramen | Slabé | Běžný | +10% regenerace |
| Háj | Střední | Neobvyklý | +20% příroda/léčení |
| Kruh | Silné | Vzácný | +30% všechna kouzla |
| Věž | Velmi silné | Velmi vzácný | +50%, bonus k věštění |
| Nexus | Extrémní | Legendární | +100%, permanentní efekty |

---

## Magie na úrovni domény

### Magický atribut domény

| Úroveň | 1-5 | 6-10 | 11-15 | 16-20 |
|--------|-----|------|-------|-------|
| Mágové | 1-2 | 3-5 | 6-10 | 11-20 |
| Akademie | Kruh | Věž | Akademie | Univerzita |
| Rituály | Malé | Střední | Velké | Epické |
| Výzkum | +5%/rok | +10%/rok | +20%/rok | +35%/rok |

### Magické akce domény

| Akce | Cena | Čas | Efekt |
|------|------|-----|-------|
| Založit akademii | 200-10000 | 1-5 let | Výcvik mágů |
| Seslat rituál | Různé | Různé | Efekt rituálu |
| Vytvořit artefakt | 1000+ | 1+ rok | Mocný předmět |
| Ochránit osadu | 100 | 1 měsíc | +20% obrana |
| Prokletí nepřítele | 200 | 1 měsíc | Negativní efekty |
| Magický výzkum | 50/měsíc | Průběžně | Nová kouzla |

---

## Magická politika

### Legálnost magie

| Přístup | Popis | Modifikátory |
|---------|-------|--------------|
| Volná | Žádná omezení | +20% magický rozvoj, +10% nestabilita |
| Regulovaná | Registrace, licence | Normální |
| Omezená | Pouze státem schválení | −20% rozvoj, +20% kontrola |
| Zakázaná | Ilegální | −50% rozvoj, magie v podzemí |

### Zakázané praktiky

| Praktika | Typický trest | Důvod zákazu |
|----------|---------------|--------------|
| Nekromancie | Smrt | Znesvěcení mrtvých |
| Démonologie | Smrt | Nebezpečí pro všechny |
| Temná magie | Vězení/smrt | Škodlivé účinky |
| Ovládání mysli | Vězení | Porušení svobody |
| Kletby | Vězení | Škození nevinným |

---

## Herní akce - přehled

| Akce | Cena | Požadavky | Efekt |
|------|------|-----------|-------|
| Najmout mága | 50-500 | Akademie v dosahu | Mág ve službách |
| Založit akademii | 200+ | Magic > 5 | Výcvik, výzkum |
| Seslat kouzlo | Mana | Mág, kouzlo | Efekt kouzla |
| Provést rituál | Komponenty | Účastníci, místo | Mocný efekt |
| Vytvořit předmět | 100+ | Mág, materiály | Magický předmět |
| Zkoumat kouzlo | 50/měsíc | Akademie | Šance na nové kouzlo |
| Čerpat z ley linie | 0 | Přístup k linii | Bonus k magii |
| Očarovat jednotku | 100 | Mág tier 3+ | Bonus k bojeschopnosti |
