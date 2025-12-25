# Roadmap - Mechaniky Terun Domain Engine

Tento dokument sleduje postup při definování herních mechanik.

## Stav dokumentace

### Hotovo
- [x] **TERRAIN.md** - Typy terénu, divočina, cesty, řeky, pobřeží
- [x] **RESOURCES.md** - Zdroje (krystaly, kovy, potraviny)
- [x] **HAMLETS.md** - Osady a populace (velikosti, růst, kontrola, potřeby)
- [x] **ECONOMY.md** - Ekonomický model (produkce, obchod, ceny, trhy)
- [x] **DOMAINS.md** - Domény a jejich atributy (správcovství, diplomacie, obchod, vojsko, špehování, magie, víra)
- [x] **WARFARE.md** - Válka, jednotky, obléhání, bitvy
- [x] **CHARACTERS.md** - Postavy, vlastnosti, schopnosti, dynastie
- [x] **TRADE_ROUTES.md** - Karavany, lodě, obchodní stezky
- [x] **DOMAIN_ACTIONS.md** - Detailní popis všech akcí domén
- [x] **DIPLOMACY.md** - Vztahy mezi doménami, smlouvy, aliance
- [x] **LEGITIMACY.md** - Nároky, tituly, dědictví, casus belli
- [x] **ESPIONAGE.md** - Špionáž, tajemství, intriky
- [x] **MAGIC.md** - Magický systém, krystaly, očarování, akademie
- [x] **EVENTS.md** - Náhodné události, rozhodnutí, příběhy
- [x] **TIME.md** - Časový systém, roční období, tahy
- [x] **SIMULATION.md** - Jak engine počítá jednotlivé kroky simulace
- [x] **GAME_FORMULAS.md** - Kompletní vzorce a konstanty pro implementaci (nový dokument)

### Dokončené fáze

#### Fáze 1: Základy simulace
- [x] ~~**HAMLETS.md**~~ - Dokončeno
- [x] ~~**ECONOMY.md**~~ - Dokončeno
- [x] ~~**TRADE_ROUTES.md**~~ - Dokončeno

#### Fáze 2: Domény a politika
- [x] ~~**DOMAINS.md**~~ - Dokončeno
- [x] ~~**DOMAIN_ACTIONS.md**~~ - Dokončeno
- [x] ~~**DIPLOMACY.md**~~ - Dokončeno
- [x] ~~**LEGITIMACY.md**~~ - Dokončeno

#### Fáze 3: Konflikt
- [x] ~~**WARFARE.md**~~ - Dokončeno
- [x] ~~**ESPIONAGE.md**~~ - Dokončeno

#### Fáze 4: Magie a nadpřirozeno
- [x] ~~**MAGIC.md**~~ - Dokončeno

#### Fáze 5: Postavy a příběh
- [x] ~~**CHARACTERS.md**~~ - Dokončeno
- [x] ~~**EVENTS.md**~~ - Dokončeno

#### Fáze 6: Systémové mechaniky
- [x] ~~**TIME.md**~~ - Dokončeno
- [x] ~~**SIMULATION.md**~~ - Dokončeno

## Poznámky

- Inspirace: Crusader Kings 3
- Engine je stateless - vše počítá počítač
- Podpora češtiny a angličtiny
- Hexová mapa s hexy o průměru 10 km

## Changelog

### 2025-12-25
- Přidáno: HAMLETS.md - kompletní systém osad
- Přidáno: ECONOMY.md - ekonomický model s produkcí, poptávkou a trhy
- Přidáno: DOMAINS.md - typy domén, atributy, akce, vztahy
- Přidáno: WARFARE.md - vojenský systém, jednotky, bitvy, obléhání
- Přidáno: CHARACTERS.md - systém postav, vlastnosti, dynastie
- Rozšířeno: RESOURCES.md - doplněny herní atributy (výtěžnost, riziko, ceny, sezónní modifikátory)
- Rozšířeno: TERRAIN.md - doplněny herní atributy (pohyb, obrana, kolonizace, modifikátory produkce)
- Přidáno: TRADE_ROUTES.md - karavany, říční a námořní lodě, obchodní trasy, mýtné a cla
- Přidáno: DOMAIN_ACTIONS.md - detailní popis všech akcí pro 7 typů atributů domén
- Přidáno: DIPLOMACY.md - vztahy, smlouvy, aliance, diplomatické incidenty
- Přidáno: LEGITIMACY.md - tituly, nároky, dědické právo, casus belli, uzurpace
- Přidáno: ESPIONAGE.md - špionážní sítě, agenti, operace, kontrašpionáž, frakce
- Přidáno: MAGIC.md - magické školy, kouzla, rituály, akademie, magické předměty
- Přidáno: EVENTS.md - systém událostí, rozhodnutí, řetězové události, modifikátory
- Přidáno: TIME.md - kalendář, roční období, sezónní modifikátory, herní tahy
- Přidáno: SIMULATION.md - architektura enginu, simulační cyklus, subsystémy
- Přidáno: GAME_FORMULAS.md - kompletní vzorce, konstanty a příklady výpočtů pro implementaci simulace
