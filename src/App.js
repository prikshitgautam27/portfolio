import { useState, useCallback } from 'react';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import About           from './components/About';
import Skills          from './components/Skills';
import Experience      from './components/Experience';
import Projects        from './components/Projects';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import PageLoader      from './components/PageLoader';
import CursorFollower  from './components/CursorFollower';
import AskPrikshit     from './components/AskPrikshit';

/*
  KEY FIX:
  - Site is ALWAYS mounted in the DOM (never conditionally rendered)
  - It starts with visibility:hidden so it takes up layout but is invisible
  - When loader finishes, we flip to visibility:visible + fade in
  - This means Hero's framer-motion animations only fire AFTER loader exits
  - No double animation, no flash, no conflict
*/

export default function App() {
  const [siteVisible, setSiteVisible] = useState(false);

  const handleLoaderDone = useCallback(() => {
    setSiteVisible(true);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <CursorFollower />

      {/* Loader — pure CSS, no framer-motion conflicts */}
      <PageLoader onComplete={handleLoaderDone} />

      {/* Site — hidden until loader done, then fades in */}
      <div
        style={{
          visibility: siteVisible ? "visible" : "hidden",
          opacity:    siteVisible ? 1 : 0,
          transition: siteVisible ? "opacity 0.5s ease 0.1s" : "none",
          cursor:     "none",
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
        <AskPrikshit />
      </div>
    </>
  );
}
