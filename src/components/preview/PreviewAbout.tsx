import React from 'react';
import { motion } from 'framer-motion';
import { CompanyDetails, colorSchemes } from '../../types/website';
import { Calendar, Briefcase } from 'lucide-react';

type PreviewAboutProps = {
  description: string;
  industry: string;
  foundedYear: string;
  colorScheme: CompanyDetails['colorScheme'];
};

const PreviewAbout: React.FC<PreviewAboutProps> = ({
  description,
  industry,
  foundedYear,
  colorScheme,
}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-20 px-4 bg-gray-50"
    >
      <div className="container mx-auto">
        <motion.h2 
          variants={fadeInUp} 
          className="text-3xl font-bold mb-8 text-center"
        >
          About Us
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={fadeInUp}>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              {description || 'Company description goes here.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${colorSchemes[colorScheme].secondary} ${colorSchemes[colorScheme].text} mr-3`}>
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{industry || 'Industry'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${colorSchemes[colorScheme].secondary} ${colorSchemes[colorScheme].text} mr-3`}>
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Founded</p>
                  <p className="font-medium">{foundedYear || 'Year'}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className={`rounded-lg overflow-hidden bg-gradient-to-br ${colorSchemes[colorScheme].gradient} h-64 md:h-80`}
          >
            {/* Placeholder for company image or illustration */}
            <div className="h-full flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-xl font-medium mb-2">Our Mission</p>
                <p className="px-6">Delivering excellence and innovation in everything we do</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PreviewAbout;