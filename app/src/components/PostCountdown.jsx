import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SPOTIFY_URL    = 'https://open.spotify.com/intl-es/track/1u4LkwYYzc3XnXrPKrrKcg?si=727c6e9ea06744c0';
const APPLE_URL      = 'https://music.apple.com/co/album/parpadeo-single/6770698405';
const TIDAL_URL      = 'https://tidal.com/track/526016105/uy';
const TICKETS_URL    = 'https://forms.gle/NCBf1BQmbhfTtSW86';
const ARTIST_IMG     = 'https://i.scdn.co/image/ab67616d00001e0214b81b756f5fb027a10c7e40';
const VIDEO_URL      = 'https://res.cloudinary.com/dvyp2uf1s/video/upload/v1779410358/visualizer_compressed_omtltb.mp4';

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
      {/* ── Video background (Cloudinary) ── */}
      <video
        ref={videoRef}
        className="post-video"
        src={VIDEO_URL}
        loop
        muted
        playsInline
        autoPlay
      />

      {/* ── Dark overlay ── */}
      <div className="post-overlay" />

      {/* ── Content ── */}
      <motion.div
        className="post-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
      >
        {/* Cover art */}
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

        {/* Track name */}
        <motion.h1
          className="post-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          parpadeo
        </motion.h1>

        {/* Artist + year */}
        <motion.p
          className="post-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          kidchen · 2026
        </motion.p>

        {/* Streaming buttons */}
        <motion.div
          className="streaming-btns"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.6 }}
        >
          <motion.a
            href={SPOTIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="stream-btn spotify-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Spotify
          </motion.a>

          <motion.a
            href={APPLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="stream-btn apple-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Apple Music
          </motion.a>

          <motion.a
            href={TIDAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="stream-btn tidal-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Tidal
          </motion.a>
        </motion.div>

        {/* Tickets button */}
        <motion.a
          href={TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="stream-btn tickets-btn"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Boletas · 13 de Junio
        </motion.a>
      </motion.div>
    </motion.div>
  );
}


