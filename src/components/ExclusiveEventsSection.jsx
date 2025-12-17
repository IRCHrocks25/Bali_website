import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ExclusiveEventsSection = () => {
  const eventImages = [
    { src: "/images/hero/image1.png", alt: "Outdoor social gathering" },
    { src: "/images/hero/image2.png", alt: "Culinary presentation" },
    { src: "/images/hero/image3.png", alt: "Social event" },
  ];

  return (
    <section
      id="exclusive-events"
      className="relative w-full py-16 md:py-20 lg:py-24 bg-[#000000]"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Top script label */}
          <p className="font-script text-3xl md:text-4xl lg:text-5xl text-[#C9A24D] italic mb-4 md:mb-5">
            Exclusive Events
          </p>

          {/* Main title */}
          <h2 className="font-cormorant font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 md:mb-8 leading-tight">
            Your Night Out. Elevated.
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-200 font-sans leading-relaxed mb-12 md:mb-16 max-w-4xl mx-auto">
            Live music that moves you. Guest DJs who know the vibe. At The Club Bali, every night has its own energy,
            whether you&apos;re here for intimate jazz over dinner or dancing under Canggu stars. Check back often;
            something unforgettable is always brewing.
          </p>

          {/* Image Gallery - Center image larger, side images smaller */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16">
            {eventImages.map((image, index) => {
              const isCenter = index === 1;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative overflow-hidden rounded-lg shadow-2xl ${
                    isCenter
                      ? 'w-full md:w-[350px] lg:w-[400px] h-[400px] md:h-[500px] lg:h-[600px]'
                      : 'w-full md:w-[280px] lg:w-[320px] h-[350px] md:h-[400px] lg:h-[480px]'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Button className="bg-[#C9A24D] hover:bg-[#d6b15b] text-black rounded-lg px-8 py-4 md:px-10 md:py-6 uppercase tracking-wider text-sm md:text-base font-sans font-semibold shadow-lg transition-transform transform hover:scale-105">
              REGISTER FOR UPCOMING EVENTS
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveEventsSection;
