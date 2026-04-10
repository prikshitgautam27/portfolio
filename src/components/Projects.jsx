import { motion } from "framer-motion";
import { FaGithub } from 'react-icons/fa';

function Projects() {
  const projects = [
    {
      title: "AI Road Intelligence — Real-Time Traffic Anomaly Detection",
      description:
        "A real-time traffic congestion and anomaly detection system using YOLOv8, SUMO simulation, and computer vision pipelines. Processes live traffic feeds at 45 FPS with <50ms latency.",
      tech: ["YOLOv8", "SUMO", "Computer Vision", "Real-time"],
      metrics: "45 FPS processing, <50ms latency, 12% faster emergency response",
      github: "https://github.com/prathamhanda/AI-RoadIntelligence",
      mediaType: "video",
      media: "/traffic-demo.mp4"
    },
    {
      title: "VisionCARE AI — Cataract Detection & Diagnostic Reporting",
      description:
        "A Streamlit-based medical diagnostic system using ensemble CNN models for cataract detection. Includes automated preprocessing, diagnostic report generation, and a public dashboard for clinics.",
      tech: ["CNN", "Keras", "Streamlit", "Ensemble Learning"],
      metrics: "High diagnostic accuracy, automated reporting, clinic-ready workflow",
      github: "https://github.com/prikshitgautam27/Vision_CARE_AI",
      mediaType: "video",
      media: "/visioncare-demo.mp4"
    },
    {
      title: "AI-Powered Healthcare Assistant (RAG + LangChain)",
      description:
        "A medical chatbot using LangChain, FAISS vector store, and LLMs to answer healthcare queries with high relevance. Supports 2050+ medical topics with improved retrieval accuracy.",
      tech: ["LLM", "RAG", "FAISS", "LangChain", "Hugging Face"],
      metrics: "40% relevance improvement, 2050+ medical topics",
      github: "https://github.com/prikshitgautam27/AI_powered_healthcare",
      mediaType: "image",
      media: "/healthcare-demo.jpg"
    },
    {
      title: "Cloud-Based File Management System (AWS S3 + Flask)",
      description:
        "A secure, scalable cloud file management system enabling upload, download, versioning, and multi-region replication using AWS S3. Includes IAM authentication and EC2 deployment.",
      tech: ["AWS S3", "EC2", "Flask", "IAM", "Python"],
      metrics: "Multi-region replication, secure IAM access, version tracking",
      github: "https://github.com/prikshitgautam27/AWS_S3_E2",
      mediaType: "video",
      media: "/aws-demo.mp4"
    },
    {
      title: "Full Stack AI Web App — Login Microservice & Dashboard",
      description:
        "A full-stack application built with React frontend, Node.js + Express backend, and MongoDB/MySQL database. Features an AWS Lambda-powered login microservice with JWT auth, Tailwind CSS UI, and scalable REST APIs.",
      tech: ["React", "Node.js", "Express", "MongoDB", "AWS Lambda", "Tailwind CSS", "MySQL"],
      metrics: "Serverless auth microservice, JWT secured, responsive UI",
      github: "https://github.com/prikshitgautam27",
      mediaType: "none",
      media: ""
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
              className="rounded-xl border border-blue-500/20 hover:border-blue-400 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              style={{ backgroundColor: 'var(--card-bg)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
            >
              {/* Media Preview */}
              {project.mediaType !== "none" && (
                <div className="border-b border-blue-500/10">
                  {project.mediaType === "video" ? (
                    <video
                      src={project.media}
                      controls
                      className="w-full"
                      style={{ maxHeight: '220px', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={project.media}
                      alt="demo"
                      className="w-full"
                      style={{ maxHeight: '220px', objectFit: 'cover' }}
                    />
                  )}
                </div>
              )}

              {/* No media placeholder */}
              {project.mediaType === "none" && (
                <div className="w-full h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center border-b border-blue-500/10">
                  <span className="text-blue-400/60 text-sm font-medium tracking-wide uppercase">Full Stack Project</span>
                </div>
              )}

              <div className="p-6 sm:p-8">
                <h3
                  className="text-lg sm:text-xl font-bold text-blue-400 mb-3"
                >
                  {project.title}
                </h3>

                <p
                  className="text-sm sm:text-base mb-4 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {project.description}
                </p>

                <div className="mb-4">
                  <p className="text-sm text-purple-400 font-semibold mb-1">Key Metrics:</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{project.metrics}</p>
                </div>

                {/* ── Tech pills — uses CSS var for both modes ── */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="tech-pill text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-medium text-sm"
                  >
                    <FaGithub /> View Code
                  </a>
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
