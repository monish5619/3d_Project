import React, { useState } from 'react';
import { Sliders, RotateCw, Play, Pause, RefreshCw, Zap, Shield, Sparkles } from 'lucide-react';
import { NexusCoreScene } from '../canvas/NexusCoreScene';
import type { VisualMode, LabSettings } from '../../types';
import { soundFX } from '../../utils/audio';

const DEFAULT_SETTINGS: LabSettings = {
  rotationSpeed: 1.0,
  particleIntensity: 800,
  visualMode: 'solid',
  accentColor: '#8B5CF6',
  isPlaying: true,
  shellEnabled: true,
};

export const LabSection: React.FC = () => {
  const [settings, setSettings] = useState<LabSettings>(DEFAULT_SETTINGS);
  const [resetKey, setResetKey] = useState(0);

  const visualModes: { id: VisualMode; label: string; desc: string }[] = [
    { id: 'solid', label: 'SOLID', desc: 'Physically based metallic finish' },
    { id: 'wireframe', label: 'WIREFRAME', desc: 'Orthogonal geometric lattice' },
    { id: 'hologram', label: 'HOLOGRAM', desc: 'Iridescent volumetric scanlines' },
    { id: 'quantum', label: 'QUANTUM', desc: 'Probability point cloud resonance' },
  ];

  const colorPalette = [
    { name: 'Electric Violet', hex: '#8B5CF6' },
    { name: 'Ice Blue', hex: '#70E1FF' },
    { name: 'Restrained Amber', hex: '#F59E0B' },
    { name: 'Aurora Emerald', hex: '#10B981' },
    { name: 'Solar Rose', hex: '#F43F5E' },
  ];

  const handleReset = () => {
    soundFX.playClick(600);
    setSettings(DEFAULT_SETTINGS);
    setResetKey((prev) => prev + 1);
  };

  const updateSetting = <K extends keyof LabSettings>(key: K, value: LabSettings[K]) => {
    soundFX.playClick(1100);
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section
      id="lab"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 0',
        backgroundColor: '#08090D',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
          <div className="tech-tag" style={{ marginBottom: '14px' }}>
            <Sliders size={13} />
            <span>SECTION D // EXPERIMENTATION</span>
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
            INTERACTIVE LAB.
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              lineHeight: 1.6,
            }}
          >
            Take direct control of the simulation pipeline. Adjust rotational physics, particle density, topological wireframes, and optical chromatic properties in real time.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '36px',
            alignItems: 'stretch',
          }}
        >
          {/* Controls Control Panel */}
          <div
            className="glass-panel"
            style={{
              padding: 'clamp(20px, 4vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              background: 'rgba(17, 19, 26, 0.85)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sliders size={18} color="var(--accent-blue)" />
                <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}>CONTROL MATRIX</h3>
              </div>

              {/* Reset Control */}
              <button
                onClick={handleReset}
                className="btn-secondary"
                style={{
                  padding: '6px 14px',
                  fontSize: '0.72rem',
                  gap: '6px',
                }}
                title="Reset all lab parameters to default values"
                aria-label="Reset lab parameters"
              >
                <RefreshCw size={12} />
                <span>RESET</span>
              </button>
            </div>

            {/* Control 1: Rotation Speed */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <label
                  htmlFor="slider-speed"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <RotateCw size={14} />
                  <span>ROTATION VELOCITY</span>
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: settings.accentColor, fontWeight: 700 }}>
                  {settings.rotationSpeed.toFixed(1)}x
                </span>
              </div>
              <input
                id="slider-speed"
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={settings.rotationSpeed}
                onChange={(e) => updateSetting('rotationSpeed', parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: settings.accentColor,
                  cursor: 'pointer',
                  height: '6px',
                  borderRadius: '3px',
                }}
              />
            </div>

            {/* Control 2: Particle Intensity */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <label
                  htmlFor="slider-particles"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={14} />
                  <span>PARTICLE FLUX INTENSITY</span>
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#70E1FF', fontWeight: 700 }}>
                  {settings.particleIntensity} PTS
                </span>
              </div>
              <input
                id="slider-particles"
                type="range"
                min="100"
                max="2000"
                step="100"
                value={settings.particleIntensity}
                onChange={(e) => updateSetting('particleIntensity', parseInt(e.target.value, 10))}
                style={{
                  width: '100%',
                  accentColor: settings.accentColor,
                  cursor: 'pointer',
                  height: '6px',
                  borderRadius: '3px',
                }}
              />
            </div>

            {/* Control 3: Visual Mode */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Zap size={14} />
                <span>TOPOLOGICAL SHADER MODE</span>
              </div>
              <div
                role="radiogroup"
                aria-label="Visual Shader Mode"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                }}
              >
                {visualModes.map((mode) => {
                  const isActive = settings.visualMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => updateSetting('visualMode', mode.id)}
                      onMouseEnter={() => soundFX.playHover()}
                      style={{
                        padding: '10px 12px',
                        background: isActive ? `${settings.accentColor}25` : 'rgba(255, 255, 255, 0.04)',
                        border: `1px solid ${isActive ? settings.accentColor : 'rgba(255, 255, 255, 0.1)'}`,
                        borderRadius: '6px',
                        color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'var(--transition-snappy)',
                      }}
                    >
                      <div style={{ color: isActive ? settings.accentColor : '#FFFFFF' }}>{mode.label}</div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {mode.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 4: Accent Color */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '10px',
                }}
              >
                EMISSIVE CHROMATIC SPECTRUM
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {colorPalette.map((col) => {
                  const isSelected = settings.accentColor === col.hex;
                  return (
                    <button
                      key={col.hex}
                      onClick={() => updateSetting('accentColor', col.hex)}
                      title={col.name}
                      aria-label={`Select ${col.name}`}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: col.hex,
                        border: isSelected ? '3px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: isSelected ? `0 0 15px ${col.hex}` : 'none',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                        cursor: 'pointer',
                        transition: 'var(--transition-snappy)',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Control 5: Toggles (Play/Pause & Shell) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <button
                onClick={() => updateSetting('isPlaying', !settings.isPlaying)}
                className="btn-secondary"
                style={{
                  padding: '10px 16px',
                  fontSize: '0.75rem',
                  gap: '8px',
                }}
              >
                {settings.isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{settings.isPlaying ? 'PAUSE MOTOR' : 'RESUME MOTOR'}</span>
              </button>

              <button
                onClick={() => updateSetting('shellEnabled', !settings.shellEnabled)}
                className="btn-secondary"
                style={{
                  padding: '10px 16px',
                  fontSize: '0.75rem',
                  gap: '8px',
                  borderColor: settings.shellEnabled ? settings.accentColor : undefined,
                }}
              >
                <Shield size={14} />
                <span>{settings.shellEnabled ? 'SHELL ACTIVE' : 'SHELL HIDDEN'}</span>
              </button>
            </div>
          </div>

          {/* Live 3D Simulation Canvas */}
          <div
            className="glass-panel"
            style={{
              position: 'relative',
              minHeight: '520px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              background: 'radial-gradient(circle at center, rgba(17, 19, 26, 0.95) 0%, rgba(8, 9, 13, 0.98) 100%)',
              borderColor: `${settings.accentColor}40`,
            }}
          >
            {/* Live 3D Canvas rendering user settings */}
            <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <NexusCoreScene
                key={resetKey}
                rotationSpeed={settings.rotationSpeed}
                particleIntensity={settings.particleIntensity}
                visualMode={settings.visualMode}
                accentColor={settings.accentColor}
                isPlaying={settings.isPlaying}
                shellEnabled={settings.shellEnabled}
              />
            </div>

            {/* Viewport Live HUD Header */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(8, 9, 13, 0.65)',
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: settings.isPlaying ? '#10B981' : '#F59E0B',
                    boxShadow: settings.isPlaying ? '0 0 10px #10B981' : '0 0 10px #F59E0B',
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                  {settings.isPlaying ? 'SIMULATION RUNNING' : 'ENGINE SUSPENDED'}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: settings.accentColor,
                  fontWeight: 700,
                }}
              >
                {settings.visualMode.toUpperCase()} // {(settings.rotationSpeed).toFixed(1)}X
              </div>
            </div>

            {/* Viewport Bottom Live Readout */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(8, 9, 13, 0.65)',
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                COORDINATES: [0, 0, 6.2] // SHADER: GLSL 3.0
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#70E1FF' }}>
                LIVE GPU PIPELINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
