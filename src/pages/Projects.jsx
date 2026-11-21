import React, { useState, useRef } from 'react';
import { FaGithub, FaTimes, FaPlay } from 'react-icons/fa';
import GlassCard from '../components/ui/GlassCard';
import AnimatedText from '../components/ui/AnimatedText';
import PhotoOrbitAnimation from '../components/PhotoOrbitAnimation';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const containerRef = useRef(null);

  const projects = [
    {
      id: 'gokul_intro',
      title: 'GOKUL T — Official Intro Video',
      description: 'Creative video editor reel & motion graphics showcase',
      longDescription: 'High-engagement intro video highlighting creative video editing, pacing, dynamic cuts, color grading, and modern motion graphics edited in Premiere Pro and CapCut.',
      tech: ['Premiere Pro', 'CapCut', 'Motion VFX', 'Sound Design'],
      category: 'video',
      image: '/design photo.png',
      video: '/GOKUL Intro video.mp4',
      isVideo: true
    },
    {
      id: 'kncet_video',
      title: 'KNCET — Campus & Event Video Showcase',
      description: 'Cinematic institutional promo & event video edit',
      longDescription: 'A dynamic, high-energy institutional showcase video created for KNCET (Kongunadu College of Engineering and Technology). Featuring cinematic pacing, smooth transitions, drone shot integration, typography animation, and crisp audio engineering.',
      tech: ['Premiere Pro', 'After Effects', 'CapCut', 'Sound Design'],
      category: 'video',
      image: '/design photo.png',
      video: '/KNCET.mp4',
      isVideo: true
    },
    {
      id: 'jailer_video',
      title: 'GOKUL — Jailer Cinematic Video Edit',
      description: 'High-octane cinematic movie edit & beat-synced visuals',
      longDescription: 'A gripping, dynamic cinematic video edit featuring pulse-pounding rhythm synchronization, powerful color grading, speed ramping, and impactful bass drops edited in Premiere Pro.',
      tech: ['Premiere Pro', 'After Effects', 'Beat Sync', 'Sound Design'],
      category: 'video',
      image: '/design photo.png',
      video: '/GOKUL JAILER.mp4',
      isVideo: true
    },
    {
      id: 1,
      title: 'TEZARIO 3.0 Hackathon Poster',
      category: 'poster',
      image: '/poster_tezario.png',
      isImageOnly: true,
    },
    {
      id: 3,
      title: 'Creative Poster Design — Edition 1',
      category: 'poster',
      image: '/poster 1.png',
      isImageOnly: true,
    },
    {
      id: 6,
      title: 'GOKUL DESIGNER — Brand Poster',
      category: 'poster',
      image: '/poster VC.jpg',
      isImageOnly: true,
    },
    {
      id: 7,
      title: 'Vinayaka Chaturthi — Festive Creative Poster',
      category: 'poster',
      image: '/poster_vinayaka.jpg',
      isImageOnly: true,
    },
    {
      id: 4,
      title: 'UI/UX & Creative Media Flow',
      description: 'Creative design, motion visuals & video edits',
      longDescription: 'A comprehensive creative portfolio showcasing high-engagement video edits (Premiere Pro, CapCut), UI/UX prototypes and wireframes (Figma), and digital graphic assets (Photoshop, Canva).',
      tech: ['Canva', 'Figma', 'Photoshop', 'CapCut', 'Premiere Pro'],
      github: 'https://github.com/gokulthangaraju9-jpg/gokulportfolio16',
      category: 'design',
      image: '/ui_solution.png',
      isImg: true
    },
    {
      id: 5,
      title: 'AI Web Analyzer & Visual Suite',
      description: 'Automated digital tool for analyzing web visuals',
      longDescription: 'An automated analysis tool that evaluates website layout performance, responsive UI metrics, and visual asset optimization.',
      tech: ['AI', 'Python', 'Web'],
      github: 'https://github.com/gokulthangaraju9-jpg/gokulportfolio16',
      category: 'design',
      image: '🌐'
    }
  ];

  // Handle click on orbiting photo
  const handleOrbitPhotoSelect = (orbitPhoto) => {
    const matchedProject = projects.find(
      (p) =>
        (orbitPhoto.id && p.id === orbitPhoto.id) ||
        (orbitPhoto.video && p.video === orbitPhoto.video) ||
        (orbitPhoto.image && p.image === orbitPhoto.image)
    );
    if (matchedProject) {
      setSelectedProject(matchedProject);
    } else {
      setSelectedProject({
        title: orbitPhoto.title,
        image: orbitPhoto.image,
        video: orbitPhoto.video,
        category: orbitPhoto.type,
        isImageOnly: !orbitPhoto.isVideo,
        isVideo: orbitPhoto.isVideo,
        tech: ['Video Editing', 'Premiere Pro'],
        description: orbitPhoto.category,
      });
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-16 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section Heading */}
        <div className="mb-8 text-center flex flex-col items-center">
          <AnimatedText text="Featured Projects" className="text-4xl md:text-5xl font-display font-bold text-[#2E1305] mb-4" />
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6D00] to-[#FFB300] rounded-full"></div>
          <p className="mt-3 text-sm sm:text-base text-[#C63702] font-semibold max-w-lg text-center">
            Explore creative video edits, promotional posters, and UI/UX prototypes in interactive 3D Photo Orbit
          </p>
        </div>

        {/* ── 3D PHOTO ORBIT ANIMATION SHOWCASE ── */}
        <div className="flex flex-col items-center mb-16 animate-fadeIn">
          <GlassCard className="w-full max-w-4xl p-6 sm:p-10 !bg-white/85 rounded-3xl border-white/90 shadow-2xl flex flex-col items-center">
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6D00]/10 text-[#C63702] border border-[#FF6D00]/25 text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6D00] animate-ping" />
                Live Revolving Photo Orbit
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#2E1305] font-display">
                Interactive Given Photo Orbit
              </h3>
            </div>

            {/* Orbit Animation Component with Given Photos */}
            <PhotoOrbitAnimation onSelectPhoto={handleOrbitPhotoSelect} />
          </GlassCard>
        </div>

        {/* ── PROJECT SHOWCASE GRID ── */}
        <div className="mb-16">
          {/* Section Divider & Heading */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-[#2E1305]">
                All Projects & Creative Works
              </h3>
              <p className="text-xs sm:text-sm text-[#C63702] font-semibold">
                Click any project card to watch the video or view full artwork
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All', count: projects.length },
                { id: 'video', label: '🎬 Videos', count: projects.filter(p => p.category === 'video').length },
                { id: 'poster', label: '🎨 Posters', count: projects.filter(p => p.category === 'poster').length },
                { id: 'design', label: '✨ UI/UX & Web', count: projects.filter(p => p.category === 'design').length },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                    filter === tab.id
                      ? 'bg-[#2E1305] text-white shadow-md scale-105'
                      : 'bg-white/85 text-[#2E1305]/80 hover:bg-white hover:text-[#C63702] border border-stone-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    filter === tab.id ? 'bg-[#FF6D00] text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => {
              const isVid = p.isVideo;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="group cursor-pointer bg-white/90 hover:bg-white backdrop-blur-xl border border-white/95 rounded-3xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 mb-4 shadow-md flex items-center justify-center">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {isVid && (
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                          <div 
                            className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"
                            style={{
                              background: p.id === 'kncet_video'
                                ? 'linear-gradient(135deg, #00D2FF, #0077FF)'
                                : p.id === 'jailer_video'
                                ? 'linear-gradient(135deg, #FF3D00, #FF9100)'
                                : 'linear-gradient(135deg, #EA77FF, #FF6D00)',
                            }}
                          >
                            <FaPlay className="text-sm ml-0.5" />
                          </div>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {p.category === 'video' ? 'Video Edit' : p.category}
                      </span>
                    </div>

                    {/* Card Title & Desc */}
                    <h4 className="font-display font-bold text-base text-[#2E1305] group-hover:text-[#C63702] transition-colors mb-1.5 line-clamp-1">
                      {p.title}
                    </h4>
                    {p.description && (
                      <p className="text-xs text-[#2E1305]/75 line-clamp-2 mb-3">
                        {p.description}
                      </p>
                    )}
                  </div>

                  {/* Card Footer / Tech Tags */}
                  <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between flex-wrap gap-2 mt-auto">
                    {p.tech ? (
                      <div className="flex flex-wrap gap-1">
                        {p.tech.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FF6D00]/10 text-[#C63702] border border-[#FF6D00]/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-[#FF6D00]">Creative Poster</span>
                    )}

                    <span className="text-xs font-bold text-[#FF6D00] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {isVid ? 'Watch' : 'View'} →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal for viewing project details / photo / video */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-stone-900/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            {selectedProject.isImageOnly || selectedProject.category === 'poster' ? (
              <div 
                className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-[#C63702] transition-colors shadow-lg text-lg"
                >
                  <FaTimes />
                </button>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border-2 border-white/80 bg-white"
                />
                <div className="mt-3 px-5 py-2 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-sm font-semibold tracking-wide border border-white/20 shadow-lg">
                  {selectedProject.title}
                </div>
              </div>
            ) : selectedProject.isVideo ? (
              <div 
                className="bg-stone-950/95 backdrop-blur-2xl border border-purple-500/40 p-6 md:p-8 rounded-3xl max-w-2xl w-full shadow-2xl transform transition-all text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎬</span>
                    <div>
                      <h2 className="text-xl font-bold text-white font-display">
                        {selectedProject.title}
                      </h2>
                      <p className="text-xs text-purple-300 font-semibold">{selectedProject.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C63702] transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="rounded-2xl overflow-hidden bg-black mb-5 border border-white/15 shadow-2xl">
                  <video
                    key={selectedProject.video}
                    controls
                    autoPlay
                    playsInline
                    poster={selectedProject.image}
                    className="w-full max-h-[52vh] object-contain block bg-black"
                  >
                    <source src={selectedProject.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {selectedProject.longDescription && (
                  <p className="text-stone-300 text-sm mb-5 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                )}

                {selectedProject.tech && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="text-xs font-semibold bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/35">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div 
                className="bg-white/95 backdrop-blur-xl border border-white p-8 rounded-3xl max-w-lg w-full shadow-2xl transform transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  {selectedProject.isImg ? (
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-16 h-16 rounded-xl object-cover" />
                  ) : (
                    <div className="text-5xl">{selectedProject.image}</div>
                  )}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#C63702] hover:text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-[#2E1305] mb-4 font-display">
                  {selectedProject.title}
                </h2>
                {selectedProject.longDescription && (
                  <p className="text-[#C63702] mb-6 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                )}

                {selectedProject.tech && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="text-xs font-semibold bg-[#FF6D00]/10 text-[#C63702] px-3 py-1.5 rounded-full border border-[#FF6D00]/25">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6D00] to-[#C63702] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all shadow-md hover:shadow-[#C63702]/30"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Projects;