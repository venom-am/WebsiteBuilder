import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600">
      {/* Hero Section */}
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Websites
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Create stunning websites for your small business in minutes. No coding required.
            </p>
            <button
              onClick={() => navigate('/builder')}
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors"
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
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white"
            >
              <Globe className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Presence</h3>
              <p className="text-white/80">Get a beautiful, professional website that represents your business perfectly.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white"
            >
              <Code className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
              <p className="text-white/80">Simple form-based process. Fill in your details and get a complete website.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white"
            >
              <Sparkles className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
              <p className="text-white/80">Choose from beautiful color schemes and layouts that match your brand.</p>
            </motion.div>
          </div>

          {/* Customer Reviews */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                business: "Bloom Cafe",
                image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
                content: "Websites made it incredibly easy to create our cafe's online presence. The process was smooth and the result looks amazing!"
              },
              {
                name: "Michael Chen",
                business: "Tech Solutions Pro",
                image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
                content: "As a tech consultant, I needed a website that reflected professionalism. Websites delivered exactly what I needed."
              },
              {
                name: "Emma Davis",
                business: "Fitness First Studio",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
                content: "The website builder is perfect for small businesses. Our new website has helped us attract more clients!"
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-white/80">{review.business}</p>
                  </div>
                </div>
                <p className="text-white/90">{review.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;