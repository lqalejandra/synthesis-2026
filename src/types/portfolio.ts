import { studentData } from '../data/students'
import { mapStudentRecordsToPortfolioItems } from '../lib/student-to-portfolio'

/** Shape consumed by `PortfolioCard` and archive/home listings. */
export type PortfolioDiscipline = {
  label: string
  accent: 'pink' | 'cyan' | 'yellow'
}

export type PortfolioStat = {
  label: string
  value: string
}

export type PortfolioItem = {
  id?: string
  title?: string
  description?: string
  side?: string
  tags?: string[]
  link?: string
  url?: string
  href?: string
  date?: string
  image?: string
  imageAlt?: string
  archived?: boolean
  disciplines?: PortfolioDiscipline[]
  stats?: PortfolioStat[]
  quote?: string
  quoteAttribution?: string
  linkedin?: string
}

export const studentPortfolioItems: PortfolioItem[] =
  mapStudentRecordsToPortfolioItems(studentData)

/** Showcase + archive — graduate roster only (student records → portfolio items). */
export const portfolioItems: PortfolioItem[] = [...studentPortfolioItems]
