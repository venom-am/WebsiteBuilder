import React, { createContext, useContext, useState } from 'react';
import { WebsiteData, defaultWebsiteData, ProductInfo } from '../types/website';

type WebsiteContextType = {
  websiteData: WebsiteData;
  updateCompanyDetails: (details: Partial<WebsiteData['companyDetails']>) => void;
  updateContactInfo: (info: Partial<WebsiteData['contactInfo']>) => void;
  addProduct: () => void;
  updateProduct: (id: string, product: Partial<ProductInfo>) => void;
  removeProduct: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
};

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [websiteData, setWebsiteData] = useState<WebsiteData>(defaultWebsiteData);

  const updateCompanyDetails = (details: Partial<WebsiteData['companyDetails']>) => {
    setWebsiteData((prev) => ({
      ...prev,
      companyDetails: {
        ...prev.companyDetails,
        ...details,
      },
    }));
  };

  const updateContactInfo = (info: Partial<WebsiteData['contactInfo']>) => {
    setWebsiteData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        ...info,
      },
    }));
  };

  const addProduct = () => {
    const newProduct: ProductInfo = {
      id: Date.now().toString(),
      name: '',
      description: '',
      features: [''],
      image: null,
    };
    
    setWebsiteData((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
  };

  const updateProduct = (id: string, product: Partial<ProductInfo>) => {
    setWebsiteData((prev) => ({
      ...prev,
      products: prev.products.map((p) => 
        p.id === id ? { ...p, ...product } : p
      ),
    }));
  };

  const removeProduct = (id: string) => {
    setWebsiteData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  const nextStep = () => {
    setWebsiteData((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 3),
    }));
  };

  const prevStep = () => {
    setWebsiteData((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  };

  const goToStep = (step: number) => {
    setWebsiteData((prev) => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, 3)),
    }));
  };

  return (
    <WebsiteContext.Provider
      value={{
        websiteData,
        updateCompanyDetails,
        updateContactInfo,
        addProduct,
        updateProduct,
        removeProduct,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = (): WebsiteContextType => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
};