import { AboutHero } from '../components/about/AboutHero'
import { EventSection } from '../components/about/EventSection'
import { MeetTheTeams } from '../components/about/MeetTheTeams'

/** Process / About page — matches Figma About Page (node 2940:9645). Footer: App shell (Figma 2738:2395). */
export function Pages() {
  return (
    <article className="about-page">
      <div className="about-stack">
        <AboutHero />
        <EventSection />
      </div>
      <MeetTheTeams />
    </article>
  )
}
