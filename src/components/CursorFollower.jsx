import { useEffect, useRef } from "react";

export default function ShinyCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        background: "linear-gradient(45deg, #3b82f6, #9333ea, #facc15)",
        backgroundSize: "200% 200%",
        animation: "flicker 1.5s infinite alternate",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 0.05s ease",
      }}
    />
  );
}
