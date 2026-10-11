import React, { useState } from 'react';
import { Box, Sparkles, Orbit, Compass } from 'lucide-react';
import { ExhibitCanvas } from '../canvas/ExhibitCanvas';
import { soundFX } from '../../utils/audio';

export const ExhibitsSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const exhibits = [
    {
      number: '01',
      title: 'MATTER',
      type: 'matter' as const,
      subtitle: 'METALLIC SCULPTURE // TOPOLOGICAL KNOT',
      desc: 'An exploration of physical materiality, metallic reflection, and high-specular anisotropic curvature. The surface reacts dynamically to multi-spectrum directional light sources.',
      telemetry: [
        { label: 'DENSITY', value: '8.92 g/cm³' },
        { label: 'HARDNESS', value: '9.4 MOHS' },
        { label: 'SPECULAR', value: '0.96 COEFF' },
      ],
      accent: '#8B5CF6',
      icon: Box,
    },
    {
      number: '02',
      title: 'ENERGY',
      type: 'energy' as const,
      subtitle: 'PARTICLE VORTEX // VECTOR ACCELERATOR',
      desc: 'Thousands of procedural luminescent points governed by a continuous logarithmic spiral attractor. Mathematical velocity fields simulate electromagnetic plasma currents.',
      telemetry: [
        { label: 'FLUX', value: '420 THz' },
        { label: 'COHERENCE', value: '99.8%' },
        { label: 'ENTROPY', value: '0.043 J/K' },
      ],
      accent: '#70E1FF',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'SPACE',
      type: 'space' as const,
      subtitle: 'ARCHITECTURAL DEPTH // HYPERCUBE VOID',
      desc: 'A recursive wireframe architectural portal with atmospheric depth and exponential fog attenuation. Spatial boundaries dissolve into an infinite non-Euclidean gateway.',
      telemetry: [
        { label: 'CURVATURE', value: 'k = -0.04' },
        { label: 'DIMENSIONS', value: '3 + 1 TIME' },
        { label: 'HORIZON', value: 'INFINITE' },
      ],
      accent: '#F59E0B',
      icon: Orbit,
    },
  ];

  return (
    <section
      id="exhibits"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 0',
        backgroundColor: '#0B0C12',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '70px', maxWidth: '800px' }}>
          <div className="tech-tag amber" style={{ marginBottom: '14px' }}>
            <Compass size={13} />
            <span>SECTION C // THREE DIMENSIONS</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            THREE DIMENSIONS.
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            Three foundational inquiries into digital form: the weight of simulated matter, the flux of procedural energy, and the infinity of structured space.
          </p>
        </div>

        {/* 3 Distinct Exhibits Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {exhibits.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                onMouseEnter={() => {
                  soundFX.playHover();
                  setHoveredIndex(idx);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderColor: isHovered ? item.accent : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isHovered ? `0 16px 40px -12px ${item.accent}30` : 'none',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* 3D Interactive Canvas Viewport */}
                <div
                  style={{
                    height: '280px',
                    width: '100%',
                    position: 'relative',
                    background: 'radial-gradient(circle at center, rgba(20, 24, 38, 0.8) 0%, rgba(8, 9, 13, 0.95) 100%)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <ExhibitCanvas type={item.type} isHovered={isHovered} />

                  {/* Corner Index Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(8, 9, 13, 0.75)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: item.accent,
                      fontWeight: 700,
                    }}
                  >
                    <Icon size={13} />
                    <span>EXHIBIT {item.number}</span>
                  </div>

                  {/* Live Status Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: isHovered ? '#FFFFFF' : 'var(--text-muted)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {isHovered ? '● LIVE ENGAGEMENT' : '○ HOVER TO ACCELERATE'}
                  </div>
                </div>

                {/* Exhibit Details Content */}
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: item.accent,
                        letterSpacing: '0.08em',
                      }}
                    >
                      {item.subtitle}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.9rem',
                      letterSpacing: '-0.01em',
                      color: '#FFFFFF',
                      marginBottom: '14px',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                      flexGrow: 1,
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Telemetry Metrics Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      paddingTop: '18px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {item.telemetry.map((t) => (
                      <div key={t.label}>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--text-muted)',
                            marginBottom: '2px',
                          }}
                        >
                          {t.label}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            color: '#F5F5F7',
                            fontWeight: 600,
                          }}
                        >
                          {t.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
