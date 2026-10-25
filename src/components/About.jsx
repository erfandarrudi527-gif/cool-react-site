import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/* ---------- counter ---------- */
function Counter({ value, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min((now - t0) / 1800, 1)
      setN((1 - Math.pow(1 - p, 3)) * value)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toLocaleString()}{suffix}
    </span>
  )
}

/* ---------- tilt wrapper (reveal outside, tilt inside → no transform conflict) ---------- */
function TiltCard({ children, color, delay = 0, style = {} }) {
  const inner = useRef(null)
  const onMove = (e) => {
    const el = inner.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientY - r.top) / r.height - 0.5) * 8
    const y = -((e.clientX - r.left) / r.width - 0.5) * 8
    el.style.transform = `perspective(900px) rotateX(${x}deg) rotateY(${y}deg) translateY(-6px)`
  }
  const onLeave = () => {
    const el = inner.current
    if (el) el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      <div
        ref={inner}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="about-tilt"
        style={{ '--accent': color, ...style }}
      >
        {children}
      </div>
    </motion.div>
  )
}

/* ---------- data ---------- */
const stats = [
  { value: 42, suffix: '', label: 'Team members', color: '#00f5ff' },
  { value: 150, suffix: '+', label: 'Countries reached', color: '#ff00ff' },
  { value: 4000, suffix: '+', label: 'Creators onboard', color: '#00ff88' },
  { value: 99.9, suffix: '%', label: 'Platform uptime', decimals: 1, color: '#a855f7' },
]

const timeline = [
  { year: '2021', title: 'The Spark', text: 'Two friends, one apartment in Tehran, and a stubborn belief that the web could feel more alive. Nebula began as a weekend prototype.', color: '#00f5ff' },
  { year: '2022', title: 'First 1,000', text: 'Word spread. Our design-engineering approach attracted creators who were tired of cookie-cutter templates.', color: '#00ff88' },
  { year: '2023', title: 'Series A', text: 'Raised funding, grew to 20 humans across 9 time zones, and rebuilt the platform from scratch — twice.', color: '#ffb02e' },
  { year: '2024', title: 'The Platform', text: 'Launched the Nebula suite: realtime analytics, edge deploys, and the dashboard our users now open every morning.', color: '#ff00ff' },
  { year: '2025', title: 'Enterprise Trust', text: '100+ enterprise teams shipped on Nebula. SOC 2 certified. Zero-downtime migrations became our signature.', color: '#a855f7' },
  { year: '2026', title: 'Going Galactic', text: '4,000 creators, 150 countries, one obsession: building the extraordinary. This is still day one.', color: '#00f5ff' },
]

const values = [
  'Craft over shortcuts', 'Ship daily', 'Obsess over details', 'Move fast, stay humble',
  'Users first, always', 'No boring allowed', 'Radical transparency', 'Bold or boring — pick bold',
]

const team = [
  { name: 'Aria Chen', role: 'CEO & Co-founder', initials: 'AC', color: '#00f5ff', bio: 'Ex-design engineer. Believes every pixel deserves a reason to exist.' },
  { name: 'Marcus Johnson', role: 'CTO & Co-founder', initials: 'MJ', color: '#ff00ff', bio: 'Systems thinker. Deleted more code than he wrote — and that was the point.' },
  { name: 'Sofia Petrov', role: 'Head of Design', initials: 'SP', color: '#00ff88', bio: 'Turns research into interfaces people actually enjoy opening.' },
  { name: 'Kenji Tanaka', role: 'VP Engineering', initials: 'KT', color: '#a855f7', bio: 'Keeps 310 edge locations boring. Boring is beautiful.' },
  { name: 'Lena Novak', role: 'Head of Data', initials: 'LN', color: '#ffb02e', bio: 'Finds the story hiding inside every metric.' },
  { name: 'Omar Haddad', role: 'Community Lead', initials: 'OH', color: '#00f5ff', bio: 'Answers support tickets in minutes, makes friends in seconds.' },
]

const manifesto = [
  'We believe the web should feel alive.',
  'Every pixel with purpose.',
  'Every motion with meaning.',
  'No templates. No shortcuts. No boring.',
]

/* ================= page ================= */
export default function About({ onGoDashboard }) {
  return (
    <div style={{ paddingTop: 96, position: 'relative' }}>
      {/* ---------- HERO ---------- */}
      <section style={{
        minHeight: '86vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '60px 24px', position: 'relative', overflow: 'hidden',
      }}>
        {/* orbiting rings */}
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
          {[340, 520, 720].map((size, i) => (
            <motion.div
              key={size}
              animate={{ rotate: i % 2 ? -360 : 360 }}
              transition={{ duration: 30 + i * 14, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', width: size, height: size, borderRadius: '50%',
                border: '1px dashed rgba(0,245,255,0.12)',
              }}
            >
              <span style={{
                position: 'absolute', top: -4, left: '50%', width: 8, height: 8, marginLeft: -4,
                borderRadius: '50%',
                background: ['#00f5ff', '#ff00ff', '#00ff88'][i],
                boxShadow: `0 0 14px ${['#00f5ff', '#ff00ff', '#00ff88'][i]}`,
              }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease }}
          style={{
            width: 84, height: 84, borderRadius: 26, position: 'relative', marginBottom: 34,
            background: 'conic-gradient(from 180deg, #00f5ff, #ff00ff, #00ff88, #00f5ff)',
            display: 'grid', placeItems: 'center',
            boxShadow: '0 0 50px rgba(0,245,255,0.4)',
          }}
        >
          <span style={{
            position: 'absolute', inset: 4, borderRadius: 22, background: '#0a0a1a',
            display: 'grid', placeItems: 'center', fontSize: 38, fontWeight: 800, color: '#fff',
          }}>N</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase',
            color: '#00f5ff', marginBottom: 18,
          }}
        >
          About Nebula
        </motion.p>

        <h1 style={{ fontSize: 'clamp(38px, 7.5vw, 84px)', fontWeight: 800, letterSpacing: '-2.5px', lineHeight: 1.05, maxWidth: 900, margin: 0 }}>
          {['We don’t build software.', 'We build '].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.35 + i * 0.15, ease }}
              style={{ display: 'block' }}
            >
              {line}
              {i === 1 && (
                <span style={{
                  background: 'linear-gradient(135deg, #00f5ff, #ff00ff, #00ff88)',
                  backgroundSize: '300% 300%', animation: 'textGradient 5s ease-in-out infinite',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  universes.
                </span>
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease }}
          style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, maxWidth: 560, margin: '26px auto 0', lineHeight: 1.7 }}
        >
          A design-engineering studio from Tehran, now powering creators in 150 countries.
          We turn ambitious ideas into products that feel impossible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease }}
          style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onGoDashboard}>
            <span style={{ position: 'relative', zIndex: 2, fontWeight: 600 }}>Explore the Dashboard →</span>
          </motion.button>
        </motion.div>
      </section>

      {/* ---------- STATS ---------- */}
      <section style={{ padding: '40px 24px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="about-stats">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="about-stat"
              style={{ '--accent': s.color }}
            >
              <div style={{
                fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-2px',
                background: `linear-gradient(135deg, ${s.color}, #fff)`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- TIMELINE ---------- */}
      <section style={{ padding: '60px 24px 100px', maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          style={{ textAlign: 'center', fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 70 }}
        >
          Our{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>story</span>
        </motion.h2>

        <div className="about-tl">
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease }}
              className={`about-tl-item ${i % 2 ? 'about-tl-item--right' : ''}`}
            >
              <span className="about-tl-dot" style={{ background: t.color, boxShadow: `0 0 16px ${t.color}` }} />
              <div className="about-tl-card" style={{ borderColor: `${t.color}33` }}>
                <span style={{ color: t.color, fontWeight: 800, fontSize: 14, letterSpacing: '1px' }}>{t.year}</span>
                <h3 style={{ margin: '6px 0 8px', fontSize: 20, fontWeight: 700 }}>{t.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- VALUES MARQUEE ---------- */}
      <section style={{ padding: '50px 0', borderTop: '1px solid rgba(0,245,255,0.08)', borderBottom: '1px solid rgba(0,245,255,0.08)', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: 56, width: 'max-content' }}
        >
          {[...values, ...values].map((v, i) => (
            <span key={i} style={{
              fontFamily: 'Sora', fontSize: 20, fontWeight: 700, whiteSpace: 'nowrap',
              color: i % 2 ? 'rgba(255,255,255,0.25)' : 'rgba(0,245,255,0.55)',
              letterSpacing: '-0.5px',
            }}>
              ✦ {v}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ---------- TEAM ---------- */}
      <section style={{ padding: '100px 24px', maxWidth: 1150, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          style={{ textAlign: 'center', fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 14 }}
        >
          The{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00ff88, #00f5ff)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>humans</span>{' '}
          behind the pixels
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', margin: '0 auto 60px', maxWidth: 460 }}
        >
          Nine time zones. One obsession. Meet the core crew.
        </motion.p>

        <div className="about-team">
          {team.map((m, i) => (
            <TiltCard key={m.name} color={m.color} delay={(i % 3) * 0.1} style={{ padding: '30px 26px' }}>
              <div style={{
                width: 62, height: 62, borderRadius: 18, display: 'grid', placeItems: 'center',
                fontWeight: 800, fontSize: 19, color: '#fff', marginBottom: 18,
                background: `linear-gradient(135deg, ${m.color}, ${m.color}55)`,
                boxShadow: `0 0 24px ${m.color}44`,
              }}>
                {m.initials}
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700 }}>{m.name}</h3>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: m.color, marginBottom: 12, letterSpacing: '0.5px' }}>{m.role}</div>
              <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{m.bio}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ---------- MANIFESTO ---------- */}
      <section style={{ padding: '110px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.12), transparent 70%)',
        }} />
        {manifesto.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: i * 0.12, ease }}
            style={{
              fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1px',
              lineHeight: 1.35, margin: 0,
              color: i === 3 ? 'transparent' : 'rgba(255,255,255,0.9)',
              background: i === 3 ? 'linear-gradient(135deg, #00f5ff, #ff00ff)' : undefined,
              WebkitBackgroundClip: i === 3 ? 'text' : undefined,
              backgroundClip: i === 3 ? 'text' : undefined,
            }}
          >
            {line}
          </motion.p>
        ))}
      </section>

      {/* ---------- CTA ---------- */}
      <section style={{ padding: '40px 24px 130px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          style={{
            maxWidth: 760, margin: '0 auto', padding: 'clamp(40px, 6vw, 70px) 30px',
            borderRadius: 32, position: 'relative', overflow: 'hidden',
            background: 'rgba(10,10,26,0.6)', border: '1px solid rgba(0,245,255,0.15)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 60px rgba(0,245,255,0.08)',
          }}
        >
          <motion.div
            animate={{ x: [0, 90, 0], y: [0, -60, 0], scale: [1, 1.4, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', width: 320, height: 320, borderRadius: '50%', top: -110, left: -90,
              background: 'radial-gradient(circle, rgba(0,245,255,0.22), transparent 70%)', pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ x: [0, -80, 0], y: [0, 70, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              position: 'absolute', width: 300, height: 300, borderRadius: '50%', bottom: -100, right: -70,
              background: 'radial-gradient(circle, rgba(255,0,255,0.2), transparent 70%)', pointerEvents: 'none',
            }}
          />
          <h2 style={{ position: 'relative', fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: 800, letterSpacing: '-1px', margin: '0 0 14px' }}>
            Like what you see?{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Wait until you drive it.</span>
          </h2>
          <p style={{ position: 'relative', color: 'rgba(255,255,255,0.55)', margin: '0 0 34px', fontSize: 16 }}>
            The Nebula dashboard is live — poke every button, watch the data move.
          </p>
          <motion.button
            className="btn-primary" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            onClick={onGoDashboard} style={{ position: 'relative' }}
          >
            <span style={{ position: 'relative', zIndex: 2, fontWeight: 700 }}>Open the Dashboard ▦</span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}
