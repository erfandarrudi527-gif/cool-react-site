import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/* ---------- data ---------- */
const channels = [
  { icon: '✉️', label: 'Email us', value: 'hello@nebula.dev', note: 'We reply within 2 hours', color: '#00f5ff' },
  { icon: '📞', label: 'Call us', value: '+98 21 9100 1234', note: 'Sat–Thu, 9:00–18:00 IRST', color: '#ff00ff' },
  { icon: '📍', label: 'Visit us', value: 'Tehran, Jordan Blvd', note: '4th floor, Studio N', color: '#00ff88' },
]

const offices = [
  { city: 'Tehran', x: 58, y: 38 },
  { city: 'Berlin', x: 47, y: 30 },
  { city: 'New York', x: 24, y: 36 },
  { city: 'Tokyo', x: 84, y: 40 },
  { city: 'São Paulo', x: 31, y: 68 },
]

const faqs = [
  { q: 'How fast do you ship projects?', a: 'Most landing pages go live in 5–7 days. Full products with dashboards and integrations typically take 3–6 weeks. We scope everything in a free 30-minute call before committing to dates.' },
  { q: 'Do you work with teams outside Iran?', a: 'Absolutely — we ship for clients in 150+ countries. Async-first, overlap hours with every timezone, and contracts in USD/EUR/crypto.' },
  { q: 'What does a typical project cost?', a: 'Landing pages start at $1.5k, product dashboards at $6k, full platforms are custom. You always get a fixed quote before we start — no surprises.' },
  { q: 'Can you redesign our existing site?', a: 'Yes — and we keep your SEO, analytics and content intact. We rebuild the frontend on React/Next with modern animations, then migrate you with zero downtime.' },
  { q: 'Do you offer maintenance after launch?', a: 'Every project includes 30 days free. After that, our Nebula Care plan covers updates, monitoring and unlimited small tweaks for a flat monthly fee.' },
]

/* ---------- dot-map ---------- */
function OfficeMap() {
  const dots = []
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 26; col++) {
      // rough continent mask (very stylized)
      const land =
        (col >= 3 && col <= 8 && row >= 2 && row <= 4) ||        // N america
        (col >= 6 && col <= 9 && row >= 5 && row <= 7) ||        // S america
        (col >= 12 && col <= 14 && row >= 2 && row <= 3) ||      // europe
        (col >= 12 && col <= 15 && row >= 4 && row <= 6) ||      // africa
        (col >= 16 && col <= 22 && row >= 2 && row <= 5) ||      // asia
        (col >= 20 && col <= 23 && row >= 6 && row <= 7)         // oceania
      if (land) dots.push({ x: col * 38 + 10, y: row * 38 + 10 })
    }
  }
  return (
    <svg viewBox="0 0 1000 360" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2.5" fill="rgba(0,245,255,0.18)" />
      ))}
      {offices.map((o, i) => {
        const x = (o.x / 100) * 1000
        const y = (o.y / 100) * 360
        return (
          <g key={o.city}>
            <line x1={x} y1={y} x2={x} y2={y - 26} stroke="rgba(0,245,255,0.4)" strokeWidth="1" />
            <text x={x} y={y - 32} textAnchor="middle" fontSize="12" fontWeight="700" fill="rgba(255,255,255,0.75)" fontFamily="Sora">
              {o.city}
            </text>
            <circle cx={x} cy={y} r="4" fill="#00f5ff" style={{ filter: 'drop-shadow(0 0 6px #00f5ff)' }} />
            <circle cx={x} cy={y} r="4" fill="none" stroke="#00f5ff" strokeWidth="1.5">
              <animate attributeName="r" values="4;16" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        )
      })}
    </svg>
  )
}

/* ================= page ================= */
export default function Contact({ onGoDashboard }) {
  const [form, setForm] = useState({ name: '', email: '', budget: '5k-15k', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [openFaq, setOpenFaq] = useState(0)

  const submit = (e) => {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1600)
    setTimeout(() => {
      setStatus('idle')
      setForm({ name: '', email: '', budget: '5k-15k', message: '' })
    }, 5200)
  }

  return (
    <div style={{ paddingTop: 96, position: 'relative' }}>
      {/* ---------- HERO ---------- */}
      <section style={{
        textAlign: 'center', padding: 'clamp(60px, 9vw, 110px) 24px 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 60% at 50% 0%, rgba(0,245,255,0.1), transparent 65%)',
        }} />
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#ff00ff', marginBottom: 16 }}
        >
          Contact
        </motion.p>
        <h1 style={{ fontSize: 'clamp(36px, 7vw, 78px)', fontWeight: 800, letterSpacing: '-2.5px', lineHeight: 1.06, margin: 0 }}>
          {['Let’s build the', ''].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease }}
              style={{ display: 'block' }}
            >
              {line}
              {i === 1 && (
                <span style={{
                  background: 'linear-gradient(135deg, #00f5ff, #ff00ff, #00ff88)',
                  backgroundSize: '300% 300%', animation: 'textGradient 5s ease-in-out infinite',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  extraordinary.
                </span>
              )}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
          style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, maxWidth: 520, margin: '22px auto 0', lineHeight: 1.7 }}
        >
          Tell us about your idea — we’ll reply within 2 hours with honest thoughts,
          not a sales pitch.
        </motion.p>
      </section>

      {/* ---------- CHANNELS ---------- */}
      <section style={{ padding: '0 24px 70px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="contact-channels">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={{ y: -8 }}
              className="contact-channel"
              style={{ '--accent': c.color }}
            >
              <span className="contact-channel__icon" style={{ background: `${c.color}14`, borderColor: `${c.color}44`, boxShadow: `0 0 20px ${c.color}22` }}>
                {c.icon}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{c.label}</span>
              <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{c.value}</span>
              <span style={{ fontSize: 12.5, color: c.color, opacity: 0.8 }}>{c.note}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ---------- FORM + MAP ---------- */}
      <section style={{ padding: '0 24px 100px', maxWidth: 1150, margin: '0 auto' }}>
        <div className="contact-grid">
          {/* form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease }}
            className="cform"
          >
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', margin: '0 0 6px' }}>
              Start a project
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, margin: '0 0 28px' }}>
              All fields required. No spam, ever.
            </p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="cfield-row">
                <div className="cfield">
                  <input
                    id="cname" placeholder=" " required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <label htmlFor="cname">Your name</label>
                </div>
                <div className="cfield">
                  <input
                    id="cemail" type="email" placeholder=" " required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <label htmlFor="cemail">Email address</label>
                </div>
              </div>

              <div className="cfield">
                <select
                  id="cbudget" value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                >
                  <option value="<5k">Under $5k</option>
                  <option value="5k-15k">$5k – $15k</option>
                  <option value="15k-50k">$15k – $50k</option>
                  <option value="50k+">$50k+</option>
                </select>
                <label htmlFor="cbudget">Project budget</label>
              </div>

              <div className="cfield">
                <textarea
                  id="cmsg" rows="5" placeholder=" " required value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <label htmlFor="cmsg">Tell us about your idea…</label>
              </div>

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
                      Send message →
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <motion.span
                        animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', display: 'inline-block' }}
                      />
                      Launching…
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span key="sent" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <motion.path
                          d="M4 12.5l5 5L20 6.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
                        />
                      </svg>
                      Message sent! Talk soon.
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          {/* map + socials */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
          >
            <div className="cmap">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Global presence</h3>
                <span style={{ fontSize: 11, color: '#00ff88', fontWeight: 700 }}>5 offices · 9 timezones</span>
              </div>
              <OfficeMap />
            </div>

            <div className="csocials">
              {[
                { name: 'Twitter / X', icon: '𝕏', color: '#00f5ff' },
                { name: 'GitHub', icon: '⌥', color: '#ff00ff' },
                { name: 'LinkedIn', icon: 'in', color: '#00ff88' },
                { name: 'Dribbble', icon: '◉', color: '#a855f7' },
              ].map((s) => (
                <motion.a
                  key={s.name} href="#" onClick={(e) => e.preventDefault()}
                  whileHover={{ y: -4, boxShadow: `0 8px 26px ${s.color}33`, borderColor: `${s.color}66` }}
                  whileTap={{ scale: 0.95 }}
                  className="csocial"
                  style={{ '--accent': s.color }}
                >
                  <span style={{ color: s.color, fontWeight: 800, fontSize: 16 }}>{s.icon}</span>
                  {s.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section style={{ padding: '20px 24px 120px', maxWidth: 780, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          style={{ textAlign: 'center', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 44 }}
        >
          Frequently{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>asked</span>
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((f, i) => {
            const open = openFaq === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className={`faq ${open ? 'faq--open' : ''}`}
              >
                <button onClick={() => setOpenFaq(open ? -1 : i)} className="faq__q">
                  <span>{f.q}</span>
                  <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} className="faq__plus">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="faq__a">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 36 }}
        >
          Still curious?{' '}
          <button onClick={onGoDashboard} style={{ background: 'none', border: 'none', color: '#00f5ff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>
            Explore the dashboard →
          </button>
        </motion.p>
      </section>
    </div>
  )
}
