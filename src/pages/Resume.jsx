import React, { useEffect, useRef } from 'react';
import { FaDownload, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaGlobe, FaAward, FaGoogleDrive } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import GlassCard from '../components/ui/GlassCard';
import AnimatedText from '../components/ui/AnimatedText';

const Resume = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.resume-element',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Gokul.pdf';
    link.download = 'Gokul_T_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center flex flex-col items-center resume-element">
          <AnimatedText text="My Resume" className="text-4xl md:text-5xl font-display font-bold text-[#2E1305] mb-4" />
          <div className="w-20 h-1 bg-gradient-to-r from-[#FF6D00] to-[#FFB300] rounded-full mb-6"></div>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#FF6D00] to-[#C63702] text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <FaDownload /> Download PDF
            </button>
            <a
              href="https://drive.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3 bg-white/90 border border-[#FF6D00]/30 text-[#2E1305] rounded-full font-bold text-sm shadow-md hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <FaGoogleDrive className="text-[#FF6D00] text-base" /> View on Google Drive
            </a>
            <button
              onClick={() => navigate('/certifications')}
              className="flex items-center gap-2 px-7 py-3 bg-white/90 border border-[#FF6D00]/30 text-[#2E1305] rounded-full font-bold text-sm shadow-md hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <FaAward className="text-amber-500 text-base" /> View Certifications (7)
            </button>
          </div>
        </div>

        {/* ── RESUME PREVIEW ───────────────────────────────────────────── */}
        <div className="resume-element">
          <GlassCard className="!bg-white/70 p-3 sm:p-5 shadow-2xl">

            {/* Browser chrome bar */}
            <div className="bg-slate-100 rounded-t-xl border border-slate-200 px-4 py-2.5 flex items-center gap-2 mb-0">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
              <span className="ml-4 text-xs font-mono text-slate-500">Gokul_T_Resume.pdf</span>
            </div>

            {/* Actual resume content */}
            <div className="bg-white border border-slate-200 rounded-b-xl p-8 md:p-10 font-sans text-[#111827]" style={{ fontFamily: 'Georgia, serif' }}>

              {/* ── NAME & TITLE ── */}
              <div className="flex justify-between items-start mb-4 border-b-2 border-[#1a2a6c] pb-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-[#1a2a6c] mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>GOKUL T</h1>
                  <p className="text-sm text-slate-600 font-medium">Creative Video Editor &nbsp;|&nbsp; Graphic Designer &nbsp;|&nbsp; UI/UX Specialist</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-700">
                    <span className="flex items-center gap-1"><FaEnvelope className="text-[#1a2a6c]" /> tgokul516@gmail.com</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-[#1a2a6c]">
                    <a href="https://www.linkedin.com/in/gokul-t-741959318" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1"><FaLinkedin /> linkedin.com/in/gokul-t-741959318</a>
                    <a href="https://github.com/gokulthangaraju9-jpg" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1"><FaGithub /> github.com/gokulthangaraju9-jpg</a>
                  </div>
                </div>
              </div>

              {/* ── INTERNSHIP OBJECTIVE ── */}
              <Section title="INTERNSHIP OBJECTIVE">
                <p className="text-xs text-slate-700 leading-relaxed">
                  Creative and detail-oriented Video Editor, Graphic Designer, and UI/UX Specialist with expertise in crafting visually engaging digital content, motion graphics, and modern web interfaces. Hands-on experience with editing tools, design systems, and frontend technologies like React and Tailwind CSS. Eager to deliver top-tier creative media and user-centered design solutions.
                </p>
              </Section>

              {/* ── EDUCATION ── */}
              <Section title="EDUCATION">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Bachelor of Technology — Kongunadu College of Engineering and Technology</p>
                    <p className="text-xs text-slate-600 mt-0.5">Information Technology &nbsp;·&nbsp; Anna University</p>
                  </div>
                  <div className="text-right text-xs text-slate-600 whitespace-nowrap ml-4">
                    <p>2023 – 2027</p>
                    <p className="mt-0.5">SSLC: 64%</p>
                  </div>
                </div>
              </Section>

              {/* ── SKILLS ── */}
              <Section title="SKILLS">
                <SkillRow label="Design & Creative Tools:" value="Photoshop · Canva · Figma · CapCut · Adobe Premiere Pro" />
                <SkillRow label="Programming & Development:" value="Java · JavaScript · React.js · Node.js" />
                <SkillRow label="Databases & Backend:" value="MongoDB · Firebase · SQL" />
                <SkillRow label="AI / Development Tools:" value="Gemini API · Streamlit · Git" />
                <SkillRow label="UI / Frontend:" value="React.js · Tailwind CSS · UI/UX Design" />
              </Section>

              {/* ── CERTIFICATIONS ── */}
              <Section title="CERTIFICATIONS">
                <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-700">
                  <li>Full Stack Developer – Infosys Springboard (2025)</li>
                  <li>Networking Fundamentals — TryHackMe (2026)</li>
                  <li>Linux Fundamentals — TryHackMe (2026)</li>
                  <li>Network Configuration — TryHackMe</li>
                </ul>
              </Section>

              {/* ── PROJECTS ── */}
              <Section title="PROJECTS">
                <ProjectItem
                  title="AI-Enabled Cyber Threat Detection & Reporting System"
                  link="github.com/pradeepgobi/AI-Enabled-Cyber-Threat-Detection-Reporting-System-"
                  desc="AI-powered web application to streamline cybersecurity incident reporting with instant AI-assisted guidance."
                  bullets={[
                    'Built with Python and ReactJS; secured using RSA encryption',
                    'Detects phishing attempts, malware, and system vulnerabilities in real time',
                  ]}
                />
                <ProjectItem
                  title="AI Web Analyzer"
                  link="github.com/pradeepgobi/Ai-Web_ananlayer"
                  desc="Scalable web application to analyze websites for security risks, fake content, and URL manipulation."
                  bullets={[
                    'Developed with TypeScript, Python, and MongoDB for efficient data processing',
                    'Integrated Gemini API to detect fake websites, URL similarity, and security vulnerabilities',
                  ]}
                />
                <ProjectItem
                  title="UI/UX Design & Creative Media Flow"
                  link="github.com/gokulthangaraju9-jpg/gokulportfolio16"
                  desc="Interactive portfolio and creative design system featuring modern UI/UX design, fluid motion, and video editing."
                  bullets={[
                    'Designed responsive UI wireframes and high-fidelity prototypes using Figma',
                    'Integrated motion graphics and video editing assets using Premiere Pro and CapCut',
                  ]}
                />
                <ProjectItem
                  title="Password Strengthener"
                  link="github.com/pradeepgobi/password_strengther"
                  desc="Tool to analyze password strength, detect vulnerabilities, and recommend secure password practices."
                  bullets={[
                    'Built with JavaScript and React for a clean, user-friendly interface',
                    'Integrated cryptographic analysis for secure password strength validation',
                  ]}
                />
              </Section>

              {/* ── EXPERIENCE & PRACTICE ── */}
              <Section title="EXPERIENCE & PRACTICE">
                <p className="text-xs font-bold text-slate-800 mb-1">Creative Media & UI/UX Design Practice</p>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-700">
                  <li>Designed intuitive, modern user interfaces and interactive wireframes using Figma</li>
                  <li>Edited high-engagement video content, reels, and motion sequences using Premiere Pro and CapCut</li>
                  <li>Created professional visual assets, branding elements, and promotional graphics using Photoshop and Canva</li>
                </ul>
              </Section>

            </div>
          </GlassCard>
        </div>

        {/* Bottom download & cert buttons */}
        <div className="text-center mt-8 resume-element flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#FF6D00] to-[#C63702] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <FaDownload /> Download Full PDF
          </button>
          <button
            onClick={() => navigate('/certifications')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/95 border border-[#FF6D00]/30 text-[#2E1305] rounded-full font-bold shadow-lg hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <FaAward className="text-amber-500 text-base" /> View All Certifications
          </button>
        </div>

      </div>
    </div>
  );
};

// ── Helper components ──────────────────────────────────────────────────────────
const Section = ({ title, children }) => (
  <div className="mb-5">
    <h2 className="text-[11px] font-black tracking-[0.12em] text-[#1a2a6c] uppercase border-b border-[#1a2a6c] pb-0.5 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
      {title}
    </h2>
    {children}
  </div>
);

const SkillRow = ({ label, value }) => (
  <p className="text-xs text-slate-700 mb-0.5">
    <span className="font-bold text-slate-800">{label}</span> {value}
  </p>
);

const ProjectItem = ({ title, link, desc, bullets }) => (
  <div className="mb-3">
    <p className="text-xs font-bold text-slate-800">{title}</p>
    <a href={`https://${link}`} target="_blank" rel="noreferrer" className="text-[11px] text-[#1a2a6c] hover:underline block">{link}</a>
    <p className="text-[11px] italic text-slate-600 mb-1">{desc}</p>
    <ul className="list-disc list-inside space-y-0.5">
      {bullets.map((b, i) => <li key={i} className="text-[11px] text-slate-700">{b}</li>)}
    </ul>
  </div>
);

export default Resume;