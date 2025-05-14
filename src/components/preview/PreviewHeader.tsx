import React from 'react';
import { motion } from 'framer-motion';
import { CompanyDetails, colorSchemes } from '../../types/website';
import { Building2 } from 'lucide-react';

type PreviewHeaderProps = {
  companyName: string;
  colorScheme: CompanyDetails['colorScheme'];
};

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ companyName, colorScheme }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 ${colorSchemes[colorScheme].primary} text-white shadow-md`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Building2 size={24} className="mr-2" />
          <span className="font-bold text-xl">{companyName || 'Company Name'}</span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-white/80 transition-colors">Home</a>
          <a href="#about" className="hover:text-white/80 transition-colors">About</a>
          <a href="#products" className="hover:text-white/80 transition-colors">Products</a>
          <a href="#contact" className="hover:text-white/80 transition-colors">Contact</a>
        </nav>
        
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16m-7 6h7" 
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default PreviewHeader;