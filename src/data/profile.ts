export interface HeroStat {
  num: string;
  color: string;
  labelLines: [string, string];
  bar: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  score: string;
}

export interface SocialLinkItem {
  href: string;
  label: "LinkedIn" | "GitHub" | "Email" | "Twitter (X)";
}

export const HERO_ROLES = [
  "Full-Stack-Developer",
  "Problem Solver",
  "Product-Builder",
  "Backend-Developer",
] as const;

export const HERO_NAME_LINES_DESKTOP = [
  { word: "KOTTURTI", indent: 40 },
  { word: "TIRUMALA", indent: 140 },
  { word: "ACHARI", indent: 300 },
] as const;

export const HERO_NAME_LINES_MOBILE = [
  { word: "KOTTURTI", indent: 0 },
  { word: "TIRUMALA", indent: 12 },
  { word: "ACHARI", indent: 22 },
] as const;

export const HERO_STATS: HeroStat[] = [
  {
    num: "7.15",
    color: "text-[#ff4500]",
    labelLines: ["CGPA", "NIST Univ."],
    bar: "72%",
  },
  {
    num: "8+",
    color: "text-[#f0e8dc]",
    labelLines: ["Projects", "Shipped"],
    bar: "60%",
  },
  {
    num: "9+",
    color: "text-[#f0e8dc]",
    labelLines: ["Certifi-", "cations"],
    bar: "80%",
  },
];

export const PROFILE_INFO = {
  fullName: "K Tirumala Achari",
  shortName: "TIRUMALA",
  university: "NIST University",
  degreeTag: "BTech CSE · 2022–26",
  subtitle: "B.Tech CSE @ NIST University",
  tagline: "Building scalable solutions with code & creativity.",
  email: "ktirumalaachari@gmail.com",
  location: "Berhampur, Odisha, India",
  shortLocation: "Berhampur, Odisha, India",
  phone: "+91 8455873388",
  studentId: "202214054",
  gradYear: "2026",
  profileImage: "/images/profile/avatar.jpeg",
  idCardImage: "/images/profile/id-card.jpg",
  bio: "I am K Tirumala Achari, a highly motivated and disciplined BTech Computer Science graduate with a strong foundation in Full Stack Development and problem-solving. Passionate about AI and web applications, with a focus on building products that bridge the gap between research and real-world utility. Continuously expanding skills in AI integration and committed to creating impactful, user-centric solutions. Eager to learn from experienced professionals, grow in a dynamic environment, and contribute to technology that adapts with the industry.",
} as const;

export const BOUNCE_SPRING = {
  type: "spring",
  stiffness: 310,
  damping: 19,
  mass: 0.78,
} as const;
