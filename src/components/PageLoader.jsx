import { useEffect, useRef } from "react";

/*
  APPROACH: Pure CSS + vanilla JS animation.
  NO framer-motion, NO AnimatePresence, NO React state phases.
  This eliminates ALL conflicts with Hero's framer-motion animations.
  
  The loader is a simple div that:
  1. Shows immediately (no React render delay)
  2. Runs its animation via CSS keyframes
  3. After animation ends, calls onComplete and removes itself from DOM
*/

export default function PageLoader({ onComplete }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Inject keyframe styles once
    const styleId = "pg-loader-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes pgInitialsIn {
          0%   { opacity:0; transform: scale(0.6); filter: blur(12px); }
          100% { opacity:1; transform: scale(1);   filter: blur(0px);  }
        }
        @keyframes pgInitialsOut {
          0%   { opacity:1; transform: scale(1);   filter: blur(0px);  }
          100% { opacity:0; transform: scale(1.4); filter: blur(8px);  }
        }
        @keyframes pgLetterIn {
          0%   { opacity:0; transform: translateY(20px); filter: blur(8px);  }
          100% { opacity:1; transform: translateY(0px);  filter: blur(0px);  }
        }
        @keyframes pgTaglineIn {
          0%   { opacity:0; transform: translateY(10px); }
          100% { opacity:1; transform: translateY(0px);  }
        }
        @keyframes pgBarFill {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes pgLoaderExit {
          0%   { opacity:1; }
          100% { opacity:0; }
        }
        @keyframes pgFloat {
          0%,100% { transform: translateY(0px);  opacity:0.25; }
          50%      { transform: translateY(-20px); opacity:0.5;  }
        }
        .pg-letter {
          display: inline-block;
          opacity: 0;
          background: linear-gradient(135deg, #e2e8f0 0%, #93c5fd 55%, #c4b5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 46px;
          font-weight: 700;
          font-family: 'Segoe UI', sans-serif;
          line-height: 1.1;
        }
        .pg-space {
          display: inline-block;
          width: 14px;
        }
      `;
      document.head.appendChild(style);
    }

    const TOTAL_MS = 2800; // total loader duration before onComplete fires

    // ── Phase timings ──
    const T_INITIALS_IN  = 0;
    const T_INITIALS_OUT = 650;
    const T_LETTERS_START= 750;
    const T_TAGLINE      = 1350;
    const T_BAR          = 1400;
    const T_EXIT_START   = 2100;
    const T_DONE         = TOTAL_MS;

    const timers = [];
    const schedule = (fn, delay) => timers.push(setTimeout(fn, delay));

    // ── Phase 0: initials in ──
    const initials = el.querySelector(".pg-initials");
    initials.style.animation = `pgInitialsIn 0.5s ease-out ${T_INITIALS_IN}ms both`;

    // ── Phase 1: initials out ──
    schedule(() => {
      initials.style.animation = `pgInitialsOut 0.35s ease-in forwards`;
    }, T_INITIALS_OUT);

    // ── Phase 2: letters stagger in ──
    const letters = el.querySelectorAll(".pg-letter");
    letters.forEach((letter, i) => {
      const delay = T_LETTERS_START + i * 45;
      letter.style.animation = `pgLetterIn 0.45s cubic-bezier(0.22,1,0.36,1) ${delay}ms forwards`;
    });

    // ── Phase 3: tagline ──
    schedule(() => {
      const tagline = el.querySelector(".pg-tagline");
      tagline.style.animation = `pgTaglineIn 0.5s ease-out forwards`;
    }, T_TAGLINE);

    // ── Phase 4: progress bar ──
    schedule(() => {
      const bar = el.querySelector(".pg-bar-fill");
      bar.style.animation = `pgBarFill 0.65s ease-in-out forwards`;
    }, T_BAR);

    // ── Phase 5: exit — fade entire loader ──
    schedule(() => {
      el.style.animation = `pgLoaderExit 0.6s ease-in-out forwards`;
    }, T_EXIT_START);

    // ── Phase 6: done — hide loader, call onComplete ──
    schedule(() => {
      el.style.display = "none";
      onComplete();
    }, T_DONE);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Build name chars
  const name  = "Prikshit Gautam";
  const chars = name.split("").map((c, i) =>
    c === " "
      ? <span key={i} className="pg-space">&nbsp;</span>
      : <span key={i} className="pg-letter">{c}</span>
  );

  return (
    <div
      ref={ref}
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         99999,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        background:     "#0a0e27",
        overflow:       "hidden",
      }}
    >
      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          style={{
            position:        "absolute",
            width:           `${(i % 3) + 1.5}px`,
            height:          `${(i % 3) + 1.5}px`,
            borderRadius:    "50%",
            backgroundColor: ["#3b82f6","#8b5cf6","#60a5fa"][i % 3],
            left:            `${(i * 37 + 11) % 97}%`,
            top:             `${(i * 53 + 7)  % 93}%`,
            animation:       `pgFloat ${2.5 + (i % 3) * 0.7}s ease-in-out ${(i * 0.3) % 2}s infinite`,
          }}
        />
      ))}

      {/* Glow rings */}
      <div style={{
        position:"absolute", width:"300px", height:"300px",
        borderRadius:"50%", border:"1px solid rgba(59,130,246,0.12)",
        boxShadow:"0 0 60px 10px rgba(59,130,246,0.05)", pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", width:"200px", height:"200px",
        borderRadius:"50%", border:"1px solid rgba(139,92,246,0.1)",
        pointerEvents:"none",
      }}/>

      {/* Corner brackets */}
      {[
        { top:"10%",    left:"8%",   rotate:0   },
        { top:"10%",    right:"8%",  rotate:90  },
        { bottom:"10%", left:"8%",   rotate:270 },
        { bottom:"10%", right:"8%",  rotate:180 },
      ].map((s, i) => (
        <div key={i} style={{
          position:"absolute", width:"26px", height:"26px",
          borderTop:"1.5px solid rgba(59,130,246,0.4)",
          borderLeft:"1.5px solid rgba(59,130,246,0.4)",
          transform:`rotate(${s.rotate}deg)`,
          ...s,
        }}/>
      ))}

      {/* ── Content ── */}
      <div style={{ position:"relative", textAlign:"center", zIndex:2 }}>

        {/* PG initials */}
        <div
          className="pg-initials"
          style={{
            fontSize:   "80px",
            fontWeight: 800,
            background: "linear-gradient(135deg,#60a5fa,#8b5cf6)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            lineHeight: 1,
            fontFamily: "'Segoe UI',sans-serif",
            userSelect: "none",
            position:   "absolute",
            top:        "50%",
            left:       "50%",
            transform:  "translate(-50%,-50%)",
            whiteSpace: "nowrap",
          }}
        >
          PG
        </div>

        {/* Full name letters */}
        <div style={{
          display:        "flex",
          justifyContent: "center",
          flexWrap:       "nowrap",
          userSelect:     "none",
          minHeight:      "56px",
          alignItems:     "center",
        }}>
          {chars}
        </div>

        {/* Tagline + bar */}
        <div style={{ marginTop:"16px" }}>
          <p
            className="pg-tagline"
            style={{
              fontSize:      "12px",
              fontWeight:    600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "rgba(148,163,184,0.85)",
              fontFamily:    "'Segoe UI',sans-serif",
              marginBottom:  "18px",
              opacity:       0,
            }}
          >
            Full Stack AI Developer
          </p>

          <div style={{
            width:"160px", height:"2px",
            background:"rgba(255,255,255,0.07)",
            borderRadius:"2px", overflow:"hidden",
            margin:"0 auto",
          }}>
            <div
              className="pg-bar-fill"
              style={{
                height:"100%",
                background:"linear-gradient(90deg,#3b82f6,#8b5cf6)",
                borderRadius:"2px",
                width:"0%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
