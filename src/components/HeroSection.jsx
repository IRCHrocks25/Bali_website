import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { supabase } from '@/lib/customSupabaseClient';
import { usePageContent } from '@/hooks/usePageContent';
import { openWhatsApp } from '@/utils/helpers';
import { Loader2 } from 'lucide-react';

const HeroSection = () => {
    const { content, loading: contentLoading } = usePageContent();
    const [heroImages, setHeroImages] = useState([]);
    const [imagesLoading, setImagesLoading] = useState(true);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, skipSnaps: false },
        [Autoplay({ delay: 5000, stopOnInteraction: true })]
    );
    
    useEffect(() => {
        const fetchHeroImages = async () => {
            setImagesLoading(true);
            const { data, error } = await supabase
                .from('gallery_images')
                .select('image_url')
                .eq('type', 'hero')
                .order('order', { ascending: true });

            if (error) {
                console.error("Error fetching hero images:", error);
                setHeroImages([]);
            } else {
                setHeroImages(data);
            }
            setImagesLoading(false);
        };

        fetchHeroImages();
    }, []);

    const loading = contentLoading || imagesLoading;

    if (loading && heroImages.length === 0) {
        return (
            <div className="relative w-full h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
        );
    }
    
    return (
        <section id="home" className="relative w-full h-screen overflow-hidden">
             <div className="absolute inset-0 z-0" ref={emblaRef}>
                <div className="flex h-full">
                    {heroImages.length > 0 ? heroImages.map((image, index) => (
                        <div className="flex-[0_0_100%] relative h-full" key={index}>
                           <img
                                src={image.image_url}
                                alt={`The Club Bali Ambiance ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )) : (
                         <div className="flex-[0_0_100%] relative h-full">
                            <img
                                src="https://images.unsplash.com/photo-1515651802824-f0b8467755d9"
                                alt="Default Hero"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
            
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
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