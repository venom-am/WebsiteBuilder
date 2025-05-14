import React from 'react';
import { motion } from 'framer-motion';
import { CompanyDetails, colorSchemes } from '../../types/website';
import { Globe, Code, Sparkles } from 'lucide-react';

type PreviewHeroProps = {
  companyName: string;
  tagline: string;
  colorScheme: CompanyDetails['colorScheme'];
};

const PreviewHero: React.FC<PreviewHeroProps> = ({ companyName, tagline, colorScheme }) => {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-gradient-to-br ${colorSchemes[colorScheme].gradient} text-white py-32 px-4 relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Websites
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Transforming Small Businesses with Beautiful, Custom-Built Websites
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Globe className="w-12 h-12 mb-4 mx-auto text-white/90" />
              <h3 className="text-xl font-semibold mb-2">Professional Presence</h3>
              <p className="text-white/80">Establish your brand online with a stunning website</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Code className="w-12 h-12 mb-4 mx-auto text-white/90" />
              <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
              <p className="text-white/80">Simple form-based website creation process</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Sparkles className="w-12 h-12 mb-4 mx-auto text-white/90" />
              <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
              <p className="text-white/80">Tailored to your brand and business needs</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#products"
              className={`px-8 py-4 rounded-lg bg-white text-center ${colorSchemes[colorScheme].text} font-medium hover:bg-gray-100 transition-colors text-lg`}
            >
              Get Started Now
            </a>
            
            <a
              href="#contact"
              className="px-8 py-4 rounded-lg bg-black/20 text-white font-medium hover:bg-black/30 transition-colors text-center text-lg"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PreviewHero;