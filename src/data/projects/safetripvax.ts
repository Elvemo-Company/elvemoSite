import { Project, createPageSpeedScores } from './types';
import mainPageImage from '../../assets/projects/safetripvax/main-page.png';
import cover from '../../assets/projects/safetripvax/cover.png';


export const safetripvax: Project = {
  id: 'safetripvax', // Unique identifier for the project
  stack: [
    'JavaScript',
    'React',
    'Tailwind CSS',
    'Sanity',
    'Supabase'
  ],
  translations: {
    en: {
      title: 'SafeTripVax',
      description: 'An intuitive, multilingual platform for travelers with up-to-date vaccination requirements, medical facility locator, and smart filtering system.',
      category: 'health web-app',
      fullDescription: [
        'SafeTripVax is a modern platform that helps travelers check which vaccinations are required in different countries around the world. Thanks to its clear interface, anyone can quickly find the necessary information, even without specialist knowledge.',
        'A central feature of the platform is an interactive map that makes it easy to locate the nearest medical centers offering vaccinations. This significantly simplifies and clarifies the entire travel preparation process.',
        'Importantly, SafeTripVax is continuously connected to an up-to-date database, ensuring that all vaccination information is always reliable and current. This gives users confidence that they are relying on the most trustworthy sources when planning their trip.'
      ],
      testimonial: {
        quote: 'Alright, gentlemen, join the channel – meeting room is open.',
        author: 'Patryk Korzeniowski',
        role: 'CEO, Epko Tech'
      },
      clientBenefits: {
        title: 'Client Benefits',
        subtitle: 'How this project delivers value',
        benefits: [
          {
            icon: 'map',
            title: 'Easy Travel Planning',
            description: 'Quickly find the nearest vaccination centers thanks to the interactive map.'
          },
          {
            icon: 'shield-check',
            title: 'Accurate & Reliable Data',
            description: 'The platform is connected to a regularly updated database to ensure access to verified information.'
          },
          {
            icon: 'clock',
            title: 'Time-Saving',
            description: 'All necessary vaccination details in one place — no need to browse multiple websites.'
          },
          {
            icon: 'globe',
            title: 'Global Accessibility',
            description: 'Check vaccination requirements and medical service availability worldwide, wherever you are.'
          },
          {
            icon: 'user-friendly',
            title: 'User-Friendly Interface',
            description: 'Simple and clean design makes the platform accessible to everyone, even without technical skills.'
          }
        ]
      }
    },    
    pl: {
      title: 'SafeTripVax',
      description: 'Intuicyjna, wielojęzyczna platforma dla podróżnych z aktualnymi wymaganiami szczepień, lokalizacją punktów medycznych i inteligentnym systemem filtrowania.',
      category: 'aplikacja zdrowotna', // np. 'aplikacja webowa', 'e-commerce', 'aplikacja mobilna'
      fullDescription: [
        'SafeTripVax to nowoczesna platforma, która ułatwia podróżnym sprawdzenie, jakie szczepienia są wymagane w różnych krajach na całym świecie. Dzięki przejrzystemu interfejsowi każdy może szybko znaleźć potrzebne informacje, nawet bez specjalistycznej wiedzy.',
      'Centralnym elementem platformy jest interaktywna mapa, która pozwala łatwo zlokalizować najbliższe punkty medyczne oferujące szczepienia. To sprawia, że cały proces przygotowania do podróży staje się znacznie prostszy i bardziej przejrzysty.',
      'Co ważne, SafeTripVax jest stale połączony z aktualizowaną bazą danych, co gwarantuje, że wszelkie informacje o szczepieniach są zawsze wiarygodne i aktualne. Dzięki temu użytkownicy mogą mieć pewność, że planując podróż, korzystają z najbardziej rzetelnych źródeł.'

      ],
      testimonial: {
        quote: 'Dobra, wbijcie panowie na ten kanal sala spotkan',
        author: 'Patryk Korzeniowski',
        role: 'Przezes, Epko Tech'
      },
      clientBenefits: {
        title: 'Korzyści dla Klienta',
        subtitle: 'Jak ten projekt dostarcza wartość',
        benefits: [
          {
            icon: 'map',
            title: 'Łatwe Planowanie Podróży',
            description: 'Dzięki interaktywnej mapie szybko znajdziesz najbliższe punkty medyczne oferujące szczepienia.'
          },
          {
            icon: 'shield-check',
            title: 'Aktualne i Wiarygodne Dane',
            description: 'Platforma jest połączona z bazą aktualizowaną na bieżąco, co zapewnia dostęp do sprawdzonych informacji.'
          },
          {
            icon: 'clock',
            title: 'Oszczędność Czasu',
            description: 'Wszystkie potrzebne informacje o szczepieniach w jednym miejscu — bez potrzeby szukania na różnych stronach.'
          },
          {
            icon: 'globe',
            title: 'Dostępność Globalna',
            description: 'Sprawdź wymagania szczepień i dostępność usług medycznych na całym świecie, gdziekolwiek jesteś.'
          },
          {
            icon: 'user-friendly',
            title: 'Intuicyjny Interfejs',
            description: 'Prosty i przejrzysty design umożliwia korzystanie z platformy każdemu, nawet bez technicznej wiedzy.'
          }
        ]
      }
      
    }
  },
  portfolio: {
    image: mainPageImage
  },
  projectPage: {
    image: cover,
    gallery: [
      'URL to gallery image 1',
      'URL to gallery image 2',
      'URL to gallery image 3'
    ],
    client: 'EPKO sp. z o.o.',
    duration: {
      en: '2 weeks',
      pl: '2 tygodnie'
    },
    year: '2025', // e.g., '2024'
    projectUrl: 'https://safetripvax.com/',
    pageSpeedScores: createPageSpeedScores({
      mobile: {
        'Performance': 80,
        'Accessibility': 93,
        'Best Practices': 100,
        'SEO': 100
      },
      desktop: {
        'Performance': 99,
        'Accessibility': 93,
        'Best Practices': 100,
        'SEO': 100
      }
    }),
    pageSpeedUrl: 'https://pagespeed.web.dev/analysis/https-safetripvax-com/wkgauzastn?hl=pl&form_factor=desktop'
  }
};
