import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { openWhatsApp } from '@/utils/helpers';
import { usePageContent } from '@/hooks/usePageContent';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { content } = usePageContent();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              if (!isHomePage) {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }} 
            className="flex items-center pt-4"
          >
            <img 
              src="/images/hero/bali_club_logo.png" 
              alt="The Club Bali" 
              className="h-20 md:h-24 w-auto"
            />
          </a>

          <div>
            <Button onClick={openWhatsApp} variant="primary">
              Book a Table
            </Button>
          </div>
        </div>
      </div>

    </motion.nav>
  );
};

export default Navbar;