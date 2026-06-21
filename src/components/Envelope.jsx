import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Envelope.module.css';

const Pearl = ({ x, y, size, delay }) => (
  <motion.div
    className={styles.pearl}
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    animate={{ y: [0, -15, 0], x: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const pearls = [
  { x: 8,  y: 20, size: 12, delay: 0   },
  { x: 15, y: 60, size: 8,  delay: 0.5 },
  { x: 78, y: 15, size: 10, delay: 1   },
  { x: 85, y: 55, size: 14, delay: 0.3 },
  { x: 25, y: 80, size: 9,  delay: 1.5 },
  { x: 70, y: 75, size: 11, delay: 0.8 },
  { x: 50, y: 8,  size: 7,  delay: 1.2 },
  { x: 92, y: 35, size: 10, delay: 0.6 },
  { x: 5,  y: 42, size: 13, delay: 1.8 },
  { x: 60, y: 90, size: 8,  delay: 0.2 },
];

const Particle = ({ x, y, delay }) => (
  <motion.div
    className={styles.particle}
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{ duration: 2, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const particles = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 3,
}));

export default function Envelope({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle | breaking | opening | done
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/background.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    return () => audioRef.current?.pause();
  }, []);

  const handleSealClick = async () => {
    if (phase !== 'idle') return;
    setPhase('breaking');

    // Start audio
    try {
      await audioRef.current.play();
      let vol = 0;
      const fade = setInterval(() => {
        vol = Math.min(vol + 0.05, 0.6);
        audioRef.current.volume = vol;
        if (vol >= 0.6) clearInterval(fade);
      }, 150);
    } catch {}

    setTimeout(() => setPhase('opening'), 600);
    setTimeout(() => {
      setPhase('done');
      onOpen(audioRef.current);
    }, 2400);
  };

  return (
    <div className={styles.wrapper}>
      {/* Background particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Pearls */}
      {pearls.map((p, i) => <Pearl key={i} {...p} />)}

      {/* Islamic header */}
      <motion.div
        className={styles.bismillah}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <p className={styles.bismillahLine1}>In the Name of Allah,</p>
        <p className={styles.bismillahLine2}>The Most Gracious, The Most Merciful</p>
      </motion.div>

      {/* Envelope */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className={styles.envelopeContainer}
            animate={
              phase === 'idle' ? { y: [0, -12, 0] } :
              phase === 'opening' ? { y: -20 } : {}
            }
            transition={
              phase === 'idle'
                ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.4 }
            }
            exit={{ scale: 0.8, opacity: 0, y: -60, transition: { duration: 0.5 } }}
          >
            {/* Envelope body */}
            <div className={styles.envelope}>
              {/* Flap */}
              <motion.div
                className={styles.flap}
                animate={phase === 'opening' ? { rotateX: -160 } : { rotateX: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              />

              {/* Envelope front decoration lines */}
              <div className={styles.envLeft} />
              <div className={styles.envRight} />
              <div className={styles.envBottom} />

              {/* Wax Seal */}
              <motion.div
                className={`${styles.seal} ${phase === 'breaking' ? styles.sealBreaking : ''}`}
                whileHover={phase === 'idle' ? { scale: 1.08, boxShadow: '0 8px 25px rgba(180,50,80,0.5)' } : {}}
                whileTap={phase === 'idle' ? { scale: 0.95 } : {}}
                onClick={handleSealClick}
                animate={phase === 'breaking' ? { scale: [1, 1.2, 0], rotate: [0, 15, -15] } : {}}
                transition={{ duration: 0.5 }}
              >
                {/* Rose Flower SVG */}
                <svg viewBox="0 0 80 80" className={styles.roseSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer petals - 6 large petals */}
                  <path d="M40 10 C36 18 30 20 28 28 C26 36 30 44 40 46 C50 44 54 36 52 28 C50 20 44 18 40 10Z" fill="rgba(255,255,255,0.22)" />
                  <path d="M40 10 C44 18 50 20 52 28 C54 36 50 44 40 46 C30 44 26 36 28 28 C30 20 36 18 40 10Z" fill="rgba(255,255,255,0.15)" />
                  <path d="M14 28 C22 28 28 24 32 28 C36 32 36 40 30 46 C22 48 14 42 12 34 C10 28 14 26 14 28Z" fill="rgba(255,255,255,0.22)" />
                  <path d="M66 28 C58 28 52 24 48 28 C44 32 44 40 50 46 C58 48 66 42 68 34 C70 28 66 26 66 28Z" fill="rgba(255,255,255,0.22)" />
                  <path d="M19 58 C24 52 24 44 30 42 C36 40 44 44 46 52 C44 60 36 66 28 64 C20 62 18 60 19 58Z" fill="rgba(255,255,255,0.22)" />
                  <path d="M61 58 C56 52 56 44 50 42 C44 40 36 44 34 52 C36 60 44 66 52 64 C60 62 62 60 61 58Z" fill="rgba(255,255,255,0.22)" />

                  {/* Mid petals */}
                  <path d="M40 20 C37 25 33 26 32 31 C31 36 34 41 40 42 C46 41 49 36 48 31 C47 26 43 25 40 20Z" fill="rgba(255,255,255,0.3)" />
                  <path d="M22 34 C27 33 30 29 34 31 C38 33 39 39 36 43 C30 47 22 44 20 38 C18 34 21 34 22 34Z" fill="rgba(255,255,255,0.3)" />
                  <path d="M58 34 C53 33 50 29 46 31 C42 33 41 39 44 43 C50 47 58 44 60 38 C62 34 59 34 58 34Z" fill="rgba(255,255,255,0.3)" />
                  <path d="M28 52 C31 47 30 42 34 40 C38 38 44 41 45 47 C43 53 37 57 31 55 C27 53 27 52 28 52Z" fill="rgba(255,255,255,0.3)" />
                  <path d="M52 52 C49 47 50 42 46 40 C42 38 36 41 35 47 C37 53 43 57 49 55 C53 53 53 52 52 52Z" fill="rgba(255,255,255,0.3)" />

                  {/* Inner petals */}
                  <path d="M40 26 C38 29 35 30 35 34 C35 38 37 41 40 41 C43 41 45 38 45 34 C45 30 42 29 40 26Z" fill="rgba(255,255,255,0.45)" />
                  <path d="M29 36 C32 35 34 32 36 34 C38 36 38 40 35 42 C31 43 27 41 27 37 C27 35 29 36 29 36Z" fill="rgba(255,255,255,0.45)" />
                  <path d="M51 36 C48 35 46 32 44 34 C42 36 42 40 45 42 C49 43 53 41 53 37 C53 35 51 36 51 36Z" fill="rgba(255,255,255,0.45)" />
                  <path d="M33 47 C35 44 35 41 37 40 C39 39 43 41 43 45 C42 49 38 51 35 50 C32 48 32 48 33 47Z" fill="rgba(255,255,255,0.45)" />
                  <path d="M47 47 C45 44 45 41 43 40 C41 39 37 41 37 45 C38 49 42 51 45 50 C48 48 48 48 47 47Z" fill="rgba(255,255,255,0.45)" />

                  {/* Center bud */}
                  <circle cx="40" cy="37" r="6" fill="rgba(255,255,255,0.55)" />
                  <circle cx="40" cy="37" r="3.5" fill="rgba(255,255,255,0.8)" />
                  <circle cx="40" cy="37" r="1.5" fill="rgba(255,255,255,1)" />

                  {/* Leaves */}
                  <path d="M40 62 C38 58 34 56 32 60 C30 64 34 68 38 66 C40 65 40 62 40 62Z" fill="rgba(255,255,255,0.25)" />
                  <path d="M40 62 C42 58 46 56 48 60 C50 64 46 68 42 66 C40 65 40 62 40 62Z" fill="rgba(255,255,255,0.25)" />
                  <line x1="40" y1="62" x2="40" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.div>
            </div>

            {/* Sparkles on open */}
            {phase === 'opening' && (
              <div className={styles.sparkles}>
                {Array.from({ length: 12 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={styles.sparkle}
                    style={{ '--angle': `${i * 30}deg` }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], x: [0, Math.cos(i * 30 * Math.PI / 180) * 80], y: [0, Math.sin(i * 30 * Math.PI / 180) * 80] }}
                    transition={{ duration: 0.8, delay: i * 0.03 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap to open hint */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.p
            className={styles.tapHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            exit={{ opacity: 0 }}
          >
            Tap the seal to open
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
