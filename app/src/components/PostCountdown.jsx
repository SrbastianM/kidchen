import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SPOTIFY_URL = 'https://open.spotify.com/intl-es/track/1u4LkwYYzc3XnXrPKrrKcg?si=727c6e9ea06744c0';
const ARTIST_IMG  = 'https://i.scdn.co/image/ab67616d00001e0214b81b756f5fb027a10c7e40';

export default function PostCountdown() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <motion.div
      className="post-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
    >
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        className="post-video"
        src="/movie/visualizer.mp4"
        loop
        muted
        playsInline
        autoPlay
      />

      {/* ── Dark overlay so content is readable ── */}
      <div className="post-overlay" />

      {/* ── Content ── */}
      <motion.div
        className="post-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
      >
        {/* Artist image */}
        <motion.div
          className="artist-img-wrap"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.9, ease: 'easeOut' }}
        >
          <img
            src={ARTIST_IMG}
            alt="Parpadeo — Kidchen"
            className="artist-img"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="post-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          parpadeo
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="post-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          kidchen · 2026
        </motion.p>

        {/* Spotify button */}
        <motion.a
          href={SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="spotify-btn"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <SpotifyIcon />
          Escuchar Parpadeo
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

function SpotifyIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.318a.75.75 0 01-1.032.25c-2.824-1.726-6.38-2.116-10.567-1.16a.75.75 0 01-.334-1.463c4.583-1.047 8.516-.596 11.683 1.341a.75.75 0 01.25 1.032zm1.472-3.27a.937.937 0 01-1.288.308c-3.23-1.985-8.155-2.56-11.977-1.402a.937.937 0 01-.543-1.793c4.368-1.323 9.795-.682 13.5 1.598a.937.937 0 01.308 1.289zm.127-3.408C15.37 8.39 9.386 8.188 5.82 9.267a1.125 1.125 0 01-.652-2.151c4.125-1.25 10.977-1.008 15.306 1.597a1.125 1.125 0 01-1.159 1.927z" />
    </svg>
  );
}
