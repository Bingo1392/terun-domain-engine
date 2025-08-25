export type LocalizedTerrain = {
  name: string
}

export type Terrain = {
  key: string
  cz: LocalizedTerrain
  en: LocalizedTerrain
}

/**
 * Terrain represents the main terain on a hex.
 * It has an impact on the economy and the units effectiveness.
 */
export const Terrains: Terrain[] = [
  { key: 'desert', cz: { name: 'Poušť' }, en: { name: 'Desert' } },
  {
    key: 'desert_mountains',
    cz: { name: 'Pouštní hory' },
    en: { name: 'Desert Mountains' },
  },
  { key: 'dry_lands', cz: { name: 'Suchá země' }, en: { name: 'Dry lands' } },
  { key: 'farm_land', cz: { name: 'Orná půda' }, en: { name: 'Farm land' } },
  {
    key: 'wetlands',
    cz: { name: 'Záplavná oblast' },
    en: { name: 'Wetlands' },
  },
  {
    key: 'forest',
    cz: { name: 'Les' },
    en: { name: 'Forest' },
  },
  {
    key: 'hills',
    cz: { name: 'Kopce' },
    en: { name: 'Hills' },
  },
  { key: 'jungle', cz: { name: 'Džungle' }, en: { name: 'Jungle' } },
  { key: 'mountains', cz: { name: 'Hory' }, en: { name: 'Mountains' } },
  {
    key: 'oasis',
    cz: { name: 'Oázy' },
    en: { name: 'Oasis' },
  },
  { key: 'plains', cz: { name: 'Pláně' }, en: { name: 'Plains' } },
  { key: 'steppes', cz: { name: 'Stepi' }, en: { name: 'Steppes' } },
  { key: 'taiga', cz: { name: 'Taiga' }, en: { name: 'Taiga' } },
  { key: 'marshes', cz: { name: 'Mokřady' }, en: { name: 'Marshes' } },
]
