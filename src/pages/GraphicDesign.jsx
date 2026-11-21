import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DesignBackground from '../components/DesignBackground';

gsap.registerPlugin(ScrollTrigger);

/* Graphic Design tool palette */
const GD_TOOLS = [
  { name: 'Canva',       color: '#00C4CC', accent: '#7D2AE8', desc: 'Rapid Social Graphics, Posters & Brand Templates', iconSrc: '/tools/canva.svg',     level: 95 },
  { name: 'Figma',       color: '#FF7262', accent: '#A259FF', desc: 'UI/UX Design, Wireframing & Prototyping',           iconSrc: '/tools/figma.svg',     level: 92 },
  { name: 'Photoshop',   color: '#31A8FF', accent: '#001E36', desc: 'Photo Retouching, Compositing & Digital Art',       iconSrc: '/tools/photoshop.svg', level: 90 },
  { name: 'Illustrator', color: '#FF8C00', accent: '#4A1800', desc: 'Vector Graphics, Logo & Brand Illustration',        icon: '✏️', level: 80 },
];

/* Showcase items — design work categories */
const SHOWCASE = [
  { title: 'Brand Identity', emoji: '🎨', desc: 'Logos, color systems, typography & brand guidelines that define visual identity.' },
  { title: 'Social Media',   emoji: '📱', desc: 'Eye-catching Instagram, LinkedIn & YouTube graphics optimized for engagement.' },
  { title: 'Print Design',   emoji: '🖨️', desc: 'Posters, flyers, brochures & business cards with pixel-perfect layouts.' },
  { title: 'UI Mockups',     emoji: '💻', desc: 'High-fidelity website & app interface designs with interactive prototypes.' },
];

const GraphicDesign = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gd-card',
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.10, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.gd-grid', start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.gd-hero-text',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.gd-showcase',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.gd-showcase-grid', start: 'top 85%' },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen" ref={containerRef}>
      {/* Animated energy-flow background */}
      <DesignBackground />

      <div className="relative z-10 min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* ── HERO BANNER ── */}
          <div className="gd-hero-text text-center mb-16">
            {/* Category Badge */}
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(46,19,5,0.35)', border: '1px solid rgba(255,179,0,0.35)', backdropFilter: 'blur(8px)' }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              <span
                className="text-amber-200 font-bold tracking-widest text-xs uppercase"
                style={{ fontFamily: 'monospace' }}
              >Graphic Design</span>
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
              Graphic Design
            </h1>

            {/* Subtitle */}
            <p
              className="text-[#2E1305]/80 text-lg max-w-xl mx-auto leading-relaxed font-semibold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Crafting visual stories — from brand identities<br />to stunning social content
            </p>

            {/* Tool pill row */}
            <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
              {GD_TOOLS.map((tool, i) => (
                <React.Fragment key={tool.name}>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide px-3 py-1 rounded-full shadow-sm"
                    style={{
                      color: tool.color,
                      border: `1px solid ${tool.color}66`,
                      background: 'rgba(26, 12, 4, 0.45)',
                      backdropFilter: 'blur(8px)',
                      fontFamily: 'monospace',
                      textShadow: `0 0 8px ${tool.color}88`,
                    }}
                  >
                    {tool.iconSrc ? (
                      <img src={tool.iconSrc} alt="" className="w-3.5 h-3.5 object-contain" />
                    ) : (
                      <span className="text-xs">{tool.icon}</span>
                    )}
                    {tool.name}
                  </span>
                  {i < GD_TOOLS.length - 1 && (
                    <span className="text-[#2E1305]/60 text-xs font-bold">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── POSTER / DESIGN SHOWCASE ── */}
          <div className="gd-card mb-16">
            {/* Section label */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span
                className="text-white/80 text-xs font-black font-mono uppercase tracking-widest"
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}
              >
                Poster & Design Work
              </span>
              <div className="flex-1 h-px ml-2" style={{ background: 'rgba(255,255,255,0.18)' }} />
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { src: '/poster VC.jpg', title: 'GOKUL DESIGNER — Brand Poster', tag: 'Branding' },
                { src: '/poster_tezario.png', title: 'Tezario — Event Poster', tag: 'Event' },
                { src: '/poster 1.png', title: 'Poster Design #1', tag: 'Poster' },
                { src: '/poster_vinayaka.jpg', title: 'Vinayaka Chaturthi — Festive Poster', tag: 'Festive' },
                { src: '/Poster 2.png', title: 'Creative Edition #2', tag: 'Creative' },
                { src: '/design photo.png', title: 'Gokul Design — Motion & Visuals', tag: 'Visuals' },
              ].map((poster, i, arr) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  style={{
                    border: '2px solid rgba(255,140,0,0.30)',
                    boxShadow: '0 6px 32px rgba(198,55,2,0.18), 0 0 40px rgba(255,140,0,0.06)',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.40) 0%, rgba(46,19,5,0.50) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  {/* Top accent bar */}
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #FFD166, #FF8C00, #FFD166, transparent)' }} />

                  {/* Image container with hover zoom */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <img
                      src={poster.src}
                      alt={poster.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => { e.target.parentElement.parentElement.style.display = 'none'; }}
                    />
                    {/* Gradient overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)' }}
                    />
                    {/* Zoom icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl backdrop-blur-md"
                        style={{
                          background: 'rgba(255,255,255,0.20)',
                          border: '2px solid rgba(255,255,255,0.50)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                      >
                        🔍
                      </div>
                    </div>
                  </div>

                  {/* Info footer */}
                  <div
                    className="px-4 py-3 flex items-center justify-between gap-2"
                    style={{
                      background: 'rgba(0,0,0,0.40)',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="min-w-0">
                      <h4
                        className="text-white font-bold text-sm truncate"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                      >
                        {poster.title}
                      </h4>
                      <p className="text-white/45 text-[10px] font-mono mt-0.5">
                        {String(i + 1).padStart(2, '0')} / {String(arr.length).padStart(2, '0')}
                      </p>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider shrink-0"
                      style={{
                        background: 'rgba(255,140,0,0.18)',
                        border: '1px solid rgba(255,140,0,0.35)',
                        color: '#FFB300',
                      }}
                    >
                      {poster.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── TOOL CARDS GRID ── */}
          <div className="gd-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {GD_TOOLS.map((tool, i) => {
              const isLight = tool.name === 'Illustrator';
              return (
                <div
                  key={tool.name}
                  className="gd-card group relative overflow-hidden rounded-2xl border cursor-default transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%)',
                    border: '1px solid rgba(255,255,255,0.32)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    boxShadow: '0 4px 28px rgba(198,55,2,0.18), 0 1px 0 rgba(255,255,255,0.25) inset',
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
                          background: 'rgba(255,255,255,0.30)',
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

                  <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                </div>
              );
            })}
          </div>

          {/* ── DESIGN SHOWCASE CARDS ── */}
          <div className="gd-showcase-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {SHOWCASE.map((item) => (
              <div
                key={item.title}
                className="gd-showcase group relative overflow-hidden rounded-2xl border cursor-default transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
                  border: '1px solid rgba(255,255,255,0.28)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 24px rgba(198,55,2,0.14)',
                }}
              >
                <div className="p-6">
                  <span className="text-3xl mb-3 block">{item.emoji}</span>
                  <h3
                    className="text-base font-black text-white mb-2"
                    style={{ fontFamily: '"Outfit", sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── FLOW SUMMARY CARD ── */}
          <div
            className="gd-card relative overflow-hidden rounded-2xl border"
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
            <div className="p-6 flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[#2E1305]/70 text-xs font-black font-mono uppercase tracking-widest">
                    GRAPHIC DESIGN FLOW
                  </span>
                </div>
                <p className="text-[#2E1305]/75 text-sm leading-relaxed font-medium">
                  My graphic design workflow starts with rapid content creation in{' '}
                  <span className="text-[#00C4CC] font-bold">Canva</span>, evolves into pixel-perfect UI/UX in{' '}
                  <span className="text-[#FF7262] font-bold">Figma</span>, gets refined with professional retouching in{' '}
                  <span className="text-[#31A8FF] font-bold">Photoshop</span>, and finishes with vector artistry in{' '}
                  <span className="text-[#FF8C00] font-bold">Illustrator</span>.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-px" style={{ background: 'rgba(198,55,2,0.25)' }} />
                <span className="text-[#2E1305]/40 text-xs font-mono">// END OF DESIGN FLOW</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GraphicDesign;
