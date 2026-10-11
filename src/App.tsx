import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { WorldInMotionSection } from './components/sections/WorldInMotionSection';
import { ExhibitsSection } from './components/sections/ExhibitsSection';
import { ArtifactsSection } from './components/sections/ArtifactsSection';
import { LabSection } from './components/sections/LabSection';
import { RevealSection } from './components/sections/RevealSection';
import { CtaSection } from './components/sections/CtaSection';
import { Footer } from './components/sections/Footer';
import { soundFX } from './utils/audio';

export const App: React.FC = () => {
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
        {/* SECTION A — CINEMATIC HERO */}
        <HeroSection
          onEnterExperience={() => scrollToSection('motion')}
          onExploreWorld={() => scrollToSection('exhibits')}
        />

        {/* SECTION B — A WORLD IN MOTION */}
        <WorldInMotionSection />

        {/* SECTION C — THREE DIMENSIONS */}
        <ExhibitsSection />

        {/* SECTION D — FLOATING 3D ARTIFACT GALLERY */}
        <ArtifactsSection />

        {/* SECTION E — INTERACTIVE LAB */}
        <LabSection />

        {/* SECTION F — THE REVEAL */}
        <RevealSection />

            {/* SECTION F — FINAL CALL TO ACTION */}
            <CtaSection onReturnToHero={() => scrollToSection('hero')} />
      </main>

      {/* SECTION G — FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
