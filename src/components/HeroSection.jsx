import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { usePageContent } from '@/hooks/usePageContent';
import { openWhatsApp } from '@/utils/helpers';

const HeroSection = () => {
    const { content, loading: contentLoading } = usePageContent();

    const images = [
        {
            src: '/images/hp_images/HP Image Selection/cauliflower steak.jpg',
            alt: 'Cauliflower Steak'
        },
        {
            src: '/images/hp_images/HP Image Selection/DSC04720.jpeg',
            alt: 'Culinary Experience'
        },
        {
            src: '/images/hp_images/HP Image Selection/IMG_0904.JPG',
            alt: 'Chef Preparation'
        },
        {
            src: '/images/hp_images/HP Image Selection/king prawn salmon(1).JPG',
            alt: 'King Prawn Salmon'
        },
        {
            src: '/images/hp_images/HP Image Selection/IMG_6740.JPG',
            alt: 'Dish Presentation'
        },
        {
            src: '/images/hp_images/HP Image Selection/IMG_0024.JPG',
            alt: 'Fresh Ingredients'
        },
        {
            src: '/images/hp_images/HP Image Selection/DSC04900.jpeg',
            alt: 'Fine Dining'
        }
    ];

    if (contentLoading) {
        return (
            <div className="relative w-full h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section id="home" className="relative w-full min-h-screen overflow-hidden bg-[#000000]">
            {/* Background Image - Server with plate and brick oven */}
            <div className="absolute inset-0 z-0 h-screen">
                <img
                    src="/images/hero/bali_hero.png"
                    alt="The Club Bali"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Main Content - Center/Lower */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-8 md:px-12 pb-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="text-center space-y-4 md:space-y-6 max-w-5xl"
                >
                    {/* Main Headline - Overlaying center/lower area */}
                    <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                        {content?.hero_title || "Where Bali Meets Paradise"}
                    </h1>

                    {/* Tagline - Smaller, sans-serif, golden color */}
                    <p className="text-base md:text-lg lg:text-xl font-sans text-[#D4AF37] max-w-3xl mx-auto">
                        {content?.hero_subtitle || "An unforgettable fusion of French elegance and Balinese soul."}
                    </p>

                    {/* Ghosted/Reflected Text */}
                    <div className="relative pt-4 md:pt-6 opacity-20">
                        <div 
                            className="font-cormorant text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight uppercase"
                            style={{
                                transform: 'scaleY(-1)',
                                transformOrigin: 'top',
                                filter: 'blur(2px)',
                                WebkitTransform: 'scaleY(-1)',
                            }}
                        >
                            {content?.hero_title?.toUpperCase() || "WHERE BALI MEETS PARADISE"}
                        </div>
                    </div>

                    {/* Bottom Center Button - Oval shape */}
                    <div className="flex justify-center pt-6 md:pt-8 pb-0">
                        <Button
                            onClick={openWhatsApp}
                            className="bg-transparent border-2 border-[#C9A24D] text-white hover:bg-[#C9A24D]/10 text-sm md:text-base py-3 px-8 md:py-4 md:px-10 rounded-full font-sans font-semibold uppercase tracking-wider transition-all duration-300 hover:border-[#d6b15b] shadow-lg"
                        >
                            {content?.hero_cta_text || "BOOK A TABLE"}
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Image Collage Section - Seamlessly connected */}
            <div className="relative z-20 w-full bg-[#000000] -mt-20 md:-mt-24 lg:-mt-28">
                <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3 lg:gap-4">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                className="relative overflow-hidden group aspect-square"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;