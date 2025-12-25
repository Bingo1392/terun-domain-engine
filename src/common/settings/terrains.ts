import { LocalizedItem } from './common'
import { HamletType } from './hamlets'

/**
 * Ratio represents the percentage of spontaneous colonization of a terrain with a hamlet of a certain type of adjusted terrain.
 * If the terrain is not adjusted, the ratio is halved by each day of traveling to the next colonized terrain.
 * The ratio cannot be smaller than 1.
 */
export type TerrainColonizationRatio = {
  hamletType: HamletType
  ratio: number
}

export type Terrain = {
  key: string
  cz: LocalizedItem
  en: LocalizedItem
  colonizationRatio: TerrainColonizationRatio[]
}

/**
 * Terrain represents the main terain on a hex.
 * It has an impact on the economy and the units effectiveness.
 */
export const Terrains: Terrain[] = [
  {
    key: 'desert',
    cz: { name: 'Poušť' },
    en: { name: 'Desert' },
    colonizationRatio: [{ hamletType: HamletType.HUMAN, ratio: 1 }],
  },
  {
    key: 'desert_mountains',
    cz: { name: 'Pouštní hory' },
    en: { name: 'Desert Mountains' },
    colonizationRatio: [{ hamletType: HamletType.HUMAN, ratio: 1 }],
  },
  {
    key: 'dry_lands',
    cz: { name: 'Suchá země' },
    en: { name: 'Dry lands' },
    colonizationRatio: [],
  },
  {
    key: 'farm_land',
    cz: { name: 'Orná půda' },
    en: { name: 'Farm land' },
    colonizationRatio: [{ hamletType: HamletType.HUMAN, ratio: 90 }],
  },
  {
    key: 'wetlands',
    cz: { name: 'Záplavná oblast' },
    en: { name: 'Wetlands' },
    colonizationRatio: [],
  },
  {
    key: 'forest',
    cz: { name: 'Les' },
    en: { name: 'Forest' },
    colonizationRatio: [],
  },
  {
    key: 'hills',
    cz: { name: 'Kopce' },
    en: { name: 'Hills' },
    colonizationRatio: [],
  },
  {
    key: 'jungle',
    cz: { name: 'Džungle' },
    en: { name: 'Jungle' },
    colonizationRatio: [],
  },
  {
    key: 'mountains',
    cz: { name: 'Hory' },
    en: { name: 'Mountains' },
    colonizationRatio: [],
  },
  {
    key: 'oasis',
    cz: { name: 'Oázy' },
    en: { name: 'Oasis' },
    colonizationRatio: [],
  },
  {
    key: 'plains',
    cz: { name: 'Pláně' },
    en: { name: 'Plains' },
    colonizationRatio: [],
  },
  {
    key: 'steppes',
    cz: { name: 'Stepi' },
    en: { name: 'Steppes' },
    colonizationRatio: [],
  },
  {
    key: 'taiga',
    cz: { name: 'Taiga' },
    en: { name: 'Taiga' },
    colonizationRatio: [],
  },
  {
    key: 'marshes',
    cz: { name: 'Mokřady' },
    en: { name: 'Marshes' },
    colonizationRatio: [],
  },
]
