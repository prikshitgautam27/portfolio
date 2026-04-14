import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const USERNAME = "prikshit0033";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getColor(count, isDark) {
  if (isDark) {
    if (count === 0) return "#1a1f3a";
    if (count <= 2)  return "#ffa5001a";
    if (count <= 5)  return "#ffa50066";
    if (count <= 9)  return "#ffa500aa";
    return "#ffa500";
  } else {
    if (count === 0) return "#f0f0f0";
    if (count <= 2)  return "#ffe0a0";
    if (count <= 5)  return "#ffbf47";
    if (count <= 9)  return "#ff9800";
    return "#e65100";
  }
}

export default function LeetCodeStats() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark,  setIsDark]  = useState(
    document.documentElement.classList.contains("dark")
  );
  const [tooltip, setTooltip] = useState(null);
  const containerRef = useRef(null);

  /* Watch theme */
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, {
      attributes: true, attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  /* Fetch LeetCode data */
  useEffect(() => {
    fetch(`https://leetcode-stats-api.herokuapp.com/${USERNAME}`)
      .then(r => r.json())
      .then(d => {
        if (d.status === "success") {
          setData(d);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* Build submission calendar weeks from data */
  const buildWeeks = (submissionCalendar) => {
    if (!submissionCalendar) return [];
    const now   = new Date();
    const weeks = [];

    for (let w = 52; w >= 0; w--) {
      const week = [];
      for (let d = 6; d >= 0; d--) {
        const date = new Date(now);
        date.setDate(now.getDate() - w * 7 - d);
        const ts    = Math.floor(date.getTime() / 1000);
        // find closest timestamp in calendar
        const count = submissionCalendar[ts] || submissionCalendar[ts - 86400] || 0;
        week.push({ date: date.toISOString().slice(0, 10), count });
      }
      weeks.push(week);
    }
    return weeks;
  };

  const weeks = data?.submissionCalendar
    ? buildWeeks(data.submissionCalendar)
    : [];

  /* Month labels */
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const d = new Date(week[0]?.date);
    if (!isNaN(d) && d.getMonth() !== lastMonth) {
      lastMonth = d.getMonth();
      monthLabels.push({ wi, label: MONTHS[d.getMonth()] });
    }
  });

  const DAYS  = ["","Mon","","Wed","","Fri",""];
  const CELL  = 13;
  const GAP   = 3;
  const STEP  = CELL + GAP;
  const LEFT  = 30;

  const cardBg     = isDark ? "#0d1117" : "#ffffff";
  const cardBorder = isDark ? "rgba(48,54,61,1)" : "rgba(209,217,224,1)";
  const textPri    = isDark ? "#e6edf3" : "#0a0e27";
  const textSec    = isDark ? "#8b949e" : "#57606a";

  /* Stat cards data */
  const stats = data ? [
    { label: "Problems Solved", value: data.totalSolved,      icon: "✅", color: "#3b82f6" },
    { label: "Easy Solved",     value: data.easySolved,       icon: "🟢", color: "#22c55e" },
    { label: "Medium Solved",   value: data.mediumSolved,     icon: "🟡", color: "#f59e0b" },
    { label: "Hard Solved",     value: data.hardSolved,       icon: "🔴", color: "#ef4444" },
    { label: "Acceptance Rate", value: `${data.acceptanceRate}%`, icon: "🎯", color: "#8b5cf6" },
    { label: "Ranking",         value: `#${data.ranking?.toLocaleString()}`, icon: "🏅", color: "#f97316" },
  ] : [];

  return (
    <motion.div
      className="w-full mb-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* LeetCode icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffa500">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
          </svg>
          <span className="text-sm font-semibold" style={{ color: textPri }}>
            LeetCode Activity
          </span>
          {data && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(255,165,0,0.15)', color: '#ffa500' }}>
              {data.totalSolved} solved · {data.contributionPoints || 258} submissions
            </span>
          )}
        </div>
        <a
          href={`https://leetcode.com/u/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:underline transition"
          style={{ color: '#ffa500' }}
        >
          @{USERNAME} ↗
        </a>
      </div>

      {/* ── Stats grid ── */}
      {!loading && data && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
          {stats.map(({ label, value, icon, color }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.04 }}
              className="rounded-xl px-3 py-2 border text-center"
              style={{ backgroundColor: cardBg, borderColor: cardBorder }}
            >
              <p className="text-xs mb-0.5" style={{ color: textSec }}>{icon} {label}</p>
              <p className="text-sm font-bold" style={{ color }}>{value}</p>
            </motion.div>
          ))}
        </div>
      )}

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
          <span className="text-sm font-semibold" style={{ color: textPri }}>
            {data?.totalActiveDays || 46} active days · Max streak: {data?.streak || 9}
          </span>
        </div>

        {/* Grid */}
        <div className="px-5 py-5 overflow-x-auto" ref={containerRef}>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-12">
              {[0,1,2].map(i => (
                <motion.div key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: '#ffa500' }}
                  animate={{ y:[0,-8,0] }}
                  transition={{ duration:0.6, repeat:Infinity, delay:i*0.15 }}
                />
              ))}
            </div>
          ) : weeks.length === 0 ? (
            /* Fallback: show placeholder if API fails */
            <div className="text-center py-8">
              <p className="text-sm mb-2" style={{ color: textSec }}>
                Live data loads on deployment
              </p>
              <a
                href={`https://leetcode.com/u/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold"
                style={{ color: '#ffa500' }}
              >
                View on LeetCode ↗
              </a>
            </div>
          ) : (
            <div style={{ minWidth: `${LEFT + weeks.length * STEP}px`, position: 'relative' }}>

              {/* Month labels */}
              <div style={{ display:'flex', marginLeft:`${LEFT}px`, marginBottom:'6px', position:'relative', height:'16px' }}>
                {monthLabels.map(({ wi, label }) => (
                  <span key={label+wi} style={{
                    position:'absolute', left:`${wi*STEP}px`,
                    fontSize:'10px', color: textSec, fontWeight:500, userSelect:'none',
                  }}>{label}</span>
                ))}
              </div>

              {/* Day labels + cells */}
              <div style={{ display:'flex' }}>
                <div style={{ display:'flex', flexDirection:'column', gap:`${GAP}px`, marginRight:'6px', width:`${LEFT-6}px` }}>
                  {DAYS.map((d,i) => (
                    <div key={i} style={{
                      height:`${CELL}px`, fontSize:'9px', color: textSec,
                      display:'flex', alignItems:'center', justifyContent:'flex-end',
                      userSelect:'none',
                    }}>{d}</div>
                  ))}
                </div>

                <div style={{ display:'flex', gap:`${GAP}px` }}>
                  {weeks.map((week, wi) => (
                    <div key={wi} style={{ display:'flex', flexDirection:'column', gap:`${GAP}px` }}>
                      {week.map((day, di) => (
                        <motion.div
                          key={di}
                          initial={{ opacity:0, scale:0.5 }}
                          animate={{ opacity:1, scale:1 }}
                          transition={{ delay:(wi*0.008)+(di*0.004), duration:0.2 }}
                          style={{
                            width:`${CELL}px`, height:`${CELL}px`,
                            borderRadius:'3px',
                            backgroundColor: getColor(day.count, isDark),
                            cursor:'crosshair',
                            outline: tooltip?.date === day.date
                              ? `1.5px solid #ffa500` : 'none',
                          }}
                          onMouseEnter={e => {
                            const rect = containerRef.current?.getBoundingClientRect();
                            const el   = e.target.getBoundingClientRect();
                            setTooltip({
                              x: el.left - (rect?.left||0) + CELL/2,
                              y: el.top  - (rect?.top||0) - 8,
                              date: day.date, count: day.count,
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
                <div style={{
                  position:'absolute',
                  left:`${tooltip.x}px`, top:`${tooltip.y}px`,
                  transform:'translate(-50%,-100%)',
                  backgroundColor:'#24292f', color:'#fff',
                  fontSize:'11px', padding:'5px 10px',
                  borderRadius:'6px', whiteSpace:'nowrap',
                  pointerEvents:'none', zIndex:50,
                  boxShadow:'0 2px 8px rgba(0,0,0,0.3)',
                }}>
                  <strong>
                    {tooltip.count === 0
                      ? "No submissions"
                      : `${tooltip.count} submission${tooltip.count!==1?'s':''}`}
                  </strong>
                  {' '}on{' '}
                  {new Date(tooltip.date+'T00:00:00').toLocaleDateString('en-US',{
                    weekday:'short', month:'short', day:'numeric', year:'numeric'
                  })}
                </div>
              )}

              {/* Legend */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:'5px', marginTop:'10px' }}>
                <span style={{ fontSize:'10px', color: textSec }}>Less</span>
                {[0,2,5,9,12].map((c,i) => (
                  <div key={i} style={{
                    width:'12px', height:'12px', borderRadius:'3px',
                    backgroundColor: getColor(c, isDark),
                    border:`1px solid ${isDark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)'}`,
                  }}/>
                ))}
                <span style={{ fontSize:'10px', color: textSec }}>More</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
