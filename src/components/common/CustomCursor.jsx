import React, { useEffect, useState } from 'react';

export default function CustomCursor({ reducedEffects }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reducedEffects) return;

    // Check if device supports fine hover (desktop/mouse)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, [role="button"], .interactive-hover');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, reducedEffects]);

  if (reducedEffects || !isVisible) return null;

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Small Netflix red center dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E50914] shadow-[0_0_12px_#E50914] transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '10px' : '6px',
          height: isHovered ? '10px' : '6px',
        }}
      />
      {/* Outer subtle ring that expands on hover */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E50914]/60 transition-all duration-200 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '42px' : '22px',
          height: isHovered ? '42px' : '22px',
          backgroundColor: isHovered ? 'rgba(229, 9, 20, 0.12)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(229, 9, 20, 0.4)' : 'none',
        }}
      />
    </div>
  );
}
