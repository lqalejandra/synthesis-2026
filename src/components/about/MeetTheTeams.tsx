import { useMemo, useState } from 'react'
import type { Team } from '../../types/teams'
import { teams } from '../../types/teams'

export function MeetTheTeams() {
  const [activeSlug, setActiveSlug] = useState(teams[0]?.slug ?? '')
  const active = useMemo(
    () => teams.find((t) => t.slug === activeSlug) ?? teams[0],
    [activeSlug],
  )

  if (!active) return null

  return (
    <section className="about-teams" aria-labelledby="meet-teams-heading">
      <h2 id="meet-teams-heading" className="visually-hidden">
        Meet the teams
      </h2>
      <div className="about-teams__layout">
        <div className="about-teams__nav-wrap">
          <nav className="about-teams__nav" aria-label="Teams">
            <p className="about-teams__nav-title">meet the teams</p>
            <div className="about-teams__nav-box">
              {teams.map((team) => (
                <button
                  key={team.slug}
                  type="button"
                  className={[
                    'about-teams__nav-btn',
                    team.slug === active.slug ? 'is-active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={team.slug === active.slug}
                  onClick={() => setActiveSlug(team.slug)}
                >
                  {team.navLabel}
                </button>
              ))}
            </div>
          </nav>
        </div>

        <TeamPanel team={active} />
      </div>
    </section>
  )
}

function TeamPanel({ team }: { team: Team }) {
  return (
    <div className="about-team-panel">
      <div className="about-team-panel__intro">
        <div className="about-team-panel__text">
          <h3 className="about-team-panel__title">{team.title}</h3>
          <p className="about-team-panel__desc">{team.description}</p>
        </div>
        <div className="about-team-panel__names">
          {team.nameColumns.map((col, index) => (
            <div key={`${team.slug}-col-${index}`} className="about-team-panel__col">
              {col.map((name, i) => (
                <p key={`${team.slug}-${index}-${i}`}>{name}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="about-team-panel__gallery">
        {team.images.map((img, i) => (
          <figure key={`${team.slug}-img-${i}`} className="about-team-panel__figure">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  )
}
