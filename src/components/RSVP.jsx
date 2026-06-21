import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitRSVP } from '../services/firebase';
import styles from './RSVP.module.css';

export default function RSVP() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', guests: '1', attending: 'Joyfully Accept', message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus('loading');
    try {
      await submitRSVP(form);
      setStatus('success');
      setForm({ name: '', phone: '', email: '', guests: '1', attending: 'Joyfully Accept', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className={`${styles.section} floral-scattered`} id="rsvp">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Will You Join Us?
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        RSVP
      </motion.h2>
      <div className="heart-separator"><span className="heart-icon">♦</span></div>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <input id="rsvp-name" className={styles.input} type="text" placeholder="Your name" value={form.name} onChange={e => update('name', e.target.value)} required />
        <input id="rsvp-phone" className={styles.input} type="tel" placeholder="Phone number" value={form.phone} onChange={e => update('phone', e.target.value)} required />
        <input id="rsvp-email" className={styles.input} type="email" placeholder="Email (optional)" value={form.email} onChange={e => update('email', e.target.value)} />

        <div className={styles.row}>
          <div className={styles.selectWrap}>
            <select id="rsvp-guests" className={styles.select} value={form.guests} onChange={e => update('guests', e.target.value)}>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div className={styles.selectWrap}>
            <select id="rsvp-attending" className={styles.select} value={form.attending} onChange={e => update('attending', e.target.value)}>
              <option>Joyfully Accept</option>
              <option>Regretfully Decline</option>
            </select>
          </div>
        </div>

        <textarea id="rsvp-message" className={styles.textarea} placeholder="Leave a sweet message..." value={form.message} onChange={e => update('message', e.target.value)} rows={4} />

        {status === 'success' && <p className={styles.success}>🌸 Thank you! We can&apos;t wait to celebrate with you.</p>}
        {status === 'error'   && <p className={styles.error}>Something went wrong. Please try again.</p>}

        <motion.button
          id="rsvp-submit"
          type="submit"
          className={`btn-gold ${styles.submitBtn}`}
          disabled={status === 'loading'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'loading' ? 'Sending...' : 'SEND RSVP'}
        </motion.button>
      </motion.form>
    </section>
  );
}
