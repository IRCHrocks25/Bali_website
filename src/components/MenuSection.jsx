import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const MenuSection = ({ onMenuClick }) => {
  const { content, loading } = usePageContent();

  if (loading || !content) {
    return null;
  }

  return (
    <section id="menu" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-primary">
                {content.menu_title || 'Our Menu'}
              </h2>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content.menu_subtitle || 'Explore our culinary offerings'}
            </p>
            <Button onClick={onMenuClick} variant="primary" size="lg" className="mt-6">
              View Full Menu
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={content.menu_image_url || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'}
              alt="Menu Preview"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;