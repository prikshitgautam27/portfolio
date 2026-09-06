import React from "react";
import { motion } from "framer-motion";

function Experience() {
  const certLink = "https://drive.google.com/file/d/1JkjuXKov3ZctLbzAqPhJj5_vqDpC7ajS/view";
  const summerLink =
    "https://www.linkedin.com/in/prikshitgautam0055/overlay/Position/2670844711/treasury/?profileId=ACoAAE5WtwMBgjs00NkBw8Xsn05GsNGnkgxUqig";
  const ugResearchLink = "https://forecasting-5g.vercel.app/";

  const experiences = [
    {
      date: "Aug 2024 – May 2025",
      title: "Undergraduate Research Assistant",
      company: "TIET, Patiala",
      description:
        "Forecasted 5G latency using hybrid LSTM achieving R² ≈ 0.91 and optimized deployment via tf2onnx reducing RAM usage by 80%.",
      highlight: (
        <>
          Published work under journal review for 5G delay forecasting —{" "}
          <a
            href={ugResearchLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:opacity-90 transition-opacity"
          >
            Live Project
          </a>
        </>
      ),
      tags: ["PyTorch", "Keras", "Flask", "ONNX Runtime"],
    },
    {
      date: "Jan 2025 – Feb 2025",
      title: "LLM Intern",
      company: "Edunet Foundation",
      description:
        "Engineered a healthcare RAG pipeline with sub‑second response time and optimized inference for real‑time medical queries.",
      highlight: (
        <>
          Selected for enterprise accelerator co‑sponsored by{" "}
          <a
            href={certLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-semibold mx-1 hover:opacity-90 transition-opacity"
          >
            Microsoft
          </a>
          {" & "}
          <a
            href={certLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-semibold mx-1 hover:opacity-90 transition-opacity"
          >
            SAP
          </a>
        </>
      ),
      tags: ["LangChain", "FAISS", "Streamlit", "Groq LPU"],
    },
    {
      date: "Jun 2025 – Jul 2025",
      title: "Summer Project Intern",
      company: "Experiential Learning Centre, TIET",
      description:
        "Developed YOLOv8‑based hazard detection system for roadway safety and validated system integration before 10+ faculty reviewers.",
      highlight: (
        <>
          <a
            href={summerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:opacity-90 transition-opacity"
          >
            View Project
          </a>{" "}
          |{" "}
          <a
            href={certLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:opacity-90 transition-opacity"
          >
            Credential
          </a>
        </>
      ),
      tags: ["YOLOv8", "OpenCV", "SUMO", "TraCI"],
    },
  ];

  return (
    <section
      id="experience"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-darkGray transition-colors duration-300 relative overflow-hidden"
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 border-t-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>

      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-12 md:mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Tracing the Arc…
        </motion.h2>

        {/* Timeline line */}
        <div className="relative flex flex-col md:flex-row items-stretch md:items-center justify-center gap-10 md:gap-6">
          {/* Horizontal line — desktop/tablet row layout only */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full border-t-2 border-blue-400"></div>
          {/* Vertical line — mobile stacked layout only */}
          <div className="md:hidden absolute left-3 top-0 bottom-0 w-0.5 bg-blue-400"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-md rounded-xl p-5 sm:p-6 w-full md:w-[26%] ml-8 md:ml-0 border border-gray-200 hover:shadow-xl hover:border-blue-400 transition-all duration-300 dark:bg-[var(--card-bg)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot — desktop: top center */}
              <div className="hidden md:block absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-[var(--bg-secondary)]"></div>
              {/* Timeline dot — mobile: left edge, aligned to vertical line */}
              <div className="md:hidden absolute top-6 -left-[29px] w-4 h-4 bg-blue-500 rounded-full border-4 border-[var(--bg-secondary)]"></div>

              <p className="text-xs sm:text-sm text-gray-500 mb-2">{exp.date}</p>
              <h3 className="text-lg sm:text-xl font-bold text-blue-600">{exp.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-2">{exp.company}</p>
              <p className="text-sm sm:text-base text-gray-700 mb-3">{exp.description}</p>
              <p className="text-sm sm:text-base text-gray-700 mb-3">{exp.highlight}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {exp.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs tech-pill px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
  