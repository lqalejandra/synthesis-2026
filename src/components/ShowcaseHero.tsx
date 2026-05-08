/**
 * Home hero — Figma « Hero » (3144:8895)
 * https://www.figma.com/design/XuEGp4CmdyWpOpkBHEUvcL/Exit-Review-sp-2026?node-id=3144-8895
 */
export function ShowcaseHero() {
  return (
    <section className="showcase-hero" aria-label="Synthesis showcase">
      <div className="showcase-hero__bg" aria-hidden>
        <img
          className="showcase-hero__bg-img"
          src="/hero/showcase-bg.png"
          alt=""
          width={2592}
          height={1440}
          sizes="100vw"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="showcase-hero__inner">
        <img
          className="showcase-hero__hero-lockup"
          src="/hero/synthesis-hero-lockup.svg"
          alt="synthesis — process made visible"
          decoding="async"
        />
      </div>
    </section>
  )
}
