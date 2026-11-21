import React, { useState } from 'react';
import { FaGithub, FaPlay, FaPalette, FaStar, FaUsers, FaCalendar, FaTimes, FaExpand } from 'react-icons/fa';
import GlassCard from '../components/ui/GlassCard';
import AnimatedText from '../components/ui/AnimatedText';
import PhotoOrbitAnimation, { GIVEN_ORBIT_PHOTOS } from '../components/PhotoOrbitAnimation';

const FeaturedProject = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="min-h-screen pt-24 pb-16 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Featured Project Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <AnimatedText text="Featured Showcase" className="text-4xl md:text-5xl font-display font-bold text-[#2E1305] mb-4" />
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6D00] to-[#FFB300] rounded-full"></div>
          <p className="mt-4 text-[#C63702] font-semibold max-w-xl text-center">
            Interactive 3D Photo Orbit Animation showcasing creative posters, video reels, and visual design assets
          </p>
        </div>

        {/* Featured Showcase Card with Live Photo Orbit */}
        <GlassCard className="rounded-3xl overflow-hidden p-6 md:p-12 mb-20 border-white/80 !bg-white/85 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column — Interactive Photo Orbit Animation */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <PhotoOrbitAnimation onSelectPhoto={(photo) => setSelectedPhoto(photo)} />
            </div>

            {/* Right Column — Project Story & Tech Details */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Featured Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF6D00]/15 to-[#C63702]/15 text-[#C63702] border border-[#FF6D00]/30 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#FF6D00] animate-pulse" />
                Featured Creative Orbit Project
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-[#2E1305] leading-tight">
                Photo Orbit Animation & Visual Suite
              </h1>

              {/* Description */}
              <p className="text-base text-[#2E1305]/85 leading-relaxed">
                An interactive circular orbital showcase engineered for modern creative media. Revolving given high-resolution poster artworks, event banners, and video edit reels around a live focal hub with responsive counter-rotation and instant inspection modals.
              </p>

              {/* Orbit Features List */}
              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-[#2E1305]">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-white">
                  <span className="text-[#FF6D00]">💫</span> 360° Photo Orbit Flow
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-white">
                  <span className="text-[#FF6D00]">🎯</span> Pause on Hover
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-white">
                  <span className="text-[#FF6D00]">⚡</span> Speed Adjustments
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-white">
                  <span className="text-[#FF6D00]">🔍</span> Fullscreen Modal
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-xs font-bold text-[#C63702] uppercase tracking-wider mb-2">Designed & Powered With:</p>
                <div className="flex flex-wrap gap-2">
                  {['Photoshop', 'Canva', 'Premiere Pro', 'Figma', 'React', 'GSAP', 'CSS3 Orbit'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white text-[#C63702] border border-orange-100 rounded-lg font-bold text-xs shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://github.com/gokulthangaraju9-jpg/gokulportfolio16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF6D00] to-[#C63702] text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#C63702]/25"
                >
                  <FaGithub className="text-base" />
                  View Repository
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(GIVEN_ORBIT_PHOTOS.find(p => p.isVideo) || GIVEN_ORBIT_PHOTOS[0])}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#C63702] rounded-xl font-bold text-sm border border-white/80 hover:bg-stone-50 transition-all shadow-md"
                >
                  <FaPlay className="text-xs" />
                  Watch Video Reel
                </button>
              </div>

              {/* Project Stats */}
              <div className="flex flex-wrap gap-6 pt-2 text-[#2E1305]/70 text-xs font-bold border-t border-[#FF6D00]/20">
                <div className="flex items-center gap-2">
                  <FaStar className="text-[#FFB300]" />
                  <span>6 Photos in Orbit</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPalette className="text-[#FF6D00]" />
                  <span>Graphic & Video Suite</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-[#C63702]" />
                  <span>2026 Edition</span>
                </div>
              </div>

            </div>
          </div>
        </GlassCard>

        {/* Orbit Photo Lightbox / Video Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            {selectedPhoto.isVideo ? (
              <div
                className="bg-stone-950 border border-purple-500/40 p-6 rounded-3xl max-w-2xl w-full shadow-2xl text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎬</span>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">{selectedPhoto.title}</h3>
                      <p className="text-xs text-purple-300 font-semibold">{selectedPhoto.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C63702] transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden bg-black mb-4 border border-white/15">
                  <video
                    key={selectedPhoto.video || selectedPhoto.title}
                    controls
                    autoPlay
                    playsInline
                    poster={selectedPhoto.image}
                    className="w-full max-h-[55vh] object-contain block bg-black"
                  >
                    <source src={selectedPhoto.video || "/GOKUL Intro video.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ) : (
              <div
                className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-[#C63702] transition-colors shadow-lg text-lg"
                >
                  <FaTimes />
                </button>
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-[82vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border-2 border-white/90 bg-white"
                />
                <div className="mt-3 px-5 py-2 rounded-full bg-stone-900/85 backdrop-blur-md text-white text-sm font-semibold tracking-wide border border-white/20 shadow-lg">
                  {selectedPhoto.title} • {selectedPhoto.category}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Additional Works Section */}
        <div className="mt-12">
          <div className="mb-10 text-center flex flex-col items-center">
            <AnimatedText text="Given Projects in Gallery" className="text-3xl font-display font-bold text-[#2E1305] mb-3" />
            <div className="w-16 h-1 bg-gradient-to-r from-[#FF6D00] to-[#FFB300] rounded-full"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GIVEN_ORBIT_PHOTOS.map((item) => (
              <GlassCard
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group cursor-pointer p-4 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 !bg-white/85"
              >
                <div className="w-full h-56 rounded-xl overflow-hidden mb-3 bg-stone-100 flex items-center justify-center relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E1305]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                    <span className="text-white text-xs font-bold px-3 py-1 rounded-full bg-[#C63702]">
                      Click to View
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-[#2E1305] text-base group-hover:text-[#FF6D00] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#C63702] font-semibold mt-1">
                  {item.category}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturedProject;
