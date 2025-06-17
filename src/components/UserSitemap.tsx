import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { ChevronRight, Home, Info, Briefcase, Code, Scale, FileText, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const UserSitemap: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const location = useLocation();

  const mainPages = [
    { name: t.nav.home, href: '/#hero', icon: <Home className="w-5 h-5 text-violet-400" /> },
    { name: t.nav.about, href: '/#about', icon: <Info className="w-5 h-5 text-violet-400" /> },
    { name: t.nav.contact, href: '/#contact', icon: <Briefcase className="w-5 h-5 text-violet-400" /> },
    { 
      name: t.nav.cta, 
      href: '/#contact', 
      icon: <Phone className="w-5 h-5 text-violet-400" />,
      className: "bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30"
    },
  ];

  const services = [
    { name: t.services.title, href: '/#services', icon: <Code className="w-5 h-5 text-violet-400" /> },
  ];

  const portfolio = [
    { name: t.portfolio.title, href: '/#portfolio', icon: <Briefcase className="w-5 h-5 text-violet-400" /> },
  ];

  const legalDocuments = [
    { name: t.footer.legal.links[0].label, href: '/legal#terms', icon: <Scale className="w-5 h-5 text-violet-400" /> },
    { name: t.footer.legal.links[1].label, href: '/legal#privacy', icon: <Scale className="w-5 h-5 text-violet-400" /> },
    { name: t.footer.legal.links[2].label, href: '/legal#cookies', icon: <Scale className="w-5 h-5 text-violet-400" /> },
    { name: t.footer.legal.links[3].label, href: '/legal#gdpr', icon: <Scale className="w-5 h-5 text-violet-400" /> },
  ];

  const handleLinkClick = (href: string) => {
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

  return (
    <section className="pt-32 pb-24 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-300 text-transparent bg-clip-text">
            {language === 'pl' ? 'Mapa Witryny' : 'Sitemap'}
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            {language === 'pl' ? 'Pełna struktura naszej strony internetowej' : 'Full structure of our website'}
          </p>
          
          {/* Link to XML Sitemap */}
          <motion.a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-violet-400" />
              <span className="relative">
                {language === 'pl' ? 'Zobacz sitemap.xml' : 'View sitemap.xml'}
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-violet-400 transform -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
              </span>
            </div>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Pages */}
          <motion.div
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/10 hover:border-violet-500/20 transition-colors duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 border-b border-violet-500/20 pb-3">
              {language === 'pl' ? 'Strony Główne' : 'Main Pages'}
            </h3>
            <ul className="space-y-4">
              {mainPages.map((page, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(page.href)}
                    className={`text-gray-300 hover:text-white transition-colors duration-300 flex items-center group w-full text-left p-2 rounded-lg ${page.className || ''}`}
                  >
                    <div className="mr-3">{page.icon}</div>
                    <span className="relative">
                      {page.name}
                      <span className="absolute bottom-0 left-1/2 w-0 h-px bg-violet-400 transform -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/10 hover:border-violet-500/20 transition-colors duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 border-b border-violet-500/20 pb-3">
              {language === 'pl' ? 'Usługi' : 'Services'}
            </h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(service.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group w-full text-left"
                  >
                    <div className="mr-3">{service.icon}</div>
                    <span className="relative">
                      {service.name}
                      <span className="absolute bottom-0 left-1/2 w-0 h-px bg-violet-400 transform -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Portfolio */}
          <motion.div
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/10 hover:border-violet-500/20 transition-colors duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 border-b border-violet-500/20 pb-3">
              {language === 'pl' ? 'Projekty i Case Studies' : 'Projects & Case Studies'}
            </h3>
            <ul className="space-y-4">
              {portfolio.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group w-full text-left"
                  >
                    <div className="mr-3">{item.icon}</div>
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-1/2 w-0 h-px bg-violet-400 transform -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Documents */}
          <motion.div
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/10 hover:border-violet-500/20 transition-colors duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 border-b border-violet-500/20 pb-3">
              {language === 'pl' ? 'Dokumenty Prawne' : 'Legal Documents'}
            </h3>
            <ul className="space-y-4">
              {legalDocuments.map((doc, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(doc.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group w-full text-left"
                  >
                    <div className="mr-3">{doc.icon}</div>
                    <span className="relative">
                      {doc.name}
                      <span className="absolute bottom-0 left-1/2 w-0 h-px bg-violet-400 transform -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UserSitemap;