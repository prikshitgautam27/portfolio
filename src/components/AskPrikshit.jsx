import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";

const SUGGESTIONS = [
  "What are his top projects?",
  "What tech stack does he use?",
  "Is he available for internships?",
  "What's his experience?",
  "How to contact him?",
  "Which degree is he pursuing?",
];

function Bubble({ msg, isDark }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      style={{
        display:        "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom:   "10px",
      }}
    >
      {!isUser && (
        <div style={{
          width:"28px", height:"28px", borderRadius:"50%",
          background:"linear-gradient(135deg,#3b82f6,#8b5cf6)",
          display:"flex", alignItems:"center", justifyContent:"center",
          marginRight:"8px", flexShrink:0, marginTop:"2px",
          fontSize:"12px", color:"#fff",
        }}>
          <FaRobot />
        </div>
      )}
      <div style={{
        maxWidth:     "78%",
        padding:      "10px 14px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background:   isUser
          ? "linear-gradient(135deg,#3b82f6,#6366f1)"
          : isDark ? "#1e293b" : "#f1f5f9",
        color:        isUser ? "#fff" : isDark ? "#e2e8f0" : "#1e293b",
        fontSize:     "13.5px",
        lineHeight:   1.55,
        boxShadow:    "0 1px 4px rgba(0,0,0,0.12)",
        whiteSpace:   "pre-wrap",
        wordBreak:    "break-word",
      }}>
        {msg.content}
      </div>
    </motion.div>
  );
}

function Typing({ isDark }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
      <div style={{
        width:"28px", height:"28px", borderRadius:"50%",
        background:"linear-gradient(135deg,#3b82f6,#8b5cf6)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"12px", color:"#fff", flexShrink:0,
      }}><FaRobot /></div>
      <div style={{
        padding:"10px 16px", borderRadius:"18px 18px 18px 4px",
        background: isDark ? "#1e293b" : "#f1f5f9",
        display:"flex", gap:"5px", alignItems:"center",
      }}>
        {[0,1,2].map(i => (
          <motion.div key={i}
            style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#3b82f6" }}
            animate={{ y:[0,-5,0] }}
            transition={{ duration:0.5, repeat:Infinity, delay:i*0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AskPrikshit() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    {
      role:    "assistant",
      content: "Hi! 👋 I'm an AI trained on Prikshit's portfolio. Ask me anything — his projects, skills, experience, or how to hire him!",
    },
  ]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [isDark,   setIsDark]   = useState(
    document.documentElement.classList.contains("dark")
  );
  const [showSugg, setShowSugg] = useState(true);
  const [error,    setError]    = useState("");
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    setShowSugg(false);
    setError("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // ── Calls our Vercel serverless function, NOT Anthropic directly ──
      const response = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages
            .filter(m => m.role !== "system")
            .map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data  = await response.json();
      const reply = data?.reply || "Sorry, I couldn't get a response. Please try again!";

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Connection error. Try again in a moment.");
      // Remove the user message that failed so they can retry
      setMessages(prev => prev.slice(0, -1));
      setInput(userText);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const bgCard   = isDark ? "#0f172a" : "#ffffff";
  const bgHeader = isDark ? "#1e293b" : "#f8faff";
  const border   = isDark ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.15)";

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position:"fixed", bottom:"28px", right:"28px", zIndex:9999,
          width:"58px", height:"58px", borderRadius:"50%",
          background:"linear-gradient(135deg,#3b82f6,#8b5cf6)",
          border:"none", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 4px 20px rgba(59,130,246,0.5)",
          color:"#fff", fontSize:"22px",
        }}
      >
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {open ? <FaTimes /> : <FaRobot />}
        </motion.div>
        {!open && (
          <motion.div
            style={{
              position:"absolute", inset:"-4px", borderRadius:"50%",
              border:"2px solid rgba(59,130,246,0.4)",
            }}
            animate={{ scale:[1,1.3,1], opacity:[0.6,0,0.6] }}
            transition={{ duration:2, repeat:Infinity }}
          />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, scale:0.85, y:20 }}
            animate={{ opacity:1, scale:1,    y:0  }}
            exit={{    opacity:0, scale:0.85, y:20  }}
            transition={{ type:"spring", damping:22, stiffness:280 }}
            style={{
              position:"fixed", bottom:"100px", right:"28px", zIndex:9998,
              width:"min(380px, calc(100vw - 40px))",
              height:"min(520px, calc(100vh - 140px))",
              borderRadius:"20px", background:bgCard,
              border:`1px solid ${border}`,
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.6)"
                : "0 20px 60px rgba(0,0,0,0.15)",
              display:"flex", flexDirection:"column", overflow:"hidden",
            }}
          >
            {/* Header */}
            <div style={{
              background:bgHeader, padding:"14px 16px",
              borderBottom:`1px solid ${border}`,
              display:"flex", alignItems:"center", gap:"12px", flexShrink:0,
            }}>
              <div style={{
                width:"40px", height:"40px", borderRadius:"50%",
                background:"linear-gradient(135deg,#3b82f6,#8b5cf6)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"18px", color:"#fff", flexShrink:0,
              }}><FaRobot /></div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{
                  fontSize:"14px", fontWeight:700, margin:0,
                  color: isDark ? "#e2e8f0" : "#0a0e27",
                }}>Ask about Prikshit</p>
                <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                  <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#22c55e" }}/>
                  <p style={{ fontSize:"11px", color:"#22c55e", margin:0, fontWeight:500 }}>AI Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background:"none", border:"none", cursor:"pointer",
                color: isDark ? "#94a3b8" : "#64748b", fontSize:"16px", padding:"4px",
              }}><FaTimes /></button>
            </div>

            {/* Messages */}
            <div style={{
              flex:1, overflowY:"auto", padding:"14px 14px 0",
              scrollbarWidth:"thin",
              scrollbarColor: isDark ? "#334155 transparent" : "#cbd5e1 transparent",
            }}>
              {messages.map((msg, i) => <Bubble key={i} msg={msg} isDark={isDark} />)}
              {loading && <Typing isDark={isDark} />}

              {/* Error banner */}
              {error && (
                <motion.div
                  initial={{ opacity:0, y:6 }}
                  animate={{ opacity:1, y:0 }}
                  style={{
                    background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)",
                    borderRadius:"10px", padding:"8px 12px", marginBottom:"10px",
                    fontSize:"12px", color:"#ef4444", textAlign:"center",
                  }}
                >
                  {error}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSugg && (
                <motion.div
                  initial={{ opacity:0, height:0 }}
                  animate={{ opacity:1, height:"auto" }}
                  exit={{ opacity:0, height:0 }}
                  style={{ padding:"10px 14px 0", overflow:"hidden" }}
                >
                  <p style={{
                    fontSize:"11px", fontWeight:600, marginBottom:"8px",
                    color: isDark ? "#64748b" : "#94a3b8",
                    textTransform:"uppercase", letterSpacing:"0.05em",
                  }}>Suggested</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                    {SUGGESTIONS.map(s => (
                      <button key={s} onClick={() => sendMessage(s)} style={{
                        padding:"5px 11px", borderRadius:"20px",
                        border:`1px solid ${border}`,
                        background: isDark ? "#1e293b" : "#f1f5f9",
                        color:      isDark ? "#93c5fd" : "#3b82f6",
                        fontSize:"11.5px", cursor:"pointer", fontWeight:500,
                        transition:"all 0.15s", whiteSpace:"nowrap",
                      }}
                      onMouseEnter={e => e.target.style.background = isDark ? "#1e3a5f" : "#dbeafe"}
                      onMouseLeave={e => e.target.style.background = isDark ? "#1e293b" : "#f1f5f9"}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div style={{
              padding:"12px 14px", borderTop:`1px solid ${border}`,
              display:"flex", gap:"8px", alignItems:"flex-end",
              flexShrink:0, background:bgCard,
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything about Prikshit..."
                rows={1}
                style={{
                  flex:1, padding:"10px 14px", borderRadius:"14px",
                  border:`1px solid ${border}`,
                  background: isDark ? "#1e293b" : "#f8faff",
                  color:      isDark ? "#e2e8f0" : "#0a0e27",
                  fontSize:"13.5px", resize:"none", outline:"none",
                  fontFamily:"'Segoe UI',sans-serif", lineHeight:1.5,
                  maxHeight:"100px", overflowY:"auto",
                  transition:"border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                onBlur={e  => e.target.style.borderColor = border}
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{
                  width:"40px", height:"40px", borderRadius:"12px",
                  border:"none",
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg,#3b82f6,#6366f1)"
                    : isDark ? "#1e293b" : "#e2e8f0",
                  color: input.trim() && !loading ? "#fff" : isDark ? "#475569" : "#94a3b8",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"15px", flexShrink:0, transition:"all 0.2s",
                  boxShadow: input.trim() && !loading ? "0 2px 10px rgba(59,130,246,0.35)" : "none",
                }}
              >
                <FaPaperPlane />
              </motion.button>
            </div>

            <p style={{
              textAlign:"center", fontSize:"10px", padding:"4px 0 8px",
              flexShrink:0, color: isDark ? "#334155" : "#cbd5e1",
            }}>
              Powered by Claude AI · Prikshit Gautam Portfolio
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
