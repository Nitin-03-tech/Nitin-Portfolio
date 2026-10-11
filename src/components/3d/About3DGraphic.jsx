import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';

function RotatingSculpture() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.rotation.y += delta * 0.45;
  });

  return (
    <group ref={meshRef}>
      {/* Outer 3D Wireframe Icosahedron */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#E50914"
          wireframe
          transparent
          opacity={0.4}
          emissive="#E50914"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Inner Core Solid Torus Knot */}
      <TorusKnot args={[0.7, 0.22, 100, 16]}>
        <meshStandardMaterial
          color="#1E2337"
          metalness={0.9}
          roughness={0.15}
          emissive="#7A060B"
          emissiveIntensity={0.3}
        />
      </TorusKnot>

      {/* Center glowing core sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#E50914" />
      </mesh>
    </group>
  );
}

export default function About3DGraphic({ reducedEffects }) {
  if (reducedEffects) {
    return (
      <div className="w-full h-full min-h-[320px] flex items-center justify-center bg-black/40 rounded-2xl border border-white/10">
        <div className="font-bebas text-8xl text-[#E50914] shadow-[0_0_30px_#E50914]">N</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[320px] sm:min-h-[400px] relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#111422] to-[#07080F] border border-white/10 shadow-2xl">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} color="#111827" />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#FFFFFF" />
        <spotLight position={[-4, 4, -2]} intensity={5} color="#E50914" angle={0.6} />
        <pointLight position={[0, 0, 2]} intensity={2.5} color="#E50914" distance={6} />
        <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
          <RotatingSculpture />
        </Float>
      </Canvas>

      {/* Decorative Overlays */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-[#8A91A5] uppercase tracking-widest bg-black/50 px-2.5 py-1 rounded border border-white/5">
        3D CORE GEOMETRY · NO PORTRAIT
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#E50914] tracking-widest uppercase">
        REAL-TIME R3F
      </div>
    </div>
  );
}
