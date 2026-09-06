import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

/* ─── Data ─────────────────────────────────────────────────────────── */
const LEETCODE_BADGES = [
  {
    id: "lc50",
    title: "50 Days Badge",
    subtitle: "LeetCode",
    icon: "🔥",
    color: "#ffa500",
    glow: "rgba(255,165,0,0.35)",
    description: "Solved problems for 50 consecutive days",
    year: "2025",
    verified: true,
  },
  {
    id: "lc100",
    title: "100 Days Badge",
    subtitle: "LeetCode",
    icon: "💯",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.35)",
    description: "100-day streak — top 5% of global users",
    year: "2025",
    verified: true,
  },
  {
    id: "lc-knight",
    title: "Knight",
    subtitle: "LeetCode Rating",
    icon: "⚔️",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.35)",
    description: "Reached Knight ranking in LeetCode contests",
    year: "2025",
    verified: false,
  },
];

const ACHIEVEMENTS = [
  {
    id: "adobe",
    emoji: "🏆",
    title: "Adobe Hackathon",
    subtitle: "Top 4029 / 115,000 participants",
    detail: "Ranked in top 4% globally across 115K+ participants. Built an AI-powered document intelligence system.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.3)",
    tag: "Hackathon",
    year: "2024",
  },
  {
    id: "academic",
    emoji: "🎓",
    title: "Academic Excellence Award",
    subtitle: "Thapar Institute of Technology",
    detail: "Awarded for outstanding academic performance and innovation in Electronics & Computer Engineering.",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.3)",
    tag: "Academic",
    year: "2024",
  },
  {
    id: "internship-1",
    emoji: "🤖",
    title: "LLM Intern — Edunet Foundation",
    subtitle: "90% intent accuracy · 25% latency reduction",
    detail: "Built production NLP chatbot with 90% intent accuracy; slashed API latency by 25% through pipeline optimization.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
    tag: "Internship",
    year: "2025",
  },
  {
    id: "internship-2",
    emoji: "🚦",
    title: "CV Intern — TIET Experiential Lab",
    subtitle: "89.7% mAP · YOLOv8 Road Hazard Detection",
    detail: "Designed a YOLOv8 computer vision system for real-time roadway hazard detection, achieving 89.7% mAP.",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
    tag: "Research",
    year: "2025",
  },
  {
    id: "lc-solved",
    emoji: "💻",
    title: "LeetCode Problem Solver",
    subtitle: "250+ problems · Top rankings",
    detail: "Consistently solving algorithmic challenges across Easy, Medium, and Hard difficulty on LeetCode.",
    color: "#ffa500",
    glow: "rgba(255,165,0,0.3)",
    tag: "DSA",
    year: "2025",
  },
  {
    id: "5g-research",
    emoji: "📡",
    title: "5G Research Capstone",
    subtitle: "94.68% accuracy · KTH Expeca Testbed",
    detail: "Analyzed 40K+ real-world 5G packet traces and built LSTM hybrid achieving 0.201ms MAE latency prediction.",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
    tag: "Research",
    year: "2024",
  },
];

const TAG_COLORS = {
  Hackathon: { bg: "rgba(59,130,246,0.12)", text: "#60a5fa" },
  Academic:  { bg: "rgba(34,197,94,0.12)",  text: "#4ade80" },
  Internship:{ bg: "rgba(245,158,11,0.12)", text: "#fbbf24" },
  Research:  { bg: "rgba(139,92,246,0.12)", text: "#c084fc" },
  DSA:       { bg: "rgba(255,165,0,0.12)",  text: "#fbbf24" },
};

/* ─── LeetCode Badge Card ───────────────────────────────────────────── */
function LCBadge({ badge, index }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 200px",
        minWidth: 180,
        maxWidth: 260,
        borderRadius: 20,
        padding: "28px 22px 22px",
        background: "var(--card-bg)",
        border: `1.5px solid ${hov ? badge.color + "55" : "var(--border-color)"}`,
        boxShadow: hov
          ? `0 0 32px ${badge.glow}, 0 8px 32px rgba(0,0,0,0.1)`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Shimmer line on top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${badge.color}, #8b5cf6)`,
        borderRadius: "20px 20px 0 0",
      }} />

      {/* Glow bg circle */}
      <div style={{
        position: "absolute", bottom: -30, right: -30,
        width: 100, height: 100, borderRadius: "50%",
        background: badge.color + "12",
        transition: "transform 0.4s ease",
        transform: hov ? "scale(1.5)" : "scale(1)",
      }} />

      {/* Icon */}
      <motion.div
        animate={hov ? { scale: [1, 1.2, 1.1], rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 48, marginBottom: 12, display: "block" }}
      >
        {badge.icon}
      </motion.div>

      <h3 style={{
        margin: "0 0 4px",
        fontSize: 16,
        fontWeight: 800,
        color: "var(--text-primary)",
        fontFamily: "'Segoe UI', sans-serif",
      }}>
        {badge.title}
      </h3>
      <p style={{ margin: "0 0 10px", fontSize: 11, color: badge.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {badge.subtitle}
      </p>
      <p style={{ margin: "0 0 14px", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
        {badge.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: badge.color,
          background: badge.color + "18",
          padding: "3px 10px", borderRadius: 20,
        }}>{badge.year}</span>
        {badge.verified && (
          <span style={{
            fontSize: 10, fontWeight: 700, color: "#22c55e",
            background: "rgba(34,197,94,0.12)",
            padding: "3px 10px", borderRadius: 20,
          }}>✓ Verified</span>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Achievement Card ─────────────────────────────────────────────── */
function AchievementCard({ a, index }) {
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const tag = TAG_COLORS[a.tag] || { bg: "rgba(255,255,255,0.1)", text: "#94a3b8" };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => setExpanded(!expanded)}
      style={{
        borderRadius: 16,
        padding: "20px 22px",
        background: "var(--card-bg)",
        border: `1.5px solid ${hov ? a.color + "50" : "var(--border-color)"}`,
        boxShadow: hov
          ? `0 0 24px ${a.glow}, 0 4px 20px rgba(0,0,0,0.08)`
          : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 3,
        background: `linear-gradient(180deg, ${a.color}, #8b5cf6)`,
        borderRadius: "16px 0 0 16px",
        opacity: hov ? 1 : 0.6,
        transition: "opacity 0.3s",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, paddingLeft: 8 }}>
        {/* Emoji */}
        <motion.span
          animate={hov ? { scale: 1.15, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}
        >
          {a.emoji}
        </motion.span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <h3 style={{
              margin: 0, fontSize: 15, fontWeight: 800,
              color: "var(--text-primary)", lineHeight: 1.2,
            }}>
              {a.title}
            </h3>
            <span style={{
              fontSize: 10, fontWeight: 700,
              padding: "2px 9px", borderRadius: 20,
              background: tag.bg, color: tag.text,
              whiteSpace: "nowrap",
            }}>{a.tag}</span>
          </div>
          <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 600, color: a.color }}>
            {a.subtitle}
          </p>

          {/* Expandable detail */}
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ margin: "0 0 8px", fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {a.detail}
            </p>
          </motion.div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{a.year}</span>
            <span style={{ fontSize: 10, color: a.color, fontWeight: 600 }}>
              {expanded ? "▲ less" : "▼ more"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Animated Counter ─────────────────────────────────────────────── */
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  if (inView && val === 0 && to > 0) {
    let start = 0;
    const step = Math.ceil(to / 40);
    const tick = () => {
      start = Math.min(start + step, to);
      setVal(start);
      if (start < to) setTimeout(tick, 30);
    };
    tick();
  }

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Section ───────────────────────────────────────────────────────── */
export default function Achievements() {
  return (
    <section
      id="achievements"
      style={{
        padding: "80px 0 72px",
        background: "var(--bg-secondary)",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.4s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800;900&display=swap');
      `}</style>

      {/* Background decorative blobs */}
      <div style={{
        position: "absolute", top: -60, left: -60, width: 300, height: 300,
        borderRadius: "50%", background: "rgba(59,130,246,0.06)", filter: "blur(60px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, right: -60, width: 350, height: 350,
        borderRadius: "50%", background: "rgba(139,92,246,0.06)", filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      {/* Top rule */}
      <div style={{
        position: "absolute", top: 0,
        left: "clamp(20px,5vw,72px)", right: "clamp(20px,5vw,72px)",
        height: 1, background: "var(--border-color)",
      }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: "#3b82f6", borderRadius: 2 }} />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#3b82f6",
            }}>Recognition</span>
          </div>

          <h2 style={{
            margin: "0 0 10px",
            fontSize: "clamp(26px,3.5vw,40px)",
            fontWeight: 900,
            fontFamily: "'DM Sans','Segoe UI',sans-serif",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}>
            Achievements &{" "}
            <span style={{
              background: "linear-gradient(135deg, #ffa500 20%, #ef4444 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Milestones</span>
          </h2>

          <p style={{ margin: 0, fontSize: 14, color: "var(--text-muted)", maxWidth: 480 }}>
            Badges, rankings, and recognitions earned through consistent effort and competition.
          </p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 52,
          }}
        >
          {[
            { label: "LeetCode Problems", value: 250, suffix: "+", color: "#ffa500" },
            { label: "Hackathon Rank",    value: 4029, suffix: "",  color: "#3b82f6" },
            { label: "Participants Beat", value: 110971, suffix: "+", color: "#22c55e" },
            { label: "Day Streak",        value: 100, suffix: "+", color: "#ef4444" },
          ].map(({ label, value, suffix, color }) => (
            <div key={label} style={{
              flex: "1 1 130px", minWidth: 120,
              padding: "18px 20px",
              borderRadius: 14,
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
            }}>
              <p style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 900, color, fontFamily: "'DM Sans',sans-serif" }}>
                <Counter to={value} suffix={suffix} />
              </p>
              <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── LeetCode Badges ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 18 }}>🔥</span>
            <h3 style={{
              margin: 0, fontSize: 17, fontWeight: 800,
              color: "var(--text-primary)", fontFamily: "'DM Sans',sans-serif",
            }}>
              LeetCode Badges
            </h3>
            <div style={{ flex: 1, height: 1, background: "var(--border-color)", marginLeft: 8 }} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {LEETCODE_BADGES.map((badge, i) => (
              <LCBadge key={badge.id} badge={badge} index={i} />
            ))}

            {/* Custom badge: add your own */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.55 }}
              style={{
                flex: "1 1 200px", minWidth: 180, maxWidth: 260,
                borderRadius: 20, padding: "28px 22px 22px",
                background: "var(--card-bg)",
                border: "1.5px dashed var(--border-color)",
                textAlign: "center",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: 0.6,
              }}
            >
              <span style={{ fontSize: 36, marginBottom: 10 }}>🎯</span>
              <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>
                More badges on the way…
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Achievements Grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 18 }}>🏅</span>
            <h3 style={{
              margin: 0, fontSize: 17, fontWeight: 800,
              color: "var(--text-primary)", fontFamily: "'DM Sans',sans-serif",
            }}>
              Notable Achievements
            </h3>
            <div style={{ flex: 1, height: 1, background: "var(--border-color)", marginLeft: 8 }} />
            <span style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
              click to expand
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,340px), 1fr))",
            gap: 14,
          }}>
            {ACHIEVEMENTS.map((a, i) => (
              <AchievementCard key={a.id} a={a} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}