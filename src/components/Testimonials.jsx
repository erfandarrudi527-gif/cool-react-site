import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function TypewriterText({ text, isActive }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!isActive) return
    setDisplayed('')
    const chars = text.split('')
    let i = 0
    const interval = setInterval(() => {
      if (i < chars.length) {
        const ch = chars[i] // capture NOW — updater runs async and `i` may have moved on
        setDisplayed((prev) => prev + ch)
        i++
      } else {
        clearInterval(interval)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [text, isActive])

  return <span>{displayed}</span>
}

const testimonials = [
  {
    name: 'Aria Chen',
    role: 'Founder, Lumen Labs',
    text: 'Nebula completely transformed our product. The attention to detail and the fluid animations made our app feel like it was from the future. Our retention jumped 40% in a month.',
    gradient: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
    accent: '#00f5ff',
    initial: 'AC',
  },
  {
    name: 'Marcus Johnson',
    role: 'CTO, Skyline Systems',
    text: 'The best engineering team we have ever worked with. They shipped in weeks what our internal team estimated would take months. Communication was flawless.',
    gradient: 'linear-gradient(135deg, #00f5ff, #00ff88)',
    accent: '#00ff88',
    initial: 'MJ',
  },
  {
    name: 'Sofia Petrov',
    role: 'Head of Design, Atlas',
    text: 'Working with Nebula felt like having a world-class design studio in-house. Every screen, every micro-interaction, every pixel was intentional. Pure magic.',
    gradient: 'linear-gradient(135deg, #00ff88, #00f5ff)',
    accent: '#00ff88',
    initial: 'SP',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!autoplay) return
    timeoutRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearTimeout(timeoutRef.current)
  }, [active, autoplay])

  const handleDotClick = (i) => {
    setActive(i)
    setAutoplay(false)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoplay(false)
  }

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
    setAutoplay(false)
  }

  return (
    <section
      id="testimonials"
      style={{
        padding: '100px 24px',
        maxWidth: 900,
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div className="grid-pattern" style={{ animation: 'gridMove 25s linear infinite' }} />

      <div style={{ position: 'relative', minHeight: 340 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 60, scale: 0.97, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, x: -60, scale: 0.97, rotateY: 10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'rgba(10, 10, 26, 0.6)',
              border: '1px solid rgba(0,245,255,0.08)',
              borderRadius: 26,
              padding: '52px 48px',
              backdropFilter: 'blur(20px) saturate(1.5)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                position: 'absolute', top: 24, left: 32,
                fontSize: 72, lineHeight: 1, opacity: 0.08,
                fontFamily: 'Georgia, serif',
                color: 'rgba(0,245,255,0.5)',
              }}
            >
              "
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{
                fontSize: 'clamp(16px, 2vw, 20px)',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.8)',
                fontStyle: 'italic',
                marginBottom: 36,
                maxWidth: 600,
                margin: '0 auto 36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
              }}
            >
              <TypewriterText text={testimonials[active].text} isActive={true} />
              <motion.span
                style={{
                  display: 'inline-block',
                  width: 2, height: '1.2em',
                  background: 'rgba(0,245,255,0.6)',
                  marginLeft: 2,
                  borderRadius: 1,
                }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 18,
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 120, delay: 0.4 }}
                style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: testimonials[active].gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#fff',
                  boxShadow: `0 0 20px ${testimonials[active].accent || '#00f5ff'}30`,
                }}
              >
                {testimonials[active].initial}
              </motion.div>
              <div style={{ textAlign: 'left' }}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                  style={{ fontWeight: 600, fontSize: 16, color: 'rgba(255,255,255,0.9)' }}
                >
                  {testimonials[active].name}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}
                >
                  {testimonials[active].role}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: 26,
                boxShadow: 'inset 0 0 80px rgba(0,245,255,0.03)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 28,
          marginTop: 40,
        }}
      >
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 42, height: 42, borderRadius: '50%',
            border: '1px solid rgba(0,245,255,0.2)',
            background: 'rgba(10,10,26,0.5)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(12px)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <div style={{ display: 'flex', gap: 10 }}>
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => handleDotClick(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.85 }}
              style={{
                width: i === active ? 36 : 10,
                height: 10,
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                background: i === active
                  ? 'linear-gradient(90deg, #00f5ff, #ff00ff)'
                  : 'rgba(255,255,255,0.12)',
                transition: 'width 0.4s, background 0.4s',
                padding: 0,
                boxShadow: i === active ? '0 0 15px rgba(0,245,255,0.5)' : 'none',
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 42, height: 42, borderRadius: '50%',
            border: '1px solid rgba(0,245,255,0.2)',
            background: 'rgba(10,10,26,0.5)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(12px)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{
          marginTop: 32,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
        }}
      >
        <motion.span
          style={{ width: 8, height: 8, borderRadius: '50%' }}
          animate={{
            background: autoplay
              ? ['rgba(0,245,255,0.6)', 'rgba(255,0,255,0.6)', 'rgba(0,245,255,0.6)']
              : 'rgba(255,255,255,0.2)',
          }}
          transition={{ duration: 2, repeat: autoplay ? Infinity : 0, ease: 'easeInOut' }}
        />
        <span>{autoplay ? 'Auto-playing' : 'Paused'}</span>
      </motion.div>
    </section>
  )
}
