import { useEffect, useState } from 'react'

export function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const getScrollY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    const getHeroThresholdPx = () => {
      const base = Math.round(window.innerWidth * 0.2) // original "20vw"
      const hero = document.querySelector<HTMLElement>('.showcase-hero')
      if (!hero) return base
      // Keep the button hidden until we're past the hero (so "Top" is under the hero).
      return Math.max(base, hero.offsetHeight)
    }

    const update = () => {
      const y = getScrollY()
      setVisible(y > getHeroThresholdPx())
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    window.addEventListener('orientationchange', update, { passive: true })
    document.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      document.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <button
      type="button"
      className={['back-to-top', visible ? 'back-to-top--visible' : 'back-to-top--hidden']
        .filter(Boolean)
        .join(' ')}
      onClick={() => {
        const target = document.getElementById('portfolio-cards')
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      aria-label="Back to portfolio cards"
    >
      <span className="back-to-top__label">Top</span>
      <svg
        className="back-to-top__icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 14l6-6 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

