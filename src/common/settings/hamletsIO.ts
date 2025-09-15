import { HamletSize, HamletType } from './hamlets'

/**
 * Resource amount is counted in kilograms
 */
export type ResourceAmount = {
  key: string
  amount: number
}

export type HamletIO = {
  type: HamletType
  size: HamletSize
  needs: ResourceAmount[] | ResourceAmount[][]
  provides: ResourceAmount[]
}

export const HamletsIO: HamletIO[] = [
  {
    type: HamletType.HUMAN,
    size: HamletSize.WILDERNESS,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.POOR_VILLAGE,
    needs: [{ key: 'grain,fish,pasture', amount: 100 }],
    provides: [{ key: 'population', amount: 50 }],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.VILLAGE,
    needs: [{ key: 'grain,fish,pasture', amount: 300 }],
    provides: [{ key: 'population', amount: 150 }],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.PROSPEROUS_VILLAGE,
    needs: [{ key: 'grain,fish,pasture', amount: 1000 }],
    provides: [{ key: 'population', amount: 500 }],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.SMALL_CITY,
    needs: [
      { key: 'grain', amount: 2500 },
      { key: 'fish,pasture', amount: 500 },
    ],
    provides: [
      { key: 'population', amount: 1500 },
      { key: 'gold', amount: 5 },
    ],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.MEDIUM_CITY,
    needs: [
      { key: 'grain', amount: 7500 },
      { key: 'fish,pasture', amount: 2500 },
    ],
    provides: [{ key: 'population', amount: 5000 }],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.LARGE_CITY,
    needs: [
      { key: 'grain', amount: 22500 },
      { key: 'pasture', amount: 6000 },
      { key: 'fish', amount: 1500 },
    ],
    provides: [{ key: 'population', amount: 15000 }],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.HUGE_CITY,
    needs: [
      { key: 'grain', amount: 67500 },
      { key: 'pasture', amount: 18000 },
      { key: 'fish', amount: 4500 },
    ],
    provides: [{ key: 'population', amount: 45000 }],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.GARGANTUAN_CITY,
    needs: [
      { key: 'grain', amount: 225000 },
      { key: 'pasture', amount: 60000 },
      { key: 'fish', amount: 15000 },
    ],
    provides: [{ key: 'population', amount: 150000 }],
  },
]
