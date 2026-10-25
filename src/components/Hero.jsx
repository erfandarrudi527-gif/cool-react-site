import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const floatingShapes = [
  { size: 70, x: '10%', y: '18%', color: '#00f5ff', delay: 0, shape: 'hex' },
  { size: 50, x: '82%', y: '28%', color: '#ff00ff', delay: 1.5, shape: 'plus' },
  { size: 34, x: '72%', y: '75%', color: '#a855f7', delay: 0.8, shape: 'ring' },
  { size: 58, x: '22%', y: '78%', color: '#00ff88', delay: 2.2, shape: 'hex' },
  { size: 26, x: '50%', y: '12%', color: '#00f5ff', delay: 1.2, shape: 'plus' },
  { size: 42, x: '88%', y: '55%', color: '#ff00ff', delay: 3, shape: 'ring' },
]

export default function Hero() {
  const containerRef = useRef(null)
  const shapeRefs = useRef([])

  // parallax via direct DOM writes — no React state, no re-renders
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const mx = (e.clientX - rect.left) / rect.width - 0.5
        const my = (e.clientY - rect.top) / rect.height - 0.5
        shapeRefs.current.forEach((node, i) => {
          if (node) {
            node.style.setProperty('--px', `${mx * (30 + i * 6)}px`)
            node.style.setProperty('--py', `${my * (30 + i * 6)}px`)
          }
        })
      })
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
    }
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="grid-pattern" style={{ animation: 'gridMove 30s linear infinite' }} />

      <div style={{
        position: 'absolute',
        width: '550px', height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.18) 0%, transparent 70%)',
        top: '-12%', left: '-12%',
        pointerEvents: 'none',
        animation: 'pulseGlow 4s ease-in-out infinite',
      }} />

      <div style={{
        position: 'absolute',
        width: '420px', height: '420px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,255,0.14) 0%, transparent 70%)',
        bottom: '-8%', right: '-8%',
        pointerEvents: 'none',
        animation: 'pulseGlow 6s ease-in-out infinite',
        animationDelay: '1s',
      }} />

      <div style={{
        position: 'absolute',
        width: '320px', height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
        top: '40%', right: '25%',
        pointerEvents: 'none',
        animation: 'pulseGlow 5s ease-in-out infinite',
        animationDelay: '2s',
      }} />

      {floatingShapes.map((s, i) => (
        <div
          key={i}
          ref={(node) => (shapeRefs.current[i] = node)}
          style={{
            position: 'absolute',
            left: s.x, top: s.y,
            transform: 'translate3d(var(--px, 0px), var(--py, 0px), 0)',
            willChange: 'transform',
          }}
        >
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: s.delay,
            }}
            style={{
              width: s.size, height: s.size,
              borderRadius: s.shape === 'ring' ? '50%' : s.shape === 'hex' ? '20%' : '4px',
              border: `2px solid ${s.color}60`,
              background: s.shape === 'plus' ? s.color : `${s.color}08`,
              backdropFilter: 'blur(6px)',
              pointerEvents: 'none',
              boxShadow: `0 0 15px ${s.color}40`,
            }}
          />
        </div>
      ))}

      <div className="grid-pattern" style={{ animation: 'gridMove 30s linear infinite' }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: 880, position: 'relative', zIndex: 2 }}
      >
        <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 100,
            background: 'rgba(0,245,255,0.08)',
            border: '1px solid rgba(0,245,255,0.25)',
            color: '#00f5ff',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '1px',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#00ff88',
              animation: 'pulseGlow 2s ease-in-out infinite',
            }} />
            Now in Public Beta
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(42px, 9vw, 92px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2.5px',
            marginBottom: 24,
            position: 'relative',
          }}
        >
          <span style={{
            background: 'linear-gradient(135deg, #00f5ff, #ff00ff, #00ff88)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '300% 300%',
            animation: 'textGradient 6s ease-in-out infinite',
          }}>
            Where Vision
          </span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #a855f7, #00f5ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '300% 300%',
            animation: 'textGradient 6s ease-in-out infinite',
            animationDelay: '1.5s',
          }}>
            Meets Reality
          </span>
          <motion.span
            variants={itemVariants}
            style={{
              position: 'absolute',
              right: '-80px', top: '-30px',
              fontSize: 'clamp(28px, 4vw, 48px)',
              opacity: 0.25,
            }}
            animate={{ opacity: [0.25, 0.45, 0.25], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⬟
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(16px, 2.2vw, 21px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 580,
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          We craft digital experiences that push the boundaries of design and technology.
          From concept to launch, we build the extraordinary.
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05, rotate: 0.5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span style={{ position: 'relative', zIndex: 2, fontWeight: 600 }}>Get Started Free</span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              background: 'rgba(255,255,255,0.08)',
              boxShadow: '0 0 25px rgba(255,0,255,0.25)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              padding: '16px 40px',
              borderRadius: 60,
              border: '1px solid rgba(0,245,255,0.3)',
              background: 'rgba(255,255,255,0.03)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              Watch Demo →
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{
            marginTop: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            color: 'rgba(255,255,255,0.35)',
            fontSize: 14,
          }}
        >
          <div style={{ display: 'flex', marginRight: 4 }}>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '2px solid #0a0a1a',
                  marginLeft: i === 0 ? 0 : -12,
                  background: `hsl(${190 + i * 40}, 80%, 55%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: '#fff',
                  boxShadow: `0 0 12px hsl(${190 + i * 40}, 80%, 55%)`,
                }}
              >
                {['A','J','M','K'][i]}
              </motion.div>
            ))}
          </div>
          <span>Trusted by <strong style={{ color: 'rgba(0,245,255,0.7)' }}>4,000+</strong> creators</span>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 1000,
            margin: '80px auto 0',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <motion.div
            whileHover={{ rotateX: 2, rotateY: 2 }}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(0,245,255,0.15)',
              boxShadow: '0 0 50px rgba(0,245,255,0.12)',
              background: 'rgba(10, 10, 26, 0.8)',
              backdropFilter: 'blur(20px) saturate(1.5)',
            }}
          >
            <div style={{
              padding: '16px 24px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderBottom: '1px solid rgba(0,245,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff0000' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffaa00' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#00ff88' }} />
              <span style={{
                fontSize: 13, color: 'rgba(255,255,255,0.5)',
                marginLeft: 'auto',
              }}>
                nebula-dashboard
              </span>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 16,
                marginBottom: 28,
              }}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 120, delay: 1.2 }}
                  style={{
                    background: 'rgba(0,245,255,0.05)',
                    borderRadius: 14,
                    padding: 20,
                    border: '1px solid rgba(0,245,255,0.08)',
                  }}
                >
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>Revenue</div>
                  <div style={{
                    fontSize: 24, fontWeight: 700,
                    background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    $124.5K
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 1.4 }}
                    style={{
                      height: 3,
                      background: 'linear-gradient(90, #00f5ff, #ff00ff)',
                      borderRadius: 2,
                      marginTop: 10,
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 120, delay: 1.35 }}
                  style={{
                    background: 'rgba(255,0,255,0.05)',
                    borderRadius: 14,
                    padding: 20,
                    border: '1px solid rgba(255,0,255,0.08)',
                  }}
                >
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>Users</div>
                  <div style={{
                    fontSize: 24, fontWeight: 700,
                    background: 'linear-gradient(135deg, #ff00ff, #a855f7)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    8.2K
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '90%' }}
                    transition={{ duration: 1, delay: 1.55 }}
                    style={{
                      height: 3,
                      background: 'linear-gradient(90, #ff00ff, #a855f7)',
                      borderRadius: 2,
                      marginTop: 10,
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 120, delay: 1.5 }}
                  style={{
                    background: 'rgba(0,255,136,0.05)',
                    borderRadius: 14,
                    padding: 20,
                    border: '1px solid rgba(0,255,136,0.08)',
                  }}
                >
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>Events</div>
                  <div style={{
                    fontSize: 24, fontWeight: 700,
                    background: 'linear-gradient(135deg, #00ff88, #00f5ff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    1.4K
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ duration: 1, delay: 1.7 }}
                    style={{
                      height: 3,
                      background: 'linear-gradient(90, #00ff88, #00f5ff)',
                      borderRadius: 2,
                      marginTop: 10,
                    }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.3 }}
                style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  borderRadius: 16,
                  padding: 20,
                  border: '1px solid rgba(0,245,255,0.06)',
                }}
              >
                <div style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.4)',
                  marginBottom: 16, display: 'flex',
                  alignItems: 'center', gap: 8,
                }}>
                  <span style={{
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: '#00f5ff',
                    animation: 'pulseGlow 2s ease-in-out infinite',
                  }} />
                  Realtime Analytics
                </div>

                <svg width="100%" height="140" viewBox="0 0 600 140" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(0,245,255,0.25)" />
                      <stop offset="100%" stopColor="rgba(0,245,255,0)" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, delay: 1.5, ease: 'easeInOut' }}
                    d="M20 110 C80 70 140 90 200 60 C260 40 320 70 380 50 C440 30 500 60 560 35"
                    fill="none"
                    stroke="url(#chartGrad)"
                    strokeWidth="2.5"
                  />

                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 1.8, ease: 'easeInOut' }}
                    d="M20 110 C80 70 140 90 200 60 C260 40 320 70 380 50 C440 30 500 60 560 35"
                    fill="none"
                    stroke="rgba(255,0,255,0.4)"
                    strokeWidth="1.5"
                  />

                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    d="M0 135 L600 135"
                    stroke="rgba(0,245,255,0.15)"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                  />

                  {[20, 100, 180, 260, 340, 420, 500, 560].map((cx, i) => (
                    <motion.circle
                      key={i}
                      initial={{ r: 0, opacity: 0 }}
                      animate={{ r: [0, 5, 0], opacity: [0, 0.8, 0] }}
                      transition={{
                        duration: 1.5,
                        delay: 2 + i * 0.15,
                        repeat: Infinity,
                      }}
                      cx={cx}
                      cy={i % 2 === 0 ? 70 : 85}
                      fill="rgba(0,245,255,0.8)"
                    />
                  ))}
                </svg>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 12,
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: 11,
                }}>
                  <span>00:00</span>
                  <span>Analytics</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            style={{
              position: 'absolute',
              top: '-20px', right: '5%',
              padding: '6px 14px',
              borderRadius: 20,
              background: 'rgba(0,255,136,0.12)',
              border: '1px solid rgba(0,255,136,0.3)',
              fontSize: 12,
              fontWeight: 600,
              color: '#00ff88',
              backdropFilter: 'blur(8px)',
              animation: 'pulseGlow 3s ease-in-out infinite',
              boxShadow: '0 0 15px rgba(0,255,136,0.2)',
            }}
          >
            LIVE
          </motion.div>
        </motion.div>

      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: 40,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          color: 'rgba(255,255,255,0.25)', fontSize: 13,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>Scroll Down</span>
          <motion.span
            style={{ width: 1, height: 20, background: 'rgba(0,245,255,0.2)' }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </span>
        <motion.svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          animate={{ translateY: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
