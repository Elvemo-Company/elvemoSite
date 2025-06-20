import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#" },
    { icon: <Github className="w-5 h-5" />, href: "#" },
  ];

  const legalLinks = [
    { href: '/legal#terms', label: language === 'pl' ? 'Warunki Korzystania' : 'Terms of Service' },
    { href: '/legal#privacy', label: language === 'pl' ? 'Polityka Prywatności' : 'Privacy Policy' },
    { href: '/legal#cookies', label: language === 'pl' ? 'Polityka Cookies' : 'Cookie Policy' },
    { href: '/legal#gdpr', label: language === 'pl' ? 'RODO' : 'GDPR' }
  ];

  const quickLinks = [
    { name: t.nav.home, href: '/#home' },
    { name: t.nav.about, href: '/#about' },
    { name: t.nav.portfolio, href: '/#portfolio' },
    { name: t.nav.services, href: '/#services' },
    { name: t.nav.contact, href: '/#contact' },
    { name: language === 'pl' ? 'Mapa Witryny' : 'Sitemap', href: '/sitemap' }
  ];

  const handleScrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-violet-950 border-t border-violet-800/50 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xl mr-3">
                E
              </div>
              <span className="text-white text-xl font-bold">elvemo</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t.footer.description.replace(/Vibbly/gi, 'elvemo')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          {/* Quick links & Legal - MOBILE: 2 columns obok siebie */}
          <div className="block md:hidden col-span-1">
            <div className="grid grid-cols-2 gap-6">
              {/* Quick links */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks.title}</h3>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('/#')) {
                            e.preventDefault();
                            handleScrollToSection(link.href.substring(2));
                          }
                        }}
                        className="text-gray-400 hover:text-violet-400 transition-colors duration-300 group flex items-center"
                      >
                        <span>{link.name}</span>
                        <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Legal */}
              <div>
                <h4 className="text-white font-semibold mb-6">{t.footer.legal.title}</h4>
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-violet-400 transition-colors duration-300 group flex items-center"
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Quick links - DESKTOP */}
          <div className="hidden md:block space-y-4">
            <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks.title}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        e.preventDefault();
                        handleScrollToSection(link.href.substring(2));
                      }
                    }}
                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 group flex items-center"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal - DESKTOP */}
          <div className="hidden md:block">
            <h4 className="text-white font-semibold mb-6">{t.footer.legal.title}</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 group flex items-center"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} elvemo. {t.footer.rights.replace(/Vibbly/gi, 'elvemo')}
          </p>
          <div className="flex space-x-6">
            <Link 
              to="/legal#terms" 
              className="text-gray-500 hover:text-violet-400 text-sm transition-colors duration-300 group flex items-center"
            >
              <span>{t.footer.terms}</span>
              <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
            <Link 
              to="/legal#privacy" 
              className="text-gray-500 hover:text-violet-400 text-sm transition-colors duration-300 group flex items-center"
            >
              <span>{t.footer.privacy}</span>
              <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;