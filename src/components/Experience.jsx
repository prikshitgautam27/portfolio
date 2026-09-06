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
    <section id="experience" className="py-20 px-6" style={{ backgroundColor: "#E8EEFC" }}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Tracing the Arc…
        </motion.h2>

        {/* Timeline line */}
        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 left-0 w-full border-t-2 border-blue-400"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-md rounded-xl p-6 w-[22%] border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-[#E8EEFC]"></div>

              <p className="text-sm text-gray-500 mb-2">{exp.date}</p>
              <h3 className="text-xl font-bold text-blue-600">{exp.title}</h3>
              <p className="text-gray-600 mb-2">{exp.company}</p>
              <p className="text-gray-700 mb-3">{exp.description}</p>
              <p className="text-gray-700 mb-3">{exp.highlight}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {exp.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-300"
                  >
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
