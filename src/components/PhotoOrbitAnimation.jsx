import React, { useState } from 'react';
import { FaPlay, FaExpand, FaPause, FaRedo, FaPalette, FaImage, FaFilm } from 'react-icons/fa';

export const GIVEN_ORBIT_PHOTOS = [
  {
    id: 'poster_tezario',
    title: 'TEZARIO 3.0 Hackathon',
    category: 'Poster Design',
    tag: 'Hackathon',
    image: '/poster_tezario.png',
    type: 'poster',
    color: '#FF6D00',
    icon: FaPalette,
    aspect: 'portrait',
  },
  {
    id: 'poster_1',
    title: 'Creative Poster Edition 1',
    category: 'Graphic Art',
    tag: 'Creative Edition',
    image: '/poster 1.png',
    type: 'poster',
    color: '#FFB300',
    icon: FaImage,
    aspect: 'portrait',
  },
  {
    id: 'poster_vc',
    title: 'GOKUL DESIGNER — Brand Poster',
    category: 'Brand Poster',
    tag: 'Brand Identity',
    image: '/poster VC.jpg',
    type: 'poster',
    color: '#FF6D00',
    icon: FaPalette,
    aspect: 'landscape',
  },
  {
    id: 'poster_vinayaka',
    title: 'Vinayaka Chaturthi Poster',
    category: 'Festive Poster',
    tag: 'Culture & Art',
    image: '/poster_vinayaka.jpg',
    type: 'poster',
    color: '#FF8F00',
    icon: FaImage,
    aspect: 'portrait',
  },
  {
    id: 'design_photo',
    title: 'Gokul T — Motion Reel',
    category: 'Video & Motion',
    tag: 'Intro Reel',
    image: '/design photo.png',
    video: '/GOKUL Intro video.mp4',
    type: 'video',
    color: '#EA77FF',
    icon: FaFilm,
    isVideo: true,
    aspect: 'landscape',
  },
  {
    id: 'kncet_video',
    title: 'KNCET — Campus & Event Video',
    category: 'Video Editing',
    tag: 'Campus Edit',
    image: '/design photo.png',
    video: '/KNCET.mp4',
    type: 'video',
    color: '#00D2FF',
    icon: FaFilm,
    isVideo: true,
    aspect: 'landscape',
  },
  {
    id: 'jailer_video',
    title: 'GOKUL — Jailer Cinematic Edit',
    category: 'Cinematic Reel',
    tag: 'Jailer Edit',
    image: '/design photo.png',
    video: '/GOKUL JAILER.mp4',
    type: 'video',
    color: '#FF3D00',
    icon: FaFilm,
    isVideo: true,
    aspect: 'landscape',
  },
  {
    id: 'ui_solution',
    title: 'UI/UX & Creative Flow',
    category: 'Product & UI/UX',
    tag: 'Digital Solution',
    image: '/ui_solution.png',
    type: 'design',
    color: '#00C4CC',
    icon: FaPalette,
    aspect: 'landscape',
  },
];

export default function PhotoOrbitAnimation({ onSelectPhoto, className = '' }) {
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [orbitSpeed, setOrbitSpeed] = useState(38); // seconds per full rotation

  const activeDisplay = hoveredPhoto || GIVEN_ORBIT_PHOTOS[0];

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      
      {/* ── Top Orbit Controls ── */}
      <div className="flex items-center gap-2 mb-6 z-30 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/90 shadow-md">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300"
          style={{
            background: isPaused ? '#C63702' : '#FF6D00',
            color: '#FFFFFF',
            boxShadow: '0 2px 10px rgba(198, 55, 2, 0.3)',
          }}
          title={isPaused ? 'Resume Orbit' : 'Pause Orbit'}
        >
          {isPaused ? <FaPlay className="text-[10px]" /> : <FaPause className="text-[10px]" />}
          <span>{isPaused ? 'Resume Orbit' : 'Pause Orbit'}</span>
        </button>

        <div className="h-4 w-px bg-stone-300 mx-1" />

        <span className="text-[11px] font-bold text-[#2E1305]/70 hidden sm:inline">Speed:</span>
        {[
          { label: 'Slow', sec: 50 },
          { label: 'Normal', sec: 38 },
          { label: 'Fast', sec: 24 },
        ].map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setOrbitSpeed(s.sec)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all ${
              orbitSpeed === s.sec
                ? 'bg-[#2E1305] text-white shadow-sm'
                : 'text-[#2E1305]/80 hover:bg-stone-100'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Orbit Canvas Container ── */}
      <div
        className="photo-orbit-stage relative flex items-center justify-center"
        style={{
          width: 'min(620px, 92vw)',
          height: 'min(620px, 92vw)',
          minWidth: 320,
          minHeight: 320,
        }}
      >
        {/* SVG Orbital Track Rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 600 600"
        >
          {/* Subtle Outer Glow Area */}
          <circle
            cx="300" cy="300" r="280"
            fill="none" stroke="rgba(255, 255, 255, 0.40)"
            strokeWidth="1.5" strokeDasharray="5 8"
          />

          {/* Main Orbital Track */}
          <circle
            cx="300" cy="300" r="230"
            fill="none" stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />

          {/* Inner Accent Ring */}
          <circle
            cx="300" cy="300" r="165"
            fill="none" stroke="rgba(255, 109, 0, 0.40)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Core Ambient Glow */}
          <circle
            cx="300" cy="300" r="110"
            fill="rgba(255, 248, 231, 0.25)"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="2"
          />
        </svg>

        {/* Orbit Rotating Energy Satellites */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            animation: `orbitSpin ${orbitSpeed * 0.7}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          <div
            className="absolute top-[70px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.95)]"
          />
          <div
            className="absolute bottom-[70px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#FFB300] shadow-[0_0_14px_#FFB300]"
          />
          <div
            className="absolute top-1/2 right-[70px] -translate-y-1/2 w-3 h-3 rounded-full bg-[#FF6D00] shadow-[0_0_12px_#FF6D00]"
          />
        </div>

        {/* ── Central Focal Hub ── */}
        <div
          onClick={() => onSelectPhoto && onSelectPhoto(activeDisplay)}
          className="relative z-30 group cursor-pointer flex flex-col items-center justify-center text-center p-4 rounded-full transition-all duration-500 shadow-2xl"
          style={{
            width: 'clamp(140px, 32vw, 195px)',
            height: 'clamp(140px, 32vw, 195px)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 231, 0.94))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '3px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 20px 60px rgba(198, 55, 2, 0.28), 0 0 35px rgba(255, 109, 0, 0.35)',
          }}
        >
          {/* Mini Thumbnail of Active Photo */}
          <div 
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 border-2 shadow-md group-hover:scale-105 transition-transform duration-300"
            style={{ borderColor: activeDisplay.color || '#FF6D00' }}
          >
            <img
              src={activeDisplay.image}
              alt={activeDisplay.title}
              className="w-full h-full object-cover"
            />
            {activeDisplay.isVideo && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <FaPlay className="text-white text-xs ml-0.5" />
              </div>
            )}
          </div>

          {/* Active Title */}
          <span className="font-display font-black text-[#2E1305] text-xs sm:text-sm line-clamp-1 px-2 leading-tight">
            {activeDisplay.title}
          </span>

          {/* Category Tag */}
          <span className="text-[10px] sm:text-[11px] font-bold text-[#C63702] uppercase tracking-wider mt-0.5">
            {activeDisplay.tag}
          </span>

          {/* Expand badge */}
          <div className="mt-1 flex items-center gap-1 text-[9px] font-extrabold text-[#FF6D00] uppercase tracking-wider opacity-85 group-hover:opacity-100">
            <FaExpand className="text-[8px]" /> Click to Open
          </div>
        </div>

        {/* ── Orbiting Photo Cards Container ── */}
        <div
          className="absolute inset-0 flex items-center justify-center photo-orbit-spin-track"
          style={{
            animation: `orbitSpin ${orbitSpeed}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {GIVEN_ORBIT_PHOTOS.map((photo, index) => {
            const total = GIVEN_ORBIT_PHOTOS.length;
            const isHovered = hoveredPhoto?.id === photo.id;

            return (
              <div
                key={photo.id}
                className="absolute flex items-center justify-center"
                style={{
                  transform: `rotate(${index * (360 / total)}deg) translateY(calc(-175px - 6.5vw))`,
                }}
              >
                {/* Counter-rotation to keep photo upright */}
                <div
                  className="photo-orbit-counter"
                  style={{
                    animation: `orbitSpinRev ${orbitSpeed}s linear infinite`,
                    animationPlayState: isPaused ? 'paused' : 'running',
                    transform: `rotate(-${index * (360 / total)}deg)`,
                  }}
                >
                  <div
                    onMouseEnter={() => setHoveredPhoto(photo)}
                    onMouseLeave={() => setHoveredPhoto(null)}
                    onClick={() => onSelectPhoto && onSelectPhoto(photo)}
                    className="group relative cursor-pointer rounded-2xl transition-all duration-300"
                    style={{
                      width: 'clamp(84px, 16vw, 116px)',
                      height: 'clamp(105px, 20vw, 142px)',
                      padding: '5px',
                      background: isHovered
                        ? 'linear-gradient(145deg, #FFFFFF, #FFF8E7)'
                        : 'rgba(255, 255, 255, 0.90)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: isHovered
                        ? '2.5px solid #FF6D00'
                        : '1.5px solid rgba(255, 255, 255, 0.90)',
                      boxShadow: isHovered
                        ? '0 20px 40px rgba(198, 55, 2, 0.40), 0 0 25px rgba(255, 109, 0, 0.45)'
                        : '0 8px 24px rgba(198, 55, 2, 0.16)',
                      transform: isHovered ? 'scale(1.22)' : 'scale(1)',
                      zIndex: isHovered ? 50 : 25,
                    }}
                  >
                    {/* Inner Image Container */}
                    <div className="w-full h-full rounded-xl overflow-hidden relative bg-stone-100 shadow-inner flex items-center justify-center">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Video overlay badge */}
                      {photo.isVideo && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#EA77FF] to-[#FF6D00] text-white flex items-center justify-center shadow-md">
                            <FaPlay className="text-[9px] ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay Title */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2E1305]/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-1.5 text-center">
                        <span className="text-[10px] font-bold text-white line-clamp-1 leading-tight">
                          {photo.title}
                        </span>
                        <span className="text-[8px] font-semibold text-[#FFB300] uppercase tracking-wider">
                          View
                        </span>
                      </div>
                    </div>

                    {/* Orbit Node Pin Indicator */}
                    <div
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                      style={{ background: photo.color }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orbit Footer Tip */}
      <div className="mt-4 text-center pointer-events-none">
        <span className="text-xs font-bold text-[#2E1305]/75 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/90 shadow-sm inline-flex items-center gap-2">
          <span>✨</span>
          <span>Hover over any photo to pause orbit & inspect • Click to view full image</span>
        </span>
      </div>

      {/* CSS for Orbit Pause on Hover */}
      <style>{`
        .photo-orbit-stage:hover .photo-orbit-spin-track,
        .photo-orbit-stage:hover .photo-orbit-counter {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
