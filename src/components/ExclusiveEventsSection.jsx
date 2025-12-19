import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExclusiveEventsSection = () => {
  const eventImages = useMemo(
    () => [
      {
        src: "/images/hero/image1.png",
        alt: "Exclusive Event 1",
        tag: "Live Music",
        title: "Jazz Nights, Elevated",
        meta: "Dinner • Soft lights • Signature cocktails",
      },
      {
        src: "/images/hero/image2.png",
        alt: "Exclusive Event 2",
        tag: "Guest DJ",
        title: "Sound You Can Feel",
        meta: "Canggu • Late sets • High energy",
      },
      {
        src: "/images/hero/image3.png",
        alt: "Exclusive Event 3",
        tag: "Special Night",
        title: "A Night Worth Dressing Up For",
        meta: "Reservations recommended • Limited seats",
      },
      {
        src: "/images/hp_images/HP Image Selection/carousel/5fd46993-2be8-4415-8c93-75560a0fbdbf.png",
        alt: "Exclusive Event 4",
        tag: "Weekend",
        title: "Dance Under the Stars",
        meta: "Peak vibe • Bottle service • Late close",
      },
      {
        src: "/images/hp_images/HP Image Selection/carousel/63ec4d9e-1523-424a-8ae0-97be681bfb52.png",
        alt: "Exclusive Event 5",
        tag: "Exclusive",
        title: "Members-Only Moments",
        meta: "Private tables • Curated crowd • VIP access",
      },
      {
        src: "/images/hp_images/HP Image Selection/carousel/c5fc54e1-0ed4-47b0-a698-7c0a7c9d7807.png",
        alt: "Exclusive Event 6",
        tag: "Live Music",
        title: "Jazz Nights, Elevated",
        meta: "Dinner • Soft lights • Signature cocktails",
      },
      {
        src: "/images/hp_images/HP Image Selection/carousel/e186f8f8-a949-43b9-ab54-ba3556734dd7.png",
        alt: "Exclusive Event 7",
        tag: "Guest DJ",
        title: "Sound You Can Feel",
        meta: "Canggu • Late sets • High energy",
      },
      {
        src: "/images/hp_images/HP Image Selection/carousel/eb7ec842-9b03-48cd-91cb-a9bfc0d57c84.png",
        alt: "Exclusive Event 8",
        tag: "Special Night",
        title: "A Night Worth Dressing Up For",
        meta: "Reservations recommended • Limited seats",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = eventImages.length;

  // Auto-advance (pauses on hover/focus)
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setDirection(1);
      setCurrentIndex((p) => (p + 1) % total);
    }, 5200);
    return () => clearInterval(t);
  }, [isPaused, total]);

  const goTo = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((p) => (p - 1 + total) % total);
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((p) => (p + 1) % total);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.985,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 220, damping: 26 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.5 },
        filter: { duration: 0.45 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.99,
      filter: "blur(6px)",
      transition: {
        x: { type: "spring", stiffness: 240, damping: 28 },
        opacity: { duration: 0.25 },
        filter: { duration: 0.25 },
      },
    }),
  };

  const active = eventImages[currentIndex];

  return (
    <section id="exclusive-events" className="relative w-full bg-black">
      {/* Cinematic background: glows + grain */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#C9A24D]/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-white/5 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,77,0.10),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.10] mix-blend-soft-light [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Top label */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#C9A24D]/60" />
            <p className="font-script text-3xl md:text-4xl text-[#C9A24D] italic">
              Exclusive Events
            </p>
            <span className="h-px w-10 bg-[#C9A24D]/60" />
          </div>

          {/* Main title */}
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.06] tracking-[-0.02em]">
            Your Night Out. Elevated.
          </h2>

          {/* Description */}
          <p className="mt-6 text-base md:text-lg text-white/80 font-sans leading-relaxed max-w-3xl mx-auto">
            Live music that moves you. Guest DJs who know the vibe. At The Club Bali,
            every night has its own energy — from intimate jazz over dinner to dancing
            under Canggu stars.
          </p>

          {/* Small utility row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              Weekly lineups
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              Limited tables
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
              VIP access
            </span>
          </div>
        </motion.div>

        {/* Carousel Shell */}
        <div className="mt-12 md:mt-14 lg:mt-16">
          <div
            className="relative mx-auto max-w-6xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Spotlight shadow effect */}
            <div 
              className="absolute -inset-8 md:-inset-12 lg:-inset-16 rounded-[40px] blur-3xl opacity-60"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)'
              }}
            />
            <div 
              className="absolute -inset-4 md:-inset-6 lg:-inset-8 rounded-[32px] blur-2xl opacity-40"
              style={{
                background: 'radial-gradient(circle at center, rgba(201,162,77,0.3) 0%, rgba(201,162,77,0.1) 50%, transparent 80%)'
              }}
            />
            
            {/* Glass frame */}
            <div className="absolute -inset-2 md:-inset-3 rounded-[28px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-[28px] border-2 border-white/20 bg-black/50 shadow-[0_0_80px_rgba(201,162,77,0.4),0_0_120px_rgba(0,0,0,0.8),0_40px_140px_rgba(0,0,0,0.9)] backdrop-blur-md">
              {/* Aspect - Flexible container */}
              <div className="relative min-h-[520px] md:min-h-[620px] lg:min-h-[720px] flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={active.src}
                      alt={active.alt}
                      className="max-h-full max-w-full w-auto h-auto object-contain"
                      loading="lazy"
                      draggable={false}
                    />

                    {/* Cinematic overlays */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.70)_100%)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-0 ring-2 ring-inset ring-white/15" />
                  </motion.div>
                </AnimatePresence>

                {/* Caption card */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                  <div className="grid gap-3 rounded-2xl border-2 border-white/20 bg-black/35 p-5 md:p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center rounded-full border-2 border-[#C9A24D]/50 bg-[#C9A24D]/10 px-3 py-1 text-xs font-sans tracking-wide text-[#E8D9A8]">
                        {active.tag}
                      </span>
                      <span className="text-xs text-white/60">
                        {String(currentIndex + 1).padStart(2, "0")} /{" "}
                        {String(total).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                      <div>
                        <p className="font-playfair text-2xl md:text-3xl font-semibold text-white leading-tight">
                          {active.title}
                        </p>
                        <p className="mt-1 text-sm md:text-base text-white/70">
                          {active.meta}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          className="h-10 rounded-xl bg-white/10 text-white hover:bg-white/15 border border-white/10"
                          onClick={prev}
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          className="h-10 rounded-xl bg-white/10 text-white hover:bg-white/15 border border-white/10"
                          onClick={next}
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress bar (nicer than dots) */}
                    <div className="mt-1">
                      <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          key={currentIndex}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5.2, ease: "linear" }}
                          className="h-full bg-[#C9A24D]/80"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top-right subtle nav (keeps classic arrows too) */}
                <div className="absolute top-5 right-5 hidden md:flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="rounded-full border-2 border-white/20 bg-black/40 p-2 text-white/80 hover:text-white hover:bg-black/55 backdrop-blur-md transition"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    className="rounded-full border-2 border-white/20 bg-black/40 p-2 text-white/80 hover:text-white hover:bg-black/55 backdrop-blur-md transition"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail strip (premium feel) */}
              <div className="border-t-2 border-white/20 bg-black/35">
                <div className="flex gap-2 overflow-x-auto px-4 py-3 md:px-6 md:py-4">
                  {eventImages.map((img, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => goTo(idx)}
                        className={`group relative h-16 w-24 md:h-20 md:w-32 flex-none overflow-hidden rounded-xl border-2 bg-black/30 transition ${
                          isActive
                            ? "border-[#C9A24D]"
                            : "border-white/20 hover:border-white/30"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className={`h-full w-full object-contain transition duration-500 ${
                            isActive ? "scale-[1.03]" : "group-hover:scale-[1.05]"
                          }`}
                          loading="lazy"
                          draggable={false}
                        />
                        <div
                          className={`absolute inset-0 transition ${
                            isActive ? "bg-black/10" : "bg-black/35 group-hover:bg-black/20"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            >
              <Button className="bg-[#C9A24D] hover:bg-[#d6b15b] text-black rounded-xl px-8 py-6 uppercase tracking-[0.12em] text-xs md:text-sm font-sans font-semibold shadow-lg hover:shadow-xl hover:shadow-[#C9A24D]/30 transition-all duration-300">
                REGISTER FOR UPCOMING EVENTS
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveEventsSection;
