import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageContent } from '@/hooks/usePageContent';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import UgcVideoSection from '@/components/UgcVideoSection';
import EventsSection from '@/components/EventsSection';
import ReviewsSection from '@/components/ReviewsSection';
import ArticleSection from '@/components/ArticleSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import ChatbotWidget from '@/components/ChatbotWidget';
import Preloader from '@/components/Preloader';

const HomePage = () => {
  const { content, loading } = usePageContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return <Preloader />;
  }
  
  return (
    <>
      <Helmet>
        <title>{content?.meta_title || 'The Club Bali - French Restaurant & Bar'}</title>
        <meta name="description" content={content?.meta_description || 'Experience the finest French cuisine and cocktails in the heart of Bali. The Club offers a unique dining experience with a vibrant atmosphere.'} />
      </Helmet>
      
      <div className="bg-background text-foreground font-sans">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <MenuSection onMenuClick={() => setIsMenuOpen(true)} />
          <UgcVideoSection />
          <EventsSection content={content} />
          <ArticleSection />
          <ReviewsSection />
          <ContactSection />
        </main>
        <Footer content={content} />

        <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DialogContent className="bg-background/80 backdrop-blur-md text-foreground max-w-4xl w-[95vw] h-[90vh] rounded-2xl p-0">
            <Menu />
          </DialogContent>
        </Dialog>
        
        <ChatbotWidget />
      </div>
    </>
  );
};

export default HomePage;