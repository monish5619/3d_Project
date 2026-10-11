import React, { useState } from 'react';
import { ArrowUp, Terminal, Cpu, X } from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface CtaSectionProps {
  onReturnToHero: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onReturnToHero }) => {
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <section
      id="cta"
      style={{
        position: 'relative',
        width: '100%',
        padding: '160px 0 120px',
        backgroundColor: '#08090D',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Radiant ambient glow backdrop */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="tech-tag" style={{ marginBottom: '24px' }}>
            <span>EPILOGUE // SPATIAL PHILOSOPHY</span>
          </div>

          {/* Oversized Closing Statement */}
          <h2
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
              textTransform: 'uppercase',
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              marginBottom: '32px',
            }}
          >
            THE WEB IS NOT A PAGE.<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #70E1FF 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              IT IS A PLACE TO EXPLORE.
            </span>
          </h2>

          <p
            style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 48px',
              lineHeight: 1.6,
            }}
          >
            You have traversed the NEXUS core, manipulated quantum kinetic gimbals, explored physical matter, and witnessed the luminous reveal.
          </p>

          {/* Interactive CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '18px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => {
                soundFX.playClick(1000);
                onReturnToHero();
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="btn-primary"
              style={{
                padding: '16px 36px',
                fontSize: '0.9rem',
              }}
              id="cta-return"
            >
              <ArrowUp size={18} />
              <span>ENTER AGAIN</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick(850);
                setSpecsOpen(true);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="btn-secondary"
              style={{
                padding: '16px 28px',
                fontSize: '0.9rem',
              }}
              id="cta-specs"
            >
              <Terminal size={18} />
              <span>SYSTEM SPECS</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Specs Diagnostics Modal */}
      {specsOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(8, 9, 13, 0.85)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="diagnostics-title"
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '560px',
              background: '#0D0F17',
              borderColor: 'rgba(139, 92, 246, 0.4)',
              padding: 'clamp(20px, 4vw, 32px)',
              textAlign: 'left',
              position: 'relative',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(139, 92, 246, 0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={18} color="var(--accent-blue)" />
                <h3 id="diagnostics-title" style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}>SYSTEM DIAGNOSTICS</h3>
              </div>
              <button
                onClick={() => setSpecsOpen(false)}
                aria-label="Close diagnostics modal"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>RENDER PIPELINE:</span>
                <span style={{ color: '#70E1FF' }}>Three.js WebGLRenderer (r170)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>REACTIVE RECONCILER:</span>
                <span style={{ color: '#8B5CF6' }}>React 19 + @react-three/fiber v9</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>AUDIO SYNTHESIS:</span>
                <span style={{ color: '#10B981' }}>Native Web Audio API Oscillators</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>ASSET STRATEGY:</span>
                <span style={{ color: '#F59E0B' }}>100% Procedural Geometry & Shaders</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>DEVICE PIXEL RATIO:</span>
                <span style={{ color: '#FFFFFF' }}>Adaptive (Max 2.0x)</span>
              </div>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button
                onClick={() => setSpecsOpen(false)}
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.75rem' }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
