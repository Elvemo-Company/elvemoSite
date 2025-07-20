import { Project, createPageSpeedScores } from './types';
import mainPageImage from '../../assets/projects/nova-hair/main-page.png';

export const novaHair: Project = {
  id: 'nova-hair',
  stack: [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Vite',
    'Lucide Icons'
  ],
  translations: {
    en: {
      title: 'Nova Hair',
      description: 'A modern, responsive website for Nova Hair with booking integration and elegant design',
      category: 'Business Website',
      fullDescription: [
        'This project is a comprehensive website solution for Nova Hair, featuring a modern and elegant design that reflects the premium nature of the services offered. The website includes multiple interactive sections including hero presentation, team showcase, services catalog, image gallery, and integrated contact with location mapping.',
        'The application is built with a focus on user experience across all devices, featuring smooth animations, responsive design, and optimized performance. The website integrates with Booksy for appointment scheduling and includes social media connectivity to help build the salon\'s online presence and client engagement.'
      ],
      testimonial: {
        quote: 'We wanted to create a digital experience that captures the elegance and professionalism of our salon, where every detail reflects our commitment to beauty and style.',
        author: 'Salon Owner',
        role: 'Client Vision'
      },
      clientBenefits: {
        title: 'Business Benefits',
        subtitle: 'Professional Online Presence & Client Engagement',
        benefits: [
          {
            icon: 'calendar',
            title: 'Integrated Booking System',
            description: 'Seamless connection with Booksy platform allows clients to book appointments directly from the website'
          },
          {
            icon: 'users',
            title: 'Team Showcase',
            description: 'Dedicated section presenting the professional team with detailed profiles and specializations'
          },
          {
            icon: 'scissors',
            title: 'Services Presentation',
            description: 'Comprehensive catalog of salon services with descriptions and elegant visual presentation'
          },
          {
            icon: 'image',
            title: 'Visual Portfolio',
            description: 'Professional gallery showcasing the salon\'s work and creating trust with potential clients'
          },
          {
            icon: 'map-pin',
            title: 'Location & Contact',
            description: 'Interactive map integration and comprehensive contact information for easy salon discovery'
          },
          {
            icon: 'smartphone',
            title: 'Mobile-First Design',
            description: 'Fully responsive design optimized for mobile devices where most clients browse and book'
          }
        ]
      }
    },
    pl: {
      title: 'Nova Hair',
      description: 'Nowoczesna, responsywna strona internetowa dla Nova Hair z integracją rezerwacji i eleganckim designem',
      category: 'Strona Biznesowa',
      fullDescription: [
        'Ten projekt to kompleksowe rozwiązanie strony internetowej dla Nova Hair, charakteryzujące się nowoczesnym i eleganckim designem, który odzwierciedla premium charakter oferowanych usług. Strona zawiera wiele interaktywnych sekcji, w tym prezentację główną, showcase zespołu, katalog usług, galerię zdjęć oraz zintegrowany kontakt z mapą lokalizacji.',
        'Aplikacja została zbudowana z naciskiem na doświadczenie użytkownika na wszystkich urządzeniach, oferując płynne animacje, responsywny design i zoptymalizowaną wydajność. Strona integruje się z platformą Booksy do rezerwacji wizyt i zawiera połączenia z mediami społecznościowymi, pomagając budować obecność online salonu i zaangażowanie klientów.'
      ],
      testimonial: {
        quote: 'Chcieliśmy stworzyć cyfrowe doświadczenie, które oddaje elegancję i profesjonalizm naszego salonu, gdzie każdy detal odzwierciedla nasze zaangażowanie w piękno i styl.',
        author: 'Właściciel Salonu',
        role: 'Wizja Klienta'
      },
      clientBenefits: {
        title: 'Korzyści Biznesowe',
        subtitle: 'Profesjonalna Obecność Online i Zaangażowanie Klientów',
        benefits: [
          {
            icon: 'calendar',
            title: 'Zintegrowany System Rezerwacji',
            description: 'Płynne połączenie z platformą Booksy umożliwia klientom rezerwację wizyt bezpośrednio ze strony'
          },
          {
            icon: 'users',
            title: 'Prezentacja Zespołu',
            description: 'Dedykowana sekcja przedstawiająca profesjonalny zespół ze szczegółowymi profilami i specjalizacjami'
          },
          {
            icon: 'scissors',
            title: 'Prezentacja Usług',
            description: 'Kompleksowy katalog usług salonu z opisami i elegancką prezentacją wizualną'
          },
          {
            icon: 'image',
            title: 'Portfolio Wizualne',
            description: 'Profesjonalna galeria prezentująca prace salonu i budująca zaufanie potencjalnych klientów'
          },
          {
            icon: 'map-pin',
            title: 'Lokalizacja i Kontakt',
            description: 'Interaktywna integracja map i kompleksowe informacje kontaktowe dla łatwego znalezienia salonu'
          },
          {
            icon: 'smartphone',
            title: 'Design Mobile-First',
            description: 'W pełni responsywny design zoptymalizowany pod urządzenia mobilne, gdzie większość klientów przegląda i rezerwuje'
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
      mainPageImage,
      mainPageImage,
      mainPageImage
    ],
    client: 'Nova Hair',
    duration: {
      en: '2 weeks',
      pl: '2 tygodnie'
    },
    year: '2024',
    projectUrl: 'https://prototyp-fryzjer.netlify.app/nova-hair',
    pageSpeedScores: createPageSpeedScores({
      mobile: {
        'Performance': 63,
        'Accessibility': 73,
        'Best Practices': 100,
        'SEO': 92
      },
      desktop: {
        'Performance': 92,
        'Accessibility': 78,
        'Best Practices': 100,
        'SEO': 92
      }
    }),
    pageSpeedUrl: 'https://pagespeed.web.dev/analysis/https-prototyp-fryzjer-netlify-app-nova-hair/ss3rsg63yb?form_factor=mobile'
  }
};