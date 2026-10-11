import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { seededRandom } from '../../utils/math';
import { isWebGLAvailable } from '../../utils/webgl';
import { createProceduralStudioEnvironment } from '../../utils/texture';
import { WebGLFallback } from '../WebGLFallback';
import { soundFX } from '../../utils/audio';

// ============================================================================
// EXHIBIT 1: MATTER (Procedural Liquid-Chrome Sculptural Morph)
// ============================================================================
const LiquidChromeMatter: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [shapeIndex, setShapeIndex] = useState(0);
  const { mouse } = useThree();

  // Attach procedural HDR studio environment for liquid-chrome reflections
  const envTexture = useMemo(() => createProceduralStudioEnvironment(), []);
  useEffect(() => {
    return () => {
      envTexture.dispose();
    };
  }, [envTexture]);

  const handleSculptureClick = () => {
    soundFX.playClick(1150);
    setShapeIndex((prev) => (prev === 0 ? 1 : 0));
  };

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const speed = isHovered ? 1.6 : 0.8;

    // Pointer-driven tilt & smooth continuous rotation
    meshRef.current.rotation.x += delta * 0.45 * speed + mouse.y * 0.02;
    meshRef.current.rotation.y += delta * 0.65 * speed + mouse.x * 0.02;

    if (ringRef.current) {
      ringRef.current.rotation.x -= delta * 0.35 * speed;
      ringRef.current.rotation.z += delta * 0.55 * speed;
    }
  });

  return (
    <>
      <primitive object={envTexture} attach="environment" />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={2.6} color="#FFFFFF" />
      <pointLight position={[-5, -2, -3]} intensity={3.0} color="#8B5CF6" />
      <pointLight position={[4, -4, 3]} intensity={2.4} color="#70E1FF" />

      {/* Main Liquid-Chrome Sculpture with State Morph */}
      <mesh
        ref={meshRef}
        onClick={handleSculptureClick}
      >
        {shapeIndex === 0 ? (
          <torusKnotGeometry args={[0.92, 0.28, 200, 40, 2, 5]} />
        ) : (
          <torusKnotGeometry args={[0.88, 0.32, 200, 40, 3, 7]} />
        )}
        <meshPhysicalMaterial
          color={isHovered ? "#FFFFFF" : "#E2E8F0"}
          metalness={0.98}
          roughness={isHovered ? 0.03 : 0.08}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          reflectivity={1.0}
          emissive="#8B5CF6"
          emissiveIntensity={isHovered ? 0.35 : 0.12}
        />
      </mesh>

      {/* Concentric Halo Ribbon Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.75, 0.018, 16, 80]} />
        <meshStandardMaterial
          color="#70E1FF"
          emissive="#70E1FF"
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.1}
          wireframe={true}
        />
      </mesh>
    </>
  );
};

// ============================================================================
// EXHIBIT 2: ENERGY (Mechanical Gyroscope Quantum Engine)
// ============================================================================
const QuantumEngineEnergy: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Orbiting Energy Nodes
  const nodeCount = 12;
  const nodesMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Procedural attractor particle stream
  const count = 1200;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color('#8B5CF6');
    const c2 = new THREE.Color('#70E1FF');

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 4 + 1);
      const r2 = seededRandom(i * 4 + 2);
      const r3 = seededRandom(i * 4 + 3);
      const r4 = seededRandom(i * 4 + 4);

      const angle = i * 0.12;
      const radius = 0.4 + (i / count) * 1.7;
      const height = (r1 - 0.5) * 1.5;

      pos[i * 3] = Math.cos(angle) * radius + (r2 - 0.5) * 0.18;
      pos[i * 3 + 1] = height + Math.sin(angle * 2) * 0.22;
      pos[i * 3 + 2] = Math.sin(angle) * radius + (r3 - 0.5) * 0.18;

      const c = c1.clone().lerp(c2, r4);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    const speed = isHovered ? 1.8 : 0.9;
    timeRef.current += delta * speed;
    const t = timeRef.current;

    // Tri-axial counter-rotation
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.7 * speed;
    if (ring2Ref.current) ring2Ref.current.rotation.y -= delta * 0.6 * speed;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.5 * speed;

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 1.1 * speed;
      coreRef.current.rotation.y -= delta * 0.9 * speed;
      const pulse = 1 + Math.sin(t * 4) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.75 * speed;
    }

    // Update instanced orbiting nodes
    if (nodesMeshRef.current) {
      for (let i = 0; i < nodeCount; i++) {
        const theta = (i / nodeCount) * Math.PI * 2 + t * 0.8;
        const radius = 1.35;
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta * 2) * 0.35;
        const z = Math.sin(theta) * radius;

        dummy.position.set(x, y, z);
        dummy.scale.setScalar(0.06);
        dummy.updateMatrix();
        nodesMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      nodesMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#70E1FF" distance={4} />
      <pointLight position={[3, 4, 3]} intensity={1.8} color="#8B5CF6" />

      {/* Central Quantum Octahedron */}
      <mesh ref={coreRef} scale={0.42}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#70E1FF"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Ring 1: Inner Gyro Ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[0.9, 0.03, 16, 64]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* Ring 2: Medium Gyro Ring */}
      <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.22, 0.024, 16, 64]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.4} metalness={0.88} />
        </mesh>
      </group>

      {/* Ring 3: Outer Gyro Ring */}
      <group ref={ring3Ref} rotation={[0, Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[1.56, 0.02, 16, 64]} />
          <meshStandardMaterial color="#70E1FF" emissive="#70E1FF" emissiveIntensity={0.5} metalness={0.9} />
        </mesh>
      </group>

      {/* Orbiting Energy Nodes */}
      <instancedMesh ref={nodesMeshRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#70E1FF" />
      </instancedMesh>

      {/* Procedural Attractor Particle Stream */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isHovered ? 0.045 : 0.032}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};

// ============================================================================
// EXHIBIT 3: SPACE (Infinite Architectural World)
// ============================================================================
const InfiniteArchitecturalSpace: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const portalCount = 14;
  const portalsMeshRef = useRef<THREE.InstancedMesh>(null);
  const fragmentsMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { mouse } = useThree();

  const timeRef = useRef(0);

  // Fragment count
  const fragCount = 20;
  const fragData = useMemo(() => {
    return Array.from({ length: fragCount }, (_, i) => ({
      x: (seededRandom(i * 3 + 1) - 0.5) * 3.2,
      y: (seededRandom(i * 3 + 2) - 0.5) * 2.8,
      z: -i * 0.8 + 2.0,
      scale: 0.08 + seededRandom(i * 3 + 3) * 0.12,
      speed: 0.3 + seededRandom(i * 3 + 4) * 0.5,
    }));
  }, [fragCount]);

  useFrame((state, delta) => {
    const speed = isHovered ? 1.5 : 0.8;
    timeRef.current += delta * speed;
    const t = timeRef.current;

    // Interactive camera corridor movement along Z axis
    const targetZ = 4.2 - (isHovered ? 1.4 : 0) + mouse.y * 0.6;
    const targetX = mouse.x * 0.8;
    state.camera.position.z += (targetZ - state.camera.position.z) * (delta * 2.0);
    state.camera.position.x += (targetX - state.camera.position.x) * (delta * 2.0);

    // Instanced portal arches receding into vanishing point
    if (portalsMeshRef.current) {
      for (let i = 0; i < portalCount; i++) {
        const z = -i * 0.9 + 2.0;
        const scale = 1.0 + i * 0.08;
        dummy.position.set(0, 0, z);
        dummy.rotation.set(0, 0, Math.sin(t * 0.3 + i * 0.2) * 0.05);
        dummy.scale.set(scale, scale, 1);
        dummy.updateMatrix();
        portalsMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      portalsMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // Instanced floating monolith fragments
    if (fragmentsMeshRef.current) {
      for (let i = 0; i < fragCount; i++) {
        const frag = fragData[i];
        const y = frag.y + Math.sin(t * frag.speed + i) * 0.2;
        dummy.position.set(frag.x, y, frag.z);
        dummy.rotation.set(t * 0.4 + i, t * 0.3, 0);
        dummy.scale.setScalar(frag.scale);
        dummy.updateMatrix();
        fragmentsMeshRef.current.setMatrixAt(i, dummy.matrix);
      }
      fragmentsMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <fogExp2 attach="fog" args={['#08090D', 0.16]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 3]} intensity={2.2} color="#70E1FF" />
      <pointLight position={[0, 0, -8]} intensity={3.5} color="#8B5CF6" />

      {/* Instanced Repeating Geometric Portal Arches */}
      <instancedMesh ref={portalsMeshRef} args={[undefined, undefined, portalCount]}>
        <boxGeometry args={[2.2, 2.2, 0.08]} />
        <meshStandardMaterial
          color="#70E1FF"
          wireframe={true}
          emissive="#70E1FF"
          emissiveIntensity={isHovered ? 0.75 : 0.35}
        />
      </instancedMesh>

      {/* Luminous Floor Runway Guidelines */}
      <mesh position={[0, -1.1, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 16]} />
        <meshStandardMaterial
          color="#111422"
          emissive="#8B5CF6"
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Floating Monolith Shards */}
      <instancedMesh ref={fragmentsMeshRef} args={[undefined, undefined, fragCount]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#8B5CF6"
          emissiveIntensity={0.5}
          metalness={0.92}
          roughness={0.12}
        />
      </instancedMesh>
    </>
  );
};

// ============================================================================
// Main ExhibitCanvas Viewport
// ============================================================================
export const ExhibitCanvas: React.FC<{
  type: 'matter' | 'energy' | 'space';
  isHovered: boolean;
}> = ({ type, isHovered }) => {
  const hasWebGL = useMemo(() => isWebGLAvailable(), []);

  if (!hasWebGL) {
    return (
      <div style={{ width: '100%', height: '100%', minHeight: '260px' }}>
        <WebGLFallback message={`Procedural ${type.toUpperCase()} exhibit active.`} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {type === 'matter' && <LiquidChromeMatter isHovered={isHovered} />}
        {type === 'energy' && <QuantumEngineEnergy isHovered={isHovered} />}
        {type === 'space' && <InfiniteArchitecturalSpace isHovered={isHovered} />}
      </Canvas>
    </div>
  );
};
