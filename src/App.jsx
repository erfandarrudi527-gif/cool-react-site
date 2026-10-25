import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Stats from './components/Stats.jsx'
import Showcase from './components/Showcase.jsx'
import Testimonials from './components/Testimonials.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Dashboard from './dashboard/Dashboard.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Auth from './components/Auth.jsx'

export default function App() {
  const glowRef = useRef(null)
  const [view, setView] = useState('site')
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nebula_user')) } catch { return null }
  })
  const pendingRef = useRef(null)

  const login = (u) => {
    localStorage.setItem('nebula_user', JSON.stringify(u))
    setUser(u)
    setAuth(false)
    // after login → always land on the dashboard
    setView('dashboard')
    pendingRef.current = null
  }
  const logout = () => {
    localStorage.removeItem('nebula_user')
    setUser(null)
    setView('site')
  }
  // dashboard is gated: guests get the auth modal, then land on the dashboard
  const goDashboard = () => {
    if (user) setView('dashboard')
    else {
      pendingRef.current = () => setView('dashboard')
      setAuth(true)
    }
  }

  // safety: never stay on a gated view without a user
  useEffect(() => {
    if (view === 'dashboard' && !user) setView('site')
  }, [view, user])

  // cursor glow: direct DOM writes, NO React state → zero re-renders
  useEffect(() => {
    const el = glowRef.current
    if (!el) return
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.left = `${e.clientX}px`
        el.style.top = `${e.clientY}px`
        el.style.opacity = '1'
      })
    }
    const onOver = (e) => {
      const tag = e.target.tagName
      el.classList.toggle('hover', tag === 'BUTTON' || tag === 'A')
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  // scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [view])

  // lock body scroll while auth modal is open
  useEffect(() => {
    document.body.style.overflow = auth ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [auth])

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <Navbar view={view} onViewChange={setView} onOpenAuth={() => setAuth(true)} onDashboard={goDashboard} onLogout={logout} user={user} />
      {view === 'site' ? (
        <>
          <Hero />
          <Features />
          <Stats />
          <Showcase />
          <Testimonials />
          <Cta />
          <Footer />
        </>
      ) : view === 'about' ? (
        <About onGoDashboard={goDashboard} />
      ) : view === 'contact' ? (
        <Contact onGoDashboard={goDashboard} />
      ) : (
        <Dashboard />
      )}
      <AnimatePresence>
        {auth && <Auth onDone={login} onClose={() => setAuth(false)} />}
      </AnimatePresence>
    </>
  )
}
