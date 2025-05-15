import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { CompanyDetails, colorSchemes } from '../../types/website';

type CustomerReviewsProps = {
  colorScheme: CompanyDetails['colorScheme'];
};

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ colorScheme }) => {
  const reviews = [
    {
      name: "Samiksha",
      business: "Bloom Cafe",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      content: "Websites transformed our cafe's online presence. The form-based process was incredibly easy, and the result looks professional!",
      rating: 5
    },
    {
      name: "Chirag Sharma",
      business: "Tech Solutions Pro",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      content: "As a tech consultant, I needed a website that reflected professionalism. Websites delivered exactly what I needed, quickly and efficiently.",
      rating: 5
    },
    {
      name: "Mahi Shah",
      business: "Fitness First Studio",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      content: "The website builder made it so easy to create our fitness studio's website. Our clients love the modern, clean design!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what small business owners have to say about their experience with Websites.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.business}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`fill-current ${colorSchemes[colorScheme].text}`}
                  />
                ))}
              </div>

              <p className="text-gray-700">{review.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;