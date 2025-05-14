import React from 'react';
import { motion } from 'framer-motion';
import { ProductInfo, CompanyDetails, colorSchemes } from '../../types/website';
import { Check } from 'lucide-react';

type PreviewProductsProps = {
  products: ProductInfo[];
  colorScheme: CompanyDetails['colorScheme'];
};

const PreviewProducts: React.FC<PreviewProductsProps> = ({ products, colorScheme }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      id="products"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="py-20 px-4"
    >
      <div className="container mx-auto">
        <motion.h2 
          variants={fadeInUp}
          className="text-3xl font-bold mb-2 text-center"
        >
          Our Products & Services
        </motion.h2>
        
        <motion.p 
          variants={fadeInUp}
          className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto"
        >
          Discover what we offer to help you achieve your goals
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <div 
                className={`h-48 ${colorSchemes[colorScheme].secondary} flex items-center justify-center`}
              >
                <div className={`text-4xl font-bold ${colorSchemes[colorScheme].text}`}>
                  {product.name.charAt(0) || `P${index + 1}`}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  {product.name || `Product ${index + 1}`}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {product.description || 'Product description goes here.'}
                </p>
                
                <h4 className="font-medium mb-2">Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className={`mr-2 ${colorSchemes[colorScheme].text} flex-shrink-0 mt-1`}>
                        <Check size={16} />
                      </span>
                      <span>{feature || 'Feature description'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PreviewProducts;