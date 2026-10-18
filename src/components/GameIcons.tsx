import React from 'react';

export function LogoIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="goldGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      {/* 3D isometric bar chart */}
      <path d="M6 34V24L12 20V30L6 34Z" fill="url(#goldGrad1)" />
      <path d="M12 20L17 23V33L12 30V20Z" fill="#92400E" />
      <path d="M6 24L11 21L17 23L12 20L6 24Z" fill="#FCD34D" />

      <path d="M15 34V16L22 12V28L15 34Z" fill="url(#goldGrad1)" />
      <path d="M22 12L28 15V31L22 28V12Z" fill="#92400E" />
      <path d="M15 16L21 13L28 15L22 12L15 16Z" fill="#FDE68A" />

      <path d="M26 34V8L34 4V26L26 34Z" fill="url(#goldGrad2)" />
      <path d="M34 4L38 7V28L34 26V4Z" fill="#78350F" />
      <path d="M26 8L31 5L38 7L34 4L26 8Z" fill="#FEF3C7" />
    </svg>
  );
}

export function TileIcon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  switch (name) {
    case 'flag':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill="#047857" fillOpacity="0.2" />
          <line x1="4" y1="22" x2="4" y2="15" />
          <line x1="4" y1="3" x2="4" y2="15" />
          <rect x="7" y="5" width="2" height="2" fill="#047857" />
          <rect x="11" y="7" width="2" height="2" fill="#047857" />
          <rect x="15" y="5" width="2" height="2" fill="#047857" />
        </svg>
      );
    case 'coins':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
          <ellipse cx="12" cy="7" rx="8" ry="3.5" fill="#FEF3C7" />
          <path d="M4 7v5c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5V7" />
          <path d="M4 12v5c0 1.93 3.58 3.5 8 3.5s8-1.57 8-3.5v-5" />
        </svg>
      );
    case 'coffee':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" fill="#CCFBF1" fillOpacity="0.4" />
          <line x1="6" y1="1" x2="6" y2="4" strokeLinecap="round" />
          <line x1="10" y1="1" x2="10" y2="4" strokeLinecap="round" />
          <line x1="14" y1="1" x2="14" y2="4" strokeLinecap="round" />
        </svg>
      );
    case 'factory':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2">
          <path d="M2 20h20" />
          <path d="M4 20V9l5 4V9l5 4V4h6v16" fill="#FEF3C7" fillOpacity="0.5" />
          <line x1="16" y1="8" x2="16.01" y2="8" />
          <line x1="16" y1="12" x2="16.01" y2="12" />
          <line x1="16" y1="16" x2="16.01" y2="16" />
        </svg>
      );
    case 'chart':
    case 'chartUp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M18 9l-5 5-4-4-5 5" />
          <polyline points="14 9 18 9 18 13" />
        </svg>
      );
    case 'lightbulb':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" fill="#DBEAFE" fillOpacity="0.5" />
        </svg>
      );
    case 'skyscrapers':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="2">
          <rect x="4" y="6" width="6" height="15" rx="1" fill="#FEF3C7" fillOpacity="0.5" />
          <rect x="14" y="2" width="6" height="19" rx="1" fill="#FDE68A" fillOpacity="0.5" />
          <line x1="7" y1="10" x2="7.01" y2="10" />
          <line x1="7" y1="14" x2="7.01" y2="14" />
          <line x1="17" y1="6" x2="17.01" y2="6" />
          <line x1="17" y1="10" x2="17.01" y2="10" />
          <line x1="17" y1="14" x2="17.01" y2="14" />
        </svg>
      );
    case 'apple':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8">
          <path d="M12 20.94c1.88 0 2.92-1.12 4.44-1.12 1.54 0 2.44 1.1 4.34 1.1 1.95 0 3.72-1.92 4.22-3.87-3.48-1.54-3.76-6.42-.51-8.13-1.63-2.18-4.2-2.39-5.11-2.39-2.18 0-3.77 1.25-4.88 1.25-1.15 0-2.5-1.25-4.48-1.25C6.88 6.53 4 8.79 4 13.06c0 3.86 2.37 7.88 4.6 7.88.94 0 1.96-1.12 3.4-1.12z" fill="#1F2937" fillOpacity="0.1" />
          <path d="M12 6.5c.8-1.07 1.34-2.55 1.19-4.04-1.32.06-2.84.89-3.73 1.96-.78.93-1.42 2.44-1.24 3.88 1.47.11 2.98-.73 3.78-1.8z" fill="#1F2937" />
        </svg>
      );
    case 'handshake':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
          <path d="m11 17 2 2a1 1 0 0 0 1.42 0l4.58-4.58a1 1 0 0 0 0-1.42l-2.29-2.29a1 1 0 0 0-1.42 0L13.5 12.5" />
          <path d="m13 7-2-2a1 1 0 0 0-1.42 0L5 9.58a1 1 0 0 0 0 1.42l2.29 2.29a1 1 0 0 0 1.42 0L10.5 11.5" />
          <path d="m2 14 5.5-5.5" />
          <path d="m22 10-5.5 5.5" />
        </svg>
      );
    case 'barrier':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2">
          <rect x="2" y="8" width="20" height="4" rx="1" fill="#F3E8FF" />
          <path d="M6 12v8M18 12v8" />
          <line x1="5" y1="8" x2="8" y2="12" stroke="#9333EA" />
          <line x1="11" y1="8" x2="14" y2="12" stroke="#9333EA" />
          <line x1="17" y1="8" x2="20" y2="12" stroke="#9333EA" />
        </svg>
      );
    case 'swords':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
          <polyline points="14.5 17.5 3 6 6 3 17.5 14.5" />
          <line x1="13" y1="19" x2="19" y2="13" />
          <line x1="16" y1="16" x2="20" y2="20" />
          <line x1="19" y1="21" x2="21" y2="19" />
          <polyline points="9.5 17.5 21 6 18 3 6.5 14.5" />
          <line x1="11" y1="19" x2="5" y2="13" />
          <line x1="8" y1="16" x2="4" y2="20" />
          <line x1="5" y1="21" x2="3" y2="19" />
        </svg>
      );
    case 'tree':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2">
          <rect x="9" y="3" width="6" height="4" rx="1" fill="#A7F3D0" />
          <rect x="3" y="17" width="5" height="4" rx="1" fill="#A7F3D0" />
          <rect x="10" y="17" width="4" height="4" rx="1" fill="#A7F3D0" />
          <rect x="16" y="17" width="5" height="4" rx="1" fill="#A7F3D0" />
          <path d="M12 7v5M5 17v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M12 12v5" />
        </svg>
      );
    case 'refresh':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="2">
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case 'appstore':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2">
          <circle cx="12" cy="12" r="9" fill="#E0F2FE" />
          <path d="m15.5 17.5-3.5-6.5-3.5 6.5" />
          <path d="M8 14h8" />
          <path d="M12 5v2" />
        </svg>
      );
    case 'knight':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2">
          <path d="M19 22H5v-2c0-1.5 1-2.5 2-3l1-2c-.5-1-1-2.5-1-4 0-4 3-7 7-7 2.5 0 4 1.5 4 3 0 1-1 2-1 3l1 2c1 .5 2 1.5 2 3v2z" fill="#E2E8F0" />
          <circle cx="13" cy="9" r="1.2" fill="#1E293B" />
        </svg>
      );
    case 'fileSearch':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#F3E8FF" />
          <polyline points="14 2 14 8 20 8" />
          <circle cx="11.5" cy="14.5" r="2.5" />
          <path d="m13.5 16.5 2.5 2.5" />
        </svg>
      );
    case 'tagDown':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
          <path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" fill="#FEF3C7" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
          <path d="M12 11v4M10 13l2 2 2-2" stroke="#DC2626" />
        </svg>
      );
    case 'arrowLeft':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      );
    case 'target':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#DB2777" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" fill="#FCE7F3" />
          <circle cx="12" cy="12" r="2" fill="#DB2777" />
        </svg>
      );
    case 'scale':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
          <path d="M12 3v18M6 8h12" />
          <path d="m6 8-3 6h6l-3-6z" fill="#FEF3C7" />
          <path d="m18 8-3 6h6l-3-6z" fill="#FEF3C7" />
        </svg>
      );
    case 'gears':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'boxing':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
          <path d="M4 14v4a2 2 0 0 0 2 2h2v-6H4z" fill="#FDE68A" />
          <path d="M8 8a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v6h-10V8z" fill="#FBBF24" />
          <path d="M6 10h2" />
        </svg>
      );
    case 'chat':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#E0F2FE" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

export function CharacterAvatar({
  id,
  className = 'w-16 h-16',
}: {
  id: number;
  className?: string;
}) {
  switch (id) {
    case 1:
      // Male student with backpack & tablet in blue theme
      return (
        <svg className={className} viewBox="0 0 100 130" fill="none">
          <rect width="100" height="130" rx="12" fill="#E0F2FE" />
          {/* Hair & head */}
          <ellipse cx="50" cy="38" rx="16" ry="18" fill="#FCD34D" />
          <path d="M34 32c0-12 7-18 16-18s16 6 16 18c-4-4-9-6-16-6s-12 2-16 6z" fill="#1E293B" />
          <circle cx="45" cy="38" r="2" fill="#1E293B" />
          <circle cx="55" cy="38" r="2" fill="#1E293B" />
          <path d="M47 45c1.5 1.5 4.5 1.5 6 0" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          {/* Body: Blue jacket & white shirt */}
          <path d="M30 65l10-10h20l10 10v45H30V65z" fill="#0284C7" />
          <polygon points="46,55 54,55 50,68" fill="#FFFFFF" />
          {/* Backpack strap & tablet */}
          <line x1="33" y1="58" x2="38" y2="90" stroke="#0369A1" strokeWidth="3" />
          <rect x="42" y="70" width="22" height="16" rx="2" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
          {/* Pants */}
          <rect x="36" y="105" width="12" height="25" fill="#1E293B" />
          <rect x="52" y="105" width="12" height="25" fill="#1E293B" />
        </svg>
      );
    case 2:
      // Female executive in red suit
      return (
        <svg className={className} viewBox="0 0 100 130" fill="none">
          <rect width="100" height="130" rx="12" fill="#FFE4E6" />
          {/* Hair & head */}
          <ellipse cx="50" cy="36" rx="15" ry="17" fill="#FDE047" />
          <path d="M33 32c0-12 8-18 17-18s17 6 17 18c0 14-4 22-7 24-2-8-4-10-10-10s-8 2-10 10c-3-2-7-10-7-24z" fill="#451A03" />
          <circle cx="45" cy="37" r="1.8" fill="#1E293B" />
          <circle cx="55" cy="37" r="1.8" fill="#1E293B" />
          <path d="M48 44c1 1 3 1 4 0" stroke="#BE123C" strokeWidth="1.5" strokeLinecap="round" />
          {/* Red blazer */}
          <path d="M32 62l8-8h20l8 8v42H32V62z" fill="#E11D48" />
          <polygon points="46,54 54,54 50,68" fill="#FFFFFF" />
          {/* Handbag */}
          <rect x="64" y="75" width="10" height="12" rx="2" fill="#881337" />
          {/* Pants */}
          <rect x="37" y="102" width="11" height="28" fill="#1E293B" />
          <rect x="52" y="102" width="11" height="28" fill="#1E293B" />
        </svg>
      );
    case 3:
      // Female researcher in purple suit with glasses
      return (
        <svg className={className} viewBox="0 0 100 130" fill="none">
          <rect width="100" height="130" rx="12" fill="#F3E8FF" />
          {/* Hair & head */}
          <ellipse cx="50" cy="37" rx="15" ry="17" fill="#FDE047" />
          <path d="M31 34c0-14 8-20 19-20s19 6 19 20c0 18-5 28-9 30-2-12-5-14-10-14s-8 2-10 14c-4-2-9-12-9-30z" fill="#3B0764" />
          {/* Glasses */}
          <circle cx="44" cy="37" r="4.5" stroke="#7E22CE" strokeWidth="1.5" fill="none" />
          <circle cx="56" cy="37" r="4.5" stroke="#7E22CE" strokeWidth="1.5" fill="none" />
          <line x1="48.5" y1="37" x2="51.5" y2="37" stroke="#7E22CE" strokeWidth="1.5" />
          {/* Purple suit */}
          <path d="M32 63l9-8h18l9 8v44H32V63z" fill="#9333EA" />
          <polygon points="46,55 54,55 50,68" fill="#FFFFFF" />
          {/* Notebook */}
          <rect x="42" y="72" width="18" height="20" rx="2" fill="#581C87" />
          <line x1="45" y1="76" x2="55" y2="76" stroke="#C084FC" strokeWidth="1" />
          <line x1="45" y1="80" x2="55" y2="80" stroke="#C084FC" strokeWidth="1" />
          {/* Pants */}
          <rect x="36" y="105" width="12" height="25" fill="#6B21A8" />
          <rect x="52" y="105" width="12" height="25" fill="#6B21A8" />
        </svg>
      );
    case 4:
      // Youth in orange hoodie and cargo pants
      return (
        <svg className={className} viewBox="0 0 100 130" fill="none">
          <rect width="100" height="130" rx="12" fill="#FFEDD5" />
          {/* Hair & head */}
          <ellipse cx="50" cy="38" rx="15" ry="17" fill="#FCD34D" />
          <path d="M33 32c0-12 8-18 17-18s17 6 17 18c-4-4-9-5-17-5s-13 1-17 5z" fill="#1C1917" />
          <circle cx="45" cy="38" r="2" fill="#1C1917" />
          <circle cx="55" cy="38" r="2" fill="#1C1917" />
          <path d="M47 45c1.5 1 4.5 1 6 0" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
          {/* Orange hoodie */}
          <path d="M30 65l10-11h20l10 11v42H30V65z" fill="#EA580C" />
          <circle cx="50" cy="62" r="5" fill="#C2410C" />
          {/* Cargo pants */}
          <rect x="35" y="103" width="13" height="27" fill="#334155" />
          <rect x="52" y="103" width="13" height="27" fill="#334155" />
          <rect x="33" y="108" width="5" height="8" rx="1" fill="#475569" />
          <rect x="62" y="108" width="5" height="8" rx="1" fill="#475569" />
        </svg>
      );
    case 5:
      // Female tech pro in green shirt with laptop
      return (
        <svg className={className} viewBox="0 0 100 130" fill="none">
          <rect width="100" height="130" rx="12" fill="#CCFBF1" />
          {/* Hair & head */}
          <ellipse cx="50" cy="36" rx="15" ry="17" fill="#FDE047" />
          <path d="M32 30c0-12 8-18 18-18s18 6 18 18c0 16-4 24-8 26-2-10-5-12-10-12s-8 2-10 12c-4-2-8-10-8-26z" fill="#1E293B" />
          <circle cx="45" cy="37" r="1.8" fill="#1E293B" />
          <circle cx="55" cy="37" r="1.8" fill="#1E293B" />
          <path d="M48 44c1 1 3 1 4 0" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" />
          {/* Green button shirt */}
          <path d="M32 62l9-8h18l9 8v42H32V62z" fill="#0D9488" />
          <line x1="50" y1="56" x2="50" y2="100" stroke="#115E59" strokeWidth="1.5" />
          {/* Laptop */}
          <rect x="44" y="70" width="22" height="15" rx="2" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
          {/* Pants */}
          <rect x="36" y="103" width="12" height="27" fill="#0F172A" />
          <rect x="52" y="103" width="12" height="27" fill="#0F172A" />
        </svg>
      );
    case 6:
    default:
      // Economist in gold/brown vest with blueprints
      return (
        <svg className={className} viewBox="0 0 100 130" fill="none">
          <rect width="100" height="130" rx="12" fill="#FEF3C7" />
          {/* Hair & head */}
          <ellipse cx="50" cy="38" rx="15" ry="17" fill="#FCD34D" />
          <path d="M34 32c0-12 7-18 16-18s16 6 16 18c-4-4-9-5-16-5s-12 1-16 5z" fill="#3E2723" />
          <circle cx="45" cy="38" r="2" fill="#1C1917" />
          <circle cx="55" cy="38" r="2" fill="#1C1917" />
          <path d="M47 45c1.5 1 4.5 1 6 0" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
          {/* Vest and tie */}
          <path d="M31 63l9-8h20l9 8v44H31V63z" fill="#B45309" />
          <polygon points="46,55 54,55 50,70" fill="#FFFFFF" />
          <polygon points="48.5,58 51.5,58 50,68" fill="#78350F" />
          {/* Rolled architectural blueprints */}
          <rect x="62" y="68" width="8" height="26" rx="3" transform="rotate(-20 62 68)" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1" />
          {/* Pants */}
          <rect x="36" y="105" width="12" height="25" fill="#451A03" />
          <rect x="52" y="105" width="12" height="25" fill="#451A03" />
        </svg>
      );
  }
}
