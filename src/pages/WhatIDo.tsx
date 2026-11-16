import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Cpu, Activity, Layout, Lightbulb } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Prevents mobile browser URL bar resize from jerking the scroll trigger
ScrollTrigger.config({ ignoreMobileResize: true });

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    id: "fullstack",
    num: "01",
    title: "Full-Stack SaaS & PWAs",
    description: "I build production-ready SaaS platforms, progressive web apps, and enterprise applications using React 19, Next.js, TypeScript, and MongoDB with offline caching, role-based access, and seamless payment integrations.",
    details: ["React 19 & Next.js Architecture", "Offline-Ready Progressive Web Apps", "Razorpay Payment Gateways"],
    icon: <Layout className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 shrink-0 text-[#ff4500]" />,
  },
  {
    id: "ai",
    num: "02",
    title: "Generative AI & Agentic Workflows",
    description: "I engineer AI Copilots, prompt pipelines, and autonomous agent systems powered by Google Gemini, Groq LLaMA-3.3, and DeepSeek, with structured Zod outputs, automated scoring, and real-time streaming.",
    details: ["LLM Copilots & Workflows", "Gemini & Groq AI Integrations", "Zod Structured Validations"],
    icon: <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 shrink-0 text-[#ff4500]" />,
  },
  {
    id: "system",
    num: "03",
    title: "Distributed APIs & Real-Time Systems",
    description: "I architect event-driven backends and real-time communication systems using Node.js, Express, FastAPI, Socket.IO, and PostgreSQL with encrypted tokens and webhook pipelines.",
    details: ["Real-Time Socket.IO Streaming", "FastAPI & Express Backends", "PostgreSQL & Prisma Data Layers"],
    icon: <Cpu className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 shrink-0 text-[#ff4500]" />,
  },
  {
    id: "perf",
    num: "04",
    title: "Performance & ATS Optimization",
    description: "I engineer automated resume heuristic engines and code analysis pipelines with time-travel trace scrubbers, algorithm visualizers, and sub-100ms API response targets.",
    details: ["Automated ATS Benchmarking", "Code Execution Scrubbers", "Sub-100ms API Latency"],
    icon: <Activity className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 shrink-0 text-[#ff4500]" />,
  },
  {
    id: "ml",
    num: "05",
    title: "Machine Learning & Fraud Detection",
    description: "I train and deploy production ensemble ML classifiers (XGBoost, LightGBM, CatBoost) achieving 99.96% accuracy, paired with real-time interactive dashboards and PWA interfaces.",
    details: ["Ensemble Classification Models", "XGBoost, LightGBM & CatBoost", "Plotly & Chart.js Visualizations"],
    icon: <Lightbulb className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 shrink-0 text-[#ff4500]" />,
  },
];

export const WhatIDo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("ai");
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Connect global Lenis scroll updates to GSAP ScrollTrigger
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // Create GSAP Pinning Logic linked to global scroll container
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${(services.length - 1) * 100}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * services.length),
            services.length - 1
          );
          setActiveId(services[index].id);
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return (
    <div 
      id="what-i-do"
      ref={sectionRef} 
      className="relative z-30 w-full h-screen bg-[#0c0c0c] backdrop-blur-xl text-[#f0e8dc] font-sans overflow-hidden flex flex-col justify-start pt-20 xs:pt-24 md:pt-16 lg:pt-20 border-t border-[rgba(240,232,220,0.08)] what-i-do-container"
      style={{ willChange: "transform" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .what-i-do-lottie {
          width: 280px;
          height: 290px;
          transition: width 0.3s ease, height 0.3s ease;
        }
        @media (max-height: 740px) {
          .what-i-do-container {
            padding-top: 4rem !important;
          }
          .what-i-do-row-header {
            padding-top: 0.4rem !important;
            padding-bottom: 0.4rem !important;
          }
          .what-i-do-grid {
            margin-bottom: 0.75rem !important;
          }
          .what-i-do-details {
            padding-bottom: 0.5rem !important;
          }
          .what-i-do-detail-item {
            padding-top: 0.25rem !important;
            padding-bottom: 0.25rem !important;
          }
          .what-i-do-lottie {
            width: 160px !important;
            height: 160px !important;
          }
        }
        @media (max-height: 660px) {
          .what-i-do-container {
            padding-top: 3rem !important;
          }
          .what-i-do-row-header {
            padding-top: 0.25rem !important;
            padding-bottom: 0.25rem !important;
          }
          .what-i-do-grid {
            margin-bottom: 0.5rem !important;
          }
          .what-i-do-details {
            padding-bottom: 0.25rem !important;
          }
          .what-i-do-detail-item {
            padding-top: 0.15rem !important;
            padding-bottom: 0.15rem !important;
          }
          .what-i-do-lottie {
            width: 120px !important;
            height: 120px !important;
          }
        }
        @media (max-height: 580px) {
          .what-i-do-container {
            padding-top: 2rem !important;
          }
          .what-i-do-lottie {
            width: 90px !important;
            height: 90px !important;
          }
        }
      `}} />
      <div className="w-full max-w-[1400px] mx-auto px-4 xs:px-5 sm:px-8 md:px-12 lg:px-16 py-2">
        
        {/* Header Grid - Aggressively Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-3 sm:gap-y-4 md:gap-x-8 items-start mb-6 sm:mb-8 md:mb-8 what-i-do-grid">
          <div className="col-span-1 md:col-span-6">
            <h2 
              className="font-black uppercase tracking-tight leading-[0.75] text-[#f0e8dc]"
              style={{ fontSize: "clamp(1.5rem, 9vw, 5rem)" }}
            >
              What I Do / 
            </h2>
          </div>

          {/* Lottie animation centered in the header on Mobile/Tablet */}
          <div className="flex items-center justify-center w-full md:hidden my-2 overflow-hidden min-h-0 col-span-1">
            <DotLottieReact
              src="https://lottie.host/23d558f1-4962-4588-a8d8-b3fa7551ff99/8Gpnrd0eP4.json"
              loop
              autoplay
              className="what-i-do-lottie"
            />
          </div>
          <div className="hidden md:block col-span-2 pt-2 md:pt-4 text-left">
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#ff4500] font-mono">
              ( Expertise )
            </span>
          </div>
          <div className="col-span-1 md:col-span-4 pt-0 sm:pt-1 md:pt-4">
            <p 
              className="font-medium text-[#c8bfb3] leading-snug sm:leading-relaxed max-w-sm"
              style={{ fontSize: "clamp(0.6rem, 2.5vw, 1rem)" }}
            >
              Full-Stack & AI Software Engineer specializing in scalable SaaS applications, Generative AI copilot workflows, and real-time distributed platforms.
            </p>
          </div>
        </div>

        {/* Accordion Rows List */}
        <div className="w-full border-b border-[rgba(240,232,220,0.12)]">
          {services.map((service) => {
            const isActive = activeId === service.id;

            return (
              <div
                key={service.id}
                className="w-full border-t border-[rgba(240,232,220,0.12)] transition-colors duration-500"
              >
                {/* Accordion Row Header - Deeply Responsive */}
                <div className="flex items-center justify-between py-1.5 xs:py-2 sm:py-3 md:py-4 lg:py-4.5 what-i-do-row-header">
                  <div className="flex items-center gap-2 sm:gap-4 md:gap-8 lg:gap-12 min-w-0">
                    <span 
                      className={`font-bold tracking-widest font-mono shrink-0 transition-colors duration-300 ${
                        isActive ? "text-[#ff4500]" : "text-[#7a746d]"
                      }`}
                      style={{ fontSize: "clamp(0.55rem, 2vw, 0.9rem)" }}
                    >
                      ( {service.num} )
                    </span>
                    <h3 
                      className={`font-black uppercase tracking-tight leading-none transition-colors duration-300 truncate ${
                        isActive ? "text-[#f0e8dc] group-hover:text-[#ff4500]" : "text-[#7a746d]/50"
                      }`}
                      style={{ fontSize: "clamp(0.7rem, 4.5vw, 2.2rem)" }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center pr-1 sm:pr-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                      className={`transition-colors duration-300 ${isActive ? "text-[#ff4500]" : "text-[#7a746d]/40"}`}
                    >
                      {service.icon}
                    </motion.div>
                  </div>
                </div>

                {/* Accordion Expanded Content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                      style={{ willChange: "height, opacity" }}
                    >
                      <div className="flex flex-col md:flex-row gap-2 sm:gap-4 md:gap-8 lg:gap-12 pb-2 sm:pb-4 md:pb-4 lg:pb-5 pl-2 sm:pl-10 md:pl-20 pr-1 sm:pr-4 what-i-do-details">
                        
                        {/* Description block */}
                        <div className="w-full md:w-1/2">
                          <p 
                            className="font-medium text-[#c8bfb3] leading-snug sm:leading-relaxed"
                            style={{ fontSize: "clamp(0.6rem, 2.2vw, 1rem)" }}
                          >
                            {service.description}
                          </p>
                        </div>

                        {/* Details stack list */}
                        <div className="w-full md:w-1/2 flex flex-col justify-end gap-1 sm:gap-2">
                          {service.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 sm:gap-3 border-b border-[rgba(240,232,220,0.08)] pb-1 sm:pb-2 last:border-b-0 what-i-do-detail-item"
                            >
                              <span 
                                className="font-bold text-[#ff4500] tracking-widest font-mono shrink-0"
                                style={{ fontSize: "clamp(0.5rem, 1.5vw, 0.75rem)" }}
                              >
                                0{idx + 1}
                              </span>
                              <span 
                                className="font-bold tracking-tight text-[#f0e8dc]"
                                style={{ fontSize: "clamp(0.6rem, 2.2vw, 0.95rem)" }}
                              >
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
};

export default WhatIDo;



