import React from 'react';
import { Lightbulb, Code, Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

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

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
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
    </section>
  );
};

export default About;