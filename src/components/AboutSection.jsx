import React from 'react';
import { motion } from 'framer-motion';
import { usePageContent } from '@/hooks/usePageContent';

const AboutSection = () => {
  const { content, loading } = usePageContent();

  if (loading || !content) {
    return null;
  }

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={content.about_image_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'}
              alt="About The Club Bali"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-primary">
              {content.about_title || 'About Us'}
            </h2>
            <h3 className="text-2xl font-cormorant text-foreground/80">
              {content.about_subtitle || 'Discover Our Story'}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.about_description || 'Welcome to our establishment, where tradition meets innovation.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;