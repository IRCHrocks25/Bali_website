import React from 'react';
import { motion } from 'framer-motion';

const AnimatedIcon = ({ icon: Icon, delay = 0 }) => {
  const iconVariants = {
    hidden: { scale: 0, rotate: -90 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        delay: delay
      } 
    },
  };

  return (
    <motion.div
      variants={iconVariants}
      className="p-3 bg-primary/10 rounded-full"
    >
      <Icon className="h-6 w-6 text-primary" />
    </motion.div>
  );
};

export default AnimatedIcon;