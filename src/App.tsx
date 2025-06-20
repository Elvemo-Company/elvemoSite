import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import PortfolioAll from './components/PortfolioAll';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProjectPage from './components/ProjectPage';
import LegalDocuments from './components/LegalDocuments';
import UserSitemap from './components/UserSitemap';
import ParticleBackground from './components/ParticleBackground';

// Osobny komponent do obsługi hasha
const HashHandler: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return null;
};

// Główny komponent aplikacji
const AppContent: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Single global particle background with cursor effect */}
      <ParticleBackground density="high" fadeDirection="down" />
      
      {/* Content */}
      <div className="relative z-10">
        <HashHandler />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <section id="hero">
                <Hero />
              </section>
              <About />
              <Portfolio />
              <Services />
              <Contact />
            </main>
          } />
          <Route path="/portfolio" element={<PortfolioAll />} />
          <Route path="/portfolio/:id" element={<ProjectPage />} />
          <Route path="/legal" element={<LegalDocuments />} />
          <Route path="/sitemap" element={<UserSitemap />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
};

export default App;

// Jeśli są widoczne teksty 'Vibbly', zamień na 'elvemo'.