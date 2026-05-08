import gsap from 'gsap'
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { PortfolioItem } from '../types/portfolio'
import { getExtraFields, resolveItemLink } from '../lib/portfolio'
import { asset } from '../lib/assets'

type ExitAccent = 'pink' | 'cyan' | 'yellow'

type ExitReviewDiscipline = {
  label: string
  accent: ExitAccent
}

type ExitReviewStat = {
  label: string
  value: string
}

type ExitReviewShape = {
  disciplines: ExitReviewDiscipline[]
  stats: ExitReviewStat[]
  quote?: string
  quoteAttribution?: string
  linkedin?: string
}

const ACCENTS = new Set<ExitAccent>(['pink', 'cyan', 'yellow'])

function parseExitReviewShape(item: PortfolioItem): ExitReviewShape | null {
  const raw = item as Record<string, unknown>
  const d = raw.disciplines
  if (!Array.isArray(d) || d.length === 0) return null

  const disciplines: ExitReviewDiscipline[] = []
  for (const row of d) {
    if (!row || typeof row !== 'object') continue
    const rec = row as Record<string, unknown>
    const label = typeof rec.label === 'string' ? rec.label.trim() : ''
    const accent = typeof rec.accent === 'string' ? rec.accent : ''
    if (!label.replace(/\u00a0/g, '').trim() || !ACCENTS.has(accent as ExitAccent))
      continue
    disciplines.push({ label, accent: accent as ExitAccent })
  }

  if (disciplines.length === 0) return null

  const statsRaw = raw.stats
  const stats: ExitReviewStat[] = []
  if (Array.isArray(statsRaw)) {
    for (const row of statsRaw) {
      if (!row || typeof row !== 'object') continue
      const rec = row as Record<string, unknown>
      const label = typeof rec.label === 'string' ? rec.label.trim() : ''
      const value = typeof rec.value === 'string' ? rec.value.trim() : ''
      if (!label || !value) continue
      stats.push({ label, value })
    }
  }

  const quote =
    typeof raw.quote === 'string' && raw.quote.trim() ? raw.quote.trim() : undefined
  const quoteAttribution =
    typeof raw.quoteAttribution === 'string' && raw.quoteAttribution.trim()
      ? raw.quoteAttribution.trim()
      : undefined

  const linkedin =
    typeof raw.linkedin === 'string' && raw.linkedin.trim()
      ? raw.linkedin.trim()
      : undefined

  return { disciplines, stats, quote, quoteAttribution, linkedin }
}

function formatExtraValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string' || typeof value === 'number')
    return String(value)
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

type PortfolioCardProps = {
  item: PortfolioItem
}

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduce(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduce
}

function ExitReviewCard({
  item,
  exit,
}: {
  item: PortfolioItem
  exit: ExitReviewShape
}) {
  const portfolioKey =
    typeof item.id === 'string' && item.id
      ? item.id
      : typeof item.title === 'string' && item.title.trim()
        ? item.title
        : 'unknown'
  const faceId = useId()
  const [showAbout, setShowAbout] = useState(false)
  const reduceMotion = usePrefersReducedMotion()
  const cardRef = useRef<HTMLElement>(null)
  const gsapCtxRef = useRef<ReturnType<typeof gsap.context> | null>(null)
  const defaultImgRef = useRef<HTMLImageElement>(null)
  const altImgRef = useRef<HTMLImageElement>(null)
  const website = resolveItemLink(item)

  const title =
    typeof item.title === 'string' && item.title.trim()
      ? item.title
      : 'Untitled'

  const image =
    typeof item.image === 'string' && item.image.trim()
      ? asset(item.image)
      : undefined

  const imageAlt =
    typeof item.imageAlt === 'string' && item.imageAlt.trim()
      ? asset(item.imageAlt)
      : undefined

  const tabs = exit.disciplines.slice(0, 3)
  const tabCount = tabs.length

  const crossfadeToAlt = useCallback(() => {
    if (!imageAlt || reduceMotion) return
    const d = defaultImgRef.current
    const a = altImgRef.current
    const ctx = gsapCtxRef.current
    if (!d || !a || !ctx) return
    ctx.add(() => {
      gsap.killTweensOf([d, a])
      gsap.to(d, { opacity: 0, duration: 0.58, ease: 'power2.out' })
      gsap.to(a, { opacity: 1, duration: 0.58, ease: 'power2.out' })
    })
  }, [imageAlt, reduceMotion])

  const crossfadeToDefault = useCallback(() => {
    if (!imageAlt || reduceMotion) return
    const d = defaultImgRef.current
    const a = altImgRef.current
    const ctx = gsapCtxRef.current
    if (!d || !a || !ctx) return
    ctx.add(() => {
      gsap.killTweensOf([d, a])
      gsap.to(d, { opacity: 1, duration: 0.62, ease: 'power2.inOut' })
      gsap.to(a, { opacity: 0, duration: 0.62, ease: 'power2.inOut' })
    })
  }, [imageAlt, reduceMotion])

  useLayoutEffect(() => {
    const root = cardRef.current
    if (!root) return
    gsapCtxRef.current?.revert()
    gsapCtxRef.current = gsap.context(() => {}, root)
    return () => {
      gsapCtxRef.current?.revert()
      gsapCtxRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    if (!imageAlt || reduceMotion) return
    const d = defaultImgRef.current
    const a = altImgRef.current
    const ctx = gsapCtxRef.current
    if (!d || !a || !ctx) return
    ctx.add(() => {
      gsap.set(a, { opacity: 0 })
      gsap.set(d, { opacity: 1 })
    })
  }, [imageAlt, reduceMotion, image])

  return (
    <article
      ref={cardRef}
      className="portfolio-card portfolio-card--exit exit-card"
      data-portfolio-key={portfolioKey}
      aria-labelledby={`${faceId}-name`}
      onMouseEnter={imageAlt ? crossfadeToAlt : undefined}
      onMouseLeave={imageAlt ? crossfadeToDefault : undefined}
      onClick={(e) => {
        const target = e.target
        if (!(target instanceof HTMLElement)) return
        if (target.closest('a, button')) return
        setShowAbout((v) => !v)
      }}
    >
      <header className="exit-card__head">
        <div
          className={[
            'exit-card__tabs',
            tabCount === 1 ? 'exit-card__tabs--1' : '',
            tabCount === 2 ? 'exit-card__tabs--2' : '',
            tabCount >= 3 ? 'exit-card__tabs--3' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          role="presentation"
        >
          {tabs.map((tab, i) => (
            <span
              key={`${tab.label}-${i}`}
              className={`exit-card__tab exit-card__tab--${tab.accent}`}
              title={tab.label}
            >
              {tab.label}
            </span>
          ))}
        </div>
        <div className="exit-card__namebar" id={`${faceId}-name`}>
          <span className="exit-card__name">{title}</span>
        </div>
      </header>

      <div className="exit-card__viewport">
        <div
          className={`exit-card__strip${showAbout ? ' exit-card__strip--flipped' : ''}`}
          aria-hidden={false}
        >
          <div className="exit-card__face exit-card__face--photo">
            {image ? (
              <div className="exit-card__photo-stack" aria-hidden={false}>
                {imageAlt ? (
                  <img
                    ref={altImgRef}
                    className="exit-card__photo exit-card__photo--alt"
                    src={imageAlt}
                    alt=""
                    loading="lazy"
                  />
                ) : null}
                <img
                  ref={defaultImgRef}
                  className="exit-card__photo exit-card__photo--default"
                  src={image}
                  alt=""
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="exit-card__photo-placeholder" aria-hidden />
            )}
          </div>
          <div className="exit-card__face exit-card__face--about">
            <div className="exit-card__about-inner">
              {exit.stats.length > 0 ? (
                <dl className="exit-card__stats">
                  {exit.stats.map((row, i) => (
                    <div key={`${i}-${row.label}`} className="exit-card__stat">
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {exit.quote ? (
                <blockquote className="exit-card__quote">
                  <p>{exit.quote}</p>
                  {exit.quoteAttribution ? (
                    <footer>{exit.quoteAttribution}</footer>
                  ) : null}
                </blockquote>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <footer className="exit-card__actions">
        <button
          type="button"
          className="exit-card__swap"
          onClick={() => setShowAbout((v) => !v)}
          aria-pressed={showAbout}
          aria-label={showAbout ? 'Show portrait' : 'Show about'}
        >
          <img src={asset('/branding/swap-vertical.svg')} alt="" width={24} height={32} />
        </button>
        <div className="exit-card__actions-spacer" aria-hidden />
        <div className="exit-card__actions-right">
          {exit.linkedin ? (
            <a
              className="exit-card__linkedin"
              href={exit.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} on LinkedIn`}
            >
              <img
                src={asset('/branding/linkedin-in-bug.svg')}
                alt=""
                width={18}
                height={18}
                className="exit-card__linkedin-icon"
              />
            </a>
          ) : null}
          {website ? (
            <a
              className="exit-card__website"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Website</span>
              <img
                src={asset('/branding/external-link-sm.svg')}
                alt=""
                width={16}
                height={16}
                className="exit-card__website-icon"
              />
            </a>
          ) : null}
        </div>
      </footer>
    </article>
  )
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const exitShape = parseExitReviewShape(item)
  if (exitShape) {
    return <ExitReviewCard item={item} exit={exitShape} />
  }

  const portfolioKey =
    typeof item.id === 'string' && item.id
      ? item.id
      : typeof item.title === 'string' && item.title.trim()
        ? item.title
        : 'unknown'

  const link = resolveItemLink(item)
  const tags = Array.isArray(item.tags)
    ? item.tags.filter((t): t is string => typeof t === 'string')
    : []
  const extras = getExtraFields(item)

  const title =
    typeof item.title === 'string' && item.title.trim()
      ? item.title
      : 'Untitled'

  const description =
    typeof item.description === 'string' ? item.description : undefined

  const side = typeof item.side === 'string' ? item.side : undefined

  const date = typeof item.date === 'string' ? item.date : undefined

  const image =
    typeof item.image === 'string' && item.image.trim()
      ? asset(item.image)
      : undefined

  const cardInner = (
    <>
      {image ? (
        <div className="portfolio-card__media">
          <img src={image} alt="" loading="lazy" />
        </div>
      ) : null}
      <div className="portfolio-card__body">
        <div className="portfolio-card__meta">
          {side ? <span className="portfolio-card__side">{side}</span> : null}
          {item.archived === true ? (
            <span className="portfolio-card__archived">Archived</span>
          ) : null}
          {date ? (
            <time className="portfolio-card__date" dateTime={date}>
              {date}
            </time>
          ) : null}
        </div>
        <h3 className="portfolio-card__title">{title}</h3>
        {description ? (
          <p className="portfolio-card__desc">{description}</p>
        ) : null}
        {tags.length > 0 ? (
          <ul className="portfolio-card__tags">
            {tags.map((tag) => (
              <li key={tag}>
                <span className="tag">{tag}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {extras.length > 0 ? (
          <dl className="portfolio-card__extras">
            {extras.map(([key, value]) => (
              <div key={key} className="portfolio-card__extra">
                <dt>{key}</dt>
                <dd>{formatExtraValue(value)}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </>
  )

  if (link) {
    return (
      <article className="portfolio-card" data-portfolio-key={portfolioKey}>
        <a className="portfolio-card__link" href={link}>
          {cardInner}
        </a>
      </article>
    )
  }

  return (
    <article className="portfolio-card" data-portfolio-key={portfolioKey}>
      {cardInner}
    </article>
  )
}
