import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RefreshCw, Terminal, Mail, GraduationCap, Code2, Cpu, ExternalLink, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  isInstant?: boolean;
}

// 8.50

// Fixed Instant FAQ Dictionary (0ms API latency, complete structured info)
const FAQ_DATABASE: Record<string, string> = {
  email: "Official Contact Email:\n**ktirumalaachari@gmail.com**\n\nYou can reach out directly via email or use the Contact form at the bottom of the page.",
  mail: "Official Contact Email:\n**ktirumalaachari@gmail.com**",
  contact: "Connect with @tiru (K Tirumala Achari):\n- Email: **ktirumalaachari@gmail.com**\n- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/k-tirumala-achari-921106307/)\n- GitHub: [GitHub Profile](https://github.com/ktirumalaachari)\n- Twitter: [Twitter / X](https://x.com/TiruAchari)\n- Website: [Personal Portfolio](https://www.ktirumalaachari.me)",
  study: "@tiru's Academic Background:\n- Institution: **NIST University, Berhampur, Odisha**\n- Degree: **B.Tech in Computer Science & Engineering (2022–2026)**\n- CGPA: **7.15 / 10**\n- Diploma: **SMIT Ankushpur, Berhampur (8.50 CGPA)**",
  college: "@tiru's Academic Background:\n- Institution: **NIST University, Berhampur, Odisha**\n- Degree: **B.Tech in Computer Science & Engineering (2022–2026)**\n- CGPA: **7.15 / 10**",
  university: "@tiru's Academic Background:\n- Institution: **NIST University, Berhampur, Odisha**\n- Degree: **B.Tech in Computer Science & Engineering (2022–2026)**\n- Performance: **7.15 CGPA**",
  nist: "@tiru's Academic Background:\n- Institution: **NIST University, Berhampur, Odisha**\n- Degree: **B.Tech in CSE (2022–2026)**\n- Performance: **7.15 CGPA**",
  cgpa: "@tiru maintains a solid academic standing of **7.15 CGPA** at NIST University, Berhampur, and previously **8.50 CGPA** in Diploma CSE at SMIT Ankushpur.",
  gpa: "@tiru maintains a solid academic standing of **7.15 CGPA** at NIST University, Berhampur.",
  stack: "@tiru's Core Engineering Stack:\n\n- Languages: **Java, Python, TypeScript, JavaScript, SQL**\n- Frontend: **React 19, Next.js 16, Tailwind CSS v4, Framer Motion, TanStack Query**\n- Backend & APIs: **Node.js, Express, FastAPI, REST APIs, Socket.IO, JWT**\n- Databases: **MongoDB, PostgreSQL, Prisma, Supabase, Redis**\n- AI & GenAI: **Google Gemini 2.5, Groq LLaMA-3.3, LangChain, LangGraph, RAG, Zod**\n- Cloud & DevOps: **Docker, Git, GitHub, Vercel, Render, Postman**",
  skills: "@tiru's Specialized Engineering Domains:\n\n1. **Full-Stack SaaS & PWAs**: Production-grade applications with offline Service Worker support and payment gateways.\n2. **Generative AI & Agentic Workflows**: Multi-tenant AI Copilots with Groq LLaMA-3.3, Gemini 2.5 Flash, and Zod schemas.\n3. **Real-Time Distributed Backends**: High-throughput Socket.IO tracking, FastAPI microservices, and Prisma PostgreSQL.\n4. **Performance & Heuristics**: Automated resume ATS scoring and Python code execution scrubbing.",
  projects: "@tiru's Featured Production Projects:\n\n1. **Enterprise AI CRM** — Multi-Tenant Sales Intelligence Platform\nStack: React 18 / TS / Node.js / MongoDB / Groq LLaMA-3.3 / Razorpay\nLinks: [Live Demo](https://enterprise-ai-crm-platform.onrender.com) | [GitHub](https://github.com/ktirumalaachari/Enterprise-AI-CRM-Platform)\n\n2. **Developer Command Center** — Engineering Productivity SaaS\nStack: React 18 / TS / Express / Prisma / PostgreSQL / Gemini / Socket.IO\nLinks: [Live Demo](https://developercommandcenter.vercel.app) | [GitHub](https://github.com/ktirumalaachari/Developer-Command-Center)\n\n3. **Food Flow** — Multi-Vendor Delivery PWA & AI Studio\nStack: Next.js 16 / React 19 / MongoDB / Socket.IO / Leaflet / Gemini AI\nLinks: [Live Demo](https://foodflow-phi-mauve.vercel.app) | [GitHub](https://github.com/ktirumalaachari/Food-Flow-Food-Delivery-Platform)\n\n4. **AI Resume Checker** — Heuristic ATS Optimizer\nStack: React 19 / Vite / Express / MongoDB / Gemini 2.5 Flash / Zod\nLinks: [Live Demo](https://ai-resume-checker-ats-optimizer.vercel.app) | [GitHub](https://github.com/ktirumalaachari/AI-Resume-Checker-ATS-Optimizer)\n\n5. **CodeFlow AI** — Python Execution Visualizer & AI Tutor\nStack: Next.js 15 / FastAPI / Monaco / Gemini / Framer Motion\nLinks: [Live Demo](https://codeflow-ai-mu.vercel.app) | [GitHub](https://github.com/ktirumalaachari/CodeFlow-AI)\n\n6. **WayPoint** — Career Readiness & Roadmap Generator\nStack: React 18 / FastAPI / Supabase / Groq AI / Framer Motion\nLinks: [Live Demo](https://way-point-beryl.vercel.app) | [GitHub](https://github.com/ktirumalaachari/WayPoint)\n\n7. **Credit Card Fraud Detection** — Ensemble ML PWA (99.96% Accuracy)\nStack: Python / Flask / XGBoost / LightGBM / CatBoost / MongoDB\nLinks: [Live Demo](https://fraud-detection-sjkm.onrender.com) | [GitHub](https://github.com/ktirumalaachari/Credit-Card-Fraud-Detection-Using-Machine-Learning)\n\n8. **Personal Portfolio** — SSR Developer Portfolio\nStack: React 19 / TanStack Start / Nitro SSR / Tailwind v4\nLinks: [Live Demo](https://ktirumala.vercel.app) | [GitHub](https://github.com/ktirumalaachari/Personal-Portfolio)",
  crm: "**Enterprise AI CRM** — Multi-Tenant AI Sales Intelligence Platform\n\n- Overview: Features workspace isolation, Kanban deal pipelines, BANT lead qualification, 4-tier RBAC, Groq LLaMA-3.3 AI Copilot, JWT/OAuth, and Razorpay subscriptions.\n- Links: [Live Demo](https://enterprise-ai-crm-platform.onrender.com) | [GitHub](https://github.com/ktirumalaachari/Enterprise-AI-CRM-Platform)",
  foodflow: "**Food Flow** — Multi-Vendor Delivery PWA & AI Concierge\n\n- Overview: Swiggy-inspired PWA with offline Service Worker, live Leaflet GPS rider tracking, Razorpay checkout, and Gemini 2.5 AI Food Studio.\n- Links: [Live Demo](https://foodflow-phi-mauve.vercel.app) | [GitHub](https://github.com/ktirumalaachari/Food-Flow-Food-Delivery-Platform)",
  fraud: "**Credit Card Fraud Detection** — Ensemble ML Classifier\n\n- Overview: 99.96% accuracy using a Hybrid ensemble with XGBoost, LightGBM, and CatBoost across 29 features with an installable PWA dashboard.\n- Links: [Live Demo](https://fraud-detection-sjkm.onrender.com) | [GitHub](https://github.com/ktirumalaachari/Credit-Card-Fraud-Detection-Using-Machine-Learning)",
  certificates: "@tiru holds **9 verified professional credentials**, including:\n\n- **Claude Certified Architect** by Anthropic\n- **Oracle Cloud Infrastructure 2025 Associate** by Oracle\n- **Gen AI and AI Agents** by CynoHub Academy\n- **Delta Full Stack Web Development** by Apna College\n- **Alpha DSA with Java** by Apna College\n- **MERN Fullstack Web Development** by NIST University\n- **Data Science Using Python** by NIST University\n- **Scaling with Google Cloud Operations** by Google Cloud × Simplilearn\n- **JavaScript Algorithms & Data Structures (300h)** by freeCodeCamp",
  certificate: "@tiru holds **9 verified professional credentials**, including Anthropic Claude Certified Architect, Oracle Cloud Infrastructure 2025 Associate, and CynoHub Gen AI & AI Agents.",
  resume: "You can request @tiru's resume using the **RÉSUMÉ ↗** button in the navigation bar to submit a CV request, or contact him directly via email at **ktirumalaachari@gmail.com**.",
};

const SUGGESTION_ITEMS = [
  { icon: Mail, label: "Email & Contact", query: "What is @tiru's email?" },
  { icon: GraduationCap, label: "NIST University", query: "Where does @tiru study?" },
  { icon: Code2, label: "Shipped Projects", query: "What are @tiru's top projects?" },
  { icon: Cpu, label: "Tech Stack", query: "What is @tiru's tech stack?" },
  { icon: Terminal, label: "AI Architecture", query: "Explain @tiru's AI architecture" },
];

// Ephemeral DOM Scraper & Mini-Retriever
function scrapePortfolioDOM(): { id: string; content: string }[] {
  const elements = document.querySelectorAll("[data-ai], section, #about, #work, #what-i-do, #philosophy, #credentials, #contact");
  const docs: { id: string; content: string }[] = [];

  elements.forEach((el, index) => {
    const aiId = (el as HTMLElement).dataset?.ai || el.id || `section-${index}`;
    const text = (el as HTMLElement).innerText || "";
    if (text.trim().length > 20) {
      const cleanText = text.replace(/\s+/g, " ").trim();
      docs.push({ id: aiId, content: cleanText });
    }
  });

  if (docs.length === 0) {
    docs.push({
      id: "summary",
      content: "@tiru (K Tirumala Achari) is a Full-Stack & AI Engineer studying at NIST University, Berhampur (7.15 CGPA). Core Stack: Java, Python, React 19, Next.js, TypeScript, Node.js, Express, MongoDB, FastAPI, Groq AI, Gemini AI, Docker, Redis. Shipped 8 production projects: Enterprise AI CRM, Developer Command Center, Food Flow, AI Resume Checker, CodeFlow AI, WayPoint, Credit Card Fraud Detection, and Personal Portfolio. Holds 9 verified certifications including Claude Certified Architect by Anthropic and OCI 2025 Associate."
    });
  }

  return docs;
}

function retrieveTopChunks(query: string, docs: { id: string; content: string }[], topK = 3): string {
  const queryWords = query.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").filter(w => w.length > 2);
  if (queryWords.length === 0) return docs.slice(0, topK).map(d => d.content).join("\n\n");

  const scoredDocs = docs.map(doc => {
    const textLower = doc.content.toLowerCase();
    let score = 0;
    queryWords.forEach(word => {
      if (textLower.includes(word)) {
        const occurrences = (textLower.match(new RegExp(word, "g")) || []).length;
        score += occurrences + 1;
      }
    });
    return { ...doc, score };
  });

  scoredDocs.sort((a, b) => b.score - a.score);
  return scoredDocs.slice(0, topK).map(d => `[Section: ${d.id}]\n${d.content}`).join("\n\n");
}

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Welcome. I am **@tiru-assistant**.\n\nAsk about @tiru's (K Tirumala Achari) **architecture, projects, engineering stack, credentials, or contact details**.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isInstant: true,
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    // Step 1: Check instant FAQ lookup
    const lowerQuery = query.toLowerCase();
    let matchedFaqKey: string | null = null;

    for (const key of Object.keys(FAQ_DATABASE)) {
      if (lowerQuery.includes(key)) {
        matchedFaqKey = key;
        break;
      }
    }

    if (matchedFaqKey && FAQ_DATABASE[matchedFaqKey]) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: FAQ_DATABASE[matchedFaqKey!],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isInstant: true,
          }
        ]);
        setIsLoading(false);
      }, 100);
      return;
    }

    // Step 2: Ephemeral DOM RAG + Mistral API Call
    try {
      const docs = scrapePortfolioDOM();
      const context = retrieveTopChunks(query, docs, 4);

      const systemPrompt = `You are @tiru-assistant. Respond in a clear, professional, well-structured, and complete editorial format based on the portfolio context below.

PORTFOLIO CONTEXT:
${context}

RULES:
- Always speak in third-person referring to @tiru or K Tirumala Achari (e.g. "@tiru's projects", "@tiru specializes in..."). Never use "I" or "my".
- Provide complete, rich, structured responses with clear line breaks (\\n) and bullet points. Never cut off details half-way.
- Include live links in markdown format [Label](url) when mentioning @tiru's projects.
- Bold key technologies and names using markdown format (**tech**, **project**).
- For contact, provide ktirumalaachari@gmail.com.`;

      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YY3M8ETLoB4kjCD873yf1T5S0rWpToPt`,
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query }
          ],
          temperature: 0.2,
          max_tokens: 350
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content?.trim();
        if (replyText) {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: "ai",
              text: replyText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          ]);
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Mistral API call error, using local fallback synthesis:", err);
    }

    // Fallback response synthesizer
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: `@tiru (K Tirumala Achari) is a **Full-Stack & AI Software Engineer** studying at **NIST University (7.15 CGPA)** specializing in **SaaS platforms, Generative AI & Agentic Workflows, React 19, TypeScript, and Microservices**.\n\nFeatured Projects:\n- **Enterprise AI CRM**: [Live Demo](https://enterprise-ai-crm-platform.onrender.com) | [GitHub](https://github.com/ktirumalaachari)\n- **Developer Command Center**: [Live Demo](https://developercommandcenter.vercel.app) | [GitHub](https://github.com/ktirumalaachari)\n- **Food Flow**: [Live Demo](https://foodflow-phi-mauve.vercel.app) | [GitHub](https://github.com/ktirumalaachari)\n\nContact: **ktirumalaachari@gmail.com**`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setIsLoading(false);
    }, 300);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "ai",
        text: "Session cleared. Ask about @tiru's **projects, architecture, or tech stack**.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isInstant: true,
      }
    ]);
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");

    return (
      <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
        {lines.map((line, lineIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={lineIdx} className="h-1.5" />;

          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
          const parts = [];
          let lastIndex = 0;
          let match;

          while ((match = linkRegex.exec(line)) !== null) {
            const [fullMatch, label, url] = match;
            const matchIndex = match.index;

            if (matchIndex > lastIndex) {
              parts.push({ type: "text", text: line.substring(lastIndex, matchIndex) });
            }

            parts.push({ type: "link", label, url });
            lastIndex = matchIndex + fullMatch.length;
          }

          if (lastIndex < line.length) {
            parts.push({ type: "text", text: line.substring(lastIndex) });
          }

          return (
            <div key={lineIdx} className="block">
              {parts.map((part, pIdx) => {
                if (part.type === "link") {
                  return (
                    <a
                      key={pIdx}
                      href={part.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 my-0.5 mx-1 rounded-md bg-[#ff4500]/10 hover:bg-[#ff4500] hover:text-black text-[#ff4500] border border-[#ff4500]/30 text-[11px] font-mono transition-all duration-200 font-semibold"
                    >
                      <span>{part.label}</span>
                      <ExternalLink className="w-2.5 h-2.5 inline" />
                    </a>
                  );
                }

                return (
                  <span key={pIdx}>
                    {part.text.split("**").map((chunk, cIdx) =>
                      cIdx % 2 === 1 ? (
                        <strong key={cIdx} className="font-bold text-[#f0e8dc]">
                          {chunk}
                        </strong>
                      ) : (
                        chunk
                      )
                    )}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Monochromatic Trigger Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999]">
        <motion.button
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate(25);
            }
            setIsOpen((prev) => !prev);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-black text-white font-mono text-xs tracking-wider border border-[#ff4500]/60 shadow-[0_10px_30px_rgba(255,69,0,0.25)] hover:border-[#ff4500] hover:bg-[#ff4500] hover:text-black transition-all duration-300 cursor-pointer overflow-hidden"
          aria-label="Toggle @tirumala-assistant"
        >
          {isOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#ff4500] flex items-center justify-center overflow-hidden p-[1.5px] border border-white/20 shrink-0">
                <img 
                  src="/favicon.png" 
                  alt="Tirumala Logo" 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
          <span className="font-mono uppercase font-bold tracking-widest text-[11px] sm:text-xs">
            {isOpen ? "CLOSE" : "@TIRUMALA-ASSISTANT"}
          </span>
        </motion.button>
      </div>

      {/* Floating Glassmorphic Monochromatic Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="fixed bottom-16 right-2 sm:bottom-24 sm:right-6 z-[9999] w-[calc(100vw-16px)] sm:w-[420px] md:w-[450px] h-[calc(100vh-80px)] max-h-[500px] sm:max-h-[580px] bg-[#0c0c0c]/98 backdrop-blur-2xl border border-[rgba(240,232,220,0.15)] rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden font-sans text-[#f0e8dc]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-4 border-b border-[rgba(240,232,220,0.1)] bg-[#141414] shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#ff4500]/60 bg-black p-[1.5px] overflow-hidden flex items-center justify-center shadow-md shrink-0">
                  <img 
                    src="/favicon.png" 
                    alt="Tirumala Logo" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-[#f0e8dc] tracking-wide flex items-center gap-1.5 font-mono truncate">
                    <span className="truncate">@tirumala-assistant</span>
                    <span className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-[#ff4500]/20 text-[#ff4500] border border-[#ff4500]/40 uppercase tracking-wider shrink-0 font-bold">
                      ONLINE
                    </span>
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-[#c8bfb3] font-mono tracking-wider uppercase truncate">REAL-TIME PORTFOLIO ASSISTANT</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 shrink-0 ml-1">
                <button
                  onClick={handleClear}
                  title="Clear session"
                  className="p-1.5 text-[#c8bfb3] hover:text-[#ff4500] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close window"
                  className="p-1.5 text-[#c8bfb3] hover:text-[#ff4500] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div 
              data-lenis-prevent 
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 menu-overlay-scroller"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[90%] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#ff4500] text-black font-semibold rounded-br-xs shadow-md"
                        : "bg-[#141414] text-[#f0e8dc] border border-[rgba(240,232,220,0.12)] rounded-bl-xs shadow-inner"
                    }`}
                  >
                    {renderFormattedContent(msg.text)}
                  </div>
                  <span className="text-[9px] text-[#7a746d] font-mono mt-1 px-1 uppercase tracking-widest">
                    {msg.timestamp} {msg.isInstant && "• ONLINE"}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="bg-[#141414] border border-[rgba(240,232,220,0.12)] px-3.5 py-2.5 rounded-2xl rounded-bl-xs text-xs text-[#c8bfb3] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#ff4500] animate-spin" />
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#c8bfb3]">Scraping DOM & reasoning...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-2.5 py-2 border-t border-[rgba(240,232,220,0.1)] bg-[#0c0c0c] flex items-center gap-1.5 overflow-x-auto menu-overlay-scroller shrink-0">
              {SUGGESTION_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.query)}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 whitespace-nowrap text-[10px] sm:text-xs font-mono px-2.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#ff4500] hover:text-black border border-[rgba(240,232,220,0.12)] text-[#c8bfb3] hover:border-[#ff4500] transition-all cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    <Icon className="w-3 h-3 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2.5 sm:p-3 border-t border-[rgba(240,232,220,0.1)] bg-[#0c0c0c] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about @tiru's projects, stack, credentials..."
                className="flex-1 bg-[#141414] border border-[rgba(240,232,220,0.15)] focus:border-[#ff4500] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#f0e8dc] placeholder:text-[#7a746d] focus:outline-none transition-colors font-sans min-w-0"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 sm:p-2.5 rounded-xl bg-[#ff4500] text-black hover:bg-[#ff4500]/90 disabled:opacity-30 transition-all cursor-pointer shrink-0 font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
