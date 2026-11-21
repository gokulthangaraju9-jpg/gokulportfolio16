import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DesignBackground from '../components/DesignBackground';

gsap.registerPlugin(ScrollTrigger);

/* Video editing tool palette */
const VE_TOOLS = [
  { name: 'CapCut',       color: '#FFFFFF', accent: '#18181B', desc: 'AI-Powered Reels, TikToks & Viral Social Video Edits', iconSrc: '/tools/capcut.svg',   level: 94 },
  { name: 'Premiere Pro', color: '#EA77FF', accent: '#00005B', desc: 'Multi-Cam Timeline Editing, Audio & Color Grading',     iconSrc: '/tools/premiere.svg', level: 88 },
  { name: 'After Effects', color: '#FF4500', accent: '#1A0000', desc: 'Motion Graphics, VFX Compositing & Animation',         icon: '🎬', level: 75 },
];

/* Showcase items — video editing work categories */
const SHOWCASE = [
  { title: 'Social Reels',      emoji: '📲', desc: 'Fast-paced, trend-driven Instagram Reels & TikToks with punchy transitions.' },
  { title: 'YouTube Content',   emoji: '▶️', desc: 'Polished long-form video with clean cuts, B-roll integration & colour grading.' },
  { title: 'Motion Graphics',   emoji: '✨', desc: 'Animated logos, title sequences, lower-thirds & kinetic typography.' },
  { title: 'Color Grading',     emoji: '🎨', desc: 'Cinematic LUTs, mood-based grading & consistent visual tone across projects.' },
];

/* Given Showcase Videos */
const SHOWCASE_VIDEOS = [
  {
    id: 'kncet',
    title: 'KNCET — Campus & Event Showcase',
    category: 'Institutional Video Edit & Motion Visuals',
    video: '/KNCET.mp4',
    poster: '/design photo.png',
    badge: 'CAMPUS EDIT',
    accentColor: '#00D2FF',
    icon: '🎓',
    desc: 'Cinematic promotional video showcasing campus life, events, dynamic transitions, and polished sound design.',
  },
  {
    id: 'jailer',
    title: 'GOKUL — Jailer Cinematic Edit',
    category: 'Cinematic Movie Cut & Beat-Sync Reel',
    video: '/GOKUL JAILER.mp4',
    poster: '/design photo.png',
    badge: 'CINEMATIC CUT',
    accentColor: '#FF4500',
    icon: '🔥',
    desc: 'High-octane cinematic cut featuring pulse-pounding rhythm synchronization, dramatic color grading, and heavy bass transitions.',
  },
  {
    id: 'intro',
    title: 'GOKUL T — Official Intro Reel',
    category: 'Creative Video Editor & Motion Graphics Reel',
    video: '/GOKUL Intro video.mp4',
    poster: '/design photo.png',
    badge: 'INTRO REEL',
    accentColor: '#EA77FF',
    icon: '🎬',
    desc: 'High-energy showreel demonstrating video editing pacing, rhythmic cuts, kinetic typography, and motion VFX.',
  },
];

const VideoEditor = () => {
  const containerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const curVideo = SHOWCASE_VIDEOS[activeVideo];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ve-card',
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.10, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.ve-grid', start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.ve-hero-text',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.ve-showcase',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.ve-showcase-grid', start: 'top 85%' },
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
          <div className="ve-hero-text text-center mb-16">
            {/* Category Badge */}
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(46,19,5,0.35)', border: '1px solid rgba(234,119,255,0.35)', backdropFilter: 'blur(8px)' }}
            >
              <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" />
              <span
                className="text-purple-200 font-bold tracking-widest text-xs uppercase"
                style={{ fontFamily: 'monospace' }}
              >Video Editor</span>
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #FFF8E1 0%, #EA77FF 30%, #FF4500 65%, #C63702 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: '"Outfit", "Inter", sans-serif',
                filter: 'drop-shadow(0 2px 16px rgba(234,119,255,0.30))',
              }}
            >
              Video Editor
            </h1>

            {/* Subtitle */}
            <p
              className="text-[#2E1305]/80 text-lg max-w-xl mx-auto leading-relaxed font-semibold"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Bringing motion to stories — from viral reels<br />to cinematic post-production
            </p>

            {/* Tool pill row */}
            <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
              {VE_TOOLS.map((tool, i) => (
                <React.Fragment key={tool.name}>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide px-3 py-1 rounded-full shadow-sm"
                    style={{
                      color: tool.name === 'CapCut' ? '#E0E0E0' : tool.color,
                      border: `1px solid ${tool.color}66`,
                      background: 'rgba(26, 12, 4, 0.45)',
                      backdropFilter: 'blur(8px)',
                      fontFamily: 'monospace',
                      textShadow: tool.name === 'CapCut' ? 'none' : `0 0 8px ${tool.color}88`,
                    }}
                  >
                    {tool.iconSrc ? (
                      <img src={tool.iconSrc} alt="" className="w-3.5 h-3.5 object-contain" />
                    ) : (
                      <span className="text-xs">{tool.icon}</span>
                    )}
                    {tool.name}
                  </span>
                  {i < VE_TOOLS.length - 1 && (
                    <span className="text-[#2E1305]/60 text-xs font-bold">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── VIDEO SHOWCASE ── */}
          <div className="ve-card mb-16">
            {/* Section label & Video Switcher */}
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span
                  className="text-white/80 text-xs font-black font-mono uppercase tracking-widest"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}
                >
                  Featured Videos ({SHOWCASE_VIDEOS.length})
                </span>
              </div>

              {/* Video Switcher Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {SHOWCASE_VIDEOS.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveVideo(idx)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300"
                    style={{
                      background: activeVideo === idx ? 'rgba(255, 255, 255, 0.95)' : 'rgba(26, 12, 4, 0.55)',
                      border: activeVideo === idx ? `2px solid ${v.accentColor}` : '1px solid rgba(255,255,255,0.20)',
                      color: activeVideo === idx ? '#1E0C04' : '#FFFFFF',
                      backdropFilter: 'blur(10px)',
                      boxShadow: activeVideo === idx ? `0 0 16px ${v.accentColor}66` : 'none',
                    }}
                  >
                    <span>{v.icon}</span>
                    <span>{v.title.split('—')[0].trim()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Video Player Container */}
            <div
              className="relative overflow-hidden rounded-2xl border group"
              style={{
                border: `2px solid ${curVideo.accentColor}55`,
                boxShadow: `0 8px 40px ${curVideo.accentColor}25, 0 2px 12px rgba(0,0,0,0.25), 0 0 60px ${curVideo.accentColor}15`,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.50) 0%, rgba(26,0,40,0.60) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Decorative top accent */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${curVideo.accentColor}, #FF4500, ${curVideo.accentColor}, transparent)`,
                }}
              />

              {/* Video element */}
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <video
                  key={curVideo.video}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster={curVideo.poster}
                  style={{
                    borderRadius: '0 0 16px 16px',
                  }}
                >
                  <source src={curVideo.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info Footer */}
              <div
                className="px-5 py-4 flex items-center justify-between flex-wrap gap-3"
                style={{
                  background: 'rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(12px)',
                  borderTop: '1px solid rgba(255,255,255,0.10)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      background: `${curVideo.accentColor}25`,
                      border: `1px solid ${curVideo.accentColor}66`,
                    }}
                  >
                    {curVideo.icon}
                  </div>
                  <div>
                    <h4
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                      {curVideo.title}
                    </h4>
                    <p className="text-white/65 text-xs font-medium">{curVideo.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider"
                    style={{
                      background: `${curVideo.accentColor}25`,
                      border: `1px solid ${curVideo.accentColor}55`,
                      color: curVideo.accentColor,
                    }}
                  >
                    {curVideo.badge}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider"
                    style={{
                      background: 'rgba(255,69,0,0.18)',
                      border: '1px solid rgba(255,69,0,0.35)',
                      color: '#FF6347',
                    }}
                  >
                    MP4
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── TOOL CARDS GRID ── */}
          <div className="ve-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {VE_TOOLS.map((tool, i) => {
              const isCapCut = tool.name === 'CapCut';
              return (
                <div
                  key={tool.name}
                  className="ve-card group relative overflow-hidden rounded-2xl border cursor-default transition-all duration-300 hover:-translate-y-2"
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
                    style={{ background: `linear-gradient(90deg, transparent, ${isCapCut ? '#EA77FF' : tool.color}, transparent)` }} />

                  <div className="p-6 relative z-10">
                    {/* Icon + Number row */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: isCapCut ? '#000000' : 'rgba(255,255,255,0.30)',
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
                        textShadow: `0 2px 10px rgba(0,0,0,0.5), 0 0 14px ${isCapCut ? '#EA77FF' : tool.color}aa`,
                      }}
                    >
                      <span>{tool.name}</span>
                      <span className="w-2 h-2 rounded-full" style={{ background: isCapCut ? '#EA77FF' : tool.color, boxShadow: `0 0 8px ${isCapCut ? '#EA77FF' : tool.color}` }} />
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
                          style={{ borderColor: `${isCapCut ? '#EA77FF' : tool.color}66` }}
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
                            background: `linear-gradient(90deg, ${isCapCut ? '#EA77FF' : tool.color}88, ${isCapCut ? '#EA77FF' : tool.color})`,
                            boxShadow: `0 0 8px ${isCapCut ? '#EA77FF' : tool.color}66`,
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

          {/* ── VIDEO SHOWCASE CARDS ── */}
          <div className="ve-showcase-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {SHOWCASE.map((item) => (
              <div
                key={item.title}
                className="ve-showcase group relative overflow-hidden rounded-2xl border cursor-default transition-all duration-300 hover:-translate-y-2"
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
            className="ve-card relative overflow-hidden rounded-2xl border"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%)',
              border: '1px solid rgba(255,255,255,0.32)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: '0 4px 28px rgba(198,55,2,0.18), 0 1px 0 rgba(255,255,255,0.25) inset',
            }}
          >
            <div className="h-0.5 w-full"
              style={{ background: 'linear-gradient(90deg, transparent, #EA77FF, #FF4500, transparent)' }} />
            <div className="p-6 flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-[#2E1305]/70 text-xs font-black font-mono uppercase tracking-widest">
                    VIDEO EDITING FLOW
                  </span>
                </div>
                <p className="text-[#2E1305]/75 text-sm leading-relaxed font-medium">
                  My video editing pipeline kicks off with rapid social content in{' '}
                  <span className="text-[#18181B] font-bold">CapCut</span>, transitions to professional timeline editing in{' '}
                  <span className="text-[#EA77FF] font-bold">Premiere Pro</span>, and reaches its peak with motion graphics & VFX in{' '}
                  <span className="text-[#FF4500] font-bold">After Effects</span>.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-px" style={{ background: 'rgba(198,55,2,0.25)' }} />
                <span className="text-[#2E1305]/40 text-xs font-mono">// END OF VIDEO FLOW</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
