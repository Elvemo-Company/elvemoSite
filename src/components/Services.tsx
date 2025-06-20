import React, { useState } from 'react';
import { Code, Paintbrush, BarChart, ChevronRight, ChevronDown, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Services: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [expandedService, setExpandedService] = useState<number>(0); // First service expanded by default

  const handleContactClick = () => {
    navigate('/#contact');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? -1 : index);
  };

  const services = [
    {
      icon: <Code className="w-12 h-12 text-violet-400" />,
      title: t.services.service1.title,
      description: t.services.service1.description,
      features: t.services.service1.features,
    },
    {
      icon: <Paintbrush className="w-12 h-12 text-violet-400" />,
      title: t.services.service2.title,
      description: t.services.service2.description,
      features: t.services.service2.features,
    },
    {
      icon: <BarChart className="w-12 h-12 text-violet-400" />,
      title: t.services.service3.title,
      description: t.services.service3.description,
      features: t.services.service3.features,
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-violet-900/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-violet-900/5 blur-3xl rounded-full"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-300 text-transparent bg-clip-text">
            {t.services.title}
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            {t.services.subtitle}
          </p>
        </div>
        
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-900/20 group"
            >
              <div className="p-4 bg-gray-800/20 rounded-xl w-fit mb-6 group-hover:bg-violet-900/20 transition-colors duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion Layout */}
        <div className="md:hidden space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-black/30 backdrop-blur-sm border rounded-2xl transition-all duration-300 ${
                expandedService === index
                  ? 'border-violet-500/30 shadow-lg shadow-violet-900/20'
                  : 'border-gray-800/50'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleService(index)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${
                    expandedService === index
                      ? 'bg-violet-900/20'
                      : 'bg-gray-800/20'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/50 transition-all duration-300">
                  {expandedService === index ? (
                    <Minus className="w-5 h-5 text-violet-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {expandedService === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-400 mb-6">{service.description}</p>
                      
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                            <span className="text-gray-300">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContactClick}
            className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white transition-all duration-300 ease-out bg-gradient-to-r from-violet-700/90 to-fuchsia-700/90 rounded-full border border-white/10 hover:border-white/20 shadow-xl hover:shadow-violet-900/20"
          >
            <span className="relative flex items-center gap-3">
              {language === 'pl' ? 'Omów swój projekt' : 'Discuss your project'}
              <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              {language === 'pl' 
                ? 'Bezpłatna konsultacja i wycena w ciągu 24h' 
                : 'Free consultation and quote within 24h'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;