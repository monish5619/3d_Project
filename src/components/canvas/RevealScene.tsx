import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { seededRandom } from '../../utils/math';

interface RevealSceneProps {
  progress: number; // 0 to 1
  isRevealed: boolean;
}

const RevealContent: React.FC<RevealSceneProps> = ({ progress, isRevealed }) => {
  const monolithGroupRef = useRef<THREE.Group>(null);
  const corePolyRef = useRef<THREE.Mesh>(null);
  const streakPointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef<number>(0);

  // Procedural hyperspace light streaks
  const streakCount = 1200;
  const [streakPositions, streakColors] = useMemo(() => {
    const pos = new Float32Array(streakCount * 3);
    const col = new Float32Array(streakCount * 3);
    const cViolet = new THREE.Color('#8B5CF6');
    const cCyan = new THREE.Color('#70E1FF');
    const cAmber = new THREE.Color('#F59E0B');

    for (let i = 0; i < streakCount; i++) {
      const r1 = seededRandom(i * 4 + 1);
      const r2 = seededRandom(i * 4 + 2);
      const r3 = seededRandom(i * 4 + 3);
      const r4 = seededRandom(i * 4 + 4);

      const radius = 0.5 + r1 * 5.0;
      const angle = r2 * Math.PI * 2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (r3 - 0.5) * 12.0;

      const pick = r4;
      const c = pick < 0.4 ? cViolet : pick < 0.8 ? cCyan : cAmber;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;

    if (monolithGroupRef.current) {
      monolithGroupRef.current.rotation.y += delta * (0.3 + progress * 0.8);
      monolithGroupRef.current.rotation.z = Math.sin(time * 0.5) * (0.1 + progress * 0.2);
    }

    if (corePolyRef.current) {
      corePolyRef.current.rotation.x += delta * (0.6 + progress * 1.2);
      corePolyRef.current.rotation.y -= delta * (0.4 + progress * 0.8);
      const scale = 1 + progress * 0.8 + Math.sin(time * 4) * (0.05 + progress * 0.1);
      corePolyRef.current.scale.set(scale, scale, scale);
    }

    if (streakPointsRef.current) {
      streakPointsRef.current.rotation.z += delta * (0.2 + progress * 0.5);
      const positions = streakPointsRef.current.geometry.attributes.position.array as Float32Array;
      const speed = 4.0 + progress * 14.0;

      for (let i = 0; i < streakCount; i++) {
        positions[i * 3 + 2] += delta * speed;
        if (positions[i * 3 + 2] > 6) {
          positions[i * 3 + 2] = -6;
        }
      }
      streakPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Calculate dynamic radius and expansion based on reveal progress
  const expansion = 1.0 + progress * 1.5;
  const pillarCount = 8;
  const pillars = useMemo(() => Array.from({ length: pillarCount }), []);

  return (
    <>
      <ambientLight intensity={0.2 + progress * 0.6} />
      <pointLight
        position={[0, 0, 0]}
        intensity={2.0 + progress * 5.0}
        color={progress > 0.5 ? "#70E1FF" : "#8B5CF6"}
        distance={10}
      />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.0 + progress * 2.0}
        color="#F5F5F7"
      />

      {/* Hyperspace Light Streaks */}
      <points ref={streakPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[streakPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[streakColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035 + progress * 0.03}
          vertexColors
          transparent
          opacity={0.3 + progress * 0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Central Luminous Polyhedron */}
      <mesh ref={corePolyRef}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color={progress > 0.6 ? "#FFFFFF" : "#8B5CF6"}
          emissive={progress > 0.6 ? "#70E1FF" : "#8B5CF6"}
          emissiveIntensity={0.8 + progress * 2.2}
          wireframe={!isRevealed && progress < 0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Concentric Geometric Monolith Pillars expanding outwards */}
      <group ref={monolithGroupRef}>
        {pillars.map((_, i) => {
          const angle = (i / pillarCount) * Math.PI * 2;
          const radius = 1.8 * expansion;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <mesh
              key={i}
              position={[x, y, 0]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <boxGeometry args={[0.12, 1.2 * expansion, 0.2]} />
              <meshStandardMaterial
                color="#70E1FF"
                emissive="#70E1FF"
                emissiveIntensity={0.3 + progress * 0.8}
                metalness={0.85}
                roughness={0.15}
                transparent
                opacity={0.6 + progress * 0.4}
              />
            </mesh>
          );
        })}
      </group>

      {/* Outer Halo Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.8 * expansion, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#F5F5F7"
          emissive="#70E1FF"
          emissiveIntensity={0.5 + progress * 1.5}
        />
      </mesh>
    </>
  );
};

export const RevealScene: React.FC<RevealSceneProps> = (props) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true }}
      >
        <RevealContent {...props} />
      </Canvas>
    </div>
  );
};
