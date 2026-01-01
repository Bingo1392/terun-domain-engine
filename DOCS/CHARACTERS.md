# Postavy

Postavy jsou jednotlivci, kteří vedou domény, slouží jako rádci, velitelé nebo agenti.

## Základní atributy

Každá postava má 7 základních atributů na škále 0-10:

| Atribut      | Popis                        | Vliv na doménu           |
|--------------|------------------------------|--------------------------|
| Správcovství | Organizační schopnosti       | Daně, efektivita, obchod |
| Diplomacie   | Sociální schopnosti          | Vztahy, smlouvy          |
| Vojsko       | Vojenské schopnosti          | Bojová síla, taktika     |
| Špehování    | Tajné operace                | Špionáž, vraždy          |
| Magie        | Výzkum magie a její aplikace | Magické účinky           |
| Víra         | Náboženská oddanost          | Legitimita, víra         |

### Generování atributů

Základní hodnota: 2-5 (průměr)

Modifikátory:
- Vzdělání: +0 až +2
- Vlastnosti: -1 až +1 za vlastnost
- Věk: Zkušenost vs. úpadek
- Rasa
- Povolání

### Věkové kategorie

| Věk   | Kategorie | Efekt                              |
|-------|-----------|------------------------------------|
| 0-5   | Nemluvně  | Nemůže vládnout                    |
| 6-15  | Dítě      | Regentství, vzdělávání             |
| 16-20 | Mladík    | -1 všechny atributy                |
| 21-40 | Dospělý   | Plná síla                          |
| 41-60 | Zralý     | +1 Správcovství, +1 Magie, +1 Víra |
| 61-70 | Starý     | -1 Vojsko                          |
| 71+   | Kmet      | -2 Vojsko                          |

## Vlastnosti (Traits)

Vlastnosti definují charakter postavy a ovlivňují její schopnosti.

### Vzdělávací vlastnosti

K získání vlastností ze vzdělání je nutné nákladné vzdělání od osobního učitele či na univerzitě.

| Vzdělání            | Efekt na atribut |
|---------------------|------------------|
| Správa majetku      | Správcovství     |
| Diplomatické vztahy | Diplomacie       |
| Vojenská taktika    | Vojsko           | 
| Kontrarozvětka      | Špehování        |
| Mágická umění       | Magie            |
| Teologie            | Víra             |

Úroveň vzdělání

| Úroveň                   | Velikost bonusu |
|--------------------------|-----------------|
| Osobní učitel            | +1              |
| Vzdělání na univerzitě   | +2              | 
| Světoznámý osobní učitel | +3              |

### Atributy postavy (platí pro aplikaci pravidel Svitky Hrdinů)

Každý z atributů postavy ovlivňuje základní atributy dle výše atributu. Atributy postavy se pohybují na škále 1-10 (stejně jako základní atributy).

| Atribut postavy | Bonus/Postih k základním atributům |
|-----------------|------------------------------------|
| 1-3             | -1                                 |
| 4               | 0                                  |
| 5               | +1                                 |
| 6               | +2                                 |
| 7-10            | +3                                 |

| Vlastnost  | Ovlivňuje základní atributy           |
|------------|---------------------------------------|
| Nezdolnost | Vojsko                                |
| Hbitost    | Vojsko, Špehování                     |
| Srdnatost  | Správcovství, Diplomacie, Magie, Víra |
| Důvtip     | Správcovství, Magie, Víra             |
| Lstivost   | Špehování, Diplomacie                 |

### Osobnostní vlastnosti

Každý dostane 1-6 osobnostních vlastností. Je 50 % šance, že se bude jednat o protějšek osobnostní vlastnosti. Pokud se bude jednat o protějšek, je Efekt obrácený (Například Pracovitý dává +2 Správcovství a Líný dává -2 Správcovství).

| Vlastnost          | Efekt                                        | Protějšek    |
|--------------------|----------------------------------------------|--------------|
| Kompetentní        | +1 ke všem atributům                         | Budižkničemu |
| Pracovitý          | +2 Správcovství                              | Líný         |
| Hezký              | +2 Diplomacie                                | Ošklivý      |
| Statečný           | +2 Vojsko                                    | Zbabělý      |
| Mazaný             | +2 Špehování                                 | Naivní       |
| Mystik             | +2 Magie                                     | Magofob      |
| Zbožný             | +2 Víra                                      | Kacíř        |
| Štědrý             | +1 Diplomacie, -1 Správcovství               | Lakomý       |
| Pacifista          | +1 Diplomacie, -1 Vojsko                     | Horkokrevný  |
| Opatrný            | +1 Špehování, -1 Vojsko                      | Zbrklý       |
| Ateista            | +1 Magie, -1 Víra                            | Inkvizitor   |
| Čestný             | +1 Diplomacie, -1 Špehování, +10 k loajalitě | Úskočný      |
| Tvrdohlavý         | +1 Vojsko, -1 Magie                          | Otevřený     |
| Spravedlivý        | +1 Víra, -1 Špehování                        | Tyranský     |
| Pořádný            | +1 Správcovství, -1 Špehování                | Chaotický    |
| Pragmatický        | +1 Správcovství, -1 Víra                     | Idealistický |

## Vztahy mezi postavami

Vztahy se definují škálou od nejhoršího vztahu -100 po nejlepší 100.

### Rodinné vztahy

| Vztah           | Modifikátor názoru |
|-----------------|--------------------|
| Rodič           | +20                |
| Dítě            | +25                |
| Sourozenec      | +15                |
| Manžel/ka       | +30                |
| Vzdálená rodina | +5                 |

### Osobní vztahy

| Vztah    | Modifikátor | Efekt                     |
|----------|-------------|---------------------------|
| Přítel   | +30         | Loajalita, podpora        |
| Rival    | -30         | Sabotáž, intriky          |
| Milenec  | +40         | Skandál, nelegitimní děti |
| Nepřítel | -70         | Vražedné úmysly           |
| Mentor   | +20         | Vzdělávací bonus          |

### Faktory názoru

| Faktor             | Modifikátor |
|--------------------|-------------|
| Stejná víra        | +10         |
| Jiná víra          | -10         |
| Nepřátelská víra   | -30         |
| Stejná kultura     | +5          |
| Malý dar           | +5          |
| Střední dar        | +15         |
| Velký dar          | +30         |
| Urážka             | -10         |
| Zrada              | -50         |
| Pomsta (provedená) | +20         |

## Role postav

### Vládce

Hlava domény. Atributy vládce přímo ovlivňují atributy domény. Atribut domény je součtem atributů vládce a jeho rádců.

### Rádci

Až 6 pozic rádců, každý poskytuje bonus podle svého atributu:

| Pozice    | Klíčový atribut |
|-----------|-----------------|
| Pokladník | Správcovství    |
| Diplomat  | Diplomacie      |
| Maršál    | Vojsko          |
| Šepmistr  | Špehování       |
| Mág       | Magie           |
| Kaplan    | Víra            |

Atributy rádců přímo ovlivňují atributy domény. Jedná se o druhou složku v celkovém součtu atributů domény.

## Události postav

### Životní události

| Událost             | Trigger           | Efekt         |
|---------------------|-------------------|---------------|
| Narození            | Těhotenství       | Nová postava  |
| Dosažení dospělosti | Věk 16            | Plná práva    |
| Sňatek              | Nabídka/souhlas   | Aliance, děti |
| Smrt                | Věk, nemoc, bitva | Nástupnictví  |

### Náhodné události

| Událost   | Pravděpodobnost   | Efekt                                |
|-----------|-------------------|--------------------------------------|
| Nemoc     | Různá             | Postih -1 ke všem atributům          |
| Zranění   | Bitva, turnaj     | Trvalý postih -2 Vojsko              |
| Osvícení  | Nízká             | Trvalý bonus +1 k náhodnému atributu |
| Skandál   | Střední           | Postih -5 ke všem vstahům            |

## Loajalita

| Úroveň            | Chování         |
|-------------------|-----------------|
| Fanatická (90+)   | Zemře za vládce |
| Vysoká (70-89)    | Spolehlivá      |
| Normální (40-69)  | Běžná služba    |
| Nízká (20-39)     | Nespokojenost   |
| Nebezpečná (0-19) | Možná zrada     |

**Faktory loajality:**
- Plat: +10 až -20
- Vztah s vládcem: +/- názor
- Vlastnosti (Čestný/Úskočný): +10/-10

> TODO: Doplnit Platy k jednotlivým pozicím v rámci domény.
