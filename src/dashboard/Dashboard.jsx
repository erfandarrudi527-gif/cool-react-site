import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/* ================= data ================= */
const genSeries = (n, base, variance) => {
  const out = []
  let v = base
  for (let i = 0; i < n; i++) {
    v += (Math.random() - 0.45) * variance
    v = Math.max(base * 0.3, v)
    out.push(Math.round(v))
  }
  return out
}

const smooth = (pts) => {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1], p1 = pts[i]
    const cx = (p0.x + p1.x) / 2
    d += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`
  }
  return d
}

const fmt = (n) =>
  n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'k' : String(n)

/* ================= small pieces ================= */
function Counter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf
    const t0 = performance.now()
    const dur = 1600
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(eased * value)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  const shown = decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toLocaleString()
  return (
    <span ref={ref}>
      {prefix}{shown}{suffix}
    </span>
  )
}

function Spark({ data, color, w = 110, h = 38 }) {
  const max = Math.max(...data), min = Math.min(...data)
  const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * w, y: h - ((v - min) / (max - min || 1)) * (h - 5) - 2 }))
  const line = smooth(pts)
  const id = useMemo(() => 'sk' + Math.random().toString(36).slice(2, 7), [])
  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.4" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L ${w},${h} L 0,${h} Z`} fill={`url(#${id})`} />
      <motion.path
        d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }}
      />
    </svg>
  )
}

function Gauge({ value, label, color }) {
  const r = 54, c = 2 * Math.PI * r
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', width: 130, height: 130 }}>
        <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="11" />
          <motion.circle
            cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="11" strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - value / 100) }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Sora', fontWeight: 800, fontSize: 24, color: '#fff',
        }}>
          <Counter value={value} suffix="%" />
        </div>
      </div>
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{label}</span>
    </div>
  )
}

/* ================= live area chart ================= */
function LiveChart({ data }) {
  const [hover, setHover] = useState(null)
  const W = 760, H = 250
  const pad = { t: 14, b: 24, l: 6, r: 6 }
  const max = Math.max(...data) * 1.15
  const pts = data.map((v, i) => ({
    x: pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r),
    y: pad.t + (1 - v / max) * (H - pad.t - pad.b),
    v,
  }))
  const line = smooth(pts)
  const area = `${line} L ${pts[pts.length - 1].x},${H - pad.b} L ${pts[0].x},${H - pad.b} Z`
  const last = pts[pts.length - 1]

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * W
    let best = 0, bd = Infinity
    pts.forEach((p, i) => { const d = Math.abs(p.x - x); if (d < bd) { bd = d; best = i } })
    setHover(best)
  }

  return (
    <div style={{ position: 'relative' }} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="liveFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00f5ff" stopOpacity="0.3" />
            <stop offset="1" stopColor="#00f5ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="liveStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00f5ff" />
            <stop offset="1" stopColor="#ff00ff" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={pad.l} x2={W - pad.r} y1={pad.t + f * (H - pad.t - pad.b)} y2={pad.t + f * (H - pad.t - pad.b)}
            stroke="rgba(255,255,255,0.05)" strokeDasharray="4 7" />
        ))}
        <path d={area} fill="url(#liveFill)" />
        <path d={line} fill="none" stroke="url(#liveStroke)" strokeWidth="2.5" strokeLinecap="round" />
        {/* pulsing head dot */}
        <circle cx={last.x} cy={last.y} r="4.5" fill="#00f5ff" />
        <circle cx={last.x} cy={last.y} r="4.5" fill="none" stroke="#00f5ff" strokeWidth="1.5">
          <animate attributeName="r" values="4.5;14" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite" />
        </circle>
        {hover !== null && (
          <g>
            <line x1={pts[hover].x} x2={pts[hover].x} y1={pad.t} y2={H - pad.b} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 4" />
            <circle cx={pts[hover].x} cy={pts[hover].y} r="5.5" fill="#ff00ff" stroke="#0a0a1a" strokeWidth="2.5" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div style={{
          position: 'absolute', pointerEvents: 'none',
          left: `${(pts[hover].x / W) * 100}%`, top: `${(pts[hover].y / H) * 100}%`,
          transform: 'translate(-50%, -130%)',
          background: 'rgba(10,10,26,0.95)', border: '1px solid rgba(0,245,255,0.3)',
          borderRadius: 10, padding: '6px 12px', textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{fmt(pts[hover].v)}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>req / min</div>
        </div>
      )}
    </div>
  )
}

/* ================= live feed ================= */
const feedEvents = [
  { icon: '🚀', text: '<b>aurora-shop</b> deployed to production', color: '#00f5ff' },
  { icon: '✅', text: 'Build <b>#4821</b> passed in 38s', color: '#00ff88' },
  { icon: '👤', text: '<b>sara@loop.work</b> joined the team', color: '#a855f7' },
  { icon: '⚠️', text: 'High latency detected on <b>eu-west-1</b>', color: '#ffb02e' },
  { icon: '🔁', text: 'Preview env <b>pr-118</b> created', color: '#ff00ff' },
  { icon: '📈', text: 'Traffic spike: <b>+34%</b> in the last 5m', color: '#00ff88' },
  { icon: '🛡️', text: 'Blocked <b>1,204</b> bot requests', color: '#00f5ff' },
  { icon: '💳', text: 'New subscription — <b>Pro ×3</b>', color: '#a855f7' },
]

function LiveFeed() {
  const [feed, setFeed] = useState(() =>
    [0, 1, 2, 3, 4].map((i) => ({ ...feedEvents[i], id: i, t: Date.now() - (5 - i) * 45000 })),
  )
  useEffect(() => {
    const t = setInterval(() => {
      const e = feedEvents[Math.floor(Math.random() * feedEvents.length)]
      setFeed((f) => [{ ...e, id: Math.random(), t: Date.now() }, ...f].slice(0, 6))
    }, 3200)
    return () => clearInterval(t)
  }, [])
  const ago = (t) => {
    const s = Math.floor((Date.now() - t) / 1000)
    return s < 60 ? `${s}s ago` : `${Math.floor(s / 60)}m ago`
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <AnimatePresence initial={false}>
        {feed.map((e) => (
          <motion.div
            key={e.id}
            layout
            initial={{ opacity: 0, y: -18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px', borderRadius: 12,
              transition: 'background 0.25s',
            }}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
          >
            <span style={{
              display: 'grid', placeItems: 'center', width: 32, height: 32, minWidth: 32,
              borderRadius: 10, fontSize: 14,
              background: `${e.color}18`, border: `1px solid ${e.color}44`,
            }}>{e.icon}</span>
            <span
              style={{ flex: 1, minWidth: 0, fontSize: 13, color: 'rgba(255,255,255,0.72)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              dangerouslySetInnerHTML={{ __html: e.text }}
            />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>{ago(e.t)}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/* ================= main ================= */
const kpiDefs = [
  { icon: '👥', label: 'Active Users', value: 8421, delta: '+12.4%', up: true, color: '#00f5ff', spark: genSeries(16, 60, 16) },
  { icon: '💰', label: 'MRR', value: 124500, prefix: '$', delta: '+8.1%', up: true, color: '#ff00ff', spark: genSeries(16, 50, 12) },
  { icon: '⚡', label: 'Requests / min', value: 12400, delta: '+22%', up: true, color: '#00ff88', spark: genSeries(16, 70, 20) },
  { icon: '🛡️', label: 'Threats Blocked', value: 342, delta: '-4.2%', up: false, color: '#a855f7', spark: genSeries(16, 40, 10) },
]

const projects = [
  { name: 'aurora-shop', status: 'Live', region: 'global', visits: '48.2k', deploys: 128, color: '#00f5ff' },
  { name: 'pulseboard', status: 'Live', region: 'us-east', visits: '21.7k', deploys: 64, color: '#00ff88' },
  { name: 'zarpay-wallet', status: 'Building', region: 'eu-west', visits: '12.4k', deploys: 39, color: '#ff00ff' },
  { name: 'bazaar-360', status: 'Live', region: 'global', visits: '9.8k', deploys: 210, color: '#ffb02e' },
  { name: 'shipfast-cli', status: 'Queued', region: 'us-west', visits: '4.1k', deploys: 17, color: '#a855f7' },
]

const regions = [
  { name: 'us-east-1', load: 62, color: '#00f5ff' },
  { name: 'eu-west-1', load: 84, color: '#ffb02e' },
  { name: 'ap-south-1', load: 41, color: '#00ff88' },
  { name: 'sa-east-1', load: 27, color: '#ff00ff' },
]

const sideNav = [
  { icon: '▦', label: 'Overview' },
  { icon: '📈', label: 'Analytics' },
  { icon: '🚀', label: 'Deploys' },
  { icon: '🌍', label: 'Edge' },
  { icon: '⚙️', label: 'Settings' },
]

export default function Dashboard() {
  const [active, setActive] = useState('Overview')
  const [traffic, setTraffic] = useState(() => genSeries(40, 4200, 850))

  useEffect(() => {
    const t = setInterval(() => {
      setTraffic((d) => {
        const next = [...d.slice(1)]
        let v = d[d.length - 1] + (Math.random() - 0.47) * 700
        v = Math.max(1500, Math.min(7500, v))
        next.push(Math.round(v))
        return next
      })
    }, 1800)
    return () => clearInterval(t)
  }, [])

  const kpis = useMemo(() => kpiDefs, [])

  return (
    <div style={{ minHeight: '100vh', paddingTop: 96, display: 'flex', background: 'transparent' }}>
      {/* ---------- sidebar ---------- */}
      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="dash-side"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sideNav.map((n) => (
            <motion.button
              key={n.label}
              onClick={() => setActive(n.label)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                padding: '12px 14px', borderRadius: 14, border: '1px solid transparent',
                background: active === n.label
                  ? 'linear-gradient(120deg, rgba(0,245,255,0.14), rgba(255,0,255,0.1))'
                  : 'transparent',
                borderColor: active === n.label ? 'rgba(0,245,255,0.28)' : 'transparent',
                boxShadow: active === n.label ? '0 0 20px rgba(0,245,255,0.12)' : 'none',
                color: active === n.label ? '#fff' : 'rgba(255,255,255,0.45)',
                fontSize: 14, fontWeight: active === n.label ? 600 : 500,
                fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>{n.icon}</span>
              <span className="dash-side-label">{n.label}</span>
            </motion.button>
          ))}
        </div>

        {/* bandwidth */}
        <div className="dash-side-label" style={{
          marginTop: 'auto', padding: 16, borderRadius: 16,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,245,255,0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
            <span>Bandwidth</span><span style={{ color: '#00f5ff', fontWeight: 700 }}>68%</span>
          </div>
          <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }} animate={{ width: '68%' }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #00f5ff, #ff00ff)' }}
            />
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>Resets in 12 days</div>
        </div>
      </motion.aside>

      {/* ---------- main ---------- */}
      <div style={{ flex: 1, minWidth: 0, padding: '24px clamp(16px, 3vw, 36px) 60px' }}>
        {/* header row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}
        >
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
              {active}
              <span style={{
                marginLeft: 12, fontSize: 11, fontWeight: 700, verticalAlign: 'middle',
                padding: '4px 10px', borderRadius: 99, color: '#00ff88',
                background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)',
              }}>● LIVE</span>
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              nebula-labs / production workspace
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="dash-search">
              <span style={{ opacity: 0.5 }}>🔍</span>
              <input placeholder="Search…" />
            </div>
            <motion.div whileHover={{ scale: 1.08 }} style={{
              width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center',
              background: 'linear-gradient(135deg, #00f5ff, #ff00ff)', color: '#fff',
              fontWeight: 800, fontSize: 13, cursor: 'pointer',
              boxShadow: '0 0 18px rgba(0,245,255,0.4)',
            }}>NR</motion.div>
          </div>
        </motion.div>

        {/* KPI row */}
        <div className="dash-kpis">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="dash-kpi"
              style={{ '--accent': k.color }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{
                  display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 12, fontSize: 17,
                  background: `${k.color}14`, border: `1px solid ${k.color}3a`,
                  boxShadow: `0 0 18px ${k.color}22`,
                }}>{k.icon}</span>
                <span style={{
                  fontSize: 11.5, fontWeight: 700, padding: '4px 10px', borderRadius: 99,
                  color: k.up ? '#00ff88' : '#ff6b6b',
                  background: k.up ? 'rgba(0,255,136,0.1)' : 'rgba(255,107,107,0.1)',
                }}>{k.up ? '▲' : '▼'} {k.delta}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.1 }}>
                    <Counter value={k.value} prefix={k.prefix || ''} />
                  </div>
                  <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{k.label}</div>
                </div>
                <Spark data={k.spark} color={k.color} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* live chart + gauges */}
        <div className="dash-grid-a">
          <motion.section
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="dash-panel"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Realtime Traffic</h2>
              <span style={{ fontSize: 11, color: '#00ff88', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 8px #00ff88', display: 'inline-block' }}
                />
                streaming · updates every 1.8s
              </span>
            </div>
            <LiveChart data={traffic} />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="dash-panel"
          >
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 18px' }}>System Health</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 14 }}>
              <Gauge value={99} label="Uptime" color="#00ff88" />
              <Gauge value={72} label="CPU Load" color="#00f5ff" />
              <Gauge value={58} label="Memory" color="#ff00ff" />
            </div>
          </motion.section>
        </div>

        {/* feed + regions */}
        <div className="dash-grid-b">
          <motion.section
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="dash-panel"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Activity</h2>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>last events</span>
            </div>
            <LiveFeed />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
            className="dash-panel"
          >
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 18px' }}>Edge Regions</h2>
            {regions.map((r, i) => (
              <div key={r.name} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6 }}>
                  <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.75)' }}>{r.name}</span>
                  <span style={{ color: r.color, fontWeight: 700 }}>{r.load}%</span>
                </div>
                <div style={{ height: 7, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${r.load}%` }}
                    transition={{ duration: 1.2, delay: 0.7 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: '100%', borderRadius: 99,
                      background: `linear-gradient(90deg, ${r.color}66, ${r.color})`,
                      boxShadow: `0 0 12px ${r.color}55`,
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.section>
        </div>

        {/* projects table */}
        <motion.section
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="dash-panel"
          style={{ padding: '22px 8px 8px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 14px' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Projects</h2>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{
              border: 'none', padding: '9px 18px', borderRadius: 99, cursor: 'pointer',
              background: 'linear-gradient(120deg, #00f5ff, #ff00ff)', backgroundSize: '160% 160%',
              animation: 'textGradient 4s ease infinite',
              color: '#fff', fontSize: 12.5, fontWeight: 700, fontFamily: 'inherit',
              boxShadow: '0 4px 18px rgba(0,245,255,0.35)',
            }}>+ New project</motion.button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Project</th><th>Status</th><th>Region</th><th>Visits</th><th>Deploys</th><th />
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.name}>
                    <td>
                      <span style={{
                        display: 'inline-block', width: 9, height: 9, borderRadius: '50%',
                        background: p.color, boxShadow: `0 0 10px ${p.color}`, marginRight: 11,
                      }} />
                      <b style={{ fontWeight: 600 }}>{p.name}</b>
                    </td>
                    <td>
                      <span className={`dash-badge dash-badge--${p.status.toLowerCase()}`}>{p.status}</span>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{p.region}</td>
                    <td>{p.visits}</td>
                    <td>{p.deploys}</td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <motion.button whileHover={{ y: -2 }} className="dash-iconbtn">↗</motion.button>
                      <motion.button whileHover={{ y: -2 }} className="dash-iconbtn">⋯</motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
