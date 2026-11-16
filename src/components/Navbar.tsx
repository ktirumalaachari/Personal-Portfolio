import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { NAV_ITEMS } from "@/data/navigation";
import { ResumeModal } from "./ResumeModal";

export const Navbar: React.FC = () => {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenResume = () => setResumeModalOpen(true);
    window.addEventListener("open-resume-modal", handleOpenResume);
    return () => window.removeEventListener("open-resume-modal", handleOpenResume);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const sectionIds = ["home", ...NAV_ITEMS.map((item) => item.id)];

    const syncScrollState = () => {
      rafId = 0;
      const y = window.scrollY;
      setScrolled(y > 30);
      if (y < 80) {
        setActiveSection("home");
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(syncScrollState);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0,
      }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    syncScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, haptic = 20) => {
    e.preventDefault();
    navigator.vibrate?.(haptic);
    setMobileMenuOpen(false);

    if (id === "home" || id === "top") {
      lenis?.scrollTo(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.getElementById(id);
      if (target) {
        lenis?.scrollTo(target);
      } else {
        lenis?.scrollTo(`#${id}`);
      }
    }
  };

  const navLinkClass = (id: string) =>
    `font-cond text-xs font-bold tracking-[0.22em] uppercase transition-colors hover-line py-1 cursor-pointer select-none ${
      activeSection === id
        ? "text-[#ff4500] hover-line-active"
        : "text-[#7a746d] hover:text-[#f0e8dc]"
    }`;

  return (
    <>
      <header
        className={`hero-nav-in fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0c0c0c]/92 backdrop-blur-md border-b border-[#222]" : "bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-12 h-14 flex items-center justify-between">
          {/* Left Element: Mobile Menu Toggle on mobile, Nav Links on desktop */}
          <div className="flex items-center">
            {/* Mobile Navigation Button (LEFT) */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => {
                navigator.vibrate?.(30);
                setMobileMenuOpen((prev) => !prev);
              }}
              className="md:hidden text-[#c8bfb3] hover:text-[#ff4500] transition-colors p-2 -ml-2 cursor-pointer flex items-center justify-center focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-[#ff4500]" />
              ) : (
                <Menu size={24} />
              )}
            </motion.button>

            {/* Desktop Navigation Links (LEFT) */}
            <nav className="hidden md:flex items-center gap-9" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id, item.haptic)}
                  className={navLinkClass(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Element: Résumé ↗ Button (RIGHT on BOTH mobile and desktop) */}
          <div className="flex items-center ml-auto">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={() => {
                navigator.vibrate?.(30);
                setResumeModalOpen(true);
              }}
              className="btn-outline text-[11px] md:text-xs py-1.5 md:py-2 px-3.5 md:px-6 font-bold tracking-[0.14em] md:tracking-[0.16em] cursor-pointer"
            >
              RÉSUMÉ ↗
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed inset-0 z-40 bg-[#0c0c0c] flex flex-col pt-16 px-6"
          >
            <div className="h-px bg-[#222]" />
            <nav className="flex flex-col pt-8 gap-0" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -28, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 22,
                    delay: idx * 0.045,
                  }}
                  onClick={(e) => handleNavClick(e, item.id, item.haptic)}
                  className="font-display text-4xl sm:text-5xl uppercase text-[#f0e8dc] hover:text-[#ff4500] transition-colors py-4 border-b border-[#222]"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto pb-10">
              <button
                type="button"
                onClick={() => {
                  navigator.vibrate?.(35);
                  setMobileMenuOpen(false);
                  setResumeModalOpen(true);
                }}
                className="btn-primary text-xs w-full justify-center text-center block py-3.5 cursor-pointer"
              >
                RÉSUMÉ ↗
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume / CV Request Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
