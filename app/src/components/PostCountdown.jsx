import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SPOTIFY_URL    = 'https://open.spotify.com/intl-es/track/1u4LkwYYzc3XnXrPKrrKcg?si=727c6e9ea06744c0';
const APPLE_URL      = 'https://music.apple.com/co/album/parpadeo-single/6770698405';
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
            <SpotifyIcon />
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
            <AppleMusicIcon />
            Apple Music
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function SpotifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.318a.75.75 0 01-1.032.25c-2.824-1.726-6.38-2.116-10.567-1.16a.75.75 0 01-.334-1.463c4.583-1.047 8.516-.596 11.683 1.341a.75.75 0 01.25 1.032zm1.472-3.27a.937.937 0 01-1.288.308c-3.23-1.985-8.155-2.56-11.977-1.402a.937.937 0 01-.543-1.793c4.368-1.323 9.795-.682 13.5 1.598a.937.937 0 01.308 1.289zm.127-3.408C15.37 8.39 9.386 8.188 5.82 9.267a1.125 1.125 0 01-.652-2.151c4.125-1.25 10.977-1.008 15.306 1.597a1.125 1.125 0 01-1.159 1.927z" />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81 1.268-.834 2.032-1.99 2.253-3.485.076-.51.108-1.03.115-1.543.003-.06.01-.12.013-.18V6.124zm-6.847 1.99l-5.773 3.337a.734.734 0 01-.73 0L5.87 8.114a.734.734 0 010-1.27l5.774-3.337a.734.734 0 01.73 0l5.773 3.337a.734.734 0 010 1.27zm-9.03 2.18l4.527 2.614v5.228a.734.734 0 01-1.1.635L6.117 15.54a.734.734 0 01-.367-.635V10.93a.734.734 0 01.367-.635zm9.03 0a.734.734 0 01.367.635v4.975a.734.734 0 01-.367.635l-4.527 2.614V13.93l4.527-2.614z" />
    </svg>
  );
}
