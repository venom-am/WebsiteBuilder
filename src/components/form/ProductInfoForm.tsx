import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { ProductInfo, colorSchemes, CompanyDetails } from '../../types/website';
import { ChevronLeft, ChevronRight, Plus, X, List } from 'lucide-react';

type ProductInfoFormProps = {
  products: ProductInfo[];
  colorScheme: CompanyDetails['colorScheme'];
  onAddProduct: () => void;
  onUpdateProduct: (id: string, product: Partial<ProductInfo>) => void;
  onRemoveProduct: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
};

const ProductInfoForm: React.FC<ProductInfoFormProps> = ({
  products,
  colorScheme,
  onAddProduct,
  onUpdateProduct,
  onRemoveProduct,
  onNext,
  onPrev,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    products.forEach((product, index) => {
      if (!product.name.trim()) {
        newErrors[`product-${index}-name`] = 'Product name is required';
      }

      if (!product.description.trim()) {
        newErrors[`product-${index}-description`] = 'Product description is required';
      }

      // Validate at least one feature
      if (product.features.length === 0 || !product.features.some(feature => feature.trim() !== '')) {
        newErrors[`product-${index}-features`] = 'At least one feature is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleProductNameChange = (id: string, value: string) => {
    onUpdateProduct(id, { name: value });
    
    // Clear error if exists
    const index = products.findIndex(p => p.id === id);
    if (errors[`product-${index}-name`]) {
      const newErrors = { ...errors };
      delete newErrors[`product-${index}-name`];
      setErrors(newErrors);
    }
  };

  const handleProductDescriptionChange = (id: string, value: string) => {
    onUpdateProduct(id, { description: value });
    
    // Clear error if exists
    const index = products.findIndex(p => p.id === id);
    if (errors[`product-${index}-description`]) {
      const newErrors = { ...errors };
      delete newErrors[`product-${index}-description`];
      setErrors(newErrors);
    }
  };

  const handleFeatureChange = (productId: string, index: number, value: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    
    onUpdateProduct(productId, { features: newFeatures });
    
    // Clear error if exists
    const productIndex = products.findIndex(p => p.id === productId);
    if (errors[`product-${productIndex}-features`]) {
      const newErrors = { ...errors };
      delete newErrors[`product-${productIndex}-features`];
      setErrors(newErrors);
    }
  };

  const addFeature = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    onUpdateProduct(productId, { 
      features: [...product.features, ''] 
    });
  };

  const removeFeature = (productId: string, featureIndex: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const newFeatures = product.features.filter((_, index) => index !== featureIndex);
    onUpdateProduct(productId, { features: newFeatures });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.form 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl font-bold mb-6 text-gray-800"
      >
        Products & Services
      </motion.h2>
      
      {products.length > 1 && (
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {products.map((product, index) => (
              <motion.button
                key={product.id}
                type="button"
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  activeProductIndex === index 
                    ? `${colorSchemes[colorScheme].primary} text-white` 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveProductIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {product.name || `Product ${index + 1}`}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProductIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {products.map((product, index) => (
            <div key={product.id} className={index === activeProductIndex ? 'block' : 'hidden'}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {product.name ? product.name : `Product ${index + 1}`}
                </h3>
                
                {products.length > 1 && (
                  <Button
                    type="button"
                    variant="text"
                    onClick={() => onRemoveProduct(product.id)}
                    className="text-red-500 hover:bg-red-50"
                    icon={<X size={18} />}
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <motion.div variants={itemVariants}>
                <Input
                  label="Product/Service Name"
                  id={`product-${index}-name`}
                  value={product.name}
                  onChange={(e) => handleProductNameChange(product.id, e.target.value)}
                  required
                  error={errors[`product-${index}-name`]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <TextArea
                  label="Description"
                  id={`product-${index}-description`}
                  value={product.description}
                  onChange={(e) => handleProductDescriptionChange(product.id, e.target.value)}
                  required
                  error={errors[`product-${index}-description`]}
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                  {errors[`product-${index}-features`] && (
                    <span className="text-red-500 text-sm ml-2">
                      {errors[`product-${index}-features`]}
                    </span>
                  )}
                </label>
                
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex mb-2">
                    <div className="mr-2 mt-3">
                      <List size={16} className="text-gray-400" />
                    </div>
                    <div className="flex-grow">
                      <Input
                        label={`Feature ${featureIndex + 1}`}
                        id={`product-${index}-feature-${featureIndex}`}
                        value={feature}
                        onChange={(e) => handleFeatureChange(product.id, featureIndex, e.target.value)}
                      />
                    </div>
                    {product.features.length > 1 && (
                      <button
                        type="button"
                        className="ml-2 text-gray-400 hover:text-red-500 self-center"
                        onClick={() => removeFeature(product.id, featureIndex)}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  icon={<Plus size={16} />}
                  iconPosition="left"
                  onClick={() => addFeature(product.id)}
                >
                  Add Feature
                </Button>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      <motion.div variants={itemVariants} className="mt-6">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          color="bg-gray-100"
          hoverColor="hover:bg-gray-200"
          icon={<Plus size={18} />}
          iconPosition="left"
          onClick={onAddProduct}
        >
          Add Another Product/Service
        </Button>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-8 flex justify-between"
      >
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrev}
          icon={<ChevronLeft size={18} />}
          iconPosition="left"
        >
          Previous
        </Button>
        
        <Button 
          type="submit" 
          variant="primary" 
          color={colorSchemes[colorScheme].primary}
          hoverColor={colorSchemes[colorScheme].primaryHover}
          icon={<ChevronRight size={18} />}
          iconPosition="right"
        >
          Preview Website
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ProductInfoForm;