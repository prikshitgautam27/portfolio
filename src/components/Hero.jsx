import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const roles = [
  "Machine Learning Engineer",
  "NLP Specialist",
  "Computer Vision Engineer",
  "AI Product Builder",
  "Deep Learning Enthusiast",
];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-12 px-6 md:px-16 bg-gradient-to-b from-dark to-darkGray relative overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* ── LEFT: Text Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 w-fit"
          >
            <span className="px-4 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-sm font-semibold tracking-wide uppercase">
              AI &amp; ML Engineer
            </span>
          </motion.div>

          {/* Big headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Building{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              intelligent
            </span>{' '}
            AI systems that matter.
          </motion.h1>

          {/* Cycling role */}
          <div className="flex items-center gap-3 mb-6 h-10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0"></span>
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-xl text-blue-400 font-semibold"
            >
              {roles[index]}
            </motion.span>
          </div>

          {/* Sub description */}
          <motion.p
            className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Hi, I'm <span className="text-white font-semibold">Prikshit Gautam</span>. I build AI solutions
            that solve real-world problems — from NLP chatbots to computer vision systems,
            combining strong ML fundamentals with practical engineering.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-white transition-all duration-200 hover:scale-105"
            >
              View My Work →
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-blue-400/50 hover:border-blue-400 hover:bg-blue-400/10 rounded-lg font-bold text-white transition-all duration-200 flex items-center gap-2"
            >
              Download CV ↓
            </a>
          </motion.div>

          {/* Social proof / quick stats */}
          <motion.div
            className="flex gap-8 mt-10 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div>
              <p className="text-2xl font-bold text-white">4</p>
              <p className="text-sm text-gray-500">Projects shipped</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">2</p>
              <p className="text-sm text-gray-500">Internships</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Top 4%</p>
              <p className="text-sm text-gray-500">Adobe Hackathon</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Large Photo ── */}
        <motion.div
          className="relative flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glow behind photo */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl scale-105 pointer-events-none"></div>

          {/* Photo container */}
          <motion.div
            className="relative w-full max-w-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Decorative border gradient */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-60 blur-sm"></div>

            <div className="relative bg-darkGray rounded-2xl overflow-hidden">
              <img
                src="/profile.jpeg"
                alt="Prikshit Gautam"
                className="w-full h-[500px] md:h-[580px] object-cover object-top rounded-2xl"
              />

              {/* Availability badge overlaid on photo */}
              <div className="absolute bottom-4 left-4 right-4 bg-dark/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"></span>
                <div>
                  <p className="text-white font-semibold text-sm">Available for Opportunities</p>
                  <p className="text-gray-400 text-xs">Open to internships &amp; collaborations</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
