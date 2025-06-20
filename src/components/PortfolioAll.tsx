import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPortfolioProjects } from '../data/projects';
import { translations } from '../utils/translations';
import { ExternalLink } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const PortfolioAll: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].portfolio;
  const projects = getPortfolioProjects(language as 'en' | 'pl');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'category' | 'year'>('year');
  const filters = ['all', ...new Set(projects.map(project => project.category))];

  // Sort projects
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    if (sortBy === 'year') return (b.year || '').localeCompare(a.year || '');
    return 0;
  });

  const filteredProjects = activeFilter === 'all'
    ? sortedProjects
    : sortedProjects.filter(project => project.category === activeFilter);

  return (
    <div className="relative min-h-screen">
      <ParticleBackground density="high" fadeDirection="down" />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="py-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-16">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-300 text-transparent bg-clip-text drop-shadow-lg">
              {t.title}
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg font-medium drop-shadow">
              {t.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Projekty */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 via-violet-950/80 to-gray-900/80 border border-violet-700/20 shadow-2xl hover:shadow-violet-700/30 transition-all duration-500"
                  >
                    <div className="aspect-video overflow-hidden rounded-t-3xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 pointer-events-none"></div>
                    </div>
                    <div className="relative p-6 md:p-8">
                      <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-violet-700/40 to-fuchsia-700/30 text-violet-200 text-xs mb-4 font-semibold tracking-wide shadow">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-6 transition-all duration-300 group-hover:text-gray-100">
                        {project.description}
                      </p>
                      <Link
                        to={`/portfolio/${project.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-violet-500/30 transition-all duration-300"
                      >
                        {t.viewProject} <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Panel boczny */}
            <aside className="lg:col-span-1 lg:sticky lg:top-32 h-fit bg-gradient-to-br from-violet-950/80 via-gray-900/90 to-violet-900/80 rounded-3xl border border-violet-700/30 shadow-2xl p-8 flex flex-col gap-10 backdrop-blur-md">
              <div>
                <h3 className="text-lg font-semibold text-violet-200 mb-4 tracking-wide uppercase">{language === 'pl' ? 'Filtruj projekty' : 'Filter projects'}</h3>
                <div className="flex flex-col gap-3">
                  {filters.map((filter, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFilter(filter)}
                      className={`w-full px-5 py-3 rounded-2xl text-base font-semibold text-center transition-all duration-300 border border-violet-700/30 shadow-sm whitespace-normal break-words focus:outline-none focus:ring-2 focus:ring-violet-500/40 ${
                        activeFilter === filter
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white scale-105 shadow-violet-500/30'
                          : 'bg-gray-900/70 text-violet-200 hover:bg-violet-800/40 hover:text-white'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-violet-200 mb-4 tracking-wide uppercase">{language === 'pl' ? 'Sortuj projekty' : 'Sort projects'}</h3>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setSortBy('year')} className={`px-3 py-2 rounded-full font-semibold border border-violet-700/30 transition-all duration-300 ${sortBy === 'year' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white scale-105 shadow-violet-500/30' : 'bg-gray-900/70 text-violet-200 hover:bg-violet-800/40 hover:text-white'}`}>{language === 'pl' ? 'Rok' : 'Year'}</button>
                  <button onClick={() => setSortBy('title')} className={`px-3 py-2 rounded-full font-semibold border border-violet-700/30 transition-all duration-300 ${sortBy === 'title' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white scale-105 shadow-violet-500/30' : 'bg-gray-900/70 text-violet-200 hover:bg-violet-800/40 hover:text-white'}`}>{language === 'pl' ? 'Tytuł' : 'Title'}</button>
                  <button onClick={() => setSortBy('category')} className={`px-3 py-2 rounded-full font-semibold border border-violet-700/30 transition-all duration-300 ${sortBy === 'category' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white scale-105 shadow-violet-500/30' : 'bg-gray-900/70 text-violet-200 hover:bg-violet-800/40 hover:text-white'}`}>{language === 'pl' ? 'Kategoria' : 'Category'}</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PortfolioAll;
