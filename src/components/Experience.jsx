import { motion } from 'framer-motion';

function Experience() {
  const experiences = [
    {
      title: "LLM Intern",
      company: "Edunet Foundation",
      date: "Jan 2025 - Feb 2025",
      achievements: [
        "Spearheaded NLP chatbot development with 90% intent accuracy",
        "Reduced API response latency by 25%",
        "Optimized inference pipeline and deployment"
      ]
    },
    {
      title: "Summer Project Intern",
      company: "Experiential-Learning Centre, TIET",
      date: "Jun 2025 - Jul 2025",
      achievements: [
        "Developed computer vision system detecting roadway hazards with YOLOv8",
        "Achieved 89.7% mAP with 15ms inference time reduction",
        "Presented to 10+ faculty members with commendation"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-darkGray">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-blue-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-dark p-8 rounded-lg border-l-4 border-blue-400 hover:shadow-lg transition"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">{exp.title}</h3>
                  <p className="text-gray-400">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500 bg-darkGray px-4 py-2 rounded">{exp.date}</span>
              </div>
              
              <ul className="space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start">
                    <span className="text-blue-400 mr-3">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;