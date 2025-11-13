import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Header = () => {
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReservation = () => {
    toast({
      title: "Réservation",
      description: "🚧 Cette fonctionnalité n'est pas encore implémentée, mais vous pouvez la demander dans votre prochaine instruction ! 🚀",
    });
  };

  const navLinks = ["About", "Menu", "Gallery"];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Club Bali
        </motion.div>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
             <motion.a 
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-300 hover:text-amber-400 transition-colors duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              {link}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button 
            onClick={handleReservation}
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/20"
            variant="default"
          >
            Réserver
          </Button>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;