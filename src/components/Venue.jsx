import { motion } from 'framer-motion';
import styles from './Venue.module.css';

export default function Venue({ settings }) {
  const venue = settings?.venue || 'Grand Pearl Banquet';
  const address = settings?.venueAddress || 'Grand Pearl Banquet, 24 Rose Avenue, Garden District';
  const mapsUrl = settings?.venueMapsUrl || 'https://maps.google.com/?q=Grand+Pearl+Banquet';
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section className={styles.section} id="venue">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        The Place
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Venue
      </motion.h2>
      <div className="heart-separator"><span className="heart-icon">♦</span></div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.mapWrap}>
          <iframe
            title="Venue Map"
            src={mapEmbed}
            className={styles.map}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <h3 className={styles.venueName}>{venue}</h3>
        <p className={styles.address}>{address}</p>
        <div className={styles.btns}>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className={`btn-gold ${styles.btn}`}>
            Open in Maps
          </a>
          <a href={directionsUrl} target="_blank" rel="noreferrer" className={`btn-outline-rose ${styles.btn}`}>
            Get Directions
          </a>
        </div>
      </motion.div>
    </section>
  );
}
