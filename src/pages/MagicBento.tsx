import React, { useEffect, useRef, useState } from "react";

const MagicBento = () => {
  return (
    <section className="w-full bg-[#0c0c0c] text-[#f0e8dc] py-32 border-t border-[rgba(240,232,220,0.08)]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="mb-24 flex items-center gap-3">
          <div className="w-8 h-[2px] bg-[#ff4500]" />
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#ff4500]">
            Engineering Milestones
          </h2>
        </div>

        {/* Strict Swiss Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40">

          <SwissItem
            value={8}
            suffix="+"
            label="Production Projects Shipped"
            description="Architected and deployed full-stack SaaS platforms, AI copilots, and offline-capable PWAs."
          />

          <SwissItem
            value={9}
            suffix="+"
            label="Professional Certifications"
            description="Certified by Anthropic (Claude Architect), Oracle Cloud, Simplilearn, Apna College & NIST."
          />

          <SwissItem
            value={7}
            suffix=".15"
            label="Academic Excellence (CGPA)"
            description="B.Tech Computer Science & Engineering at NIST University (2022–2026), Berhampur."
          />

          <SwissItem
            value={1}
            suffix="st"
            label="Systems-First Mindset"
            description="Architecture precedes interface. Scalable structure and clean contracts define the outcome."
          />

        </div>
      </div>
    </section>
  );
};

const SwissItem = ({ value, suffix, label, description }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.4 } // Swiss: intentional visibility
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animate = () => {
    const duration = 1200;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div ref={ref} className="flex flex-col items-start group">

      {/* Label */}
      <span className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#ff4500]">
        {label}
      </span>

      {/* Number */}
      <h3 className="mb-6 font-sans text-8xl md:text-9xl font-bold tracking-tight leading-none text-[#f0e8dc] group-hover:text-[#ff4500] transition-colors duration-300">
        {count.toLocaleString()}
        <span className="text-[#ff4500]">{suffix}</span>
      </h3>

      {/* Description */}
      <p className="max-w-sm font-sans text-base leading-6 text-[#c8bfb3]">
        {description}
      </p>
    </div>
  );
};

export default MagicBento;
