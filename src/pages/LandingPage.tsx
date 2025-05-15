import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code, Sparkles, ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Navbar from '../components/layout/Navbar';
import { ThemeProvider } from '../context/ThemeProvider';
import { WebsiteStats } from '../components/charts/RadarChart';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const handleStartBuilding = () => {
    if (isSignedIn) {
      navigate('/builder');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        
        
        <section className="relative overflow-hidden pt-20 pb-12 lg:pt-32 lg:pb-28 px-4">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                Create Your Dream Website
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Transform your business with a stunning, professional website. No coding required.
              </p>
              <button
                onClick={handleStartBuilding}
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg hover:from-pink-600 hover:to-violet-600 transition-all transform hover:scale-105"
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <Globe className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Professional Presence</h3>
                <p className="text-white/80">Get a beautiful, professional website that represents your business perfectly.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <Code className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
                <p className="text-white/80">Simple form-based process. Fill in your details and get a complete website.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <Sparkles className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
                <p className="text-white/80">Choose from beautiful color schemes and layouts that match your brand.</p>
              </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <WebsiteStats />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                About Our Platform
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We're on a mission to help small businesses establish their online presence with beautiful, professional websites. Our platform makes it easy for anyone to create a stunning website without any technical knowledge.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-900 dark:text-indigo-200">Easy to Use</h3>
                  <p className="text-gray-600 dark:text-gray-300">Our intuitive interface makes website creation a breeze. No coding required!</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-900 dark:text-indigo-200">Customizable</h3>
                  <p className="text-gray-600 dark:text-gray-300">Choose from various color schemes and layouts to match your brand.</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-900 dark:text-indigo-200">Mobile Friendly</h3>
                  <p className="text-gray-600 dark:text-gray-300">All websites are automatically optimized for mobile devices.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
                    alt="Website Builder"
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-white/80 max-w-3xl mx-auto">
                Have questions? We're here to help! Reach out to us through any of the following channels.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white text-center"
              >
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-white/80">abhishekmisal2169@gmail.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white text-center"
              >
                <Phone className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-white/80">+91 8625824696</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white text-center"
              >
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                <p className="text-white/80">FC road , near Starbucks , Pune</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Website Builder</h3>
                <p className="text-gray-400">
                  Creating beautiful websites for businesses worldwide.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="/builder" className="hover:text-white transition-colors">Start Building</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://x.com/Abhispeaks_" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook size={24} />
                  </a>
                  <a href="https://x.com/Abhispeaks_" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter size={24} />
                  </a>
                  <a href="https://x.com/Abhispeaks_" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/abhishekmisal2169/" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Website Builder. All rights reserved. Made with ❤️ by Abhishek Misal</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;