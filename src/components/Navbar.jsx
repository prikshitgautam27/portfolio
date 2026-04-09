import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0a0e27';
      document.body.style.color = '#ffffff';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f0f4ff';
      document.body.style.color = '#0a0e27';
    }
  }, [darkMode]);

  const navLinks = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

  return (
    <nav className="fixed top-0 w-full bg-darkGray/80 backdrop-blur-md z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-400">Prikshit Gautam</h1>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={link}
              smooth
              className="cursor-pointer capitalize hover:text-blue-400 transition"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}
        </div>

        {/* Desktop Right: Social + Toggle */}
        <div className="hidden md:flex gap-4 text-xl items-center">
          <a href="https://github.com/prikshitgautam27" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/prikshit-gautam" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaLinkedin />
          </a>
          <a href="mailto:pgautamlinkedin@gmail.com" className="hover:text-blue-400 transition">
            <FaEnvelope />
          </a>

          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-full border border-blue-400/40 hover:border-blue-400 hover:bg-blue-400/10 transition text-lg"
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-400" />}
          </button>
        </div>

        {/* Mobile Right: Toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full border border-blue-400/40 hover:border-blue-400 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun className="text-yellow-400 text-sm" /> : <FaMoon className="text-blue-400 text-sm" />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-white hover:text-blue-400 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-darkGray/95 backdrop-blur-md px-6 pb-6 flex flex-col gap-4 border-t border-blue-500/20">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={link}
              smooth
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer capitalize text-lg hover:text-blue-400 transition py-1 border-b border-white/5"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}

          {/* Social icons in mobile menu */}
          <div className="flex gap-5 text-xl pt-2">
            <a href="https://github.com/prikshitgautam27" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><FaGithub /></a>
            <a href="https://linkedin.com/in/prikshit-gautam" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><FaLinkedin /></a>
            <a href="mailto:pgautamlinkedin@gmail.com" className="hover:text-blue-400 transition"><FaEnvelope /></a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;