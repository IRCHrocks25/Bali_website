import React from 'react';
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
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold font-cormorant mb-4">{content.footer_title}</h3>
            <p className="text-sm text-foreground/70 max-w-xs">
              {content.footer_subtitle}
            </p>
            <div className="mt-6">
              <Button onClick={openWhatsApp} variant="primary" size="sm">
                Book a Table
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-base font-semibold tracking-wide uppercase mb-4 text-foreground/80">Follow Us</h3>
            <div className="flex space-x-6">
              {socialLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
             <h3 className="text-base font-semibold tracking-wide uppercase mb-4 text-foreground/80">{content.footer_newsletter_title}</h3>
             <div className="flex w-full max-w-sm">
                <input type="email" placeholder="Your email address" className="w-full bg-background/50 border border-border rounded-l-md px-4 py-2 text-sm focus:ring-primary focus:border-primary placeholder:text-foreground/50"/>
                <Button onClick={handleNotImplemented} variant="primary" className="rounded-l-none rounded-r-md">Subscribe</Button>
             </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 text-center text-xs text-foreground/60">
          <p>{copyrightText}</p>
        </div>
      </div>
      <Link to="/login" className="absolute bottom-4 right-4 text-foreground/50 hover:text-primary transition-colors">
        <Lock className="h-5 w-5" />
      </Link>
    </footer>
  );
};

export default Footer;