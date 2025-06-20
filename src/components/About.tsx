import React from 'react';
import { Lightbulb, Code, Palette, Clock, Users, Target, Zap, Heart, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8 text-violet-400" />,
      title: t.about.feature1.title,
      description: t.about.feature1.description,
    },
    {
      icon: <Code className="w-8 h-8 text-violet-400" />,
      title: t.about.feature2.title,
      description: t.about.feature2.description,
    },
    {
      icon: <Palette className="w-8 h-8 text-violet-400" />,
      title: t.about.feature3.title,
      description: t.about.feature3.description,
    },
  ];

  // Mobile visual storytelling icons
  const mobileFeatures = [
    {
      icon: <Clock className="w-6 h-6 text-violet-400" />,
      title: language === 'pl' ? 'Szybkość' : 'Speed',
      description: language === 'pl' ? 'Gotowe w kilka dni' : 'Ready in days'
    },
    {
      icon: <Users className="w-6 h-6 text-violet-400" />,
      title: language === 'pl' ? 'Współpraca' : 'Collaboration',
      description: language === 'pl' ? 'Zespół na którym możesz polegać' : 'Team you can count on'
    },
    {
      icon: <Target className="w-6 h-6 text-violet-400" />,
      title: language === 'pl' ? 'Cel' : 'Goals',
      description: language === 'pl' ? 'Skuteczne rozwiązania' : 'Effective solutions'
    },
    {
      icon: <Zap className="w-6 h-6 text-violet-400" />,
      title: language === 'pl' ? 'Wydajność' : 'Performance',
      description: language === 'pl' ? 'Optymalizacja i szybkość' : 'Optimized & fast'
    },
    {
      icon: <Heart className="w-6 h-6 text-violet-400" />,
      title: language === 'pl' ? 'Pasja' : 'Passion',
      description: language === 'pl' ? 'Tworzymy z sercem' : 'We create with heart'
    },
    {
      icon: <Shield className="w-6 h-6 text-violet-400" />,
      title: language === 'pl' ? 'Bezpieczeństwo' : 'Security',
      description: language === 'pl' ? 'Bezpieczne i niezawodne' : 'Safe & reliable'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-300 text-transparent bg-clip-text">
              {t.about.title}
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              {t.about.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl bg-black/20 backdrop-blur-sm border border-gray-800/30 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-900/20"
              >
                <div className="mb-5 p-3 rounded-xl bg-gray-800/20 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-24">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {t.about.mission.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t.about.mission.description1}
                </p>
                <p className="text-gray-300">
                  {t.about.mission.description2}
                </p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/10">
                <blockquote className="text-xl md:text-2xl italic text-gray-200 font-light">
                  "{t.about.quote}"
                  <footer className="mt-4 text-sm text-gray-400 not-italic">
                    — {t.about.quoteAuthor}, <span className="text-violet-400">{t.about.quoteRole}</span>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Merged About & Mission */}
        <div className="md:hidden">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-300 text-transparent bg-clip-text"
            >
              {language === 'pl' ? 'Kim jesteśmy?' : 'Who Are We?'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-base mb-8"
            >
              {t.about.subtitle}
            </motion.p>
          </div>

          {/* Visual Storytelling Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-12"
          >
            {mobileFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl bg-black/20 backdrop-blur-sm border border-gray-800/30 text-center transition-all duration-300"
              >
                <motion.div 
                  className="mb-3 p-2 rounded-lg bg-violet-600/20 w-fit mx-auto"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-sm font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission & Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {t.about.mission.title}
            </h3>
            <p className="text-gray-300 mb-3 text-sm hidden">
              {t.about.mission.description1}
            </p>
            <p className="text-gray-300 text-sm hidden">
              {t.about.mission.description2}
            </p>
            <div className="border-t border-gray-700/50 my-4"></div>
            <blockquote className="text-lg italic text-gray-200 font-light">
              "{t.about.quote}"
              <footer className="mt-3 text-sm text-gray-400 not-italic">
                — {t.about.quoteAuthor}, <span className="text-violet-400">{t.about.quoteRole}</span>
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;