import { Project, createPageSpeedScores } from "./types";
import mainPageImage from '../../assets/projects/vibly-sandbox/main-page.webp';

export const vibblySandbox: Project = {
    id: 'vibly-sandbox',
    stack: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Vite'
    ],
    translations: {
        en: {
            title: 'Vibbly Sandbox',
            description: 'An interactive creative coding sandbox for testing animations and visual effects.',
            category: 'Creative Coding',
            fullDescription: [
                'Vibbly Sandbox is an internal tool developed for rapid prototyping of animations, visual effects, and interactive UI elements. It allows developers and designers to experiment with Framer Motion and other libraries in a controlled environment, accelerating the creative process.',
                'This project showcases advanced animation techniques, performance optimization for complex visuals, and a modular architecture that allows for easy extension with new experiments.'
            ],
            testimonial: {
                quote: 'This sandbox was instrumental in refining the animations you see across our projects. It's a testament to our commitment to quality and innovation.',
                author: 'elvemo team',
                role: 'Our thoughts'
            },
            clientBenefits: {
                title: 'Benefits for Development',
                subtitle: 'How a creative sandbox improves project quality.',
                benefits: [
                    {
                        icon: 'Zap',
                        title: 'Rapid Prototyping',
                        description: 'Quickly test and iterate on complex animations and interactions without affecting the main project.'
                    },
                    {
                        icon: 'Code',
                        title: 'Code Reusability',
                        description: 'Develop and refine reusable animation components that can be deployed across multiple projects.'
                    },
                    {
                        icon: 'Sparkles',
                        title: 'Fostering Innovation',
                        description: 'An environment dedicated to experimentation encourages creative solutions and pushes visual boundaries.'
                    }
                ]
            }
        },
        pl: {
            title: 'Vibbly Sandbox',
            description: 'Interaktywny sandbox do kreatywnego kodowania, testowania animacji i efektów wizualnych.',
            category: 'Creative Coding',
            fullDescription: [
                'Vibbly Sandbox to wewnętrzne narzędzie stworzone do szybkiego prototypowania animacji, efektów wizualnych i interaktywnych elementów UI. Pozwala deweloperom i projektantom eksperymentować z Framer Motion i innymi bibliotekami w kontrolowanym środowisku, przyspieszając proces twórczy.',
                'Ten projekt demonstruje zaawansowane techniki animacji, optymalizację wydajności dla złożonych wizualizacji oraz modułową architekturę, która pozwala na łatwe rozszerzanie o nowe eksperymenty.'
            ],
            testimonial: {
                quote: 'Ten sandbox był kluczowy w dopracowywaniu animacji, które widzisz w naszych projektach. To świadectwo naszego zaangażowania w jakość i innowację.',
                author: 'Zespół elvemo',
                role: 'Nasze przemyślenia'
            },
            clientBenefits: {
                title: 'Korzyści dla Rozwoju',
                subtitle: 'Jak kreatywny sandbox poprawia jakość projektów.',
                benefits: [
                    {
                        icon: 'Zap',
                        title: 'Szybkie Prototypowanie',
                        description: 'Szybko testuj i iteruj na złożonych animacjach i interakcjach bez wpływu na główny projekt.'
                    },
                    {
                        icon: 'Code',
                        title: 'Reużywalność Kodu',
                        description: 'Rozwijaj i dopracowuj reużywalne komponenty animacji, które można wdrażać w wielu projektach.'
                    },
                    {
                        icon: 'Sparkles',
                        title: 'Wspieranie Innowacji',
                        description: 'Środowisko dedykowane eksperymentom zachęca do kreatywnych rozwiązań i przesuwania wizualnych granic.'
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
            '/projects/vibly-sandbox/gallery-1.jpg',
            '/projects/vibly-sandbox/gallery-2.jpg',
            '/projects/vibly-sandbox/gallery-3.jpg'
        ],
        client: 'Internal',
        duration: {
            en: 'Ongoing',
            pl: 'W toku'
        },
        year: '2024',
        projectUrl: '#', 
        pageSpeedScores: createPageSpeedScores({
            mobile: {
                'Performance': 95,
                'Accessibility': 100,
                'Best Practices': 100,
                'SEO': 90
            },
            desktop: {
                'Performance': 99,
                'Accessibility': 100,
                'Best Practices': 100,
                'SEO': 90
            }
        }),
        pageSpeedUrl: '#'
    }
}; 