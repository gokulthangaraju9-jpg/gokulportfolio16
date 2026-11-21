import React, { useState, useEffect, useRef } from 'react';
import {
  FaFilm, FaCropAlt, FaRobot
} from 'react-icons/fa';
import {
  SiFigma, SiAdobephotoshop, SiCanva, SiAdobepremierepro
} from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from '../components/ui/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const containerRef = useRef(null);

  const skillCategories = {
    design: [
      { name: 'Figma', icon: SiFigma, category: 'Design', color: '#FF7262' },
      { name: 'Photoshop', icon: SiAdobephotoshop, category: 'Design', color: '#31A8FF' },
      { name: 'Canva', icon: SiCanva, category: 'Design', color: '#00C4CC' },
      { name: 'Premiere Pro', icon: SiAdobepremierepro, category: 'Design', color: '#EA77FF' },
    ],
    software: [
      { name: 'CapCut Pro', icon: FaFilm, category: 'Software & Tools', color: '#000000' },
      { name: 'Affinity', icon: FaCropAlt, category: 'Software & Tools', color: '#FFB300' },
      { name: 'AI Design', icon: FaRobot, category: 'Software & Tools', color: '#FF6D00' },
    ],
  };

  const getSkills = () => {
    if (activeCategory === 'all') {
      return Object.values(skillCategories).flat();
    }
    return skillCategories[activeCategory] || [];
  };

  const currentSkills = getSkills();

  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-filter-btn',
        { opacity: 0, y: -20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Section Heading */}
        <div className="mb-10 text-center flex flex-col items-center">
          <AnimatedText text="Skills" className="text-4xl md:text-5xl font-display font-bold text-[#2E1305] mb-4" />
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6D00] to-[#FFB300] rounded-full mb-3"></div>
          <p className="text-sm font-semibold text-[#C63702]/80 max-w-md">
            Interactive sweep ring orbit & creative tools suite
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {['all', 'design', 'software'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`skill-filter-btn px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#FF6D00] to-[#C63702] text-white shadow-lg shadow-[#C63702]/25 border border-transparent'
                  : 'bg-white/80 text-[#C63702] hover:bg-white hover:text-[#2E1305] border border-white/85'
              }`}
            >
              {cat === 'software' ? 'Software & Tools' : cat === 'design' ? 'Design' : 'All'}
            </button>
          ))}
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            CIRCULAR SWEEP RING ORBIT ANIMATION
        ═════════════════════════════════════════════════════════════════ */}
        <div className="relative w-full flex items-center justify-center py-10 my-4 select-none overflow-visible min-h-[580px] sm:min-h-[660px]">

            {/* Sweep Ring Track Container with rotation */}
            <div
              className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] flex items-center justify-center"
            >

              {/* ── 1. Sweeping Radar Gradient Beam ── */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none opacity-40 animate-spin"
                style={{
                  animationDuration: '24s',
                  background: 'conic-gradient(from 0deg, rgba(255, 109, 0, 0.45) 0deg, rgba(255, 179, 0, 0.15) 45deg, transparent 110deg)',
                  maskImage: 'radial-gradient(circle, transparent 40%, black 100%)',
                  WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 100%)',
                }}
              />

              {/* ── 2. Concentric Decorative SVG Orbit Rings ── */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 540">
                {/* Outer dashed ring */}
                <circle
                  cx="270" cy="270" r="260"
                  fill="none" stroke="rgba(255, 255, 255, 0.60)"
                  strokeWidth="1.5" strokeDasharray="6 8"
                />
                {/* Main orbital track */}
                <circle
                  cx="270" cy="270" r="215"
                  fill="none" stroke="rgba(255, 255, 255, 0.85)"
                  strokeWidth="2.2"
                />
                {/* Inner glowing accent ring */}
                <circle
                  cx="270" cy="270" r="160"
                  fill="none" stroke="rgba(255, 109, 0, 0.35)"
                  strokeWidth="1.5" strokeDasharray="3 6"
                />
                {/* Core ring */}
                <circle
                  cx="270" cy="270" r="105"
                  fill="rgba(255, 255, 255, 0.12)" stroke="rgba(255, 255, 255, 0.70)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* ── 3. Central Hub Core ── */}
              <div
                className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center text-center p-3 shadow-2xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 231, 0.90))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.90)',
                  boxShadow: '0 15px 45px rgba(198, 55, 2, 0.22), 0 0 30px rgba(255, 109, 0, 0.25)',
                }}
              >
                {/* Pulsing ring indicator */}
                <span className="relative flex h-3 w-3 mb-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6D00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6D00]"></span>
                </span>
                <span className="font-display font-black text-[#2E1305] text-sm sm:text-base tracking-wider uppercase">
                  {hoveredSkill ? hoveredSkill.name : 'Creative'}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-[#C63702] uppercase tracking-wider">
                  {hoveredSkill ? hoveredSkill.category : 'Arsenal'}
                </span>
                <span className="text-[9px] font-semibold text-[#2E1305]/60 mt-1">
                  {currentSkills.length} Tools In Orbit
                </span>
              </div>

              {/* ── 4. The Orbiting Cards Ring ── */}
              {/* This container rotates slowly, while child cards counter-rotate to stay upright */}
              <div
                className="absolute inset-0 flex items-center justify-center orbit-spin-container"
                style={{
                  animation: 'orbitSpin 45s linear infinite',
                }}
              >
                {currentSkills.map((skill, index) => {
                  const total = currentSkills.length;
                  const angle = (index / total) * (2 * Math.PI) - Math.PI / 2;
                  const Icon = skill.icon;
                  const isHovered = hoveredSkill?.name === skill.name;

                  // Radius responsive styling using CSS transform translateX
                  return (
                    <div
                      key={skill.name}
                      className="absolute flex items-center justify-center"
                      style={{
                        // Position card at radius along angle
                        transform: `rotate(${index * (360 / total)}deg) translateY(calc(-170px - 5vw))`,
                      }}
                    >
                      {/* Counter-rotation card wrapper so card content stays right-side up */}
                      <div
                        className="orbit-counter-container"
                        style={{
                          animation: 'orbitSpinRev 45s linear infinite',
                          // Also counter-rotate the card angle offset
                          transform: `rotate(-${index * (360 / total)}deg)`,
                        }}
                      >
                        <div
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-300"
                          style={{
                            width: '110px',
                            minHeight: '110px',
                            background: isHovered
                              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 231, 0.95))'
                              : 'rgba(255, 255, 255, 0.88)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: isHovered
                              ? '2px solid #FF6D00'
                              : '1.5px solid rgba(255, 255, 255, 0.90)',
                            boxShadow: isHovered
                              ? '0 16px 36px rgba(198, 55, 2, 0.32), 0 0 20px rgba(255, 109, 0, 0.35)'
                              : '0 8px 24px rgba(198, 55, 2, 0.15)',
                            transform: isHovered ? 'scale(1.18)' : 'scale(1)',
                            zIndex: isHovered ? 40 : 25,
                          }}
                        >
                          {/* Inner Icon Box */}
                          <div
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center mb-2 shadow-sm transition-transform duration-300 group-hover:scale-110"
                            style={{
                              border: '1px solid rgba(255, 255, 255, 0.85)',
                              color: isHovered ? '#FF6D00' : '#2E1305',
                            }}
                          >
                            <Icon className="text-xl sm:text-2xl" />
                          </div>

                          {/* Skill Name */}
                          <span className="text-xs font-bold text-[#2E1305] text-center leading-tight group-hover:text-[#C63702] transition-colors">
                            {skill.name}
                          </span>

                          {/* Orbit Node indicator dot */}
                          <div
                            className="absolute -bottom-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                            style={{
                              background: skill.color || '#FF6D00',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Orbit Instructions Hint */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none text-center">
              <span className="text-[11px] font-bold text-[#2E1305]/70 bg-white/70 backdrop-blur-md px-4 py-1 rounded-full border border-white/80 shadow-sm">
                Hover over any tool to inspect & pause rotation
              </span>
            </div>

          </div>

      </div>

      {/* Orbit Pause-on-Hover CSS Styling */}
      <style>{`
        .orbit-spin-container:hover,
        .orbit-spin-container:hover .orbit-counter-container {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

export default Skills;