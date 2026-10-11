import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '../../data/projects';

// Single 3D Card Plane on the cylindrical arc
function CarouselCard3D({
  item,
  index,
  total,
  currentIndex,
  onSelect,
  onOpenModal,
}) {
  const groupRef = useRef();

  // Angle calculations for the 3D curved arc
  // We place cards along an arc with the current card at angle 0
  const angleStep = (Math.PI * 2) / Math.max(total, 6);
  const diff = (index - currentIndex + total) % total;
  // Shortest angular distance signed
  const signedDiff = diff > total / 2 ? diff - total : diff;

  const radius = 5.2;
  const angle = signedDiff * 0.45; // Spread out nicely
  const targetX = Math.sin(angle) * radius;
  const targetZ = -Math.cos(angle) * radius + radius - (Math.abs(signedDiff) * 0.8);
  const targetRotY = -angle;

  const isFront = signedDiff === 0;
  const targetScale = isFront ? 1.08 : Math.max(0.72, 1 - Math.abs(signedDiff) * 0.18);
  const opacity = Math.max(0.2, 1 - Math.abs(signedDiff) * 0.35);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Smooth interpolation to target position and rotation
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, delta * 6);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 6);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 6);
    
    // Scale interpolation
    const curScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(curScale, targetScale, delta * 6);
    groupRef.current.scale.set(newScale, newScale, newScale);
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (isFront) {
      onOpenModal(item);
    } else {
      onSelect(index);
    }
  };

  return (
    <group
      ref={groupRef}
      position={[targetX, 0, targetZ]}
      rotation={[0, targetRotY, 0]}
      onClick={handleClick}
    >
      {/* Giant 3D Outlined Numeral positioned behind the card */}
      <group position={[-1.3, -0.2, -0.6]}>
        <Text
          fontSize={3.2}
          color={isFront ? "#E50914" : "#FFFFFF"}
          fillOpacity={isFront ? 0.95 : 0.4}
          outlineWidth={0.08}
          outlineColor={isFront ? "#E50914" : "#4B5563"}
          outlineOpacity={1}
          anchorX="center"
          anchorY="middle"
        >
          {item.rank}
        </Text>
      </group>

      {/* 3D Poster Rounded Box */}
      <RoundedBox args={[2.2, 3.2, 0.12]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color={item.accentColor}
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={opacity}
          emissive={isFront ? item.accentColor : "#000000"}
          emissiveIntensity={isFront ? 0.25 : 0.05}
        />
      </RoundedBox>

      {/* Front Face Overlay Plate */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[2.1, 3.1]} />
        <meshStandardMaterial
          color="#0B0D14"
          metalness={0.7}
          roughness={0.4}
          transparent
          opacity={Math.min(0.9, opacity)}
        />
      </mesh>

      {/* 3D Text Typography on the Card */}
      <group position={[0, 0, 0.09]}>
        {/* Top Category Kicker */}
        <Text
          position={[0, 1.25, 0]}
          fontSize={0.11}
          color="#E50914"
          letterSpacing={0.1}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.9}
        >
          {item.kicker.toUpperCase()}
        </Text>

        {/* Project Title */}
        <Text
          position={[0, 0.85, 0]}
          fontSize={0.32}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.9}
        >
          {item.title}
        </Text>

        {/* Short Description */}
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.12}
          color="#A1A1AA"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
          lineHeight={1.3}
        >
          {item.shortDescription}
        </Text>

        {/* Tags row */}
        <Text
          position={[0, -0.75, 0]}
          fontSize={0.11}
          color="#E5E7EB"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.9}
        >
          {item.tags.slice(0, 3).join(" • ")}
        </Text>

        {/* Click Prompt */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.12}
          color={isFront ? "#E50914" : "#6B7280"}
          anchorX="center"
          anchorY="middle"
        >
          {isFront ? "▶ CLICK TO VIEW SYNOPSIS" : "CLICK TO FOCUS"}
        </Text>
      </group>
    </group>
  );
}

// 3D Scene Manager
function CarouselScene({ currentIndex, setCurrentIndex, onOpenModal }) {
  const sceneRef = useRef();

  return (
    <group ref={sceneRef} position={[0, -0.2, 0]}>
      {/* Ambient and Accent Lights for the Carousel */}
      <ambientLight intensity={0.7} color="#111827" />
      <directionalLight position={[0, 6, 8]} intensity={1.5} color="#FFFFFF" />
      <pointLight position={[0, 0, 3]} intensity={3} color="#E50914" distance={8} />

      {projects.map((item, idx) => (
        <CarouselCard3D
          key={item.id}
          item={item}
          index={idx}
          total={projects.length}
          currentIndex={currentIndex}
          onSelect={(i) => setCurrentIndex(i)}
          onOpenModal={onOpenModal}
        />
      ))}
    </group>
  );
}

export default function TopPicksCarousel3D({
  currentIndex,
  setCurrentIndex,
  onOpenModal,
}) {
  return (
    <div className="w-full h-[460px] sm:h-[520px] relative select-none">
      <Canvas
        camera={{ position: [0, 0.4, 6.2], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true }}
      >
        <CarouselScene
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onOpenModal={onOpenModal}
        />
      </Canvas>
    </div>
  );
}
