import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useAnimation, PanInfo } from 'framer-motion';
import { getPortfolioProjects } from '../data/projects';
import { translations } from '../utils/translations';

const Portfolio: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].portfolio;
  const projects = getPortfolioProjects(language as 'en' | 'pl');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  const filters = ['all', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const calcCardWidth = () => {
      if (containerRef.current) {
        // Card width is 85% of container width + gap (which is part of the 15% left)
        const containerWidth = containerRef.current.offsetWidth;
        setCardWidth(containerWidth * 0.85 + (containerWidth * 0.15 * 0.2)); // Approximation of card + gap
      }
    };
    calcCardWidth();
    window.addEventListener('resize', calcCardWidth);
    return () => window.removeEventListener('resize', calcCardWidth);
  }, []);

  useEffect(() => {
    // Reset slide and position when filters change
    setCurrentSlide(0);
    controls.set({ x: 0 });
    x.set(0);
  }, [activeFilter, controls, x]);

  const scrollToSlide = (index: number) => {
    setCurrentSlide(index);
    controls.start({
      x: -index * cardWidth,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    });
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % filteredProjects.length;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + filteredProjects.length) % filteredProjects.length;
    scrollToSlide(prevIndex);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipeThreshold = 50;

    if (Math.abs(velocity.x) > swipeThreshold) {
      if (velocity.x > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      // Snap to the nearest slide based on offset
      const targetSlide = Math.round(-x.get() / cardWidth);
      scrollToSlide(targetSlide);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="portfolio"
      className="py-16 md:py-24 bg-violet-600/10 backdrop-blur-lg relative overflow-hidden border-t border-b border-violet-500/30"
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
                  loading="lazy"
                  decoding="async"
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
        <div ref={containerRef} className="md:hidden relative overflow-hidden">
         

          {/* Draggable Container */}
          <motion.div
            className="flex gap-3"
            drag="x"
            dragConstraints={{ 
              right: 0, 
              left: -cardWidth * (filteredProjects.length - 1)
            }}
            animate={controls}
            style={{ x }}
            onDragEnd={handleDragEnd}
            dragElastic={0.1}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-[85%] snap-center"
                style={{ minWidth: '85%' }}
              >
                <Link
                  to={`/portfolio/${project.id}`}
                  className="block focus:outline-none"
                  tabIndex={0}
                  style={{ borderRadius: '1rem', overflow: 'hidden' }}
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
                        loading="lazy"
                        decoding="async"
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
                      <p className="text-gray-300 mb-4 text-sm hidden md:block">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors" style={{ minHeight: '44px', minWidth: '44px' }}>
                        {t.viewProject} <ExternalLink className="ml-1 w-4 h-4" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicators */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-5 h-2 bg-violet-400'
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                }`}
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