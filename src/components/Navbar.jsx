import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { openWhatsApp } from '@/utils/helpers';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { type: 'tween', duration: 0.3 } },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out pt-4 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              if (!isHomePage) {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }} 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img 
              src="/images/hero/bali_club_logo.png" 
              alt="The Club Bali" 
              className="h-16 md:h-20 lg:h-24 w-auto transition-all duration-300"
            />
          </motion.a>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              onClick={openWhatsApp} 
              className="bg-[#C9A24D] hover:bg-[#B8903D] text-black font-semibold border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              BOOK A TABLE
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;