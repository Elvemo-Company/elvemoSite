import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPortfolioProjects } from '../data/projects';
import { translations } from '../utils/translations';

const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].portfolio;
  const projects = getPortfolioProjects(language as 'en' | 'pl');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const filters = ['all', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Reset current slide when filter changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeFilter]);

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth * 0.85; // 85% of container width for 1.5 cards showing
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    if (currentSlide < filteredProjects.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="portfolio"
      className="py-16 md:py-24 bg-violet-950/80 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-violet-600 to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-300 text-transparent bg-clip-text">
            {t.title}
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
            {t.subtitle}
          </p>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 mt-10">
            {filters.map((filter, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Filters - Dropdown */}
          <div className="md:hidden mt-8">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="px-4 py-3 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700 focus:border-violet-500 focus:outline-none w-full max-w-xs"
            >
              {filters.map((filter, index) => (
                <option key={index} value={filter}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 transition-all duration-500 hover:shadow-xl hover:shadow-violet-900/20"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <span className="inline-block px-3 py-1 rounded-full bg-violet-600/30 text-violet-300 text-xs mb-4">
                  {project.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="hidden md:block text-gray-300 mb-6 opacity-0 transform translate-y-10 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {project.description}
                </p>
                <Link
                  to={`/portfolio/${project.id}`}
                  className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {t.viewProject} <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel Layout */}
        <div className="md:hidden relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800/80 transition-all duration-300"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === filteredProjects.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800/80 transition-all duration-300"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-[85%] snap-center"
                style={{ minWidth: '85%' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-gray-900 transition-all duration-500"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                    <span className="inline-block px-3 py-1 rounded-full bg-violet-600/30 text-violet-300 text-xs mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm">
                      {project.description}
                    </p>
                    <Link
                      to={`/portfolio/${project.id}`}
                      className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors"
                      style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                      {t.viewProject} <ExternalLink className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-violet-400 w-6'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                style={{ minHeight: '44px', minWidth: '44px' }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-12 flex justify-center">
          <Link
            to="/portfolio"
            className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 font-bold text-white transition-all duration-300 ease-out bg-gradient-to-r from-violet-600 to-violet-800 rounded-2xl shadow-lg hover:shadow-violet-500/25 hover:scale-105"
            style={{ minHeight: '44px' }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-violet-800 rounded-2xl blur-md group-hover:blur-xl transition-all duration-300"></span>
            <span className="relative flex items-center gap-2">
              {language === 'pl' ? 'Zobacz wszystkie projekty' : 'See all projects'}
            </span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;