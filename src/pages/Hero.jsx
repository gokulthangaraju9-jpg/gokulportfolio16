import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShieldAlt, FaDownload, FaGithub, FaLinkedin, FaTwitter, FaEnvelope,
  FaTrophy, FaCode, FaArrowDown,
  FaPalette, FaStar, FaSlidersH, FaLayerGroup, FaMagic,
  FaEdit, FaFilm, FaPhotoVideo, FaCropAlt, FaPenNib, FaLaptopCode, FaPlay, FaTimes,
  FaGoogleDrive
} from 'react-icons/fa';
import { BiShield } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import gsap from 'gsap';


/* ═══════════════════════════════════════
   PALETTE: #FF6D00 · #C63702 · #FFB300 · #FFF8E7
═══════════════════════════════════════ */
const C = {
  navy: '#C63702',
  navyDk: '#2E1305',
  mid: '#FF6D00',
  light: '#FFE0B2',
  cream: '#FFF8E7',
  white: '#FFFFFF',
  amber: '#FFB300',
};

const G_CREAM = { background: `rgba(255,248,231,0.94)`, backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', border: `1px solid rgba(255,255,255,0.85)` };
const G_NAVY = { background: `rgba(198,55,2,0.95)`, backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', border: `1px solid rgba(255,255,255,0.25)` };
const G_LIGHT = { background: `rgba(255,224,178,0.50)`, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: `1px solid rgba(255,255,255,0.50)` };

/* ── Typewriter (NO cursor) ── */
function useTypewriter(words) {
  const [txt, setTxt] = useState(words[0]);
  const s = useRef({ w: 0, c: words[0].length, del: false, pause: false });
  useEffect(() => {
    let t;
    const tick = () => {
      const { w, c, del, pause } = s.current;
      if (pause) { s.current.pause = false; t = setTimeout(tick, 2000); return; }
      const word = words[w];
      if (!del) {
        setTxt(word.slice(0, c + 1));
        if (c + 1 === word.length) { s.current = { w, c: c + 1, del: true, pause: true }; t = setTimeout(tick, 80); }
        else { s.current = { ...s.current, c: c + 1 }; t = setTimeout(tick, 80); }
      } else {
        setTxt(word.slice(0, c - 1));
        if (c - 1 === 0) { s.current = { w: (w + 1) % words.length, c: 0, del: false, pause: false }; t = setTimeout(tick, 80); }
        else { s.current = { ...s.current, c: c - 1 }; t = setTimeout(tick, 42); }
      }
    };
    t = setTimeout(tick, 2200);
    return () => clearTimeout(t);
  }, [words]);
  return txt;
}

/* ── Floating card ── */
const Card = ({ icon: Icon, imgSrc, title, sub, dark, pos }) => (
  <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 16, minWidth: 176, boxShadow: '0 10px 36px rgba(51,104,160,0.26)', zIndex: 30, ...(dark ? G_NAVY : G_CREAM), ...pos }}>
    <div style={{ width: 36, height: 36, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: dark ? 'rgba(255,255,255,0.15)' : `rgba(51,104,160,0.12)`, padding: imgSrc ? 5 : 0 }}>
      {imgSrc ? (
        <img src={imgSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      ) : Icon ? (
        <Icon style={{ fontSize: 16, color: dark ? C.cream : C.navy }} />
      ) : null}
    </div>
    <div>
      <p style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2, color: dark ? C.white : C.navy }}>{title}</p>
      <p style={{ fontSize: 11, color: dark ? '#bfdbfe' : C.mid }}>{sub}</p>
    </div>
  </div>
);

/* ── Social button ── */
const Soc = ({ icon: Icon, href }) => (
  <a href={href} target="_blank" rel="noreferrer"
    style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', ...G_CREAM, boxShadow: '0 4px 14px rgba(51,104,160,0.18)', color: C.navy, transition: 'all 0.2s', textDecoration: 'none' }}
    onMouseEnter={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = '#fff'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(242,239,231,0.93)'; e.currentTarget.style.color = C.navy; }}>
    <Icon style={{ fontSize: 15 }} />
  </a>
);

export default function Hero() {
  const ref = useRef(null);
  const role = useTypewriter(['UI/UX Design', 'Creative Graphic Designer', 'Video Editor']);
  const [displayMode, setDisplayMode] = useState('editor');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hf', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.60, stagger: 0.10, ease: 'power3.out', delay: 0.15 });
      gsap.fromTo('.hr', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.80, ease: 'power2.out', delay: 0.45 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: '100vh', paddingTop: 76, paddingBottom: 24, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* ── Top-right deco ── */}
      <div style={{ position: 'absolute', top: 82, right: 28, textAlign: 'right', lineHeight: 1.65, userSelect: 'none', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginBottom: 2 }}>
          <div style={{ width: 28, height: 2, borderRadius: 2, background: `rgba(37,79,122,0.50)` }} />
          <span style={{ color: C.navyDk, fontWeight: 900, fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase' }}>Creative</span>
        </div>
        {['Digital World', 'Tomorrow'].map(w => <p key={w} style={{ color: C.navyDk, fontWeight: 900, fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase' }}>{w}</p>)}
      </div>

      {/* ── Bottom-right deco ── */}
      <div style={{ position: 'absolute', bottom: 60, right: 28, textAlign: 'right', lineHeight: 1.65, userSelect: 'none', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginBottom: 2 }}>
          <div style={{ width: 18, height: 2, borderRadius: 2, background: `rgba(37,79,122,0.50)` }} />
          <span style={{ color: C.navyDk, fontWeight: 900, fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase' }}>Explore</span>
        </div>
        {['Create •', 'Design', 'Grow'].map(w => <p key={w} style={{ color: C.navyDk, fontWeight: 900, fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase' }}>{w}</p>)}
      </div>

      {/* ═══════════ TWO-COLUMN ═══════════ */}
      <div style={{ maxWidth: 1240, width: '100%', margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 28, flex: 1, flexWrap: 'wrap' }}>

        {/* ══ LEFT ══ */}
        <div style={{ flex: '1 1 440px', maxWidth: 560, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 16 }}>

          {/* Eyebrow */}
          <div className="hf" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px rgba(255,255,255,0.9)', display: 'inline-block' }} />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 11.5, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Welcome To My Portfolio</span>
          </div>

          {/* Heading */}
          <div className="hf" style={{ marginBottom: 10 }}>
            <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, lineHeight: 1.02, margin: 0 }}>
              <span style={{ display: 'block', color: '#fff', fontSize: 'clamp(2.6rem,6vw,4.8rem)' }}>Hi, I'm</span>
              <div style={{ display: 'inline-block', position: 'relative', marginTop: 4 }}>
                <span
                  className="gokul-animated-name"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                    letterSpacing: '0.03em',
                    fontWeight: 900,
                    fontFamily: '"Outfit", sans-serif',
                    background: 'linear-gradient(115deg, #1C0A02 0%, #2E1305 28%, #FF8C00 45%, #FFF8E7 52%, #FF6D00 60%, #2E1305 76%, #1C0A02 100%)',
                    backgroundSize: '240% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'nameShine 4.8s ease-in-out infinite',
                    cursor: 'pointer',
                    userSelect: 'none',
                    filter: 'drop-shadow(0 4px 14px rgba(46,19,5,0.40))',
                  }}
                >
                  {['G', 'O', 'K', 'U', 'L', '.', 'T'].map((char, idx) => (
                    <span
                      key={idx}
                      className="gokul-char"
                      style={{
                        display: 'inline-block',
                        animation: char === '.'
                          ? 'dotPulse 1.8s ease-in-out infinite'
                          : `nameWave 3s ease-in-out infinite`,
                        animationDelay: `${idx * 0.12}s`,
                        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease',
                        color: char === '.' ? '#FF6D00' : undefined,
                        WebkitTextFillColor: char === '.' ? '#FF6D00' : undefined,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.18)';
                        e.currentTarget.style.filter = 'drop-shadow(0 8px 16px rgba(255,109,0,0.85))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.filter = '';
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {/* Animated glowing underline accent */}
                <div
                  style={{
                    height: 4,
                    width: '100%',
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, transparent 0%, #FF6D00 25%, #FFD166 50%, #C63702 75%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'lineGlow 3.5s ease-in-out infinite',
                    marginTop: 2,
                    boxShadow: '0 2px 10px rgba(255, 109, 0, 0.45)',
                  }}
                />
              </div>
            </h1>
          </div>

          {/* Role — NO cursor */}
          <p className="hf" style={{ color: '#fff', fontWeight: 700, fontSize: 13.5, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16, minHeight: 20 }}>
            {role}
          </p>

          {/* Description */}
          <p className="hf" style={{ color: 'rgba(255,255,255,0.94)', fontSize: 16.5, lineHeight: 1.58, marginBottom: 28, maxWidth: 500 }}>
            I am Creative Graphic Design, Editor, Solutions. I craft visually compelling, modern, and digital content.
          </p>

          {/* Buttons */}
          <div className="hf" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 28 }}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 26px', borderRadius: 30, background: 'linear-gradient(135deg, #FF6D00, #C63702)', color: '#fff', fontWeight: 700, fontSize: 14.5, textDecoration: 'none', boxShadow: `0 6px 22px rgba(198,55,2,0.45)`, minWidth: 180, cursor: 'pointer' }}
            >
              <FaPalette style={{ fontSize: 13 }} /> View Projects →
            </a>
            <a
              href="https://drive.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 26px', borderRadius: 30, ...G_CREAM, color: C.navy, fontWeight: 700, fontSize: 14.5, textDecoration: 'none', boxShadow: '0 6px 22px rgba(198,55,2,0.18)', minWidth: 180 }}
            >
              <FaGoogleDrive style={{ fontSize: 15, color: '#FF6D00' }} /> Google Drive
            </a>
            <a href="/gokul.pdf" download style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 24px', borderRadius: 30, background: 'rgba(255,255,255,0.7)', color: C.navyDk, fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <FaDownload style={{ fontSize: 12 }} /> Resume
            </a>
          </div>

          {/* Social */}
          <div className="hf" style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 26, height: 2, borderRadius: 2, background: `rgba(198,55,2,0.60)` }} />
              <span style={{ color: C.navyDk, fontWeight: 700, fontSize: 13 }}>Connect with me</span>
            </div>
            <div style={{ display: 'flex', gap: 9 }}>
              <Soc icon={FaGithub} href="https://github.com/gokulthangaraju9-jpg" />
              <Soc icon={FaLinkedin} href="https://www.linkedin.com/in/gokul-t-741959318" />
              <Soc icon={FaGoogleDrive} href="https://drive.google.com/" />
              <Soc icon={FaEnvelope} href="mailto:tgokul516@gmail.com" />
            </div>
          </div>
        </div>

        {/* ══ RIGHT — Visual Showcase with Flow Animation & Solution ══ */}
        <div className="hr" style={{ flex: '0 0 auto', width: 'min(480px,45vw)', minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: 20 }}>

          {/* ── Mode Toggle: UI Flow Solution vs Editor Profile vs Software & Tools ── */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px',
            borderRadius: 30,
            background: 'rgba(255, 248, 231, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 6px 24px rgba(198, 55, 2, 0.16)',
            marginBottom: 16,
            zIndex: 35,
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
          }}>
            <button
              type="button"
              onClick={() => setDisplayMode('editor')}
              style={{
                padding: '7px 15px',
                borderRadius: 24,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: displayMode === 'editor' ? 'linear-gradient(135deg, #FF6D00, #C63702)' : 'transparent',
                color: displayMode === 'editor' ? '#fff' : C.navy,
                boxShadow: displayMode === 'editor' ? '0 4px 16px rgba(198, 55, 2, 0.35)' : 'none',
              }}
            >
              <FaEdit style={{ fontSize: 13 }} />Editor Profile
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('solution')}
              style={{
                padding: '7px 15px',
                borderRadius: 24,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: displayMode === 'solution' ? 'linear-gradient(135deg, #FF6D00, #C63702)' : 'transparent',
                color: displayMode === 'solution' ? '#fff' : C.navy,
                boxShadow: displayMode === 'solution' ? '0 4px 16px rgba(198, 55, 2, 0.35)' : 'none',
              }}
            >
              <FaPalette style={{ fontSize: 13 }} />Design Solution
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('software')}
              style={{
                padding: '7px 15px',
                borderRadius: 24,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: displayMode === 'software' ? 'linear-gradient(135deg, #FF6D00, #C63702)' : 'transparent',
                color: displayMode === 'software' ? '#fff' : C.navy,
                boxShadow: displayMode === 'software' ? '0 4px 16px rgba(198, 55, 2, 0.35)' : 'none',
              }}
            >
              <FaLaptopCode style={{ fontSize: 13 }} />Software & Tools
            </button>
          </div>

          {/* ── Orbit Canvas Container ── */}
          <div style={{ width: 'min(460px,43vw)', height: 'min(460px,43vw)', minWidth: 290, minHeight: 290, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* ── Outer concentric energy flow rings ── */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.22)', pointerEvents: 'none' }} />

            {/* Ring 1 — spinning clockwise with glow nodes */}
            <div style={{ position: 'absolute', inset: '4%', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.42)', animation: 'spin 22s linear infinite', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)', width: 13, height: 13, borderRadius: '50%', background: '#fff', boxShadow: '0 0 16px rgba(255,255,255,0.95)' }} />
              <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: C.navy, boxShadow: `0 0 10px ${C.mid}` }} />
              <div style={{ position: 'absolute', top: '50%', right: -6, transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: C.amber, boxShadow: `0 0 12px ${C.amber}` }} />
            </div>

            {/* Ring 2 — counter-clockwise flow */}
            <div style={{ position: 'absolute', inset: '9%', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.30)', animation: 'spinR 16s linear infinite', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.90)', boxShadow: '0 0 10px #fff' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 10, width: 7, height: 7, borderRadius: '50%', background: C.mid }} />
            </div>

            {/* Ring 3 — inner pulse ring */}
            <div style={{ position: 'absolute', inset: '14%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.20)', pointerEvents: 'none' }} />

            {/* ── DECORATIVE ELEMENTS: UI / Editor Symbols / Software Badges ── */}
            {displayMode === 'solution' ? (
              <>
                {/* Left Floating Slider Control */}
                <div style={{
                  position: 'absolute', left: '1%', top: '26%', width: 36, height: 92, borderRadius: 20,
                  ...G_CREAM, boxShadow: '0 8px 26px rgba(198,55,2,0.20)', zIndex: 32,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0',
                  animation: 'floatY 4.2s ease-in-out 0.3s infinite'
                }}>
                  <FaSlidersH style={{ fontSize: 12, color: C.navy }} />
                  <div style={{ width: 4, height: 48, borderRadius: 3, background: 'rgba(198,55,2,0.15)', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '65%', borderRadius: 3, background: 'linear-gradient(to top, #FF6D00, #FFB300)' }} />
                    <div style={{ position: 'absolute', bottom: '60%', left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 6px rgba(198,55,2,0.35)', border: '1.5px solid #FF6D00' }} />
                  </div>
                </div>

                {/* Right Floating Toggle Widget */}
                <div style={{
                  position: 'absolute', right: '1%', bottom: '22%', width: 44, height: 44, borderRadius: '50%',
                  ...G_CREAM, boxShadow: '0 8px 24px rgba(198,55,2,0.22)', zIndex: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'floatY 3.8s ease-in-out 0.7s infinite'
                }}>
                  <div style={{ width: 24, height: 13, borderRadius: 10, background: 'linear-gradient(90deg, #FF6D00, #C63702)', padding: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                  </div>
                </div>
              </>
            ) : displayMode === 'software' ? (
              <>
                {/* Left Floating AI Design badge */}
                <div style={{
                  position: 'absolute', left: '-1%', top: '22%', padding: '6px 12px', borderRadius: 18,
                  ...G_CREAM, boxShadow: '0 8px 24px rgba(198,55,2,0.22)', zIndex: 32,
                  display: 'flex', alignItems: 'center', gap: 6,
                  animation: 'floatY 4.2s ease-in-out 0.3s infinite'
                }}>
                  <span style={{ fontSize: 13 }}>✨</span>
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: C.navyDk }}>AI Design</span>
                </div>

                {/* Right Floating Motion & Visual badge */}
                <div style={{
                  position: 'absolute', right: '-1%', bottom: '20%', padding: '6px 12px', borderRadius: 18,
                  ...G_CREAM, boxShadow: '0 8px 24px rgba(198,55,2,0.22)', zIndex: 32,
                  display: 'flex', alignItems: 'center', gap: 6,
                  animation: 'floatY 3.8s ease-in-out 0.7s infinite'
                }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6D00, #C63702)' }} />
                  <span style={{ fontSize: 10.5, fontWeight: 800, color: C.navyDk }}>Motion & Visual</span>
                </div>
              </>
            ) : (
              <>
                {/* Editor Symbols */}
                <div style={{ position: 'absolute', left: '7%', top: '30%', width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,248,231,0.25)', border: '1px solid rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, backdropFilter: 'blur(6px)', animation: 'floatY 4s ease-in-out infinite' }}>
                  <FaFilm style={{ fontSize: 15, color: '#fff' }} />
                </div>
                <div style={{ position: 'absolute', left: '8%', bottom: '22%', width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,248,231,0.25)', border: '1px solid rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, backdropFilter: 'blur(6px)', animation: 'floatY 3.5s ease-in-out 0.8s infinite' }}>
                  <FaPenNib style={{ fontSize: 14, color: '#fff' }} />
                </div>
                <div style={{ position: 'absolute', left: '2%', top: '44%', width: 48, height: 48, borderRadius: '50%', ...G_CREAM, boxShadow: '0 8px 28px rgba(198,55,2,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 22, animation: 'floatY 3.6s ease-in-out 0.3s infinite' }}>
                  <FaCropAlt style={{ fontSize: 18, color: C.navy }} />
                </div>
              </>
            )}

            {/* ── CENTRAL VISUAL FRAME (Always circle for Editor & Designer showcasing /ui_solution.png) ── */}
            <div style={{
              position: 'relative',
              width: displayMode === 'software' ? '86%' : '72%',
              height: displayMode === 'software' ? '86%' : '72%',
              borderRadius: displayMode === 'software' ? 28 : '50%',
              overflow: 'hidden',
              background: displayMode === 'software'
                ? '#121218'
                : 'linear-gradient(145deg, #FFB300 0%, #FF8F00 50%, #FF6D00 100%)',
              border: displayMode === 'software'
                ? '2px solid rgba(255, 179, 0, 0.40)'
                : '3.5px solid rgba(255,255,255,0.95)',
              boxShadow: displayMode === 'software'
                ? '0 20px 60px rgba(0,0,0,0.65), 0 0 35px rgba(255,109,0,0.30)'
                : '0 18px 64px rgba(198,55,2,0.42), 0 0 34px rgba(255,179,0,0.50)',
              zIndex: 10,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              {displayMode === 'software' ? (
                /* ── SOFTWARE & TOOLS VIEW ── */
                null
              ) : (
                /* ── CIRCLE FRAME WITH SECOND IMAGE IN GIVEN ORIGINAL COLOR (/ui_solution.png) ── */
                <img
                  src="/ui_solution.png"
                  alt="Creative Video & Graphic Design Flow"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 32%',
                    zIndex: 5,
                    transition: 'transform 0.5s ease',
                  }}
                />
              )}
              {displayMode === 'software' && (
                /* ── SOFTWARE & TOOLS VIEW (Replicating Image 2) ── */
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(160deg, #171720 0%, #0d0d12 100%)',
                  padding: '14px 18px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  zIndex: 5, boxSizing: 'border-box', overflowY: 'auto'
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,179,0,0.25)', paddingBottom: 6 }}>
                    <h4 style={{
                      margin: 0,
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 900,
                      fontSize: 14.5,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#FFD166',
                      textShadow: '0 0 14px rgba(255,179,0,0.40)'
                    }}>
                      SOFTWARE & TOOLS
                    </h4>
                    <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: '0.08em', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 12 }}>
                      PRO STACK
                    </span>
                  </div>

                  {/* Top Row: 2 Columns */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                    {/* Photo & Design Tools */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        {/* Ps */}
                        <div style={{ width: 26, height: 26, borderRadius: 6, background: '#001e36', border: '1.5px solid #31a8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#31a8ff', fontWeight: 900, fontSize: 12 }}>Ps</div>
                        {/* Canva */}
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #00C4CC, #7D2AE8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 8.5, fontStyle: 'italic' }}>Canva</div>
                        {/* Affinity */}
                        <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg, #2b1842, #E91E63, #FF9800)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 11, boxShadow: '0 2px 8px rgba(233,30,99,0.3)' }}>⬡</div>
                      </div>
                      <p style={{ color: '#ffffff', fontSize: 11, fontWeight: 700, margin: '0 0 3px 0' }}>Photo & Design Tools:</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 10, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                        <li>• Photoshop</li>
                        <li>• Canva</li>
                        <li>• Affinity</li>
                        <li>• AI Design ✨</li>
                      </ul>
                    </div>

                    {/* Video Editing Tools */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                        {/* DaVinci */}
                        <div style={{ width: 26, height: 26, borderRadius: 6, background: '#1a1a24', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                          <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'conic-gradient(#ff0055, #00e5ff, #ffea00, #ff0055)' }} />
                        </div>
                        {/* CapCut */}
                        <div style={{ width: 26, height: 26, borderRadius: 6, background: '#000', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M4 6l7 5-7 5V6zm9 5l7-5v10l-7-5z" /></svg>
                        </div>
                        {/* AI */}
                        <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg, #2a2a38, #111118)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 11 }}>AI</div>
                      </div>
                      <p style={{ color: '#ffffff', fontSize: 11, fontWeight: 700, margin: '0 0 3px 0' }}>Video Editing Tools:</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 10, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                        <li>• DaVinci Resolve</li>
                        <li>• CapCut Pro</li>
                        <li>• Flow</li>
                        <li>• AI Tools</li>
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Section: Creative & Motion Tools */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 7, marginTop: 5 }}>
                    <div>
                      <p style={{ color: '#ffffff', fontSize: 11, fontWeight: 700, margin: '0 0 3px 0' }}>Creative & Motion:</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 10, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
                        <li>• Premiere Pro</li>
                        <li>• DaVinci Resolve</li>
                        <li>• CapCut Pro</li>
                        <li>• Affinity</li>
                      </ul>
                    </div>
                    {/* Decorative badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #FF6D00, #C63702)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(198,55,2,0.4)', color: '#fff', fontWeight: 900, fontSize: 13 }}>
                        Pr
                      </div>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #FFB300, #FF6D00)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(255,109,0,0.4)', color: '#fff', fontWeight: 900, fontSize: 13 }}>
                        Dv
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── FLOATING ORBIT CARDS ── */}
            {displayMode === 'solution' ? (
              <>
                <Card imgSrc="/tools/canva.svg" title="Canva" sub="Visual & Social Graphics" dark={false} pos={{ top: '2%', left: '-5%', animation: 'floatY 4s ease-in-out infinite' }} />
                <Card imgSrc="/tools/figma.svg" title="Figma" sub="UI/UX Flow & Prototype" dark={true} pos={{ top: '5%', right: '-8%', animation: 'floatY 3.8s ease-in-out 0.5s infinite' }} />
                <Card imgSrc="/tools/photoshop.svg" title="Photoshop" sub="Photo Retouch & Edit" dark={false} pos={{ top: '48%', right: '-9%', animation: 'floatY 4.2s ease-in-out 1s infinite' }} />
              </>
            ) : displayMode === 'editor' ? (
              <>
                <Card icon={FaFilm} title="AI editor" sub="Capcut• Editor" dark={false} pos={{ top: '6%', left: '-2%', animation: 'floatY 4s ease-in-out infinite' }} />
                <Card icon={FaPhotoVideo} title="Graphic Editor" sub="Design • Retouch • Create" dark={true} pos={{ top: '9%', right: '-5%', animation: 'floatY 3.8s ease-in-out 0.5s infinite' }} />
                <Card icon={FaCropAlt} title="Photo Editor" sub="Clean • Modern • Fluid" dark={false} pos={{ top: '52%', right: '-7%', animation: 'floatY 4.2s ease-in-out 1s infinite' }} />
              </>
            ) : (
              <>
                <Card icon={FaLaptopCode} title="Software Suite" sub="Design • Video • Motion" dark={false} pos={{ top: '4%', left: '-3%', animation: 'floatY 4s ease-in-out infinite' }} />
                <Card icon={FaFilm} title="Motion Suite" sub="DaVinci • CapCut • Premiere" dark={true} pos={{ top: '8%', right: '-6%', animation: 'floatY 3.8s ease-in-out 0.5s infinite' }} />
              </>
            )}

            {/* ── Script text ── */}
            <div style={{ position: 'absolute', bottom: '5%', left: '-9%', transform: 'rotate(-5deg)', zIndex: 20, pointerEvents: 'none', userSelect: 'none' }}>
              {(displayMode === 'solution'
                ? ['Design •', 'Flow •', 'Innovate']
                : displayMode === 'editor'
                  ? ['Editing •', 'Through •', 'Creativity']
                  : ['Software •', 'Creative •', 'Toolkit']
              ).map(w => (
                <p key={w} style={{ fontFamily: "'Dancing Script',cursive", fontSize: '1.52rem', fontWeight: 700, color: C.navyDk, lineHeight: 1.26 }}>{w}</p>
              ))}
              <div style={{ marginTop: 5, height: 3, width: '72%', borderRadius: 2, background: C.navy }} />
            </div>

          </div>
        </div>
      </div>


      {/* ── Flow Down Animated Scroll Indicator ── */}
      <div className="hf" style={{ display: 'flex', justifyContent: 'center', marginTop: 24, marginBottom: 4, zIndex: 20 }}>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            opacity: 0.92,
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <span style={{ textShadow: '0 2px 8px rgba(198,55,2,0.45)' }}>Scroll Down</span>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(255, 248, 231, 0.95)',
            color: '#C63702',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(198, 55, 2, 0.40)',
            animation: 'bounceSlow 2s infinite',
          }}>
            <FaArrowDown style={{ fontSize: 13 }} />
          </div>
        </a>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes spin  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes spinR { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
        @keyframes nameShine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes nameWave {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-7px) rotate(-1deg);
          }
        }
        @keyframes dotPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 6px #FF6D00);
          }
          50% {
            transform: scale(1.4) translateY(-3px);
            filter: drop-shadow(0 0 16px #FFB300) drop-shadow(0 0 24px #FF6D00);
          }
        }
        @keyframes lineGlow {
          0%, 100% {
            background-position: 0% 50%;
            opacity: 0.75;
          }
          50% {
            background-position: 100% 50%;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
