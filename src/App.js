import { useState } from 'react';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import About        from './components/About';
import Skills       from './components/Skills';
import Experience   from './components/Experience';
import Projects     from './components/Projects';
import Contact      from './components/Contact';
import Footer       from './components/Footer';
import PageLoader      from './components/PageLoader';
import CursorFollower  from './components/CursorFollower';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* ── Glowing cursor (always mounted, hides on mobile automatically) ── */}
      <CursorFollower />

      {/* ── Cinematic intro loader ── */}
      <PageLoader onComplete={() => setLoading(false)} />

      {/* ── Main site — hidden until loader finishes ── */}
      {!loading && (
        <div style={{ cursor: 'none' }}>  {/* hide default cursor while custom one is active */}
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
