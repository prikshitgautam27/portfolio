import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useRef, useState } from "react";

const BLUE   = "#3b82f6";
const PURPLE = "#8b5cf6";
const CARD_W = 340;
const GAP    = 20;

const projects = [
  {
    title: "5G Latency Predictor",
    subtitle: "Real-World Delay Forecasting",
    description:
      "Analyzed 40,000+ real-world 5G packet traces from KTH Expeca testbed, identifying RLC frame alignment as root cause. Benchmarked RNN, LSTM & Hybrid LSTM architectures.",
    tech: ["PyTorch", "LSTM", "RNN", "Keras", "Python"],
    metrics: ["94.68% accuracy", "0.201ms MAE", "40K+ traces"],
    github: "https://github.com/gourav-prateek-sharma/5G-delay-Timeseries-Precapstone",
    live: "https://forcasting-5g.vercel.app/",
    badge: "Research",
    date: "Aug 2024 – Jul 2025",
    accent: BLUE,
    mediaType: "image",
    media: "/5g-delay.png",
  },
  {
    title: "AI Road Intelligence",
    subtitle: "Real-Time Traffic Anomaly Detection",
    description:
      "Real-time congestion & anomaly detection using YOLOv8, SUMO simulation, and computer vision pipelines. Processes live feeds at 45 FPS with <50 ms latency.",
    tech: ["YOLOv8", "SUMO", "Computer Vision", "Real-time"],
    metrics: ["45 FPS", "<50ms latency", "12% faster response"],
    github: "https://github.com/prathamhanda/AI-RoadIntelligence",
    live: null,
    badge: null,
    date: null,
    accent: "#06b6d4",
    mediaType: "video",
    media: "/traffic-demo.mp4",
  },
  {
    title: "VisionCARE AI",
    subtitle: "Cataract Detection & Diagnostic Reporting",
    description:
      "Streamlit-based medical diagnostic system using ensemble CNN models for cataract detection. Automated preprocessing, report generation, and clinic-ready dashboard.",
    tech: ["CNN", "Keras", "Streamlit", "Ensemble Learning"],
    metrics: ["High accuracy", "Auto reports", "Clinic-ready"],
    github: "https://github.com/prikshitgautam27/Vision_CARE_AI",
    live: null,
    badge: "Business / Innovation",
    date: null,
    accent: "#10b981",
    mediaType: "video",
    media: "/visioncare-demo.mp4",
  },
  {
    title: "Healthcare Assistant",
    subtitle: "RAG + LangChain Medical Chatbot",
    description:
      "Medical chatbot powered by LangChain, FAISS vector store, and LLMs. Answers healthcare queries across 2050+ medical topics with a 40% boost in retrieval relevance.",
    tech: ["LLM", "RAG", "FAISS", "LangChain", "Hugging Face"],
    metrics: ["40% relevance boost", "2050+ topics"],
    github: "https://github.com/prikshitgautam27/AI_powered_healthcare",
    live: "https://pgautam-healthcare-limited.streamlit.app/",
    badge: "Internship",
    date: null,
    accent: "#f59e0b",
    mediaType: "image",
    media: "/healthcare-demo.jpg",
  },
  {
    title: "Cloud File Manager",
    subtitle: "AWS S3 + Flask",
    description:
      "Secure, scalable cloud file management with upload, download, versioning, and multi-region replication. Includes IAM authentication and EC2 deployment.",
    tech: ["AWS S3", "EC2", "Flask", "IAM", "Python"],
    metrics: ["Multi-region replication", "Secure IAM", "Versioned"],
    github: "https://github.com/prikshitgautam27/AWS_S3_E2",
    live: null,
    badge: null,
    date: null,
    accent: "#f97316",
    mediaType: "video",
    media: "/aws-demo.mp4",
  },
  {
    title: "Full Stack AI Dashboard(Under Development)",
    subtitle: "Login Microservice + React UI",
    description:
      "React + Node.js + Express with MongoDB/MySQL. AWS Lambda-powered login microservice with JWT auth, Tailwind CSS UI, and scalable REST APIs.",
    tech: ["React", "Node.js", "Express", "MongoDB", "AWS Lambda"],
    metrics: ["Serverless auth", "JWT secured", "REST APIs"],
    github: "https://github.com/prikshitgautam27",
    live: null,
    badge: null,
    date: null,
    accent: PURPLE,
    mediaType: "none",
    media: "",
  },
];

/* ─── Card ──────────────────────────────────────────────────────── */
function Card({ p, i }) {
  const c = p.accent;
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
      style={{
        width: CARD_W,
        flexShrink: 0,
        scrollSnapAlign: "start",
        borderRadius: 16,
        background: "var(--card-bg)",
        border: `1px solid ${hov ? c + "55" : "var(--border-color)"}`,
        boxShadow: hov
          ? `0 20px 50px ${c}18, 0 4px 20px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color .3s, box-shadow .3s, transform .25s",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* accent top bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${c}, ${PURPLE})`,
        flexShrink: 0,
      }} />

      {/* ── media ── */}
      {p.mediaType === "image" && (
        <div style={{ height: 185, overflow: "hidden", flexShrink: 0, position: "relative" }}>
          <img
            src={p.media} alt={p.title} draggable={false}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top", display: "block",
              transition: "transform .45s ease",
              transform: hov ? "scale(1.05)" : "scale(1)",
            }}
          />
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                position: "absolute", top: 10, right: 10,
                display: "flex", alignItems: "center", gap: 5,
                padding: "4px 11px", borderRadius: 20,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(8px)",
                border: `1px solid ${c}44`,
                color: c, fontSize: 10, fontWeight: 700, textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Live
            </a>
          )}
          {p.date && (
            <span style={{
              position: "absolute", bottom: 10, left: 10,
              padding: "2px 9px", borderRadius: 10,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(6px)",
              color: "var(--text-muted)", fontSize: 9, fontWeight: 600,
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}>{p.date}</span>
          )}
        </div>
      )}

      {p.mediaType === "video" && (
        <div style={{ height: 185, overflow: "hidden", flexShrink: 0 }}>
          <video src={p.media} muted loop playsInline
            onMouseEnter={e => e.currentTarget.play()}
            onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      )}

      {p.mediaType === "none" && (
        <div style={{
          height: 95, flexShrink: 0,
          background: `linear-gradient(135deg, ${c}12, ${PURPLE}0c)`,
          display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 20px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: -20, top: -20,
            width: 90, height: 90, borderRadius: "50%", background: `${c}14`,
          }} />
          <div style={{ display: "flex", gap: 6 }}>
            {["#ef4444", "#f59e0b", "#22c55e"].map((col, k) => (
              <div key={k} style={{ width: 9, height: 9, borderRadius: "50%", background: col, opacity: 0.8 }} />
            ))}
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, color: `${c}90`,
            textTransform: "uppercase", letterSpacing: "0.12em",
          }}>Full Stack</span>
        </div>
      )}

      {/* ── body ── */}
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
          <div>
            <h3 style={{
              margin: 0, fontSize: 15, fontWeight: 700,
              color: "var(--text-primary)", lineHeight: 1.2,
              fontFamily: "'DM Sans','Segoe UI',sans-serif",
            }}>{p.title}</h3>
            <p style={{ margin: "3px 0 0", fontSize: 11.5, color: c, fontWeight: 600 }}>
              {p.subtitle}
            </p>
          </div>
          {p.badge && (
            <span style={{
              fontSize: "9px", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "3px 9px", borderRadius: 20,
              border: `1px solid ${c}50`,
              color: c, background: `${c}12`,
              whiteSpace: "nowrap", flexShrink: 0,
            }}>{p.badge}</span>
          )}
        </div>

        {/* description */}
        <p style={{
          margin: "0 0 12px", fontSize: 12.5, lineHeight: 1.7,
          color: "var(--text-secondary)",
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{p.description}</p>

        {/* metrics */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
          {p.metrics.map((m, k) => (
            <span key={k} style={{
              fontSize: 9.5, fontWeight: 700,
              padding: "2px 9px", borderRadius: 20,
              background: `${c}12`, color: c,
              border: `1px solid ${c}30`,
            }}>{m}</span>
          ))}
        </div>

        {/* tech stack */}
        <p style={{
          margin: "0 0 5px", fontSize: 9, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>Tech Stack</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, flex: 1 }}>
          {p.tech.map((t, k) => (
            <span key={k} className="tech-pill" style={{
              fontSize: 10, padding: "2px 9px",
              borderRadius: 6, fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>

        {/* divider */}
        <div style={{ height: 1, background: "var(--border-color)", margin: "14px 0" }} />

        {/* CTA */}
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <a href={p.github} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 12.5, fontWeight: 600,
              color: "var(--text-muted)", textDecoration: "none",
              transition: "color .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = c}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
          >
            <FaGithub style={{ fontSize: 14 }} /> Code
          </a>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 12.5, fontWeight: 700,
                padding: "5px 14px", borderRadius: 20,
                background: `linear-gradient(135deg, ${BLUE}, ${PURPLE})`,
                color: "#fff", textDecoration: "none",
                boxShadow: `0 3px 12px ${BLUE}30`,
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = `0 5px 18px ${BLUE}50`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = `0 3px 12px ${BLUE}30`;
              }}
            >
              <FaExternalLinkAlt style={{ fontSize: 9 }} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────── */
export default function Projects() {
  const trackRef = useRef(null);
  const [cur, setCur] = useState(0);

  const onScroll = () => {
    if (!trackRef.current) return;
    const idx = Math.round(trackRef.current.scrollLeft / (CARD_W + GAP));
    setCur(Math.max(0, Math.min(idx, projects.length - 1)));
  };

  const scrollTo = (idx) => {
    const c = Math.max(0, Math.min(idx, projects.length - 1));
    setCur(c);
    trackRef.current?.scrollTo({ left: c * (CARD_W + GAP), behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      style={{
        padding: "80px 0 64px",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
        transition: "background-color .4s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        .proj-track::-webkit-scrollbar { display: none; }
        .proj-track { -ms-overflow-style: none; scrollbar-width: none; }

        .proj-arr {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; cursor: pointer;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          transition: all .2s ease;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06);
        }
        .proj-arr:hover {
          background: ${BLUE}18;
          border-color: ${BLUE}80;
          color: ${BLUE};
          transform: scale(1.08);
          box-shadow: 0 3px 12px ${BLUE}20;
        }

        /* big decorative number — uses bg-secondary so it works in both modes */
        .proj-deco-num {
          position: absolute;
          right: clamp(16px, 5vw, 72px);
          top: 55px;
          font-size: 96px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -6px;
          font-family: 'DM Sans', sans-serif;
          color: var(--bg-secondary);
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      {/* decorative big number */}
      <div className="proj-deco-num">03</div>

      {/* top rule */}
      <div style={{
        position: "absolute", top: 0,
        left: "clamp(20px,5vw,72px)", right: "clamp(20px,5vw,72px)",
        height: 1, background: "var(--border-color)",
      }} />

      {/* ── Header ── */}
      <div style={{
        padding: "0 clamp(20px,5vw,72px)",
        marginBottom: 36,
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: BLUE, borderRadius: 2 }} />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: BLUE,
            }}>My Work</span>
          </div>

          <h2 style={{
            margin: 0,
            fontSize: "clamp(26px,3.5vw,38px)",
            fontWeight: 800,
            fontFamily: "'DM Sans','Segoe UI',sans-serif",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}>
            Featured{" "}
            <span style={{
              background: `linear-gradient(135deg, ${BLUE} 30%, ${PURPLE})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Projects</span>
          </h2>

          <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--text-muted)" }}>
            {projects.length} projects · drag or use arrows to explore
          </p>
        </motion.div>

        {/* arrows */}
        <motion.div
          style={{ display: "flex", gap: 8 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {["←", "→"].map((a, i) => (
            <button key={i} className="proj-arr"
              onClick={() => scrollTo(cur + (i === 0 ? -1 : 1))}
            >{a}</button>
          ))}
        </motion.div>
      </div>

      {/* ── Track ── */}
      <div
        ref={trackRef}
        className="proj-track"
        onScroll={onScroll}
        style={{
          display: "flex", gap: GAP,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingLeft: "clamp(20px,5vw,72px)",
          paddingRight: "clamp(20px,5vw,72px)",
          paddingBottom: 10,
          cursor: "grab",
        }}
        onMouseDown={e => { e.currentTarget.style.cursor = "grabbing"; }}
        onMouseUp={e => { e.currentTarget.style.cursor = "grab"; }}
        onMouseLeave={e => { e.currentTarget.style.cursor = "grab"; }}
      >
        {projects.map((p, i) => <Card key={i} p={p} i={i} />)}
        <div style={{ width: 1, flexShrink: 0 }} />
      </div>

      {/* ── Dots ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: 7, marginTop: 24 }}>
        {projects.map((_, i) => (
          <button key={i} onClick={() => scrollTo(i)} style={{
            width: i === cur ? 28 : 7, height: 7,
            borderRadius: 4, border: "none", padding: 0, cursor: "pointer",
            background: i === cur
              ? `linear-gradient(90deg, ${BLUE}, ${PURPLE})`
              : "var(--border-color)",
            transition: "all .35s cubic-bezier(.4,0,.2,1)",
          }} />
        ))}
      </div>
    </section>
  );
}
