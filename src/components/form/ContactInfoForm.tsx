import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ContactInfo, colorSchemes, CompanyDetails } from '../../types/website';
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

type ContactInfoFormProps = {
  contactInfo: ContactInfo;
  colorScheme: CompanyDetails['colorScheme'];
  onUpdateContactInfo: (info: Partial<ContactInfo>) => void;
  onNext: () => void;
  onPrev: () => void;
};

const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  contactInfo,
  colorScheme,
  onUpdateContactInfo,
  onNext,
  onPrev,
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo | string, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactInfo | string, string>> = {};

    if (!contactInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!contactInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!contactInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!contactInfo.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!contactInfo.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!contactInfo.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    }

    if (!contactInfo.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // Validate social media URLs if provided
    if (contactInfo.socialMedia.facebook && !/^https?:\/\//.test(contactInfo.socialMedia.facebook)) {
      newErrors['socialMedia.facebook'] = 'Please enter a valid URL';
    }

    if (contactInfo.socialMedia.twitter && !/^https?:\/\//.test(contactInfo.socialMedia.twitter)) {
      newErrors['socialMedia.twitter'] = 'Please enter a valid URL';
    }

    if (contactInfo.socialMedia.instagram && !/^https?:\/\//.test(contactInfo.socialMedia.instagram)) {
      newErrors['socialMedia.instagram'] = 'Please enter a valid URL';
    }

    if (contactInfo.socialMedia.linkedin && !/^https?:\/\//.test(contactInfo.socialMedia.linkedin)) {
      newErrors['socialMedia.linkedin'] = 'Please enter a valid URL';
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

  const handleChange = (field: keyof ContactInfo, value: string) => {
    onUpdateContactInfo({ [field]: value });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSocialMediaChange = (platform: keyof ContactInfo['socialMedia'], value: string) => {
    onUpdateContactInfo({
      socialMedia: {
        ...contactInfo.socialMedia,
        [platform]: value,
      },
    });
    
    // Clear error for this field if it exists
    if (errors[`socialMedia.${platform}`]) {
      setErrors({ ...errors, [`socialMedia.${platform}`]: undefined });
    }
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
        Contact Information
      </motion.h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div variants={fadeInUp}>
          <Input
            label="Email Address"
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            error={errors.email}
          />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <Input
            label="Phone Number"
            id="phone"
            value={contactInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            error={errors.phone}
          />
        </motion.div>
      </div>
      
      <motion.div variants={fadeInUp}>
        <Input
          label="Street Address"
          id="address"
          value={contactInfo.address}
          onChange={(e) => handleChange('address', e.target.value)}
          required
          error={errors.address}
        />
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div variants={fadeInUp}>
          <Input
            label="City"
            id="city"
            value={contactInfo.city}
            onChange={(e) => handleChange('city', e.target.value)}
            required
            error={errors.city}
          />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <Input
            label="State/Province"
            id="state"
            value={contactInfo.state}
            onChange={(e) => handleChange('state', e.target.value)}
            required
            error={errors.state}
          />
        </motion.div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div variants={fadeInUp}>
          <Input
            label="Zip/Postal Code"
            id="zipCode"
            value={contactInfo.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            required
            error={errors.zipCode}
          />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <Input
            label="Country"
            id="country"
            value={contactInfo.country}
            onChange={(e) => handleChange('country', e.target.value)}
            required
            error={errors.country}
          />
        </motion.div>
      </div>
      
      <motion.h3 
        variants={fadeInUp}
        className="font-medium mt-6 mb-4 text-gray-800"
      >
        Social Media (Optional)
      </motion.h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div variants={fadeInUp} className="relative">
          <Facebook size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            label="Facebook URL"
            id="facebook"
            value={contactInfo.socialMedia.facebook || ''}
            onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
            className="pl-8"
            error={errors['socialMedia.facebook']}
          />
        </motion.div>
        
        <motion.div variants={fadeInUp} className="relative">
          <Twitter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            label="Twitter URL"
            id="twitter"
            value={contactInfo.socialMedia.twitter || ''}
            onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
            className="pl-8"
            error={errors['socialMedia.twitter']}
          />
        </motion.div>
        
        <motion.div variants={fadeInUp} className="relative">
          <Instagram size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            label="Instagram URL"
            id="instagram"
            value={contactInfo.socialMedia.instagram || ''}
            onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
            className="pl-8"
            error={errors['socialMedia.instagram']}
          />
        </motion.div>
        
        <motion.div variants={fadeInUp} className="relative">
          <Linkedin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            label="LinkedIn URL"
            id="linkedin"
            value={contactInfo.socialMedia.linkedin || ''}
            onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
            className="pl-8"
            error={errors['socialMedia.linkedin']}
          />
        </motion.div>
      </div>
      
      <motion.div 
        variants={fadeInUp}
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
          Continue
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ContactInfoForm;