import { Project } from './types';
import { saffronThyme } from './saffron-thyme';
import { safetripvax } from './safetripvax';
import { bilinq } from './bilinq';
import { elvemoSandbox } from './vibbly-sandbox';

// Export all projects
export const projects: Project[] = [
  saffronThyme,
  safetripvax,
  bilinq,
  elvemoSandbox
];

// Helper functions
export const getPortfolioProjects = (language: 'en' | 'pl') => {
  return projects.map(project => ({
    id: project.id,
    title: project.translations[language].title,
    description: project.translations[language].description,
    category: project.translations[language].category,
    image: project.portfolio.image
  }));
};

export const getProjectPageData = (projectId: string, language: 'en' | 'pl') => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  return {
    id: project.id,
    title: project.translations[language].title,
    description: project.translations[language].description,
    category: project.translations[language].category,
    image: project.projectPage.image,
    fullDescription: project.translations[language].fullDescription,
    stack: project.stack,
    testimonial: project.translations[language].testimonial,
    clientBenefits: project.translations[language].clientBenefits,
    gallery: project.projectPage.gallery,
    duration: project.projectPage.duration[language],
    year: project.projectPage.year,
    client: project.projectPage.client,
    projectUrl: project.projectPage.projectUrl,
    pageSpeedScores: project.projectPage.pageSpeedScores,
    pageSpeedUrl: project.projectPage.pageSpeedUrl
  };
};