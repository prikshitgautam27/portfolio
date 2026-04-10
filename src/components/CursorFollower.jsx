import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const dotRef   = useRef(null);   // small sharp dot
  const ringRef  = useRef(null);   // larger lagging ring
  const pos      = useRef({ x: window.innerWidth/2, y: window.innerHeight/2 });
  const ring     = useRef({ x: window.innerWidth/2, y: window.innerHeight/2 });
  const raf      = useRef(null);
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Hide on mobile / touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setHidden(true);
      return;
    }

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    // Detect hovering over interactive elements
    const onOver = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, textarea, select, label');
      setHovered(!!el);
    };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover",  onOver);

    // Animation loop — dot snaps, ring lags
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      // Ring follows with easing (lerp)
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover",  onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* ── Outer lagging ring ── */}
      <div
        ref={ringRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         hovered ? '48px' : '36px',
          height:        hovered ? '48px' : '36px',
          borderRadius:  '50%',
          border:        `1.5px solid ${hovered ? 'rgba(99,102,241,0.7)' : 'rgba(59,130,246,0.5)'}`,
          backgroundColor: hovered ? 'rgba(99,102,241,0.08)' : 'transparent',
          pointerEvents: 'none',
          zIndex:        99998,
          willChange:    'transform',
          transition:    'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
          mixBlendMode:  'normal',
        }}
      />

      {/* ── Inner sharp dot with glow ── */}
      <div
        ref={dotRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         clicked ? '6px' : hovered ? '0px' : '8px',
          height:        clicked ? '6px' : hovered ? '0px' : '8px',
          borderRadius:  '50%',
          backgroundColor: hovered ? 'transparent' : '#3b82f6',
          boxShadow:     hovered ? 'none' : clicked
            ? '0 0 8px 3px rgba(59,130,246,0.9), 0 0 20px 6px rgba(59,130,246,0.4)'
            : '0 0 6px 2px rgba(59,130,246,0.7), 0 0 14px 4px rgba(59,130,246,0.3)',
          pointerEvents: 'none',
          zIndex:        99999,
          willChange:    'transform',
          transition:    'width 0.15s ease, height 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
        }}
      />
    </>
  );
}
