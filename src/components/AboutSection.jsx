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
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <img
              src={imageSrc}
              alt={content?.about_image_alt || "About"}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <p className="font-script text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
              Our Story
            </p>

            <h2 className="font-cormorant font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Born from Passion,
              <br />
              Crafted with Soul
            </h2>

            <div className="mt-8 space-y-4 max-w-2xl">
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans">
                Since 2023, we've been reimagining French classics through the
                vibrant lens of Canggu.
              </p>

              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans">
                Club Bali isn't just a restaurant. It's where French culinary
                precision meets Balinese warmth. Every detail, from our
                locally-sourced ingredients to our intimate atmosphere, tells
                a story of two cultures perfectly intertwined.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
