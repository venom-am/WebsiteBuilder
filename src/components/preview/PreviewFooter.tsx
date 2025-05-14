import React from 'react';
import { motion } from 'framer-motion';
import { ContactInfo, CompanyDetails, colorSchemes } from '../../types/website';
import { Building2 } from 'lucide-react';

type PreviewFooterProps = {
  companyName: string;
  contactInfo: ContactInfo;
  colorScheme: CompanyDetails['colorScheme'];
};

const PreviewFooter: React.FC<PreviewFooterProps> = ({ companyName, contactInfo, colorScheme }) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white py-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Building2 size={24} className={colorSchemes[colorScheme].text} />
              <span className="font-bold text-xl ml-2">{companyName || 'Company Name'}</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for all your needs. Quality and excellence in everything we do.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products & Services</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-400">
              {contactInfo.address && <p>{contactInfo.address}</p>}
              {contactInfo.city && contactInfo.state && (
                <p>
                  {contactInfo.city}, {contactInfo.state} {contactInfo.zipCode}
                </p>
              )}
              {contactInfo.country && <p>{contactInfo.country}</p>}
              {contactInfo.email && (
                <p className="mt-2">
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                    {contactInfo.email}
                  </a>
                </p>
              )}
              {contactInfo.phone && (
                <p>
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">
                    {contactInfo.phone}
                  </a>
                </p>
              )}
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
          <p>&copy; {currentYear} {companyName || 'Company Name'}. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default PreviewFooter;