import React, { useEffect, useRef } from 'react';
import { FaGraduationCap, FaHeart, FaBullseye } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '../components/ui/GlassCard';
import AnimatedText from '../components/ui/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal entire about section content
      gsap.fromTo('.about-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.about-grid', start: 'top 80%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C63702]"></span>
            <span className="text-[#C63702] font-bold tracking-widest text-xs uppercase">Get To Know Me</span>
          </div>
          <AnimatedText text="Who Am I" className="text-4xl md:text-5xl font-display font-bold text-[#2E1305] mb-6" />
        </div>

        {/* Main Content Layout */}
        <div className="about-grid grid lg:grid-cols-12 gap-8 items-start">

          {/* Text Description */}
          <GlassCard className="about-card lg:col-span-5 p-8 md:p-10 !bg-white/80">
            {/* Profile Header */}
            <div className="mb-6 pb-6 border-b border-[#FF6D00]/20">
              <h3 className="font-display font-bold text-[#2E1305] text-2xl leading-tight">GOKUL T</h3>
              <p className="text-sm font-semibold text-[#C63702] mt-0.5">Graphic Designer</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono font-medium text-[#2E1305]/70">Available for Opportunities</span>
              </div>
            </div>

            <p className="text-lg text-[#C63702] leading-relaxed mb-6 font-medium">
              I am a passionate <span className="text-[#2E1305] font-bold">Graphic Design</span> Information Technology graduate who loves graphic design, UI/UX design and communicating in a visual way. Skilled in creating posters, banners, social media creatives, logos, and marketing materials using Photoshop and Canva. Understands colour theory, typography, layout design and branding. Enthusiastic about creating creative concepts that are visually appealing and convey a message effectively to strengthen brand identity.
            </p>
            <p className="text-lg text-[#C63702] leading-relaxed font-medium mb-6">
            </p>
            {/* GitHub Portfolio Link */}
            <a
              href="https://github.com/gokulthangaraju9-jpg/gokulportfolio16"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF6D00] to-[#C63702] text-white text-sm font-bold rounded-full hover:brightness-110 transition-colors shadow-md"
            >
              <FaGraduationCap className="text-base" style={{ display: 'none' }} />
              <svg style={{ width: 16, height: 16, flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" /></svg>
              View Portfolio on GitHub
            </a>
          </GlassCard>

          {/* Info Cards */}
          <div className="about-card lg:col-span-7 flex flex-col gap-6">

            {/* Education — College */}
            <GlassCard className="p-6 flex items-start gap-5 hover:-translate-y-1 transition-transform group !bg-white/80">
              <div className="w-12 h-12 rounded-xl bg-[#C63702]/10 flex items-center justify-center text-[#C63702] shrink-0 group-hover:scale-110 transition-transform">
                <FaGraduationCap className="text-2xl" />
              </div>
              <div>
                <h3 className="font-display font-bold text-[#2E1305] text-xl mb-1">College</h3>
                <p className="text-[#C63702] font-semibold">B.Tech Information Technology</p>
                <p className="text-[#C63702] text-sm font-bold mt-0.5">IV Year — Currently Pursuing</p>
                <p className="text-sm text-[#C63702] mt-1 opacity-85">Kongunadu College of Engineering and Technology</p>
                <p className="text-xs text-[#C63702] mt-0.5 opacity-75">Batch: 2023 – 2027 &nbsp;·&nbsp; Focus: Graphic Designer Editor</p>
              </div>
            </GlassCard>


            {/* Passion */}
            <GlassCard className="p-6 flex items-start gap-5 hover:-translate-y-1 transition-transform group !bg-white/80">
              <div className="w-12 h-12 rounded-xl bg-[#FF6D00]/15 flex items-center justify-center text-[#C63702] shrink-0 group-hover:scale-110 transition-transform">
                <FaHeart className="text-xl" />
              </div>
              <div>
                <h3 className="font-display font-bold text-[#2E1305] text-xl mb-1">Passion</h3>
                <p className="text-[#C63702] font-medium">Graphic Designer Editor</p>
              </div>
            </GlassCard>

            {/* Goal */}
            <GlassCard className="p-6 flex items-start gap-5 hover:-translate-y-1 transition-transform group !bg-white/80">
              <div className="w-12 h-12 rounded-xl bg-[#C63702]/10 flex items-center justify-center text-[#2E1305] shrink-0 group-hover:scale-110 transition-transform">
                <FaBullseye className="text-xl" />
              </div>
              <div>
                <h3 className="font-display font-bold text-[#2E1305] text-xl mb-1">Goal</h3>
                <p className="text-[#C63702] font-medium">Elevating Digital Visual Experiences</p>
                <p className="text-sm text-[#C63702] mt-1 opacity-85">To produce industry-leading multimedia content, high-impact brand identities, and modern design that resonate globally.</p>
              </div>
            </GlassCard>

          </div>

        </div>
      </div>
    </div>
  );
};

export default About;