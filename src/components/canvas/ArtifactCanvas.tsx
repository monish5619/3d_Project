import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { isWebGLAvailable } from '../../utils/webgl';
import { WebGLFallback } from '../WebGLFallback';

export type ArtifactType = 'chronos' | 'orbital' | 'prism' | 'helix' | 'monolith';

// ============================================================================
// 1. CHRONOS — Complex Mechanical Clockwork Sculpture
// ============================================================================
const ChronosArtifact: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);
  const escapementRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const speed = isFocused ? 1.6 : 0.9;
    if (gear1Ref.current) gear1Ref.current.rotation.z += delta * 0.8 * speed;
    if (gear2Ref.current) gear2Ref.current.rotation.z -= delta * 0.53 * speed;
    if (escapementRef.current) {
      escapementRef.current.rotation.y += delta * 1.4 * speed;
      escapementRef.current.rotation.x = Math.sin(Date.now() * 0.003) * 0.2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFFFFF" />
      <pointLight position={[-3, -2, -2]} intensity={2.0} color="#F59E0B" />

      {/* Main Brass Spur Gear 1 */}
      <group ref={gear1Ref} position={[-0.45, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.12, 18]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.94} roughness={0.16} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.92, 0.02, 16, 36]} />
          <meshStandardMaterial color="#FCD34D" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Secondary Obsidian Pinion Gear 2 */}
      <group ref={gear2Ref} position={[0.7, 0.45, 0]}>
        <mesh>
          <cylinderGeometry args={[0.55, 0.55, 0.12, 12]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>

      {/* Escapement Balance Wheel Assembly */}
      <mesh ref={escapementRef} position={[0, -0.65, 0.2]}>
        <torusGeometry args={[0.6, 0.03, 16, 48]} />
        <meshStandardMaterial color="#70E1FF" emissive="#70E1FF" emissiveIntensity={0.5} metalness={0.95} />
      </mesh>
    </group>
  );
};

// ============================================================================
// 2. ORBITAL — Intricate Orbital Satellite Assembly
// ============================================================================
const OrbitalArtifact: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  const groupRef = useRef<THREE.Group>(null);
  const dishRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    const speed = isFocused ? 1.5 : 0.8;
    timeRef.current += delta;
    const t = timeRef.current;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4 * speed;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }
    if (dishRef.current) {
      dishRef.current.rotation.z += delta * 0.6 * speed;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={2.4} color="#70E1FF" />
      <pointLight position={[-3, -3, -2]} intensity={1.8} color="#8B5CF6" />

      {/* Central Satellite Avionics Core */}
      <mesh>
        <boxGeometry args={[0.7, 0.7, 1.2]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.92} roughness={0.14} />
      </mesh>

      {/* Articulated Solar Array Wings (Left & Right) */}
      <mesh position={[-1.35, 0, 0]}>
        <boxGeometry args={[1.6, 0.6, 0.04]} />
        <meshStandardMaterial color="#1E3A8A" emissive="#3B82F6" emissiveIntensity={0.35} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.35, 0, 0]}>
        <boxGeometry args={[1.6, 0.6, 0.04]} />
        <meshStandardMaterial color="#1E3A8A" emissive="#3B82F6" emissiveIntensity={0.35} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Parabolic High-Gain Dish Antenna */}
      <mesh ref={dishRef} position={[0, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.55, 0.25, 32, 1, true]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.08} side={THREE.DoubleSide} />
      </mesh>

      {/* Reaction Attitude Ring */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.05, 0.02, 16, 64]} />
        <meshStandardMaterial color="#70E1FF" emissive="#70E1FF" emissiveIntensity={0.6} wireframe />
      </mesh>
    </group>
  );
};

// ============================================================================
// 3. PRISM — Multi-layered Refractive-looking Crystal Sculpture
// ============================================================================
const PrismArtifact: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const speed = isFocused ? 1.6 : 0.8;
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.45 * speed;
      outerRef.current.rotation.x += delta * 0.25 * speed;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.7 * speed;
      innerRef.current.rotation.z += delta * 0.5 * speed;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2.8} color="#70E1FF" distance={4} />
      <pointLight position={[4, 5, 3]} intensity={2.5} color="#C084FC" />

      {/* Outer Faceted Transmission Crystal Prism */}
      <mesh ref={outerRef} scale={1.25}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#EDE9FE"
          emissive="#8B5CF6"
          emissiveIntensity={0.25}
          metalness={0.1}
          roughness={0.05}
          transmission={0.88}
          transparent
          opacity={0.85}
          ior={1.75}
        />
      </mesh>

      {/* Inner Glowing Caustic Core Node */}
      <mesh ref={innerRef} scale={0.55}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#70E1FF"
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>

      {/* Dispersion Halo Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.6, 0.015, 16, 64]} />
        <meshBasicMaterial color="#C084FC" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

// ============================================================================
// 4. HELIX — Twisted Parametric Structure with Animated Bands
// ============================================================================
const HelixArtifact: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  const helixRef = useRef<THREE.Group>(null);
  const bandRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const speed = isFocused ? 1.8 : 0.9;
    if (helixRef.current) {
      helixRef.current.rotation.y += delta * 0.7 * speed;
      helixRef.current.rotation.z = Math.sin(Date.now() * 0.002) * 0.15;
    }
    if (bandRef.current) {
      bandRef.current.rotation.x -= delta * 0.6 * speed;
      bandRef.current.rotation.z += delta * 0.4 * speed;
    }
  });

  return (
    <group ref={helixRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 4, 3]} intensity={2.5} color="#10B981" />
      <pointLight position={[-3, -4, -3]} intensity={2.0} color="#70E1FF" />

      {/* Primary Twisted Helical Torus Knot */}
      <mesh>
        <torusKnotGeometry args={[0.9, 0.22, 160, 32, 2, 7]} />
        <meshPhysicalMaterial
          color="#A7F3D0"
          emissive="#10B981"
          emissiveIntensity={0.35}
          metalness={0.92}
          roughness={0.1}
          clearcoat={1.0}
        />
      </mesh>

      {/* Animated Orbiting Energy Band */}
      <mesh ref={bandRef}>
        <torusGeometry args={[1.5, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#34D399"
          emissive="#34D399"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>
    </group>
  );
};

// ============================================================================
// 5. MONOLITH — Monumental Geometric Structure with Surface Illumination
// ============================================================================
const MonolithArtifact: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  const monolithRef = useRef<THREE.Mesh>(null);
  const capstoneRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    const speed = isFocused ? 1.5 : 0.8;
    timeRef.current += delta;
    const t = timeRef.current;
    if (monolithRef.current) {
      monolithRef.current.rotation.y += delta * 0.35 * speed;
    }
    if (capstoneRef.current) {
      capstoneRef.current.rotation.y -= delta * 0.5 * speed;
      capstoneRef.current.position.y = 1.35 + Math.sin(t * 2.5) * 0.08;
    }
    if (haloRef.current) {
      haloRef.current.rotation.x += delta * 0.2 * speed;
      haloRef.current.rotation.y += delta * 0.4 * speed;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={2.4} color="#FFFFFF" />
      <pointLight position={[0, 0, 3]} intensity={2.5} color="#8B5CF6" />

      {/* Towering Basalt Obelisk Pillar */}
      <mesh ref={monolithRef} position={[0, -0.2, 0]}>
        <boxGeometry args={[0.7, 2.2, 0.7]} />
        <meshStandardMaterial
          color="#0F172A"
          emissive="#8B5CF6"
          emissiveIntensity={0.35}
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* Levitating Geometric Capstone */}
      <mesh ref={capstoneRef} position={[0, 1.35, 0]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#70E1FF"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.08}
        />
      </mesh>

      {/* Surrounding Runic Orbit Halo */}
      <mesh ref={haloRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.4, 0.018, 16, 64]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.7} wireframe />
      </mesh>
    </group>
  );
};

// ============================================================================
// Main ArtifactCanvas Viewport
// ============================================================================
export const ArtifactCanvas: React.FC<{
  type: ArtifactType;
  isFocused?: boolean;
}> = ({ type, isFocused = false }) => {
  const hasWebGL = useMemo(() => isWebGLAvailable(), []);

  if (!hasWebGL) {
    return (
      <div style={{ width: '100%', height: '100%', minHeight: '260px' }}>
        <WebGLFallback message={`Procedural ${type.toUpperCase()} artifact active.`} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {type === 'chronos' && <ChronosArtifact isFocused={isFocused} />}
        {type === 'orbital' && <OrbitalArtifact isFocused={isFocused} />}
        {type === 'prism' && <PrismArtifact isFocused={isFocused} />}
        {type === 'helix' && <HelixArtifact isFocused={isFocused} />}
        {type === 'monolith' && <MonolithArtifact isFocused={isFocused} />}
      </Canvas>
    </div>
  );
};
