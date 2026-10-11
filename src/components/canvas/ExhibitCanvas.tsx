import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { seededRandom } from '../../utils/math';

// EXHIBIT 1: MATTER (Metallic Geometric Sculpture)
const MatterContent: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const speed = isHovered ? 1.6 : 0.8;
    meshRef.current.rotation.x += delta * 0.4 * speed;
    meshRef.current.rotation.y += delta * 0.6 * speed;

    if (ringRef.current) {
      ringRef.current.rotation.x -= delta * 0.3 * speed;
      ringRef.current.rotation.z += delta * 0.5 * speed;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFFFFF" />
      <pointLight position={[-4, -2, -2]} intensity={2.5} color="#8B5CF6" />
      <pointLight position={[3, -4, 2]} intensity={1.8} color="#70E1FF" />

      {/* Main Matter Sculpture */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.9, 0.32, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color={isHovered ? "#E2E8F0" : "#94A3B8"}
          metalness={0.96}
          roughness={isHovered ? 0.08 : 0.18}
          emissive="#8B5CF6"
          emissiveIntensity={isHovered ? 0.25 : 0.08}
        />
      </mesh>

      {/* Floating Accent Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.65, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#70E1FF"
          emissive="#70E1FF"
          emissiveIntensity={0.6}
          wireframe={true}
        />
      </mesh>
    </>
  );
};

// EXHIBIT 2: ENERGY (Procedural Particle Vortex Field)
const EnergyContent: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1400;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#8B5CF6');
    const c2 = new THREE.Color('#70E1FF');

    for (let i = 0; i < count; i++) {
      // Swirling logarithmic spiral vortex
      const r1 = seededRandom(i * 4 + 1);
      const r2 = seededRandom(i * 4 + 2);
      const r3 = seededRandom(i * 4 + 3);
      const r4 = seededRandom(i * 4 + 4);

      const angle = i * 0.1;
      const radius = 0.3 + (i / count) * 1.8;
      const height = (r1 - 0.5) * 1.6;

      pos[i * 3] = Math.cos(angle) * radius + (r2 - 0.5) * 0.2;
      pos[i * 3 + 1] = height + Math.sin(angle * 2) * 0.2;
      pos[i * 3 + 2] = Math.sin(angle) * radius + (r3 - 0.5) * 0.2;

      const mix = r4;
      const c = c1.clone().lerp(c2, mix);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const speed = isHovered ? 1.8 : 0.9;
    pointsRef.current.rotation.y += delta * 0.8 * speed;
    pointsRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isHovered ? 0.045 : 0.035}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Center Energy Core Beacon */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#70E1FF" />
      </mesh>
    </>
  );
};

// EXHIBIT 3: SPACE (Wireframe Architectural Depth Portal)
const SpaceContent: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef<number>(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    const time = timeRef.current;
    const speed = isHovered ? 1.4 : 0.6;
    groupRef.current.rotation.z += delta * 0.2 * speed;
    groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.35;
    groupRef.current.rotation.x = Math.cos(time * 0.4) * 0.25;
  });

  const frames = [0.8, 1.2, 1.6, 2.0, 2.4];

  return (
    <>
      <fogExp2 attach="fog" args={['#08090D', 0.18]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={2.0} color="#70E1FF" />
      <pointLight position={[0, 0, -3]} intensity={2.0} color="#8B5CF6" />

      <group ref={groupRef}>
        {/* Concentric recursive architectural frames */}
        {frames.map((size, index) => (
          <mesh key={index} position={[0, 0, (index - 2) * 0.6]}>
            <boxGeometry args={[size, size, 0.4]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#8B5CF6" : "#70E1FF"}
              wireframe={true}
              emissive={index % 2 === 0 ? "#8B5CF6" : "#70E1FF"}
              emissiveIntensity={isHovered ? 0.7 : 0.3}
            />
          </mesh>
        ))}

        {/* Central Spatial Monolith */}
        <mesh>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#FFFFFF"
            wireframe={false}
            metalness={0.9}
            roughness={0.1}
            emissive="#70E1FF"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </>
  );
};

export const ExhibitCanvas: React.FC<{
  type: 'matter' | 'energy' | 'space';
  isHovered: boolean;
}> = ({ type, isHovered }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true }}
      >
        {type === 'matter' && <MatterContent isHovered={isHovered} />}
        {type === 'energy' && <EnergyContent isHovered={isHovered} />}
        {type === 'space' && <SpaceContent isHovered={isHovered} />}
      </Canvas>
    </div>
  );
};
