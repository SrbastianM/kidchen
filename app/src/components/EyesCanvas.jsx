import { useEffect, useRef } from 'react';

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createEye(canvasW, canvasH) {
  const size = randomBetween(60, 180);
  return {
    baseX: randomBetween(size * 0.5, canvasW - size * 0.5),
    baseY: randomBetween(size * 0.5, canvasH - size * 0.5),
    size,

    // drift — very slow, organic
    driftAngle: Math.random() * Math.PI * 2,
    driftSpeed: randomBetween(0.00015, 0.0004),
    driftRadius: randomBetween(8, 30),

    // pupil wander — slow circular path
    lookAngle: Math.random() * Math.PI * 2,
    lookSpeed: randomBetween(0.0002, 0.0007),

    // blink
    blinkProgress: 0,   // 0 open → 1 closed
    blinkDir: 0,
    blinkTimer: randomBetween(2000, 9000),
    blinkSpeed: randomBetween(0.025, 0.06),

    // base opacity — very low so it barely shows
    opacity: randomBetween(0.04, 0.10),

    // slow fade in/out breathing
    breathPhase: Math.random() * Math.PI * 2,
    breathSpeed: randomBetween(0.0003, 0.0008),
  };
}

export default function EyesCanvas() {
  const canvasRef = useRef(null);
  const eyesRef  = useRef([]);
  const rafRef   = useRef(null);
  const lastRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const area  = canvas.width * canvas.height;
      const count = Math.max(3, Math.min(Math.floor(area / 90000), 8));
      eyesRef.current = Array.from({ length: count }, () =>
        createEye(canvas.width, canvas.height)
      );
    }

    resize();
    window.addEventListener('resize', resize);

    /* ─── draw one ghost eye ─── */
    function drawEye(eye, delta) {
      const { size } = eye;

      // advance timers
      eye.driftAngle  += eye.driftSpeed  * delta;
      eye.lookAngle   += eye.lookSpeed   * delta;
      eye.breathPhase += eye.breathSpeed * delta;

      const cx = eye.baseX + Math.cos(eye.driftAngle) * eye.driftRadius;
      const cy = eye.baseY + Math.sin(eye.driftAngle * 0.6) * eye.driftRadius * 0.5;

      // breathing opacity modulation
      const breathMod = 0.5 + 0.5 * Math.sin(eye.breathPhase); // 0..1
      const baseAlpha = eye.opacity * (0.5 + 0.5 * breathMod);

      // blink
      eye.blinkTimer -= delta;
      if (eye.blinkTimer <= 0 && eye.blinkDir === 0) eye.blinkDir = 1;
      if (eye.blinkDir === 1) {
        eye.blinkProgress += eye.blinkSpeed;
        if (eye.blinkProgress >= 1) { eye.blinkProgress = 1; eye.blinkDir = -1; }
      } else if (eye.blinkDir === -1) {
        eye.blinkProgress -= eye.blinkSpeed;
        if (eye.blinkProgress <= 0) {
          eye.blinkProgress = 0;
          eye.blinkDir  = 0;
          eye.blinkTimer = randomBetween(2000, 10000);
        }
      }

      // vertical squish for blink (0 = open, 1 = closed)
      const openness = 1 - eye.blinkProgress;

      // pupil wander offset
      const lookDist = size * 0.16;
      const lx = Math.cos(eye.lookAngle) * lookDist;
      const ly = Math.sin(eye.lookAngle) * lookDist;

      ctx.save();
      ctx.globalAlpha = baseAlpha;
      ctx.translate(cx, cy);

      // ── sclera (almond shape) ──
      // clip to almond so iris/pupil don't bleed outside
      ctx.save();
      ctx.scale(1, openness * 0.55); // almond vertical ratio × blink
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.55, 0, 0, Math.PI * 2);
      ctx.clip();

      // sclera fill — barely visible, just a whisper of light
      const scleraGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      scleraGrad.addColorStop(0,   'rgba(255,252,255,0.18)');
      scleraGrad.addColorStop(0.6, 'rgba(192,132,252,0.06)');
      scleraGrad.addColorStop(1,   'rgba(45,0,96,0)');
      ctx.fillStyle = scleraGrad;
      ctx.fillRect(-size, -size, size * 2, size * 2);

      // ── iris ──
      const irisR = size * 0.38;
      const irisGrad = ctx.createRadialGradient(lx * 0.2, ly * 0.2, 0, lx * 0.2, ly * 0.2, irisR);
      irisGrad.addColorStop(0,   'rgba(155,48,255,0.22)');
      irisGrad.addColorStop(0.5, 'rgba(90,0,180,0.12)');
      irisGrad.addColorStop(1,   'rgba(13,0,32,0)');
      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.arc(lx, ly, irisR, 0, Math.PI * 2);
      ctx.fill();

      // ── pupil ──
      const pupilR = size * 0.16;
      const pupilGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, pupilR);
      pupilGrad.addColorStop(0,   'rgba(13,0,32,0.55)');
      pupilGrad.addColorStop(0.7, 'rgba(26,0,53,0.25)');
      pupilGrad.addColorStop(1,   'rgba(13,0,32,0)');
      ctx.fillStyle = pupilGrad;
      ctx.beginPath();
      ctx.arc(lx, ly, pupilR, 0, Math.PI * 2);
      ctx.fill();

      // ── tiny specular glint ──
      ctx.fillStyle = 'rgba(255,252,255,0.35)';
      ctx.beginPath();
      ctx.arc(lx - pupilR * 0.35, ly - pupilR * 0.35, pupilR * 0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // remove clip + scale

      // ── outer ambient glow (outside clip) ──
      const glowGrad = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size * 1.4);
      glowGrad.addColorStop(0,   'rgba(122,0,255,0.06)');
      glowGrad.addColorStop(0.5, 'rgba(90,0,180,0.03)');
      glowGrad.addColorStop(1,   'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 1.4, size * 1.4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function tick(now) {
      const delta = now - lastRef.current;
      lastRef.current = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const eye of eyesRef.current) {
        drawEye(eye, delta);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
