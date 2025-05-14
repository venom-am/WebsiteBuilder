import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import ColorSchemeSelector from '../ui/ColorSchemeSelector';
import { CompanyDetails, colorSchemes } from '../../types/website';
import { ChevronRight } from 'lucide-react';

type CompanyDetailsFormProps = {
  companyDetails: CompanyDetails;
  onUpdateCompanyDetails: (details: Partial<CompanyDetails>) => void;
  onNext: () => void;
};

const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({
  companyDetails,
  onUpdateCompanyDetails,
  onNext,
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof CompanyDetails, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CompanyDetails, string>> = {};

    if (!companyDetails.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (!companyDetails.tagline.trim()) {
      newErrors.tagline = 'Tagline is required';
    }

    if (!companyDetails.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!companyDetails.industry.trim()) {
      newErrors.industry = 'Industry is required';
    }

    if (!companyDetails.foundedYear.trim()) {
      newErrors.foundedYear = 'Founded year is required';
    } else if (!/^\d{4}$/.test(companyDetails.foundedYear)) {
      newErrors.foundedYear = 'Please enter a valid year (e.g., 2020)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleChange = (field: keyof CompanyDetails, value: string) => {
    onUpdateCompanyDetails({ [field]: value });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleColorSchemeChange = (scheme: CompanyDetails['colorScheme']) => {
    onUpdateCompanyDetails({ colorScheme: scheme });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.form 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 md:p-8"
    >
      <motion.h2 
        variants={fadeInUp}
        className="text-2xl font-bold mb-6 text-gray-800"
      >
        Company Details
      </motion.h2>
      
      <motion.div variants={fadeInUp}>
        <Input
          label="Company Name"
          id="companyName"
          value={companyDetails.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
          error={errors.name}
        />
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <Input
          label="Tagline"
          id="tagline"
          value={companyDetails.tagline}
          onChange={(e) => handleChange('tagline', e.target.value)}
          placeholder="A short slogan describing your company"
          required
          error={errors.tagline}
        />
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <TextArea
          label="Company Description"
          id="description"
          value={companyDetails.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Tell us about your company"
          required
          error={errors.description}
          rows={5}
        />
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <Input
          label="Industry"
          id="industry"
          value={companyDetails.industry}
          onChange={(e) => handleChange('industry', e.target.value)}
          placeholder="E.g., Technology, Healthcare, Education"
          required
          error={errors.industry}
        />
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <Input
          label="Founded Year"
          id="foundedYear"
          type="number"
          value={companyDetails.foundedYear}
          onChange={(e) => handleChange('foundedYear', e.target.value)}
          placeholder="E.g., 2020"
          required
          error={errors.foundedYear}
        />
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <ColorSchemeSelector
          selectedScheme={companyDetails.colorScheme}
          onChange={handleColorSchemeChange}
        />
      </motion.div>
      
      <motion.div 
        variants={fadeInUp}
        className="mt-8 flex justify-end"
      >
        <Button 
          type="submit" 
          variant="primary" 
          color={colorSchemes[companyDetails.colorScheme].primary}
          hoverColor={colorSchemes[companyDetails.colorScheme].primaryHover}
          icon={<ChevronRight size={18} />}
          iconPosition="right"
        >
          Continue
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default CompanyDetailsForm;