import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { VisualMode } from '../../types';
import { seededRandom } from '../../utils/math';
import { isWebGLAvailable } from '../../utils/webgl';
import { createProceduralStudioEnvironment } from '../../utils/texture';
import { WebGLFallback } from '../WebGLFallback';

export interface NexusCoreProps {
  rotationSpeed?: number;
  particleIntensity?: number;
  visualMode?: VisualMode;
  accentColor?: string;
  isPlaying?: boolean;
  shellEnabled?: boolean;
  scrollProgress?: number;
  isMobile?: boolean;
  explodedProgress?: number; // 0 (assembled) to 1 (fully deconstructed exploded-view)
}

// 1. Dual-Tier Procedural Particle Field (Fine Dust + Stellar Embers)
const MechanicalParticleField: React.FC<{
  count: number;
  color: string;
  isPlaying: boolean;
  explodedProgress: number;
}> = ({ count, color, isPlaying, explodedProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const emberRef = useRef<THREE.Points>(null);

  // Fine atmospheric cloud
  const dustPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + seededRandom(i * 3 + 1) * 4.8;
      const theta = seededRandom(i * 3 + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 3) - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  // Larger orbiting stellar embers
  const emberCount = Math.min(Math.floor(count * 0.2), 160);
  const emberPositions = useMemo(() => {
    const pos = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      const radius = 3.2 + seededRandom(i * 4 + 7) * 4.0;
      const theta = seededRandom(i * 4 + 8) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 4 + 9) - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [emberCount]);

  useFrame((_, delta) => {
    if (!isPlaying) return;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.015;
    }
    if (emberRef.current) {
      emberRef.current.rotation.y -= delta * 0.07;
      emberRef.current.rotation.z += delta * 0.03;
    }
  });

  const expansion = 1.0 + explodedProgress * 0.45;

  return (
    <group scale={expansion}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          color={color}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points ref={emberRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[emberPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#70E1FF"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// 2. Instanced Satellite Fleet Module
const SatelliteFleet: React.FC<{
  isPlaying: boolean;
  accentColor: string;
  explodedProgress: number;
}> = ({ isPlaying, accentColor, explodedProgress }) => {
  const count = 18;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate stable orbital parameters for each satellite
  const orbits = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      radius: 2.7 + (i % 3) * 0.5 + seededRandom(i * 5 + 1) * 0.4,
      speed: (0.4 + (i % 4) * 0.15) * (i % 2 === 0 ? 1 : -1),
      inclination: (seededRandom(i * 5 + 2) - 0.5) * 1.2,
      phase: (i / count) * Math.PI * 2,
      scale: 0.06 + (i % 3) * 0.02,
    }));
  }, [count]);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (isPlaying) {
      timeRef.current += delta;
    }

    const t = timeRef.current;
    const expand = 1.0 + explodedProgress * 0.8;

    for (let i = 0; i < count; i++) {
      const orb = orbits[i];
      const angle = orb.phase + t * orb.speed;
      const r = orb.radius * expand;

      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = Math.sin(angle * 2 + orb.phase) * (0.4 * expand) + Math.sin(orb.inclination) * (r * 0.35);

      dummy.position.set(x, y, z);
      dummy.rotation.set(angle * 0.5, angle, t * 0.8);
      dummy.scale.setScalar(orb.scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Articulated satellite chassis */}
      <boxGeometry args={[1, 0.4, 2]} />
      <meshStandardMaterial
        color="#CBD5E1"
        metalness={0.92}
        roughness={0.15}
        emissive={accentColor}
        emissiveIntensity={0.4}
      />
    </instancedMesh>
  );
};

// 3. Heavy Mechanical Gimbal Rings with Radial Trusses
const MechanicalGimbalSystem: React.FC<{
  rotationSpeed: number;
  accentColor: string;
  isPlaying: boolean;
  visualMode: VisualMode;
  explodedProgress: number;
}> = ({ rotationSpeed, accentColor, isPlaying, visualMode, explodedProgress }) => {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!isPlaying) return;
    const s = rotationSpeed;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.35 * s;
      ring1Ref.current.rotation.y += delta * 0.25 * s;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.3 * s;
      ring2Ref.current.rotation.z += delta * 0.4 * s;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z -= delta * 0.2 * s;
      ring3Ref.current.rotation.x += delta * 0.15 * s;
    }
  });

  const isWire = visualMode === 'wireframe';
  const dilation1 = 1.0 + explodedProgress * 0.4;
  const dilation2 = 1.0 + explodedProgress * 0.75;
  const dilation3 = 1.0 + explodedProgress * 1.1;

  return (
    <>
      {/* Ring 1: Primary Titanium Gyro Ring with 4 Radial Struts */}
      <group ref={ring1Ref} scale={dilation1}>
        <mesh>
          <torusGeometry args={[1.85, 0.035, 16, 96]} />
          <meshStandardMaterial
            color="#94A3B8"
            metalness={0.94}
            roughness={0.14}
            wireframe={isWire}
          />
        </mesh>
        {/* 4 Radial Struts */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, idx) => (
          <mesh key={idx} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.015, 0.015, 3.65, 8]} />
            <meshStandardMaterial
              color="#64748B"
              metalness={0.9}
              roughness={0.2}
              wireframe={isWire}
            />
          </mesh>
        ))}
      </group>

      {/* Ring 2: Medium Slotted Azimuth Ring with Counter-Weight Nodes */}
      <group ref={ring2Ref} scale={dilation2} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.28, 0.024, 16, 96]} />
          <meshStandardMaterial
            color="#70E1FF"
            emissive="#70E1FF"
            emissiveIntensity={0.35}
            metalness={0.9}
            roughness={0.18}
            wireframe={isWire}
          />
        </mesh>
        {/* 6 Peripheral Counter-Weight Nodes */}
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const theta = (idx / 6) * Math.PI * 2;
          return (
            <mesh
              key={idx}
              position={[Math.cos(theta) * 2.28, Math.sin(theta) * 2.28, 0]}
            >
              <boxGeometry args={[0.08, 0.08, 0.12]} />
              <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.1} />
            </mesh>
          );
        })}
      </group>

      {/* Ring 3: Outer Fine Titanium Navigation Guide Track */}
      <group ref={ring3Ref} scale={dilation3} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[2.75, 0.016, 16, 120]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.55}
            metalness={0.85}
            roughness={0.2}
            wireframe={isWire}
          />
        </mesh>
        {/* Orbital Track Ring Disc */}
        <mesh>
          <ringGeometry args={[2.73, 2.77, 64]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
};

// 4. Central Mechanical Planetary Core with Exploded Hemispheres
const MechanicalPlanetCore: React.FC<{
  visualMode: VisualMode;
  accentColor: string;
  isPlaying: boolean;
  rotationSpeed: number;
  explodedProgress: number;
}> = ({ visualMode, accentColor, isPlaying, rotationSpeed, explodedProgress }) => {
  const planetGroupRef = useRef<THREE.Group>(null);
  const northHemiRef = useRef<THREE.Group>(null);
  const southHemiRef = useRef<THREE.Group>(null);
  const innerQuantumRef = useRef<THREE.Mesh>(null);
  const trenchGlowRef = useRef<THREE.Mesh>(null);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!isPlaying) return;
    timeRef.current += delta;
    const t = timeRef.current;

    if (planetGroupRef.current) {
      planetGroupRef.current.rotation.y += delta * 0.3 * rotationSpeed;
      planetGroupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
    }

    if (innerQuantumRef.current) {
      innerQuantumRef.current.rotation.x += delta * 0.8 * rotationSpeed;
      innerQuantumRef.current.rotation.y -= delta * 0.5 * rotationSpeed;
      const pulse = 1 + Math.sin(t * 3) * 0.06;
      innerQuantumRef.current.scale.set(pulse, pulse, pulse);
    }

    // Exploded separation along Y-axis
    const separation = explodedProgress * 0.65;
    if (northHemiRef.current) {
      northHemiRef.current.position.y = separation;
    }
    if (southHemiRef.current) {
      southHemiRef.current.position.y = -separation;
    }
  });

  const isWire = visualMode === 'wireframe';
  const isQuantum = visualMode === 'quantum';
  const isHolo = visualMode === 'hologram';

  return (
    <group ref={planetGroupRef}>
      {/* A. Inner Levitating Quantum Crystal Core */}
      <mesh ref={innerQuantumRef} scale={0.52}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive={accentColor}
          emissiveIntensity={isQuantum ? 1.6 : 0.9}
          metalness={0.9}
          roughness={0.1}
          wireframe={isWire || isQuantum}
        />
      </mesh>

      {/* Internal Core Light Flare */}
      <pointLight position={[0, 0, 0]} color={accentColor} intensity={2.5 + explodedProgress * 2.0} distance={5} />

      {/* B. Equatorial Power Trench / Magnetic Conduit */}
      <mesh ref={trenchGlowRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.02, 0.045, 16, 64]} />
        <meshStandardMaterial
          color="#70E1FF"
          emissive="#70E1FF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* C. Northern Mechanical Planetary Shell */}
      <group ref={northHemiRef}>
        <mesh>
          <sphereGeometry args={[1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          {isHolo ? (
            <meshPhysicalMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.65}
              wireframe={true}
              transparent
              opacity={0.8}
            />
          ) : isQuantum ? (
            <meshStandardMaterial
              color="#FFFFFF"
              emissive={accentColor}
              emissiveIntensity={1.0}
              transparent
              opacity={0.35}
              wireframe={true}
            />
          ) : (
            <meshPhysicalMaterial
              color="#111420"
              emissive={accentColor}
              emissiveIntensity={0.12}
              metalness={0.95}
              roughness={0.15}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              wireframe={isWire}
            />
          )}
        </mesh>

        {/* Polar Armature Cap Collar */}
        <mesh position={[0, 0.98, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.035, 16, 32]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Longitudinal Panel Seams */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <mesh key={i} rotation={[0, angle, 0]} position={[0, 0.5, 0]}>
            <boxGeometry args={[0.02, 0.8, 0.04]} />
            <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* D. Southern Mechanical Planetary Shell */}
      <group ref={southHemiRef}>
        <mesh>
          <sphereGeometry args={[1.0, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          {isHolo ? (
            <meshPhysicalMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.65}
              wireframe={true}
              transparent
              opacity={0.8}
            />
          ) : isQuantum ? (
            <meshStandardMaterial
              color="#FFFFFF"
              emissive={accentColor}
              emissiveIntensity={1.0}
              transparent
              opacity={0.35}
              wireframe={true}
            />
          ) : (
            <meshPhysicalMaterial
              color="#111420"
              emissive={accentColor}
              emissiveIntensity={0.12}
              metalness={0.95}
              roughness={0.15}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              wireframe={isWire}
            />
          )}
        </mesh>

        {/* South Polar Armature Cap Collar */}
        <mesh position={[0, -0.98, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.035, 16, 32]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* South Longitudinal Panel Seams */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <mesh key={i} rotation={[0, angle, 0]} position={[0, -0.5, 0]}>
            <boxGeometry args={[0.02, 0.8, 0.04]} />
            <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// 5. Coordinated Celestial Scene Assembler
const SceneContent: React.FC<NexusCoreProps> = ({
  rotationSpeed = 1,
  particleIntensity = 800,
  visualMode = 'solid',
  accentColor = '#8B5CF6',
  isPlaying = true,
  shellEnabled = true,
  scrollProgress = 0,
  isMobile = false,
  explodedProgress = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Procedural HDR studio environment for realistic PBR metallic reflections
  const envTexture = useMemo(() => createProceduralStudioEnvironment(), []);
  useEffect(() => {
    return () => {
      envTexture.dispose();
    };
  }, [envTexture]);

  // Pointer Parallax, Scroll Transition, & Shell rotation
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetX = mouse.x * 0.45;
    const targetY = mouse.y * 0.35 - scrollProgress * 0.5;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * (delta * 2.5);
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * (delta * 2.5);

    // Scroll-induced rotation drift
    groupRef.current.rotation.y = scrollProgress * Math.PI * 0.8;
    groupRef.current.rotation.x = mouse.y * 0.15 + scrollProgress * 0.2;

    if (shellRef.current && isPlaying) {
      shellRef.current.rotation.x += delta * 0.08 * rotationSpeed;
      shellRef.current.rotation.z += delta * 0.12 * rotationSpeed;
    }
  });

  const effectiveParticles = isMobile ? Math.min(particleIntensity, 350) : particleIntensity;
  const shellScale = 3.3 + explodedProgress * 0.8;

  return (
    <>
      {/* Declarative PBR Environment Attachment */}
      <primitive object={envTexture} attach="environment" />

      {/* Studio Lighting Matrix */}
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 7, 6]} intensity={2.2} color="#F5F5F7" />
      <pointLight position={[-7, 3, -3]} intensity={2.8} color="#8B5CF6" />
      <pointLight position={[5, -6, 5]} intensity={2.2} color="#70E1FF" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color={accentColor} distance={5} />

      <group ref={groupRef}>
        {/* Layer 1: Mechanical Planetary Core with Exploded Separation */}
        <MechanicalPlanetCore
          visualMode={visualMode}
          accentColor={accentColor}
          isPlaying={isPlaying}
          rotationSpeed={rotationSpeed}
          explodedProgress={explodedProgress}
        />

        {/* Layer 2: Heavy Gimbal Rings with Structural Struts */}
        <MechanicalGimbalSystem
          rotationSpeed={rotationSpeed}
          accentColor={accentColor}
          isPlaying={isPlaying}
          visualMode={visualMode}
          explodedProgress={explodedProgress}
        />

        {/* Layer 3: Instanced Satellite Fleet Probes */}
        <SatelliteFleet
          isPlaying={isPlaying}
          accentColor={accentColor}
          explodedProgress={explodedProgress}
        />

        {/* Layer 4: Dual-Tier Particle Field */}
        <MechanicalParticleField
          count={effectiveParticles}
          color={accentColor}
          isPlaying={isPlaying}
          explodedProgress={explodedProgress}
        />

        {/* Layer 5: Secondary Energy Wireframe Shell */}
        {shellEnabled && (
          <mesh ref={shellRef} scale={shellScale}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={accentColor}
              wireframe={true}
              transparent
              opacity={visualMode === 'hologram' ? 0.35 : 0.16}
              roughness={0.25}
              metalness={0.8}
            />
          </mesh>
        )}
      </group>
    </>
  );
};

export const NexusCoreScene: React.FC<NexusCoreProps> = (props) => {
  const hasWebGL = useMemo(() => isWebGLAvailable(), []);
  const prefersReduced = useMemo(() => {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  if (!hasWebGL) {
    return (
      <div style={{ width: '100%', height: '100%', minHeight: '350px' }}>
        <WebGLFallback message="Procedural celestial simulation active (Hardware WebGL is disabled or unavailable)." />
      </div>
    );
  }

  const effectiveSpeed = prefersReduced ? (props.rotationSpeed || 1) * 0.05 : props.rotationSpeed;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <SceneContent {...props} rotationSpeed={effectiveSpeed} />
      </Canvas>
    </div>
  );
};
