import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const UgcVideoSection = () => {
  const { content, loading } = usePageContent();

  if (loading || !content) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-primary mb-4">
            {content.ugc_title || 'Experience The Vibe'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.ugc_subtitle || 'See what makes us special'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
        >
          <img
            src={content.ugc_image_url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200'}
            alt="Video Thumbnail"
            className="w-full h-auto aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/50">
            <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play className="h-10 w-10 text-white ml-1" fill="white" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UgcVideoSection;