import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import GitHubHeatmap from './GitHubHeatmap';
import TechRibbon from './TechRibbon';

const roles = [
  "Machine Learning Engineer",
  "NLP Specialist",
  "Computer Vision Engineer",
  "Full Stack AI Developer",
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
      className="min-h-screen flex flex-col justify-center pt-20 pb-0 bg-gradient-to-b from-dark to-darkGray relative overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-60 md:w-80 h-60 md:h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── TOP: Two-column hero ── */}
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 px-4 sm:px-6 md:px-16 py-10">

        {/* LEFT: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center order-2 md:order-1 text-center md:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-5 w-fit mx-auto md:mx-0"
          >
            <span className="px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">
              Full Stack AI Developer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
            style={{ color: 'var(--text-primary)' }}
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
          <div className="flex items-center gap-3 mb-5 h-9 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-base sm:text-lg text-blue-400 font-semibold"
            >
              {roles[index]}
            </motion.span>
          </div>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg leading-relaxed mb-7 max-w-lg mx-auto md:mx-0"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Hi, I'm{' '}
            <span style={{ color: 'var(--text-primary)' }} className="font-semibold">Prikshit Gautam</span>.
            I build AI solutions that solve real-world problems — from NLP chatbots
            and computer vision systems to full-stack web apps with React, Node.js &amp; AWS.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="#projects"
              className="px-6 sm:px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-white transition-all duration-200 hover:scale-105 text-sm sm:text-base"
            >
              View My Work →
            </a>
            <a
              href="https://raw.githubusercontent.com/prikshitgautam27/portfolio/main/public/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 border border-blue-400/50 hover:border-blue-400 hover:bg-blue-400/10 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
              style={{ color: 'var(--text-primary)' }}
            >
              Download CV ↓
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-6 sm:gap-8 mt-8 pt-6 border-t justify-center md:justify-start"
            style={{ borderColor: 'var(--border-color)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { num: '4',      label: 'Projects shipped' },
              { num: '2',      label: 'Internships' },
              { num: 'Top 4%', label: 'Adobe Hackathon' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{num}</p>
                <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Photo */}
        <motion.div
          className="relative flex justify-center order-1 md:order-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl scale-105 pointer-events-none" />
          <motion.div
            className="relative w-full max-w-[300px] sm:max-w-sm md:max-w-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-60 blur-sm" />
            <div className="relative bg-darkGray rounded-2xl overflow-hidden">
              <img
                src="https://raw.githubusercontent.com/prikshitgautam27/portfolio/main/public/profile.jpeg"
                alt="Prikshit Gautam"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[560px] object-cover object-top rounded-2xl"
              />
              <div className="availability-badge absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-blue-400/20 flex items-center gap-2 sm:gap-3">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <div>
                  <p className="badge-title font-semibold text-xs sm:text-sm">Available for Opportunities</p>
                  <p className="badge-sub text-xs hidden sm:block">Open to internships &amp; collaborations</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BOTTOM FULL-WIDTH SECTION ── */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-16 pb-6">
        <div className="max-w-7xl mx-auto">

          {/* Divider */}
          <div className="w-full h-px mb-8" style={{ background: 'var(--border-color)' }} />

          {/* GitHub Heatmap */}
          <GitHubHeatmap />

        </div>
      </div>

      {/* ── TECH RIBBON — full bleed, no padding ── */}
      <div className="relative z-10 w-full pb-10">
        <motion.p
          className="text-center text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.p>
        <TechRibbon />
      </div>

    </section>
  );
}

export default Hero;
