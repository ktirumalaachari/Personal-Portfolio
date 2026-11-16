import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  HERO_NAME_LINES_DESKTOP,
  HERO_NAME_LINES_MOBILE,
  HERO_ROLES,
  HERO_STATS,
  PROFILE_INFO,
  BOUNCE_SPRING,
} from "@/data/profile";
import LanyardIdCard from "./LanyardIdCard";

export const HeroSection: React.FC = () => {
  const lenis = useLenis();
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % HERO_ROLES.length);
    }, 2200);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      id="home"
      data-ai="hero"
      className="min-h-screen relative overflow-hidden pt-14 flex flex-col bg-[#0c0c0c] text-[#f0e8dc] z-20 border-b border-[#222]"
    >
      {/* Desktop 3-Column Grid spanning full viewport width */}
      <div
        className="flex-1 hidden lg:grid w-full h-[calc(100vh-3.5rem)]"
        style={{ gridTemplateColumns: "1fr 520px 160px" }}
      >
        {/* Left Column: Typography, Role Pill, Tagline, Action Buttons */}
        <div
          className="flex flex-col justify-center px-10 xl:px-14 py-12"
          style={{ borderRight: "1px solid #222" }}
        >
          {HERO_NAME_LINES_DESKTOP.map(({ word, indent }, idx) => (
            <div key={word} className="overflow-hidden mb-1">
              <div
                className={`hero-word-up font-display text-[clamp(4.2rem,7.5vw,8.5rem)] leading-[0.88] tracking-tight uppercase select-none ${
                  idx === 1 ? "text-[#ff4500]" : "text-[#f0e8dc]"
                }`}
                style={{
                  paddingLeft: `${indent}px`,
                  animationDelay: `${0.03 + idx * 0.05}s`,
                }}
              >
                {word}
              </div>
            </div>
          ))}

          {/* Animated Role Switcher */}
          <div
            className="hero-bounce-in flex items-center gap-3 mt-6 mb-6"
            style={{ animationDelay: "0.14s" }}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-[#7a746d]">{"//"}</span>
            <div className="relative overflow-hidden" style={{ minWidth: "220px", height: "34px" }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={roleIdx}
                  initial={{ y: 26, opacity: 0, scale: 0.92 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -22, opacity: 0, scale: 0.95 }}
                  transition={BOUNCE_SPRING}
                  className="absolute inset-0 flex items-center"
                >
                  <span
                    className="font-mono text-xs tracking-[0.15em] uppercase font-bold px-3.5 py-1 rounded-md"
                    style={{
                      background: "#ff4500",
                      color: "#0c0c0c",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {HERO_ROLES[roleIdx]}
                  </span>
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Subtitle & Tagline */}
          <p
            className="hero-fade-up font-body text-[#7a746d] text-sm max-w-md leading-[1.85] mb-10"
            style={{ animationDelay: "0.18s" }}
          >
            <span className="block">{PROFILE_INFO.subtitle}</span>
            <span className="block mt-1">{PROFILE_INFO.tagline}</span>
          </p>

          {/* Two Action Buttons matching screenshot */}
          <div
            className="hero-bounce-in flex items-center gap-4 flex-wrap"
            style={{ animationDelay: "0.24s" }}
          >
            <a
              href="#work"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                navigator.vibrate?.(30);
                lenis?.scrollTo("#work");
              }}
            >
              View Projects ↗
            </a>
            <a
              href="#contact"
              className="btn-outline"
              onClick={(e) => {
                e.preventDefault();
                navigator.vibrate?.(30);
                lenis?.scrollTo("#contact");
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Center Column: Hanging Lanyard Student Identity Card */}
        <div
          className="hero-lanyard-drop relative flex flex-col items-center justify-start pt-0 overflow-hidden"
          style={{
            borderRight: "1px solid #222",
            animationDelay: "0.08s",
          }}
        >
          <LanyardIdCard />
        </div>

        {/* Right Column: Vertical Stats Sidebar */}
        <div
          className="hero-fade-right flex flex-col justify-between"
          style={{ animationDelay: "0.14s" }}
        >
          {HERO_STATS.map(({ num, color, labelLines, bar }, idx) => (
            <div
              key={num}
              className="flex flex-col justify-center px-6 py-7 flex-1 hover:bg-white/[0.02] transition-colors"
              style={{ borderBottom: "1px solid #222" }}
            >
              <span className={`font-display text-4xl leading-none mb-2 ${color}`}>{num}</span>
              <span
                className="font-mono text-[0.52rem] tracking-widest uppercase text-[#7a746d]"
                style={{ lineHeight: 1.7 }}
              >
                {labelLines[0]}
                <br />
                {labelLines[1]}
              </span>
              <div className="mt-4 h-px bg-[#222] relative overflow-hidden">
                <div
                  className="hero-bar-grow absolute inset-y-0 left-0 bg-[#ff4500]"
                  style={{ width: bar, animationDelay: `${0.2 + idx * 0.08}s` }}
                />
              </div>
            </div>
          ))}

          {/* 2026 Open to Roles Beacon */}
          <div className="flex flex-col justify-center px-6 py-7 flex-1 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-display text-2xl leading-none text-emerald-400">
                {PROFILE_INFO.gradYear}
              </span>
            </div>
            <span
              className="font-mono text-[0.52rem] tracking-widest uppercase text-emerald-400"
              style={{ lineHeight: 1.7 }}
            >
              Open to
              <br />
              Roles
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Layout (lg:hidden) */}
      <div className="lg:hidden flex-1 flex flex-col px-5 pt-4 pb-8">
        <div
          className="hero-fade-in flex items-center gap-3 mb-4"
          style={{ animationDelay: "0.04s" }}
        >
          <div className="w-5 h-px bg-[#ff4500]" />
          <span className="font-mono text-[0.75rem] tracking-[0.22em] uppercase text-[#ff4500] font-bold">
            Portfolio
          </span>
        </div>

        {/* Mobile Split View: Name + Code Terminal on Left, Hanging Card on Right */}
        <div className="flex items-start justify-between gap-3" style={{ minHeight: "290px" }}>
          <div className="flex flex-col justify-start flex-1 min-w-0 pr-1">
            {HERO_NAME_LINES_MOBILE.map(({ word, indent }, idx) => (
              <div key={word} className="overflow-hidden">
                <div
                  className={`hero-word-up font-display leading-[0.88] tracking-tight uppercase ${
                    idx === 1 ? "text-[#ff4500]" : "text-[#f0e8dc]"
                  }`}
                  style={{
                    fontSize: "clamp(2.4rem, 10vw, 3.8rem)",
                    paddingLeft: `${indent}px`,
                    animationDelay: `${0.06 + idx * 0.05}s`,
                  }}
                >
                  {word}
                </div>
              </div>
            ))}

            {/* Mobile Role Pill */}
            <div
              className="hero-fade-in flex items-center gap-2 mt-3.5"
              style={{ animationDelay: "0.14s" }}
            >
              <span className="font-mono text-[0.55rem] tracking-[0.18em] text-[#7a746d]">
                {"//"}
              </span>
              <div
                className="relative overflow-hidden"
                style={{ minWidth: "160px", height: "26px" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={roleIdx}
                    initial={{ y: 22, opacity: 0, scale: 0.92 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.95 }}
                    transition={BOUNCE_SPRING}
                    className="absolute inset-0 flex items-center"
                  >
                    <span
                      className="font-mono text-[0.55rem] tracking-[0.12em] uppercase font-bold px-2.5 py-0.5 rounded shadow-[0_0_12px_rgba(255,69,0,0.3)]"
                      style={{
                        background: "#ff4500",
                        color: "#0c0c0c",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {HERO_ROLES[roleIdx]}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile profile.ts Code Terminal */}
            <div
              className="hero-fade-up mt-3"
              style={{
                border: "1px solid #2a2a2a",
                animationDelay: "0.2s",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5"
                style={{ background: "#1c1c1c", borderBottom: "1px solid #2a2a2a" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#28C840" }} />
                <span className="font-mono text-[0.38rem] tracking-widest uppercase text-[#7a746d] ml-auto">
                  profile.ts
                </span>
              </div>
              <div className="px-3 py-1.5 font-mono text-[0.46rem] leading-[1.75] bg-[#141414] overflow-x-auto text-left">
                <p>
                  <span className="text-[#ff4500]">const</span>{" "}
                  <span className="text-[#c8bfb3]">Developer</span> = {"{"}
                </p>
                <p className="pl-3">
                  <span className="text-[#569CD6]">name</span>:{" "}
                  <span className="text-[#ffd600]">&quot;K Tirumala Achari&quot;</span>,
                </p>
                <p className="pl-3">
                  <span className="text-[#569CD6]">university</span>:{" "}
                  <span className="text-[#ffd600]">&quot;NIST University&quot;</span>,
                </p>
                <p className="pl-3">
                  <span className="text-[#569CD6]">cgpa</span>:{" "}
                  <span className="text-[#ffd600]">7.15</span>,
                </p>
                <p className="pl-3">
                  <span className="text-[#569CD6]">role</span>:{" "}
                  <span className="text-[#ffd600]">Software Developer</span>,
                </p>
                <p className="pl-3">
                  <span className="text-[#569CD6]">available</span>:{" "}
                  <span className="text-[#ff4500]">true</span>,{" "}
                  <span className="italic text-[#4A9955] text-[0.46rem]">
                    {"// open to work ·"}
                  </span>
                </p>
                <p>{"}"}</p>
              </div>
            </div>
          </div>

          {/* Mobile Scaled Hanging Lanyard ID Card */}
          <div
            className="hero-lanyard-drop"
            style={{
              width: "135px",
              flexShrink: 0,
              height: "295px",
              overflow: "hidden",
              position: "relative",
              animationDelay: "0.1s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%) scale(0.44)",
                transformOrigin: "top center",
                width: "300px",
              }}
            >
              <LanyardIdCard />
            </div>
          </div>
        </div>

        {/* Mobile Subtitle & Tagline */}
        <p
          className="hero-fade-up font-body text-[#7a746d] text-xs sm:text-sm max-w-sm leading-[1.8] my-6"
          style={{ animationDelay: "0.22s" }}
        >
          <span className="block text-[#f0e8dc] font-semibold">{PROFILE_INFO.subtitle}</span>
          <span className="block mt-1 text-[#c8bfb3]">{PROFILE_INFO.tagline}</span>
        </p>

        {/* Mobile Buttons */}
        <div
          className="hero-bounce-in flex items-center gap-3 flex-wrap mb-6"
          style={{ animationDelay: "0.26s" }}
        >
          <a
            href="#work"
            className="btn-primary text-xs py-2.5 px-6"
            onClick={(e) => {
              e.preventDefault();
              navigator.vibrate?.(30);
              lenis?.scrollTo("#work");
            }}
          >
            View Projects ↗
          </a>
          <a
            href="#contact"
            className="btn-outline text-xs py-2.5 px-6"
            onClick={(e) => {
              e.preventDefault();
              navigator.vibrate?.(30);
              lenis?.scrollTo("#contact");
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Mobile 2x2 Stats Grid */}
      <div
        className="hero-fade-in grid grid-cols-2 lg:hidden"
        style={{
          borderTop: "1px solid #222",
          borderBottom: "1px solid #222",
          animationDelay: "0.08s",
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{
            borderRight: "1px solid #222",
            borderBottom: "1px solid #222",
          }}
        >
          <span className="font-display text-2xl leading-none text-[#ff4500]">7.15</span>
          <span
            className="font-mono text-[0.52rem] tracking-widest uppercase text-[#7a746d]"
            style={{ lineHeight: 1.7 }}
          >
            CGPA
            <br />
            NIST Univ.
          </span>
        </div>

        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid #222" }}
        >
          <span className="font-display text-2xl leading-none text-[#f0e8dc]">8+</span>
          <span
            className="font-mono text-[0.52rem] tracking-widest uppercase text-[#7a746d]"
            style={{ lineHeight: 1.7 }}
          >
            Projects
            <br />
            Shipped
          </span>
        </div>

        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderRight: "1px solid #222" }}
        >
          <span className="font-display text-2xl leading-none text-[#f0e8dc]">9+</span>
          <span
            className="font-mono text-[0.52rem] tracking-widest uppercase text-[#7a746d]"
            style={{ lineHeight: 1.7 }}
          >
            Certifi-
            <br />
            cations
          </span>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span
            className="font-mono text-[0.52rem] tracking-widest uppercase text-emerald-400 font-semibold"
            style={{ lineHeight: 1.7 }}
          >
            Open to
            <br />
            Roles · 2026
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
