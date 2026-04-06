import { motion } from 'framer-motion';

function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "C++", "MATLAB", "SQL"]
    },
    {
      title: "Frameworks",
      skills: ["PyTorch", "scikit-learn", "NumPy", "Pandas", "Matplotlib"]
    },
    {
      title: "Tools",
      skills: ["Git", "MySQL", "Streamlit", "Hugging Face", "AWS", "YOLOv8"]
    },
    {
      title: "Core ML Skills",
      skills: ["NLP", "RAG", "Time Series Forecasting", "Computer Vision", "LLMs", "LSTM/RNN"]
    }
  ];

  return (
    <section id="skills" className="py-96 px-6 bg-dark">

      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-blue-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-darkGray p-6 rounded-lg border border-blue-500/30 hover:border-blue-400 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-400">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm font-semibold hover:scale-105 transition"
                  >
                    {skill}
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

export default Skills;