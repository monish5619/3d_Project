import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Activity, ShieldCheck, ChevronRight, Layers } from 'lucide-react';
import { NexusCoreScene } from '../canvas/NexusCoreScene';
import { soundFX } from '../../utils/audio';

interface HeroSectionProps {
  onEnterExperience: () => void;
  onExploreWorld: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterExperience,
  onExploreWorld,
}) => {
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(12);
  const [exploded, setExploded] = useState(false);

  // Subtle telemetry jitter for realistic live feeling
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(59 + Math.random() * 2));
      setLatency(Math.floor(10 + Math.random() * 4));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '80px',
        overflow: 'hidden',
      }}
    >
      {/* Background 3D NEXUS CORE Scene */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'auto',
        }}
      >
        <NexusCoreScene
          rotationSpeed={1.0}
          particleIntensity={700}
          visualMode="solid"
          accentColor="#8B5CF6"
          isPlaying={true}
          shellEnabled={true}
          explodedProgress={exploded ? 1.0 : 0.0}
        />
      </div>

      {/* Radial vignette overlay to guarantee editorial legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(circle at 50% 50%, rgba(8, 9, 13, 0.2) 0%, rgba(8, 9, 13, 0.75) 75%, rgba(8, 9, 13, 0.95) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient Grid Lines */}
      <div
        className="bg-grid-ambient"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      {/* Hero Foreground Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 'calc(100vh - 120px)',
          paddingBottom: '32px',
          pointerEvents: 'none',
        }}
      >
        {/* Top Experiment Header Badge */}
        <div style={{ pointerEvents: 'auto', marginTop: '20px' }}>
          <div className="tech-tag violet" style={{ marginBottom: '16px' }}>
            <Sparkles size={13} />
            <span>NEXUS / DIGITAL EXPERIMENT 001</span>
          </div>
        </div>

        {/* Central Large Editorial Typography */}
        <div style={{ maxWidth: '850px', margin: 'auto 0', pointerEvents: 'auto' }}>
          <h1
            style={{
              fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              fontWeight: 800,
              color: '#FFFFFF',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)',
              marginBottom: '28px',
            }}
          >
            BEYOND<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #C4B5FD 50%, #70E1FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              THE
            </span><br />
            INTERFACE.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              lineHeight: 1.55,
              marginBottom: '36px',
              fontStyle: 'italic',
            }}
          >
            &ldquo;An exploration of space, motion, and the future of digital experiences.&rdquo;
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => {
                soundFX.playClick(1000);
                onEnterExperience();
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="btn-primary"
              id="cta-enter"
            >
              <span>ENTER THE EXPERIENCE</span>
              <ChevronRight size={18} />
            </button>

            <button
              onClick={() => {
                soundFX.playClick(750);
                onExploreWorld();
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="btn-secondary"
              id="cta-explore"
            >
              <span>EXPLORE THE WORLD</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick(exploded ? 600 : 950);
                setExploded(!exploded);
              }}
              onMouseEnter={() => soundFX.playHover()}
              className="btn-secondary"
              id="cta-exploded"
              style={{
                borderColor: exploded ? 'var(--accent-blue)' : undefined,
                color: exploded ? 'var(--accent-blue)' : undefined,
                background: exploded ? 'rgba(112, 225, 255, 0.1)' : undefined,
              }}
              title="Toggle deconstructed exploded view of the mechanical celestial planet"
            >
              <Layers size={16} />
              <span>{exploded ? 'ASSEMBLE NOMINAL' : 'DECONSTRUCT CORE'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Telemetry HUD & Scroll Indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            pointerEvents: 'auto',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Telemetry Data Grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={14} color="#10B981" />
              <span>FPS: <strong style={{ color: '#F5F5F7' }}>{fps}</strong></span>
            </div>
            <div>
              <span>LATENCY: <strong style={{ color: '#F5F5F7' }}>{latency}ms</strong></span>
            </div>
            <div style={{ display: 'none', alignItems: 'center', gap: '8px' }} id="hud-specs">
              <ShieldCheck size={14} color="#70E1FF" />
              <span>VERTICES: <strong style={{ color: '#F5F5F7' }}>18.4K</strong></span>
            </div>
            <div>
              <span>KERNEL: <strong style={{ color: 'var(--accent-blue)' }}>WEBGL 2.0</strong></span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <a
            href="#motion"
            onClick={(e) => {
              e.preventDefault();
              onEnterExperience();
            }}
            onMouseEnter={() => soundFX.playHover()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              transition: 'var(--transition-snappy)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#70E1FF')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <span>SCROLL TO EXPLORE</span>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'floatSlow 3s ease-in-out infinite',
              }}
            >
              <ArrowDown size={14} />
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #hud-specs { display: flex !important; }
        }
      `}</style>
    </section>
  );
};
