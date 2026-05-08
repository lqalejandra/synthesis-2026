import { BrowserRouter, Navigate, Route, Routes, Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from './components/about/SiteFooter'
import { Navbar } from './components/Navbar'
import { BackToTopButton } from './components/BackToTopButton'
import { Home } from './routes/Home'
import { Archive } from './routes/Archive'
import { Pages } from './routes/Pages'

function AppShell() {
  const { pathname } = useLocation()
  const flushMain = pathname === '/pages' || pathname === '/'

  return (
    <div className="site-shell">
      <Navbar />
      <main
        id="content"
        className={flushMain ? 'site-main site-main--flush' : 'site-main'}
      >
        <Outlet />
      </main>
      <BackToTopButton />
      <SiteFooter />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
