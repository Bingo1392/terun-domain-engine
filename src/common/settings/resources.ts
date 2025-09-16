import { LocalizedItem } from './common'

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

export enum ResourceCategory {
  FOOD = 'food',
  BASIC_METALS = 'basic_metals',
  PRECIOUS_METALS = 'precious_metals',
  MAGICAL_METALS = 'magical_metals',
  BUILDING_MATERIALS = 'building_materials',
  MAGICAL_CRYSTALS = 'magical_crystals',
  LUXURY = 'luxury',
}

export enum DemandType {
  ESSENTIAL = 'essential', // základní potřeby (jídlo)
  INDUSTRIAL = 'industrial', // výroba, crafting
  LUXURY = 'luxury', // šperkařství, prestiž
  MAGICAL = 'magical', // magie, enchanting
  MILITARY = 'military', // zbraně, zbroje
}

export enum MarketVolatility {
  STABLE = 'stable', // ±5%
  MODERATE = 'moderate', // ±15%
  HIGH = 'high', // ±30%
  EXTREME = 'extreme', // ±50%+
}

export type LocalizedResource = {
  description: string
} & LocalizedItem

export type DemandProfile = {
  type: DemandType
  baseIntensity: number // 0.1-10.0, základní síla poptávky
  populationElasticity: number // jak moc roste poptávka s populací
  wealthElasticity: number // jak moc roste poptávka s bohatstvím
  seasonalModifier?: {
    // sezónní změny poptávky
    spring: number
    summer: number
    autumn: number
    winter: number
  }
}

export type ProductionConstraints = {
  minWorkers: number // minimální počet pracovníků
  maxWorkers: number // maximální počet pracovníků
  workerEfficiency: number // produkce na pracovníka
  terrainRequirements?: string[] // požadavky na terén
  climateRequirements?: string[] // požadavky na klima
  riskFactor: number // 0-1, riziko nehod/úmrtí při těžbě
  maintenanceCost: number // náklady na údržbu za rok (v golden coins)
}

export type MarketDynamics = {
  volatility: MarketVolatility
  basePrice: number // základní cena za kg
  priceFloor: number // minimální cena (náklady + min. zisk)
  priceCeiling?: number // maximální cena (pro regulované zboží)
  tradable: boolean // lze obchodovat mezi regiony?
  storable: boolean // lze skladovat? (ovlivňuje volatilitu)
  substitutes?: RawResources[] // substituty (snižují cenu)
  complements?: RawResources[] // komplementy (zvyšují poptávku)
}

export type Resource = {
  key: string
  cz: LocalizedResource
  en: LocalizedResource

  // Základní vlastnosti
  rawResource: RawResources
  category: ResourceCategory

  // Produkce
  production: ProductionConstraints

  // Ekonomika
  demand: DemandProfile
  market: MarketDynamics

  // Legacy parametry pro zpětnou kompatibilitu
  spawnRate?: number
  kilogramsPerOneGoldenCoin?: number
  goldenCoinsPerOneKilogram?: number
  maxYearAmountInHY?: number
  humansSatisfiedPerYearPerTon?: number
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
    rawResource: RawResources.GRAIN,
    category: ResourceCategory.FOOD,

    production: {
      minWorkers: 50,
      maxWorkers: 1000,
      workerEfficiency: 3000, // kg na pracovníka za rok
      terrainRequirements: ['plains', 'river_valley'],
      climateRequirements: ['temperate', 'continental'],
      riskFactor: 0.01, // velmi bezpečné
      maintenanceCost: 100,
    },

    demand: {
      type: DemandType.ESSENTIAL,
      baseIntensity: 8.0,
      populationElasticity: 1.0, // roste lineárně s populací
      wealthElasticity: 0.2, // bohatší lidé nejedí víc obilí
      seasonalModifier: {
        spring: 0.9,
        summer: 0.8,
        autumn: 1.2, // sklizeň
        winter: 1.1,
      },
    },

    market: {
      volatility: MarketVolatility.MODERATE,
      basePrice: 0.1, // 10kg za 1 zlatou - realističtější
      priceFloor: 0.05,
      priceCeiling: 0.2, // regulovaná potravina
      tradable: true,
      storable: true,
      substitutes: [RawResources.FISH, RawResources.PASTURE_PRODUCTS],
    },

    // Legacy
    kilogramsPerOneGoldenCoin: 50_000,
    maxYearAmountInHY: 12_000,
    humansSatisfiedPerYearPerTon: 4,
    level1Production: 100_000,
    level2Production: 300_000,
    level3Production: 1_000_000,
    level4Production: 3_000_000,
  },

  {
    key: 'gold',
    cz: {
      name: 'Zlato',
      description:
        'Ušlechtilý kov užívaný ve šperkařství. Užívá se též jako univerzální platidlo a to hlavně pro platby ve vysokých částkách.',
    },
    en: {
      name: 'Gold',
      description:
        'A precious metal used in jewelry. It is also used as a universal currency, especially for payments in large amounts.',
    },
    rawResource: RawResources.GOLD,
    category: ResourceCategory.PRECIOUS_METALS,

    production: {
      minWorkers: 10,
      maxWorkers: 200,
      workerEfficiency: 0.5, // kg na pracovníka za rok
      terrainRequirements: ['mountains', 'hills'],
      riskFactor: 0.15, // nebezpečné důlní práce
      maintenanceCost: 500,
    },

    demand: {
      type: DemandType.LUXURY,
      baseIntensity: 3.0,
      populationElasticity: 0.3,
      wealthElasticity: 2.0, // bohatší dramaticky zvyšují poptávku
    },

    market: {
      volatility: MarketVolatility.STABLE, // zlatý standard
      basePrice: 20,
      priceFloor: 18,
      tradable: true,
      storable: true,
      complements: [RawResources.JEWELSTONES],
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 20,
    kilogramsPerOneGoldenCoin: 0.05,
    level1Production: 50,
    level2Production: 150,
    level3Production: 500,
  },

  {
    key: 'deryl',
    cz: {
      name: 'Deryl',
      description:
        'Jedná se o fialový krystal, který zaručuje psychotronní schopnosti. Práce s Derylem je nebezpečná.',
    },
    en: {
      name: 'Deryl',
      description:
        'This is a purple crystal that grants psychotronic abilities. Working with Deryl is dangerous.',
    },
    rawResource: RawResources.DERYL,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 5,
      maxWorkers: 20, // malé týmy kvůli nebezpečí
      workerEfficiency: 2, // kg na pracovníka za rok
      riskFactor: 0.8, // extrémně nebezpečné!
      maintenanceCost: 2000, // vysoké náklady na bezpečnost
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 0.5, // velmi niche trh
      populationElasticity: 0.1,
      wealthElasticity: 1.5,
    },

    market: {
      volatility: MarketVolatility.EXTREME,
      basePrice: 60, // vyšší než ostatní krystaly kvůli riziku
      priceFloor: 40,
      tradable: false, // pravděpodobně zakázané/regulované
      storable: false, // nebezpečné skladovat
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },

  {
    key: 'uryst',
    cz: {
      name: 'Uryst',
      description:
        'Uryst je rudý krystal, který dokáže generovat obrovské množství čisté energie.',
    },
    en: {
      name: 'Uryst',
      description:
        'Uryst is a red crystal that can generate huge amounts of pure energy.',
    },
    rawResource: RawResources.URYST,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 10,
      maxWorkers: 50,
      workerEfficiency: 1.5,
      riskFactor: 0.4, // riziko výbuchu
      maintenanceCost: 1500,
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 2.0, // vysoká poptávka za energii
      populationElasticity: 0.5,
      wealthElasticity: 1.8,
    },

    market: {
      volatility: MarketVolatility.HIGH,
      basePrice: 80, // nejvyšší cena mezi krystaly
      priceFloor: 50,
      tradable: true,
      storable: false, // nestabilní
      complements: [RawResources.EMERET], // pro magické předměty
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
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
    rawResource: RawResources.FISH,
    category: ResourceCategory.FOOD,

    production: {
      minWorkers: 20,
      maxWorkers: 300,
      workerEfficiency: 500, // kg na pracovníka za rok
      terrainRequirements: ['coast', 'lake', 'river'],
      riskFactor: 0.05, // riziko utopení
      maintenanceCost: 200,
    },

    demand: {
      type: DemandType.ESSENTIAL,
      baseIntensity: 4.0,
      populationElasticity: 1.0,
      wealthElasticity: 0.5, // bohatší preferují ryby
      seasonalModifier: {
        spring: 1.2, // jarní rybolov
        summer: 1.3,
        autumn: 0.9,
        winter: 0.6, // zmrzlé vodní plochy
      },
    },

    market: {
      volatility: MarketVolatility.HIGH, // závislé na počasí
      basePrice: 0.15, // 6-7kg za 1 zlatou
      priceFloor: 0.08,
      priceCeiling: 0.3,
      tradable: true,
      storable: false, // rychle se kazí
      substitutes: [RawResources.GRAIN, RawResources.PASTURE_PRODUCTS],
    },

    // Legacy
    kilogramsPerOneGoldenCoin: 0,
    maxYearAmountInHY: 150,
    humansSatisfiedPerYearPerTon: 1.5,
    level1Production: 100_000,
  },

  {
    key: 'pastures',
    cz: {
      name: 'Pastviny',
      description:
        'Zdroj potravy pro lidi. Jedná se o mix mléka, mléčných výrobků a masa.',
    },
    en: {
      name: 'Pastures',
      description: 'A source of food for humans.',
    },
    rawResource: RawResources.PASTURE_PRODUCTS,
    category: ResourceCategory.FOOD,

    production: {
      minWorkers: 30,
      maxWorkers: 500,
      workerEfficiency: 200, // kg na pracovníka za rok
      terrainRequirements: ['grassland', 'hills'],
      climateRequirements: ['temperate', 'continental'],
      riskFactor: 0.02,
      maintenanceCost: 300,
    },

    demand: {
      type: DemandType.ESSENTIAL,
      baseIntensity: 5.0,
      populationElasticity: 1.0,
      wealthElasticity: 1.2, // luxusnější potravina
      seasonalModifier: {
        spring: 1.1, // mláďata
        summer: 1.2,
        autumn: 0.9,
        winter: 0.8,
      },
    },

    market: {
      volatility: MarketVolatility.MODERATE,
      basePrice: 0.12, // 8kg za 1 zlatou
      priceFloor: 0.08,
      priceCeiling: 0.25,
      tradable: true,
      storable: false, // mléko a maso se kazí
      substitutes: [RawResources.GRAIN, RawResources.FISH],
    },

    // Legacy
    kilogramsPerOneGoldenCoin: 0,
    maxYearAmountInHY: 1_000,
    humansSatisfiedPerYearPerTon: 2.5,
    level1Production: 40_000,
    level2Production: 130_000,
    level3Production: 400_000,
  },

  {
    key: 'silver',
    cz: {
      name: 'Stříbro',
      description:
        'Ušlechtilý kov užívaný ve šperkařství a pro výrobu standardního oběhového platidla.',
    },
    en: {
      name: 'Silver',
      description:
        'A precious metal used in jewelry and for the production of standard circulating currency.',
    },
    rawResource: RawResources.SILVER,
    category: ResourceCategory.PRECIOUS_METALS,

    production: {
      minWorkers: 15,
      maxWorkers: 300,
      workerEfficiency: 10, // kg na pracovníka za rok
      terrainRequirements: ['mountains', 'hills'],
      riskFactor: 0.12,
      maintenanceCost: 300,
    },

    demand: {
      type: DemandType.LUXURY,
      baseIntensity: 4.0,
      populationElasticity: 0.8,
      wealthElasticity: 1.5,
    },

    market: {
      volatility: MarketVolatility.MODERATE,
      basePrice: 0.67, // 1.5kg za 1 zlatou (poměr 13:1)
      priceFloor: 0.5,
      tradable: true,
      storable: true,
      complements: [RawResources.GOLD, RawResources.JEWELSTONES],
    },

    // Legacy
    spawnRate: 2.5,
    kilogramsPerOneGoldenCoin: 5,
    level1Production: 2_000,
    level2Production: 6_000,
    level3Production: 20_000,
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
    rawResource: RawResources.IRON,
    category: ResourceCategory.BASIC_METALS,

    production: {
      minWorkers: 20,
      maxWorkers: 500,
      workerEfficiency: 100, // kg na pracovníka za rok
      terrainRequirements: ['mountains', 'hills'],
      riskFactor: 0.1,
      maintenanceCost: 400,
    },

    demand: {
      type: DemandType.INDUSTRIAL,
      baseIntensity: 6.0,
      populationElasticity: 1.2, // více lidí = více nástrojů
      wealthElasticity: 0.8,
    },

    market: {
      volatility: MarketVolatility.MODERATE,
      basePrice: 0.003, // 330kg za 1 zlatou (realističtější)
      priceFloor: 0.002,
      tradable: true,
      storable: true,
      complements: [RawResources.TIN, RawResources.COPPER], // pro slitiny
    },

    // Legacy
    spawnRate: 15,
    kilogramsPerOneGoldenCoin: 1500,
    level1Production: 35_000,
    level2Production: 110_000,
    level3Production: 330_000,
    level4Production: 1_000_000,
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
    rawResource: RawResources.COPPER,
    category: ResourceCategory.BASIC_METALS,

    production: {
      minWorkers: 25,
      maxWorkers: 600,
      workerEfficiency: 80,
      terrainRequirements: ['mountains', 'hills'],
      riskFactor: 0.08,
      maintenanceCost: 350,
    },

    demand: {
      type: DemandType.INDUSTRIAL,
      baseIntensity: 5.5,
      populationElasticity: 1.0,
      wealthElasticity: 0.6,
    },

    market: {
      volatility: MarketVolatility.MODERATE,
      basePrice: 0.002, // 500kg za 1 zlatou
      priceFloor: 0.0015,
      tradable: true,
      storable: true,
      complements: [RawResources.TIN, RawResources.IRON],
    },

    // Legacy
    spawnRate: 5,
    kilogramsPerOneGoldenCoin: 500,
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
    rawResource: RawResources.TIN,
    category: ResourceCategory.BASIC_METALS,

    production: {
      minWorkers: 20,
      maxWorkers: 400,
      workerEfficiency: 90,
      terrainRequirements: ['mountains', 'hills'],
      riskFactor: 0.09,
      maintenanceCost: 320,
    },

    demand: {
      type: DemandType.INDUSTRIAL,
      baseIntensity: 3.5,
      populationElasticity: 0.8,
      wealthElasticity: 0.5,
    },

    market: {
      volatility: MarketVolatility.MODERATE,
      basePrice: 0.0025, // 400kg za 1 zlatou
      priceFloor: 0.002,
      tradable: true,
      storable: true,
      complements: [RawResources.COPPER, RawResources.IRON],
    },

    // Legacy
    spawnRate: 4,
    kilogramsPerOneGoldenCoin: 400,
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
    rawResource: RawResources.LEAD,
    category: ResourceCategory.BASIC_METALS,

    production: {
      minWorkers: 15,
      maxWorkers: 350,
      workerEfficiency: 120,
      terrainRequirements: ['mountains', 'hills'],
      riskFactor: 0.15, // toxické
      maintenanceCost: 280,
    },

    demand: {
      type: DemandType.INDUSTRIAL,
      baseIntensity: 2.5,
      populationElasticity: 0.7,
      wealthElasticity: 0.3,
    },

    market: {
      volatility: MarketVolatility.STABLE,
      basePrice: 0.0012, // 850kg za 1 zlatou
      priceFloor: 0.001,
      tradable: true,
      storable: true,
    },

    // Legacy
    spawnRate: 8.5,
    kilogramsPerOneGoldenCoin: 850,
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
    rawResource: RawResources.EMERET,
    category: ResourceCategory.MAGICAL_METALS,

    production: {
      minWorkers: 10,
      maxWorkers: 100,
      workerEfficiency: 8,
      terrainRequirements: ['volcanic', 'mountains'],
      riskFactor: 0.2, // sopečné oblasti
      maintenanceCost: 800,
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 2.0,
      populationElasticity: 0.3,
      wealthElasticity: 2.5, // luxusní magické předměty
    },

    market: {
      volatility: MarketVolatility.HIGH,
      basePrice: 40,
      priceFloor: 30,
      tradable: true,
      storable: true,
      complements: [RawResources.URYST], // společně pro magie
    },

    // Legacy
    spawnRate: 0.5,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 50,
    level2Production: 150,
    level3Production: 500,
  },

  {
    key: 'adak',
    cz: {
      name: 'Adak',
      description:
        'Tvrdý kov, který se používá pro výrobu zbraní a zbrojí. Odpuzuje magii.',
    },
    en: {
      name: 'Adak',
      description:
        'A hard metal used for the production of weapons and armor. It repels magic.',
    },
    rawResource: RawResources.ADAK,
    category: ResourceCategory.MAGICAL_METALS,

    production: {
      minWorkers: 25,
      maxWorkers: 200,
      workerEfficiency: 12,
      terrainRequirements: ['lake_freshwater'],
      riskFactor: 0.08, // potápění
      maintenanceCost: 600,
    },

    demand: {
      type: DemandType.MILITARY,
      baseIntensity: 3.0,
      populationElasticity: 0.5,
      wealthElasticity: 1.8, // vojenské zakázky
    },

    market: {
      volatility: MarketVolatility.HIGH,
      basePrice: 10,
      priceFloor: 8,
      tradable: true,
      storable: true,
    },

    // Legacy
    spawnRate: 0.5,
    goldenCoinsPerOneKilogram: 10,
    level1Production: 200,
    level2Production: 600,
    level3Production: 2000,
  },

  {
    key: 'palamantin',
    cz: {
      name: 'Palamantin',
      description:
        'Kámen, kterému lze pomocí magie jednoduše měnit jeho vlastnosti. Velmi žádaný pro stavbu paláců.',
    },
    en: {
      name: 'Palamantin',
      description:
        'A stone that can be easily changed its properties using magic. Very desired for building palaces.',
    },
    rawResource: RawResources.PALAMANTIN,
    category: ResourceCategory.BUILDING_MATERIALS,

    production: {
      minWorkers: 30,
      maxWorkers: 400,
      workerEfficiency: 200,
      terrainRequirements: ['mountains', 'hills'],
      riskFactor: 0.06,
      maintenanceCost: 500,
    },

    demand: {
      type: DemandType.LUXURY,
      baseIntensity: 1.5,
      populationElasticity: 0.2,
      wealthElasticity: 3.0, // jen pro velmi bohaté
    },

    market: {
      volatility: MarketVolatility.HIGH,
      basePrice: 0.02, // 50kg za 1 zlatou
      priceFloor: 0.015,
      tradable: true,
      storable: true,
    },

    // Legacy
    spawnRate: 1,
    kilogramsPerOneGoldenCoin: 50,
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
    rawResource: RawResources.JEWELSTONES,
    category: ResourceCategory.LUXURY,

    production: {
      minWorkers: 5,
      maxWorkers: 80,
      workerEfficiency: 2,
      terrainRequirements: ['mountains', 'volcanic'],
      riskFactor: 0.1,
      maintenanceCost: 1000,
    },

    demand: {
      type: DemandType.LUXURY,
      baseIntensity: 2.5,
      populationElasticity: 0.4,
      wealthElasticity: 2.8,
    },

    market: {
      volatility: MarketVolatility.EXTREME,
      basePrice: 80,
      priceFloor: 50,
      tradable: true,
      storable: true,
      complements: [RawResources.GOLD, RawResources.SILVER],
    },

    // Legacy
    spawnRate: 0.5,
    goldenCoinsPerOneKilogram: 80,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },

  // Bezpečné magické krystaly
  {
    key: 'almazit',
    cz: {
      name: 'Almazit',
      description:
        'Krystal růžové barvy. Almazit podporuje telekinetické schopnosti. Bezpečné.',
    },
    en: {
      name: 'Almazit',
      description:
        'Pink crystal. Almazite supports telekinetic abilities. Safe to work with.',
    },
    rawResource: RawResources.ALMAZIT,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 8,
      maxWorkers: 60,
      workerEfficiency: 3,
      terrainRequirements: ['mountains', 'cave'],
      riskFactor: 0.05, // bezpečné
      maintenanceCost: 600,
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 1.5,
      populationElasticity: 0.2,
      wealthElasticity: 1.5,
    },

    market: {
      volatility: MarketVolatility.MODERATE,
      basePrice: 25, // prémiová cena pro bezpečné krystaly
      priceFloor: 20,
      tradable: true,
      storable: true,
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },

  {
    key: 'aterist',
    cz: {
      name: 'Aterist',
      description:
        'Světle modrý krystal propůjčující telepatické schopnosti. Bezpečné.',
    },
    en: {
      name: 'Aterist',
      description:
        'A light blue crystal that grants telepathic abilities. Safe to work with.',
    },
    rawResource: RawResources.ATERIST,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 8,
      maxWorkers: 60,
      workerEfficiency: 3,
      terrainRequirements: ['mountains', 'cave'],
      riskFactor: 0.05,
      maintenanceCost: 600,
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 1.8, // komunikace je cenná
      populationElasticity: 0.3,
      wealthElasticity: 1.4,
    },

    market: {
      volatility: MarketVolatility.MODERATE,
      basePrice: 35, // komunikace je cenná
      priceFloor: 25,
      tradable: true,
      storable: true,
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },

  {
    key: 'kuryn',
    cz: {
      name: 'Kurýn',
      description:
        'Kurýn krystal zelené barvy. Propůjčuje schopnost fyziomatiky. Naprosto bezpečná.',
    },
    en: {
      name: 'Kuryn',
      description:
        'Kuryn crystal of green color. Grants physiognomy abilities. Completely safe.',
    },
    rawResource: RawResources.KURYN,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 8,
      maxWorkers: 60,
      workerEfficiency: 3,
      terrainRequirements: ['mountains', 'cave'],
      riskFactor: 0.02, // nejbezpečnější
      maintenanceCost: 500,
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 1.2,
      populationElasticity: 0.25,
      wealthElasticity: 1.3,
    },

    market: {
      volatility: MarketVolatility.STABLE,
      basePrice: 22, // nejbezpečnější = nejlevnější
      priceFloor: 18,
      tradable: true,
      storable: true,
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },

  {
    key: 'zaltar',
    cz: {
      name: 'Zaltar',
      description: 'Zaltar je bílý krystal ovlivňující světlo. Bezpečná práce.',
    },
    en: {
      name: 'Zaltar',
      description:
        'Zaltar is a white crystal that allows you to manipulate light. Safe to work with.',
    },
    rawResource: RawResources.ZALTAR,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 8,
      maxWorkers: 60,
      workerEfficiency: 3,
      terrainRequirements: ['mountains', 'cave'],
      riskFactor: 0.03, // pouze světelné záblesky
      maintenanceCost: 550,
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 1.4,
      populationElasticity: 0.3,
      wealthElasticity: 1.2,
    },

    market: {
      volatility: MarketVolatility.STABLE,
      basePrice: 28, // světelné efekty
      priceFloor: 22,
      tradable: true,
      storable: true,
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },

  // Nebezpečné krystaly
  {
    key: 'kazalnat',
    cz: {
      name: 'Kalaznát',
      description:
        'Hnědý krystal ovlivňující teplotu. Nebezpečný - způsobuje náhodné změny teploty.',
    },
    en: {
      name: 'Kazalnat',
      description:
        'Brown crystal affecting temperature. Dangerous - causes random temperature changes.',
    },
    rawResource: RawResources.KALAZNAT,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 5,
      maxWorkers: 30,
      workerEfficiency: 2,
      terrainRequirements: ['mountains', 'cave'],
      riskFactor: 0.3, // nebezpečí popálenin/omrzlin
      maintenanceCost: 1200,
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 0.8,
      populationElasticity: 0.1,
      wealthElasticity: 1.8,
    },

    market: {
      volatility: MarketVolatility.HIGH,
      basePrice: 55, // vyšší cena kvůli riziku
      priceFloor: 40,
      tradable: true,
      storable: false, // nestabilní
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },

  {
    key: 'yris',
    cz: {
      name: 'Yris',
      description:
        'Žlutý krystal ovlivňující smysly. Může způsobit nepříjemné anomálie.',
    },
    en: {
      name: 'Yris',
      description:
        'Yellow crystal affecting senses. Can cause unpleasant anomalies.',
    },
    rawResource: RawResources.YRIS,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 6,
      maxWorkers: 40,
      workerEfficiency: 2.5,
      terrainRequirements: ['mountains', 'cave'],
      riskFactor: 0.15, // ztráta smyslů
      maintenanceCost: 900,
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 1.0,
      populationElasticity: 0.15,
      wealthElasticity: 1.6,
    },

    market: {
      volatility: MarketVolatility.MODERATE,
      basePrice: 45,
      priceFloor: 35,
      tradable: true,
      storable: true,
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },

  {
    key: 'lepteryn',
    cz: {
      name: 'Lepterýn',
      description:
        'Velmi nebezpečný tmavě modrý krystal. Uvězňuje duše bytostí.',
    },
    en: {
      name: 'Lepteryn',
      description: 'Very dangerous dark blue crystal. Traps souls of beings.',
    },
    rawResource: RawResources.LEPTERYN,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 3,
      maxWorkers: 10, // extrémně malé týmy
      workerEfficiency: 1.5,
      terrainRequirements: ['mountains', 'cave'],
      riskFactor: 0.9, // téměř jistá smrt
      maintenanceCost: 5000, // extrémní bezpečnostní opatření
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 0.1, // téměř nulová legální poptávka
      populationElasticity: 0.05,
      wealthElasticity: 0.5,
    },

    market: {
      volatility: MarketVolatility.EXTREME,
      basePrice: 150, // nejvyšší cena
      priceFloor: 100,
      tradable: false, // pravděpodobně zakázané
      storable: false, // extrémně nebezpečné
    },

    // Legacy
    spawnRate: 1,
    goldenCoinsPerOneKilogram: 40,
    level1Production: 25,
    level2Production: 80,
    level3Production: 250,
  },

  {
    key: 'perityn',
    cz: {
      name: 'Peritýn',
      description:
        'Vzácný černý krystal ovlivňující časoprostor. Může způsobit katastrofické anomálie.',
    },
    en: {
      name: 'Perityn',
      description:
        'Rare black crystal manipulating space-time. Can cause catastrophic anomalies.',
    },
    rawResource: RawResources.PERITYN,
    category: ResourceCategory.MAGICAL_CRYSTALS,

    production: {
      minWorkers: 4,
      maxWorkers: 15,
      workerEfficiency: 1.2,
      terrainRequirements: ['mountains', 'cave', 'void_touched'],
      climateRequirements: ['arctic', 'underground'],
      riskFactor: 0.95, // extrémně nebezpečné - časoprostorové anomálie
      maintenanceCost: 5000, // nejvyšší náklady kvůli ochranným opatřením
    },

    demand: {
      type: DemandType.MAGICAL,
      baseIntensity: 0.2, // velmi specifická poptávka
      populationElasticity: 0.05,
      wealthElasticity: 3.0, // pouze ti nejbohatší si mohou dovolit experimentovat
    },

    market: {
      volatility: MarketVolatility.EXTREME,
      basePrice: 120, // nejvyšší cena ze všech krystalů
      priceFloor: 80,
      tradable: false, // pravděpodobně zakázané k obchodování
      storable: false, // extrémně nestabilní - časoprostorové anomálie
      complements: [RawResources.URYST, RawResources.DERYL], // pro komplexní časoprostorovou magii
    },

    // Legacy
    spawnRate: 0.5, // nejrůznější spawn rate
    goldenCoinsPerOneKilogram: 120,
    kilogramsPerOneGoldenCoin: 0.0083,
    level1Production: 8,
    level2Production: 20,
    level3Production: 48,
  },
]

// Utility funkce pro výpočet ceny na základě nabídky a poptávky
export class EconomicEngine {
  static calculatePrice(
    resource: Resource,
    supply: number,
    population: number,
    averageWealth: number,
    season: 'spring' | 'summer' | 'autumn' | 'winter' = 'summer',
  ): number {
    const { demand, market } = resource

    // Základní poptávka
    let totalDemand = demand.baseIntensity
    totalDemand *= Math.pow(population / 10000, demand.populationElasticity)
    totalDemand *= Math.pow(averageWealth, demand.wealthElasticity)

    // Sezónní modifikátor
    if (demand.seasonalModifier) {
      totalDemand *= demand.seasonalModifier[season]
    }

    // Poměr nabídka/poptávka
    const supplyDemandRatio = supply / totalDemand

    // Základní cena upravená podle poměru
    let price = market.basePrice / Math.sqrt(supplyDemandRatio)

    // Omezení floor/ceiling
    price = Math.max(price, market.priceFloor)
    if (market.priceCeiling) {
      price = Math.min(price, market.priceCeiling)
    }

    return price
  }

  static applyVolatility(
    basePrice: number,
    volatility: MarketVolatility,
  ): number {
    const volatilityRanges = {
      [MarketVolatility.STABLE]: 0.05,
      [MarketVolatility.MODERATE]: 0.15,
      [MarketVolatility.HIGH]: 0.3,
      [MarketVolatility.EXTREME]: 0.5,
    }

    const range = volatilityRanges[volatility]
    const modifier = 1 + (Math.random() - 0.5) * 2 * range
    return basePrice * modifier
  }
}
