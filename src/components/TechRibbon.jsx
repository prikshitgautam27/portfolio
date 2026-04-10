
const TECH_STACK = [
  // AI / ML
  { name: "Python",         },
  { name: "PyTorch",       },
  { name: "TensorFlow",    },
  { name: "scikit-learn",   },
  { name: "YOLOv8",         },
  { name: "LangChain",       },
  { name: "Hugging Face",   },
  { name: "FAISS",          },
  { name: "OpenCV",          },
  // Full Stack
  { name: "React",          },
  { name: "Node.js",        },
  { name: "Express",         },
  { name: "MongoDB",         },
  { name: "MySQL",         },
  { name: "Tailwind CSS",   },
  // Cloud / Tools
  { name: "AWS Lambda"   },
  { name: "AWS S3"  },
  { name: "AWS EC2"  },
  { name: "Docker" },
  { name: "Git"  },
  { name: "Streamlit"  },
  { name: "Cursor / Claude Code" },
  { name: "VSCode"  },
  { name: "Flask"  },
  { name: "LSTM / RNN"  },
  { name: "NLP"  },
];

// Duplicate for seamless infinite loop
const ITEMS = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

function TechPill({ icon, name }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap flex-shrink-0 mx-2"
      style={{
        borderColor: 'rgba(59,130,246,0.3)',
        backgroundColor: 'var(--pill-bg, rgba(59,130,246,0.1))',
        color: 'var(--pill-text, #93c5fd)',
      }}
    >
      <span style={{ fontSize: '15px' }}>{icon}</span>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

export default function TechRibbon() {
 

  return (
    <div className="w-full py-4 overflow-hidden relative select-none" aria-label="Tech stack ribbon">

      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--bg-primary), transparent)',
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, var(--bg-primary), transparent)',
        }}
      />

      {/* Row 1 — scrolls left */}
      <div className="flex mb-3 ribbon-left">
        {ITEMS.map((tech, i) => (
          <TechPill key={`l-${i}`} icon={tech.icon} name={tech.name} />
        ))}
      </div>

      {/* Row 2 — scrolls right (reverse direction) */}
      <div className="flex ribbon-right">
        {[...ITEMS].reverse().map((tech, i) => (
          <TechPill key={`r-${i}`} icon={tech.icon} name={tech.name} />
        ))}
      </div>

      <style>{`
        .ribbon-left {
          animation: scrollLeft 40s linear infinite;
          width: max-content;
        }
        .ribbon-right {
          animation: scrollRight 45s linear infinite;
          width: max-content;
        }
        .ribbon-left:hover,
        .ribbon-right:hover {
          animation-play-state: paused;
        }
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ribbon-left, .ribbon-right { animation: none; }
        }
      `}</style>
    </div>
  );
}
