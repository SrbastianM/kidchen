import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Target: Thursday May 21, 2026 at 7:11 PM (local time)
const TARGET = new Date(2026, 4, 21, 19, 11, 0, 0);

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET - now;
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function TimeUnit({ value, label }) {
  const prev = useRef(value);
  const changed = prev.current !== value;
  prev.current = value;

  return (
    <div className="time-unit">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          className="time-value"
          data-value={pad(value)}
          initial={changed ? { y: -20, opacity: 0, scale: 0.85 } : false}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {pad(value)}
        </motion.div>
      </AnimatePresence>
      <span className="time-label">{label}</span>
    </div>
  );
}

function Separator() {
  return <span className="separator">:</span>;
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <motion.div
        className="expired-text"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        ✦ IT'S TIME ✦
      </motion.div>
    );
  }

  return (
    <motion.div
      className="countdown-wrapper"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <motion.p
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        ✦ &nbsp; kidchen &nbsp; ✦
      </motion.p>

      <div className="countdown-grid">
        <TimeUnit value={time.days}    label="días" />
        <Separator />
        <TimeUnit value={time.hours}   label="horas" />
        <Separator />
        <TimeUnit value={time.minutes} label="minutos" />
        <Separator />
        <TimeUnit value={time.seconds} label="segundos" />
      </div>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        jueves 21 de mayo · 7:11 pm
      </motion.p>
    </motion.div>
  );
}
