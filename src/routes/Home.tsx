import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { portfolioItems, type PortfolioItem } from '../types/portfolio'
import { filterByShowcaseDisciplines } from '../lib/portfolio'
import {
  readDisciplineParams,
  toggleDisciplineInParams,
  clearDisciplineParams,
} from '../lib/filter-params'
import { SHOWCASE_DISCIPLINE_FILTERS } from '../constants/showcase-filters'
import { SidebarFilter } from '../components/SidebarFilter'
import { PortfolioCard } from '../components/PortfolioCard'
import { MarqueeBanner } from '../components/MarqueeBanner'
import { ShowcaseHero } from '../components/ShowcaseHero'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

function portfolioItemKey(item: PortfolioItem): string {
  if (typeof item.id === 'string' && item.id) return item.id
  if (typeof item.title === 'string') return item.title
  return JSON.stringify(item)
}

export function Home() {
  const showcaseItems = portfolioItems
  const filterOptions = SHOWCASE_DISCIPLINE_FILTERS
  const filterOverlayTitleId = useId()
  const gridRef = useRef<HTMLDivElement | null>(null)
  const pendingFlipStateRef = useRef<Flip.FlipState | null>(null)
  const prevVisibleKeysRef = useRef<Set<string>>(new Set())
  const didInitDefaultFiltersRef = useRef(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedDisciplines = readDisciplineParams(searchParams)
  const [filterOverlayOpen, setFilterOverlayOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(Flip)
  }, [])

  useEffect(() => {
    // Default to "all" only once on hard refresh/load.
    if (didInitDefaultFiltersRef.current) return
    didInitDefaultFiltersRef.current = true
    if (readDisciplineParams(searchParams).length === 0) return
    setSearchParams(clearDisciplineParams(searchParams), { replace: true })
  }, [searchParams, setSearchParams])

  const captureFlipBeforeFilterChange = () => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduce || !gridRef.current) return
    const items = Array.from(gridRef.current.children) as HTMLElement[]
    if (items.length === 0) return
    gsap.killTweensOf(items)
    pendingFlipStateRef.current = Flip.getState(items)
  }

  const toggleDiscipline = (label: string) => {
    captureFlipBeforeFilterChange()
    setSearchParams(toggleDisciplineInParams(searchParams, label))
  }

  const clearDisciplines = () => {
    captureFlipBeforeFilterChange()
    setSearchParams(clearDisciplineParams(searchParams))
  }

  const visible = useMemo(
    () => filterByShowcaseDisciplines(showcaseItems, selectedDisciplines),
    [showcaseItems, selectedDisciplines],
  )

  const visibleKeys = useMemo(() => {
    return new Set(visible.map((item) => portfolioItemKey(item)))
  }, [visible])

  useLayoutEffect(() => {
    const state = pendingFlipStateRef.current
    if (!state) {
      prevVisibleKeysRef.current = new Set(visibleKeys)
      return
    }
    pendingFlipStateRef.current = null

    const grid = gridRef.current
    if (!grid) return

    const items = Array.from(grid.children) as HTMLElement[]
    if (items.length === 0) {
      return
    }
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    if (reduce) {
      prevVisibleKeysRef.current = new Set(visibleKeys)
      return
    }

    gsap.killTweensOf(items)
    const itemCards = items
      .map((el) => el.querySelector<HTMLElement>('.portfolio-card'))
      .filter((el): el is HTMLElement => Boolean(el))
    gsap.killTweensOf(itemCards)

    Flip.from(state, {
      targets: items,
      duration: 0.45,
      ease: 'power2.out',
      absolute: false,
      scale: false,
      simple: true,
      prune: true,
      stagger: 0,
      clearProps: true,
      onEnter: (els) => {
        const cards = els
          .map((el) => el.querySelector<HTMLElement>('.portfolio-card'))
          .filter((el): el is HTMLElement => Boolean(el))
        return gsap.fromTo(
          cards,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          },
        )
      },
      onComplete: () => {
        gsap.set(itemCards, { clearProps: 'opacity,transform' })
        prevVisibleKeysRef.current = new Set(visibleKeys)
      },
    })
  }, [visibleKeys])

  useEffect(() => {
    if (!filterOverlayOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [filterOverlayOpen])

  useEffect(() => {
    if (!filterOverlayOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFilterOverlayOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filterOverlayOpen])

  return (
    <div className="showcase-page">
      <ShowcaseHero />
      <MarqueeBanner />

      <div className="showcase-layout">
        <div className="showcase-layout__sidebar">
          <SidebarFilter
            options={filterOptions}
            selected={selectedDisciplines}
            onToggle={toggleDiscipline}
            onClear={clearDisciplines}
          />
        </div>
        <section className="showcase-grid-wrap" aria-live="polite">
          <div className="showcase-mobile-intro">
            <h2 className="showcase-mobile-intro__title">meet the designers</h2>
            <button
              type="button"
              className="showcase-mobile-intro__filter"
              onClick={() => setFilterOverlayOpen(true)}
              aria-expanded={filterOverlayOpen}
              aria-controls="showcase-filter-overlay-panel"
            >
              Filter
            </button>
          </div>
          <section id="portfolio-cards" aria-label="Portfolio cards">
            {visible.length === 0 ? (
              <p className="empty-state">No projects match these filters.</p>
            ) : null}
            <div ref={gridRef} className="card-grid card-grid--showcase">
              {visible.map((item) => {
                const key = portfolioItemKey(item)
                return (
                  <div
                    key={key}
                    className="card-grid__item"
                    data-portfolio-key={key}
                  >
                    <PortfolioCard item={item} />
                  </div>
                )
              })}
            </div>
          </section>
        </section>
      </div>

      {filterOverlayOpen ? (
        <div
          className="showcase-filter-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={filterOverlayTitleId}
        >
          <button
            type="button"
            className="showcase-filter-overlay__scrim"
            aria-label="Close filters"
            onClick={() => setFilterOverlayOpen(false)}
          />
          <div
            id="showcase-filter-overlay-panel"
            className="showcase-filter-overlay__panel"
          >
            <SidebarFilter
              variant="drawer"
              showMeetHeading={false}
              filtersHeadingId={filterOverlayTitleId}
              onRequestClose={() => setFilterOverlayOpen(false)}
              options={filterOptions}
              selected={selectedDisciplines}
              onToggle={toggleDiscipline}
              onClear={clearDisciplines}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
