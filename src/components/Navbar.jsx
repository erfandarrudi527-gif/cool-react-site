import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = ['Home', 'Features', 'Work', 'Testimonials', 'About', 'Contact']

export default function Navbar({ view, onViewChange, onOpenAuth, onDashboard, onLogout, user }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    if (id === 'About') {
      setActive('About')
      onViewChange('about')
      return
    }
    if (id === 'Contact') {
      setActive('Contact')
      onViewChange('contact')
      return
    }
    if (view !== 'site') {
      // coming back from dashboard/about → wait for site to mount, then scroll
      onViewChange('site')
      setTimeout(() => {
        const el = document.getElementById(id.toLowerCase() === 'home' ? 'hero' :
          id.toLowerCase() === 'work' ? 'showcase' : id.toLowerCase())
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
      return
    }
    setActive(id)
    const section = document.getElementById(id.toLowerCase() === 'home' ? 'hero' :
      id.toLowerCase() === 'work' ? 'showcase' :
      id.toLowerCase() === 'testimonials' ? 'testimonials' :
      id.toLowerCase() === 'contact' ? 'cta' :
      id.toLowerCase())
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  const goDashboard = () => {
    setMenuOpen(false)
    if (view === 'dashboard') onViewChange('site')
    else onDashboard()
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'center',
      padding: scrolled ? '10px 16px' : '20px 16px',
      transition: 'padding 0.45s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: 'none',
    }}>
      <motion.nav
        initial={{ y: -110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          pointerEvents: 'auto',
          width: '100%', maxWidth: 1120,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16,
          padding: '10px 12px 10px 18px',
          borderRadius: 999,
          background: scrolled
            ? 'rgba(10, 10, 26, 0.72)'
            : 'rgba(10, 10, 26, 0.35)',
          backdropFilter: 'blur(24px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
          border: '1px solid',
          borderColor: scrolled ? 'rgba(0,245,255,0.18)' : 'rgba(255,255,255,0.08)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.45), 0 0 30px rgba(0,245,255,0.07), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'background 0.45s, border-color 0.45s, box-shadow 0.45s',
        }}
      >
        {/* brand + dashboard shortcut */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          <motion.div
            onClick={() => scrollTo('Home')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 34, height: 34, borderRadius: 11,
                background: 'conic-gradient(from 180deg, #00f5ff, #ff00ff, #00ff88, #00f5ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 18px rgba(0,245,255,0.45)',
                position: 'relative',
              }}
            >
              <span style={{
                position: 'absolute', inset: 2.5, borderRadius: 9,
                background: '#0a0a1a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 15, color: '#fff',
              }}>N</span>
            </motion.div>
            <span className="nav-brand-name" style={{
              fontWeight: 800, fontSize: 19, letterSpacing: '-0.5px',
              background: 'linear-gradient(120deg, #fff 40%, #00f5ff)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Nebula
            </span>
          </motion.div>

          {/* dashboard pill — right next to the logo */}
          <motion.button
            onClick={goDashboard}
            whileHover={{ scale: 1.06, boxShadow: '0 0 22px rgba(0,245,255,0.4)' }}
            whileTap={{ scale: 0.94 }}
            className="nav-dash-btn"
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '8px 16px', borderRadius: 999, flexShrink: 0,
              border: '1px solid',
              borderColor: view === 'dashboard' ? 'rgba(0,245,255,0.55)' : 'rgba(0,245,255,0.3)',
              background: view === 'dashboard'
                ? 'linear-gradient(120deg, rgba(0,245,255,0.24), rgba(255,0,255,0.18))'
                : 'rgba(0,245,255,0.07)',
              color: '#fff', fontSize: 13, fontWeight: 700,
              fontFamily: 'inherit', cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: view === 'dashboard' ? '0 0 24px rgba(0,245,255,0.25)' : 'none',
              transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: 14 }}>▦</span>
            <span className="nav-dash-label">{view === 'dashboard' ? 'Back to Site' : 'Dashboard'}</span>
            {!user && view !== 'dashboard' && (
              <span className="nav-dash-lock" aria-hidden="true">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <rect x="4" y="10" width="16" height="11" rx="2.5" />
                  <path d="M8 10V7a4 4 0 018 0v3" />
                </svg>
              </span>
            )}
          </motion.button>
        </div>

        {/* links */}
        <div className="nav-links" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {navItems.map((item) => {
            const isActive = (item === 'About' && view === 'about') || (item === 'Contact' && view === 'contact') || (active === item && view === 'site')
            return (
              <motion.button
                key={item}
                onClick={() => scrollTo(item)}
                whileTap={{ scale: 0.94 }}
                style={{
                  position: 'relative',
                  border: 'none', background: 'transparent',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  padding: '9px 16px', borderRadius: 999,
                  letterSpacing: '0.2px',
                  transition: 'color 0.3s',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 999,
                      background: 'linear-gradient(120deg, rgba(0,245,255,0.16), rgba(255,0,255,0.14))',
                      border: '1px solid rgba(0,245,255,0.3)',
                      boxShadow: '0 0 18px rgba(0,245,255,0.18), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{item}</span>
              </motion.button>
            )
          })}
        </div>

        {/* right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.div
                onClick={onLogout}
                whileHover={{ scale: 1.08 }}
                title={`Signed in as ${user.name} — click to log out`}
                style={{
                  height: 38, padding: '0 14px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,245,255,0.25)',
                  color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                <span style={{
                  width: 24, height: 24, borderRadius: '50%', display: 'grid', placeItems: 'center',
                  background: 'linear-gradient(135deg, #00f5ff, #ff00ff)', fontSize: 10, fontWeight: 800,
                }}>
                  {user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                </span>
                <span className="nav-user-name">{user.name.split(' ')[0]}</span>
                <span style={{ fontSize: 11, opacity: 0.5 }}>⎋</span>
              </motion.div>
            </div>
          ) : (
            <motion.button
              onClick={onOpenAuth}
              whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(255,0,255,0.45)' }}
              whileTap={{ scale: 0.95 }}
              className="nav-cta"
            style={{
              padding: '9px 22px', borderRadius: 999, border: 'none',
              background: 'linear-gradient(120deg, #00f5ff, #a855f7 55%, #ff00ff)',
              backgroundSize: '180% 180%',
              animation: 'textGradient 5s ease-in-out infinite',
              color: '#fff', fontSize: 13.5, fontWeight: 700,
              fontFamily: 'inherit', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(168,85,247,0.4)',
              letterSpacing: '0.3px',
            }}
            >
              Get Started
            </motion.button>
          )}

          {/* hamburger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            className="nav-burger"
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,245,255,0.2)',
              cursor: 'pointer', flexDirection: 'column', gap: 5,
              padding: '10px 9px', borderRadius: 999,
            }}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              style={{ width: 20, height: 2, background: '#00f5ff', borderRadius: 2, display: 'block' }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{ width: 20, height: 2, background: '#00f5ff', borderRadius: 2, display: 'block' }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              style={{ width: 20, height: 2, background: '#00f5ff', borderRadius: 2, display: 'block' }} />
          </motion.button>
        </div>
      </motion.nav>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              pointerEvents: 'auto',
              position: 'absolute', top: 'calc(100% - 6px)', left: 16, right: 16,
              background: 'rgba(10, 10, 26, 0.92)',
              backdropFilter: 'blur(24px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
              borderRadius: 24, padding: 14,
              border: '1px solid rgba(0,245,255,0.15)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              display: 'flex', flexDirection: 'column', gap: 2,
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
                onClick={() => { setActive(item); scrollTo(item) }}
                style={{
                  background: 'transparent', border: 'none',
                  color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 500,
                  fontFamily: 'inherit',
                  padding: '13px 16px', cursor: 'pointer', textAlign: 'left',
                  borderRadius: 14,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,245,255,0.07)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + navItems.length * 0.05 }}
              onClick={() => { setMenuOpen(false); onOpenAuth() }}
              style={{
                background: 'linear-gradient(120deg, #00f5ff, #ff00ff)', border: 'none',
                color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
                padding: '13px 16px', cursor: 'pointer', textAlign: 'left', borderRadius: 14,
              }}
            >
              ✦ Get Started — free
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + navItems.length * 0.05 }}
              onClick={goDashboard}
              style={{
                background: 'linear-gradient(120deg, rgba(0,245,255,0.14), rgba(255,0,255,0.12))',
                border: '1px solid rgba(0,245,255,0.3)',
                color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
                padding: '13px 16px', cursor: 'pointer', textAlign: 'left', borderRadius: 14,
              }}
            >
              ▦ {view === 'dashboard' ? 'Back to Site' : 'Open Dashboard'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
