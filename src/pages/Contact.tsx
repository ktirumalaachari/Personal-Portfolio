import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Video, Info, CheckCircle2 } from "lucide-react";
import { MeetingModal } from "../components/MeetingModal";

const EMAILJS_SERVICE_ID = "service_x8mrf5l";
const EMAILJS_TEMPLATE_ID = "template_avr8nny";
const EMAILJS_PUBLIC_KEY = "NTYInAjWKUL5Tv3be";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingTab, setMeetingTab] = useState<"calendar" | "jitsi">("calendar");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(25);
    }
    setStatus("sending");

    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || formData.firstName || "Portfolio Visitor";

    const templateParams = {
      from_name: fullName,
      name: fullName,
      first_name: formData.firstName,
      last_name: formData.lastName,
      from_email: formData.email,
      email: formData.email,
      reply_to: formData.email,
      subject: formData.subject || `Portfolio Message from ${fullName}`,
      message: formData.message,
      to_name: "K Tirumala Achari",
      to_email: "ktirumalaachari@gmail.com",
    };

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: templateParams,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const errorText = await res.text().catch(() => "");
        console.error("EmailJS Error Response:", errorText);
        setStatus("error");
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  const openMeetingModal = (tab: "calendar" | "jitsi") => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(20);
    }
    setMeetingTab(tab);
    setIsMeetingModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <>
      <section className="min-h-screen w-full bg-[#0c0c0c] text-[#f0e8dc] font-sans px-4 md:px-8 lg:px-12 py-12 xs:py-16 md:py-20 lg:py-24 flex items-center justify-center relative overflow-y-visible border-t border-[rgba(240,232,220,0.1)]">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 max-w-[1400px] w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-between lg:h-full py-2 space-y-6">
            <motion.div variants={itemVariants} className="mb-4 lg:mb-0">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-left text-[#f0e8dc]">
                Contact <br />
                Me <span className="inline-block ml-2 text-[#ff4500]">→</span>
              </h1>
            </motion.div>

            {/* Meeting & Video Action Suite */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#ff4500] font-mono">
                Direct Scheduling & Video Call
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openMeetingModal("calendar")}
                  className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#ff4500] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#ff4500]/90 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,69,0,0.3)]"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Book 30-min Meeting</span>
                </button>

                <button
                  type="button"
                  onClick={() => openMeetingModal("jitsi")}
                  className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#141414] border border-[#ff4500]/40 text-[#f0e8dc] font-mono text-xs font-bold uppercase tracking-wider hover:border-[#ff4500] hover:text-[#ff4500] transition-all cursor-pointer shadow-md"
                >
                  <Video className="w-4 h-4 text-[#ff4500]" />
                  <span>Instant Video Call</span>
                </button>
              </div>

              {/* How Meetings Work Note */}
              <div className="p-3.5 rounded-xl bg-[#141414] border border-[rgba(240,232,220,0.12)] space-y-1.5 max-w-lg text-left text-xs font-sans">
                <div className="flex items-center gap-1.5 font-bold font-mono uppercase text-[11px] text-[#ff4500]">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Meeting & Video Call Guide:</span>
                </div>
                <p className="text-[#c8bfb3] text-[11px] leading-relaxed font-sans">
                  • <strong>Instant Video Call:</strong> Click Join Call → Enter your Name & First login (via Google/GitHub) when prompted by Jitsi to join the room.<br />
                  • <strong>30-Min Calendar Meeting:</strong> Pick any slot or custom time to send a meeting invite to Tirumala & receive an instant email copy.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Minimalist Underline Form */}
          <motion.div className="lg:col-span-5 flex flex-col justify-center" variants={itemVariants}>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-[#ff4500] font-mono">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John"
                    className="w-full bg-transparent border-b border-[rgba(240,232,220,0.15)] pb-2 text-sm text-[#f0e8dc] placeholder-[rgba(240,232,220,0.25)] focus:outline-none focus:border-[#ff4500] transition-colors rounded-none font-sans"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-[#ff4500] font-mono">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full bg-transparent border-b border-[rgba(240,232,220,0.15)] pb-2 text-sm text-[#f0e8dc] placeholder-[rgba(240,232,220,0.25)] focus:outline-none focus:border-[#ff4500] transition-colors rounded-none font-sans"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[#ff4500] font-mono">
                  Email Address 
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b border-[rgba(240,232,220,0.15)] pb-2 text-sm text-[#f0e8dc] placeholder-[rgba(240,232,220,0.25)] focus:outline-none focus:border-[#ff4500] transition-colors rounded-none font-sans"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-[#ff4500] font-mono">
                  Subject 
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry / Job Opportunity"
                  className="w-full bg-transparent border-b border-[rgba(240,232,220,0.15)] pb-2 text-sm text-[#f0e8dc] placeholder-[rgba(240,232,220,0.25)] focus:outline-none focus:border-[#ff4500] transition-colors rounded-none font-sans"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-[#ff4500] font-mono">
                  Message 
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full bg-transparent border-b border-[rgba(240,232,220,0.15)] pb-2 text-sm text-[#f0e8dc] placeholder-[rgba(240,232,220,0.25)] focus:outline-none focus:border-[#ff4500] transition-colors resize-none rounded-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-[#ff4500] text-black hover:bg-[#ff4500]/90 font-mono text-xs font-bold uppercase tracking-widest py-4 rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,69,0,0.35)] disabled:opacity-50 mt-2"
              >
                {status === "sending" ? (
                  <span>Sending Message...</span>
                ) : status === "success" ? (
                  <span className="flex items-center gap-2 text-black">
                    <CheckCircle2 className="w-4 h-4" /> Message Sent Successfully!
                  </span>
                ) : (
                  <span>Send Message →</span>
                )}
              </button>

              {status === "error" && (
                <p className="text-xs text-red-500 font-mono text-center">
                  Failed to send message. Please try emailing directly at ktirumalaachari@gmail.com
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>
      </section>

      {/* Meeting Booking & Video Call Modal */}
      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        initialTab={meetingTab}
      />
    </>
  );
};

export default Contact;
