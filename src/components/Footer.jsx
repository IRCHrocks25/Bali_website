import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { openWhatsApp } from '@/utils/helpers';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


const Footer = ({ content }) => {
  const { toast } = useToast();
  // Wait for content to be available before rendering
  if (!content) {
    return null;
  }
  
  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/theclub_bali/" }
  ];
  
  const handleNotImplemented = () => {
    toast({
      title: "🚧 Coming Soon!",
      description: "This feature isn't implemented yet—but stay tuned! 🚀",
      variant: "default",
    });
  };
  
  const currentYear = new Date().getFullYear();
  const copyrightText = content.footer_copyright ? content.footer_copyright.replace('{year}', currentYear) : `© ${currentYear} The Club Bali. All rights reserved.`;

  return (
    <footer className="bg-card text-foreground border-t border-border relative">
      <div className="container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          <motion.div 
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold font-playfair mb-4">{content.footer_title}</h3>
            <p className="text-sm text-foreground/70 max-w-xs">
              {content.footer_subtitle}
            </p>
            <motion.div 
              className="mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button onClick={openWhatsApp} variant="primary" size="sm" className="shadow-lg hover:shadow-xl transition-all duration-300">
                Book a Table
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-base font-semibold tracking-wide uppercase mb-4 text-foreground/80">Follow Us</h3>
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground/70 hover:text-primary transition-all duration-300"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             <h3 className="text-base font-semibold tracking-wide uppercase mb-4 text-foreground/80">{content.footer_newsletter_title}</h3>
             <div className="flex w-full max-w-sm">
                <input type="email" placeholder="Your email address" className="w-full bg-background/50 border border-border rounded-l-md px-4 py-2 text-sm focus:ring-primary focus:border-primary placeholder:text-foreground/50 transition-all duration-300 focus:outline-none focus:ring-2"/>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={handleNotImplemented} variant="primary" className="rounded-l-none rounded-r-md shadow-lg hover:shadow-xl transition-all duration-300">Subscribe</Button>
                </motion.div>
             </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 border-t border-border/50 pt-8 text-center text-xs text-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>{copyrightText}</p>
        </motion.div>
      </div>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link to="/login" className="absolute bottom-4 right-4 text-foreground/50 hover:text-primary transition-colors duration-300">
          <Lock className="h-5 w-5" />
        </Link>
      </motion.div>
    </footer>
  );
};

export default Footer;