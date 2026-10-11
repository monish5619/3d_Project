import React, { useState } from 'react';
import { Sun, Sparkles } from 'lucide-react';
import { RevealScene } from '../canvas/RevealScene';
import { soundFX } from '../../utils/audio';

export const RevealSection: React.FC = () => {
  const [progress, setProgress] = useState<number>(0.25);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const handleToggleReveal = () => {
    soundFX.playWarp();
    const nextState = !isRevealed;
    setIsRevealed(nextState);
    setProgress(nextState ? 1.0 : 0.2);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (val > 0.6 && !isRevealed) {
      setIsRevealed(true);
    } else if (val <= 0.6 && isRevealed) {
      setIsRevealed(false);
    }
  };

  return (
    <section
      id="reveal"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        padding: '120px 0',
        backgroundColor: '#08090D',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Background Volumetric Glow dynamically scaling with progress */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(112, 225, 255, ${0.1 + progress * 0.25}) 0%, rgba(139, 92, 246, ${0.1 + progress * 0.2}) 50%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: 'all 0.4s ease-out',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '60px', textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px' }}>
          <div className="tech-tag violet" style={{ marginBottom: '16px' }}>
            <Sun size={13} />
            <span>SECTION E // THE REVEAL</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '18px',
            }}
          >
            LUMINOUS AWAKENING.
          </h2>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            A transition beyond dark obsidian into high-luminance prismatic geometry. Watch mathematical forms expand from containment into radiant infinity.
          </p>
        </div>

        {/* Cinematic Reveal Viewport Frame */}
        <div
          className="glass-panel"
          style={{
            position: 'relative',
            height: '560px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid rgba(112, 225, 255, ${0.2 + progress * 0.5})`,
            boxShadow: `0 20px 60px -15px rgba(0, 0, 0, 0.8), 0 0 ${progress * 50}px rgba(112, 225, 255, ${progress * 0.35})`,
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
        >
          {/* Live 3D Scene */}
          <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <RevealScene progress={progress} isRevealed={isRevealed} />
          </div>

          {/* Interactive Floating Trigger Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '560px',
              background: 'rgba(8, 9, 13, 0.82)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              zIndex: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--accent-blue)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#F5F5F7', fontWeight: 600 }}>
                  HYPERSPACE LUMINOSITY
                </span>
              </div>

              <button
                onClick={handleToggleReveal}
                onMouseEnter={() => soundFX.playHover()}
                className="btn-primary"
                style={{
                  padding: '6px 16px',
                  fontSize: '0.72rem',
                }}
              >
                {isRevealed ? 'COLLAPSE PRISM' : 'FULL DETONATION'}
              </button>
            </div>

            {/* Scrub Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>0%</span>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.01"
                value={progress}
                onChange={handleSliderChange}
                aria-label="Hyperspace reveal scrubber"
                style={{
                  flexGrow: 1,
                  accentColor: '#70E1FF',
                  cursor: 'pointer',
                  height: '6px',
                }}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 700 }}>
                {Math.round(progress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
