import React, { useEffect, useRef } from 'react';

/**
 * ThreeBackground — Unified Digital Energy Flow Canvas
 *
 * Provides a rich, dynamic background for the entire portfolio (especially the front/Hero page):
 *  - Warm radiant orange gradient base (#FF851B → #FF6D00 → #C63702)
 *  - Luminous sweeping amber & gold light ribbon
 *  - Glowing neon energy flow path snaking across the screen with directional flow arrows
 *  - Data-packet orbs (white & amber) shooting along the path with glowing particle tails
 *  - Pulsing energy nodes with warm halos
 *  - Floating warm digital sparks / particles
 *  - Subtle telemetry & HUD circuit traces
 *  - Left-hand hero text area kept clear and readable
 */
export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Creative Suite Tool Flow Nodes (Canva, Figma, Photoshop, CapCut, Premiere Pro) ── */
    const FLOW_NODES = [
      { key: 'canva', label: 'CANVA', color: '#00C4CC', accent: '#7D2AE8', iconSrc: '/tools/canva.svg' },
      { key: 'figma', label: 'FIGMA', color: '#FF7262', accent: '#A259FF', iconSrc: '/tools/figma.svg' },
      { key: 'photoshop', label: 'PHOTOSHOP', color: '#31A8FF', accent: '#001E36', iconSrc: '/tools/photoshop.svg' },
      { key: 'capcut', label: 'CAPCUT', color: '#FFFFFF', accent: '#000000', iconSrc: '/tools/capcut.svg' },
      { key: 'premiere', label: 'PREMIERE PRO', color: '#EA77FF', accent: '#00005B', iconSrc: '/tools/premiere.svg' },
    ];

    /* Pre-load tool SVG icons for canvas rendering */
    const iconImages = {};
    FLOW_NODES.forEach((node) => {
      const img = new Image();
      img.src = node.iconSrc;
      iconImages[node.key] = img;
    });

    /* ── Floating warm spark particles ── */
    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.5,
      alpha: Math.random() * 0.35 + 0.10,
      phase: Math.random() * Math.PI * 2,
      hue: 20 + Math.random() * 35,
    }));

    /* ── Data packets shooting along the flow path ── */
    const PACKET_COUNT = 8;
    const packets = Array.from({ length: PACKET_COUNT }, (_, i) => ({
      progress: i / PACKET_COUNT,
      speed: 0.0014 + Math.random() * 0.0008,
      size: Math.random() * 2.8 + 2.0,
      tail: [],
    }));

    /* ── Compute node positions (gentle flowing wave) ── */
    const getNodePositions = (W, H) =>
      FLOW_NODES.map((_, i) => {
        const frac = i / (FLOW_NODES.length - 1);
        const x = W * 0.07 + frac * W * 0.86;
        const wave = Math.sin(frac * Math.PI * 1.6) * (H * 0.16);
        const y = H * 0.50 + wave;
        return { x, y };
      });

    /* ── Sample path position for progress 0..1 ── */
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
      const cpX = mx - dy * 0.16 + Math.sin(segIdx * 2.3) * 32;
      const cpY = my + dx * 0.16 + Math.cos(segIdx * 1.7) * 24;
      const inv = 1 - segT;
      return {
        x: inv * inv * A.x + 2 * inv * segT * cpX + segT * segT * B.x,
        y: inv * inv * A.y + 2 * inv * segT * cpY + segT * segT * B.y,
        segIdx,
      };
    };

    /* ── Helper: Draw glowing line ── */
    const drawGlowLine = (x1, y1, x2, y2, color, width, glow, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha * 0.28;
      ctx.strokeStyle = color;
      ctx.lineWidth = glow;
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.globalAlpha = alpha;
      ctx.lineWidth = width;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      t++;

      ctx.clearRect(0, 0, W, H);

      /* ════ 1. BASE RADIANT ORANGE GRADIENT ════ */
      const baseGrad = ctx.createLinearGradient(0, 0, W * 0.90, H);
      baseGrad.addColorStop(0.00, '#FF851B');
      baseGrad.addColorStop(0.35, '#FF6D00');
      baseGrad.addColorStop(0.70, '#F4511E');
      baseGrad.addColorStop(1.00, '#C63702');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, W, H);

      /* ════ 2. LUMINOUS SWEEPING AMBER & GOLD LIGHT RIBBON ════ */
      ctx.save();
      const waveGrad1 = ctx.createLinearGradient(0, H * 0.85, W, H * 0.15);
      waveGrad1.addColorStop(0.00, 'rgba(255, 255, 255, 0.02)');
      waveGrad1.addColorStop(0.35, 'rgba(255, 224, 178, 0.32)');
      waveGrad1.addColorStop(0.65, 'rgba(255, 248, 225, 0.25)');
      waveGrad1.addColorStop(1.00, 'rgba(255, 179, 0, 0.10)');
      ctx.fillStyle = waveGrad1;
      ctx.beginPath();
      ctx.moveTo(-W * 0.05, H * 0.88);
      ctx.bezierCurveTo(
        W * 0.22, H * 0.80 + Math.sin(t * 0.01) * 12,
        W * 0.40, H * 0.48 + Math.cos(t * 0.008) * 15,
        W * 0.70, H * 0.36 + Math.sin(t * 0.012) * 10
      );
      ctx.bezierCurveTo(W * 0.88, H * 0.28, W * 0.98, H * 0.15, W * 1.10, H * 0.06);
      ctx.lineTo(W * 1.10, H * 0.32);
      ctx.bezierCurveTo(W * 0.88, H * 0.44, W * 0.65, H * 0.62, W * 0.36, H * 0.74);
      ctx.bezierCurveTo(W * 0.18, H * 0.86, W * 0.05, H * 0.96, -W * 0.05, H * 1.05);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      /* ════ 3. FLOATING WARM SPARK PARTICLES ════ */
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        p.phase += 0.020;
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = `hsl(${p.hue}, 100%, 80%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ════ 4. DIGITAL ENERGY FLOW PATH ════ */
      const nodePos = getNodePositions(W, H);
      const SEGS = nodePos.length - 1;

      for (let i = 0; i < SEGS; i++) {
        const A = nodePos[i];
        const B = nodePos[i + 1];
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2;
        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const cpX = mx - dy * 0.16 + Math.sin(i * 2.3) * 32;
        const cpY = my + dx * 0.16 + Math.cos(i * 1.7) * 24;
        const segColor = FLOW_NODES[i].color;

        const STEPS = 24;
        for (let s = 0; s < STEPS; s++) {
          const ta = s / STEPS;
          const tb = (s + 1) / STEPS;
          const invA = 1 - ta;
          const x1 = invA * invA * A.x + 2 * invA * ta * cpX + ta * ta * B.x;
          const y1 = invA * invA * A.y + 2 * invA * ta * cpY + ta * ta * B.y;
          const invB = 1 - tb;
          const x2 = invB * invB * A.x + 2 * invB * tb * cpX + tb * tb * B.x;
          const y2 = invB * invB * A.y + 2 * invB * tb * cpY + tb * tb * B.y;
          const shimmer = 0.5 + 0.5 * Math.sin(t * 0.06 - (i + ta) * 4);
          const lineAlpha = (0.50 + 0.15 * Math.sin(t * 0.04 + (i + ta) * 3)) * (0.75 + 0.25 * shimmer);
          drawGlowLine(x1, y1, x2, y2, segColor, 1.8, 7, lineAlpha);
        }

        /* Animated directional arrow */
        const arrowT = ((t * 0.004) % 1 + i * 0.16) % 1;
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
        ctx.globalAlpha = 0.50;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.4;
        ctx.shadowColor = '#FFB300';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(-5, -3);
        ctx.lineTo(0, 0);
        ctx.lineTo(-5, 3);
        ctx.stroke();
        ctx.restore();
      }

      /* ════ 5. PULSING ENERGY NODES WITH TOOL LOGO IMAGES & NAMES ════ */
      nodePos.forEach((pos, i) => {
        const node = FLOW_NODES[i];
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.045 + i * 1.1);
        const nodeR = 21 + pulse * 3.5;

        /* Outer warm aura glow */
        const halo = ctx.createRadialGradient(pos.x, pos.y, nodeR * 0.2, pos.x, pos.y, nodeR * 2.6);
        halo.addColorStop(0.0, `${node.color}65`);
        halo.addColorStop(0.5, `${node.color}20`);
        halo.addColorStop(1.0, `${node.color}00`);
        ctx.save();
        ctx.globalAlpha = 0.75 + 0.25 * pulse;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeR * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        /* Pulsing expand shockwave ring */
        ctx.save();
        ctx.globalAlpha = (1 - pulse) * 0.65;
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeR + pulse * 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        /* Orbiting dashed ring */
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(t * 0.02 * (i % 2 === 0 ? 1 : -1));
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.arc(0, 0, nodeR + 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        /* Solid core orb background */
        const nodeFill = ctx.createRadialGradient(
          pos.x - nodeR * 0.25, pos.y - nodeR * 0.25, 2,
          pos.x, pos.y, nodeR
        );
        nodeFill.addColorStop(0.0, '#FFFFFF');
        nodeFill.addColorStop(0.35, node.color);
        nodeFill.addColorStop(1.0, node.accent);
        ctx.save();
        ctx.fillStyle = nodeFill;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 22 + pulse * 8;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.90)';
        ctx.lineWidth = 2.0;
        ctx.stroke();
        ctx.restore();

        /* Draw Tool SVG Logo Image inside the orb */
        const iconImg = iconImages[node.key];
        if (iconImg && iconImg.complete && iconImg.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, nodeR - 2.5, 0, Math.PI * 2);
          ctx.clip();
          // Draw dark/tinted backing for icon contrast if needed
          ctx.fillStyle = node.key === 'capcut' ? '#000000' : 'rgba(10, 10, 15, 0.35)';
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
        const labelY = pos.y + nodeR + 18;
        ctx.save();
        ctx.font = 'bold 11px "Outfit", "Segoe UI", sans-serif';
        const textWidth = ctx.measureText(node.label).width;
        const pillW = textWidth + 24;
        const pillH = 22;

        // Pill background
        ctx.fillStyle = 'rgba(26, 12, 4, 0.88)';
        ctx.strokeStyle = `${node.color}bb`;
        ctx.lineWidth = 1.3;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(pos.x - pillW / 2, labelY - pillH / 2, pillW, pillH, 11);
        } else {
          ctx.rect(pos.x - pillW / 2, labelY - pillH / 2, pillW, pillH);
        }
        ctx.fill();
        ctx.stroke();

        // Pulsing color dot indicator
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pos.x - pillW / 2 + 8, labelY, 3, 0, Math.PI * 2);
        ctx.fill();

        // Glowing label text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(node.label, pos.x + 4, labelY);
        ctx.restore();
      });

      /* ════ 6. DATA PACKETS FLYING ALONG THE PATH ════ */
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.speed = 0.0014 + Math.random() * 0.0008;
          pkt.tail = [];
        }

        const pos = getPathPos(pkt.progress, W, H);
        const frac = pkt.progress * (FLOW_NODES.length - 1);
        const idx = Math.min(Math.floor(frac), FLOW_NODES.length - 2);
        const nodeColor = FLOW_NODES[idx].color;

        pkt.tail.push({ x: pos.x, y: pos.y });
        if (pkt.tail.length > 18) pkt.tail.shift();

        /* Fading trail */
        for (let ti = 0; ti < pkt.tail.length - 1; ti++) {
          const ta = pkt.tail[ti];
          const tb = pkt.tail[ti + 1];
          const tailAlpha = (ti / pkt.tail.length) * 0.55;
          ctx.save();
          ctx.globalAlpha = tailAlpha;
          ctx.strokeStyle = nodeColor;
          ctx.lineWidth = pkt.size * (ti / pkt.tail.length) * 0.9;
          ctx.shadowColor = nodeColor;
          ctx.shadowBlur = 8;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(ta.x, ta.y);
          ctx.lineTo(tb.x, tb.y);
          ctx.stroke();
          ctx.restore();
        }

        /* Packet head orb */
        ctx.save();
        const orbGlow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pkt.size * 3.0);
        orbGlow.addColorStop(0.00, '#FFFFFF');
        orbGlow.addColorStop(0.25, nodeColor);
        orbGlow.addColorStop(1.00, `${nodeColor}00`);
        ctx.fillStyle = orbGlow;
        ctx.globalAlpha = 0.90;
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pkt.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pkt.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ════ 7. SUBTLE HUD TELEMETRY & STATUS ════ */
      ctx.save();
      ctx.font = '10px "Courier New", monospace';
      ctx.fillStyle = 'rgba(46, 19, 5, 0.40)';
      ctx.fillText('$ whoami', 32, 108);
      ctx.fillText('$ nmap -sV target', 32, 122);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fillText('> ACCESS: VERIFIED', 32, 136);
      ctx.fillText('> FLOW_SYSTEM: ACTIVE', 32, 150);

      // Bottom left & right status
      ctx.font = '9px "Courier New", monospace';
      ctx.fillStyle = 'rgba(46, 19, 5, 0.45)';
      ctx.fillText('// FLOW_STREAM :: ACTIVE  //  SPEED: 1.2 GB/S', 32, H - 20);
      ctx.fillText(`// PACKETS: ${PACKET_COUNT}  //  NODES: ${FLOW_NODES.length}`, 32, H - 8);
      ctx.restore();

      /* ════ 8. CORNER CIRCUIT TRACES ════ */
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 179, 0, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(W, H - 42);
      ctx.lineTo(W - 72, H - 42);
      ctx.lineTo(W - 72, H - 77);
      ctx.lineTo(W - 132, H - 77);
      ctx.stroke();
      ctx.setLineDash([]);
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
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
