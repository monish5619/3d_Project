import React, { useState } from 'react';
import { Move3d } from 'lucide-react';
import { NexusCoreScene } from '../canvas/NexusCoreScene';
import { soundFX } from '../../utils/audio';

export const WorldInMotionSection: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(0);

  const phases = [
    {
      index: '01',
      title: 'EQUILIBRIUM',
      tag: 'HARMONIC RESONANCE',
      desc: 'Coordinated rotational symmetry across three orthogonal gimbal planes. Geometry maintains structural equilibrium under continuous algorithmic transformation.',
      metrics: {
        rotation: '0.8x NOMINAL',
        dilation: '1.00 Z-RATIO',
        dispersion: 'MINIMAL',
      },
      speed: 0.8,
      particles: 600,
      mode: 'solid' as const,
      color: '#8B5CF6',
    },
    {
      index: '02',
      title: 'KINETIC DISPERSION',
      tag: 'TOPOLOGICAL DILATION',
      desc: 'Orbital expansion along the observer axis. Ring vectors disperse outward while particle density intensifies into an animated spatial vector field.',
      metrics: {
        rotation: '1.8x ACCELERATED',
        dilation: '1.45 Z-RATIO',
        dispersion: 'HIGH FLUX',
      },
      speed: 1.8,
      particles: 1200,
      mode: 'hologram' as const,
      color: '#70E1FF',
    },
    {
      index: '03',
      title: 'SINGULAR CONVERGENCE',
      tag: 'COHERENT LATTICE',
      desc: 'Volumetric alignment of crystalline inner nodes. Matter, light, and mathematical logic crystallize into a singular cybernetic lattice.',
      metrics: {
        rotation: '2.5x QUANTUM SPIN',
        dilation: '2.10 Z-RATIO',
        dispersion: 'FOCUSED BEAM',
      },
      speed: 2.4,
      particles: 1800,
      mode: 'quantum' as const,
      color: '#F59E0B',
    },
  ];

  const current = phases[activePhase];

  return (
    <section
      id="motion"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: '120px 0',
        backgroundColor: '#08090D',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
          <div className="tech-tag" style={{ marginBottom: '14px' }}>
            <Move3d size={13} />
            <span>SECTION B // KINEMATICS</span>
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
            A WORLD IN MOTION.
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              lineHeight: 1.6,
            }}
          >
            Digital objects are not static illustrations trapped behind glass. They are dynamic systems living in continuous responsive flux.
          </p>
        </div>

        {/* Interactive Motion Studio Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Phase Selector & Editorial Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {phases.map((p, idx) => {
              const isSelected = activePhase === idx;
              return (
                <div
                  key={p.index}
                  onClick={() => {
                    soundFX.playClick(800 + idx * 150);
                    setActivePhase(idx);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActivePhase(idx);
                    }
                  }}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    borderColor: isSelected ? p.color : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isSelected ? `0 0 25px -5px ${p.color}40` : 'none',
                    transform: isSelected ? 'translateX(8px)' : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.85rem',
                          color: isSelected ? p.color : 'var(--text-muted)',
                          fontWeight: 700,
                        }}
                      >
                        PHASE {p.index}
                      </span>
                      <h3
                        style={{
                          fontSize: '1.3rem',
                          color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                        }}
                      >
                        {p.title}
                      </h3>
                    </div>

                    <span
                      className="tech-tag"
                      style={{
                        fontSize: '0.65rem',
                        borderColor: isSelected ? `${p.color}60` : undefined,
                        color: isSelected ? p.color : undefined,
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: isSelected ? '16px' : '0',
                    }}
                  >
                    {p.desc}
                  </p>

                  {/* Expanded Telemetry Badges if Active */}
                  {isSelected && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '8px',
                        paddingTop: '14px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>ROTATION</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: p.color, fontWeight: 600 }}>{p.metrics.rotation}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>DILATION</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600 }}>{p.metrics.dilation}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>DISPERSION</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#70E1FF', fontWeight: 600 }}>{p.metrics.dispersion}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive 3D Perspective Viewer */}
          <div
            className="glass-panel"
            style={{
              height: '520px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: 'radial-gradient(circle at center, rgba(17, 19, 26, 0.9) 0%, rgba(8, 9, 13, 0.98) 100%)',
            }}
          >
            {/* Live 3D Scene reacting to active phase */}
            <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <NexusCoreScene
                rotationSpeed={current.speed}
                particleIntensity={current.particles}
                visualMode={current.mode}
                accentColor={current.color}
                isPlaying={true}
                shellEnabled={true}
                scrollProgress={activePhase * 0.5}
              />
            </div>

            {/* Viewport Top Bar Overlay */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(8, 9, 13, 0.65)',
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: current.color,
                    boxShadow: `0 0 10px ${current.color}`,
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                  ACTIVE STATE // {current.title}
                </span>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                INTERACTIVE PREVIEW
              </div>
            </div>

            {/* Viewport Bottom Overlay Controls */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(8, 9, 13, 0.65)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                {phases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      soundFX.playClick(900);
                      setActivePhase(i);
                    }}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      background: activePhase === i ? current.color : 'transparent',
                      color: activePhase === i ? '#08090D' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: current.color }}>
                {current.mode.toUpperCase()} MODE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
