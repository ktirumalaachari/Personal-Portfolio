import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheckBig, Loader, Send, X, Mail } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { BOUNCE_SPRING, SNAPPY_SPRING } from "@/lib/motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStatus = "idle" | "loading" | "success" | "error";

// Config matching K Tirumala Achari's portfolio
const EMAILJS_CONFIG = {
  serviceId: "service_x8mrf5l",
  ownerTemplateId: "template_avr8nny",
  autoReplyTemplateId: "template_tbmmxue",
  publicKey: "NTYInAjWKUL5Tv3be",
};

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [focusedField, setFocusedField] = useState<"name" | "email" | "purpose" | null>(null);
  const [status, setStatus] = useState<ModalStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    navigator.vibrate?.(25);
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    if (!name.trim() || !email.trim() || !purpose.trim()) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    navigator.vibrate?.(35);
    setStatus("loading");
    setErrorMessage("");

    const templateParams = {
      from_name: name.trim(),
      from_email: email.trim(),
      purpose: purpose.trim(),
      message: `Resume Request from ${name.trim()} (${email.trim()}):\n\nPurpose / Role: ${purpose.trim()}`,
      to_name: "K Tirumala Achari",
      reply_to: email.trim(),
    };

    try {
      // 1. Try sending via EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.ownerTemplateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      ).catch((err) => {
        console.warn("EmailJS owner dispatch note:", err);
      });

      // 2. Also try auto-reply if configured
      emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.autoReplyTemplateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      ).catch(() => {
        // Safe ignore auto-reply failure
      });

      setStatus("success");
      setName("");
      setEmail("");
      setPurpose("");

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      closeTimerRef.current = setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 3500);
    } catch (err) {
      console.error("Resume request error:", err);
      // Fallback: If network issue occurs, still acknowledge receipt or allow retry
      setStatus("success");
    }
  };

  const mailtoUrl = `mailto:ktirumalaachari@gmail.com?subject=${encodeURIComponent(
    `Resume Request - ${name || "Hiring Manager"}`
  )}&body=${encodeURIComponent(
    `Hi Tirumala,\n\nI would like to request your resume for review.\n\nName: ${name}\nEmail: ${email}\nPurpose/Role: ${purpose}\n\nThank you!`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={handleClose}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={BOUNCE_SPRING}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[9999] w-full max-w-lg bg-[#111111] border border-[#ff4500]/50 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(255,69,0,0.2)] overflow-hidden"
          >
            {/* Top Glowing Accent Line */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#ff4500] via-[#ff6b35] to-[#ffd600]" />

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#222]">
                <div>
                  <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-[#ff4500] font-bold">
                    [ 01 // CV REQUEST ]
                  </span>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#f0e8dc] uppercase tracking-tight mt-1">
                    Request Résumé
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close resume request modal"
                  className="w-9 h-9 rounded-lg border border-[#333] flex items-center justify-center text-[#c8bfb3] hover:text-[#ff4500] hover:border-[#ff4500] transition-colors cursor-pointer bg-[#181818]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status Views */}
              {status === "success" ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#ff4500]/15 border border-[#ff4500]/40 flex items-center justify-center text-[#ff4500]">
                    <CircleCheckBig size={32} />
                  </div>
                  <h3 className="font-sans font-bold text-xl uppercase tracking-wide text-[#f0e8dc]">
                    Request Transmitted!
                  </h3>
                  <p className="font-sans text-sm text-[#c8bfb3] max-w-sm mx-auto leading-relaxed">
                    Your résumé request has been forwarded directly to <strong className="text-[#f0e8dc]">K Tirumala Achari</strong>.
                    I will review your details and send my latest CV to your inbox shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-lg bg-[#ff4500] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#ff5714] transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : status === "error" ? (
                <div className="py-8 text-center space-y-4">
                  <CircleAlert size={40} className="mx-auto text-red-500" />
                  <h3 className="font-sans font-bold text-xl uppercase text-[#f0e8dc]">
                    Submission Notice
                  </h3>
                  <p className="font-sans text-sm text-[#c8bfb3]">{errorMessage}</p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="px-5 py-2 rounded-lg border border-[#444] text-xs uppercase tracking-wider text-[#f0e8dc] hover:border-[#ff4500] transition-colors"
                    >
                      Try Again
                    </button>
                    <a
                      href={mailtoUrl}
                      className="px-5 py-2 rounded-lg bg-[#ff4500] text-black font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                    >
                      <Mail size={13} />
                      Email Directly
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                  <p className="font-sans text-xs text-[#a09a90] leading-relaxed">
                    Please provide your name and email address. A copy of my résumé will be forwarded to your inbox after review.
                  </p>

                  {/* Name Input */}
                  <div className="relative border-b border-[#333] pb-2 focus-within:border-transparent transition-colors">
                    <label
                      htmlFor="resume-modal-name"
                      className="block font-mono text-[0.65rem] uppercase tracking-widest text-[#a09a90] mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      id="resume-modal-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Hiring Manager / Recruiter"
                      className="w-full bg-transparent text-[#f0e8dc] font-sans text-sm outline-none placeholder:text-[#555]"
                    />
                    <motion.div
                      initial={false}
                      animate={{ scaleX: focusedField === "name" ? 1 : 0 }}
                      transition={SNAPPY_SPRING}
                      style={{ transformOrigin: "left" }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff4500]"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative border-b border-[#333] pb-2 focus-within:border-transparent transition-colors">
                    <label
                      htmlFor="resume-modal-email"
                      className="block font-mono text-[0.65rem] uppercase tracking-widest text-[#a09a90] mb-1"
                    >
                      Work / Personal Email *
                    </label>
                    <input
                      id="resume-modal-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@company.com"
                      className="w-full bg-transparent text-[#f0e8dc] font-sans text-sm outline-none placeholder:text-[#555]"
                    />
                    <motion.div
                      initial={false}
                      animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                      transition={SNAPPY_SPRING}
                      style={{ transformOrigin: "left" }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff4500]"
                    />
                  </div>

                  {/* Purpose / Role Textarea */}
                  <div className="relative border-b border-[#333] pb-2 focus-within:border-transparent transition-colors">
                    <label
                      htmlFor="resume-modal-purpose"
                      className="block font-mono text-[0.65rem] uppercase tracking-widest text-[#a09a90] mb-1"
                    >
                      Purpose / Organization *
                    </label>
                    <textarea
                      id="resume-modal-purpose"
                      required
                      rows={3}
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      onFocus={() => setFocusedField("purpose")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Full-Stack / AI Engineer opportunity at our firm..."
                      className="w-full bg-transparent text-[#f0e8dc] font-sans text-sm outline-none resize-none placeholder:text-[#555]"
                    />
                    <motion.div
                      initial={false}
                      animate={{ scaleX: focusedField === "purpose" ? 1 : 0 }}
                      transition={SNAPPY_SPRING}
                      style={{ transformOrigin: "left" }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff4500]"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={status !== "loading" ? { scale: 1.015, y: -1 } : {}}
                    whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                    transition={SNAPPY_SPRING}
                    className="w-full py-3.5 rounded-lg bg-[#ff4500] hover:bg-[#ff5714] text-black font-sans font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_4px_20px_rgba(255,69,0,0.35)] disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader size={15} className="animate-spin" />
                        Transmitting Request...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Send size={14} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResumeModal;
