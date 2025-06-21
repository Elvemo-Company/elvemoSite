import React, { Suspense, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ParticleBackground from './components/ParticleBackground';

// Lazy loading components
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const PortfolioAll = React.lazy(() => import('./components/PortfolioAll'));
const Services = React.lazy(() => import('./components/Services'));
const Contact = React.lazy(() => import('./components/Contact'));
const ProjectPage = React.lazy(() => import('./components/ProjectPage'));
const LegalDocuments = React.lazy(() => import('./components/LegalDocuments'));
const UserSitemap = React.lazy(() => import('./components/UserSitemap'));

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

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-16 h-16 border-4 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Główny komponent aplikacji
const AppContent: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Ustawia język w atrybucie HTML dla globalnych stylów
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="relative min-h-screen bg-black text-white font-lexend">
      {/* Single global particle background with cursor effect */}
      <ParticleBackground density="high" fadeDirection="down" />
      
      {/* Content */}
      <div className="relative z-10">
        <HashHandler />
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
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