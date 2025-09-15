import { LocalizedItem } from './common'

/**
 * HY is a shortened form of Human per Year. It means raw resource a Human needs per Year.
 */
export enum RawResources {
  GRAIN = 'grain',
  FISH = 'fish',
  PASTURE_PRODUCTS = 'pasture_products',
  GOLD = 'gold',
  SILVER = 'silver',
  IRON = 'iron',
  LEAD = 'lead',
  TIN = 'tin',
  COPPER = 'copper',
  EMERET = 'emeret',
  ADAK = 'adak',
  PALAMANTIN = 'palamantin',
  JEWELSTONES = 'jewelstones',
  ALMAZIT = 'almazit',
  KALAZNAT = 'kazalnat',
  ATERIST = 'aterist',
  DERYL = 'deryl',
  YRIS = 'yris',
  KURYN = 'kuryn',
  ZALTAR = 'zaltar',
  LEPTERYN = 'lepteryn',
  PERITYN = 'perityn',
  URYST = 'uryst',
}

export type LocalizedResource = {
  description: string
} & LocalizedItem

export type Resource = {
  key: string
  cz: LocalizedResource
  en: LocalizedResource
  spawnRate?: number
  kilogramsPerOneGoldenCoin?: number
  goldenCoinsPerOneKilogram?: number
  maxYearAmountInHY?: number
  humansSatisfiedPerYearPerTon?: number
  rawResource: RawResources
  level1Production?: number
  level2Production?: number
  level3Production?: number
  level4Production?: number
}

export const resources: Resource[] = [
  {
    key: 'grain_fields',
    cz: {
      name: 'Obilná pole',
      description:
        'Hlavní zdroj potravy pro lidi. Tento typ zdroje potravy lze vybudovat, ale ne každý typ terénu je k tomu vhodný.',
    },
    en: {
      name: 'Grain fields',
      description:
        'A main source of food for humans. This type of source is possible to build, but not every type of terrain is suitable for it.',
    },
    kilogramsPerOneGoldenCoin: 50_000,
    maxYearAmountInHY: 12_000,
    humansSatisfiedPerYearPerTon: 4,
    rawResource: RawResources.GRAIN,
    level1Production: 100_000,
    level2Production: 300_000,
    level3Production: 1_000_000,
    level4Production: 3_000_000,
  },
  {
    key: 'fishery',
    cz: {
      name: 'Loviště ryb',
      description:
        'Zdroj potravy pro lidi. Tento typ zdroje potravy lze vybudovat, ale ne každé místo je k tomu vhodné.',
    },
    en: {
      name: 'Fishery',
      description:
        'Food source for humans. This type of food source can be built, but not every location is suitable for it.',
    },
    kilogramsPerOneGoldenCoin: 0,
    maxYearAmountInHY: 150,
    humansSatisfiedPerYearPerTon: 1.5,
    rawResource: RawResources.FISH,
    level1Production: 100_000,
  },
  {
    key: 'pastures',
    cz: {
      name: 'Pastviny',
      description:
        'Zdroj potravy pro lidi. Jedná se o mix mléka, mléčných výrobků (asi 3/4 produkce), masa a masných výrobků (asi 1/4 produkce).',
    },
    en: {
      name: 'Pastures',
      description: 'A source of food for humans.',
    },
    kilogramsPerOneGoldenCoin: 0,
    maxYearAmountInHY: 1_000,
    humansSatisfiedPerYearPerTon: 2.5,
    rawResource: RawResources.PASTURE_PRODUCTS,
    level1Production: 40_000,
    level2Production: 130_000,
    level3Production: 400_000,
  },
  {
    key: 'gold',
    cz: {
      name: 'Zlato',
      description:
        'Ušlechtilý kov užívaný ve šperkařství. Užívá se též jako univerzální platidlo a to hlavně pro platby ve vysokých částkách. Počítá se ve zlatých mincích, kde z jednoho kilogramu ryzího zlata lze vyrazit 20 zlatých mincí.',
    },
    en: {
      name: 'Gold',
      description:
        'A precious metal used in jewelry. It is also used as a universal currency, especially for payments in large amounts. It is measured in gold coins, where 20 gold coins can be minted from one kilogram of pure gold.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 20,
    kilogramsPerOneGoldenCoin: 0.05,
    rawResource: RawResources.GOLD,
    level1Production: 50,
    level2Production: 150,
    level3Production: 500,
  },
  {
    key: 'silver',
    cz: {
      name: 'Stříbro',
      description:
        'Ušlechtilý kov užívaný ve šperkařství a vzhledem k jeho dostupnosti pro výrobu standardního oběhového platidla.',
    },
    en: {
      name: 'Silver',
      description:
        'A precious metal used in jewelry and, due to its availability, for the production of standard circulating currency.',
    },
    spawnRate: 2.5,
    kilogramsPerOneGoldenCoin: 5,
    rawResource: RawResources.SILVER,
    level1Production: 2_000,
    level2Production: 6_000,
    level3Production: 20_000,
  },
  {
    key: 'copper',
    cz: {
      name: 'Měď',
      description:
        'Kov užívaný v různých slitinách a k výrobě standardního oběhového platidla.',
    },
    en: {
      name: 'Copper',
      description:
        'A metal used in various alloys and to produce standard circulating currency.',
    },
    spawnRate: 5,
    kilogramsPerOneGoldenCoin: 500,
    rawResource: RawResources.COPPER,
    level1Production: 35_000,
    level2Production: 110_000,
    level3Production: 330_000,
    level4Production: 1_000_000,
  },
  {
    key: 'tin',
    cz: {
      name: 'Cín',
      description: 'Kov užívaný v různých slitinách.',
    },
    en: {
      name: 'Tin',
      description: 'A metal used in various alloys.',
    },
    spawnRate: 4,
    kilogramsPerOneGoldenCoin: 400,
    rawResource: RawResources.TIN,
    level1Production: 35_000,
    level2Production: 110_000,
    level3Production: 330_000,
    level4Production: 1_000_000,
  },
  {
    key: 'lead',
    cz: {
      name: 'Olovo',
      description: 'Kov užívaný k výrobě nástrojů a v instalatérství.',
    },
    en: {
      name: 'Lead',
      description: 'A metal used for making tools and in plumbing.',
    },
    spawnRate: 8.5,
    kilogramsPerOneGoldenCoin: 850,
    rawResource: RawResources.LEAD,
    level1Production: 35_000,
    level2Production: 110_000,
    level3Production: 330_000,
    level4Production: 1_000_000,
  },
  {
    key: 'iron',
    cz: {
      name: 'Železo',
      description: 'Kov užívaný k výrobě zbraní a nástrojů.',
    },
    en: {
      name: 'Iron',
      description: 'Metal used to make weapons and tools.',
    },
    spawnRate: 15,
    kilogramsPerOneGoldenCoin: 1500,
    rawResource: RawResources.IRON,
    level1Production: 35_000,
    level2Production: 110_000,
    level3Production: 330_000,
    level4Production: 1_000_000,
  },
  {
    key: 'emeret',
    cz: {
      name: 'Emeret',
      description:
        'Měkká sopečný kov, který se používá pro výrobu kouzelných předmětů.',
    },
    en: {
      name: 'Emeret',
      description: 'A soft metal used for the production of magic items.',
    },
    spawnRate: 0.5,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.EMERET,
    level1Production: 50,
    level2Production: 150,
    level3Production: 500,
  },
  {
    key: 'adak',
    cz: {
      name: 'Adak',
      description:
        'Tvrdý kov, který se používá pro výrobu zbraní a zbrojí. Odpuzuje magii a dá se najít na dnech sladkovodních jezer - roste totiž jako část skořápky Slávky adakové.',
    },
    en: {
      name: 'Adak',
      description:
        'A hard metal used for the production of weapons and armor. It repels magic and can be found on bottoms of fresh water lakes - it grows as a part of the shell of Adak mussel.',
    },
    spawnRate: 0.5,
    goldenCoinsPerOneKilogram: 10,
    rawResource: RawResources.ADAK,
    level1Production: 200,
    level2Production: 600,
    level3Production: 2000,
  },
  {
    key: 'palamantin',
    cz: {
      name: 'Palamantin',
      description:
        'Kámen, kterému lze pomocí magie jednoduše měnit jeho vlastnosti, jako barva, tuhost v tahu apodobně. Jedná se o velmi žádaný kámen pro stavbu paláců a honosných sídel.',
    },
    en: {
      name: 'Palamantin',
      description:
        'A stone that can be easily changed its properties, such as color, speed in the air, etc. It is a very desired stone for building palaces and honorable buildings.',
    },
    spawnRate: 1,
    kilogramsPerOneGoldenCoin: 50,
    rawResource: RawResources.PALAMANTIN,
    level1Production: 50_000,
    level2Production: 150_000,
    level3Production: 500_000,
  },
  {
    key: 'jewelstones',
    cz: {
      name: 'Drahokamy',
      description:
        'Vzácné kameny užívané ve šperkovnictví. Je možné je jednoduše směnit a používat jako platidlo.',
    },
    en: {
      name: 'Jewelstones',
      description:
        'Precious stones used in jewelry. They can be easily exchanged and used as currency.',
    },
    spawnRate: 0.5,
    goldenCoinsPerOneKilogram: 80,
    rawResource: RawResources.JEWELSTONES,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'almazit',
    cz: {
      name: 'Almazit',
      description:
        'Krystal růžové barvy. Almazit podporuje telekinetické schopnosti to znamená ovládání vzdáleného pohybu neživých předmětů. S Almazitem je možné bezpečně pracovat a nehrozí při tom žádné nebezpečí.',
    },
    en: {
      name: 'Almazit',
      description:
        'Pink crystal. Almazite supports telekinetic abilities, which means controlling the movement of inanimate objects from a distance. Almazite can be worked with safely and without any danger.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.ALMAZIT,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'kazalnat',
    cz: {
      name: 'Kalaznát',
      description:
        'Krystal hnědé barvy, který propůjčuje schopnosti temperatury nebo-li schopnosti změnit teplotu nějakého předmětu či vzduchu nebo vody. Musí se s ním pracovat velmi opatrně, jelikož uštípnutí kousku Kalaznátu způsobuje vlnu náhodné změny teploty. To může být životu nebezpečné. V dolech na Kalaznát je proto poměrně vysoká pravděpodobnost zranění ohněm či chladem.',
    },
    en: {
      name: 'Kazalnat',
      description:
        'A brown crystal that grants the ability to change the temperature of an object, air, or water. It must be handled with great care, as biting off a piece of Calaznath causes a wave of random temperature changes. This can be life-threatening. Therefore, in Calaznath mines, there is a relatively high probability of injury from fire or cold.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.KALAZNAT,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'aterist',
    cz: {
      name: 'Aterist',
      description:
        'Světle modrý krystal propůjčující telepatické schopnosti. Telepatie je schopnost komunikace na dálku. S Ateristem je bezpečné pracovat.',
    },
    en: {
      name: 'Aterist',
      description:
        'A light blue crystal that grants telepathic abilities. Telepathy is the ability to communicate at a distance. It is safe to work with Aterist.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.ATERIST,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'deryl',
    cz: {
      name: 'Deryl',
      description:
        'Jedná se o fialový krystal, který zaručuje psychotronní schopnosti. To znamená schopnost ovlivňovat mysl jiných. Práce s Derylem je nebezpečná. Jakýkoliv pohled na deryl způsobuje bytosti blaho a chce se na něj stále dívat. Deryl přehrává své oběti cokoliv, co ona chce, aby se jí stalo. Ta žije v neustálém snu. Zapomene na všechna trápení, známé, lásky a dokonce i jíst, pít a spát. Během několika dní zemře oběť na vyčerpání a dehydrataci. Oběť Derylu se do něj chce neustále dívat a nechce nechat ostatní aby jí v tom zabránili. Tím může být nebezpečná i pro ostatní.',
    },
    en: {
      name: 'Deryl',
      description:
        "This is a purple crystal that grants psychotronic abilities. This means the ability to influence the minds of others. Working with Deryl is dangerous. Any look at Deryl causes the creature to feel good and wants to look at him all the time. Deryl plays whatever she wants to happen to her on her victim. She lives in a constant dream. She forgets all her troubles, acquaintances, loves and even eating, drinking and sleeping. Within a few days, the victim dies of exhaustion and dehydration. Deryl's victim wants to look at him all the time and does not want to let others stop her from doing so. This can make her dangerous to others.",
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.DERYL,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'yris',
    cz: {
      name: 'Yris',
      description:
        'Yris je žlutý krystal, pomocí jehož je možné ovlivňovat smysly jako čich, zrak, hmat, bolest a další. Této schopnosti se říká Sensitiva. Práce s Yrisem většinou nebývá životu nebezpečná, ale může při neopatrném zacházení způsobovat nepříjemné anomálie jako je ztráta čichu, zvýšení senzitivity na vnější vjemy nebo citlivost na světlo. Po nějaké době tyto účinky většinou odeznívají.',
    },
    en: {
      name: 'Yris',
      description:
        'Yris is a yellow crystal that can be used to influence the senses such as smell, sight, touch, pain, and more. This ability is called Sensitiva. Working with Yris is usually not life-threatening, but if handled carelessly, it can cause unpleasant anomalies such as loss of smell, increased sensitivity to external sensations, or sensitivity to light. After some time, these effects usually subside.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.YRIS,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'kuryn',
    cz: {
      name: 'Kurýn',
      description:
        'Kurýn krystal zelené barvy. Kurýn propůjčuje schopnost fyziomatiky, která má moc nad fyzickými vlastnostmi nebo vzhledem. Práce s Kurýnem je naprosto bezpečná a nezpůsobuje žádné nebezpečné vedlejší účinky.',
    },
    en: {
      name: 'Kuryn',
      description:
        'Kuryn crystal of green color. Kuryn grants the ability of physiognomy, which has power over physical properties or appearance. Working with Kuryn is completely safe and does not cause any dangerous side effects.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.KURYN,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'zaltar',
    cz: {
      name: 'Zaltar',
      description:
        'Zaltar je bílý krystal, díky kterému je možné ovlivňovat světlo. Této schopnosti se říká fotonika. Práce se Zaltarem je bezpečná. Neopatrná manipulace může způsobovat jen světelné záblesky.',
    },
    en: {
      name: 'Zaltar',
      description:
        'Zaltar is a white crystal that allows you to manipulate light. This ability is called photonics. Working with Zaltar is safe. Careless handling can only cause flashes of light.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.ZALTAR,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'lepteryn',
    cz: {
      name: 'Lepterýn',
      description:
        'Lepterýn je velmi nebezpečný tmavě modrý krystal. Jeho schopností je uvěznění duše uvnitř krystalu. Této schopnosti se říká Duchotika. Jakmile se živá bytost dotkne lepterýnu, krystal začne pomalu pohlcovat její duši. Úplné pohlcení může trvat několik kol až několik dní. Záleží na velikosti Lepterýnu a na inteligenci jedince. Jakmile se podaří Lepterýnu pohltit duši, celá bytost je magicky pohlcena - bytost zmizí. Pokud je Lepterýn plný, již nepohlcuje další bytosti. Při pohledu na slunce skrze krystal je možné vidět siluetu uvězněné duše uvnitř. Pokud je Lepterýn zničen, uvězněná duše je vysvobozena a zhmotní se v blízkosti zničeného Lepterýnu.',
    },
    en: {
      name: 'Lepteryn',
      description:
        'Lepteryn is a very dangerous dark blue crystal. Its ability is to trap a soul inside the crystal. This ability is called Duchotika. Once a living being touches the Lepteryn, the crystal begins to slowly absorb its soul. Complete absorption can take several rounds to several days. It depends on the size of the Lepteryn and the intelligence of the individual. Once the Lepteryn manages to absorb a soul, the entire being is magically absorbed - the being disappears. If the Lepteryn is full, it no longer absorbs other beings. When looking at the sun through the crystal, it is possible to see the silhouette of the trapped soul inside. If the Lepteryn is destroyed, the trapped soul is freed and materializes near the destroyed Lepteryn.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.LEPTERYN,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'perityn',
    cz: {
      name: 'Peritýn',
      description:
        'Peritýn je vzácný a mocný černý krystal, který dokáže ovlivňovat časoprostor. Vědě zabývající se touto schopností se říká Teloconomie. Ve špatných rukou dokáže peritýn nadělat paseku. Práce s ním může být taktéž velmi nebezpečná, jelikož může vzniknout časoprostorová anomálie, která buď přemístí své okolí úplně jinam nebo naprosto změní rychlost času. Jednou z nejhorších je zestárnutí, umření a proměnění v prach během několika kol.',
    },
    en: {
      name: 'Perityn',
      description:
        'Perithyne is a rare and powerful black crystal that can manipulate space-time. The science behind this ability is called Teloconomy. In the wrong hands, perithyne can wreak havoc. Working with it can also be very dangerous, as it can create a space-time anomaly that either displaces its surroundings completely or completely changes the speed of time. One of the worst is aging, dying, and turning to dust within a few turns.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.PERITYN,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
  {
    key: 'uryst',
    cz: {
      name: 'Uryst',
      description:
        'Uryst je rudý krystal, který dokáže generovat obrovské množství čisté energie. Vědě, která se zabývá tímto jevem se říká silomatika. Práce s urystem může být nebezpečná jako u ostatních krystalů. V tomto případě je možný náhodný výbuch, který zničí vše kolem.',
    },
    en: {
      name: 'Uryst',
      description:
        'Uryst is a red crystal that can generate huge amounts of pure energy. The science that deals with this phenomenon is called silomatics. Working with uryst can be dangerous, like with other crystals. In this case, an accidental explosion is possible, destroying everything around.',
    },
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    rawResource: RawResources.URYST,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },
]
