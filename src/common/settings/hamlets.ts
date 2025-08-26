export enum HamletType {
  HUMAN = 'human',
}

export enum HamletSize {
  WILDERNESS = 'wilderness',
  POOR_VILLAGE = 'poor_village',
  VILLAGE = 'village',
  PROSPEROUS_VILLAGE = 'prosperous_village',
  SMALL_CITY = 'small',
  MEDIUM_CITY = 'medium',
  LARGE_CITY = 'large',
  EXTRA_LARGE_CITY = 'extra_large',
  HUGE_CITY = 'huge',
  GARGANTUAN_CITY = 'gargantuan',
}

export type LocalizedHamlet = {
  name?: string
}

/**
 * Hamlet represents a population size and wealth on the map.
 *
 * - growth:
 * The growth is a number between -100 and 100.
 * When the growth is -100, the hamlet size decreases.
 * Minimum of wilderness hamlet growth is 0.
 * When the growth is 100, the hamlet size increases.
 * New growth is set to 0 when size is changed.
 * Maximum of gargantuan_city hamlet growth is 0.
 * Growth can be changed by maximum of 10 points per year.
 *
 * - control:
 * The control is a number between 0 and 100 where 0 means no control and 100 means full control.
 * Poor control could cause revolts and increase crime in the area.
 */
export type Hamlet = {
  cz: LocalizedHamlet
  en: LocalizedHamlet
  type: HamletType
  size: HamletSize
  growth: number
  control: number
}
