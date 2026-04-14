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
import LeetCodeStats   from './components/LeetCodeStats';

export default function App() {
  const [siteVisible, setSiteVisible] = useState(false);

  const handleLoaderDone = useCallback(() => {
    setSiteVisible(true);
  }, []);

  return (
    <>
      <CursorFollower />
      <PageLoader onComplete={handleLoaderDone} />

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

        {/* ── LeetCode Stats — above Footer ── */}
        <section className="py-16 px-4 sm:px-6 md:px-16 bg-dark">
          <div className="max-w-6xl mx-auto">
            <p
              className="text-center text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: 'var(--text-muted)' }}
            >
              LeetCode Stats
            </p>
            <LeetCodeStats />
          </div>
        </section>

        <Footer />
        <AskPrikshit />
      </div>
    </>
  );
}
