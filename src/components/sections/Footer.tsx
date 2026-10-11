import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const Footer: React.FC = () => {
  const handleNavClick = (href: string) => {
    soundFX.playClick(750);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#050608',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '80px 0 40px',
      }}
    >
      <div className="container">
        {/* Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '48px',
            marginBottom: '60px',
          }}
        >
          {/* Col 1: Wordmark & Statement */}
          <div style={{ maxWidth: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #70E1FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Compass size={15} color="#08090D" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  letterSpacing: '0.08em',
                  color: '#FFFFFF',
                }}
              >
                NEXUS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-blue)',
                }}
              >
                // BEYOND THE INTERFACE
              </span>
            </div>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              An immersive digital art installation exploring real-time 3D spatial computing, procedural geometry, and responsive web aesthetics.
            </p>

            <div className="tech-tag" style={{ fontSize: '0.68rem' }}>
              <Sparkles size={11} />
              <span>DIGITAL EXPERIMENT 001</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                color: 'var(--accent-blue)',
                marginBottom: '18px',
              }}
            >
              NAVIGATION
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: '01 // NEXUS CORE', href: '#hero' },
                { label: '02 // WORLD IN MOTION', href: '#motion' },
                { label: '03 // THREE DIMENSIONS', href: '#exhibits' },
                { label: '04 // ARTIFACT ARCHIVE', href: '#artifacts' },
                { label: '05 // INTERACTIVE LAB', href: '#lab' },
                { label: '06 // THE REVEAL', href: '#reveal' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    onMouseEnter={() => soundFX.playHover()}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'var(--transition-snappy)',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Experimental Design Label */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                color: 'var(--accent-violet)',
                marginBottom: '18px',
              }}
            >
              DESIGN SPECIFICATION
            </div>
            <div
              className="glass-panel"
              style={{
                padding: '18px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              <div>ESTHETICS: OBSIDIAN / CINEMATIC DARK</div>
              <div>GEOMETRY: PROCEDURAL TOPOLOGY</div>
              <div>SHADERS: GLSL PBR MATERIALS</div>
              <div style={{ color: 'var(--accent-blue)', marginTop: '8px' }}>
                STATUS: EXPERIMENTAL RELEASE V2.6
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            NEXUS — BEYOND THE INTERFACE &copy; 2026 ALL RIGHTS RESERVED.
          </div>
          <div>
            BUILT WITH THREE.JS &amp; REACT
          </div>
        </div>
      </div>
    </footer>
  );
};
