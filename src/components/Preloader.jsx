import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const lineVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: {
        delay: 1,
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    },
  };

  const title = "The Club Bali";

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
    >
      <motion.h1
        variants={textVariants}
        initial="initial"
        animate="animate"
        className="font-cormorant text-4xl md:text-5xl text-foreground tracking-wider overflow-hidden"
      >
        {title.split('').map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants}
            className="inline-block"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.h1>
      <motion.div
        variants={lineVariants}
        initial="initial"
        animate="animate"
        className="h-[1px] w-32 bg-primary mt-4"
        style={{ transformOrigin: 'center' }}
      />
    </motion.div>
  );
};

export default Preloader;