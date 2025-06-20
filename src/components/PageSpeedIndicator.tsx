import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Info, Smartphone, Monitor } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

interface PageSpeedScore {
  category: string;
  score: number;
  description: string;
}

interface PageSpeedIndicatorProps {
  scores: {
    mobile: PageSpeedScore[];
    desktop: PageSpeedScore[];
  };
  reportUrl: string;
}

type PageSpeedCategory = 'performance' | 'accessibility' | 'bestPractices' | 'seo';

const categoryMap: Record<string, PageSpeedCategory> = {
  'Performance': 'performance',
  'Accessibility': 'accessibility',
  'Best Practices': 'bestPractices',
  'SEO': 'seo'
};

const PageSpeedIndicator: React.FC<PageSpeedIndicatorProps> = ({ scores, reportUrl }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const { language } = useLanguage();
  const t = translations[language].project.pageSpeed;
  const [isMobile, setIsMobile] = useState(true);

  const currentScores = isMobile ? scores.mobile : scores.desktop;

  const getTranslatedScore = (score: PageSpeedScore) => {
    const categoryKey = categoryMap[score.category];
    if (!categoryKey) return score;
    
    return {
      ...score,
      category: t[categoryKey].title,
      description: t[categoryKey].description
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 90) return '#4ade80';
    if (score >= 50) return '#fb923c';
    return '#f87171';
  };

  const getGlowColor = (score: number) => {
    if (score >= 90) return 'shadow-green-500/30';
    if (score >= 50) return 'shadow-orange-500/30';
    return 'shadow-red-500/30';
  };

  return (
    <div 
      ref={ref}
      className="relative bg-gradient-to-br from-gray-900/80 via-gray-900/90 to-violet-900/20 rounded-3xl p-8 mb-8 border border-violet-500/10 shadow-2xl shadow-violet-900/20 backdrop-blur-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent rounded-3xl"></div>
      
      {/* Device Switch */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-gray-800/50 rounded-xl p-1 backdrop-blur-sm border border-gray-700/30">
        <div
          onClick={() => setIsMobile(true)}
          className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${
            isMobile 
              ? 'bg-violet-600/30 text-violet-300' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-sm">Mobile</span>
        </div>
        <div
          onClick={() => setIsMobile(false)}
          className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${
            !isMobile 
              ? 'bg-violet-600/30 text-violet-300' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span className="text-sm">Desktop</span>
        </div>
      </div>

      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-xl font-bold mb-8 bg-gradient-to-r from-white via-violet-200 to-gray-300 text-transparent bg-clip-text"
      >
        {t.title}
      </motion.h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <AnimatePresence mode="wait">
          {currentScores.map((score, index) => {
            const translatedScore = getTranslatedScore(score);
            return (
              <motion.div
                key={`${isMobile ? 'mobile' : 'desktop'}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative group"
              >
                <div className="flex flex-col items-center">
                  <div className={`relative rounded-full ${getGlowColor(translatedScore.score)} shadow-lg transition-all duration-700 group-hover:shadow-2xl group-hover:scale-105 pointer-events-none`}>
                    <svg className="w-28 h-28" viewBox="0 0 100 100" style={{ pointerEvents: 'auto' }}>
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1a1f2e" />
                          <stop offset="100%" stopColor="#0f1117" />
                        </linearGradient>
                        <filter id={`glow-${index}`}>
                          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill={`url(#gradient-${index})`}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#2a2f3c"
                        strokeWidth="8"
                        className="opacity-50"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={getStrokeColor(translatedScore.score)}
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: translatedScore.score / 100 } : { pathLength: 0 }}
                        transition={{ 
                          duration: 2,
                          delay: index * 0.2 + 0.3,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        transform="rotate(-90 50 50)"
                        filter={`url(#glow-${index})`}
                      />
                      <motion.text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dy="7"
                        className={`text-2xl font-bold ${getScoreColor(translatedScore.score)}`}
                        fill="currentColor"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: 0.5,
                          delay: index * 0.2 + 1.2,
                          ease: "easeOut"
                        }}
                      >
                        {translatedScore.score}
                      </motion.text>
                    </svg>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-60">
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-4 bg-gray-900/95 backdrop-blur-xl rounded-xl text-sm text-gray-300 w-48 text-center shadow-xl border border-gray-700/30">
                        {translatedScore.description}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                          <div className="border-8 border-transparent border-t-gray-900/95"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.2 + 1.5,
                      ease: "easeOut"
                    }}
                    className="mt-4 text-sm font-medium text-gray-300"
                  >
                    {translatedScore.category}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <motion.a
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
        href={reportUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-8 text-violet-400 hover:text-violet-300 transition-all duration-300 group"
      >
        <Info className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
        <span className="relative">
          {t.viewReport}
          <span className="absolute bottom-0 left-0 w-full h-px bg-violet-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </span>
      </motion.a>
    </div>
  );
};

export default PageSpeedIndicator;
