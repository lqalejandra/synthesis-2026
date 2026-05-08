import type { PortfolioItem } from '../types/portfolio'

const DISPLAYED_KEYS = new Set([
  'id',
  'title',
  'description',
  'side',
  'tags',
  'link',
  'url',
  'href',
  'date',
  'image',
  'archived',
  'disciplines',
  'stats',
  'quote',
  'quoteAttribution',
  'linkedin',
])

export function getUniqueSides(items: PortfolioItem[]): string[] {
  const sides = new Set<string>()
  for (const item of items) {
    if (typeof item.side === 'string' && item.side.trim()) {
      sides.add(item.side.trim())
    }
  }
  return [...sides].sort((a, b) => a.localeCompare(b))
}

export function filterBySide(
  items: PortfolioItem[],
  selected: string | null,
): PortfolioItem[] {
  if (selected === null) return items
  return items.filter(
    (item) =>
      typeof item.side === 'string' &&
      item.side.trim().toLowerCase() === selected.toLowerCase(),
  )
}

function normDiscipline(s: string): string {
  return s.trim().toLowerCase()
}

/**
 * Match exit-review `disciplines[].label` or legacy `tags[]` against any selected
 * showcase filter (OR). Empty `selected` shows all items.
 */
export function filterByShowcaseDisciplines(
  items: PortfolioItem[],
  selected: string[],
): PortfolioItem[] {
  if (!selected.length) return items
  const wants = new Set(selected.map(normDiscipline))

  return items.filter((item) => {
    const d = item.disciplines
    if (Array.isArray(d)) {
      for (const row of d) {
        if (!row || typeof row !== 'object') continue
        const label =
          typeof row.label === 'string' ? row.label.replace(/\u00a0/g, '').trim() : ''
        if (label && wants.has(normDiscipline(label))) return true
      }
    }
    const tags = item.tags
    if (Array.isArray(tags)) {
      for (const t of tags) {
        if (typeof t === 'string' && t.trim() && wants.has(normDiscipline(t)))
          return true
      }
    }
    return false
  })
}

export function getArchivedItems(items: PortfolioItem[]): PortfolioItem[] {
  return items.filter((item) => item.archived === true)
}

export function getExtraFields(item: PortfolioItem): [string, unknown][] {
  return Object.entries(item as Record<string, unknown>).filter(
    ([key]) => !DISPLAYED_KEYS.has(key),
  )
}

export function resolveItemLink(item: PortfolioItem): string | undefined {
  const record = item as Record<string, unknown>
  const candidates = [record.link, record.url, record.href]
  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return undefined
}
