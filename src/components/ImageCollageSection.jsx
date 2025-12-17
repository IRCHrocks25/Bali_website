import React from 'react';
import { motion } from 'framer-motion';

const ImageCollageSection = () => {
  const images = [
    {
      src: '/images/hp_images/HP Image Selection/cauliflower steak.jpg',
      alt: 'Cauliflower Steak'
    },
    {
      src: '/images/hp_images/HP Image Selection/DSC04720.jpeg',
      alt: 'Culinary Experience'
    },
    {
      src: '/images/hp_images/HP Image Selection/IMG_0904.JPG',
      alt: 'Chef Preparation'
    },
    {
      src: '/images/hp_images/HP Image Selection/king prawn salmon(1).JPG',
      alt: 'King Prawn Salmon'
    },
    {
      src: '/images/hp_images/HP Image Selection/IMG_6740.JPG',
      alt: 'Dish Presentation'
    },
    {
      src: '/images/hp_images/HP Image Selection/IMG_0024.JPG',
      alt: 'Fresh Ingredients'
    },
    {
      src: '/images/hp_images/HP Image Selection/DSC04900.jpeg',
      alt: 'Fine Dining'
    }
  ];

  return (
    <section className="w-full bg-background py-8 md:py-12 lg:py-16">
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden group aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCollageSection;

