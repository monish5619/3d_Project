import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { seededRandom } from '../../utils/math';
import { isWebGLAvailable } from '../../utils/webgl';
import { createProceduralStudioEnvironment } from '../../utils/texture';
import { WebGLFallback } from '../WebGLFallback';

interface RevealSceneProps {
  progress: number; // 0 to 1
  isRevealed: boolean;
}

const RevealContent: React.FC<RevealSceneProps> = ({ progress, isRevealed }) => {
  const monolithGroupRef = useRef<THREE.Group>(null);
  const corePolyRef = useRef<THREE.Mesh>(null);
  const innerNodeRef = useRef<THREE.Mesh>(null);
  const streakPointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef<number>(0);

  // Procedural studio environment for realistic PBR reflections
  const envTexture = useMemo(() => createProceduralStudioEnvironment(), []);
  useEffect(() => {
    return () => {
      envTexture.dispose();
    };
  }, [envTexture]);

  // Procedural hyperspace light streaks
  const streakCount = 1400;
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

      const radius = 0.5 + r1 * 5.5;
      const angle = r2 * Math.PI * 2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (r3 - 0.5) * 14.0;

      const pick = r4;
      const c = pick < 0.35 ? cViolet : pick < 0.75 ? cCyan : cAmber;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;

    // Coherent camera dolly based on reveal progress
    const targetZ = 5.5 - progress * 1.6;
    state.camera.position.z += (targetZ - state.camera.position.z) * (delta * 2.5);

    if (monolithGroupRef.current) {
      monolithGroupRef.current.rotation.y += delta * (0.35 + progress * 0.9);
      monolithGroupRef.current.rotation.z = Math.sin(time * 0.5) * (0.1 + progress * 0.25);
    }

    if (corePolyRef.current) {
      corePolyRef.current.rotation.x += delta * (0.6 + progress * 1.4);
      corePolyRef.current.rotation.y -= delta * (0.4 + progress * 0.9);
      const scale = 1 + progress * 0.9 + Math.sin(time * 4) * (0.05 + progress * 0.12);
      corePolyRef.current.scale.set(scale, scale, scale);
    }

    if (innerNodeRef.current) {
      innerNodeRef.current.rotation.y += delta * (1.2 + progress * 2.0);
      innerNodeRef.current.rotation.z -= delta * (0.8 + progress * 1.5);
    }

    if (streakPointsRef.current) {
      streakPointsRef.current.rotation.z += delta * (0.2 + progress * 0.6);
      const positions = streakPointsRef.current.geometry.attributes.position.array as Float32Array;
      const speed = 4.0 + progress * 16.0;

      for (let i = 0; i < streakCount; i++) {
        positions[i * 3 + 2] += delta * speed;
        if (positions[i * 3 + 2] > 7) {
          positions[i * 3 + 2] = -7;
        }
      }
      streakPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Calculate dynamic expansion radius of radial crystal monolith iris
  const expansion = 1.0 + progress * 1.8;
  const pillarCount = 12;
  const pillars = useMemo(() => Array.from({ length: pillarCount }), []);

  return (
    <>
      <primitive object={envTexture} attach="environment" />
      <ambientLight intensity={0.25 + progress * 0.75} />
      <pointLight
        position={[0, 0, 0]}
        intensity={2.0 + progress * 6.5}
        color={progress > 0.5 ? "#70E1FF" : "#8B5CF6"}
        distance={12}
      />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.0 + progress * 2.5}
        color="#F5F5F7"
      />

      {/* Hyperspace Light Streaks */}
      <points ref={streakPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[streakPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[streakColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035 + progress * 0.035}
          vertexColors
          transparent
          opacity={0.35 + progress * 0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Central Luminous Polyhedron with Shifting Material State */}
      <mesh ref={corePolyRef}>
        <dodecahedronGeometry args={[0.95, 0]} />
        <meshPhysicalMaterial
          color={progress > 0.5 ? "#FFFFFF" : "#1E1B4B"}
          emissive={progress > 0.5 ? "#70E1FF" : "#8B5CF6"}
          emissiveIntensity={0.8 + progress * 2.6}
          wireframe={!isRevealed && progress < 0.25}
          metalness={0.92}
          roughness={0.08}
          clearcoat={1.0}
        />
      </mesh>

      {/* Nested Inner Prismatic Energy Core */}
      <mesh ref={innerNodeRef} scale={0.45}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#70E1FF"
          emissiveIntensity={1.5 + progress * 3.0}
        />
      </mesh>

      {/* Concentric Geometric Monolith Pillars Expanding Outward Like an Iris */}
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
              <boxGeometry args={[0.14, 1.35 * expansion, 0.22]} />
              <meshStandardMaterial
                color={progress > 0.5 ? "#70E1FF" : "#8B5CF6"}
                emissive={progress > 0.5 ? "#70E1FF" : "#8B5CF6"}
                emissiveIntensity={0.3 + progress * 0.9}
                metalness={0.88}
                roughness={0.12}
                transparent
                opacity={0.65 + progress * 0.35}
              />
            </mesh>
          );
        })}
      </group>

      {/* Multi-tiered Outer Halo Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.8 * expansion, 0.024, 16, 100]} />
        <meshStandardMaterial
          color="#F5F5F7"
          emissive="#70E1FF"
          emissiveIntensity={0.5 + progress * 1.8}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.2 * expansion, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.4 + progress * 1.6}
        />
      </mesh>
    </>
  );
};

export const RevealScene: React.FC<RevealSceneProps> = (props) => {
  const hasWebGL = useMemo(() => isWebGLAvailable(), []);

  if (!hasWebGL) {
    return (
      <div style={{ width: '100%', height: '100%', minHeight: '350px' }}>
        <WebGLFallback message="Procedural hyperspace luminous simulation active." />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <RevealContent {...props} />
      </Canvas>
    </div>
  );
};
