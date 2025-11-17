import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { openWhatsApp } from '@/utils/helpers';
import { usePageContent } from '@/hooks/usePageContent';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { content } = usePageContent();
  const defaultMenuPdfUrl = 'https://res.cloudinary.com/dcuswyfur/image/upload/v1763057740/New_Menu_Food_A3_-2_qg42to.pdf';
  const menuPdfUrl = content?.menu_pdf_url || defaultMenuPdfUrl;
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: content?.nav_about || 'About', href: '#about' },
    { name: content?.nav_menu || 'Menu', href: '#menu' },
    { name: content?.nav_events || 'Events', href: '#events' },
    { name: content?.nav_articles || 'Articles', href: '#articles' },
    { name: content?.nav_contact || 'Contact', href: '#contact' },
    ...(menuPdfUrl
      ? [
          {
            name: content?.nav_menu_download || 'View Menu PDF',
            href: menuPdfUrl,
            external: true,
          },
        ]
      : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scrolling to section after navigation to home page
  useEffect(() => {
    if (isHomePage) {
      // Check if there's a hash in the URL or in sessionStorage
      const hash = location.hash || sessionStorage.getItem('scrollToSection');
      if (hash) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          const section = document.querySelector(hash);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            // Clear the stored hash
            sessionStorage.removeItem('scrollToSection');
          }
        }, 200);
      }
    }
  }, [isHomePage, location.hash]);
  
  const handleNavClick = (e, link) => {
    if (link.external) {
      setIsOpen(false);
      return;
    }

    e.preventDefault();
    setIsOpen(false);

    // If not on home page, navigate to home and store the section to scroll to
    if (!isHomePage) {
      sessionStorage.setItem('scrollToSection', link.href);
      navigate('/');
    } else {
      // If on home page, just scroll to section
      const section = document.querySelector(link.href);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
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
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              if (!isHomePage) {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }} 
            className="text-2xl font-cormorant font-bold text-primary"
          >
            The Club Bali
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
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
                  onClick={(e) => handleNavClick(e, link)}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
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