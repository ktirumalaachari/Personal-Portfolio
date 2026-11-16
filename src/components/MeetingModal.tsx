import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Video, Clock, Globe, Check, ArrowRight, ExternalLink, User, Mail, ShieldCheck, Copy, CheckCheck, ChevronLeft, ChevronRight } from "lucide-react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "calendar" | "jitsi";
}

const EMAILJS_SERVICE_ID = "service_x8mrf5l";
const EMAILJS_TEMPLATE_ID = "template_avr8nny";
const EMAILJS_PUBLIC_KEY = "NTYInAjWKUL5Tv3be";

const TIME_SLOTS = [
  // Morning
  "08:00 AM",
  "09:30 AM",
  "11:00 AM",
  // Afternoon
  "12:30 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  // Evening & Night
  "06:30 PM",
  "07:45 PM",
  "08:15 PM",
  "08:45 PM",
  "09:15 PM",
  "10:00 PM",
  "10:45 PM",
  "11:30 PM",
  // Late Night
  "12:15 AM",
  "01:00 AM",
  "02:00 AM"
];

const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MeetingModal: React.FC<MeetingModalProps> = ({
  isOpen,
  onClose,
  initialTab = "calendar"
}) => {
  const [activeTab, setActiveTab] = useState<"calendar" | "jitsi">(initialTab);
  const [viewDate, setViewDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [selectedTime, setSelectedTime] = useState<string>("11:30 PM");
  const [customTime, setCustomTime] = useState<string>("");
  const [customPeriod, setCustomPeriod] = useState<"AM" | "PM">("PM");
  const [is24HourFormat, setIs24HourFormat] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "booking" | "confirmed">("idle");
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [jitsiRoomName, setJitsiRoomName] = useState<string>("");
  const [confirmedMeetUrl, setConfirmedMeetUrl] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [isRoomCopied, setIsRoomCopied] = useState(false);

  const jitsiEmbedFlags = `#config.prejoinPageEnabled=false&config.enableLobby=false&config.requireDisplayName=false&config.startWithAudioMuted=true&config.disableModeratorIndicator=true&interfaceConfig.MOBILE_APP_PROMO=false&config.deepLinking.enabled=false`;

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setBookingStatus("idle");
      const now = new Date();
      setViewDate(now);
      setSelectedDate(now);
      const uniqueRoom = `TiruMeeting_${Math.floor(100000 + Math.random() * 900000)}_${Date.now().toString().slice(-4)}`;
      setJitsiRoomName(uniqueRoom);
    }
  }, [isOpen, initialTab]);

  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const currentMonthName = MONTH_NAMES[currentMonth];

  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const selectedDay = selectedDate.getDate();
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();
  const selectedMonthName = MONTH_NAMES[selectedMonth];
  const formattedSelectedDate = `${selectedMonthName} ${selectedDay}, ${selectedYear}`;

  const formatTimeSlot = (timeStr: string) => {
    if (!is24HourFormat) return timeStr;
    const parts = timeStr.split(" ");
    if (parts.length < 2) return timeStr;
    const [time, modifier] = parts;
    const [hours, minutes] = time.split(":");
    let h = parseInt(hours, 10);
    if (modifier === "PM" && h < 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${minutes}`;
  };

  const finalTimeDisplay = customTime.trim() 
    ? `${customTime.trim()} ${customPeriod}` 
    : formatTimeSlot(selectedTime);

  const handleBookSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(25);
    }
    setBookingStatus("booking");

    const effectiveTime = finalTimeDisplay;
    const cleanTime = effectiveTime.replace(/[^a-zA-Z0-9]/g, "");
    const generatedRoom = `TiruMeeting_${selectedMonthName}${selectedDay}_${cleanTime}_${Math.floor(1000 + Math.random() * 9000)}`;
    const meetUrl = `https://meet.jit.si/${generatedRoom}${jitsiEmbedFlags}`;
    setConfirmedMeetUrl(meetUrl);

    // 1. Send Host Notification to K Tirumala Achari (ktirumalaachari@gmail.com)
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            first_name: attendeeName,
            last_name: "(Scheduled Meeting)",
            email: attendeeEmail,
            to_email: "ktirumalaachari@gmail.com",
            subject: `📅 New 30-Min Meeting Booking: ${formattedSelectedDate} at ${effectiveTime}`,
            message: `A visitor picked a time slot to meet you!\n\nAttendee Name: ${attendeeName}\nAttendee Email: ${attendeeEmail}\nRequested Date & Time: ${formattedSelectedDate} at ${effectiveTime}\n\nDirect Meeting Room Link: ${meetUrl}`,
          },
        }),
      });
    } catch (err) {
      console.warn("EmailJS host meeting notification error:", err);
    }

    // 2. Send Confirmation Email to Visitor/Attendee
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            first_name: attendeeName,
            last_name: "(Meeting Confirmed)",
            email: attendeeEmail,
            to_email: attendeeEmail,
            user_email: attendeeEmail,
            subject: `✅ Meeting Confirmed with K Tirumala Achari: ${formattedSelectedDate} at ${effectiveTime}`,
            message: `Hi ${attendeeName},\n\nYour 30-minute consultation with K Tirumala Achari is confirmed for ${formattedSelectedDate} at ${effectiveTime}.\n\nJoin Meeting Room Link: ${meetUrl}\n\nThank you!`,
          },
        }),
      });
    } catch (err) {
      console.warn("EmailJS attendee confirmation email error:", err);
    }

    setBookingStatus("confirmed");
  };

  const handleCopyLink = () => {
    if (confirmedMeetUrl) {
      navigator.clipboard.writeText(confirmedMeetUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleCopyRoomLink = () => {
    const fullRoomUrl = `https://meet.jit.si/${jitsiRoomName}${jitsiEmbedFlags}`;
    navigator.clipboard.writeText(fullRoomUrl);
    setIsRoomCopied(true);
    setTimeout(() => setIsRoomCopied(false), 2000);
  };

  const fullJitsiUrl = `https://meet.jit.si/${jitsiRoomName}${jitsiEmbedFlags}`;

  const handleJoinInstantCall = () => {
    try {
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            first_name: "Instant Visitor",
            last_name: "(Live Video Call)",
            email: "instant-call@portfolio.dev",
            to_email: "ktirumalaachari@gmail.com",
            subject: `🚨 Instant Video Call Alert: Visitor Waiting in Room!`,
            message: `A visitor just clicked to start an Instant 1-on-1 Video Call with you from your live portfolio!\n\nRoom ID: ${jitsiRoomName}\n\nDirect Live Meeting Join Link:\n${fullJitsiUrl}\n\nPlease click the link above immediately to enter the video room and meet your visitor!`,
          },
        }),
      });
    } catch (err) {
      console.warn("EmailJS instant call notification error:", err);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          data-lenis-prevent
          className="fixed inset-0 z-[999999] flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto menu-overlay-scroller pt-28 sm:pt-24 pb-28 sm:pb-20"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="relative z-10 w-full max-w-4xl max-h-[75vh] sm:max-h-[85vh] bg-[#0c0c0c] border border-[rgba(240,232,220,0.15)] rounded-2xl sm:rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] text-[#f0e8dc] font-sans flex flex-col overflow-hidden my-auto shrink-0"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-4 border-b border-[rgba(240,232,220,0.1)] bg-[#141414] shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#ff4500]/40 bg-black p-[1.5px] overflow-hidden flex items-center justify-center shrink-0">
                  <img src="/favicon.png" alt="Tirumala Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-base text-[#f0e8dc] tracking-wide font-mono truncate">
                    Schedule Tirumala
                  </h3>
                  <p className="text-[9px] sm:text-xs text-[#c8bfb3] font-mono truncate">30-Min Strategy Call & Video Consultation</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 text-[#c8bfb3] hover:text-[#ff4500] hover:bg-white/10 rounded-full transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Responsive Tab Switcher */}
            <div className="flex border-b border-[rgba(240,232,220,0.1)] bg-[#0c0c0c] px-1.5 sm:px-6 pt-1 gap-1 sm:gap-3 shrink-0">
              <button
                onClick={() => setActiveTab("calendar")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-t-xl text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-wider font-bold transition-all border-t border-x cursor-pointer ${
                  activeTab === "calendar"
                    ? "bg-[#141414] text-[#ff4500] border-[#ff4500]/40 border-b-transparent"
                    : "bg-transparent text-[#c8bfb3] border-transparent hover:text-[#ff4500]"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Calendar Booking</span>
              </button>

              <button
                onClick={() => setActiveTab("jitsi")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-t-xl text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-wider font-bold transition-all border-t border-x cursor-pointer ${
                  activeTab === "jitsi"
                    ? "bg-[#141414] text-[#ff4500] border-[#ff4500]/40 border-b-transparent"
                    : "bg-transparent text-[#c8bfb3] border-transparent hover:text-[#ff4500]"
                }`}
              >
                <Video className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Instant Video Call</span>
              </button>
            </div>

            {/* Tab 1: Cal.com Style Calendar Booking */}
            {activeTab === "calendar" && (
              <div className="p-3.5 sm:p-6 md:p-8 bg-[#141414] overflow-y-auto flex-1 menu-overlay-scroller space-y-4">
                {bookingStatus === "confirmed" ? (
                  <div className="py-4 sm:py-8 flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#ff4500] text-black flex items-center justify-center shadow-lg">
                      <Check className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3]" />
                    </div>
                    <h2 className="text-base sm:text-2xl font-bold font-mono uppercase text-[#f0e8dc]">Meeting Scheduled!</h2>
                    <p className="text-xs sm:text-sm text-[#c8bfb3] leading-relaxed font-sans">
                      Your 30-min session with **K Tirumala Achari** is confirmed for **{formattedSelectedDate} at {finalTimeDisplay}**.
                    </p>

                    {/* Meeting Link Box */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/15 font-mono text-xs text-[#f0e8dc] w-full text-left space-y-3 shadow-inner">
                      <div className="flex items-center gap-2 text-[#f0e8dc] font-bold border-b border-white/10 pb-2">
                        <Video className="w-4 h-4 text-[#ff4500] shrink-0" />
                        <span>Generated Video Call Link:</span>
                      </div>

                      <div className="flex items-center justify-between gap-2 bg-black/60 p-2 sm:p-2.5 rounded-lg border border-[rgba(240,232,220,0.15)]">
                        <span className="text-[10px] sm:text-[11px] text-[#ffd600] font-mono truncate">{confirmedMeetUrl}</span>
                        <button
                          onClick={handleCopyLink}
                          className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded bg-[#ff4500] text-black font-bold uppercase hover:bg-[#ff4500]/80 transition-all cursor-pointer shrink-0"
                        >
                          {isCopied ? <CheckCheck className="w-3 h-3 text-black" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? "Copied" : "Copy Link"}</span>
                        </button>
                      </div>

                      <div className="space-y-1 text-[10px] sm:text-[11px] text-[#c8bfb3] pt-1">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#ff4500] shrink-0" />
                          <span className="truncate">Attendee: {attendeeName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#ff4500] shrink-0" />
                          <span className="truncate">Email: {attendeeEmail} (Confirmation Emailed)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full pt-2">
                      <a
                        href={confirmedMeetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#ff4500] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#ff4500]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,69,0,0.35)]"
                      >
                        <span>Join Meeting Room Now</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 text-[#f0e8dc] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/20 border border-[rgba(240,232,220,0.15)] transition-all cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-3 border-b lg:border-b-0 lg:border-r border-white/10 pb-3 lg:pb-0 lg:pr-6">
                      <div className="flex items-center gap-2.5">
                        <img src="/me.jpg" alt="K Tirumala Achari" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-white/30 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm truncate">K Tirumala Achari</h4>
                          <p className="text-[10px] sm:text-xs text-white/50 font-mono truncate">Full-Stack & AI Engineer</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 font-mono text-[10px] sm:text-xs">
                        <div className="flex items-center gap-2 text-white/90">
                          <Clock className="w-3.5 h-3.5 text-white/60 shrink-0" />
                          <span>30 Min Meeting</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <Video className="w-3.5 h-3.5 text-white/60 shrink-0" />
                          <span>Video Call Room</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <Globe className="w-3.5 h-3.5 text-white/60 shrink-0" />
                          <span>Asia/Kolkata (IST)</span>
                        </div>
                      </div>

                      <p className="text-[10px] sm:text-xs text-white/60 leading-relaxed font-sans hidden sm:block">
                        Book a 1-on-1 consultation to discuss custom RAG pipelines, agentic AI workflows, full-stack SaaS builds, or internship opportunities.
                      </p>
                    </div>

                    {/* Calendar & Time Selector */}
                    <div className="lg:col-span-8 space-y-4">
                      {bookingStatus === "booking" ? (
                        <div className="py-10 flex flex-col items-center justify-center">
                          <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin mb-3" />
                          <p className="font-mono text-xs uppercase tracking-widest text-white/70">Generating Video Room & Emailing Details...</p>
                        </div>
                      ) : (
                        <form onSubmit={handleBookSlot} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
                            {/* Dynamic Calendar Grid */}
                            <div className="bg-black/60 p-2.5 sm:p-3.5 rounded-2xl border border-white/10">
                              <div className="flex items-center justify-between mb-2.5 px-1 font-mono text-xs font-bold">
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={handlePrevMonth}
                                    aria-label="Previous Month"
                                    className="p-1 rounded hover:bg-white/10 text-[#c8bfb3] hover:text-[#ff4500] transition-colors cursor-pointer"
                                  >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-[#f0e8dc] text-[11px] sm:text-xs font-bold min-w-[95px] text-center">
                                    {currentMonthName} {currentYear}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={handleNextMonth}
                                    aria-label="Next Month"
                                    className="p-1 rounded hover:bg-white/10 text-[#c8bfb3] hover:text-[#ff4500] transition-colors cursor-pointer"
                                  >
                                    <ChevronRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setIs24HourFormat(!is24HourFormat)}
                                  className="text-white/60 hover:text-white text-[9px] px-2 py-0.5 rounded bg-white/10 border border-white/20 transition-all cursor-pointer"
                                >
                                  {is24HourFormat ? "24h Format" : "12h Format"}
                                </button>
                              </div>

                              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-white/40 mb-1.5">
                                {DAYS_OF_WEEK.map((day) => (
                                  <span key={day}>{day}</span>
                                ))}
                              </div>

                              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px]">
                                {[...Array(firstDayOfWeek)].map((_, i) => (
                                  <span key={`empty-${i}`} />
                                ))}

                                {[...Array(daysInCurrentMonth)].map((_, i) => {
                                  const dayNum = i + 1;
                                  const isSelected =
                                    selectedDay === dayNum &&
                                    selectedMonth === currentMonth &&
                                    selectedYear === currentYear;
                                  const today = new Date();
                                  const isToday =
                                    today.getDate() === dayNum &&
                                    today.getMonth() === currentMonth &&
                                    today.getFullYear() === currentYear;

                                  return (
                                    <button
                                      key={dayNum}
                                      type="button"
                                      onClick={() => setSelectedDate(new Date(currentYear, currentMonth, dayNum))}
                                      className={`h-7 sm:h-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs transition-all cursor-pointer ${
                                        isSelected
                                          ? "bg-[#ff4500] text-black font-bold shadow-md shadow-[#ff4500]/30"
                                          : isToday
                                          ? "border border-[#ff4500]/70 text-[#ff4500] hover:bg-white/10 font-semibold"
                                          : "hover:bg-white/10 text-[#c8bfb3]"
                                      }`}
                                    >
                                      {dayNum}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Time Slots & Custom Selector */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#ff4500] uppercase tracking-wider">
                                <span>Slots — {selectedMonthName} {selectedDay}</span>
                                <span className="text-[9px] text-[#7a746d]">24-Hr</span>
                              </div>

                              <div className="grid grid-cols-1 gap-1.5 max-h-[130px] sm:max-h-[160px] overflow-y-auto pr-1 menu-overlay-scroller">
                                {TIME_SLOTS.map((slot) => {
                                  const isSelected = selectedTime === slot && !customTime.trim();
                                  return (
                                    <button
                                      key={slot}
                                      type="button"
                                      onClick={() => {
                                        setSelectedTime(slot);
                                        setCustomTime("");
                                      }}
                                      className={`w-full py-1.5 px-3 rounded-xl font-mono text-xs transition-all border text-center cursor-pointer ${
                                        isSelected
                                          ? "bg-[#ff4500] text-black font-bold border-[#ff4500] shadow-md shadow-[#ff4500]/30"
                                          : "bg-black/40 border-[rgba(240,232,220,0.1)] text-[#c8bfb3] hover:border-[#ff4500]/50"
                                      }`}
                                    >
                                      {formatTimeSlot(slot)}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Enhanced Custom Time + AM/PM Selector */}
                              <div className="pt-1 space-y-1">
                                <span className="text-[9px] font-mono uppercase text-[#7a746d] block">Custom Time Selector:</span>
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="text"
                                    placeholder="e.g. 10:30"
                                    value={customTime}
                                    onChange={(e) => setCustomTime(e.target.value)}
                                    className="flex-1 bg-black/60 border border-[rgba(240,232,220,0.15)] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#f0e8dc] placeholder:text-[#7a746d] focus:outline-none focus:border-[#ff4500] font-mono"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setCustomPeriod(customPeriod === "AM" ? "PM" : "AM")}
                                    className="px-3 py-2 rounded-xl bg-[#ff4500]/10 border border-[#ff4500]/40 text-[#ff4500] font-mono text-xs font-bold uppercase hover:bg-[#ff4500] hover:text-black transition-all cursor-pointer shrink-0"
                                  >
                                    {customPeriod}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Increased Height & Font Size Attendee Inputs */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[rgba(240,232,220,0.1)] pt-3">
                            <input
                              type="text"
                              placeholder="Your Name *"
                              value={attendeeName}
                              onChange={(e) => setAttendeeName(e.target.value)}
                              className="bg-black/60 border border-[rgba(240,232,220,0.15)] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#f0e8dc] placeholder:text-[#7a746d] focus:outline-none focus:border-[#ff4500] transition-colors"
                              required
                            />
                            <input
                              type="email"
                              placeholder="Your Email *"
                              value={attendeeEmail}
                              onChange={(e) => setAttendeeEmail(e.target.value)}
                              className="bg-black/60 border border-[rgba(240,232,220,0.15)] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#f0e8dc] placeholder:text-[#7a746d] focus:outline-none focus:border-[#ff4500] transition-colors"
                              required
                            />
                          </div>

                          {/* Fully Responsive Auto-Wrapping Submit Button */}
                          <button
                            type="submit"
                            className="w-full min-h-[46px] py-3 px-4 rounded-xl bg-[#ff4500] text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#ff4500]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,69,0,0.35)] text-center leading-snug break-words"
                          >
                            <span>Confirm 30-Min Meeting ({finalTimeDisplay})</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Instant Video Call (No Auto Email Spam) */}
            {activeTab === "jitsi" && (
              <div className="p-3 sm:p-6 md:p-8 bg-[#141414] overflow-y-auto flex-1 menu-overlay-scroller space-y-3">
                <div className="space-y-3 py-2 text-center max-w-xl mx-auto">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#ff4500]/40 bg-black flex items-center justify-center mx-auto shadow-md shrink-0">
                    <Video className="w-6 h-6 sm:w-7 sm:h-7 text-[#ff4500]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-xl font-bold font-mono uppercase text-[#f0e8dc]">Instant 1-on-1 Video Room</h3>
                    <p className="text-[11px] sm:text-xs text-[#c8bfb3] leading-relaxed font-sans max-w-md mx-auto">
                      Zero-setup, 100% free WebRTC video call. Click join below to start the HD video session immediately!
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/60 border border-[rgba(240,232,220,0.1)] space-y-1.5 text-left font-mono text-[10px] sm:text-xs">
                    <div className="flex items-center justify-between text-[#c8bfb3]">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 shrink-0 text-[#ff4500]" />
                        Room Link:
                      </span>
                      <span className="text-[#ffd600] font-bold truncate max-w-[200px] sm:max-w-[280px]">{fullJitsiUrl}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#c8bfb3]">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#ff4500]" />
                        Access Mode:
                      </span>
                      <span className="text-[#ff4500] font-bold">Direct Web Call</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1.5">
                    <a
                      href={fullJitsiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleJoinInstantCall}
                      className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl bg-[#ff4500] text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#ff4500]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,69,0,0.35)]"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Instant Video Call ↗</span>
                    </a>

                    <button
                      onClick={handleCopyRoomLink}
                      className="w-full sm:w-auto px-4 py-3 sm:py-3.5 rounded-xl bg-white/10 text-[#f0e8dc] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white/20 border border-[rgba(240,232,220,0.15)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isRoomCopied ? <CheckCheck className="w-4 h-4 text-[#ff4500]" /> : <Copy className="w-4 h-4" />}
                      <span>{isRoomCopied ? "Link Copied" : "Copy Share Link"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
