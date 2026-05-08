import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { portfolioItems } from '../types/portfolio'
import { getArchivedItems } from '../lib/portfolio'
import { PortfolioCard } from '../components/PortfolioCard'

export function Archive() {
  const archived = useMemo(() => getArchivedItems(portfolioItems), [])

  return (
    <div className="archive-page">
      <header className="page-header">
        <h1 className="page-header__title">Archive</h1>
        <p className="page-header__lede">
          Older or paused work kept for reference.
        </p>
      </header>

      {archived.length === 0 ? (
        <p className="empty-state">Nothing archived yet.</p>
      ) : (
        <section id="portfolio-cards" aria-label="Portfolio cards">
          <div className="card-grid card-grid--single">
            {archived.map((item) => {
              const key =
                typeof item.id === 'string' && item.id
                  ? item.id
                  : typeof item.title === 'string'
                    ? item.title
                    : JSON.stringify(item)
              return <PortfolioCard key={key} item={item} />
            })}
          </div>
        </section>
      )}

      <p className="page-footer-note">
        <NavLink to="/">← Back to showcase</NavLink>
      </p>
    </div>
  )
}
