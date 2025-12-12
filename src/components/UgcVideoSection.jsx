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
    <section 
      id="the-vibe" 
      className="relative py-20 md:py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/hero/background2.png)'
      }}
    >
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-cormorant font-bold text-primary mb-6">
            {content.ugc_title || 'The Vibe'}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-sans">
            {content.ugc_subtitle || 'Where every moment becomes a memory. Experience the energy, the atmosphere, the essence of The Club Bali.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl group cursor-pointer"
        >
          <img
            src={content.ugc_image_url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200'}
            alt="Video Thumbnail"
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 group-hover:bg-black/40">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-2xl">
              <Play className="h-12 w-12 text-white ml-1" fill="white" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UgcVideoSection;