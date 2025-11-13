import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { openWhatsApp } from '@/utils/helpers';
import { usePageContent } from '@/hooks/usePageContent';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { content } = usePageContent();

  const navLinks = [
    { name: content?.nav_about || 'About', href: '#about' },
    { name: content?.nav_menu || 'Menu', href: '#menu' },
    { name: content?.nav_events || 'Events', href: '#events' },
    { name: content?.nav_contact || 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { type: 'tween', duration: 0.3 } },
  };

  const mobileMenuVariants = {
    closed: { x: '100%' },
    open: { x: '0%', transition: { type: 'spring', stiffness: 260, damping: 30 } },
  };
  
  const mobileLinkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-2xl font-cormorant font-bold text-primary">
            The Club Bali
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="hidden md:block">
            <Button onClick={openWhatsApp} variant="primary">
              Book a Table
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden fixed top-0 right-0 w-full h-screen bg-background p-8 pt-24"
          >
            <motion.div 
              className="flex flex-col items-center justify-center h-full space-y-8"
              initial="closed"
              animate="open"
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-2xl font-cormorant text-foreground hover:text-primary"
                  variants={mobileLinkVariants}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div variants={mobileLinkVariants} className="pt-8">
                <Button onClick={openWhatsApp} variant="primary" size="lg">
                  Book a Table
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;