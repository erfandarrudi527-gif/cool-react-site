import { motion } from 'framer-motion'

const links = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog'],
  Company: ['About', 'Careers', 'Blog', 'Press'],
  Resources: ['Documentation', 'Community', 'Support', 'Status'],
}

const socialLinks = [
  { name: 'Twitter', color: '#1da1f2' },
  { name: 'LinkedIn', color: '#00f5ff' },
  { name: 'GitHub', color: '#ff00ff' },
  { name: 'YouTube', color: '#ff0000' },
]

export default function Footer() {
  return (
    <footer style={{
      padding: '80px 48px 40px',
      borderTop: '1px solid rgba(0,245,255,0.08)',
      background: 'rgba(10, 10, 26, 0.4)',
      backdropFilter: 'blur(20px) saturate(1.5)',
      position: 'relative',
    }}>
      <div className="grid-pattern" style={{ animation: 'gridMove 50s linear infinite' }} />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: 48,
        position: 'relative',
        zIndex: 2,
      }}
        className="footer-grid"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1, boxShadow: '0 0 20px rgba(0,245,255,0.4)' }}
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 18, color: '#fff',
              }}
            >
              N
            </motion.div>
            <span style={{
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Nebula
            </span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 14, maxWidth: 280,
              marginBottom: 28, lineHeight: 1.7,
            }}
          >
            Creating the extraordinary. A modern platform for the world's most ambitious teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: 14 }}
          >
            {socialLinks.map((s, i) => (
              <motion.div
                key={s.name}
                whileHover={{
                  scale: 1.15,
                  rotate: i % 2 === 0 ? 5 : -5,
                  boxShadow: `0 0 18px ${s.color}50`,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(0,245,255,0.15)',
                  background: 'rgba(10,10,26,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 16,
                  overflow: 'hidden',
                }}
              >
                <motion.span
                  style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {s.name[0]}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {Object.entries(links).map(([col, items], colIdx) => (
          <motion.div
            key={col}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 + colIdx * 0.12 }}
          >
            <motion.h4
              whileHover={{ x: 5, color: 'rgba(0,245,255,0.8)' }}
              style={{
                fontSize: 14, fontWeight: 600,
                marginBottom: 18,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {col}
            </motion.h4>
            {items.map((link) => (
              <motion.a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                whileHover={{ x: 6, color: 'rgba(0,245,255,0.85)' }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 + colIdx * 0.12 }}
                style={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 14,
                  marginBottom: 12,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  cursor: 'pointer',
                }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          maxWidth: 1200,
          margin: '60px auto 0',
          paddingTop: 24,
          borderTop: '1px solid rgba(0,245,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          color: 'rgba(255,255,255,0.3)',
          fontSize: 13,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <motion.span
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#00ff88',
            }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          © 2026 Nebula Inc. All rights reserved.
        </motion.span>
        <div style={{ display: 'flex', gap: 24 }}>
          <motion.span
            whileHover={{
              x: 3,
              color: 'rgba(0,245,255,0.7)',
            }}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{ cursor: 'pointer' }}
          >
            Privacy Policy
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 }}
            style={{ cursor: 'pointer' }}
          >
            Terms of Service
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            EN 🇺🇸
          </motion.span>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
