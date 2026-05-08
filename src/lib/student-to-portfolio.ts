import type { PortfolioItem } from '../types/portfolio'
import type { StudentRecord } from '../types/student'
import { studentPortraitUrl } from '../constants/student-portraits'

const ACCENTS = ['pink', 'cyan', 'yellow'] as const

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function stripOuterQuotes(s: string): string {
  const t = s.trim()
  if (t.length >= 2 && t.startsWith('"') && t.endsWith('"')) return t.slice(1, -1)
  return t
}

function displayValue(raw: string): string {
  const t = raw.trim()
  return t ? t : '\u2014'
}

/** Normalizes labels like `What's playing?`, `Go-to font:` → lookup key. */
function normalizeStatLabel(segment: string): string {
  return segment
    .trim()
    .replace(/:\s*$/, '')
    .replace(/\?$/, '')
    .trim()
    .toLowerCase()
}

function statValueForLabel(labelNorm: string, s: StudentRecord): string {
  switch (labelNorm) {
    case 'go-to font':
      return displayValue(s.goToFont)
    case 'inspired by':
      return displayValue(s.currentlyInspiredBy)
    case 'collecting':
      return displayValue(s.currentlyCollecting)
    case 'recharges with':
      return displayValue(s.rechargesWith)
    case 'favorite color':
      return displayValue(s.favoriteColorHex)
    case 'my tools':
      return displayValue(s.myTools)
    case "what's playing":
      return displayValue(s.whatsPlaying)
    case 'on my desk':
      return displayValue(s.whatsOnYourDesk)
    default:
      return '\u2014'
  }
}

/** `designStats` strings use `", "` between prompts, e.g. `Collecting:, My tools:, On my desk:`. */
function parseDesignStatRows(
  designStats: string,
  student: StudentRecord,
): { label: string; value: string }[] {
  const segments = designStats.split(', ').map((x) => x.trim()).filter(Boolean)
  return segments.map((seg) => {
    const trimmed = seg.trim()
    const label =
      trimmed.endsWith(':') || trimmed.endsWith('?')
        ? trimmed
        : `${trimmed}:`
    const norm = normalizeStatLabel(trimmed)
    return {
      label,
      value: statValueForLabel(norm, student),
    }
  })
}

function disciplinesFromFocusTags(focusTags: string): {
  label: string
  accent: (typeof ACCENTS)[number]
}[] {
  const parts = focusTags
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
  const tabs = parts.slice(0, 3)
  return tabs.map((label, i) => ({
    label,
    accent: ACCENTS[i % ACCENTS.length],
  }))
}

export function mapStudentRecordToPortfolioItem(s: StudentRecord): PortfolioItem {
  const id = slugify(s.preferredName)
  const stats = parseDesignStatRows(s.designStats, s)
  const quote = stripOuterQuotes(s.seniorQuote)

  return {
    id,
    title: s.preferredName,
    side: 'Design',
    image: studentPortraitUrl(s.images.default),
    imageAlt: studentPortraitUrl(s.images.alt),
    link: s.websiteLink.trim(),
    linkedin: s.linkedinLink.trim(),
    disciplines: disciplinesFromFocusTags(s.focusTags),
    stats,
    quote,
    quoteAttribution: s.quoteAttribution.trim(),
    archived: false,
  }
}

export function mapStudentRecordsToPortfolioItems(
  records: StudentRecord[],
): PortfolioItem[] {
  return records.map(mapStudentRecordToPortfolioItem)
}
