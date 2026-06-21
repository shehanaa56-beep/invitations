import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import styles from './Gallery.module.css';

const galleryImages = [
  { src: '/images/wedding_stage.png', alt: 'Wedding Stage' },
  { src: '/images/wedding_rings.png', alt: 'Wedding Rings' },
  { src: '/images/bride.png', alt: 'Bride' },
  { src: '/images/groom.png', alt: 'Groom' },
  { src: '/images/wedding_stage.png', alt: 'Floral Decor' },
  { src: '/images/wedding_rings.png', alt: 'Engagement Ring' },
  { src: '/images/bride.png', alt: 'Bridal Portrait' },
  { src: '/images/wedding_stage.png', alt: 'Reception Hall' },
  { src: '/images/wedding_rings.png', alt: 'Rose Ring' },
  { src: '/images/groom.png', alt: 'Groom Portrait' },
  { src: '/images/wedding_stage.png', alt: 'Stage Lights' },
  { src: '/images/bride.png', alt: 'Bride Detail' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className={styles.section} id="gallery">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Moments
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Our Gallery
      </motion.h2>
      <div className="heart-separator"><span className="heart-icon">♦</span></div>

      <div className={styles.masonry}>
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            className={styles.item}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            onClick={() => setLightbox(i)}
            whileHover={{ scale: 1.03 }}
          >
            <img src={img.src} alt={img.alt} className={styles.img} loading="lazy" />
            <div className={styles.overlay}><span className={styles.zoomIcon}>+</span></div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
          >
            <button className={styles.closeBtn} onClick={() => setLightbox(null)}>✕</button>
            <Swiper
              modules={[Navigation, Zoom]}
              navigation
              zoom
              initialSlide={lightbox}
              className={styles.swiper}
            >
              {galleryImages.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="swiper-zoom-container">
                    <img src={img.src} alt={img.alt} className={styles.lightboxImg} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
