import { HamletSize, HamletType } from './hamlets'

/**
 * Resource amount is count in kilograms
 */
export type ResourceAmount = {
  key: string
  amount: number
}

export type HamletIO = {
  type: HamletType
  size: HamletSize
  needs: ResourceAmount[]
  provides: ResourceAmount[]
}

export const HamletsIO = [
  {
    type: HamletType.HUMAN,
    size: HamletSize.WILDERNESS,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.POOR_VILLAGE,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.VILLAGE,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.PROSPEROUS_VILLAGE,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.SMALL_CITY,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.MEDIUM_CITY,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.LARGE_CITY,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.EXTRA_LARGE_CITY,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.HUGE_CITY,
    needs: [],
    provides: [],
  },
  {
    type: HamletType.HUMAN,
    size: HamletSize.GARGANTUAN_CITY,
    needs: [],
    provides: [],
  },
]
