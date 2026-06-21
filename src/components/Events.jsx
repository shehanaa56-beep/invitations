import { motion } from 'framer-motion';
import { GiFlowerEmblem, GiDiamondRing } from 'react-icons/gi';
import { FaHeart, FaStar } from 'react-icons/fa';
import styles from './Events.module.css';

const ICONS = { leaf: GiFlowerEmblem, heart: FaHeart, star: FaStar, ring: GiDiamondRing };

const defaultEvents = [
  { id: 'mehendi',   name: 'Mehendi',   icon: 'leaf',  date: 'Dec 10, 2026', time: '4:00 PM', venue: 'Rose Garden Hall' },
  { id: 'nikah',     name: 'Nikah',     icon: 'heart', date: 'Dec 12, 2026', time: '5:00 PM', venue: 'Grand Pearl Banquet' },
  { id: 'reception', name: 'Reception', icon: 'star',  date: 'Dec 13, 2026', time: '7:00 PM', venue: 'Crystal Ballroom' },
];

const EventCard = ({ event, index }) => {
  const Icon = ICONS[event.icon] || FaHeart;
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(233,184,196,0.4)' }}
    >
      <div className={styles.header}>
        <div className={styles.iconWrap}><Icon className={styles.icon} /></div>
        <div>
          <h3 className={styles.name}>{event.name}</h3>
          <span className={styles.date}>{event.date}</span>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>TIME</span>
          <span className={styles.detailVal}>{event.time}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>VENUE</span>
          <span className={styles.detailVal}>{event.venue}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Events({ settings }) {
  const events = settings?.events || defaultEvents;
  return (
    <section className={`${styles.section} floral-corner-tr`} id="events">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Save the Dates
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Wedding Events
      </motion.h2>
      <div className="heart-separator"><span className="heart-icon">♦</span></div>
      <div className={styles.list}>
        {events.map((ev, i) => <EventCard key={ev.id || i} event={ev} index={i} />)}
      </div>
    </section>
  );
}
