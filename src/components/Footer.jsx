import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark py-16 px-6 border-t border-blue-500/20 relative">
      
      {/* Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent blur-3xl"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Social Icons */}
        <div className="flex justify-center gap-8 mb-8">
          <a
            href="mailto:pgautamlinkedin@gmail.com"
            className="text-gray-400 hover:text-blue-400 text-2xl transition"
          >
            <FaEnvelope />
          </a>

          <a
            href="https://linkedin.com/in/prikshit-gautam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 text-2xl transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/prikshitgautam27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 text-2xl transition"
          >
            <FaGithub />
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-blue-500/20 mb-8"></div>

        {/* Text */}
        <p className="text-gray-400 mb-2">
          © 2026 <span className="text-blue-400 font-semibold">Prikshit Gautam</span>. All rights reserved.
        </p>

        <p className="text-gray-500 text-sm">
          Machine Learning Engineer • Building Intelligent AI Systems
        </p>
      </div>
    </footer>
  );
}

export default Footer;
