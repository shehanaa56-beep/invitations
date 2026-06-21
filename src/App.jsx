import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Envelope from './components/Envelope';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Venue from './components/Venue';
import Family from './components/Family';
import RSVP from './components/RSVP';
import Share from './components/Share';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import ContactFloating from './components/ContactFloating';
import Admin from './components/Admin';

import { getSettings } from './services/firebase';

function InvitationPage() {
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('guest');

  const [opened, setOpened] = useState(false);
  const [settings, setSettings] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    getSettings().then(setSettings);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleOpen = (audio) => {
    audioRef.current = audio;
    setTimeout(() => setOpened(true), 400);
  };

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence>
        {!opened && <Envelope onOpen={handleOpen} />}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Hero settings={settings} guestName={guestName} />
            <Countdown settings={settings} />
            <Timeline />
            <Gallery />
            <Events settings={settings} />
            <Venue settings={settings} />
            <Family settings={settings} />
            <RSVP />
            <Share settings={settings} />
            <Footer settings={settings} />
            <MusicPlayer audioRef={audioRef} />
            <ContactFloating settings={settings} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<InvitationPage />} />
        <Route path="/invitation" element={<InvitationPage />} />
        <Route path="/admin"      element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
