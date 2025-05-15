import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/form/ProgressBar';
import CompanyDetailsForm from '../components/form/CompanyDetailsForm';
import ContactInfoForm from '../components/form/ContactInfoForm';
import ProductInfoForm from '../components/form/ProductInfoForm';
import WebsitePreview from '../components/preview/WebsitePreview';
import { useWebsite } from '../context/WebsiteContext';
import { ArrowLeft } from 'lucide-react';

const WebsiteBuilder: React.FC = () => {
  const navigate = useNavigate();
  const {
    websiteData,
    updateCompanyDetails,
    updateContactInfo,
    addProduct,
    updateProduct,
    removeProduct,
    nextStep,
    prevStep,
    goToStep,
  } = useWebsite();

  const { currentStep, companyDetails, contactInfo, products } = websiteData;
  const steps = ['Company Details', 'Contact Information', 'Products & Services', 'Preview'];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CompanyDetailsForm
            companyDetails={companyDetails}
            onUpdateCompanyDetails={updateCompanyDetails}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <ContactInfoForm
            contactInfo={contactInfo}
            colorScheme={companyDetails.colorScheme}
            onUpdateContactInfo={updateContactInfo}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 2:
        return (
          <ProductInfoForm
            products={products}
            colorScheme={companyDetails.colorScheme}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onRemoveProduct={removeProduct}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <WebsitePreview
            websiteData={websiteData}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Website Builder
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create your professional website by filling out the information below. Our intelligent builder will generate a beautiful, custom website for your business.
            </p>
          </div>
        </motion.div>

        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onStepClick={goToStep}
          className="max-w-4xl mx-auto"
        />

        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;