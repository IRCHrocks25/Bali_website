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
            src: '/images/hp_images/HP Image Selection/5fd46993-2be8-4415-8c93-75560a0fbdbf.jpg',
            alt: 'Culinary Delight'
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
            </div>

            {/* Main Content - Center/Lower */}
            <div className="relative z-20 flex flex-col items-center justify-end min-h-screen px-8 md:px-12 pb-16 md:pb-20 lg:pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="text-center space-y-2 md:space-y-3 max-w-5xl"
                >
                    {/* Main Headline - Overlaying center/lower area */}
                    <h1 className="font-playfair text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-light text-white leading-tight whitespace-nowrap">
                        {content?.hero_title || "Where Bali Meets Paradise"}
                    </h1>

                    {/* Tagline - Smaller, sans-serif, golden color */}
                    <p className="text-lg md:text-xl lg:text-2xl font-sans text-[#E8D9A8] max-w-3xl mx-auto">
                        {content?.hero_subtitle || "An unforgettable fusion of French elegance and Balinese soul."}
                    </p>

                    {/* Bottom Center Button - Oval shape */}
                    <motion.div 
                        className="flex justify-center pt-6 md:pt-8 pb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button
                                onClick={openWhatsApp}
                                className="bg-transparent border-2 border-[#C9A24D] text-white hover:bg-[#C9A24D]/10 text-sm md:text-base py-3 px-8 md:py-4 md:px-10 rounded-full font-sans font-semibold uppercase tracking-wider transition-all duration-300 hover:border-[#d6b15b] shadow-lg hover:shadow-xl hover:shadow-[#C9A24D]/30"
                            >
                                {content?.hero_cta_text || "BOOK A TABLE"}
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Image Collage Section - Seamlessly connected */}
            <div className="relative z-20 w-full bg-[#000000] -mt-8 md:-mt-10 lg:-mt-12">
                <div className="w-full">
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 md:gap-2">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                className="relative overflow-hidden group aspect-square cursor-pointer"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15
                                }}
                                whileHover={{ y: -5 }}
                            >
                                <motion.img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;