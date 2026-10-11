import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Compass } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  onAudioToggle?: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAudioToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioClick = () => {
    const active = soundFX.toggle();
    setAudioActive(active);
    if (onAudioToggle) onAudioToggle(active);
  };

  const navLinks = [
    { label: '01. CORE', href: '#hero' },
    { label: '02. MOTION', href: '#motion' },
    { label: '03. EXHIBITS', href: '#exhibits' },
    { label: '04. LAB', href: '#lab' },
    { label: '05. REVEAL', href: '#reveal' },
  ];

  const handleNavClick = (href: string) => {
    soundFX.playClick(800);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 24px' : '20px 32px',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled ? 'rgba(8, 9, 13, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #70E1FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
                }}
              >
                <Compass size={16} color="#08090D" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  letterSpacing: '0.08em',
                }}
              >
                NEXUS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-blue)',
                  opacity: 0.85,
                }}
              >
                // 001
              </span>
            </a>

            {/* Desktop Status Pill */}
            <div
              className="glass-pill"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: '#10B981',
              }}
              id="header-telemetry"
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 8px #10B981',
                }}
              />
              SYSTEM ONLINE [V2.6]
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '28px',
            }}
            id="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => soundFX.playHover()}
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  transition: 'var(--transition-snappy)',
                  position: 'relative',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#70E1FF')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Audio Toggle */}
            <button
              onClick={handleAudioClick}
              title={audioActive ? 'Mute synthesized audio' : 'Enable interactive audio feedback'}
              aria-label="Toggle synthesized audio"
              style={{
                background: audioActive ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${audioActive ? 'rgba(139, 92, 246, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: audioActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-snappy)',
              }}
              onMouseEnter={() => soundFX.playHover()}
            >
              {audioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Primary Header CTA */}
            <a
              href="#lab"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#lab');
              }}
              className="btn-primary"
              style={{
                display: 'none',
                padding: '8px 18px',
                fontSize: '0.75rem',
              }}
              id="header-cta"
            >
              EXPERIENCE
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                soundFX.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Mobile Menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-primary)',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(8, 9, 13, 0.98)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            padding: '24px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#lab"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#lab');
            }}
            className="btn-primary"
            style={{ marginTop: '16px', width: '220px', textAlign: 'center' }}
          >
            EXPERIENCE LAB
          </a>
        </div>
      )}

      {/* Inline responsive style for header breakpoint switches */}
      <style>{`
        @media (min-width: 900px) {
          #header-telemetry { display: flex !important; }
          #desktop-nav { display: flex !important; }
          #header-cta { display: inline-flex !important; }
          #mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
};
