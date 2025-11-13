import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img
        className="absolute inset-0 w-full h-full object-cover"
        alt="Ambiance élégante du restaurant The Club Bali"
       src="https://images.unsplash.com/photo-1591214896508-22fc74d84a75" />
      <motion.div 
        className="relative z-20 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
          L'Art de la Cuisine Française,<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
            Revisité à Bali
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200 drop-shadow-md">
          Une expérience culinaire unique où la tradition française rencontre l'exotisme balinais.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;