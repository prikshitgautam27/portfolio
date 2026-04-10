import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  /* ── Apply theme class to <html> ── */
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [darkMode]);

  /* ── Shrink navbar shadow on scroll ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Auto-close mobile menu on desktop resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navLinks = [
    { id: 'home',       label: 'Home' },
    { id: 'about',      label: 'About' },
    { id: 'skills',     label: 'Skills' },
    { id: 'projects',   label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact',    label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-darkGray/95 shadow-lg py-3' : 'bg-darkGray/80 py-4'
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">

        {/* ── Logo ── */}
        <Link
          to="home"
          smooth
          className="cursor-pointer text-lg sm:text-xl font-bold text-blue-400 hover:text-blue-300 transition select-none"
        >
          Prikshit<span className="text-white">.</span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <div className="hidden md:flex gap-5 lg:gap-8 items-center">
          {navLinks.map(({ id, label }) => (
            <Link
              key={id}
              to={id}
              smooth
              offset={-80}
              className="cursor-pointer text-sm lg:text-base text-gray-300 hover:text-blue-400 transition-colors duration-200 relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 rounded-full transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* ── Desktop: Socials + Theme toggle ── */}
        <div className="hidden md:flex gap-3 items-center">
          <a href="https://github.com/prikshitgautam27" target="_blank" rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition text-lg" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/prikshit-gautam" target="_blank" rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition text-lg" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="mailto:pgautamlinkedin@gmail.com"
            className="text-gray-400 hover:text-blue-400 transition text-lg" aria-label="Email">
            <FaEnvelope />
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-1 p-2 rounded-full border border-blue-400/40 hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {darkMode
              ? <FaSun className="text-yellow-400 text-sm" />
              : <FaMoon className="text-blue-400 text-sm" />}
          </button>
        </div>

        {/* ── Mobile: Theme toggle + Hamburger ── */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-full border border-blue-400/40 hover:border-blue-400 transition"
            aria-label="Toggle theme"
          >
            {darkMode
              ? <FaSun className="text-yellow-400 text-xs" />
              : <FaMoon className="text-blue-400 text-xs" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-white hover:text-blue-400 transition text-xl"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown (smooth slide) ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-darkGray/98 backdrop-blur-md px-4 pb-6 pt-2 border-t border-blue-500/20 flex flex-col">
          {navLinks.map(({ id, label }) => (
            <Link
              key={id}
              to={id}
              smooth
              offset={-80}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer text-base text-gray-300 hover:text-blue-400 transition-colors py-3 border-b border-white/5 last:border-b-0 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 flex-shrink-0" />
              {label}
            </Link>
          ))}
          <div className="flex gap-5 text-xl pt-4 mt-1">
            <a href="https://github.com/prikshitgautam27" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"><FaGithub /></a>
            <a href="https://linkedin.com/in/prikshit-gautam" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"><FaLinkedin /></a>
            <a href="mailto:pgautamlinkedin@gmail.com"
              className="text-gray-400 hover:text-blue-400 transition"><FaEnvelope /></a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
