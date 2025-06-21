import { Project, createPageSpeedScores } from "./types";
import coverImage from '../../assets/projects/saffron-thyme/saffron-thyme-cover.webp';
import mainPageImage from '../../assets/projects/saffron-thyme/main-page.webp';

export const saffronThyme: Project = {
    id: 'saffron-thyme',
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'i18next',
      'Vite'
    ],
    translations: {
      en: {
        title: 'Saffron & Thyme Restaurant',
        description: 'A modern, responsive restaurant website featuring an elegant menu presentation, and seamless reservation system',
        category: 'Restaurant website',
        fullDescription: [
          'A modern, responsive restaurant website designed to strengthen brand presence and simplify day-to-day customer interactions. The project focuses on clear menu presentation, an easy-to-use reservation system, and an elegant, polished design. Optimized for both SEO and mobile devices, the site ensures accessibility and smooth navigation across all platforms.',
            'The built-in content management system allows the restaurant owner to easily update the menu, business hours, or special offers — without relying on technical support.',
             'The project is a strong example of combining aesthetics, functionality, and real business value for the hospitality industry.'
        ],
        testimonial: {
          quote: 'We aimed to design a website that combines a stylish look with practical features, helping restaurants attract guests and build a strong online presence.',
          author: 'elvemo team',
          role: 'Our thoughts'
        },
        clientBenefits: {
          title: 'Benefits for Restaurants',
          subtitle: 'Why a modern website helps grow your business and simplify daily operations',
          benefits: [
            {
              icon: 'Users',
              title: 'More Guests',
              description: 'Improved online visibility and an easy booking system help bring in more customers – no phone calls needed.'
            },
            {
              icon: 'LayoutGrid',
              title: 'Perfect Online Business Card',
              description: 'A modern, elegant website gives your restaurant a professional first impression that builds trust instantly.'
            },
            {
              icon: 'Image',
              title: 'Easy-to-Browse Menu & Gallery',
              description: 'Your dishes, photos, and prices are always up to date and easy to access – on any device.'
            },
            {
              icon: 'Settings',
              title: 'Simple Management',
              description: 'Quickly update your menu, hours, or offers with an easy-to-use system – no tech skills required.'
            },
            {
              icon: 'Clock',
              title: 'Always Available',
              description: 'Your website works 24/7, so customers can check the menu, opening hours, or make a reservation anytime – even when you\'re closed.'
            }
          ]
        }        
      },
      pl: {
        title: 'Restauracja Saffron & Thyme',
        description: 'Nowoczesna, responsywna strona restauracji z obsługą wielu języków, elegancką prezentacją menu i płynnym systemem rezerwacji',
        category: 'Stona restauracji',
        fullDescription: [
         'Nowoczesna i responsywna strona internetowa dla restauracji, zaprojektowana z myślą o wzmocnieniu wizerunku marki oraz usprawnieniu codziennej obsługi klientów. Projekt skupia się na przejrzystej prezentacji menu, łatwym systemie rezerwacji oraz eleganckim, dopracowanym designie.',
          'Strona została zoptymalizowana pod kątem SEO i użytkowników mobilnych, co zapewnia wysoką dostępność i intuicyjne korzystanie na wszystkich urządzeniach.System zarządzania treścią pozwala właścicielowi lokalu w prosty sposób aktualizować menu, godziny otwarcia czy oferty specjalne – bez potrzeby wsparcia technicznego.',
          'Projekt stanowi przykład połączenia estetyki, funkcjonalności i realnej wartości biznesowej dla branży gastronomicznej.'
        ],

        testimonial: {
          quote: 'Chcieliśmy stworzyć stronę, która łączy elegancki wygląd z praktycznymi funkcjami, wspierając restaurację w przyciąganiu gości i budowaniu obecności online.',
          author: 'Zespół elvemo',
          role: 'Nasze przemyślenia'
        },
        clientBenefits: {
          title: 'Korzyści dla Restauracji',
          subtitle: 'Dlaczego nowoczesna strona to klucz do większej liczby gości i lepszego zarządzania lokalem',
          benefits: [
            {
              icon: 'Users',
              title: 'Więcej Gości',
              description: 'Dzięki lepszej widoczności w internecie i wygodnemu systemowi rezerwacji przyciągniesz więcej klientów – bez zbędnych telefonów.'
            },
            {
              icon: 'LayoutGrid',
              title: 'Idealna Wizytówka Online',
              description: 'Nowoczesna, estetyczna strona buduje profesjonalny wizerunek Twojej restauracji już przy pierwszym kliknięciu.'
            },
            {
              icon: 'Image',
              title: 'Menu i Galeria w Zasięgu Ręki',
              description: 'Twoje dania, zdjęcia i ceny są zawsze aktualne i łatwo dostępne – na telefonie, tablecie czy komputerze.'
            },
            {
              icon: 'Settings',
              title: 'Łatwe Zarządzanie',
              description: 'Prosty system pozwala Ci samodzielnie zmieniać menu, godziny otwarcia czy promocje – bez czekania na wsparcie techniczne.'
            },
            {
              icon: 'Clock',
              title: 'Zawsze Dostępna',
              description: 'Twoja strona działa 24/7 – klienci mogą sprawdzić menu, godziny otwarcia czy zarezerwować stolik o dowolnej porze, nawet gdy restauracja jest zamknięta.'
            }            
          ]
        }        
      }
    },
    portfolio: {
      image: mainPageImage // You'll need to add this image
    },
    projectPage: {
      image: coverImage, // You'll need to add this image
      gallery: [
        '/projects/saffron-thyme/gallery-1.jpg',
        '/projects/saffron-thyme/gallery-2.jpg',
        '/projects/saffron-thyme/gallery-3.jpg'
      ],
      client: 'elvemo',
      duration: {
        en: '4 days',
        pl: '4 dni'
      },
      year: '2025',
      projectUrl: 'https://saffron-thyme.netlify.app', // Replace with actual URL

      pageSpeedScores: createPageSpeedScores({
        mobile: {
          'Performance': 88,
          'Accessibility': 95,
          'Best Practices': 100,
          'SEO': 100
        },
        desktop: {
          'Performance': 98,
          'Accessibility': 95,
          'Best Practices': 100,
          'SEO': 100
        }
      }),
      pageSpeedUrl: 'https://pagespeed.web.dev/analysis/https-saffron-thyme-netlify-app/6ugca3y70n?form_factor=mobile'
    }
  };