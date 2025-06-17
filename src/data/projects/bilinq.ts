import { Project, createPageSpeedScores } from './types';
import mainPageImage from '../../assets/projects/bilinq/main-page.png';


export const bilinq: Project = {
  id: 'bilinq', // Unique identifier for the project
  stack: [
    'JavaScript',
    'React',
    'Tailwind CSS',
    'Supabase'
  ],
  translations: {
    en: {
        title: 'Bilinq',
        description: 'A modern invoice and client management system offering an intuitive interface, advanced reporting, and comprehensive financial control for businesses.',
        category: 'business application',
        fullDescription: [
          'Bilinq is a professional invoicing solution that streamlines financial processes for businesses of all sizes. The system is designed to maximize efficiency and clarity in billing operations.',
          'The platform offers comprehensive client management, automatic invoice generation, payment status tracking, and advanced financial reporting. With its intuitive interface, even users without financial experience can easily manage documents and monitor cash flow.',
          'Bilinq stands out with its automated payment reminders, customizable documents, and integration with popular accounting systems. The platform provides full real-time control over a company\'s finances.'
        ],
        testimonial: {
          quote: 'This project was a blend of technical challenge and real-world impact — we wanted every part to have purpose and value.',
          author: 'elvemo team',
          role: 'Our thoughts'
        },
        clientBenefits: {
          title: 'Client Benefits',
          subtitle: 'How Bilinq optimizes financial processes',
          benefits: [
            {
              icon: 'Clock',
              title: 'Time-Saving',
              description: 'Automated invoice generation and payment reminders reduce the time spent on financial administration.'
            },
            {
              icon: 'HandCoins',
              title: 'Full Financial Control',
              description: 'Advanced reports and dashboards provide real-time insight into the company\'s financial health.'
            },
            {
              icon: 'users',
              title: 'Client Management',
              description: 'A centralized client database with transaction history and payment statuses simplifies business relationship management.'
            },
            {
              icon: 'Database',
              title: 'Data Security',
              description: 'Advanced security and data encryption protect sensitive financial information.'
            },
            {
              icon: 'Puzzle',
              title: 'System Integrations',
              description: 'Integration with popular accounting and banking systems ensures data consistency and reliability.'
            }
          ]
        }
      },       
    pl: {
        title: 'Bilinq',
        description: 'Nowoczesny system zarządzania fakturami i klientami, oferujący intuicyjny interfejs, zaawansowane raportowanie i kompleksowe zarządzanie finansami dla firm.',
        category: 'aplikacja biznesowa',
        fullDescription: [
          'Bilinq to profesjonalne rozwiązanie do zarządzania fakturami, które usprawnia procesy finansowe w firmach każdej wielkości. System został zaprojektowany z myślą o maksymalnej wydajności i przejrzystości procesów rozliczeniowych.',
          'Platforma oferuje kompleksowe zarządzanie klientami, automatyczne generowanie faktur, śledzenie statusów płatności oraz zaawansowane raporty finansowe. Dzięki intuicyjnemu interfejsowi, nawet osoby bez doświadczenia w finansach mogą łatwo zarządzać dokumentami i monitorować przepływy pieniężne.',
          'Bilinq wyróżnia się na rynku dzięki zautomatyzowanemu systemowi przypomnień o płatnościach, możliwości personalizacji dokumentów oraz integracji z popularnymi systemami księgowymi. Platforma zapewnia pełną kontrolę nad finansami firmy w czasie rzeczywistym.'
        ],
        testimonial: {
          quote: 'Ten projekt to dla nas połączenie technologicznego wyzwania i realnego wpływu — chcieliśmy, żeby każdy element miał sens i wartość.',
          author: 'Nasze przemyślenia',
          role: 'elvemo team'
        },
        clientBenefits: {
          title: 'Korzyści dla Klienta',
          subtitle: 'Jak Bilinq optymalizuje procesy finansowe',
          benefits: [
            {
              icon: 'Clock',
              title: 'Oszczędność Czasu',
              description: 'Automatyczne generowanie faktur i przypomnienia o płatnościach redukują czas poświęcany na administrację finansową.'
            },
            {
              icon: 'HandCoins',
              title: 'Pełna Kontrola Finansów',
              description: 'Zaawansowane raporty i dashboardy dają wgląd w kondycję finansową firmy w czasie rzeczywistym.'
            },
            {
              icon: 'users',
              title: 'Zarządzanie Klientami',
              description: 'Centralna baza klientów z historią transakcji i statusami płatności ułatwia budowanie relacji biznesowych.'
            },
            {
              icon: 'Database',
              title: 'Bezpieczeństwo Danych',
              description: 'Zaawansowane zabezpieczenia i szyfrowanie danych chronią wrażliwe informacje finansowe.'
            },
            {
              icon: 'Puzzle',
              title: 'Integracje Systemowe',
              description: 'Możliwość integracji z popularnymi systemami księgowymi i bankowymi zapewnia spójność danych.'
            }
          ]
        }
      }
  },
  portfolio: {
    image: mainPageImage
  },
  projectPage: {
    image: mainPageImage,
    gallery: [
      'URL to gallery image 1',
      'URL to gallery image 2',
      'URL to gallery image 3'
    ],
    client: 'Vibbly',
    duration: {
      en: '5 days',
      pl: '5 dni'
    },
    year: '2025', // e.g., '2024'
    projectUrl: 'https://bilinq.netlify.app',
    pageSpeedScores: createPageSpeedScores({
      mobile: {
        'Performance': 98,
        'Accessibility': 100,
        'Best Practices': 100,
        'SEO': 100
      },
      desktop: {
        'Performance': 100,
        'Accessibility': 100,
        'Best Practices': 100,
        'SEO': 100
      }
    }),
    pageSpeedUrl: 'https://pagespeed.web.dev/analysis/https-bilinq-netlify-app/meskl3qsap?hl=pl&form_factor=desktop'
  }
};
