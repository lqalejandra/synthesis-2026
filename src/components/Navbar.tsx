import { useEffect, useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGO_MARK_SRC } from '../constants/branding'

const CONNECT_INSTAGRAM = 'https://www.instagram.com/txstcomdesexitreview/'
const CONNECT_LINKEDIN =
  'https://www.linkedin.com/company/bfa-communication-design-txst-university/posts/?feedView=all'
const CONNECT_PROGRAM_INFO =
  'https://www.finearts.txst.edu/Art/academics/undergraduate/communication-design.html'

export function Navbar() {
  useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const navId = useId()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className={['site-navbar', menuOpen ? 'site-navbar--drawer-open' : ''].filter(Boolean).join(' ')}>
      <div className="site-navbar__bar">
        <NavLink
          to="/"
          className="site-navbar__logo-link"
          aria-label="Home — showcase"
          end
        >
          <img
            className="site-navbar__logo"
            src={LOGO_MARK_SRC}
            alt=""
            width={81}
            height={33}
          />
        </NavLink>

        <nav className="site-navbar__desktop" aria-label="Primary">
          <NavLink
            to="/archive"
            className={({ isActive }) =>
              ['site-navbar__pill', 'site-navbar__pill--archive', isActive ? 'is-active' : '']
                .filter(Boolean)
                .join(' ')
            }
          >
            <span>Archive</span>
            <img
              className="site-navbar__pill-icon"
              src="/branding/external-link-sm.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden
            />
          </NavLink>
          <NavLink
            to="/pages"
            className={({ isActive }) =>
              ['site-navbar__pill', 'site-navbar__pill--process', isActive ? 'is-active' : '']
                .filter(Boolean)
                .join(' ')
            }
          >
            Process
          </NavLink>
        </nav>

        <button
          type="button"
          className="site-navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls={navId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">
            {menuOpen ? 'Close menu' : 'Open menu'}
          </span>
          <span
            className={[
              'site-navbar__burger',
              menuOpen ? 'site-navbar__burger--open' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden
          >
            <span className="site-navbar__burger-bar site-navbar__burger-bar--cyan" />
            <span className="site-navbar__burger-bar site-navbar__burger-bar--yellow" />
            <span className="site-navbar__burger-bar site-navbar__burger-bar--pink" />
          </span>
        </button>
      </div>

      <div
        id={navId}
        className={[
          'site-navbar__drawer',
          menuOpen ? 'is-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="site-navbar__drawer-scrim"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
        <div className="site-navbar__drawer-panel">
          <div className="site-navbar__drawer-inner">
            <div className="site-navbar__drawer-navlinks">
              <NavLink
                to="/archive"
                className="site-navbar__drawer-link site-navbar__drawer-link--with-icon"
                onClick={() => setMenuOpen(false)}
              >
                <span>Archive</span>
                <img
                  className="site-navbar__drawer-link-icon"
                  src="/branding/external-link-sm.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden
                />
              </NavLink>
              <NavLink
                to="/pages"
                className="site-navbar__drawer-link"
                onClick={() => setMenuOpen(false)}
              >
                Process
              </NavLink>
            </div>

            <div className="site-navbar__drawer-connect" aria-label="Connect links">
              <p className="site-navbar__drawer-subhead">Connect</p>
              <a
                className="site-navbar__drawer-link"
                href={CONNECT_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="site-navbar__drawer-link"
                href={CONNECT_LINKEDIN}
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>
              <a
                className="site-navbar__drawer-link"
                href={CONNECT_PROGRAM_INFO}
                target="_blank"
                rel="noreferrer"
              >
                Program Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
