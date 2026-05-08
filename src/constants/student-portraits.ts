/**
 * Graduate portraits — pinned tree from Exit Review Spring 2026 synthesis repo.
 * @see https://github.com/comdesexit/ExitreviewSpring2026-Synthesis/tree/c4b3270d4bdb746234d994543e11eb92ec11607c/Synthesis-Images/Portraitsv2.5
 */
export const STUDENT_PORTRAIT_BASE_URL =
  'https://raw.githubusercontent.com/comdesexit/ExitreviewSpring2026-Synthesis/c4b3270d4bdb746234d994543e11eb92ec11607c/Synthesis-Images/Portraitsv2.5'

/** Builds absolute portrait URL; pass-through if `filename` is already `http(s)://`. */
export function studentPortraitUrl(filename: string): string {
  const name = filename.trim()
  if (!name) return ''
  if (/^https?:\/\//i.test(name)) return name
  return `${STUDENT_PORTRAIT_BASE_URL}/${encodeURIComponent(name)}`
}
