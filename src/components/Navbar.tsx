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
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-screen py-6' : 'max-h-0'
      }`}>
        <div className="px-6 space-y-6">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(link.href)}
                className="text-gray-300 hover:text-white transition-colors duration-300 py-2 text-left"
              >
                {link.name}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <button
              onClick={toggleLanguage}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              {language === 'en' ? 'PL' : 'EN'}
            </button>
            
            <button 
              onClick={handleCTAClick}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-lg"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;