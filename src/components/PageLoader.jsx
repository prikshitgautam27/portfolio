import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0 → initials appear
  // phase 1 → full name expands
  // phase 2 → tagline fades in
  // phase 3 → exit wipe

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);   // initials → name
    const t2 = setTimeout(() => setPhase(2), 1200);  // tagline in
    const t3 = setTimeout(() => setPhase(3), 2000);  // start exit
    const t4 = setTimeout(() => onComplete(), 2700); // unmount
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [onComplete]);

  const letters = "Prikshit Gautam".split("");

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         99999,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            background:     'linear-gradient(135deg, #0a0e27 0%, #0f1535 50%, #0a0e27 100%)',
            overflow:       'hidden',
          }}
        >
          {/* Animated background particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position:        'absolute',
                width:           `${Math.random()*3+1}px`,
                height:          `${Math.random()*3+1}px`,
                borderRadius:    '50%',
                backgroundColor: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#60a5fa',
                left:            `${Math.random()*100}%`,
                top:             `${Math.random()*100}%`,
                opacity:         0.4,
              }}
              animate={{
                y:       [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2 + Math.random()*2,
                repeat:   Infinity,
                delay:    Math.random()*2,
                ease:     'easeInOut',
              }}
            />
          ))}

          {/* Glowing ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase >= 1 ? 1 : 0.3, opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position:     'absolute',
              width:        '280px',
              height:       '280px',
              borderRadius: '50%',
              border:       '1px solid rgba(59,130,246,0.2)',
              boxShadow:    '0 0 60px 20px rgba(59,130,246,0.08)',
            }}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase >= 1 ? 1 : 0.3, opacity: phase >= 1 ? 0.5 : 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{
              position:     'absolute',
              width:        '200px',
              height:       '200px',
              borderRadius: '50%',
              border:       '1px solid rgba(139,92,246,0.2)',
            }}
          />

          {/* Initials → Name */}
          <div style={{ position: 'relative', textAlign: 'center' }}>

            {/* Phase 0: PG initials */}
            <AnimatePresence>
              {phase === 0 && (
                <motion.div
                  key="initials"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.4 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    fontSize:       '72px',
                    fontWeight:     800,
                    letterSpacing:  '0.1em',
                    background:     'linear-gradient(135deg, #60a5fa, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight:     1,
                    fontFamily:     "'Segoe UI', sans-serif",
                  }}
                >
                  PG
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 1+: Full name letter by letter */}
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0px' }}
              >
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay:    i * 0.04,
                      duration: 0.4,
                      ease:     "easeOut",
                    }}
                    style={{
                      fontSize:   char === ' ' ? undefined : '42px',
                      width:      char === ' ' ? '12px' : undefined,
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #e2e8f0 0%, #93c5fd 50%, #c4b5fd 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: "'Segoe UI', sans-serif",
                      lineHeight: 1.1,
                      display:    'inline-block',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Phase 2: Tagline */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ marginTop: '16px' }}
                >
                  <p style={{
                    fontSize:      '13px',
                    fontWeight:    500,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color:         'rgba(148,163,184,0.8)',
                    fontFamily:    "'Segoe UI', sans-serif",
                  }}>
                    Full Stack AI Developer
                  </p>

                  {/* Loading bar */}
                  <div style={{
                    marginTop:    '24px',
                    width:        '180px',
                    height:       '2px',
                    background:   'rgba(255,255,255,0.08)',
                    borderRadius: '2px',
                    overflow:     'hidden',
                    margin:       '24px auto 0',
                  }}>
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      style={{
                        height:     '100%',
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        borderRadius: '2px',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Corner decoration lines */}
          {[
            { top:  '10%', left:  '8%', rotate: 0   },
            { top:  '10%', right: '8%', rotate: 90  },
            { bottom: '10%', left: '8%', rotate: 270 },
            { bottom: '10%', right: '8%', rotate: 180 },
          ].map((style, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 0.3 + i*0.1, duration: 0.4 }}
              style={{
                position: 'absolute',
                width:    '30px',
                height:   '30px',
                borderTop:  '1.5px solid #3b82f6',
                borderLeft: '1.5px solid #3b82f6',
                transform: `rotate(${style.rotate}deg)`,
                ...style,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
