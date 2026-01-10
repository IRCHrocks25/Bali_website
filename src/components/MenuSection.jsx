import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { usePageContent } from '@/hooks/usePageContent';

const MenuSection = ({ onMenuClick }) => {
  const { content, loading } = usePageContent();

  if (loading || !content) {
    return null;
  }

  return (
    <section id="menu" className="py-16 md:py-20 lg:py-24 bg-[#000000]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Quote Section - Top Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <p className="font-script text-white italic text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-5 lg:mb-6 leading-relaxed">
            "The perfect place to hang out with friends!
            <br />
            The Club Bali has it all."
          </p>
          <p className="font-script text-[#E8D9A8] italic text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            Maxine de Francesco
          </p>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Text Content - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-white order-2 lg:order-1"
          >
            {/* Logo */}
            <div className="mb-8 md:mb-10 flex justify-center lg:justify-start">
              <img 
                src="/images/hero/bali_club_logo.png" 
                alt="The Club Bali" 
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
              />
            </div>

            {/* Heading */}
            <h2 className="font-script font-semibold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6 md:mb-8 text-white">
              French Technique,
              <br />
              Balinese Soul
            </h2>

            {/* Description */}
            <div className="space-y-4 max-w-2xl mb-8 md:mb-10">
              <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed font-sans">
                Explore a menu where French classics are reimagined with the vibrant flavors of Bali. Every dish tells a story of passion, creativity, and the finest local ingredients.
              </p>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed font-sans">
                Our menu celebrates the finest French techniques while honoring the vibrant flavors of Bali. Each dish is a carefully crafted fusion of two culinary worlds.
              </p>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={onMenuClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg font-semibold py-6 px-8 md:py-7 md:px-10 rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                VIEW FULL MENU
              </Button>
            </motion.div>
          </motion.div>

          {/* Image - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full order-1 lg:order-2"
          >
            <motion.img
              src={content.menu_image_url || '/images/hero/culinary_journey.png'}
              alt={content.menu_image_alt || "French culinary journey"}
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;