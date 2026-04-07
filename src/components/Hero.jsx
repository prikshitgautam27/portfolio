import { motion } from 'framer-motion';

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 px-6 bg-gradient-to-b from-dark to-darkGray relative"
    >
      {/* Soft spotlight background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl relative z-10"
      >
        {/* Profile Picture with Glow */}
        <motion.div
          className="flex justify-center mb-8 relative"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow behind photo */}
          <div className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-40"></div>

          {/* Floating animation */}
          <motion.img
            src="/profile.jpeg"
            alt="Prikshit Gautam"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-xl relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Prikshit Gautam
        </motion.h1>

        {/* Title */}
        <motion.h2
          className="text-3xl text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Machine Learning Engineer | Product Focus
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Building AI solutions that solve real-world problems. Passionate about NLP, Computer Vision & Scalable Solutions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="#contact"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold transition"
          >
            Get In Touch
          </a>

          <a
            href="https://github.com/prikshitgautam27"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-blue-400 hover:bg-blue-400/10 rounded-lg font-bold transition"
          >
            View Projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
