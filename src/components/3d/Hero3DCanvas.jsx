import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Center,
  Text3D,
  Float,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';

// 3D NITIN headline
function Nitin3DText() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.05;
  });

  return (
    <group ref={meshRef}>
      <Center position={[0, 0.4, 0]}>
        <Text3D
          font="/fonts/helvetiker_bold.json"
          size={1.3}
          height={0.3}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelSegments={4}
        >
          NITIN
          <meshStandardMaterial
            color="#EAEFF8"
            metalness={0.8}
            roughness={0.2}
            emissive="#1A0204"
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>
    </group>
  );
}

// Fallback while the 3D font loads
function Nitin3DFallback() {
  return (
    <group position={[0, 0.4, 0]}>
      <mesh>
        <boxGeometry args={[4, 1.2, 0.3]} />
        <meshStandardMaterial
          color="#EAEFF8"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// Rotating triangular prism
function TriangularPrism({
  position,
  scale = 1,
  rotationSpeed = 0.5,
}) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.x += delta * rotationSpeed * 0.7;
    ref.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <cylinderGeometry args={[0.7, 0.7, 1.4, 3]} />
      <meshStandardMaterial
        color="#D1D5DB"
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

// Rotating red torus
function TorusElement({ position, scale = 1 }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.z += delta * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[0.7, 0.16, 24, 64]} />
      <meshStandardMaterial
        color="#E50914"
        metalness={0.6}
        roughness={0.3}
        emissive="#7A060B"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

// 3D code brackets
function CodeBrackets3D({
  position,
  scale = 0.8,
}) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    groupRef.current.position.y =
      position[1] + Math.sin(t * 1.2) * 0.15;

    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.25;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Left bracket */}
      <group position={[-0.9, 0, 0]}>
        <mesh
          position={[0, 0.35, 0]}
          rotation={[0, 0, -Math.PI / 4]}
        >
          <boxGeometry args={[0.1, 0.65, 0.1]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.7}
            roughness={0.3}
            emissive="#E50914"
            emissiveIntensity={0.3}
          />
        </mesh>

        <mesh
          position={[0, -0.35, 0]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <boxGeometry args={[0.1, 0.65, 0.1]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.7}
            roughness={0.3}
            emissive="#E50914"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Slash */}
      <mesh
        position={[0, 0, 0]}
        rotation={[0, 0, -Math.PI / 6]}
      >
        <boxGeometry args={[0.08, 1.1, 0.08]} />
        <meshStandardMaterial
          color="#E50914"
          metalness={0.5}
          roughness={0.2}
          emissive="#E50914"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Right bracket */}
      <group position={[0.9, 0, 0]}>
        <mesh
          position={[0, 0.35, 0]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <boxGeometry args={[0.1, 0.65, 0.1]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.7}
            roughness={0.3}
            emissive="#E50914"
            emissiveIntensity={0.3}
          />
        </mesh>

        <mesh
          position={[0, -0.35, 0]}
          rotation={[0, 0, -Math.PI / 4]}
        >
          <boxGeometry args={[0.1, 0.65, 0.1]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.7}
            roughness={0.3}
            emissive="#E50914"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

// Reflective floor grid
function ReflectiveGround() {
  return (
    <group
      position={[0, -2.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <gridHelper
        args={[30, 30, '#E50914', '#151928']}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[35, 35]} />
        <meshStandardMaterial
          color="#05060A"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

// Main 3D scene
function SceneContainer({ mousePos }) {
  const sceneRef = useRef();

  useFrame((state, delta) => {
    if (!sceneRef.current) return;

    const isMobile = state.size.width < 768;
    const t = state.clock.getElapsedTime();

    // On phones, animate the scene without requiring a mouse.
    // On desktops, retain the existing mouse parallax.
    const targetX = isMobile
      ? Math.sin(t * 0.25) * 0.08
      : (mousePos?.current?.x || 0) * 0.45;

    const targetY = isMobile
      ? Math.sin(t * 0.35) * 0.12
      : -(mousePos?.current?.y || 0) * 0.3;

    const smooth = 1 - Math.exp(-3 * delta);

    sceneRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneRef.current.rotation.y,
      targetX,
      smooth
    );

    sceneRef.current.rotation.x = THREE.MathUtils.lerp(
      sceneRef.current.rotation.x,
      targetY,
      smooth
    );

    // Slightly reduce the overall scene on narrow screens.
    const targetScale = isMobile ? 0.78 : 1;

    sceneRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      smooth
    );
  });

  return (
    <group ref={sceneRef}>
      <Suspense fallback={<Nitin3DFallback />}>
        <Nitin3DText />
      </Suspense>

      <Float
        speed={1.8}
        rotationIntensity={0.4}
        floatIntensity={0.6}
      >
        <TriangularPrism
          position={[-3.6, 1.2, -1.2]}
          scale={0.75}
          rotationSpeed={0.6}
        />
      </Float>

      <Float
        speed={2.2}
        rotationIntensity={0.5}
        floatIntensity={0.8}
      >
        <TorusElement
          position={[3.8, -0.2, -0.8]}
          scale={0.85}
        />
      </Float>

      <Float
        speed={1.5}
        rotationIntensity={0.3}
        floatIntensity={0.5}
      >
        <CodeBrackets3D
          position={[-3.2, -1.2, 0.5]}
          scale={0.65}
        />
      </Float>

      <Float
        speed={2.0}
        rotationIntensity={0.4}
        floatIntensity={0.7}
      >
        <mesh position={[3.3, 1.6, -1.5]} scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#9D00FF"
            metalness={0.8}
            roughness={0.2}
            emissive="#5500A0"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      <Sparkles
        count={70}
        scale={[12, 8, 8]}
        size={2.4}
        speed={0.4}
        opacity={0.7}
        color="#E50914"
      />

      <Sparkles
        count={50}
        scale={[14, 8, 10]}
        size={1.6}
        speed={0.2}
        opacity={0.5}
        color="#FFFFFF"
      />

      <ReflectiveGround />
    </group>
  );
}

// Exported canvas component
export default function Hero3DCanvas({ mousePos }) {
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 8 : 7.2],
          fov: isMobile ? 50 : 42,
        }}
        dpr={
          isMobile
            ? 1
            : [1, Math.min(window.devicePixelRatio || 1, 1.5)]
        }
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        fallback={<div />}
      >
        {/* Cinematic lighting */}
        <ambientLight intensity={0.6} color="#0D1120" />

        <directionalLight
          position={[5, 6, 6]}
          intensity={1.3}
          color="#FFFFFF"
        />

        <spotLight
          position={[-5, 5, -2]}
          angle={0.7}
          penumbra={0.8}
          intensity={6}
          color="#E50914"
        />

        <pointLight
          position={[0, 0, -1.5]}
          intensity={4.5}
          distance={10}
          color="#E50914"
        />

        <pointLight
          position={[6, -2, 2]}
          intensity={1.5}
          distance={12}
          color="#1E50FF"
        />

        <SceneContainer mousePos={mousePos} />
      </Canvas>
    </div>
  );
}