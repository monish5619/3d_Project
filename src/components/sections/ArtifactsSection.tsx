import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, Compass } from 'lucide-react';
import { ArtifactCanvas } from '../canvas/ArtifactCanvas';
import type { ArtifactType } from '../canvas/ArtifactCanvas';
import { soundFX } from '../../utils/audio';

interface ArtifactItem {
  id: ArtifactType;
  number: string;
  name: string;
  classification: string;
  description: string;
  telemetry: { label: string; value: string }[];
  accent: string;
}

const ARTIFACTS: ArtifactItem[] = [
  {
    id: 'chronos',
    number: '01',
    name: 'CHRONOS',
    classification: 'TEMPORAL CLOCKWORK // ESCAPEMENT ARRAY',
    description: 'An intricate mechanical clockwork sculpture featuring interlocking brass and obsidian spur gears, synchronized escapement balance wheels, and a counter-weighted orbital pendulum.',
    telemetry: [
      { label: 'GEAR RATIO', value: '18 : 12 TEETH' },
      { label: 'FREQUENCY', value: '4.80 HZ TICK' },
      { label: 'ALLOY', value: 'BRASS / BASALT' },
    ],
    accent: '#F59E0B',
  },
  {
    id: 'orbital',
    number: '02',
    name: 'ORBITAL',
    classification: 'DEEP-SPACE SATELLITE // TELEMETRY PROBE',
    description: 'An articulated orbital satellite assembly with dual photovoltaic solar array wings, high-gain parabolic transceiver dish, and a kinetic reaction attitude wheel.',
    telemetry: [
      { label: 'APOGEE', value: '35,786 KM' },
      { label: 'BANDWIDTH', value: '120 GBPS' },
      { label: 'ARRAY SPAN', value: '3.30 METERS' },
    ],
    accent: '#70E1FF',
  },
  {
    id: 'prism',
    number: '03',
    name: 'PRISM',
    classification: 'TRANSMISSION CRYSTAL // OPTICAL DISPERSION',
    description: 'A multi-layered refractive crystal sculpture with nested floating glass tetrahedrons, internal light refraction nodes, and high-dielectric optical dispersion facets.',
    telemetry: [
      { label: 'INDEX IOR', value: '1.75 COEFF' },
      { label: 'TRANSMISSION', value: '88% VOLUMETRIC' },
      { label: 'SPECTRUM', value: 'VIOLET / CYAN' },
    ],
    accent: '#C084FC',
  },
  {
    id: 'helix',
    number: '04',
    name: 'HELIX',
    classification: 'PARAMETRIC RIBBON // BIOMETRIC TORSION',
    description: 'A twisted double-helix parametric structure with interlocking spiral ribbons, counter-twisting orbital energy bands, and emerald luminescent core conduits.',
    telemetry: [
      { label: 'PITCH RATIO', value: '2 : 7 TORSION' },
      { label: 'COHERENCE', value: '99.4% PHASE' },
      { label: 'RESONANCE', value: '540 THZ' },
    ],
    accent: '#10B981',
  },
  {
    id: 'monolith',
    number: '05',
    name: 'MONOLITH',
    classification: 'MONUMENTAL OBELISK // RUNIC SURFACE ILLUMINATION',
    description: 'A towering obsidian geometric monolith with levitating crystalline capstone, pulsing surface hieroglyphic circuitry, and a surrounding protective orbital halo.',
    telemetry: [
      { label: 'ELEVATION', value: '2.55 UNITS' },
      { label: 'FIELD INTEGRITY', value: '100% NOMINAL' },
      { label: 'LATTICE', value: 'NON-EUCLIDEAN' },
    ],
    accent: '#8B5CF6',
  },
];

export const ArtifactsSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<ArtifactType | null>(null);
  const [inspectingArtifact, setInspectingArtifact] = useState<ArtifactItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inspectingArtifact) {
        setInspectingArtifact(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectingArtifact]);

  const handleOpenInspect = (item: ArtifactItem) => {
    soundFX.playClick(1050);
    setInspectingArtifact(item);
  };

  const handleCloseInspect = () => {
    soundFX.playClick(650);
    setInspectingArtifact(null);
  };

  return (
    <section
      id="artifacts"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 0',
        backgroundColor: '#090B10',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
          <div className="tech-tag violet" style={{ marginBottom: '14px' }}>
            <Sparkles size={13} />
            <span>SECTION // 3D ARTIFACT ARCHIVE</span>
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
            FLOATING ARTIFACTS.
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              lineHeight: 1.6,
            }}
          >
            Five autonomous procedural structures recovered from the computational void. Hover or focus to inspect their kinetic telemetry; click to enter focused 3D inspection.
          </p>
        </div>

        {/* 5-Artifact Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '28px',
          }}
        >
          {ARTIFACTS.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  soundFX.playHover();
                  setHoveredId(item.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderColor: isHovered ? item.accent : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isHovered ? `0 16px 40px -10px ${item.accent}35` : 'none',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* 3D Viewport Frame */}
                <div
                  style={{
                    height: '240px',
                    width: '100%',
                    position: 'relative',
                    background: 'radial-gradient(circle at center, rgba(22, 27, 42, 0.75) 0%, rgba(8, 9, 13, 0.95) 100%)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <ArtifactCanvas type={item.id} isFocused={isHovered} />

                  {/* Corner Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(8, 9, 13, 0.8)',
                      backdropFilter: 'blur(8px)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: item.accent,
                      fontWeight: 700,
                    }}
                  >
                    ARTIFACT {item.number}
                  </div>

                  {/* Focus Inspect Action Button */}
                  <button
                    onClick={() => handleOpenInspect(item)}
                    aria-label={`Inspect ${item.name} artifact in focused 3D view`}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(8, 9, 13, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#F5F5F7',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-snappy)',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = item.accent;
                      e.currentTarget.style.color = item.accent;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.color = '#F5F5F7';
                    }}
                  >
                    <Maximize2 size={12} />
                    <span>INSPECT</span>
                  </button>
                </div>

                {/* Card Editorial Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: item.accent, marginBottom: '6px' }}>
                    {item.classification}
                  </div>
                  <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '10px' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '18px', flexGrow: 1 }}>
                    {item.description}
                  </p>

                  {/* Telemetry Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      paddingTop: '14px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {item.telemetry.map((t) => (
                      <div key={t.label}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{t.label}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F5F5F7', fontWeight: 600 }}>{t.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Focused 3D Inspection Modal */}
      {inspectingArtifact && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspect-artifact-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(8, 9, 13, 0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '850px',
              height: '80vh',
              maxHeight: '680px',
              display: 'flex',
              flexDirection: 'column',
              background: '#0D0F17',
              borderColor: inspectingArtifact.accent,
              boxShadow: `0 24px 60px rgba(0, 0, 0, 0.95), 0 0 45px ${inspectingArtifact.accent}40`,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(8, 9, 13, 0.75)',
                zIndex: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Compass size={18} color={inspectingArtifact.accent} />
                <div>
                  <h3 id="inspect-artifact-title" style={{ fontSize: '1.2rem', color: '#FFFFFF', letterSpacing: '0.04em' }}>
                    {inspectingArtifact.name} // HIGH-RESOLUTION INSPECTION
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: inspectingArtifact.accent }}>
                    {inspectingArtifact.classification}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCloseInspect}
                aria-label="Close artifact inspection view"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-secondary)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal 3D Canvas Viewport */}
            <div style={{ flexGrow: 1, position: 'relative', background: 'radial-gradient(circle at center, rgba(20, 25, 38, 0.9) 0%, #08090D 100%)' }}>
              <ArtifactCanvas type={inspectingArtifact.id} isFocused={true} />

              {/* Viewport Live Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                <span>INTERACTIVE 3D PROBE ACTIVE</span>
              </div>
            </div>

            {/* Modal Footer Telemetry */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '16px 24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(8, 9, 13, 0.85)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', gap: '24px', color: 'var(--text-muted)' }}>
                {inspectingArtifact.telemetry.map((t) => (
                  <div key={t.label}>
                    {t.label}: <strong style={{ color: '#F5F5F7' }}>{t.value}</strong>
                  </div>
                ))}
              </div>

              <button
                onClick={handleCloseInspect}
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.75rem' }}
              >
                CLOSE INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
