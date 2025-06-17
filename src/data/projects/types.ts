export interface Project {
  // Common data for both portfolio and project page
  id: string;
  stack: string[];
  translations: {
    en: {
      title: string;
      description: string;
      category: string;
      fullDescription: string[];
      testimonial: {
        quote: string;
        author: string;
        role: string;
      };
      clientBenefits: {
        title: string;
        subtitle: string;
        benefits: Array<{
          icon: string;
          title: string;
          description: string;
        }>;
      };
    };
    pl: {
      title: string;
      description: string;
      category: string;
      fullDescription: string[];
      testimonial: {
        quote: string;
        author: string;
        role: string;
      };
      clientBenefits: {
        title: string;
        subtitle: string;
        benefits: Array<{
          icon: string;
          title: string;
          description: string;
        }>;
      };
    };
  };
  // Portfolio specific data
  portfolio: {
    image: string;
  };
  // Project page specific data
  projectPage: {
    image: string;
    gallery: string[];
    client: string;
    duration: {
      en: string;
      pl: string;
    };
    year: string;
    projectUrl: string;
    pageSpeedScores: PageSpeedScores;
    pageSpeedUrl: string;
  };
}

export interface PageSpeedScore {
  category: PageSpeedScoreCategory;
  score: number;
  description: string;
}

export interface PageSpeedScores {
  mobile: PageSpeedScore[];
  desktop: PageSpeedScore[];
}

export type PageSpeedScoreCategory = 'Performance' | 'Accessibility' | 'Best Practices' | 'SEO';

export const PAGE_SPEED_CATEGORIES: Record<PageSpeedScoreCategory, { description: string }> = {
  'Performance': {
    description: 'Measures how fast the page loads and becomes interactive'
  },
  'Accessibility': {
    description: 'Ensures content is accessible to all users'
  },
  'Best Practices': {
    description: 'Follows modern web development best practices'
  },
  'SEO': {
    description: 'Optimized for search engine visibility'
  }
};

export const createPageSpeedScores = (scores: { 
  mobile: Record<PageSpeedScoreCategory, number>, 
  desktop: Record<PageSpeedScoreCategory, number> 
}): PageSpeedScores => {
  return {
    mobile: Object.entries(scores.mobile).map(([category, score]) => ({
      category: category as PageSpeedScoreCategory,
      score,
      description: PAGE_SPEED_CATEGORIES[category as PageSpeedScoreCategory].description
    })),
    desktop: Object.entries(scores.desktop).map(([category, score]) => ({
      category: category as PageSpeedScoreCategory,
      score,
      description: PAGE_SPEED_CATEGORIES[category as PageSpeedScoreCategory].description
    }))
  };
};

export interface ProjectPageData {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  fullDescription: string[];
  stack: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  clientBenefits: {
    title: string;
    subtitle: string;
    benefits: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  gallery: string[];
  duration: string;
  year: string;
  client: string;
  projectUrl: string;
  pageSpeedScores: PageSpeedScores;
  pageSpeedUrl: string;
}

// Helper functions to get project data for different views
export const getPortfolioProjects = (projects: Project[], language: 'en' | 'pl') => {
  return projects.map(project => ({
    id: project.id,
    title: project.translations[language].title,
    description: project.translations[language].description,
    category: project.translations[language].category,
    image: project.portfolio.image
  }));
};

export const getProjectPageData = (projects: Project[], id: string, language: 'en' | 'pl'): ProjectPageData | null => {
  const project = projects.find(p => p.id === id);
  if (!project) return null;

  const translations = project.translations[language];
  return {
    id: project.id,
    stack: project.stack,
    title: translations.title,
    description: translations.description,
    category: translations.category,
    fullDescription: translations.fullDescription,
    testimonial: translations.testimonial,
    clientBenefits: translations.clientBenefits,
    image: project.projectPage.image,
    gallery: project.projectPage.gallery,
    duration: project.projectPage.duration[language],
    year: project.projectPage.year,
    client: project.projectPage.client,
    projectUrl: project.projectPage.projectUrl,
    pageSpeedScores: project.projectPage.pageSpeedScores,
    pageSpeedUrl: project.projectPage.pageSpeedUrl,
  };
}; 