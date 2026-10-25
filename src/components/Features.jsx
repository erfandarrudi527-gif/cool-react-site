import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: 'Pixel-Perfect Design',
    desc: 'Every component, every spacing, every color — crafted with obsessive attention to detail.',
    gradient: 'linear-gradient(135deg, #00f5ff, #a855f7)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Full-Stack Power',
    desc: 'From frontend animations to backend infrastructure — we build it all, seamlessly.',
    gradient: 'linear-gradient(135deg, #00f5ff, #00ff88)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: 'AI-Native Workflows',
    desc: 'Intelligent automation that learns your patterns and accelerates your creative process.',
    gradient: 'linear-gradient(135deg, #ff00ff, #00f5ff)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Enterprise Security',
    desc: 'SOC 2 compliant, end-to-end encrypted, and built for demanding compliance needs.',
    gradient: 'linear-gradient(135deg, #00ff88, #00f5ff)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Lightning Performance',
    desc: 'Sub-100ms response times, edge-deployed global CDN, and 99.99% uptime guaranteed.',
    gradient: 'linear-gradient(135deg, #ff00ff, #a855f7)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Collaborative Team',
    desc: 'Real-time collaboration, shared workspaces, and seamless handoff between designers and devs.',
    gradient: 'linear-gradient(135deg, #a855f7, #00f5ff)',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -10,
        rotateX: 3,
        scale: 1.02,
      }}
      style={{
        background: 'rgba(10, 10, 26, 0.5)',
        borderRadius: 24,
        padding: '36px 28px',
        border: '1px solid rgba(0,245,255,0.08)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.1, type: 'spring', stiffness: 120 }}
        style={{
          width: 56, height: 56, borderRadius: 16,
          background: feature.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', marginBottom: 22,
          boxShadow: '0 0 25px rgba(0,245,255,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90, transparent, rgba(255,255,255,0.4), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.5s infinite',
            zIndex: 0,
          }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>{feature.icon}</span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.35 + index * 0.1 }}
        style={{
          fontSize: 19, fontWeight: 700, marginBottom: 12,
          letterSpacing: '-0.3px',
          background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {feature.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.45 + index * 0.1 }}
        style={{
          color: 'rgba(255,255,255,0.48)',
          fontSize: 14, lineHeight: 1.7,
        }}
      >
        {feature.desc}
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: 'easeOut' }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
        }}
      >
        <motion.div
          style={{
            height: '100%',
            width: '40%',
            background: feature.gradient,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div className="grid-pattern" style={{ animation: 'gridMove 40s linear infinite' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          style={{
            display: 'inline-block',
            padding: '6px 20px',
            borderRadius: 100,
            background: 'rgba(0,245,255,0.08)',
            border: '1px solid rgba(0,245,255,0.25)',
            color: '#00f5ff',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          Why Choose Us
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            letterSpacing: '-1px',
            lineHeight: 1.15,
            marginBottom: 18,
          }}
        >
          Everything You Need to
          <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'textGradient 4s ease-in-out infinite',
            }}
          >
            Build Extraordinary
          </motion.span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            color: 'rgba(255,255,255,0.48)',
            fontSize: 16, maxWidth: 500, margin: '0 auto',
          }}
        >
          A complete toolkit designed to transform your ideas into production-ready experiences.
        </motion.p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
      }}>
        {features.map((feature, i) => (
          <FeatureCard key={i} feature={feature} index={i} />
        ))}
      </div>
    </section>
  )
}
