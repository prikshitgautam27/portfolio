import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const USERNAME = "prikshitgautam27";
const MONTHS   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS     = ["","Mon","","Wed","","Fri",""];

/* GitHub-green palette */
function getColor(count, isDark) {
  if (isDark) {
    if (count === 0) return "#161b22";
    if (count <= 2)  return "#0e4429";
    if (count <= 5)  return "#006d32";
    if (count <= 9)  return "#26a641";
    return "#39d353";
  } else {
    if (count === 0) return "#ebedf0";
    if (count <= 2)  return "#9be9a8";
    if (count <= 5)  return "#40c463";
    if (count <= 9)  return "#30a14e";
    return "#216e39";
  }
}

function getLevelLabel(count) {
  if (count === 0) return "No contributions";
  if (count <= 2)  return "1–2 contributions";
  if (count <= 5)  return "3–5 contributions";
  if (count <= 9)  return "6–9 contributions";
  return "10+ contributions";
}

export default function GitHubHeatmap() {
  const [weeks,   setWeeks]   = useState([]);
  const [total,   setTotal]   = useState(0);
  const [streak,  setStreak]  = useState(0);
  const [maxDay,  setMaxDay]  = useState(0);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState(null); // {x,y,date,count}
  const [isDark,  setIsDark]  = useState(
    document.documentElement.classList.contains("dark")
  );
  const containerRef = useRef(null);

  /* Watch theme toggle */
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* Fetch contributions */
  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then(r => r.json())
      .then(data => {
        const contribs = data.contributions || [];
        const t = contribs.reduce((s, d) => s + d.count, 0);
        const mx = Math.max(...contribs.map(d => d.count));

        /* Current streak */
        let s = 0;
        for (let i = contribs.length - 1; i >= 0; i--) {
          if (contribs[i].count > 0) s++;
          else break;
        }

        /* Group into 7-day columns (weeks) */
        const grouped = [];
        let week = [];
        contribs.forEach(day => {
          week.push(day);
          if (week.length === 7) { grouped.push(week); week = []; }
        });
        if (week.length) grouped.push(week);

        setWeeks(grouped);
        setTotal(t);
        setMaxDay(mx);
        setStreak(s);
        setLoading(false);
      })
      .catch(() => {
        /* Fallback mock data */
        const mock = [];
        const now  = new Date();
        let streak = 0, counting = true;
        for (let w = 52; w >= 0; w--) {
          const wk = [];
          for (let d = 6; d >= 0; d--) {
            const date = new Date(now);
            date.setDate(now.getDate() - w * 7 - d);
            const r = Math.random();
            const count = r < 0.4 ? 0 : r < 0.65 ? Math.floor(Math.random()*3)+1
                        : r < 0.85 ? Math.floor(Math.random()*5)+3
                        : Math.floor(Math.random()*8)+6;
            wk.push({ date: date.toISOString().slice(0,10), count });
          }
          mock.push(wk);
        }
        /* reverse so most recent is last */
        const flat = mock.flat();
        for (let i = flat.length-1; i >= 0; i--) {
          if (flat[i].count > 0 && counting) streak++;
          else counting = false;
        }
        setWeeks(mock);
        setTotal(flat.reduce((s,d)=>s+d.count,0));
        setMaxDay(Math.max(...flat.map(d=>d.count)));
        setStreak(streak);
        setLoading(false);
      });
  }, []);

  /* Month labels: find first week of each month */
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const d = new Date(week[0]?.date);
    if (!isNaN(d) && d.getMonth() !== lastMonth) {
      lastMonth = d.getMonth();
      monthLabels.push({ wi, label: MONTHS[d.getMonth()] });
    }
  });

  const CELL  = 14;
  const GAP   = 3;
  const STEP  = CELL + GAP;
  const LEFT  = 32; // space for day labels

  const cardBg     = isDark ? "#0d1117" : "#ffffff";
  const cardBorder = isDark ? "rgba(48,54,61,1)" : "rgba(209,217,224,1)";
  const textColor  = isDark ? "#8b949e" : "#57606a";

  return (
    <motion.div
      className="w-full mb-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: "Total Contributions", value: total.toLocaleString() },
          { label: "Current Streak",      value: `${streak} days` },
          { label: "Best Day",            value: `${maxDay} commits`  },
          { label: "GitHub",              value: `@${USERNAME}` ,
            link: `https://github.com/${USERNAME}` },
        ].map(({ label, value, icon, link }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl px-4 py-3 border"
            style={{ backgroundColor: cardBg, borderColor: cardBorder }}
          >
            <p className="text-xs mb-1 flex items-center gap-1" style={{ color: textColor }}>
              <span>{icon}</span> {label}
            </p>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer"
                className="text-sm font-bold text-blue-500 hover:underline">
                {value}
              </a>
            ) : (
              <p className="text-sm font-bold" style={{ color: isDark ? '#e6edf3' : '#0a0e27' }}>
                {loading ? "—" : value}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* ── Heatmap card ── */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
      >
        {/* Card header */}
        <div
          className="flex items-center gap-2 px-5 py-3 border-b"
          style={{ borderColor: cardBorder }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isDark ? "#e6edf3" : "#0a0e27"}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span className="text-sm font-semibold" style={{ color: isDark ? '#e6edf3' : '#0a0e27' }}>
            {total.toLocaleString()} contributions in the last year
          </span>
        </div>

        {/* Heatmap grid */}
        <div className="px-5 py-5 overflow-x-auto" ref={containerRef}>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-12">
              {[0,1,2].map(i => (
                <motion.div key={i} className="w-2.5 h-2.5 rounded-full bg-green-500"
                  animate={{ y: [0,-8,0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }}
                />
              ))}
            </div>
          ) : (
            <div style={{ minWidth: `${LEFT + weeks.length * STEP}px`, position: 'relative' }}>

              {/* Month labels */}
              <div style={{ display: 'flex', marginLeft: `${LEFT}px`, marginBottom: '6px', position: 'relative', height: '16px' }}>
                {monthLabels.map(({ wi, label }) => (
                  <span
                    key={label + wi}
                    style={{
                      position: 'absolute',
                      left: `${wi * STEP}px`,
                      fontSize: '11px',
                      color: textColor,
                      fontWeight: 500,
                      userSelect: 'none',
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Day labels + cells */}
              <div style={{ display: 'flex' }}>

                {/* Day labels column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px`, marginRight: '6px', width: `${LEFT - 6}px` }}>
                  {DAYS.map((d, i) => (
                    <div key={i} style={{
                      height: `${CELL}px`,
                      fontSize: '10px',
                      color: textColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      userSelect: 'none',
                    }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Weeks */}
                <div style={{ display: 'flex', gap: `${GAP}px` }}>
                  {weeks.map((week, wi) => (
                    <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
                      {week.map((day, di) => (
                        <motion.div
                          key={di}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (wi * 0.01) + (di * 0.005), duration: 0.2 }}
                          style={{
                            width:  `${CELL}px`,
                            height: `${CELL}px`,
                            borderRadius: '3px',
                            backgroundColor: getColor(day.count, isDark),
                            cursor: 'crosshair',
                            flexShrink: 0,
                            outline: tooltip?.date === day.date ? `1.5px solid ${isDark ? '#58a6ff' : '#0969da'}` : 'none',
                          }}
                          onMouseEnter={(e) => {
                            const rect = containerRef.current?.getBoundingClientRect();
                            const el   = e.target.getBoundingClientRect();
                            setTooltip({
                              x: el.left - (rect?.left || 0) + CELL / 2,
                              y: el.top  - (rect?.top  || 0) - 8,
                              date: day.date,
                              count: day.count,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tooltip */}
              {tooltip && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${tooltip.x}px`,
                    top:  `${tooltip.y}px`,
                    transform: 'translate(-50%, -100%)',
                    backgroundColor: isDark ? '#1f2937' : '#24292f',
                    color: '#ffffff',
                    fontSize: '11px',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 50,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  <strong>{tooltip.count === 0 ? "No contributions" : `${tooltip.count} contribution${tooltip.count !== 1 ? 's' : ''}`}</strong>
                  {' '}on{' '}
                  {new Date(tooltip.date + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </div>
              )}

              {/* Legend */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px', marginTop: '10px' }}>
                <span style={{ fontSize: '10px', color: textColor }}>Less</span>
                {[0, 2, 5, 9, 12].map((c, i) => (
                  <div key={i} style={{
                    width: '12px', height: '12px', borderRadius: '3px',
                    backgroundColor: getColor(c, isDark),
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  }} title={getLevelLabel(c)} />
                ))}
                <span style={{ fontSize: '10px', color: textColor }}>More</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
