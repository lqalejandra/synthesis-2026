import { asset } from '../../lib/assets'

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=1500+E+4th+St,+Austin,+TX+78702'

export function EventSection() {
  return (
    <section className="about-event">
      <div className="about-event__shell">
        <div className="about-event__card">
          <h2 className="about-event__heading">the event</h2>
          <div className="about-event__body">
            <p>
              Synthesis emphasizes process, revealing the systems, iterations,
              and decisions that shape each body of work. The TXST Communication
              Design program presents Synthesis, our Spring 2026 exit review
              exhibition, showcasing the growth and experience captured in our
              portfolios.
            </p>
            <p>
              Join us as we celebrate our work and look toward the future of
              design, reflecting a generation of designers working across
              disciplines, where boundaries between practices are increasingly
              fluid.
            </p>
          </div>
          <div className="about-event__tiles">
            <article className="about-tile">
              <header className="about-tile__head about-tile__head--pink">
                <span>When</span>
              </header>
              <div className="about-tile__body">
                <p className="about-tile__lead about-tile__lead--pink">
                  Tuesday, May 12th
                </p>
                <div className="about-tile__time">
                  <span>6pm</span>
                  <span className="about-tile__arrow" aria-hidden>
                    <img src={asset('/about/event-arrow.svg')} alt="" width={11} height={10} />
                  </span>
                  <span>9pm</span>
                </div>
              </div>
            </article>
            <article className="about-tile">
              <header className="about-tile__head about-tile__head--blue">
                <span>Where</span>
              </header>
              <div className="about-tile__body">
                <p className="about-tile__lead about-tile__lead--blue">
                  Distribution Hall
                </p>
                <p className="about-tile__address">
                  1500 E 4th St, Austin, TX 78702
                </p>
                <a
                  className="about-tile__maps-btn"
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in maps
                  <img src={asset('/about/external-link.svg')} alt="" width={16} height={16} />
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
