import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaHome, FaUser, FaCode, FaBriefcase, FaFileAlt, FaEnvelope, FaArrowRight
} from 'react-icons/fa';
import gsap from 'gsap';

// Navigation items matching portfolio structure
const NAV_ITEMS = [
  { id: 'home',     path: '/',         icon: FaHome,      label: 'Home'     },
  { id: 'about',    path: '/about',    icon: FaUser,      label: 'Who Am I' },
  { id: 'skills',   path: '/skills',   icon: FaCode,      label: 'Skills'   },
  { id: 'projects', path: '/projects', icon: FaBriefcase, label: 'Projects' },
  { id: 'social',   path: '/social',   icon: FaEnvelope,  label: 'Contact'  },
];

/* ── Curved Tab Bar with Floating Active Bubble (Image 2 style) ── */
function CurvedTabBar({ activeSection, onTabClick, isMobile = false }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 480);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const compact = isMobile && isSmallScreen;

  const tabWidth = compact ? 56 : (isMobile ? 66 : 84);
  const paddingX = compact ? 10 : 16;
  const bubbleSize = compact ? 40 : 46;
  const barWidth = paddingX * 2 + NAV_ITEMS.length * tabWidth;
  const barHeight = compact ? 58 : 64;
  const scoopWidth = compact ? 32 : 38;
  const scoopDepth = compact ? 22 : 26;
  const cornerR = compact ? 20 : 26;

  const idx = NAV_ITEMS.findIndex((item) => item.id === activeSection);
  const activeIndex = idx >= 0 ? idx : 0;

  const targetCx = paddingX + activeIndex * tabWidth + tabWidth / 2;
  const cxRef = useRef(targetCx);
  const [cx, setCx] = useState(targetCx);

  // Smooth GSAP transition for the curved scoop and floating bubble
  useEffect(() => {
    const target = paddingX + activeIndex * tabWidth + tabWidth / 2;
    gsap.to(cxRef, {
      current: target,
      duration: 0.45,
      ease: 'power3.out',
      onUpdate: () => setCx(cxRef.current),
    });
  }, [activeIndex, tabWidth, paddingX]);

  // Generate seamless SVG path with the scooped notch
  const pathD = `
    M ${cornerR} 0
    L ${Math.max(cornerR, cx - scoopWidth)} 0
    C ${cx - scoopWidth + 14} 0, ${cx - 18} ${scoopDepth}, ${cx} ${scoopDepth}
    C ${cx + 18} ${scoopDepth}, ${cx + scoopWidth - 14} 0, ${Math.min(barWidth - cornerR, cx + scoopWidth)} 0
    L ${barWidth - cornerR} 0
    A ${cornerR} ${cornerR} 0 0 1 ${barWidth} ${cornerR}
    L ${barWidth} ${barHeight - cornerR}
    A ${cornerR} ${cornerR} 0 0 1 ${barWidth - cornerR} ${barHeight}
    L ${cornerR} ${barHeight}
    A ${cornerR} ${cornerR} 0 0 1 0 ${barHeight - cornerR}
    L 0 ${cornerR}
    A ${cornerR} ${cornerR} 0 0 1 ${cornerR} 0
    Z
  `;

  const ActiveIcon = NAV_ITEMS[activeIndex]?.icon || FaHome;

  return (
    <div
      style={{
        position: 'relative',
        width: barWidth,
        height: barHeight,
        overflow: 'visible',
      }}
    >
      {/* ── Background SVG with dynamic scooped cutout ── */}
      <svg
        width={barWidth}
        height={barHeight}
        style={{
          display: 'block',
          filter: 'drop-shadow(0 10px 32px rgba(198, 55, 2, 0.16)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.05))',
        }}
      >
        <path d={pathD} fill="#FFFFFF" />
      </svg>

      {/* ── Floating Active Circular Bubble (Pops above the scoop) ── */}
      <div
        style={{
          position: 'absolute',
          top: compact ? -15 : -18,
          left: 0,
          transform: `translateX(${cx - bubbleSize / 2}px)`,
          width: bubbleSize,
          height: bubbleSize,
          borderRadius: '50%',
          background: '#FFFFFF',
          border: '3px solid #FF6D00',
          boxShadow: '0 8px 24px rgba(198, 55, 2, 0.35), 0 0 0 3px rgba(255, 179, 0, 0.20)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 25,
          transition: 'none',
        }}
      >
        <ActiveIcon style={{ fontSize: compact ? 16 : 18, color: '#C63702' }} />
      </div>

      {/* ── Interactive Nav Tabs Container ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          padding: `0 ${paddingX}px`,
          zIndex: 10,
        }}
      >
        {NAV_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isActive = i === activeIndex;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => onTabClick(e, item)}
              style={{
                width: tabWidth,
                height: barHeight,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {/* Inactive Icon (slides up and fades out when active) */}
              <Icon
                style={{
                  fontSize: compact ? 13 : 15.5,
                  color: '#9a3412',
                  opacity: isActive ? 0 : 0.85,
                  transform: isActive ? 'translateY(-22px) scale(0.6)' : 'translateY(-2px)',
                  transition: 'all 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />

              {/* Tab Label (sits below scoop when active, beneath icon when inactive) */}
              <span
                style={{
                  fontSize: compact ? 9 : (item.id === 'about' ? 10.5 : 11),
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#C63702' : '#2E1305',
                  transform: isActive
                    ? `translateY(${compact ? 8 : 11}px)`
                    : 'translateY(2px)',
                  transition: 'all 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
                  letterSpacing: item.id === 'about' ? '0.01em' : '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Track active section on scroll when on home page
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle smooth scroll or routing
  const handleNavClick = (e, item) => {
    e.preventDefault();

    if (location.pathname === '/') {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(item.id);
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(item.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(item.id);
        }
      }, 150);
    }
  };

  return (
    <>
      {/* ── Fixed Top Bar (Desktop & Mobile Header) ── */}
      <nav
        style={{
          position: 'fixed',
          top: 16,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 20px',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'auto',
          }}
        >
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, NAV_ITEMS[0])}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
              padding: '7px 18px 7px 8px',
              borderRadius: 40,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 20px rgba(198, 55, 2, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6D00, #C63702)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(198,55,2,0.35)',
              }}
            >
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 19, fontFamily: 'Outfit,sans-serif' }}>G</span>
            </div>
            <span style={{ color: '#C63702', fontWeight: 900, fontSize: 19, fontFamily: 'Outfit,sans-serif', letterSpacing: '-0.5px' }}>
              Portfolio
            </span>
          </a>

          {/* ── DESKTOP CENTER CURVED MENU BAR (Image 2 design in center of Image 1) ── */}
          <div className="nav-desktop-center" style={{ display: 'flex', alignItems: 'center' }}>
            <CurvedTabBar activeSection={activeSection} onTabClick={handleNavClick} />
          </div>

          {/* Right CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <a
              href="#social"
              onClick={(e) => handleNavClick(e, NAV_ITEMS[4])}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '11px 22px',
                borderRadius: 30,
                background: 'linear-gradient(135deg, #FF7A00, #C63702)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13.5,
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(198,55,2,0.35)',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              Let's Talk <FaArrowRight style={{ fontSize: 11 }} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── MOBILE / TABLET FLOATING BOTTOM CURVED TAB BAR (Image 2 style) ── */}
      <div
        className="nav-mobile-bottom"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      >
        <CurvedTabBar activeSection={activeSection} onTabClick={handleNavClick} isMobile />
      </div>

      {/* Responsive Breakpoint Rules */}
      <style>{`
        @media (max-width: 991px) {
          .nav-desktop-center {
            display: none !important;
          }
          .nav-mobile-bottom {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
