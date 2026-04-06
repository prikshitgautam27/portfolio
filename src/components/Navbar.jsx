import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-scroll';

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-darkGray/80 backdrop-blur-md z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">Prikshit</h1>
        
        <div className="flex gap-8">
          <Link to="home" smooth className="cursor-pointer hover:text-blue-400 transition">Home</Link>
          <Link to="about" smooth className="cursor-pointer hover:text-blue-400 transition">About</Link>
          <Link to="skills" smooth className="cursor-pointer hover:text-blue-400 transition">Skills</Link>
          <Link to="projects" smooth className="cursor-pointer hover:text-blue-400 transition">Projects</Link>
          <Link to="contact" smooth className="cursor-pointer hover:text-blue-400 transition">Contact</Link>
        </div>

        <div className="flex gap-4 text-xl">
          <a href="https://github.com/prikshitgautam27" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaLinkedin />
          </a>
          <a href="mailto:pgautamlinkedin@gmail.com" className="hover:text-blue-400 transition">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;