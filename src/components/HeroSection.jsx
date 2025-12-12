import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { usePageContent } from '@/hooks/usePageContent';
import { openWhatsApp } from '@/utils/helpers';

const HeroSection = () => {
    const { content, loading: contentLoading } = usePageContent();

    if (contentLoading) {
        return (
            <div className="relative w-full h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section id="home" className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero/bali_hero.png"
                    alt="The Club Bali"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-20 flex flex-col items-center justify-end h-full text-center text-white px-8 pb-16 md:px-12 md:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase">
                        {content?.hero_title || "The Club Bali"}
                    </h1>
                    <p className="mt-4 mb-8 text-lg md:text-xl max-w-2xl mx-auto font-light text-white/90">
                        {content?.hero_subtitle || "Fine Dining & Nightlife in the heart of Canggu"}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-7 px-8 rounded-full font-semibold transition-transform transform hover:scale-105"
                            onClick={openWhatsApp}
                        >
                            {content?.hero_cta_text || "Book a Table"}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;