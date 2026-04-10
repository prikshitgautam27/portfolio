import { useState } from 'react';
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

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Glowing cursor — always mounted, auto-hides on mobile */}
      <CursorFollower />

      {/* Cinematic intro loader */}
      <PageLoader onComplete={() => setLoading(false)} />

      {/* Main site — revealed after loader */}
      {!loading && (
        <div style={{ cursor: 'none' }}>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
          <Footer />

          {/* AI Chatbot — fixed floating button */}
          <AskPrikshit />
        </div>
      )}
    </>
  );
}

export default App;
