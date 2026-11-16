import { motion } from "framer-motion";
import FlowingMenu from "./FlowingMenu";

const skillCategories = [
  {
    link: "#",
    text: "Languages & Frameworks",
    items: [
      { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" }
    ]
  },
  {
    link: "#",
    text: "AI, GenAI & Systems",
    items: [
      { name: "LangChain", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "LangGraph", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "RAG Systems", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "AI Agents", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Socket.IO", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
      { name: "scikit-learn", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
    ]
  },
  {
    link: "#",
    text: "Databases & Cloud",
    items: [
      { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Vercel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" }
    ]
  }
];

const SkillsPhilosophy = () => {
  return (
    <section className="min-h-screen bg-[#0c0c0c] text-[#f0e8dc] font-sans flex flex-col justify-center relative z-10">
      <div className="w-full px-4 xs:px-5 sm:px-8 md:px-12 lg:px-16 pt-16 pb-4 sm:pt-20 sm:pb-6 md:pt-24 md:pb-8 bg-[#0c0c0c] z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-5 gap-y-4 sm:gap-y-8"
        >
          <div className="md:col-span-1 pt-1 md:pt-3">
            <h2 
              className="font-bold uppercase tracking-widest text-[#f0e8dc]/70 font-mono"
              style={{ fontSize: "clamp(0.55rem, 2vw, 0.8rem)" }}
            >
              Skills & Philosophy
            </h2>
            <div className="w-8 h-[2px] bg-[#ff4500] mt-2 hidden md:block" />
          </div>
          <div className="md:col-span-4">
            <blockquote 
              className="font-black uppercase leading-tight tracking-tight text-[#f0e8dc]"
              style={{ fontSize: "clamp(0.9rem, 5vw, 3.5rem)" }} // Fluid down to 250px
            >
              “Building scalable solutions with code & creativity. <span className="text-[#ff4500]">Architecture precedes interface</span> — structure defines outcome.”
            </blockquote>
          </div>
        </motion.div>
      </div>

      <div className="w-full border-t border-[rgba(240,232,220,0.12)] relative overflow-hidden">
        <FlowingMenu 
          items={skillCategories} 
          speed={2} 
          marqueeBgColor="#141414" 
        />
      </div>
    </section>
  );
};

export default SkillsPhilosophy;