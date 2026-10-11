import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { VisualMode } from '../../types';

import { seededRandom } from '../../utils/math';

interface NexusCoreProps {
  rotationSpeed?: number;
  particleIntensity?: number;
  visualMode?: VisualMode;
  accentColor?: string;
  isPlaying?: boolean;
  shellEnabled?: boolean;
  scrollProgress?: number;
  isMobile?: boolean;
}

// Procedural Particle Field
const ParticleCloud: React.FC<{
  count: number;
  color: string;
  isPlaying: boolean;
}> = ({ count, color, isPlaying }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spherical distribution around core
      const rRand = seededRandom(i * 3 + 1);
      const thetaRand = seededRandom(i * 3 + 2);
      const phiRand = seededRandom(i * 3 + 3);

      const radius = 2.5 + rRand * 4.5;
      const theta = thetaRand * Math.PI * 2;
      const phi = Math.acos(2 * phiRand - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !isPlaying) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Orbital Track Ring
const OrbitRing: React.FC<{
  radius: number;
  tube: number;
  rotationSpeed: [number, number, number];
  color: string;
  opacity?: number;
  wireframe?: boolean;
  isPlaying: boolean;
}> = ({ radius, tube, rotationSpeed, color, opacity = 0.5, wireframe = false, isPlaying }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || !isPlaying) return;
    meshRef.current.rotation.x += delta * rotationSpeed[0];
    meshRef.current.rotation.y += delta * rotationSpeed[1];
    meshRef.current.rotation.z += delta * rotationSpeed[2];
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, tube, 16, 80]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.9}
        roughness={0.2}
        transparent
        opacity={opacity}
        wireframe={wireframe}
      />
    </mesh>
  );
};

// Central Core Geometry with multi-state materials
const CoreCenter: React.FC<{
  visualMode: VisualMode;
  accentColor: string;
  isPlaying: boolean;
  rotationSpeed: number;
}> = ({ visualMode, accentColor, isPlaying, rotationSpeed }) => {
  const coreRef = useRef<THREE.Group>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef<number>(0);

  useFrame((_, delta) => {
    if (!coreRef.current || !isPlaying) return;
    timeRef.current += delta;
    const time = timeRef.current;
    coreRef.current.rotation.y += delta * 0.4 * rotationSpeed;
    coreRef.current.rotation.x = Math.sin(time * 0.5) * 0.15;
    coreRef.current.rotation.z = Math.cos(time * 0.3) * 0.1;

    // Subtle breathing pulse
    const pulse = 1 + Math.sin(time * 2) * 0.03;
    coreRef.current.scale.set(pulse, pulse, pulse);

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.6 * rotationSpeed;
    }
  });

  const isWire = visualMode === 'wireframe';
  const isQuantum = visualMode === 'quantum';
  const isHolo = visualMode === 'hologram';

  return (
    <group ref={coreRef}>
      {/* Primary Faceted Crystal / Octahedron / Icosahedron */}
      <mesh>
        <icosahedronGeometry args={[1.2, isWire ? 1 : 0]} />
        {isHolo ? (
          <meshPhysicalMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.8}
            wireframe={true}
            transparent
            opacity={0.85}
          />
        ) : isQuantum ? (
          <meshStandardMaterial
            color="#FFFFFF"
            emissive={accentColor}
            emissiveIntensity={1.2}
            transparent
            opacity={0.4}
            wireframe={true}
          />
        ) : (
          <meshPhysicalMaterial
            color="#141724"
            emissive={accentColor}
            emissiveIntensity={0.15}
            metalness={0.95}
            roughness={0.12}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            wireframe={isWire}
          />
        )}
      </mesh>

      {/* Nested Inner Core Node */}
      <mesh ref={innerMeshRef} scale={0.65}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.6}
          wireframe={isWire || isQuantum}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

// Coordinated Scene Content
const SceneContent: React.FC<NexusCoreProps> = ({
  rotationSpeed = 1,
  particleIntensity = 800,
  visualMode = 'solid',
  accentColor = '#8B5CF6',
  isPlaying = true,
  shellEnabled = true,
  scrollProgress = 0,
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Mouse Parallax & Scroll response
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth pointer parallax
    const targetX = (mouse.x * 0.4);
    const targetY = (mouse.y * 0.3) - (scrollProgress * 0.5);

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * (delta * 2.5);
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * (delta * 2.5);

    // Scroll rotation drift
    groupRef.current.rotation.y = scrollProgress * Math.PI * 0.75;
    groupRef.current.rotation.x = mouse.y * 0.15 + (scrollProgress * 0.2);

    // Shell slow rotation
    if (shellRef.current && isPlaying) {
      shellRef.current.rotation.x += delta * 0.08 * rotationSpeed;
      shellRef.current.rotation.z += delta * 0.12 * rotationSpeed;
    }
  });

  const effectiveParticleCount = isMobile ? Math.min(particleIntensity, 350) : particleIntensity;

  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={0.35} />
      {/* Primary Key Light */}
      <pointLight position={[5, 6, 6]} intensity={1.8} color="#F5F5F7" />
      {/* Violet Rim Light */}
      <pointLight position={[-6, 3, -2]} intensity={2.4} color="#8B5CF6" />
      {/* Ice Blue Accent Light */}
      <pointLight position={[4, -5, 4]} intensity={2.0} color="#70E1FF" />
      {/* Dynamic Accent Color Light */}
      <pointLight position={[0, 0, 0]} intensity={1.2} color={accentColor} distance={4} />

      <group ref={groupRef}>
        {/* Layer 1: Core */}
        <CoreCenter
          visualMode={visualMode}
          accentColor={accentColor}
          isPlaying={isPlaying}
          rotationSpeed={rotationSpeed}
        />

        {/* Layer 2: Rotating Metallic Gimbal Rings */}
        <OrbitRing
          radius={1.8}
          tube={0.022}
          rotationSpeed={[0.3 * rotationSpeed, 0.4 * rotationSpeed, 0]}
          color="#94A3B8"
          isPlaying={isPlaying}
          wireframe={visualMode === 'wireframe'}
        />
        <OrbitRing
          radius={2.15}
          tube={0.018}
          rotationSpeed={[-0.25 * rotationSpeed, 0.15 * rotationSpeed, 0.35 * rotationSpeed]}
          color="#70E1FF"
          opacity={0.65}
          isPlaying={isPlaying}
          wireframe={visualMode === 'wireframe'}
        />
        <OrbitRing
          radius={2.5}
          tube={0.015}
          rotationSpeed={[0.15 * rotationSpeed, -0.3 * rotationSpeed, -0.2 * rotationSpeed]}
          color={accentColor}
          opacity={0.7}
          isPlaying={isPlaying}
          wireframe={visualMode === 'wireframe'}
        />

        {/* Layer 3: Fine Orbital Path Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[2.9, 2.92, 64]} />
          <meshBasicMaterial
            color="#70E1FF"
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Layer 4: Procedural Particle Cloud */}
        <ParticleCloud
          count={effectiveParticleCount}
          color={accentColor}
          isPlaying={isPlaying}
        />

        {/* Layer 5: Secondary Outer Energy Wireframe Shell */}
        {shellEnabled && (
          <mesh ref={shellRef} scale={3.2}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={accentColor}
              wireframe={true}
              transparent
              opacity={visualMode === 'hologram' ? 0.35 : 0.18}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
        )}
      </group>
    </>
  );
};

export const NexusCoreScene: React.FC<NexusCoreProps> = (props) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <SceneContent {...props} />
      </Canvas>
    </div>
  );
};
