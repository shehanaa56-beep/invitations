import { motion } from 'framer-motion';
import styles from './Family.module.css';

export default function Family({ settings }) {
  return (
    <section className={styles.section} id="family">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        With Love From
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Our Families
      </motion.h2>
      <div className="heart-separator"><span className="heart-icon">♦</span></div>

      <div className={styles.grid}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.label}>BRIDE&apos;S FAMILY</span>
          <h3 className={styles.parents}>{settings?.brideParents || 'Mr. & Mrs. Rahman'}</h3>
          <p className={styles.siblings}>{settings?.brideSiblings || 'Sister: Sana · Brother: Ahmed'}</p>
        </motion.div>

        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className={styles.label}>GROOM&apos;S FAMILY</span>
          <h3 className={styles.parents}>{settings?.groomParents || 'Mr. & Mrs. Hussain'}</h3>
          <p className={styles.siblings}>{settings?.groomSiblings || 'Brother: Yusuf · Sister: Maryam'}</p>
        </motion.div>
      </div>
    </section>
  );
}
