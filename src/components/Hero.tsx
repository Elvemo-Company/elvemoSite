import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import ParticleBackground from './ParticleBackground';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/#services');
    // Płynne przewijanie do sekcji usług
    setTimeout(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-black/50 to-black/50 z-10"></div>
      
      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
        <div className="space-y-6 md:space-y-8 max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <span className="block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {t.hero.headline1}
            </span>
            <span className="block animate-fade-in-up bg-gradient-to-r from-violet-400 to-fuchsia-300 text-transparent bg-clip-text" style={{ animationDelay: '0.6s' }}>
              {t.hero.headline2}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 animate-fade-in-up max-w-2xl" style={{ animationDelay: '0.9s' }}>
            {t.hero.subheadline}
          </p>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTAClick}
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white transition-all duration-300 ease-out bg-gradient-to-r from-violet-700/90 to-fuchsia-700/90 rounded-full border border-white/10 hover:border-white/20 shadow-xl hover:shadow-violet-900/20"
            >
              <span className="relative flex items-center gap-3">
                {language === 'pl' ? 'Zbudujmy Coś Razem' : 'Let\'s Build Something'}
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center animate-bounce">
        <div className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/80 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;