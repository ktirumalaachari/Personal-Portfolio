import { useEffect, useRef, useCallback, useState } from "react";
import { useLenis } from "lenis/react";
import StarBorder from "../components/StarBorder";
import './ScrollStack.css';

const projects = [
  {
    id: "001",
    title: "Enterprise AI CRM",
    stack: "React 18 / TypeScript / Node.js / MongoDB / Groq LLaMA-3.3 / Razorpay",
    description: "Multi-tenant enterprise CRM and sales intelligence platform featuring workspace isolation, company onboarding with admin approval queues, drag-and-drop Kanban deal pipelines, BANT lead qualification, 4-tier RBAC, Groq LLaMA-3.3 AI Sales Copilot, JWT + Google OAuth 2.0, and Razorpay SaaS subscriptions.",
    links: {
      live: "https://enterprise-ai-crm-platform.onrender.com",
      code: "https://github.com/ktirumalaachari/Enterprise-AI-CRM-Platform"
    },
    image: "/images/projects/enterprise-ai-crm.png",
  },
  {
    id: "002",
    title: "Developer Command Center",
    stack: "React 18 / TypeScript / Node.js / Express / Prisma / PostgreSQL / Gemini / Socket.IO",
    description: "Mission-control engineering observability SaaS unifying GitHub telemetry, real-time DORA metrics (Deployment Frequency, Lead Time, Change Failure Rate, MTTR), CI/CD health, and automated PR code reviews via Google Gemini 1.5 Flash with OWASP Top 10 scanning.",
    links: {
      live: "https://developercommandcenter.vercel.app",
      code: "https://github.com/ktirumalaachari/Developer-Command-Center"
    },
    image: "/images/projects/developer-command-center.png",
  },
  {
    id: "003",
    title: "Food Flow",
    stack: "Next.js 16 / React 19 / TypeScript / Express / MongoDB / Socket.IO / Leaflet / Gemini AI / PWA",
    description: "Multi-vendor food delivery ecosystem connecting customers, restaurants, delivery riders, and super admins in real time. Features offline PWA caching, Web Push notifications, live Leaflet GPS rider tracking with Delivery OTP verification, Razorpay checkout, and Gemini 2.5 AI Food Studio.",
    links: {
      live: "https://foodflow-phi-mauve.vercel.app",
      code: "https://github.com/ktirumalaachari/Food-Flow-Food-Delivery-Platform"
    },
    image: "/images/projects/food-flow.jpg",
  },
  {
    id: "004",
    title: "AI Resume Checker",
    stack: "React 19 / Vite / Node.js / Express / MongoDB / Gemini 2.5 Flash / TanStack Query / Zod",
    description: "Full-stack ATS resume analysis and career optimization platform powered by Google Gemini 2.5 Flash. Benchmarks resumes across four 25-point ATS quadrants, flags critical keyword gaps, generates quantified bullet rewrites via Zod-validated JSON schemas, and exports ATS-ready PDFs.",
    links: {
      live: "https://ai-resume-checker-ats-optimizer.vercel.app",
      code: "https://github.com/ktirumalaachari/AI-Resume-Checker-ATS-Optimizer"
    },
    image: "/images/projects/ai-resume-checker.jpg",
  },
  {
    id: "005",
    title: "CodeFlow AI",
    stack: "Next.js 15 / TypeScript / Python 3.12 / FastAPI / Monaco Editor / Gemini / Framer Motion",
    description: "Full-stack Python programming execution visualizer and AI tutor. Captures live execution traces inside sandboxed subprocesses to visualize arrays, two pointers, trees, graphs, and recursion trees step-by-step with time-travel scrubbing, an execution-aware AI Tutor, and 14 algorithm blueprints.",
    links: {
      live: "https://codeflow-ai-mu.vercel.app",
      code: "https://github.com/ktirumalaachari/CodeFlow-AI"
    },
    image: "/images/projects/codeflow-ai.png",
  },
  {
    id: "006",
    title: "WayPoint",
    stack: "React 18 / Vite / FastAPI / Python / Supabase / PostgreSQL / Groq AI / Framer Motion",
    description: "AI-powered career readiness platform that maps developer competencies through onboarding assessments and generates personalized, week-by-week adaptive learning roadmaps powered by Groq LLMs with progress heatmaps, analytics dashboards, and an AI career advisor.",
    links: {
      live: "https://way-point-beryl.vercel.app",
      code: "https://github.com/ktirumalaachari/WayPoint"
    },
    image: "/images/projects/waypoint.jpg",
  },
  {
    id: "007",
    title: "Credit Card Fraud Detection",
    stack: "Python / Flask / XGBoost / LightGBM / CatBoost / Random Forest / scikit-learn / MongoDB / PWA",
    description: "Real-time machine learning fraud detection system achieving 99.96% accuracy using a Hybrid ensemble alongside XGBoost, LightGBM, and CatBoost across 29 features. Paired with an installable offline-capable PWA web dashboard with Plotly.js visualizations and CSV batch uploads.",
    links: {
      live: "https://fraud-detection-sjkm.onrender.com",
      code: "https://github.com/ktirumalaachari/Credit-Card-Fraud-Detection-Using-Machine-Learning"
    },
    image: "/images/projects/credit-card-fraud-detection.jpg",
  },
  {
    id: "008",
    title: "Personal Portfolio",
    stack: "React 19 / TypeScript / TanStack Start / Nitro SSR / Tailwind v4 / Framer Motion / Resend",
    description: "Editorial full-stack developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS v4, and TanStack Start / Router on Nitro SSR. Features a 3D curved showcase arc, interactive radial skills wheel, spring-physics animations, interactive lanyard ID card, and live resume request API.",
    links: {
      live: "https://ktirumalaachari.vercel.app",
      code: "https://github.com/ktirumalaachari/Personal-Portfolio"
    },
    image: "/images/projects/personal-portfolio.jpg",
  },
];

interface ScrollStackCardProps {
  project: typeof projects[0];
  index: number;
}

const ScrollStackCard = ({ project, index }: ScrollStackCardProps) => {
  return (
    <StarBorder
      as="div"
      className="scroll-stack-card"
      color="#ff4500, #ff8c00, #ffd600"
      speed="8s"
    >
      <div className="card-top-row">
        <div className="id-brand-group">
          <span className="huge-number text-[#ff4500]">{project.id}</span>
          <div className="client-info">
            <span className="label font-bold text-[#f0e8dc]">{project.title}</span>
            <span className="client-name text-[#c8bfb3]">{project.stack}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {project.links.live && (
            <StarBorder
              as="a"
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(25);
                }
              }}
              className="live-btn-star"
              color="#ff4500, #ff8c00, #ffd600"
              speed="3s"
            >
              Live Demo ↗
            </StarBorder>
          )}
          {project.links.code && (
            <StarBorder
              as="a"
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(25);
                }
              }}
              className="live-btn-star"
              color="#ff4500, #ffd600, #ff4500"
              speed="4s"
            >
              GitHub ↗
            </StarBorder>
          )}
        </div>
      </div>

      <div className="content-grid">
        <img
          src={project.image}
          className="main-image w-full h-auto object-contain rounded-xl"
          alt={project.title}
          onLoad={() => window.dispatchEvent(new Event('resize'))}
        />
        <div className="project-description">
          <p>{project.description}</p>
        </div>
      </div>
    </StarBorder>
  );
};

const BASE_CONFIG = {
  itemDistance: 100,
  itemScale: 0.015,
  itemStackDistance: 18,
  stackPosition: 0.08,
  scaleEndPosition: 0.05,
  baseScale: 0.92,
};

const SelectedWorks = () => {
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef<number>(0);
  const stackInnerRef = useRef<HTMLDivElement>(null);
  const stackInnerTopRef = useRef<number>(0);
  const voidContainerRef = useRef<HTMLDivElement>(null);
  const kineticWheelRef = useRef<HTMLDivElement>(null);
  const threadPathRef = useRef<SVGPathElement>(null);
  const figureGroupRef = useRef<SVGGElement>(null);
  const threadLenRef = useRef(0);

  // Refs for Typography animation
  const textAnalyzeRef = useRef<SVGTextElement>(null);
  const textDesignRef = useRef<SVGTextElement>(null);
  const textBuildRef = useRef<SVGTextElement>(null);
  const textDeliverRef = useRef<SVGTextElement>(null);

  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLenis(({ scroll }) => {
    if (!ready) return;

    const cards = cardsRef.current;
    const cardOffsets = cardOffsetsRef.current;
    const endElementTop = endOffsetRef.current;
    const stackInnerTop = stackInnerTopRef.current;

    if (!cards.length || !cardOffsets.length) return;

    const containerHeight = window.innerHeight;
    const firstCardHeight = cards[0].offsetHeight;

    const isMobileViewport = window.innerWidth < 1024;

    if (isMobileViewport) {
      // 1. Reset card transforms on mobile so they scroll naturally and do not shake/lag
      cards.forEach((card) => {
        card.style.transform = "";
      });

      // 2. Compute progress for scroll animations (ribbon and kinetic text)
      const stackPositionPx = Math.max(88, (containerHeight - firstCardHeight) / 2);
      const scaleEndPositionPx = stackPositionPx - (BASE_CONFIG.stackPosition - BASE_CONFIG.scaleEndPosition) * containerHeight;
      const lastCardTop = cardOffsets[cards.length - 1];
      const triggerEndLast = lastCardTop - scaleEndPositionPx;

      const voidStart = triggerEndLast;
      const voidDistance = containerHeight * 1.2;
      let voidProgress = 0;

      if (scroll > voidStart) {
        voidProgress = (scroll - voidStart) / voidDistance;
        voidProgress = Math.min(Math.max(voidProgress, 0), 1);
      }

      // Animate S-Curve ribbon
      const thread = threadPathRef.current;
      const threadLen = threadLenRef.current;
      if (thread && threadLen > 0) {
        let drawP = 0;
        if (voidProgress > 0.2) {
          drawP = (voidProgress - 0.2) / 0.8;
        }
        drawP = Math.min(Math.max(drawP, 0), 1);
        thread.style.strokeDasharray = `${threadLen}`;
        thread.style.strokeDashoffset = `${(threadLen * (1 - drawP)).toFixed(2)}`;

        const animateText = (ref: React.RefObject<SVGTextElement>, targetP: number) => {
          if (!ref.current) return;
          const threshold = 0.15;
          const dist = Math.abs(drawP - targetP);
          let intensity = 0;
          if (dist < threshold) {
            intensity = 1 - (dist / threshold);
          }
          const opacity = 0.3 + (0.7 * intensity);
          const scale = 1 + (0.05 * intensity);
          ref.current.style.opacity = opacity.toFixed(2);
          ref.current.style.transform = `scale(${scale})`;
          ref.current.style.transformOrigin = 'center';
          ref.current.style.transformBox = 'fill-box';
        };

        animateText(textAnalyzeRef, 0.04);
        animateText(textDesignRef, 0.20);
        animateText(textBuildRef, 0.40);
        animateText(textDeliverRef, 0.60);
      }

      // Animate kinetic wheel display/visibility
      const kineticWheel = kineticWheelRef.current;
      if (kineticWheel) {
        if (scroll > endElementTop + containerHeight * 1.2 + containerHeight * 0.2) {
          kineticWheel.style.display = 'none';
          kineticWheel.style.visibility = 'hidden';
        } else if (voidProgress > 0) {
          kineticWheel.style.display = 'block';
          kineticWheel.style.visibility = 'visible';

          let figOpacity = 0;
          if (voidProgress <= 0.25) {
            figOpacity = 0.5 * (voidProgress / 0.25);
          } else if (voidProgress <= 0.5) {
            figOpacity = 0.5 + 0.5 * ((voidProgress - 0.25) / 0.25);
          } else {
            figOpacity = 1;
          }

          kineticWheel.style.opacity = figOpacity.toFixed(3);
          kineticWheel.style.transform = `translate3d(0, 0, 0)`;

          if (figureGroupRef.current) {
            if (voidProgress >= 0.8) {
              const textFade = 1 - ((voidProgress - 0.8) / 0.2);
              figureGroupRef.current.style.opacity = Math.max(0, textFade).toFixed(3);
            } else {
              figureGroupRef.current.style.opacity = '1';
            }
          }
        } else {
          kineticWheel.style.display = 'block';
          kineticWheel.style.opacity = '0';
          kineticWheel.style.visibility = 'hidden';
          kineticWheel.style.transform = `translate3d(0, 0, 0)`;
          if (figureGroupRef.current) figureGroupRef.current.style.opacity = '1';
        }
      }
      return;
    }

    const stackPositionPx = (containerHeight - firstCardHeight) / 2;
    const scaleEndPositionPx = stackPositionPx - (BASE_CONFIG.stackPosition - BASE_CONFIG.scaleEndPosition) * containerHeight;

    const lastCardTop = cardOffsets[cards.length - 1];
    const triggerEndLast = lastCardTop - scaleEndPositionPx;

    const voidStart = triggerEndLast;
    const voidDistance = containerHeight * 1.2;
    let voidProgress = 0;

    if (scroll > voidStart) {
      voidProgress = (scroll - voidStart) / voidDistance;
      voidProgress = Math.min(Math.max(voidProgress, 0), 1);
    }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = cardOffsets[i];
      const triggerStart = cardTop - stackPositionPx - BASE_CONFIG.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = Math.max(endElementTop - containerHeight * 0.5, voidStart + voidDistance);

      let scaleProgress = 0;
      if (scroll >= triggerEnd) {
        scaleProgress = 1;
      } else if (scroll > triggerStart) {
        scaleProgress = (scroll - triggerStart) / (triggerEnd - triggerStart);
      }

      scaleProgress = Math.min(Math.max(scaleProgress, 0), 1);

      const targetScale = BASE_CONFIG.baseScale + i * BASE_CONFIG.itemScale;
      const scale = Number((1 - scaleProgress * (1 - targetScale)).toFixed(4));

      let translateY = 0;
      if (scroll >= pinStart && scroll <= pinEnd) {
        translateY = scroll - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      } else if (scroll > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    }

    const voidContainer = voidContainerRef.current;
    const stackInner = stackInnerRef.current;

    if (voidContainer && stackInner) {
      const originY = scroll + containerHeight / 2 - stackInnerTop;
      stackInner.style.perspectiveOrigin = `50% ${originY}px`;

      if (voidProgress > 0) {
        const easeScale = Math.pow(voidProgress, 1.5);
        const currentZ = -easeScale * 3000;
        const currentScale = 1 - easeScale;
        const currentOpacity = 1 - Math.pow(voidProgress, 2.5);

        voidContainer.style.transformOrigin = `50% ${originY}px`;
        voidContainer.style.transform = `translate3d(0, 0, ${currentZ}px) scale(${Math.max(0, currentScale).toFixed(4)})`;
        voidContainer.style.opacity = Math.max(0, currentOpacity).toFixed(3);

        if (voidProgress >= 1) {
          voidContainer.style.visibility = 'hidden';
        } else {
          voidContainer.style.visibility = 'visible';
        }
      } else {
        voidContainer.style.transformOrigin = '';
        voidContainer.style.transform = '';
        voidContainer.style.opacity = '1';
        voidContainer.style.visibility = 'visible';
      }
    }

    const thread = threadPathRef.current;
    const threadLen = threadLenRef.current;

    const kineticWheel = kineticWheelRef.current;
    if (kineticWheel) {
      if (scroll > endElementTop + containerHeight * 1.2 + containerHeight * 0.2) {
        kineticWheel.style.display = 'none';
        kineticWheel.style.visibility = 'hidden';
      } else if (voidProgress > 0) {
        kineticWheel.style.display = 'block';
        kineticWheel.style.visibility = 'visible';
        kineticWheel.style.opacity = Math.min(voidProgress * 4, 1).toFixed(3);
        const targetRotation = 180 * (1 - voidProgress);
        kineticWheel.style.transformOrigin = '50% 100%';
        kineticWheel.style.transform = `rotate(${targetRotation}deg)`;
      } else {
        kineticWheel.style.display = 'block';
        kineticWheel.style.opacity = '0';
        kineticWheel.style.visibility = 'hidden';
        kineticWheel.style.transform = `rotate(180deg)`;
      }
    }
  });

  const cachePositions = useCallback(() => {
    setReady(false);
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;
    cards.forEach(card => card.style.transform = '');
    if (voidContainerRef.current) {
      voidContainerRef.current.style.transform = '';
      voidContainerRef.current.style.transformOrigin = '';
    }
    if (kineticWheelRef.current) kineticWheelRef.current.style.transform = '';

    if (threadPathRef.current && isMobile) {
      try {
        const len = threadPathRef.current.getTotalLength();
        if (len > 0) {
          threadLenRef.current = len;
          threadPathRef.current.style.strokeDasharray = `${len}`;
          threadPathRef.current.style.strokeDashoffset = `${len}`;
        }
      } catch (e) { }
    }

    const scrollY = window.scrollY;
    cardOffsetsRef.current = cards.map(card => card.getBoundingClientRect().top + scrollY);
    const endElement = document.querySelector('.scroll-stack-end') as HTMLElement;
    if (endElement) endOffsetRef.current = endElement.getBoundingClientRect().top + scrollY;
    if (stackInnerRef.current) stackInnerTopRef.current = stackInnerRef.current.getBoundingClientRect().top + scrollY;
    setReady(true);
  }, [isMobile]);

  const calculateAndRender = useCallback(() => {
    cachePositions();
  }, [cachePositions]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${BASE_CONFIG.itemDistance}px`;
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });
    calculateAndRender();
    const initTimer = setTimeout(calculateAndRender, 100);
    window.addEventListener('resize', calculateAndRender, { passive: true });
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', calculateAndRender);
    };
  }, [calculateAndRender]);

  return (
    <section className="min-h-screen bg-[#0c0c0c] text-[#f0e8dc] font-sans relative">
      <div className="w-full h-[25vh] md:h-[25vh] lg:h-[70vh] border-b border-[rgba(240,232,220,0.1)] overflow-hidden flex items-center relative z-10 bg-[#0c0c0c]">
        <div className="marquee-selected-works">
          <div className="marquee-selected-works__track">
            {[0, 1, 2, 3].map((blockIndex) => (
              <div key={blockIndex} className="marquee-selected-works__segment" aria-hidden={blockIndex > 0 ? "true" : undefined}>
                <span className="marquee-selected-works__text text-[#f0e8dc]">Selected Works</span>
                <span className="marquee-selected-works__dash text-[#ff4500]">—</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={stackInnerRef} className="scroll-stack-inner px-6 md:px-12 lg:px-16" style={{ transformStyle: 'preserve-3d' }}>
        <div ref={voidContainerRef} className="void-container relative w-full flex flex-col items-center justify-center" style={{ willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}>
          {projects.map((project, index) => (
            <ScrollStackCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className={`scroll-stack-end pointer-events-none h-[120vh]`} />
      </div>

      <div ref={kineticWheelRef} className="kinetic-wheel pointer-events-none" style={{
        position: 'fixed',
        top: isMobile ? '50%' : 'auto',
        bottom: isMobile ? 'auto' : '-18vh',
        left: '0',
        width: '100vw',
        height: isMobile ? '100vw' : 'auto',
        marginTop: isMobile ? 'calc(-50vw)' : '0',
        zIndex: 0,
        visibility: 'hidden',
        opacity: 0,
        willChange: 'transform, opacity',
      }}>
        {isMobile ? (
          <svg viewBox="0 0 1500 2000" className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,69,0,0)" />
                <stop offset="15%" stopColor="rgba(255,69,0,0.9)" />
                <stop offset="85%" stopColor="rgba(255,214,0,0.9)" />
                <stop offset="100%" stopColor="rgba(255,69,0,0)" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Sweeping S-Curve (Winding Ribbon) */}
            <path
              ref={threadPathRef}
              d="M 750,0 L 750,250 C 750,550 250,500 250,800 C 250,1100 1250,1050 1250,1350 C 1250,1650 750,1600 750,1900 L 750,3000"
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g ref={figureGroupRef}>
              <text ref={textAnalyzeRef} x="750" y="150" fill="#f0e8dc" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.35 }} textAnchor="middle" dy=".3em">ANALYZE</text>
              <circle cx="750" cy="250" r="15" fill="#ff4500" filter="url(#glow)" />

              <text ref={textDesignRef} x="250" y="700" fill="#f0e8dc" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.35 }} textAnchor="middle" dy=".3em">DESIGN</text>
              <circle cx="250" cy="800" r="15" fill="#ff4500" filter="url(#glow)" />

              <text ref={textBuildRef} x="1250" y="1250" fill="#f0e8dc" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.35 }} textAnchor="middle" dy=".3em">BUILD</text>
              <circle cx="1250" cy="1350" r="15" fill="#ff4500" filter="url(#glow)" />

              <text ref={textDeliverRef} x="750" y="1800" fill="#f0e8dc" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.35 }} textAnchor="middle" dy=".3em">DELIVER</text>
              <circle cx="750" cy="1900" r="20" fill="#ffd600" filter="url(#glow)" />
            </g>
          </svg>
        ) : (
          <svg viewBox="0 0 3000 1500" className="w-full h-auto" style={{ overflow: 'visible' }}>
            <path id="arc-path" d="M 400,1500 A 1100,1100 0 0,1 2600,1500" fill="none" stroke="none" />
            {[
              { text: 'ANALYZE', offset: '15%' }, { text: '●', offset: '27%' },
              { text: 'DESIGN', offset: '38%' }, { text: '●', offset: '50%' },
              { text: 'BUILD', offset: '62%' }, { text: '●', offset: '73%' },
              { text: 'DELIVER', offset: '85%' },
            ].map((item, i) => (
              <text key={i} fill={item.text === '●' ? '#ff4500' : '#f0e8dc'} style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: item.text === '●' ? '50px' : '100px', textTransform: 'uppercase' }} dy={item.text === '●' ? '-18' : '0'}>
                <textPath href="#arc-path" startOffset={item.offset} textAnchor="middle">{item.text}</textPath>
              </text>
            ))}
          </svg>
        )}
      </div>
    </section>
  );
};

export default SelectedWorks;