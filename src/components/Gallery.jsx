import React from 'react';
import { motion } from 'framer-motion';

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop", alt: "Plat gastronomique joliment présenté" },
  { src: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=2574&auto=format&fit=crop", alt: "Cocktails colorés sur un bar" },
  { src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2671&auto=format&fit=crop", alt: "Ambiance du restaurant le soir" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2580&auto=format&fit=crop", alt: "Dessert gourmand au chocolat" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-[#101010]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Capturez l'Instant
          </h2>
          <p className="text-lg text-gray-400">Une immersion visuelle dans notre univers.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-[3/4] transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;