import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FooterExplosion from "@/components/FooterExplosion";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Dynamically scrubs opacity & scale using scroll progression instead of transition
  const textScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer ref={footerRef} className="relative bg-[#0c0c0c] text-[#f0e8dc] font-sans pt-24 pb-28 md:pt-20 border-t border-[rgba(240,232,220,0.12)] min-h-screen md:h-screen flex flex-col overflow-y-auto md:overflow-hidden">
      <FooterExplosion footerRef={footerRef} />

      {/* Top Section: Info Grid */}
      <motion.div
        className="px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-12 shrink-0 relative z-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Column 1: IDENTIFICATION */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-[#ff4500]">
            Identification
          </h3>
          <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide leading-relaxed text-[#f0e8dc]">
            K Tirumala Achari
          </p>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-[#c8bfb3]">
            Full-Stack & AI Software Engineer
          </p>
          <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-[#7a746d]">
            Berhampur, Odisha, India
          </p>
        </motion.div>

        {/* Column 2: CHANNELS */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-[#ff4500]">
            Channels
          </h3>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:ktirumalaachari@gmail.com"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(20);
                }
              }}
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-[#c8bfb3] hover:text-[#ff4500] hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1 transition-colors"
            >
              Email ↗
            </a>
            <a
              href="https://www.linkedin.com/in/k-tirumala-achari-921106307/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(20);
                }
              }}
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-[#c8bfb3] hover:text-[#ff4500] hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1 transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/ktirumalaachari"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(20);
                }
              }}
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-[#c8bfb3] hover:text-[#ff4500] hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1 transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://x.com/TiruAchari"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(20);
                }
              }}
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-[#c8bfb3] hover:text-[#ff4500] hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1 transition-colors"
            >
              Twitter (X) ↗
            </a>
            <a
              href="https://ktirumalaachari.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(20);
                }
              }}
              className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-[#c8bfb3] hover:text-[#ff4500] hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1 transition-colors"
            >
              Portfolio SSR ↗
            </a>
          </div>
        </motion.div>

        {/* Column 3: COLOPHON + YEAR */}
        <motion.div variants={itemVariants} className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-[#ff4500]">
              Colophon
            </h3>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-[#c8bfb3]">
              Built With: React 18 / TypeScript / Tailwind CSS / Framer Motion / Lenis / GSAP
            </p>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-[#c8bfb3]">
              Schedule: 30-Min Strategy Call & Video Consultation
            </p>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide text-[#c8bfb3]">
              Design: Obsidian & Vibrant Orange Signature
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-[#ff4500]">
              2026 · ALL RIGHTS RESERVED
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section: Branding Text */}
      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="w-full flex-1 flex flex-col justify-center items-center overflow-hidden select-none pb-4 relative z-20"
      >
        <h1 className="font-sans font-black text-[11.5vw] sm:text-[12.5vw] md:text-[13vw] lg:text-[13.5vw] leading-[0.8] text-[#f0e8dc] hover:text-[#ff4500] uppercase tracking-tighter flex items-start transition-colors duration-500 whitespace-nowrap">
          TIRUMALA
          <span className="text-[#ff4500] text-base sm:text-2xl md:text-4xl lg:text-5xl font-medium mt-[1.2vw] ml-1 opacity-80">
            ®
          </span>
        </h1>
      </motion.div>
    </footer>
  );
};

export default Footer;