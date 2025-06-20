import React from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Smartphone, Edit, Shield, Layout, Image, Settings, Clock, Map, Globe, ShieldCheck, User, HelpCircle, HandCoins, Database, Puzzle, Atom, FlaskConical, Hand, GraduationCap } from 'lucide-react';

const iconComponents = {
  // PascalCase icons
  Search,
  Users,
  Smartphone,
  Edit,
  Shield,
  Layout,
  LayoutGrid: Layout,
  Image,
  Settings,
  Clock,
  Map,
  Globe,
  ShieldCheck,
  User,
  HelpCircle,
  HandCoins,
  Database,
  Puzzle,
  Atom,
  FlaskConical,
  Hand,
  GraduationCap,
  // kebab-case icons
  'shield-check': ShieldCheck,
  'user-friendly': User,
  'help-circle': HelpCircle,
  'hand-coins': HandCoins,
  'database': Database,
  'puzzle': Puzzle,
  'atom': Atom,
  'flask-conical': FlaskConical,
  'hand': Hand,
  'graduation-cap': GraduationCap
};

interface ClientBenefitsProps {
  title: string;
  subtitle: string;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const ClientBenefits: React.FC<ClientBenefitsProps> = ({ title, subtitle, benefits }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="mt-16"
    >
      <div className="text-center mb-12">
        <motion.h3
          variants={itemVariants}
          className="text-2xl font-bold mb-4 bg-gradient-to-r from-white via-violet-200 to-gray-300 text-transparent bg-clip-text"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={itemVariants}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {benefits.map((benefit, index) => {
          // Try both PascalCase and kebab-case versions of the icon name
          const iconName = benefit.icon;
          const pascalCaseName = iconName.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join('');
          
          const IconComponent = iconComponents[iconName as keyof typeof iconComponents] || 
                              iconComponents[pascalCaseName as keyof typeof iconComponents] || 
                              iconComponents['help-circle'];
          
          if (!IconComponent) {
            console.warn(`Icon "${iconName}" not found, using fallback icon`);
          }
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-900/90 to-violet-900/20 rounded-2xl p-4 md:p-6 border border-violet-500/10 shadow-2xl shadow-violet-900/20 backdrop-blur-2xl h-full transition-all duration-300 group-hover:shadow-violet-900/30">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex flex-col items-center text-center gap-3 md:flex-row md:items-start md:text-left md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400 border border-violet-500/10 shadow-lg shadow-violet-900/20">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">
                      {benefit.title}
                    </h4>
                    
                    <p className="text-gray-400 text-xs md:text-base hidden md:block">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ClientBenefits; 