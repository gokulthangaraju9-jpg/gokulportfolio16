import React, { useState, useEffect, useRef } from 'react';

const TOOLS = [
  {
    id: 'canva',
    name: 'Canva',
    role: 'Visual Content',
    desc: 'Rapid design, social graphics & brand assets',
    color: '#00C4CC',
    accent: '#7D2AE8',
    iconSrc: '/tools/canva.svg',
    level: 95,
  },
  {
    id: 'figma',
    name: 'Figma',
    role: 'UI / UX Design',
    desc: 'Interactive wireframes, prototypes & design systems',
    color: '#FF7262',
    accent: '#A259FF',
    iconSrc: '/tools/figma.svg',
    level: 92,
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    role: 'Photo Compositing',
    desc: 'High-end raster editing, retouching & posters',
    color: '#31A8FF',
    accent: '#001E36',
    iconSrc: '/tools/photoshop.svg',
    level: 90,
  },
  {
    id: 'capcut',
    name: 'CapCut',
    role: 'AI Social Video',
    desc: 'Fast-paced reels, TikToks & viral video edits',
    color: '#FFFFFF',
    accent: '#18181B',
    iconSrc: '/tools/capcut.svg',
    level: 94,
  },
  {
    id: 'premiere',
    name: 'Premiere Pro',
    role: 'Timeline Editing',
    desc: 'Multi-cam, color grading & broadcast production',
    color: '#EA77FF',
    accent: '#00005B',
    iconSrc: '/tools/premiere.svg',
    level: 88,
  },
];

export default function SolutionFlowBanner({ className = '', compact = false }) {
  const [activeTool, setActiveTool] = useState(null);
  const canvasRef = useRef(null);

  // Background animated energy flow canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle sparks
    const sparks = Array.from({ length: 25 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 200),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    // Data packets
    const packets = Array.from({ length: 5 }, (_, i) => ({
      p: i / 5,
      speed: 0.0022 + Math.random() * 0.001,
      size: 3.2,
    }));

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      if (!W || !H) {
        animId = requestAnimationFrame(draw);
        return;
      }
      t++;
      ctx.clearRect(0, 0, W, H);

      // Node positions
      const count = TOOLS.length;
      const positions = TOOLS.map((_, i) => {
        const frac = i / (count - 1);
        const x = W * 0.09 + frac * W * 0.82;
        const wave = Math.sin(frac * Math.PI * 1.6) * (H * 0.22);
        const y = H * 0.48 + wave;
        return { x, y };
      });

      // Sparks
      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;
        s.phase += 0.03;
        ctx.save();
        ctx.globalAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
        ctx.fillStyle = '#FFF8E1';
        ctx.shadowColor = '#FFB300';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Connective energy path
      for (let i = 0; i < count - 1; i++) {
        const A = positions[i];
        const B = positions[i + 1];
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2;
        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const cpX = mx - dy * 0.14;
        const cpY = my + dx * 0.14;
        const segColor = TOOLS[i].color;

        // Outer glow
        ctx.save();
        ctx.globalAlpha = 0.28;
        ctx.strokeStyle = segColor;
        ctx.lineWidth = 10;
        ctx.shadowColor = segColor;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.quadraticCurveTo(cpX, cpY, B.x, B.y);
        ctx.stroke();

        // Core bright line
        ctx.globalAlpha = 0.85;
        ctx.lineWidth = 2.4;
        ctx.strokeStyle = '#FFFFFF';
        ctx.shadowColor = segColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.quadraticCurveTo(cpX, cpY, B.x, B.y);
        ctx.stroke();
        ctx.restore();

        // Direction arrow
        const arrowT = ((t * 0.005) % 1 + i * 0.2) % 1;
        const inv = 1 - arrowT;
        const ax = inv * inv * A.x + 2 * inv * arrowT * cpX + arrowT * arrowT * B.x;
        const ay = inv * inv * A.y + 2 * inv * arrowT * cpY + arrowT * arrowT * B.y;
        ctx.save();
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFD166';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(ax, ay, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Shooting data packets
      packets.forEach((pkt) => {
        pkt.p = (pkt.p + pkt.speed) % 1;
        const segF = pkt.p * (count - 1);
        const segIdx = Math.min(Math.floor(segF), count - 2);
        const segT = segF - segIdx;
        const A = positions[segIdx];
        const B = positions[segIdx + 1];
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2;
        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const cpX = mx - dy * 0.14;
        const cpY = my + dx * 0.14;
        const inv = 1 - segT;
        const px = inv * inv * A.x + 2 * inv * segT * cpX + segT * segT * B.x;
        const py = inv * inv * A.y + 2 * inv * segT * cpY + segT * segT * B.y;

        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = TOOLS[segIdx].color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-3xl border shadow-2xl transition-all duration-300 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FF851B 0%, #FF6D00 45%, #C63702 100%)',
        borderColor: 'rgba(255, 255, 255, 0.40)',
        boxShadow: '0 18px 48px rgba(198, 55, 2, 0.35), 0 0 30px rgba(255, 179, 0, 0.30)',
      }}
    >
      {/* Background design overlay watermark matching attached image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/design_bg_overlay.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.22,
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />

      {/* Luminous light ribbon */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 248, 231, 0.40) 0%, rgba(255, 179, 0, 0.15) 50%, transparent 80%)',
        }}
      />

      {/* Dynamic Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Top Header Badge */}
      <div className="relative z-10 px-6 pt-5 pb-2 flex items-center justify-between flex-wrap gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-amber-200 uppercase">
            CREATIVE SOLUTION FLOW
          </span>
        </div>
        <span className="text-xs font-mono text-white/80 tracking-wider">
          Canva ➔ Figma ➔ Photoshop ➔ CapCut ➔ Premiere Pro
        </span>
      </div>

      {/* 5 Tools Interactive Flow Row */}
      <div className="relative z-10 px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-2 items-center justify-between">
          {TOOLS.map((tool, idx) => {
            const isHovered = activeTool === tool.id;
            return (
              <div
                key={tool.id}
                onMouseEnter={() => setActiveTool(tool.id)}
                onMouseLeave={() => setActiveTool(null)}
                className="flex flex-col items-center text-center cursor-pointer group transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Glowing Orb Node with Tool Image Logo */}
                <div className="relative mb-3 flex items-center justify-center">
                  {/* Outer pulsing glow aura */}
                  <div
                    className="absolute -inset-2.5 rounded-full transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-125"
                    style={{
                      background: `radial-gradient(circle, ${tool.color}77 0%, transparent 70%)`,
                      filter: 'blur(6px)',
                    }}
                  />

                  {/* Pulsing ring */}
                  <div
                    className="absolute -inset-1 rounded-full border transition-all duration-300"
                    style={{
                      borderColor: isHovered ? '#FFFFFF' : `${tool.color}88`,
                      boxShadow: `0 0 16px ${tool.color}`,
                    }}
                  />

                  {/* Central Orb Disc with Tool SVG Image */}
                  <div
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-2.5 sm:p-3 transition-all duration-300 shadow-xl"
                    style={{
                      background: tool.id === 'capcut'
                        ? 'linear-gradient(135deg, #18181B, #000000)'
                        : `linear-gradient(135deg, rgba(255,255,255,0.95), ${tool.accent})`,
                      border: '2.5px solid rgba(255, 255, 255, 0.95)',
                      boxShadow: `0 8px 24px rgba(0,0,0,0.30), 0 0 20px ${tool.color}88`,
                      transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                    }}
                  >
                    <img
                      src={tool.iconSrc}
                      alt={tool.name}
                      className="w-full h-full object-contain drop-shadow"
                    />
                  </div>

                  {/* Step order badge on orb */}
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black font-mono flex items-center justify-center text-white bg-black/80 border border-white/60 shadow"
                  >
                    {idx + 1}
                  </span>
                </div>

                {/* Tool Name Pill Badge */}
                <div
                  className="px-3 py-1 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 mb-1"
                  style={{
                    background: isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(26, 12, 4, 0.85)',
                    borderColor: isHovered ? '#FFFFFF' : `${tool.color}aa`,
                    color: isHovered ? '#1A0C04' : '#FFFFFF',
                    boxShadow: `0 4px 14px ${tool.color}44`,
                  }}
                >
                  <p className="text-xs sm:text-sm font-black tracking-wide font-sans m-0">
                    {tool.name}
                  </p>
                </div>

                {/* Role text */}
                <p className="text-[11px] font-bold text-amber-100 tracking-wide">
                  {tool.role}
                </p>

                {/* Proficiency mini bar */}
                <div className="w-16 h-1 rounded-full bg-black/30 overflow-hidden mt-1.5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${tool.level}%`,
                      background: `linear-gradient(90deg, #FFD166, ${tool.color})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Tool Detail Footer Card */}
      {activeTool && (
        <div
          className="relative z-10 px-6 py-2.5 bg-black/40 backdrop-blur-md border-t border-white/15 flex items-center justify-between text-xs text-amber-100"
        >
          <span className="font-semibold">
            {TOOLS.find(t => t.id === activeTool)?.name}: {TOOLS.find(t => t.id === activeTool)?.desc}
          </span>
          <span className="font-mono font-bold text-amber-300">
            Proficiency: {TOOLS.find(t => t.id === activeTool)?.level}%
          </span>
        </div>
      )}
    </div>
  );
}
