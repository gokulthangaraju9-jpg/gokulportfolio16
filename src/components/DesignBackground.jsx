import React, { useEffect, useRef } from 'react';

/**
 * DesignBackground — Orange Digital Energy Flow Canvas
 *
 * A glowing, pulsing line of digital energy travels through the background,
 * connecting design tool nodes in sequence:
 *   Figma → Photoshop → Illustrator → Canva → After Effects → Blender → Three.js
 *
 * Theme: Rich warm orange / amber / gold — matching the portfolio's brand palette.
 *
 * Features:
 *  - Warm orange-to-deep-brown radiant gradient base  (#FF851B → #FF6D00 → #C63702)
 *  - Luminous sweeping amber light ribbon (same as Hero)
 *  - Orange-tinted neon energy path snaking between tool nodes
 *  - Data-packet orbs (white/amber) shooting along the path like electricity
 *  - Each node pulses with a warm glow halo + white tool name label
 *  - Floating warm sparks / digital particles
 *  - Subtle scanline shimmer for depth
 *  - Corner HUD circuit traces in orange/amber
 */
export default function DesignBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    /* ── Resize handler ── */
    const resize = () => {
      const parent = canvas.parentElement;
      const W = parent ? parent.clientWidth : window.innerWidth;
      const H = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Tool nodes: Canva, Figma, Photoshop, CapCut, Premiere Pro ── */
    const TOOLS = [
      { key: 'canva', label: 'CANVA', color: '#00C4CC', accent: '#7D2AE8', iconSrc: '/tools/canva.svg' },
      { key: 'figma', label: 'FIGMA', color: '#FF7262', accent: '#A259FF', iconSrc: '/tools/figma.svg' },
      { key: 'photoshop', label: 'PHOTOSHOP', color: '#31A8FF', accent: '#001E36', iconSrc: '/tools/photoshop.svg' },
      { key: 'capcut', label: 'CAPCUT', color: '#FFFFFF', accent: '#000000', iconSrc: '/tools/capcut.svg' },
      { key: 'premiere', label: 'PREMIERE PRO', color: '#EA77FF', accent: '#00005B', iconSrc: '/tools/premiere.svg' },
    ];

    /* Pre-load tool SVG icons for canvas drawing */
    const iconImages = {};
    TOOLS.forEach((t) => {
      const img = new Image();
      img.src = t.iconSrc;
      iconImages[t.key] = img;
    });

    /* ── Floating warm particles ── */
    const PARTICLE_COUNT = 75;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.40 + 0.10,
      phase: Math.random() * Math.PI * 2,
      // Warm hue range: 15–55 (orange → gold)
      hue: 15 + Math.random() * 40,
    }));

    /* ── Data packets flying along the path ── */
    const PACKET_COUNT = 10;
    const packets = Array.from({ length: PACKET_COUNT }, (_, i) => ({
      progress: i / PACKET_COUNT,
      speed: 0.0013 + Math.random() * 0.0009,
      size: Math.random() * 3 + 2.2,
      tail: [],
    }));

    /* ── Compute screen positions for each tool node (gentle S-curve) ── */
    const getNodePositions = (W, H) =>
      TOOLS.map((_, i) => {
        const frac = i / (TOOLS.length - 1);
        const x = W * 0.08 + frac * W * 0.84;
        const wave = Math.sin(frac * Math.PI * 1.6) * (H * 0.18);
        const y = H * 0.48 + wave;
        return { x, y };
      });

    /* ── Get (x,y) along entire path for progress 0..1 ── */
    const getPathPos = (progress, W, H) => {
      const np = getNodePositions(W, H);
      const totalSegs = np.length - 1;
      const p = Math.max(0, Math.min(0.9999, progress));
      const segF = p * totalSegs;
      const segIdx = Math.min(Math.floor(segF), totalSegs - 1);
      const segT = segF - segIdx;
      const A = np[segIdx];
      const B = np[segIdx + 1];
      const mx = (A.x + B.x) / 2;
      const my = (A.y + B.y) / 2;
      const dx = B.x - A.x;
      const dy = B.y - A.y;
      const cpX = mx - dy * 0.18 + Math.sin(segIdx * 2.3) * 38;
      const cpY = my + dx * 0.18 + Math.cos(segIdx * 1.7) * 28;
      const inv = 1 - segT;
      return {
        x: inv * inv * A.x + 2 * inv * segT * cpX + segT * segT * B.x,
        y: inv * inv * A.y + 2 * inv * segT * cpY + segT * segT * B.y,
        segIdx,
      };
    };

    /* ── Draw a glowing line segment ── */
    const drawGlowLine = (x1, y1, x2, y2, color, width, glow, alpha) => {
      ctx.save();
      // Outer soft glow
      ctx.globalAlpha = alpha * 0.30;
      ctx.strokeStyle = color;
      ctx.lineWidth = glow;
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      // Core bright line
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    /* ══════════════════════════════════════
       MAIN DRAW LOOP
    ══════════════════════════════════════ */
    const draw = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      t++;

      ctx.clearRect(0, 0, W, H);

      /* ── 1. WARM ORANGE RADIANT GRADIENT BASE ── */
      const bg = ctx.createLinearGradient(0, 0, W * 0.9, H);
      bg.addColorStop(0.00, '#FF851B');
      bg.addColorStop(0.30, '#FF6D00');
      bg.addColorStop(0.65, '#F4511E');
      bg.addColorStop(1.00, '#C63702');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* ── 2. LUMINOUS SWEEPING AMBER / GOLD LIGHT RIBBON (same style as Hero) ── */
      ctx.save();
      const ribbon = ctx.createLinearGradient(0, H * 0.85, W, H * 0.15);
      ribbon.addColorStop(0.00, 'rgba(255,255,255,0.02)');
      ribbon.addColorStop(0.35, 'rgba(255,224,178,0.32)');
      ribbon.addColorStop(0.65, 'rgba(255,248,225,0.24)');
      ribbon.addColorStop(1.00, 'rgba(255,179,0,0.10)');
      ctx.fillStyle = ribbon;
      ctx.beginPath();
      ctx.moveTo(-W * 0.05, H * 0.88);
      ctx.bezierCurveTo(
        W * 0.22, H * 0.80 + Math.sin(t * 0.010) * 12,
        W * 0.40, H * 0.48 + Math.cos(t * 0.008) * 14,
        W * 0.70, H * 0.36 + Math.sin(t * 0.012) * 10
      );
      ctx.bezierCurveTo(W * 0.88, H * 0.28, W * 0.98, H * 0.15, W * 1.10, H * 0.06);
      ctx.lineTo(W * 1.10, H * 0.30);
      ctx.bezierCurveTo(W * 0.88, H * 0.44, W * 0.65, H * 0.60, W * 0.36, H * 0.74);
      ctx.bezierCurveTo(W * 0.18, H * 0.86, W * 0.05, H * 0.96, -W * 0.05, H * 1.05);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      /* ── 3. FLOATING WARM SPARK PARTICLES ── */
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        p.phase += 0.020;
        const a = p.alpha * (0.55 + 0.45 * Math.sin(p.phase));
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = `hsl(${p.hue}, 100%, 80%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ── 4. ENERGY PATH — draw Bezier segments between nodes ── */
      const nodePos = getNodePositions(W, H);
      const SEGS = nodePos.length - 1;

      for (let i = 0; i < SEGS; i++) {
        const A = nodePos[i];
        const B = nodePos[i + 1];
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2;
        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const cpX = mx - dy * 0.18 + Math.sin(i * 2.3) * 38;
        const cpY = my + dx * 0.18 + Math.cos(i * 1.7) * 28;
        const segColor = TOOLS[i].color;

        /* Stroke in small steps for glow effect */
        const STEPS = 32;
        for (let s = 0; s < STEPS; s++) {
          const ta = s / STEPS;
          const tb = (s + 1) / STEPS;
          const invA = 1 - ta;
          const x1 = invA * invA * A.x + 2 * invA * ta * cpX + ta * ta * B.x;
          const y1 = invA * invA * A.y + 2 * invA * ta * cpY + ta * ta * B.y;
          const invB = 1 - tb;
          const x2 = invB * invB * A.x + 2 * invB * tb * cpX + tb * tb * B.x;
          const y2 = invB * invB * A.y + 2 * invB * tb * cpY + tb * tb * B.y;
          const frac = (i + ta) / SEGS;
          const shimmer = 0.5 + 0.5 * Math.sin(t * 0.07 - (i + ta) * 4.5);
          const lineAlpha = (0.60 + 0.12 * Math.sin(t * 0.04 + frac * 5)) * (0.72 + 0.28 * shimmer);
          drawGlowLine(x1, y1, x2, y2, segColor, 2.0, 8, lineAlpha);
        }

        /* Animated direction arrow tick */
        const arrowT = ((t * 0.004) % 1 + i * 0.15) % 1;
        const inv = 1 - arrowT;
        const ax = inv * inv * A.x + 2 * inv * arrowT * cpX + arrowT * arrowT * B.x;
        const ay = inv * inv * A.y + 2 * inv * arrowT * cpY + arrowT * arrowT * B.y;
        const tN = Math.min(arrowT + 0.01, 0.9999);
        const invN = 1 - tN;
        const bx = invN * invN * A.x + 2 * invN * tN * cpX + tN * tN * B.x;
        const by = invN * invN * A.y + 2 * invN * tN * cpY + tN * tN * B.y;
        const angle = Math.atan2(by - ay, bx - ax);
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(angle);
        ctx.globalAlpha = 0.55;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.6;
        ctx.shadowColor = '#FFB300';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(-6, -4);
        ctx.lineTo(0, 0);
        ctx.lineTo(-6, 4);
        ctx.stroke();
        ctx.restore();
      }

      /* ── 5. TOOL NODES WITH TOOL LOGO IMAGES & NAMES ── */
      nodePos.forEach((pos, i) => {
        const tool = TOOLS[i];
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.045 + i * 1.1);
        const nodeR = 21 + pulse * 4;

        /* Outer warm halo */
        const halo = ctx.createRadialGradient(pos.x, pos.y, nodeR * 0.1, pos.x, pos.y, nodeR * 2.8);
        halo.addColorStop(0.0, `${tool.color}65`);
        halo.addColorStop(0.5, `${tool.color}20`);
        halo.addColorStop(1.0, `${tool.color}00`);
        ctx.save();
        ctx.globalAlpha = 0.80 + 0.20 * pulse;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeR * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        /* Pulsing expand ring */
        ctx.save();
        ctx.globalAlpha = (1 - pulse) * 0.55;
        ctx.strokeStyle = tool.color;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = tool.color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeR + pulse * 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        /* Solid node with radial fill */
        const nodeFill = ctx.createRadialGradient(
          pos.x - nodeR * 0.3, pos.y - nodeR * 0.3, 2,
          pos.x, pos.y, nodeR
        );
        nodeFill.addColorStop(0.0, '#FFFFFF');
        nodeFill.addColorStop(0.35, tool.color);
        nodeFill.addColorStop(1.0, `${tool.accent}CC`);
        ctx.save();
        ctx.fillStyle = nodeFill;
        ctx.shadowColor = tool.color;
        ctx.shadowBlur = 22 + pulse * 12;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.90)';
        ctx.lineWidth = 2.0;
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.restore();

        /* Spinning dashed ring */
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(t * 0.020 * (i % 2 === 0 ? 1 : -1));
        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 5]);
        ctx.globalAlpha = 0.55 + 0.30 * pulse;
        ctx.beginPath();
        ctx.arc(0, 0, nodeR + 7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        /* Draw Tool SVG Logo Image inside the orb */
        const iconImg = iconImages[tool.key];
        if (iconImg && iconImg.complete && iconImg.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, nodeR - 2.5, 0, Math.PI * 2);
          ctx.clip();
          ctx.fillStyle = tool.key === 'capcut' ? '#000000' : 'rgba(10, 10, 15, 0.35)';
          ctx.fill();
          const imgSize = (nodeR - 3) * 1.45;
          ctx.drawImage(
            iconImg,
            pos.x - imgSize / 2,
            pos.y - imgSize / 2,
            imgSize,
            imgSize
          );
          ctx.restore();
        }

        /* Tool Name Badge Pill */
        const labelY = pos.y + nodeR + 20;
        ctx.save();
        ctx.font = 'bold 11px "Outfit", "Segoe UI", sans-serif';
        const textWidth = ctx.measureText(tool.label).width;
        const pillW = textWidth + 24;
        const pillH = 22;

        ctx.fillStyle = 'rgba(26, 12, 4, 0.88)';
        ctx.strokeStyle = `${tool.color}bb`;
        ctx.lineWidth = 1.3;
        ctx.shadowColor = tool.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(pos.x - pillW / 2, labelY - pillH / 2, pillW, pillH, 11);
        } else {
          ctx.rect(pos.x - pillW / 2, labelY - pillH / 2, pillW, pillH);
        }
        ctx.fill();
        ctx.stroke();

        /* Pulsing indicator dot */
        ctx.fillStyle = tool.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(pos.x - pillW / 2 + 8, labelY, 3, 0, Math.PI * 2);
        ctx.fill();

        /* Label text */
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = tool.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(tool.label, pos.x + 4, labelY);
        ctx.restore();
      });

      /* ── 6. DATA PACKETS (white/amber orbs with tails) ── */
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.speed = 0.0013 + Math.random() * 0.0009;
          pkt.tail = [];
        }

        const pos = getPathPos(pkt.progress, W, H);
        const toolFrac = pkt.progress * (TOOLS.length - 1);
        const tidx = Math.min(Math.floor(toolFrac), TOOLS.length - 2);
        const nodeColor = TOOLS[tidx].color;

        pkt.tail.push({ x: pos.x, y: pos.y });
        if (pkt.tail.length > 20) pkt.tail.shift();

        /* Fading tail */
        for (let ti = 0; ti < pkt.tail.length - 1; ti++) {
          const ta = pkt.tail[ti];
          const tb = pkt.tail[ti + 1];
          const tailAlpha = (ti / pkt.tail.length) * 0.60;
          ctx.save();
          ctx.globalAlpha = tailAlpha;
          ctx.strokeStyle = nodeColor;
          ctx.lineWidth = pkt.size * (ti / pkt.tail.length) * 1.0;
          ctx.shadowColor = nodeColor;
          ctx.shadowBlur = 10;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(ta.x, ta.y);
          ctx.lineTo(tb.x, tb.y);
          ctx.stroke();
          ctx.restore();
        }

        /* Orb head */
        ctx.save();
        const orbGlow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pkt.size * 3.2);
        orbGlow.addColorStop(0.00, '#FFFFFF');
        orbGlow.addColorStop(0.25, nodeColor);
        orbGlow.addColorStop(1.00, `${nodeColor}00`);
        ctx.fillStyle = orbGlow;
        ctx.globalAlpha = 0.92;
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pkt.size * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pkt.size * 0.65, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ── 7. SCANLINE SHIMMER ── */
      ctx.save();
      ctx.globalAlpha = 0.020;
      for (let sy = 0; sy < H; sy += 4) {
        ctx.fillStyle = sy % 8 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
        ctx.fillRect(0, sy, W, 2);
      }
      ctx.restore();

      /* ── 8. SUBTLE DARK VIGNETTE EDGES ── */
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.88);
      vignette.addColorStop(0.0, 'rgba(0,0,0,0.00)');
      vignette.addColorStop(1.0, 'rgba(0,0,0,0.40)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      /* ── 9. CORNER CIRCUIT TRACES (amber/orange HUD) ── */
      ctx.save();
      ctx.strokeStyle = 'rgba(255,179,0,0.22)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(0, 42);
      ctx.lineTo(62, 42);
      ctx.lineTo(62, 82);
      ctx.lineTo(122, 82);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 57);
      ctx.lineTo(36, 57);
      ctx.lineTo(36, 96);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(W, H - 42);
      ctx.lineTo(W - 72, H - 42);
      ctx.lineTo(W - 72, H - 77);
      ctx.lineTo(W - 132, H - 77);
      ctx.stroke();
      ctx.setLineDash([]);
      [[62, 82], [122, 82], [36, 96], [W - 72, H - 77], [W - 132, H - 77]].forEach(([cx, cy]) => {
        ctx.fillStyle = 'rgba(255,179,0,0.60)';
        ctx.beginPath();
        ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      /* ── 10. HUD STATUS LABEL ── */
      ctx.save();
      ctx.font = '9px "Courier New", monospace';
      ctx.fillStyle = 'rgba(46,19,5,0.55)';
      ctx.textAlign = 'left';
      ctx.fillText('// DESIGN_FLOW :: ACTIVE', 14, H - 16);
      ctx.fillText(`// PACKETS: ${PACKET_COUNT}  //  NODES: ${TOOLS.length}`, 14, H - 5);
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
