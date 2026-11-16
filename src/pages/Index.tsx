import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Components
import About from "./About";
import SelectedWorks from "./SelectedWorks";
import VectorBridge from "./VectorBridge";
import ScrollVelocity from "./ScrollVelocity";
import CodeShipRepeat from "./CodeShipRepeat";
import HeroImgHolder from "./HeroImgHolder";
import PagePreloader from "@/components/PagePreloader";
import WhatIDo from "./WhatIDo";
import Certificates from "./Certificates";
import Footer from "./Footer";
import Contact from "./Contact";
import Testimonial from "./Testimonial";
import Navbar from "@/components/Navbar";
import { AIChatWidget } from "@/components/AIChatWidget";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  const [heroReady, setHeroReady] = useState(false);
  const footerContainerRef = useRef<HTMLDivElement>(null);

  // Global Page Scroll Progress for top accent bar
  const { scrollYProgress: pageScrollYProgress } = useScroll();
  const scaleX = useSpring(pageScrollYProgress, {
    stiffness: 280,
    damping: 24,
    restDelta: 0.001,
  });

  // Footer Parallax Scrub
  const { scrollYProgress: footerScrollProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "end end"],
  });

  const footerY = useTransform(footerScrollProgress, [0, 1], ["-50%", "0%"]);

  const handleStartExit = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <div id="top" className="min-h-screen relative bg-[#0c0c0c] text-[#f0e8dc] selection:bg-[#ff4500] selection:text-black">
      {/* Cinematic Curtain Preloader */}
      <PagePreloader
        name="K TIRUMALA ACHARI"
        subtitle="PORTFOLIO 2026"
        onStartExit={handleStartExit}
        onComplete={handleStartExit}
      />

      {/* Opening Sweep Loader & Active Scroll Progress Bar matching authentic portfolio */}
      <div className="opening-loader-bar" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[55] pointer-events-none bg-gradient-to-r from-[#ff4500] via-[#ffd600] to-[#ff4500]"
      />

      {/* Authentic Top Navigation Bar */}
      <Navbar />

      {/* Fixed About Section Behind Scroll */}
      <div className="fixed inset-0 z-0 bg-[#0c0c0c] text-[#f0e8dc]">
        <About />
      </div>

      {/* Authentic Identity Card Hero Section - Animatest in sync with preloader exit */}
      <HeroSection key={heroReady ? "hero-active" : "hero-standby"} />

      {/* Hero Showcase Card */}
      <HeroImgHolder />

      <div className="relative z-20 w-full bg-transparent">
        <div id="about" className="h-screen w-full pointer-events-none" />

        <div id="work" data-ai="projects" className="bg-[#0c0c0c] text-[#f0e8dc] relative z-20">
          <SelectedWorks />
        </div>

        <div id="skills" data-ai="skills-philosophy" className="bg-[#0c0c0c] text-[#f0e8dc] relative z-20">
          <VectorBridge />
        </div>

        <WhatIDo />

        <div id="certs" className="relative z-20">
          <Certificates />
        </div>

        <div className="scroll-velocity-wrapper relative z-20">
          <ScrollVelocity
            texts={[
              "Faster Delivery ➔ Faster Delivery ➔ Faster Delivery ➔",
              "Scalable Products ❇ Scalable Products ❇ Scalable Products ❇",
              "Reliable Systems ✦ Reliable Systems ✦ Reliable Systems ✦",
            ]}
            velocity={75}
          />
        </div>

        <CodeShipRepeat />

        <div className="bg-[#0c0c0c] text-[#f0e8dc] relative z-20">
          <Testimonial />
        </div>

        {/* Contact Section */}
        <div id="contact" data-ai="contact" className="relative z-20 bg-[#0c0c0c] text-[#f0e8dc]">
          <Contact />
        </div>
      </div>

      {/* Parallax Footer Reveal Stack */}
      <div ref={footerContainerRef} className="relative z-0 h-screen w-full overflow-hidden bg-[#0c0c0c] text-[#f0e8dc]">
        <motion.div style={{ y: footerY }} className="h-full w-full">
          <Footer />
        </motion.div>
      </div>

      {/* Floating Ephemeral RAG AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
};

export default Index;
