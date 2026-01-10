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
      className="relative bg-cover bg-center bg-no-repeat w-full"
      style={{
        backgroundImage: 'url(/images/video%20bg.png)',
        aspectRatio: '16/9',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-script font-bold text-white mb-4 drop-shadow-2xl"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            {content.ugc_title || 'The Vibe'}
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-white font-sans font-medium max-w-2xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {content.ugc_subtitle || 'Step inside and feel the energy. This is The Club Bali.'}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
          viewport={{ once: true }}
          className="relative max-w-6xl lg:max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl group"
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <video
            src="/video/copy_40D3AEBF-335E-4CDB-B941-53B43D877C84.mov"
            className="w-full h-auto aspect-video object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>
      </div>
    </section>
  );
};

export default UgcVideoSection;