import { motion } from 'framer-motion';
import styles from './Couple.module.css';

const PersonCard = ({ name, role, parents, tagline, image, delay }) => (
  <motion.div
    className={styles.card}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.8, delay }}
  >
    <div className={styles.photoRing}>
      <img src={image} alt={name} className={styles.photo} />
    </div>
    <h3 className={styles.name}>{name}</h3>
    <p className={styles.role}>{role}</p>
    <p className={styles.parents}>{parents}</p>
    <p className={styles.tagline}>{tagline}</p>
  </motion.div>
);

export default function Couple({ settings }) {
  return (
    <section className={`${styles.section} floral-corner-bl`} id="couple">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        The Beloved
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Bride &amp; Groom
      </motion.h2>
      <div className="heart-separator"><span className="heart-icon">♦</span></div>
      <div className={styles.grid}>
        <PersonCard
          name={settings?.brideName || 'Aaliya'}
          role="THE BRIDE"
          parents={`Daughter of ${settings?.brideParents || 'Mr. & Mrs. Rahman'}`}
          tagline={settings?.brideTagline || 'A heart full of grace, dreams as soft as petals.'}
          image="/images/bride.png"
          delay={0}
        />
        <PersonCard
          name={settings?.groomName || 'Ibrahim'}
          role="THE GROOM"
          parents={`Son of ${settings?.groomParents || 'Mr. & Mrs. Hussain'}`}
          tagline={settings?.groomTagline || 'A gentleman with a kind soul and steady love.'}
          image="/images/groom.png"
          delay={0.15}
        />
      </div>
    </section>
  );
}
