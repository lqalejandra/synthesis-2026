/** Fixed showcase filters — order matches design. */
export const SHOWCASE_DISCIPLINE_FILTERS = [
  'Branding',
  'Publication',
  'Art Direction',
  'Typography',
  'Packaging',
  'Illustration',
  'Motion',
  'UI/UX',
] as const

export type ShowcaseDiscipline = (typeof SHOWCASE_DISCIPLINE_FILTERS)[number]
