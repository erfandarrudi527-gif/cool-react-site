import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

function strengthOf(pw) {
  let s = 0
  if (pw.length >= 6) s++
  if (pw.length >= 10) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++
  return s
}
const strengthColors = ['#ff6b6b', '#ffb02e', '#00f5ff', '#00ff88']
const strengthLabels = ['Weak', 'Fair', 'Strong', 'Galactic 🚀']

export default function Auth({ onDone, onClose }) {
  const [mode, setMode] = useState('login')
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [err, setErr] = useState('')
  const [errKey, setErrKey] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', pass: '' })

  const isRegister = mode === 'register'
  const strength = strengthOf(form.pass)

  const fail = (msg) => { setErr(msg); setErrKey((k) => k + 1) }
  const switchMode = (m) => { setMode(m); setErr('') }

  const submit = (e) => {
    e.preventDefault()
    if (status !== 'idle') return
    if (isRegister && form.name.trim().length < 2) return fail('Please tell us your name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return fail("That email doesn't look right.")
    if (form.pass.length < 6) return fail('Password needs at least 6 characters.')
    setErr('')
    setStatus('sending')
    setTimeout(() => {
      setStatus('done')
      const name = isRegister
        ? form.name.trim()
        : form.email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      setTimeout(() => onDone({ name, email: form.email }), 1500)
    }, 1500)
  }

  return (
    <div className="auth-wrap">
      {/* background orbs */}
      <motion.div
        animate={{ x: [0, 90, 0], y: [0, -60, 0], scale: [1, 1.35, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: 420, height: 420, borderRadius: '50%', top: '8%', left: '6%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.16), transparent 70%)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 70, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', width: 460, height: 460, borderRadius: '50%', bottom: '4%', right: '8%',
          background: 'radial-gradient(circle, rgba(255,0,255,0.14), transparent 70%)', pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease }}
        className="auth-card"
      >
        <button className="auth-close" onClick={onClose} aria-label="Close">✕</button>

        {/* ---------- left brand panel ---------- */}
        <div className="auth-side">
          {/* orbiting ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', width: 300, height: 300, borderRadius: '50%',
              border: '1px dashed rgba(0,245,255,0.18)', top: -90, right: -90, pointerEvents: 'none',
            }}
          >
            <span style={{
              position: 'absolute', top: -4, left: '50%', width: 8, height: 8, marginLeft: -4,
              borderRadius: '50%', background: '#00f5ff', boxShadow: '0 0 14px #00f5ff',
            }} />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', width: 220, height: 220, borderRadius: '50%',
              border: '1px dashed rgba(255,0,255,0.16)', bottom: -60, left: -60, pointerEvents: 'none',
            }}
          >
            <span style={{
              position: 'absolute', bottom: -4, left: '50%', width: 8, height: 8, marginLeft: -4,
              borderRadius: '50%', background: '#ff00ff', boxShadow: '0 0 14px #ff00ff',
            }} />
          </motion.div>

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 13, position: 'relative',
                background: 'conic-gradient(from 180deg, #00f5ff, #ff00ff, #00ff88, #00f5ff)',
                display: 'grid', placeItems: 'center', boxShadow: '0 0 22px rgba(0,245,255,0.4)',
              }}>
                <span style={{
                  position: 'absolute', inset: 2.5, borderRadius: 11, background: '#0a0a1a',
                  display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 17, color: '#fff',
                }}>N</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.5px' }}>Nebula</span>
            </div>

            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.2, margin: '0 0 14px' }}>
              {isRegister ? 'Join the crew building the' : 'Welcome back, '}
              <span style={{
                background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {isRegister ? ' extraordinary.' : 'star traveler.'}
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14.5, lineHeight: 1.7, maxWidth: 300 }}>
              {isRegister
                ? '4,000+ creators already ship with Nebula. Your workspace is 30 seconds away.'
                : 'Your projects, deploys and analytics missed you. Pick up right where you left off.'}
            </p>
          </div>

          <div style={{ position: 'relative', marginTop: 40 }}>
            <div style={{
              padding: 18, borderRadius: 18, background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
            }}>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', lineHeight: 1.6 }}>
                “Nebula completely transformed how we ship. Our retention jumped 40% in a month.”
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center',
                  background: 'linear-gradient(135deg, #00f5ff, #ff00ff)', fontSize: 11, fontWeight: 800, color: '#fff',
                }}>AC</span>
                <span style={{ fontSize: 12.5 }}>
                  <b style={{ color: '#fff' }}>Aria Chen</b>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}> · Founder, Lumen Labs</span>
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 22, marginTop: 18, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
              <span><b style={{ color: '#00ff88' }}>4,000+</b> creators</span>
              <span><b style={{ color: '#00f5ff' }}>99.9%</b> uptime</span>
              <span><b style={{ color: '#ff00ff' }}>150+</b> countries</span>
            </div>
          </div>
        </div>

        {/* ---------- right form panel ---------- */}
        <div className="auth-main">
          <AnimatePresence mode="wait">
            <motion.h1
              key={mode}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', margin: '0 0 6px' }}
            >
              {isRegister ? 'Create your account' : 'Sign in'}
            </motion.h1>
          </AnimatePresence>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 24px' }}>
            {isRegister ? 'Free forever for hobby projects.' : 'Good to see you again.'}
          </p>

          {/* tabs */}
          <div className="auth-tabs">
            {['login', 'register'].map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`auth-tab ${mode === m ? 'auth-tab--active' : ''}`}
              >
                {mode === m && (
                  <motion.span layoutId="auth-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="auth-pill" />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{m === 'login' ? 'Log in' : 'Register'}</span>
              </button>
            ))}
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AnimatePresence initial={false}>
              {isRegister && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="cfield">
                    <input
                      id="aname" placeholder=" " autoComplete="name"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <label htmlFor="aname">Full name</label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="cfield">
              <input
                id="aemail" type="email" placeholder=" " autoComplete="email"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label htmlFor="aemail">Email address</label>
            </div>

            <div>
              <div className="cfield">
                <input
                  id="apass" type={show ? 'text' : 'password'} placeholder=" "
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={form.pass} onChange={(e) => setForm({ ...form, pass: e.target.value })}
                  style={{ paddingRight: 46 }}
                />
                <label htmlFor="apass">Password</label>
                <button type="button" className="auth-eye" onClick={() => setShow(!show)} aria-label="Toggle password">
                  {show ? '🙈' : '👁️'}
                </button>
              </div>
              <AnimatePresence initial={false}>
                {isRegister && form.pass && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="auth-strength">
                      {[0, 1, 2, 3].map((i) => (
                        <i key={i} style={{ background: i < strength ? strengthColors[strength - 1] : undefined }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 11.5, marginTop: 6, color: strength ? strengthColors[strength - 1] : 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                      {strength ? strengthLabels[strength - 1] : 'Too short'}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#00f5ff' }} />
                {isRegister ? 'I agree to the Terms' : 'Remember me'}
              </label>
              {!isRegister && (
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#00f5ff', fontWeight: 600 }}>
                  Forgot password?
                </a>
              )}
            </div>

            <AnimatePresence>
              {err && (
                <motion.p
                  key={errKey}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: [-10, 10, -6, 6, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="auth-err"
                  style={{ margin: 0 }}
                >
                  ⚠ {err}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 0 34px rgba(0,245,255,0.5)' } : {}}
              whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              className={`csend csend--${status}`}
              disabled={status !== 'idle'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'idle' && (
                  <motion.span key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                    {isRegister ? 'Create account →' : 'Sign in →'}
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <motion.span
                      animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', display: 'inline-block' }}
                    />
                    {isRegister ? 'Creating your universe…' : 'Launching…'}
                  </motion.span>
                )}
                {status === 'done' && (
                  <motion.span key="done" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <motion.path
                        d="M4 12.5l5 5L20 6.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
                      />
                    </svg>
                    {isRegister ? 'Welcome aboard!' : 'Welcome back!'}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          {/* divider + social */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '26px 0 4px' }}>
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase' }}>or continue with</span>
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <div className="auth-social">
            {[
              { name: 'Google', icon: 'G', color: '#ff6b6b' },
              { name: 'GitHub', icon: '⌥', color: '#00ff88' },
            ].map((s) => (
              <motion.button
                key={s.name} type="button" whileHover={{ y: -3, borderColor: `${s.color}66` }} whileTap={{ scale: 0.96 }}
                className="auth-socbtn"
              >
                <span style={{ color: s.color, fontWeight: 800 }}>{s.icon}</span> {s.name}
              </motion.button>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: 13.5, color: 'rgba(255,255,255,0.45)', margin: '24px 0 0' }}>
            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => switchMode(isRegister ? 'login' : 'register')}
              style={{ background: 'none', border: 'none', color: '#00f5ff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5 }}
            >
              {isRegister ? 'Log in' : 'Register free'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
