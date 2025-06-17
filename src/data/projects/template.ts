import { Project, createPageSpeedScores } from './types';

export const projectTemplate: Project = {
  id: 'project-id', // Unique identifier for the project
  stack: [
    'Technology 1',
    'Technology 2',
    'Technology 3'
  ],
  translations: {
    en: {
      title: 'Project Title',
      description: 'Short project description',
      category: 'category', // e.g., 'web app', 'e-commerce', 'mobile app'
      fullDescription: [
        'First paragraph of detailed description',
        'Second paragraph of detailed description',
        'Third paragraph of detailed description'
      ],
      testimonial: {
        quote: 'Client testimonial quote',
        author: 'Client Name',
        role: 'Client Role, Company'
      },
      clientBenefits: {
        title: 'Client Benefits',
        subtitle: 'How this project delivers value',
        benefits: [
          {
            icon: 'benefit-icon-1',
            title: 'Benefit 1',
            description: 'Description of benefit 1'
          },
          {
            icon: 'benefit-icon-2',
            title: 'Benefit 2',
            description: 'Description of benefit 2'
          }
        ]
      }
    },
    pl: {
      title: 'Tytuł Projektu',
      description: 'Krótki opis projektu',
      category: 'kategoria', // np. 'aplikacja webowa', 'e-commerce', 'aplikacja mobilna'
      fullDescription: [
        'Pierwszy paragraf szczegółowego opisu',
        'Drugi paragraf szczegółowego opisu',
        'Trzeci paragraf szczegółowego opisu'
      ],
      testimonial: {
        quote: 'Cytat z opinii klienta',
        author: 'Imię Klienta',
        role: 'Rola Klienta, Firma'
      },
      clientBenefits: {
        title: 'Korzyści dla Klienta',
        subtitle: 'Jak ten projekt dostarcza wartość',
        benefits: [
          {
            icon: 'benefit-icon-1',
            title: 'Korzyść 1',
            description: 'Opis korzyści 1'
          },
          {
            icon: 'benefit-icon-2',
            title: 'Korzyść 2',
            description: 'Opis korzyści 2'
          }
        ]
      }
    }
  },
  portfolio: {
    image: 'URL to portfolio image'
  },
  projectPage: {
    image: 'URL to main project image',
    gallery: [
      'URL to gallery image 1',
      'URL to gallery image 2',
      'URL to gallery image 3'
    ],
    client: 'Client Name',
    duration: {
      en: 'Project Duration', // e.g., '12 weeks'
      pl: 'Czas Trwania Projektu' // e.g., '12 tygodni'
    },
    year: 'Project Year', // e.g., '2024'
    projectUrl: 'https://example.com',
    pageSpeedScores: createPageSpeedScores({
      mobile: {
        'Performance': 0,
        'Accessibility': 0,
        'Best Practices': 0,
        'SEO': 0
      },
      desktop: {
        'Performance': 0,
        'Accessibility': 0,
        'Best Practices': 0,
        'SEO': 0
      }
    }),
    pageSpeedUrl: 'https://pagespeed.web.dev/'
  }
};
// Jeśli są wystąpienia 'Vibbly', zamień na 'elvemo'.