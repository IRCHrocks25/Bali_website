import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#181818]">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            className="rounded-lg shadow-2xl w-full h-full object-cover"
            alt="Intérieur chaleureux et luxueux du restaurant The Club Bali"
           src="https://images.unsplash.com/photo-1657727114768-d5c79fbfa9bd" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Notre Histoire
          </h2>
          <p className="text-gray-400 mb-4 text-lg leading-relaxed">
            Né d'une passion pour la haute gastronomie française et d'un amour pour la culture balinaise, The Club Bali est plus qu'un restaurant : c'est une destination.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Notre chef, formé dans les plus grandes cuisines de Paris, a imaginé une carte où les techniques françaises classiques subliment les ingrédients exotiques et les saveurs vibrantes de Bali. Chaque plat raconte une histoire, un voyage entre deux mondes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;