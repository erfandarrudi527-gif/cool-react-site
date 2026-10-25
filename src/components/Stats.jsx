import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: 99.9, label: 'Uptime', suffix: '%', decimals: 1 },
  { value: 4200, label: 'Active Users', suffix: '+', decimals: 0 },
  { value: 150, label: 'Countries Reached', suffix: '+', decimals: 0 },
  { value: 12, label: 'Avg. Response', suffix: 'ms', decimals: 0 },
]

function Counter({ value, label, suffix, decimals, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const safeValue = isInView && value !== null ? value : 0
  const formatted = decimals > 0
    ? safeValue.toFixed(decimals)
    : Math.floor(safeValue).toLocaleString()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ textAlign: 'center' }}
    >
      <motion.div
        initial={{ scale: 0.3, rotate: -10 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 120, delay: 0.2 + index * 0.15 }}
        style={{
          fontSize: 'clamp(42px, 6vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-2px',
          marginBottom: 6,
          position: 'relative',
        }}
      >
        <span style={{
          background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 200%',
          animation: 'textGradient 3s ease-in-out infinite',
          animationDelay: `${index * 0.3}s`,
        }}>
          {formatted}
        </span>
        <span style={{
          background: 'linear-gradient(135deg, #ff00ff, #00ff88)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {suffix}
        </span>
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: '100%', opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
          style={{
            position: 'absolute',
            bottom: -10, left: '50%', transform: 'translateX(-50%)',
            height: 3, width: 0,
            background: 'linear-gradient(90deg, #00f5ff, #ff00ff)',
            borderRadius: 2,
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.35 + index * 0.15 }}
        style={{
          color: 'rgba(255,255,255,0.48)',
          fontSize: 15, fontWeight: 500,
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section style={{ padding: '80px 24px 100px' }}>
      <div className="grid-pattern" style={{ animation: 'gridMove 40s linear infinite' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          background: 'rgba(10, 10, 26, 0.5)',
          borderRadius: 28,
          border: '1px solid rgba(0,245,255,0.1)',
          padding: '60px 40px',
          backdropFilter: 'blur(20px) saturate(1.5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: 2,
          }}
        >
          <motion.div
            style={{
              height: '100%', width: '30%',
              background: 'linear-gradient(90deg, #00f5ff, #ff00ff)',
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1 }}
          />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 40,
        }}>
          {stats.map((s, i) => (
            <Counter key={i} {...s} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
