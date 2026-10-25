import { motion } from 'framer-motion'

export default function Cta() {
  return (
    <section id="cta" style={{ padding: '60px 24px 140px', maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
      <div className="grid-pattern" style={{ animation: 'gridMove 30s linear infinite' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          borderRadius: 36,
          padding: '100px 48px',
          textAlign: 'center',
          overflow: 'hidden',
          border: '1px solid rgba(0,245,255,0.1)',
          boxShadow: '0 0 60px rgba(0,245,255,0.08)',
        }}
      >
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 340, height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,255,0.25) 0%, transparent 70%)',
            top: -100, left: -80,
            pointerEvents: 'none',
            filter: 'blur(2px)',
          }}
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute',
            width: 300, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,255,0.22) 0%, transparent 70%)',
            bottom: -80, right: -60,
            pointerEvents: 'none',
            filter: 'blur(2px)',
          }}
        />

        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: 600, height: 600,
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(0,245,255,0.03)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20, letterSpacing: '-2px' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(34px, 6vw, 60px)',
              fontWeight: 800,
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              marginBottom: 22,
            }}
          >
            Ready to Build Something{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(135deg, #fff, #c4b5fd)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'textGradient 4s ease-in-out infinite',
              }}
            >
              Extraordinary?
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 18,
              maxWidth: 520,
              margin: '0 auto 48px',
            }}
          >
            Join thousands of creators building the future with Nebula. No credit card required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
            style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 35px rgba(0,245,255,0.5), 0 0 60px rgba(255,0,255,0.3)',
                rotate: 0.5,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="btn-primary"
            >
              <span style={{ position: 'relative', zIndex: 2, fontWeight: 600 }}>Start Building Free</span>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                background: 'rgba(0,245,255,0.08)',
                borderColor: 'rgba(0,245,255,0.4)',
                boxShadow: '0 0 25px rgba(0,245,255,0.25)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 250 }}
              style={{
                padding: '18px 40px',
                borderRadius: 60,
                border: '1px solid rgba(0,245,255,0.25)',
                background: 'rgba(0,245,255,0.03)',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Talk to Sales
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
