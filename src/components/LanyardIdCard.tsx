import React, { useId } from "react";
import { PROFILE_INFO } from "@/data/profile";

const BARCODE_HEIGHTS = [
  "bh",
  "bl",
  "bh",
  "bm",
  "ba",
  "bh",
  "bl",
  "bh",
  "bm",
  "bh",
  "ba",
  "bl",
  "bh",
  "bm",
  "bh",
  "bl",
  "ba",
  "bh",
  "bm",
  "bh",
  "bl",
  "bh",
  "bm",
  "ba",
] as const;

export const LanyardIdCard: React.FC = () => {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Upper Lanyard Ribbon */}
      <svg
        width="100%"
        viewBox="0 0 160 230"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[100px] md:h-[100px] max-md:h-[180px]"
        style={{ display: "block", flexShrink: 0, maxWidth: "160px", width: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <pattern id={`wv-${uid}`} x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#1c0b01" />
            <rect x="0" y="0" width="2.5" height="2.5" fill="#221005" opacity="0.9" />
            <rect x="2.5" y="2.5" width="2.5" height="2.5" fill="#221005" opacity="0.9" />
            <rect x="0.8" y="0" width="1" height="5" fill="#E84C00" opacity="0.22" />
            <rect x="3.2" y="0" width="1" height="5" fill="#E84C00" opacity="0.22" />
          </pattern>
          <pattern id={`os-${uid}`} x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#E84C00" />
            <rect x="0" y="0" width="1.5" height="5" fill="#b83900" />
            <rect x="3.5" y="0" width="1.5" height="5" fill="#b83900" />
          </pattern>
          <linearGradient id={`es-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0.65" />
            <stop offset="18%" stopColor="#000" stopOpacity="0" />
            <stop offset="82%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id={`mH-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#333" />
            <stop offset="30%" stopColor="#bbb" />
            <stop offset="70%" stopColor="#777" />
            <stop offset="100%" stopColor="#222" />
          </linearGradient>
        </defs>
        <rect x="40" y="0" width="80" height="8" rx="2" fill={`url(#mH-${uid})`} />
        <rect x="40" y="0" width="80" height="3" rx="1" fill="white" opacity="0.18" />
        <path d="M42,8 L64,8 L72,218 L56,218 Z" fill={`url(#wv-${uid})`} />
        <path d="M42,8 L64,8 L72,218 L56,218 Z" fill={`url(#es-${uid})`} />
        <path d="M47,8 L54,8 L62,218 L55,218 Z" fill={`url(#os-${uid})`} opacity="0.9" />
        <path d="M96,8 L118,8 L104,218 L88,218 Z" fill={`url(#wv-${uid})`} />
        <path d="M96,8 L118,8 L104,218 L88,218 Z" fill={`url(#es-${uid})`} />
        <path d="M106,8 L113,8 L99,218 L92,218 Z" fill={`url(#os-${uid})`} opacity="0.9" />
      </svg>

      {/* Buckle */}
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 58 44"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          marginTop: "-3px",
          zIndex: 2,
          position: "relative",
          maxWidth: "58px",
          width: "100%",
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`bk-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#555" />
            <stop offset="25%" stopColor="#2a2a2a" />
            <stop offset="70%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>
          <linearGradient id={`bkH-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#444" />
            <stop offset="40%" stopColor="#777" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="58" height="44" rx="4" fill={`url(#bk-${uid})`} />
        <rect x="6" y="6" width="46" height="32" rx="2" fill="#090909" />
        <rect x="3" y="19" width="52" height="6" rx="1.5" fill={`url(#bkH-${uid})`} />
        <rect x="0" y="0" width="58" height="7" rx="4" fill="white" opacity="0.09" />
        <rect x="0" y="8" width="4" height="28" rx="1" fill="white" opacity="0.04" />
        <rect x="54" y="8" width="4" height="28" rx="1" fill="white" opacity="0.04" />
      </svg>

      {/* Lower Ribbon Segment */}
      <svg
        width="100%"
        height="auto"
        viewBox="0 0 42 28"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", marginTop: "-1px", zIndex: 2, maxWidth: "42px", width: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <pattern id={`wv3-${uid}`} x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#1c0b01" />
            <rect x="0.8" y="0" width="1" height="5" fill="#E84C00" opacity="0.22" />
            <rect x="3.2" y="0" width="1" height="5" fill="#E84C00" opacity="0.22" />
          </pattern>
          <pattern id={`os3-${uid}`} x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#E84C00" />
            <rect x="0.8" y="0" width="1.5" height="5" fill="#b83900" />
            <rect x="3.5" y="0" width="1.5" height="5" fill="#b83900" />
          </pattern>
          <linearGradient id={`es3-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0.6" />
            <stop offset="20%" stopColor="#000" stopOpacity="0" />
            <stop offset="80%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect x="9" y="0" width="24" height="28" fill={`url(#wv3-${uid})`} />
        <rect x="9" y="0" width="24" height="28" fill={`url(#es3-${uid})`} />
        <rect x="13" y="0" width="6" height="28" fill={`url(#os3-${uid})`} opacity="0.9" />
      </svg>

      {/* Metallic Carabiner Clip */}
      <svg
        width="100%"
        height="60"
        viewBox="0 0 56 76"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", marginTop: "-2px", zIndex: 2, maxWidth: "56px", width: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`cr-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#252525" />
            <stop offset="22%" stopColor="#b0b0b0" />
            <stop offset="55%" stopColor="#787878" />
            <stop offset="100%" stopColor="#1c1c1c" />
          </linearGradient>
          <linearGradient id={`crTop-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ddd" />
            <stop offset="40%" stopColor="#888" />
            <stop offset="100%" stopColor="#444" />
          </linearGradient>
          <linearGradient id={`crBot-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#aaa" />
            <stop offset="50%" stopColor="#555" />
            <stop offset="100%" stopColor="#999" />
          </linearGradient>
          <filter id={`cs-${uid}`}>
            <feDropShadow dx="1" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.75" />
          </filter>
        </defs>
        <ellipse
          cx="28"
          cy="7"
          rx="11"
          ry="6"
          fill="none"
          stroke={`url(#crTop-${uid})`}
          strokeWidth="5"
        />
        <ellipse
          cx="28"
          cy="7"
          rx="11"
          ry="6"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.2"
        />
        <g filter={`url(#cs-${uid})`}>
          <path
            d="M28,12 C15,12 6,21 6,33 L6,55 C6,67 15,74 28,74 C41,74 50,65 50,55 L50,33 C50,21 41,12 28,12 Z"
            fill={`url(#cr-${uid})`}
          />
          <path
            d="M28,18 C19,18 13,24 13,33 L13,55 C13,63 19,68 28,68 C37,68 43,62 43,55 L43,33 C43,24 37,18 28,18 Z"
            fill="#0c0c0c"
          />
          <path d="M42,57 C46,56 50,53 50,50 L50,55 C50,62 44,66 42,64 Z" fill="#555" />
          <line x1="42" y1="58" x2="50" y2="62" stroke="#888" strokeWidth="1.2" />
          <path
            d="M8,28 Q5,43 8,58"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="28" cy="14" rx="10" ry="3" fill="white" opacity="0.12" />
          <line x1="47" y1="30" x2="47" y2="36" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" />
          <line x1="47" y1="39" x2="47" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" />
          <line x1="47" y1="48" x2="47" y2="54" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" />
          <ellipse cx="28" cy="72" rx="5.5" ry="3.5" fill={`url(#crBot-${uid})`} />
          <line x1="28" y1="68.5" x2="28" y2="75.5" stroke="#2a2a2a" strokeWidth="1.2" />
          <line x1="24" y1="72" x2="32" y2="72" stroke="#2a2a2a" strokeWidth="1.2" />
        </g>
      </svg>

      {/* Hanging Identity Card */}
      <div className="lanyard-card-wrapper">
        <div className="lanyard-card-inner">
          <div className="lanyard-card-head">
            <div>
              <span className="lanyard-card-inst">{PROFILE_INFO.university}</span>
              <span className="lanyard-card-type">Student Identity Card</span>
            </div>
            <div className="lanyard-card-seal">☆</div>
          </div>

          <div className="lanyard-card-photo">
            <img
              src={PROFILE_INFO.idCardImage}
              alt={PROFILE_INFO.fullName}
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="lanyard-card-name">K TIRUMALA ACHARI</div>
          <div className="lanyard-card-role">CSE</div>

          <div className="lanyard-card-chips">
            <span className="lanyard-card-chip">BTech</span>
            <span className="lanyard-card-chip lit">2022–26</span>
          </div>

          <div className="lanyard-card-barcode">
            <div className="lanyard-card-bars">
              {BARCODE_HEIGHTS.map((variant, idx) => (
                <div key={idx} className={`lanyard-bar ${variant}`} />
              ))}
            </div>
            <div className="lanyard-card-serial">
              {PROFILE_INFO.studentId}
              <br />
              {PROFILE_INFO.gradYear}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanyardIdCard;
