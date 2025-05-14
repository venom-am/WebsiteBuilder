import React from 'react';
import { motion } from 'framer-motion';
import { ContactInfo, CompanyDetails, colorSchemes } from '../../types/website';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

type PreviewContactProps = {
  contactInfo: ContactInfo;
  colorScheme: CompanyDetails['colorScheme'];
};

const PreviewContact: React.FC<PreviewContactProps> = ({ contactInfo, colorScheme }) => {
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

  const fullAddress = [
    contactInfo.address,
    contactInfo.city,
    contactInfo.state,
    contactInfo.zipCode,
    contactInfo.country,
  ].filter(Boolean).join(', ');

  const hasSocialMedia = Object.values(contactInfo.socialMedia).some(value => value && value.trim() !== '');

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={`py-20 px-4 bg-gradient-to-br ${colorSchemes[colorScheme].gradient} text-white`}
    >
      <div className="container mx-auto">
        <motion.h2 
          variants={fadeInUp}
          className="text-3xl font-bold mb-2 text-center"
        >
          Contact Us
        </motion.h2>
        
        <motion.p 
          variants={fadeInUp}
          className="text-lg text-white/80 mb-12 text-center max-w-3xl mx-auto"
        >
          Get in touch with our team. We'd love to hear from you!
        </motion.p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={fadeInUp}>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.email && (
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-white/20 p-2 rounded-full">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-white/60">Email</p>
                      <p className="font-medium">{contactInfo.email}</p>
                    </div>
                  </div>
                )}
                
                {contactInfo.phone && (
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-white/20 p-2 rounded-full">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-white/60">Phone</p>
                      <p className="font-medium">{contactInfo.phone}</p>
                    </div>
                  </div>
                )}
                
                {fullAddress && (
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-white/20 p-2 rounded-full">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-white/60">Address</p>
                      <p className="font-medium">{fullAddress}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {hasSocialMedia && (
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    {contactInfo.socialMedia.facebook && (
                      <a href={contactInfo.socialMedia.facebook} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Facebook size={20} />
                      </a>
                    )}
                    
                    {contactInfo.socialMedia.twitter && (
                      <a href={contactInfo.socialMedia.twitter} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Twitter size={20} />
                      </a>
                    )}
                    
                    {contactInfo.socialMedia.instagram && (
                      <a href={contactInfo.socialMedia.instagram} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Instagram size={20} />
                      </a>
                    )}
                    
                    {contactInfo.socialMedia.linkedin && (
                      <a href={contactInfo.socialMedia.linkedin} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Linkedin size={20} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
              
              <form>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                    placeholder="Your name" 
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50"
                    placeholder="your.email@example.com" 
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm mb-1">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/50 resize-none"
                    placeholder="How can we help you?" 
                  />
                </div>
                
                <button 
                  type="button" 
                  className="px-6 py-3 bg-white text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PreviewContact;