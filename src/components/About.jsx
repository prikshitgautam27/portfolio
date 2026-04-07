import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="py-24 px-6 bg-darkGray relative">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>

        {/* Main Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          {/* Left Side — Text */}
          <div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I'm <span className="text-blue-400 font-semibold">Prikshit Gautam</span>, a Machine Learning Engineer passionate about building AI systems that create real-world impact.  
            </p>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I specialize in <span className="text-purple-400 font-semibold">NLP, Computer Vision, and Time Series Forecasting</span>.  
              My work focuses on designing intelligent, scalable, and efficient solutions.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              Currently pursuing my B.E. in <span className="text-blue-400 font-semibold">Electronics and Computer Engineering</span> at Thapar Institute (2023–2027), I combine strong academic foundations with hands-on project experience.
            </p>
          </div>

          {/* Right Side — Quick Facts Card */}
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-xl shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-darkGray p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-blue-300">Quick Facts</h3>

              <ul className="space-y-4 text-gray-300 text-lg">
                <li>📍 <strong className="text-white">Location:</strong> Patiala, Punjab</li>
                <li>🎓 <strong className="text-white">College:</strong> Thapar Institute (2023–2027)</li>
                <li>💡 <strong className="text-white">Skills:</strong> NLP, CV, ML, Deep Learning</li>
                <li>🏆 <strong className="text-white">Achievement:</strong> Adobe Hackathon — Top 4029 / 115,000</li>
              </ul>

              {/* Achievement Photo */}
              <motion.div
                className="mt-6 rounded-lg overflow-hidden border border-blue-500/30"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <img
                  src="https://raw.githubusercontent.com/prikshitgautam27/portfolio/main/public/achievement2.jpeg"
                  alt="Academic Excellence Award Ceremony"
                  className="w-full rounded-lg"
                />
                <p className="text-xs text-gray-500 text-center py-2">
                  🏅 Academic Excellence Award Ceremony
                </p>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default About;