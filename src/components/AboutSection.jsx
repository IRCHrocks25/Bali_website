import React from "react";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";

const AboutSection = () => {
  const { content, loading } = usePageContent();
  if (loading) return null;

  const imageSrc =
    content?.about_image_url ||
    "/images/hero/our_story.png";

  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-[#000000]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Quote Section - Top Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <p className="font-cormorant text-white italic text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-5 lg:mb-6 leading-relaxed">
            "The perfect place to hang out with friends!
            <br />
            The Club Bali has it all."
          </p>
          <p className="font-cormorant text-[#E8D9A8] italic text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            Maxine de Francesco
          </p>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Image - Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full order-2 lg:order-1"
          >
            <motion.img
              src={imageSrc}
              alt={content?.about_image_alt || "About"}
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Text Content - Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white order-1 lg:order-2"
          >
            {/* Logo */}
            <div className="mb-8 md:mb-10 flex justify-center lg:justify-start">
              <img 
                src="/images/hero/bali_club_logo.png" 
                alt="The Club Bali" 
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
              />
            </div>

            {/* Heading */}
            <h2 className="font-cormorant font-semibold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6 md:mb-8 text-white">
              Born from Passion,
              <br />
              Crafted with Soul
            </h2>

            {/* Description */}
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed font-sans">
                Since 2023, we've been reimagining French classics through the vibrant lens of Canggu.
              </p>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed font-sans">
                Club Bali isn't just a restaurant. It's where French culinary precision meets Balinese warmth. Every detail, from our locally-sourced ingredients to our intimate atmosphere, tells a story of two cultures perfectly intertwined.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
