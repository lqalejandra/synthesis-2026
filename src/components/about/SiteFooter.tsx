import { asset } from '../../lib/assets'

const LINKEDIN =
  'https://www.linkedin.com/company/bfa-communication-design-txst-university/posts/?feedView=all'
const PROGRAM_INFO =
  'https://www.finearts.txst.edu/Art/academics/undergraduate/communication-design.html'

/** Footer — desktop [2738:2395](https://www.figma.com/design/XuEGp4CmdyWpOpkBHEUvcL/Exit-Review-sp-2026?node-id=2738-2395&m=dev), desktop TXST [2742:950](https://www.figma.com/design/XuEGp4CmdyWpOpkBHEUvcL/Exit-Review-sp-2026?node-id=2742-950&m=dev), mobile BG [2910:4204](https://www.figma.com/design/XuEGp4CmdyWpOpkBHEUvcL/Exit-Review-sp-2026?node-id=2910-4204&m=dev), mobile footer [2910:4331](https://www.figma.com/design/XuEGp4CmdyWpOpkBHEUvcL/Exit-Review-sp-2026?node-id=2910-4331&m=dev) / TXST [2910:4329](https://www.figma.com/design/XuEGp4CmdyWpOpkBHEUvcL/Exit-Review-sp-2026?node-id=2910-4329&m=dev) */
export function SiteFooter() {
  return (
    <footer className="about-footer">
      <div className="about-footer__bg" aria-hidden>
        <div className="about-footer__bg-base" />
        <div className="about-footer__bg-art">
          <picture>
            <source
              media="(max-width: 840px)"
              srcSet={asset('/about/footer-bg-art-mobile.png')}
            />
            <img
              src={asset('/about/footer-bg-art.png')}
              alt=""
              decoding="async"
            />
          </picture>
        </div>
        <div className="about-footer__bg-veil" />
      </div>
      <div className="about-footer__inner">
        <div className="about-footer__col about-footer__col--brand">
          <div className="about-footer__brand-top">
            <img
              className="about-footer__logo-synthesis"
              src={asset('/about/footer-synthesis.svg')}
              alt="Synthesis"
              width={202}
              height={60}
            />
            <div className="about-footer__meta">
              <p>School of Art and Design</p>
              <p>Spring 2026 Communication Design</p>
            </div>
          </div>
          <div className="about-footer__txst-wrap">
            <img
              className="about-footer__logo-txst"
              src={asset('/about/footer-txst.png')}
              alt="Texas State University"
              width={295}
              height={30}
            />
          </div>
        </div>

        <div className="about-footer__col about-footer__col--connect">
          <p className="about-footer__heading">Connect</p>
          <a
            className="about-footer__link"
            href="https://www.instagram.com/txstcomdesexitreview/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="about-footer__link"
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>
          <a
            className="about-footer__link"
            href={PROGRAM_INFO}
            target="_blank"
            rel="noreferrer"
          >
            Program Info
          </a>
        </div>

        <div className="about-footer__thanks-split">
          <div className="about-footer__thanks-main">
            <p className="about-footer__heading">Special Thanks</p>
            <div className="about-footer__thanks-row">
              <div className="about-footer__filmlab">
                <img
                  src={asset('/about/footer-filmlab.png')}
                  alt="San Marcos Film Lab"
                  width={181}
                  height={89}
                />
              </div>
              <div className="about-footer__names">
                <p>Dimitry Tetin</p>
                <p>Holly Sterling</p>
                <p>Mark Brinkman</p>
                <p>Vic Rodriguez Tang</p>
              </div>
            </div>
          </div>
          <div className="about-footer__bfa-mark">
            <img
              src={asset('/about/footer-bfa-mark.png')}
              alt="BFA Communication Design — bfa com des"
              width={125}
              height={124}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
