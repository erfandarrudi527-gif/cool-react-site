import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'Aether Dashboard',
    tag: 'SaaS Platform',
    accent: '#00f5ff',
    image: 'https://images.unsplash.com/photo-1467145926157-8a9d3d9d4f8a?w=500&h=300&fit=crop',
  },
  {
    title: 'Verdant Finance',
    tag: 'FinTech App',
    accent: '#00ff88',
    image: 'https://images.unsplash.com/photo-1526236966027-564f94b742d6?w=500&h=300&fit=crop',
  },
  {
    title: 'Prism Social',
    tag: 'Social Network',
    accent: '#ff00ff',
    image: 'https://images.unsplash.com/photo-1581091009086-2a3e9a3e8a7a?w=500&h=300&fit=crop',
  },
  {
    title: 'Nova Commerce',
    tag: 'E-Commerce',
    accent: '#a855f7',
    image: 'https://images.unsplash.com/photo-1556912998055-32ab83f6f0a0?w=500&h=300&fit=crop',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const cardRef = useRef(null)

  // tilt via CSS vars + direct DOM writes — no re-renders
  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10
    el.style.transform = `perspective(800px) rotateX(${x}deg) rotateY(${y}deg)`
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: 22,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        height: 340,
        border: '1px solid rgba(0,245,255,0.08)',
      }}
    >
      <div ref={cardRef} style={{ position: 'absolute', inset: 0, transform: 'perspective(800px)', transition: 'transform 0.1s ease-out' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.45,
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ background: 'rgba(10,10,26,0.4)', opacity: 0.6 }}
        animate={isInView ? { background: 'rgba(10,10,26,0.7)', opacity: 0.85 } : {}}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,10,26,0.5), rgba(0,245,255,0.08))',
          opacity: 0.85,
          zIndex: 2,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.45 + index * 0.15 }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(0,245,255,0.08) 0%, transparent 50%)',
          zIndex: 3,
        }}
      />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '32px 24px',
        background: 'linear-gradient(transparent, rgba(10,10,26,0.95))',
        zIndex: 4,
      }}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
          style={{
            display: 'inline-block',
            padding: '3px 12px',
            borderRadius: 6,
            background: `${project.accent}30`,
            color: project.accent,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.5px',
            marginBottom: 10,
            boxShadow: `0 0 10px ${project.accent}40`,
          }}
        >
          {project.tag}
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
          style={{
            fontSize: 22, fontWeight: 700,
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.8))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {project.title}
        </motion.h3>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        style={{
          position: 'absolute', top: 22, right: 22,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(0,245,255,0.12)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(0,245,255,0.25)',
          zIndex: 5,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: 22,
          boxShadow: `0 0 35px ${project.accent}30`,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
      </div>
    </motion.div>
  )
}

export default function Showcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="showcase" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div className="grid-pattern" style={{ animation: 'gridMove 35s linear infinite' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 48 }}
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
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          Our Work
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
          Recent{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            animation: 'textGradient 5s ease-in-out infinite',
          }}>
            Projects
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            color: 'rgba(255,255,255,0.48)',
            fontSize: 16, maxWidth: 480,
          }}
        >
          Each project is a story of collaboration, innovation, and relentless pursuit of excellence.
        </motion.p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
      }}>
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
