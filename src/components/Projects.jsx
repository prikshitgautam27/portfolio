import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function Projects() {
  const projects = [
    {
      title: "5G Latency Predictor — Real-World Delay Forecasting",
      description:
        "Analyzed 40,000+ real-world 5G packet traces from KTH Expeca testbed (Sweden), identifying RLC frame alignment as root cause of latency. Designed and benchmarked three neural architectures (RNN, LSTM, Hybrid LSTM), achieving 95% accuracy in forecasting IP delay.",
      tech: ["PyTorch", "Keras", "LSTM", "RNN", "Statistical Analysis", "Python"],
      metrics: "95% forecasting accuracy · 45% reduced prediction variance · 40K+ real traces",
      github: "https://github.com/prikshitgautam27",
      live: "https://forcasting-5g.vercel.app/",
      mediaType: "none",
      media: "",
      badge: "Research Project",
      date: "Aug 2024 – Jul 2025",
    },
    {
      title: "AI Road Intelligence — Real-Time Traffic Anomaly Detection",
      description:
        "A real-time traffic congestion and anomaly detection system using YOLOv8, SUMO simulation, and computer vision pipelines. Processes live traffic feeds at 45 FPS with <50ms latency.",
      tech: ["YOLOv8", "SUMO", "Computer Vision", "Real-time"],
      metrics: "45 FPS processing · <50ms latency · 12% faster emergency response",
      github: "https://github.com/prathamhanda/AI-RoadIntelligence",
      live: null,
      mediaType: "video",
      media: "/traffic-demo.mp4",
      badge: null,
      date: null,
    },
    {
      title: "VisionCARE AI — Cataract Detection & Diagnostic Reporting",
      description:
        "A Streamlit-based medical diagnostic system using ensemble CNN models for cataract detection. Includes automated preprocessing, diagnostic report generation, and a public dashboard for clinics.",
      tech: ["CNN", "Keras", "Streamlit", "Ensemble Learning"],
      metrics: "High diagnostic accuracy · Automated reporting · Clinic-ready workflow",
      github: "https://github.com/prikshitgautam27/Vision_CARE_AI",
      live: null,
      mediaType: "video",
      media: "/visioncare-demo.mp4",
      badge: null,
      date: null,
    },
    {
      title: "AI-Powered Healthcare Assistant (RAG + LangChain)",
      description:
        "A medical chatbot using LangChain, FAISS vector store, and LLMs to answer healthcare queries with high relevance. Supports 2050+ medical topics with improved retrieval accuracy.",
      tech: ["LLM", "RAG", "FAISS", "LangChain", "Hugging Face"],
      metrics: "40% relevance improvement · 2050+ medical topics",
      github: "https://github.com/prikshitgautam27/AI_powered_healthcare",
      live: null,
      mediaType: "image",
      media: "/healthcare-demo.jpg",
      badge: null,
      date: null,
    },
    {
      title: "Cloud-Based File Management System (AWS S3 + Flask)",
      description:
        "A secure, scalable cloud file management system enabling upload, download, versioning, and multi-region replication using AWS S3. Includes IAM authentication and EC2 deployment.",
      tech: ["AWS S3", "EC2", "Flask", "IAM", "Python"],
      metrics: "Multi-region replication · Secure IAM access · Version tracking",
      github: "https://github.com/prikshitgautam27/AWS_S3_E2",
      live: null,
      mediaType: "video",
      media: "/aws-demo.mp4",
      badge: null,
      date: null,
    },
    {
      title: "Full Stack AI Web App — Login Microservice & Dashboard",
      description:
        "A full-stack application built with React frontend, Node.js + Express backend, and MongoDB/MySQL database. Features an AWS Lambda-powered login microservice with JWT auth, Tailwind CSS UI, and scalable REST APIs.",
      tech: ["React", "Node.js", "Express", "MongoDB", "AWS Lambda", "Tailwind CSS", "MySQL"],
      metrics: "Serverless auth microservice · JWT secured · Responsive UI",
      github: "https://github.com/prikshitgautam27",
      live: null,
      mediaType: "none",
      media: "",
      badge: null,
      date: null,
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 bg-dark relative">
      <div className="max-w-6xl mx-auto relative z-10">

        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-blue-500/20 hover:border-blue-400 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col"
              style={{ backgroundColor: 'var(--card-bg)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Media Preview */}
              {project.mediaType === "video" && (
                <div className="border-b border-blue-500/10 flex-shrink-0">
                  <video
                    src={project.media}
                    controls
                    className="w-full"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {project.mediaType === "image" && (
                <div className="border-b border-blue-500/10 flex-shrink-0">
                  <img
                    src={project.media}
                    alt="demo"
                    className="w-full"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Placeholder for no media */}
              {project.mediaType === "none" && (
                <div
                  className="w-full flex items-center justify-between px-5 border-b border-blue-500/10 flex-shrink-0"
                  style={{
                    height: '64px',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
                  }}
                >
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: 'var(--pill-text)' }}
                  >
                    {project.badge || "Project"}
                  </span>
                  {project.date && (
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {project.date}
                    </span>
                  )}
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1">

                <h3 className="text-base sm:text-lg font-bold text-blue-400 mb-3 leading-snug">
                  {project.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-4 flex-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(59,130,246,0.05)', borderLeft: '3px solid rgba(59,130,246,0.4)' }}>
                  <p className="text-xs text-purple-400 font-semibold mb-0.5 uppercase tracking-wide">Key Metrics</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{project.metrics}</p>
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="tech-pill text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-blue-300"
                    style={{ color: 'var(--pill-text)' }}
                  >
                    <FaGithub className="text-base" /> Code
                  </a>

                  {/* Live link — only shown when project has one */}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        color: '#ffffff',
                        boxShadow: '0 2px 10px rgba(59,130,246,0.35)',
                      }}
                    >
                      <FaExternalLinkAlt className="text-xs" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
