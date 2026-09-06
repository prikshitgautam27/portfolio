import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import * as pdfjsLib from "pdfjs-dist";

// Point pdf.js at a worker matching the installed package version.
// Using cdnjs here avoids needing extra webpack config in Create React App.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const RESUME_PATH = "/resume.pdf";

export default function ResumeViewer({ open, onClose }) {
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const containerRef = useRef(null);
  const renderedRef   = useRef(false);

  useEffect(() => {
    if (!open || renderedRef.current) return;
    renderedRef.current = true;

    let cancelled = false;
    setLoading(true);
    setError("");

    const renderPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(RESUME_PATH).promise;
        if (cancelled) return;
        setNumPages(pdf.numPages);

        const container = containerRef.current;
        container.innerHTML = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.marginBottom = "12px";
          canvas.style.borderRadius = "8px";
          canvas.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";

          const ctx = canvas.getContext("2d");
          await page.render({ canvasContext: ctx, viewport }).promise;

          if (cancelled) return;
          container.appendChild(canvas);
        }

        if (!cancelled) setLoading(false);
      } catch (err) {
        console.error("Resume render error:", err);
        if (!cancelled) {
          setError("Couldn't load the resume right now. Please try again shortly.");
          setLoading(false);
        }
      }
    };

    renderPdf();
    return () => { cancelled = true; };
  }, [open]);

  // Reset so it re-renders cleanly if closed and reopened
  useEffect(() => {
    if (!open) renderedRef.current = false;
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 9997,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(720px, 100%)",
              maxHeight: "90vh",
              background: "#1a1f2e",
              borderRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}>
              <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "15px", margin: 0 }}>
                Resume — View Only
              </p>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: "rgba(255,255,255,0.08)", border: "none",
                  color: "#e2e8f0", width: "32px", height: "32px", borderRadius: "8px",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Scrollable page area, watermarked */}
            <div style={{ position: "relative", overflowY: "auto", padding: "20px", flex: 1 }}>
              {loading && (
                <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>
                  Loading resume…
                </p>
              )}
              {error && (
                <p style={{ color: "#f87171", textAlign: "center", padding: "40px 0" }}>
                  {error}
                </p>
              )}
              <div ref={containerRef} />

              {/* Repeating diagonal watermark — deters reuse if screenshotted */}
              {!loading && !error && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    display: "flex", flexWrap: "wrap", alignContent: "space-around",
                    justifyContent: "space-around", overflow: "hidden",
                    transform: "rotate(-28deg) scale(1.4)",
                  }}
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} style={{
                      color: "rgba(255,255,255,0.08)",
                      fontSize: "13px", fontWeight: 700, whiteSpace: "nowrap",
                    }}>
                      Prikshit Gautam · View Only
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p style={{
              textAlign: "center", fontSize: "11px", color: "#475569",
              padding: "8px 0 12px", flexShrink: 0,
            }}>
              For a downloadable copy, please request it via the Contact form.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
