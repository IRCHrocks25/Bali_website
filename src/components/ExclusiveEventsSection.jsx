import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ExclusiveEventsSection = () => {
  const eventImages = [
    {
      src: "/images/hero/image1.png",
      alt: "Poolside event",
    },
    {
      src: "/images/hero/image2.png",
      alt: "Food presentation",
    },
    {
      src: "/images/hero/image3.png",
      alt: "Social gathering",
    },
  ];

  return (
    <section id="exclusive-events" className="relative w-full py-20 md:py-28 bg-[#07090d] overflow-hidden">
      {/* Floral line-art vibe (SVG pattern overlay) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='700' viewBox='0 0 900 700'%3E%3Cg fill='none' stroke='%23C9A24D' stroke-width='1.2' opacity='0.9'%3E%3Cpath d='M120 140c60-40 140-40 200 0'/%3E%3Cpath d='M580 120c70-40 150-40 220 0'/%3E%3Cpath d='M110 560c70 40 150 40 220 0'/%3E%3Cpath d='M560 580c70 40 150 40 220 0'/%3E%3Cpath d='M90 190c50 20 90 60 110 110'/%3E%3Cpath d='M810 170c-50 20-90 60-110 110'/%3E%3Cpath d='M100 520c50-20 90-60 110-110'/%3E%3Cpath d='M820 530c-50-20-90-60-110-110'/%3E%3Cpath d='M155 120c35 25 55 55 60 90'/%3E%3Cpath d='M740 110c-35 25-55 55-60 90'/%3E%3Cpath d='M150 590c35-25 55-55 60-90'/%3E%3Cpath d='M745 600c-35-25-55-55-60-90'/%3E%3Cpath d='M210 130c-20 30-20 65 0 95'/%3E%3Cpath d='M690 125c20 30 20 65 0 95'/%3E%3Cpath d='M215 565c-20-30-20-65 0-95'/%3E%3Cpath d='M685 570c20-30 20-65 0-95'/%3E%3Cpath d='M70 90c40 10 70 35 90 70'/%3E%3Cpath d='M830 90c-40 10-70 35-90 70'/%3E%3Cpath d='M70 610c40-10 70-35 90-70'/%3E%3Cpath d='M830 610c-40-10-70-35-90-70'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "900px 700px",
          backgroundPosition: "center",
        }}
      />

      {/* soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* content (no container; full width but centered like mock) */}
      <div className="relative w-full px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl text-center"
        >
          {/* top script */}
          <p className="font-script text-4xl md:text-5xl text-[#C9A24D] mb-4">
            Exclusive Events
          </p>

          {/* main title */}
          <h2 className="font-cormorant font-semibold text-4xl md:text-6xl text-white leading-tight">
            Your Night Out, Elevated
          </h2>

          {/* body */}
          <p className="mt-6 text-sm md:text-base text-white/70 leading-relaxed max-w-4xl mx-auto">
            Live music that moves you. Guest DJs who know the vibe. At The Club Bali, every night has its own energy,
            whether you&apos;re here for intimate jazz over dinner or dancing under Canggu stars. Check back often;
            something unforgettable is always brewing.
          </p>

          {/* images (center taller like mock) */}
          <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-7 md:gap-10">
            {/* left */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              viewport={{ once: true }}
              className="w-[300px] md:w-[320px] h-[350px] md:h-[370px] rounded-2xl overflow-hidden bg-white/5 shadow-2xl"
            >
              <img
                src={eventImages[0].src}
                alt={eventImages[0].alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* center (bigger) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              viewport={{ once: true }}
              className="w-[330px] md:w-[360px] h-[420px] md:h-[460px] rounded-2xl overflow-hidden bg-white/5 shadow-2xl"
            >
              <img
                src={eventImages[1].src}
                alt={eventImages[1].alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* right */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              viewport={{ once: true }}
              className="w-[300px] md:w-[320px] h-[350px] md:h-[370px] rounded-2xl overflow-hidden bg-white/5 shadow-2xl"
            >
              <img
                src={eventImages[2].src}
                alt={eventImages[2].alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <Button
              size="lg"
              className="rounded-full px-10 py-6 uppercase tracking-wider text-sm md:text-base
                         bg-[#C9A24D] text-black hover:bg-[#d6b15b] shadow-lg"
            >
              Register for Upcoming Events
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusiveEventsSection;
