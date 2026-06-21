import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Petal = ({ style }) => (
  <motion.div
    className={styles.petal}
    style={style}
    animate={{ y: ['0vh', '110vh'], x: [0, style.drift || 30], rotate: [0, 360], opacity: [0, 1, 1, 0] }}
    transition={{ duration: style.dur || 6, repeat: Infinity, delay: style.delay || 0, ease: 'linear' }}
  />
);

const petals = Array.from({ length: 18 }, (_, i) => ({
  style: {
    left: `${Math.random() * 100}%`,
    top: `-${Math.random() * 20}%`,
    width: `${8 + Math.random() * 12}px`,
    height: `${8 + Math.random() * 12}px`,
    delay: Math.random() * 8,
    dur: 6 + Math.random() * 6,
    drift: (Math.random() - 0.5) * 60,
    opacity: 0.4 + Math.random() * 0.4,
  }
}));

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function Hero({ settings, guestName }) {
  const weddingDate = new Date(settings?.weddingDate || '2026-12-12').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <section className={`${styles.hero} floral-corner-tr`} id="hero">
      {/* Falling petals */}
      {petals.map((p, i) => <Petal key={i} style={p.style} />)}

      <div className={styles.inner}>
        {/* Guest personalisation */}
        {guestName && (
          <motion.div
            className={styles.guestGreeting}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            <p>Dear <span className={styles.guestName}>{guestName}</span>,</p>
            <p>You are warmly invited</p>
          </motion.div>
        )}

        <motion.p className={styles.label} variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.8, delay: 0.1 }}>
          THE WEDDING OF
        </motion.p>

        <motion.h1 className={styles.brideName} variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.9, delay: 0.3 }}>
          {settings?.brideName || 'Aaliya'}
        </motion.h1>

        <motion.div className={styles.ampersand} variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7, delay: 0.5 }}>
          &amp;
        </motion.div>

        <motion.h1 className={styles.groomName} variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.9, delay: 0.7 }}>
          {settings?.groomName || 'Ibrahim'}
        </motion.h1>

        <motion.p className={styles.tagline} variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.8, delay: 0.9 }}>
          Together with their families<br />
          invite you to celebrate<br />
          their wedding ceremony
        </motion.p>

        <motion.p className={styles.date} variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.8, delay: 1.1 }}>
          {weddingDate}
        </motion.p>

        <motion.a
          href="#countdown"
          className={`btn-gold ${styles.cta}`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          View Invitation
        </motion.a>
      </div>
    </section>
  );
}
