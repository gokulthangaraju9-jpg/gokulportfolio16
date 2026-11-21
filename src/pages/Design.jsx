import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DesignBackground from '../components/DesignBackground';
import SolutionFlowBanner from '../components/SolutionFlowBanner';

gsap.registerPlugin(ScrollTrigger);

/* Orange-themed tool palette featuring Canva, Figma, Photoshop, CapCut, Premiere Pro */
const TOOLS = [
  { name: 'Canva',         color: '#00C4CC', accent: '#7D2AE8', desc: 'Rapid Visual & Social Content Creation', iconSrc: '/tools/canva.svg', level: 95 },
  { name: 'Figma',         color: '#FF7262', accent: '#A259FF', desc: 'UI/UX Design, Wireframing & Prototyping', iconSrc: '/tools/figma.svg', level: 92 },
  { name: 'Photoshop',     color: '#31A8FF', accent: '#001E36', desc: 'Photo Editing, Retouching & Compositing', iconSrc: '/tools/photoshop.svg', level: 90 },
  { name: 'CapCut',        color: '#FFFFFF', accent: '#18181B', desc: 'Fast-paced AI & Viral Social Video Edit', iconSrc: '/tools/capcut.svg', level: 94 },
  { name: 'Premiere Pro',  color: '#EA77FF', accent: '#00005B', desc: 'Timeline Video Editing, Audio & Post',    iconSrc: '/tools/premiere.svg', level: 88 },
  { name: 'Illustrator',   color: '#FF8C00', accent: '#4A1800', desc: 'Vector Graphics & Brand Illustration',   icon: '✏️', level: 80 },
  { name: 'After Effects', color: '#FF4500', accent: '#1A0000', desc: 'Motion Graphics & VFX Animation',        icon: '🎬', level: 75 },
  { name: 'Three.js',      color: '#FFF8E1', accent: '#FF6D00', desc: 'WebGL 3D Interactive Experiences',       icon: '🌐', level: 72 },
];

const Design = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.design-card',
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.10, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.design-grid', start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.design-hero-text',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen" ref={containerRef}>
      {/* Orange animated energy flow canvas */}
      <DesignBackground />

      {/* Page content */}
      <div className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* ── HERO HEADER ── */}
          <div className="design-hero-text text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(46,19,5,0.35)', border: '1px solid rgba(255,179,0,0.35)', backdropFilter: 'blur(8px)' }}>
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              <span className="text-amber-200 font-bold tracking-widest text-xs uppercase"
                style={{ fontFamily: 'monospace' }}>Design Flow</span>
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #FFF8E1 0%, #FFD166 30%, #FF8C00 65%, #C63702 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: '"Outfit", "Inter", sans-serif',
                filter: 'drop-shadow(0 2px 16px rgba(255,109,0,0.30))',
              }}
            >
              Design Tools
            </h1>

            {/* Subtitle */}
            <p className="text-[#2E1305]/80 text-lg max-w-xl mx-auto leading-relaxed font-semibold"
              style={{ fontFamily: '"Outfit", sans-serif' }}>
              A digital energy flow through the creative toolkit —<br />from wireframe to WebGL
            </p>

            {/* Flow indicator pill row */}
            <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
              {TOOLS.map((tool, i) => (
                <React.Fragment key={tool.name}>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide px-3 py-1 rounded-full shadow-sm"
                    style={{
                      color: tool.name === 'Three.js' ? '#7B3800' : tool.color,
                      border: `1px solid ${tool.color}66`,
                      background: 'rgba(26, 12, 4, 0.45)',
                      backdropFilter: 'blur(8px)',
                      fontFamily: 'monospace',
                      textShadow: tool.name === 'Three.js' ? 'none' : `0 0 8px ${tool.color}88`,
                    }}
                  >
                    {tool.iconSrc ? (
                      <img src={tool.iconSrc} alt="" className="w-3.5 h-3.5 object-contain" />
                    ) : (
                      <span className="text-xs">{tool.icon}</span>
                    )}
                    {tool.name}
                  </span>
                  {i < TOOLS.length - 1 && (
                    <span className="text-[#2E1305]/60 text-xs font-bold">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── SOLUTION FLOW BANNER (Canva ➔ Figma ➔ Photoshop ➔ CapCut ➔ Premiere Pro) ── */}
          <div className="mb-12">
            <SolutionFlowBanner />
          </div>

          {/* ── CATEGORY NAVIGATION CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {/* Graphic Design Card */}
            <Link
              to="/graphic-design"
              className="group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl no-underline block"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%)',
                border: '1px solid rgba(255,255,255,0.32)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                boxShadow: '0 4px 28px rgba(198,55,2,0.18), 0 1px 0 rgba(255,255,255,0.25) inset',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,140,0,0.25) 0%, transparent 70%)' }}
              />
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #FFD166, #FF8C00, #C63702)' }} />
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                    style={{ background: 'rgba(255,140,0,0.20)', border: '1px solid rgba(255,140,0,0.40)' }}>
                    🎨
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white" style={{ fontFamily: '"Outfit", sans-serif', textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                      Graphic Design
                    </h3>
                    <p className="text-sm text-white/75 font-semibold">Canva · Figma · Photoshop · Illustrator</p>
                  </div>
                </div>
                <p className="text-sm text-white/85 leading-relaxed font-medium">
                  Brand identities, social media graphics, UI mockups & print design — explore the visual design toolkit.
                </p>
                <div className="mt-4 flex items-center gap-2 text-amber-200 text-sm font-bold group-hover:gap-3 transition-all">
                  <span>Explore</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>

            {/* Video Editor Card */}
            <Link
              to="/video-editor"
              className="group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl no-underline block"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%)',
                border: '1px solid rgba(255,255,255,0.32)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                boxShadow: '0 4px 28px rgba(198,55,2,0.18), 0 1px 0 rgba(255,255,255,0.25) inset',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(234,119,255,0.25) 0%, transparent 70%)' }}
              />
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #EA77FF, #FF4500, #C63702)' }} />
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                    style={{ background: 'rgba(234,119,255,0.20)', border: '1px solid rgba(234,119,255,0.40)' }}>
                    🎬
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white" style={{ fontFamily: '"Outfit", sans-serif', textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                      Video Editor
                    </h3>
                    <p className="text-sm text-white/75 font-semibold">CapCut · Premiere Pro · After Effects</p>
                  </div>
                </div>
                <p className="text-sm text-white/85 leading-relaxed font-medium">
                  Social reels, cinematic edits, motion graphics & VFX — explore the video editing pipeline.
                </p>
                <div className="mt-4 flex items-center gap-2 text-purple-200 text-sm font-bold group-hover:gap-3 transition-all">
                  <span>Explore</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          </div>

          {/* ── TOOL CARDS GRID ── */}
          <div className="design-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {TOOLS.map((tool, i) => {
              const isLight = tool.name === 'Three.js'; // cream/near-white colour
              return (
                <div
                  key={tool.name}
                  className="design-card group relative overflow-hidden rounded-2xl border cursor-default transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%)`,
                    border: `1px solid rgba(255,255,255,0.32)`,
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    boxShadow: `0 4px 28px rgba(198,55,2,0.18), 0 1px 0 rgba(255,255,255,0.25) inset`,
                  }}
                >
                  {/* Hover colour wash */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${tool.color}28 0%, transparent 70%)` }}
                  />

                  {/* Top accent bar */}
                  <div className="h-0.5 w-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${isLight ? '#FF8C00' : tool.color}, transparent)` }} />

                  <div className="p-6 relative z-10">
                    {/* Icon + Number row */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: tool.name === 'CapCut' ? '#000000' : 'rgba(255,255,255,0.30)',
                          border: '1px solid rgba(255,255,255,0.45)',
                          boxShadow: `0 3px 14px ${tool.color}35`,
                        }}
                      >
                        {tool.iconSrc ? (
                          <img src={tool.iconSrc} alt={tool.name} className="w-full h-full object-contain drop-shadow" />
                        ) : (
                          <span className="text-2xl">{tool.icon}</span>
                        )}
                      </div>
                      <span
                        className="text-xs font-bold font-mono opacity-50 group-hover:opacity-90 transition-opacity"
                        style={{ color: '#2E1305' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Name */}
                    <h3
                      className="text-lg font-black mb-1 text-white flex items-center gap-2"
                      style={{
                        fontFamily: '"Outfit", sans-serif',
                        textShadow: `0 2px 10px rgba(0,0,0,0.5), 0 0 14px ${tool.color}aa`,
                      }}
                    >
                      <span>{tool.name}</span>
                      <span className="w-2 h-2 rounded-full" style={{ background: tool.color, boxShadow: `0 0 8px ${tool.color}` }} />
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/90 leading-relaxed mb-4 font-semibold drop-shadow-sm">
                      {tool.desc}
                    </p>

                    {/* Skill level bar */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-white/80 font-mono font-bold tracking-wider">PROFICIENCY</span>
                        <span
                          className="text-xs font-black font-mono px-2 py-0.5 rounded bg-black/40 text-white border"
                          style={{ borderColor: `${tool.color}66` }}
                        >
                          {tool.level}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full overflow-hidden"
                        style={{ background: 'rgba(46,19,5,0.12)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${tool.level}%`,
                            background: `linear-gradient(90deg, ${tool.color}88, ${isLight ? '#FF8C00' : tool.color})`,
                            boxShadow: `0 0 8px ${tool.color}66`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom separator */}
                  <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                </div>
              );
            })}

            {/* Flow Summary Card */}
            <div
              className="design-card sm:col-span-2 lg:col-span-3 xl:col-span-1 relative overflow-hidden rounded-2xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%)',
                border: '1px solid rgba(255,255,255,0.32)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                boxShadow: '0 4px 28px rgba(198,55,2,0.18), 0 1px 0 rgba(255,255,255,0.25) inset',
              }}
            >
              <div className="h-0.5 w-full"
                style={{ background: 'linear-gradient(90deg, transparent, #FF8C00, #FFD166, transparent)' }} />
              <div className="p-6 flex flex-col justify-between h-full min-h-[200px]">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[#2E1305]/70 text-xs font-black font-mono uppercase tracking-widest">
                      FLOW STATUS
                    </span>
                  </div>
                  <p className="text-[#2E1305]/75 text-sm leading-relaxed font-medium">
                    Creative workflow connects visual ideas in <span className="text-[#00C4CC] font-bold">Canva</span>, UI/UX systems in{' '}
                    <span className="text-[#FF7262] font-bold">Figma</span>, raster refinement in{' '}
                    <span className="text-[#31A8FF] font-bold">Photoshop</span>, rapid social video in{' '}
                    <span className="text-[#18181B] font-bold">CapCut</span>, and cinematic timeline editing in{' '}
                    <span className="text-[#EA77FF] font-bold">Premiere Pro</span>.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 h-px" style={{ background: 'rgba(198,55,2,0.25)' }} />
                  <span className="text-[#2E1305]/40 text-xs font-mono">// END OF FLOW</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Design;
