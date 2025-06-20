import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navLinks = [
    { name: t.nav.home, href: '/#hero' },
    { name: t.nav.about, href: '/#about' },
    { name: t.nav.portfolio, href: '/#portfolio' },
    { name: t.nav.services, href: '/#services' },
    { name: t.nav.contact, href: '/#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      if (location.pathname !== '/') {
        navigate(`/#${sectionId}`);
      } else {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  const handleCTAClick = () => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-lg py-4 shadow-lg'
          : 'bg-black py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xl mr-3">
              V
            </div>
            <span className="text-white text-xl font-bold">elvemo</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(link.href)}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Language toggle and CTA button */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
            >
              {language === 'en' ? 'PL' : 'EN'}
            </button>
            
            <button 
              onClick={handleCTAClick}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
            >
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay - only visible on mobile */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop blur overlay */}
        <div 
          className="absolute inset-0 backdrop-blur-md bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Slide-in menu from right */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Menu header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg mr-3">
                  V
                </div>
                <span className="text-white text-lg font-bold">elvemo</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 px-6 py-8">
              <div className="space-y-6">
                {navLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 py-3 text-lg font-medium border-b border-gray-800/50 last:border-b-0"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </nav>

            {/* Bottom section with language toggle and CTA */}
            <div className="p-6 border-t border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Language</span>
                <button
                  onClick={toggleLanguage}
                  className="text-gray-400 hover:text-white transition-colors duration-300 px-3 py-1 border border-gray-700 rounded-lg hover:border-gray-600"
                >
                  {language === 'en' ? 'PL' : 'EN'}
                </button>
              </div>
              
              <button 
                onClick={handleCTAClick}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
              >
                {t.nav.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;