import { asset } from '../../lib/assets'

export function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero__bg" aria-hidden />
      <div className="about-hero__inner">
        <div className="about-hero__copy">
          <p className="about-hero__title">process made visible</p>
          <div className="about-hero__sub" aria-label="Create, collaborate, inspire">
            <span>create</span>
            <span className="about-hero__dot about-hero__dot--round" aria-hidden>
              <img src={asset('/about/hero-ellipse.svg')} alt="" width={22} height={22} />
            </span>
            <span>collab</span>
            <span className="about-hero__dot about-hero__dot--square" aria-hidden />
            <span>inspire</span>
            <span className="about-hero__dot about-hero__dot--tri" aria-hidden>
              <img src={asset('/about/hero-tri.svg')} alt="" width={24} height={22} />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
