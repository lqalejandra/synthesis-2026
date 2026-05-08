/** Showcase grid filters synced with repeated `?discipline=` params (e.g. Branding, UI/UX). */

export const DISCIPLINE_PARAM = 'discipline'

export function readDisciplineParams(params: URLSearchParams): string[] {
  const raw = params.getAll(DISCIPLINE_PARAM).filter((s) => s.trim())
  return [...new Set(raw)]
}

export function setDisciplineParams(
  params: URLSearchParams,
  disciplines: string[],
): URLSearchParams {
  const next = new URLSearchParams(params)
  next.delete(DISCIPLINE_PARAM)
  for (const d of disciplines) {
    const t = d.trim()
    if (t) next.append(DISCIPLINE_PARAM, t)
  }
  return next
}

export function toggleDisciplineInParams(
  params: URLSearchParams,
  label: string,
): URLSearchParams {
  const current = readDisciplineParams(params)
  const has = current.includes(label)
  const nextList = has
    ? current.filter((d) => d !== label)
    : [...current, label]
  return setDisciplineParams(params, nextList)
}

export function clearDisciplineParams(params: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(params)
  next.delete(DISCIPLINE_PARAM)
  return next
}
