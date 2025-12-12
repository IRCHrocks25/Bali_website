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
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 text-white order-2 lg:order-1"
          >
            <p className="font-script text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
              Our Menu
            </p>
            <h2 className="font-cormorant font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              French Technique,
              <br />
              Balinese Soul,
            </h2>
            <div className="mt-8 space-y-4 max-w-2xl">
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans">
                Explore a menu where French classics are reimagined with the vibrant flavors of Bali. Every dish tells a story of passion, creativity, and the finest local ingredients.
              </p>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans">
                Our menu celebrates the finest French techniques while honoring the vibrant flavors of Bali. Each dish is a carefully crafted fusion of two culinary worlds.
              </p>
            </div>
            <Button onClick={onMenuClick} variant="primary" size="lg" className="mt-6">
              View Full Menu
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full order-1 lg:order-2"
          >
            <img
              src={content.menu_image_url || '/images/hero/culinary_journey.png'}
              alt="Menu Preview"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;