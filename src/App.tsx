import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { WorldInMotionSection } from './components/sections/WorldInMotionSection';
import { ExhibitsSection } from './components/sections/ExhibitsSection';
import { LabSection } from './components/sections/LabSection';
import { RevealSection } from './components/sections/RevealSection';
import { CtaSection } from './components/sections/CtaSection';
import { Footer } from './components/sections/Footer';
import { WebGLFallback } from './components/WebGLFallback';
import { soundFX } from './utils/audio';

export const App: React.FC = () => {
  const [webglSupported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      return false;
    }
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      soundFX.playClick(900);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#08090D' }}>
      {/* Elegant Custom Cursor */}
      <CustomCursor />

      {/* Futuristic Navbar */}
      <Navbar />

      {/* Main Experience Layout */}
      <main id="main-content">
        {!webglSupported ? (
          <div className="container" style={{ paddingTop: '140px', paddingBottom: '100px' }}>
            <WebGLFallback message="WebGL hardware acceleration was not detected in this session. A procedural CSS environment has been activated." />
          </div>
        ) : (
          <>
            {/* SECTION A — CINEMATIC HERO */}
            <HeroSection
              onEnterExperience={() => scrollToSection('motion')}
              onExploreWorld={() => scrollToSection('exhibits')}
            />

            {/* SECTION B — A WORLD IN MOTION */}
            <WorldInMotionSection />

            {/* SECTION C — THREE DIMENSIONS */}
            <ExhibitsSection />

            {/* SECTION D — INTERACTIVE LAB */}
            <LabSection />

            {/* SECTION E — THE REVEAL */}
            <RevealSection />

            {/* SECTION F — FINAL CALL TO ACTION */}
            <CtaSection onReturnToHero={() => scrollToSection('hero')} />
          </>
        )}
      </main>

      {/* SECTION G — FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
