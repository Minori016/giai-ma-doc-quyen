import React from 'react';

/**
 * 3D Isometric Gold Bar Chart Logo on transparent background
 */
export function LogoIcon({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <img
        src="/assets/logo_3d.jpg"
        alt="Logo Giải Mã Độc Quyền"
        className="w-full h-full object-contain mix-blend-multiply select-none"
        draggable={false}
      />
    </div>
  );
}

/**
 * High-definition 3D Isometric transparent SVG icons for every board tile
 */
export function TileIcon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  switch (name) {
    case 'flag':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="flagGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          {/* Pole */}
          <rect x="5" y="4" width="3" height="22" rx="1.5" fill="#475569" />
          <circle cx="6.5" cy="4" r="2.5" fill="#F59E0B" />
          {/* Waving 3D Checkered Flag */}
          <path d="M8 5C14 4 15 9 22 7V17C15 19 14 14 8 15V5Z" fill="url(#flagGrad)" />
          {/* Checkered pattern inside */}
          <rect x="10" y="7" width="3" height="3" fill="#FFFFFF" fillOpacity="0.85" />
          <rect x="16" y="8" width="3" height="3" fill="#FFFFFF" fillOpacity="0.85" />
          <rect x="13" y="11.5" width="3" height="3" fill="#FFFFFF" fillOpacity="0.85" />
          <rect x="19" y="10.5" width="2" height="3" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      );

    case 'coins':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="coinGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="coinGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          {/* Stack 1 */}
          <ellipse cx="14" cy="9" rx="9" ry="3.5" fill="url(#coinGrad1)" stroke="#B45309" strokeWidth="1" />
          <path d="M5 9V14C5 16 9 17.5 14 17.5C19 17.5 23 16 23 14V9" fill="url(#coinGrad2)" stroke="#B45309" strokeWidth="1" />
          <ellipse cx="14" cy="14" rx="9" ry="3.5" fill="url(#coinGrad1)" stroke="#B45309" strokeWidth="1" />
          <path d="M5 14V19C5 21 9 22.5 14 22.5C19 22.5 23 21 23 19V14" fill="url(#coinGrad2)" stroke="#B45309" strokeWidth="1" />
          <ellipse cx="14" cy="19" rx="9" ry="3.5" fill="url(#coinGrad1)" stroke="#B45309" strokeWidth="1" />
          {/* Coin emblem */}
          <circle cx="14" cy="9" r="4" fill="none" stroke="#B45309" strokeWidth="0.8" strokeDasharray="1 1" />
          <text x="14" y="11" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#78350F">$</text>
        </svg>
      );

    case 'coffee':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="coffeeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0F766E" />
            </linearGradient>
          </defs>
          {/* Steam */}
          <path d="M9 4C9 3 10 2 11 2C12 2 13 3 13 4C13 5 12 6 11 6" stroke="#99F6E4" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 4C15 3 16 2 17 2C18 2 19 3 19 4C19 5 18 6 17 6" stroke="#99F6E4" strokeWidth="1.5" strokeLinecap="round" />
          {/* Mug body */}
          <path d="M6 9H20V19C20 22 17 24 13 24C9 24 6 22 6 19V9Z" fill="url(#coffeeGrad)" />
          {/* Handle */}
          <path d="M20 11C23 11 24 13 24 15C24 17 23 19 20 19" stroke="#0F766E" strokeWidth="2.5" strokeLinecap="round" />
          {/* Saucer */}
          <ellipse cx="13" cy="24" rx="10" ry="2" fill="#0D9488" fillOpacity="0.4" />
        </svg>
      );

    case 'factory':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="factoryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          {/* Smokestack smoke */}
          <circle cx="8" cy="4" r="1.5" fill="#CBD5E1" />
          <circle cx="10" cy="2" r="1.8" fill="#E2E8F0" />
          {/* Sawtooth roof factory */}
          <polygon points="4,24 4,14 10,18 10,14 16,18 16,10 24,10 24,24" fill="url(#factoryGrad)" />
          {/* Windows */}
          <rect x="18" y="13" width="3" height="3" rx="0.5" fill="#FEF3C7" />
          <rect x="18" y="18" width="3" height="3" rx="0.5" fill="#FEF3C7" />
          <rect x="12" y="18" width="2.5" height="3" rx="0.5" fill="#FEF3C7" />
          <rect x="6" y="18" width="2.5" height="3" rx="0.5" fill="#FEF3C7" />
          {/* Ground bar */}
          <rect x="2" y="24" width="24" height="2" rx="1" fill="#78350F" />
        </svg>
      );

    case 'chart':
    case 'chartUp':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <rect x="3" y="23" width="22" height="2" rx="1" fill="#64748B" />
          {/* Ascending bars */}
          <rect x="5" y="17" width="3.5" height="6" rx="1" fill="#94A3B8" />
          <rect x="10.5" y="13" width="3.5" height="10" rx="1" fill="#38BDF8" />
          <rect x="16" y="9" width="3.5" height="14" rx="1" fill="#0284C7" />
          <rect x="21.5" y="5" width="3.5" height="18" rx="1" fill="url(#chartGrad)" />
          {/* Trend line with arrow */}
          <path d="M4 16L11 11L17 7L24 3" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="25,2 20,4 23,7" fill="#F59E0B" />
        </svg>
      );

    case 'lightbulb':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="bulbGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>
          <circle cx="14" cy="11" r="7" fill="url(#bulbGrad)" />
          <path d="M10 16C10.5 18 12 19 14 19C16 19 17.5 18 18 16" fill="url(#bulbGrad)" />
          {/* Base screw */}
          <rect x="11.5" y="19" width="5" height="2" rx="0.5" fill="#94A3B8" />
          <rect x="12" y="21.5" width="4" height="2" rx="0.5" fill="#64748B" />
          <circle cx="14" cy="24" r="1.5" fill="#475569" />
          {/* Filament */}
          <path d="M12 11L13 9L15 9L16 11" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Glow rays */}
          <line x1="14" y1="1" x2="14" y2="3" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="4" x2="7.5" y2="5.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="4" x2="20.5" y2="5.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'skyscrapers':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="towerGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="towerGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Left Tower */}
          <rect x="4" y="8" width="8" height="16" rx="1.5" fill="url(#towerGrad1)" />
          <line x1="6" y1="11" x2="10" y2="11" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
          <line x1="6" y1="14" x2="10" y2="14" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
          <line x1="6" y1="17" x2="10" y2="17" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
          <line x1="6" y1="20" x2="10" y2="20" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
          {/* Right Tower (Taller) */}
          <rect x="14" y="4" width="10" height="20" rx="1.5" fill="url(#towerGrad2)" />
          {/* Spire */}
          <line x1="19" y1="1" x2="19" y2="4" stroke="#D97706" strokeWidth="1.5" />
          <line x1="17" y1="7" x2="21" y2="7" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
          <line x1="17" y1="10" x2="21" y2="10" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
          <line x1="17" y1="13" x2="21" y2="13" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
          <line x1="17" y1="16" x2="21" y2="16" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
          <line x1="17" y1="19" x2="21" y2="19" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    case 'apple':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="appleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          {/* Leaf */}
          <path d="M14 6C15 4 17 3 18 3C18 5 16 7 14 7C14 6.7 14 6.3 14 6Z" fill="#334155" />
          {/* Apple shape with bite */}
          <path d="M14 8C12 8 10 9 9 10.5C7.5 12.5 7.5 16.5 9.5 20C10.5 22 12 24 14 24C15.5 24 16 23 17.5 23C19 23 19.5 24 21 24C23 24 24.5 22 25.5 20C21.5 18 21.5 13 25.5 11.5C24.5 9.5 22.5 8 20.5 8C19 8 18 9 17 9C16 9 15 8 14 8Z" fill="url(#appleGrad)" />
        </svg>
      );

    case 'handshake':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="hsGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <path d="M4 11L9 6L14 11L11 14L8 11L4 15V11Z" fill="#3B82F6" />
          <path d="M24 11L19 6L14 11L17 14L20 11L24 15V11Z" fill="#F59E0B" />
          <circle cx="14" cy="14" r="5" fill="url(#hsGrad)" />
          <path d="M11 13L13 15L17 11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'barrier':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          {/* Barrier crossbeam with hazard stripes */}
          <rect x="2" y="9" width="24" height="6" rx="1.5" fill="#9333EA" />
          <path d="M5 9L3 15H6L8 9H5Z" fill="#FDE047" />
          <path d="M11 9L9 15H12L14 9H11Z" fill="#FDE047" />
          <path d="M17 9L15 15H18L20 9H17Z" fill="#FDE047" />
          <path d="M23 9L21 15H24L25 9H23Z" fill="#FDE047" />
          {/* Posts */}
          <rect x="5" y="15" width="3" height="10" fill="#475569" />
          <rect x="20" y="15" width="3" height="10" fill="#475569" />
        </svg>
      );

    case 'swords':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <path d="M6 22L17 11L19 13L8 24Z" fill="#DC2626" />
          <path d="M22 22L11 11L9 13L20 24Z" fill="#E11D48" />
          {/* Blades */}
          <line x1="17" y1="11" x2="23" y2="5" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="11" y1="11" x2="5" y2="5" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sparks */}
          <circle cx="14" cy="11" r="2.5" fill="#FDE047" />
        </svg>
      );

    case 'tree':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="orgGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          {/* Top Leader Node */}
          <rect x="10" y="3" width="8" height="5" rx="1.5" fill="url(#orgGrad)" />
          {/* Branches */}
          <line x1="14" y1="8" x2="14" y2="14" stroke="#047857" strokeWidth="1.5" />
          <line x1="5" y1="14" x2="23" y2="14" stroke="#047857" strokeWidth="1.5" />
          <line x1="5" y1="14" x2="5" y2="18" stroke="#047857" strokeWidth="1.5" />
          <line x1="14" y1="14" x2="14" y2="18" stroke="#047857" strokeWidth="1.5" />
          <line x1="23" y1="14" x2="23" y2="18" stroke="#047857" strokeWidth="1.5" />
          {/* Bottom Nodes */}
          <rect x="2" y="18" width="6" height="5" rx="1" fill="#34D399" />
          <rect x="11" y="18" width="6" height="5" rx="1" fill="#34D399" />
          <rect x="20" y="18" width="6" height="5" rx="1" fill="#34D399" />
        </svg>
      );

    case 'knight':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="knightGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          {/* Chess Knight */}
          <path d="M7 23H21V21C21 20 19 19 19 18C19 15 20 14 18 10C17 8 16 5 14 4C13.5 3.5 12 4 12 5C11 5 10 5.5 9 7C7 9.5 7 12 8 13C8 14 7 15 6 16C5 17 6 19 7 20V23Z" fill="url(#knightGrad)" />
          {/* Mane and eye */}
          <circle cx="11" cy="7.5" r="1" fill="#FEF3C7" />
          <path d="M14 7C16 8 17 10 17 13" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    case 'scale':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="scaleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <line x1="14" y1="4" x2="14" y2="23" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <line x1="6" y1="8" x2="22" y2="8" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <circle cx="14" cy="4" r="2" fill="#F59E0B" />
          {/* Left Pan */}
          <path d="M3 15C3 18 9 18 9 15L6 8L3 15Z" fill="url(#scaleGrad)" />
          {/* Right Pan */}
          <path d="M19 15C19 18 25 18 25 15L22 8L19 15Z" fill="url(#scaleGrad)" />
          {/* Base */}
          <rect x="9" y="22" width="10" height="3" rx="1.5" fill="#78350F" />
        </svg>
      );

    case 'target':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          <circle cx="14" cy="14" r="7" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
          <circle cx="14" cy="14" r="3" fill="#DC2626" />
        </svg>
      );

    case 'refresh':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="refGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>
          <path d="M14 5C8.5 5 4 9.5 4 15C4 18 5.5 20.5 8 22" stroke="url(#refGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M14 25C19.5 25 24 20.5 24 15C24 12 22.5 9.5 20 8" stroke="url(#refGrad)" strokeWidth="3" strokeLinecap="round" />
          <polygon points="12,2 17,5 12,8" fill="#BE185D" />
          <polygon points="16,28 11,25 16,22" fill="#BE185D" />
        </svg>
      );

    case 'boxing':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="gloveGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="gloveGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Left Glove */}
          <path d="M5 19L9 11C10 9 13 9 14 11C15 13 14 15 12 16L10 19L5 19Z" fill="url(#gloveGrad1)" />
          {/* Right Glove */}
          <path d="M23 19L19 11C18 9 15 9 14 11C13 13 14 15 16 16L18 19L23 19Z" fill="url(#gloveGrad2)" />
          {/* Clash Impact Sparks */}
          <polygon points="14,6 15,10 18,9 15,12 18,14 14,13 11,15 13,12 10,9 13,10" fill="#EF4444" />
        </svg>
      );

    case 'chat':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <path d="M5 8C5 5.5 8 4 12 4C16 4 19 5.5 19 8C19 10.5 16 12 12 12C10.5 12 9.5 11.5 8.5 11L5 12.5L5.5 9.5C5.2 9 5 8.5 5 8Z" fill="#38BDF8" />
          <path d="M12 13C12.5 13 13 13 13.5 13C17.5 13 21 14.5 21 17C21 19.5 17.5 21 13.5 21C12 21 11 20.5 10 20L6.5 21.5L7 18.5C6.5 18 6 17.5 6 17C6 14.8 8.8 13.2 12 13Z" fill="#0284C7" />
        </svg>
      );

    case 'fileSearch':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="3" width="14" height="20" rx="2" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1.5" />
          <line x1="8" y1="7" x2="14" y2="7" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="11" x2="14" y2="11" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="15" x2="11" y2="15" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" />
          {/* Magnifier */}
          <circle cx="18" cy="18" r="5" fill="#FAF5FF" stroke="#7E22CE" strokeWidth="2" />
          <line x1="21.5" y1="21.5" x2="25" y2="25" stroke="#7E22CE" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'tagDown':
    case 'tagUp':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <path d="M4 14L14 4H22V12L12 22L4 14Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="18" cy="8" r="2" fill="#713F12" />
          {name === 'tagDown' ? (
            <path d="M9 13L13 17M13 17V12M13 17H8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M9 17L13 13M13 13V18M13 13H8" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      );

    case 'appstore':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="appStoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="22" height="22" rx="5" fill="url(#appStoreGrad)" />
          {/* Stylized App Store 'A' */}
          <path d="M14 6.5L8.5 19.5H11.5L12.7 16.5H15.3L16.5 19.5H19.5L14 6.5Z" fill="#FFFFFF" />
          <polygon points="14,10 12.8,14 15.2,14" fill="url(#appStoreGrad)" />
        </svg>
      );

    case 'arrowLeft':
    case 'arrowsHorizontal':
      return (
        <svg className={className} viewBox="0 0 28 28" fill="none">
          {/* Red double arrows */}
          <path d="M6 14H22" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <path d="M10 9L5 14L10 19" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 9L23 14L18 19" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
}

/**
 * Authentic character colors based on design cards
 */
const CHARACTER_BG_COLORS: Record<number, string> = {
  1: '#E0F2FE', // Nhóm 1 - Xanh dương
  2: '#FFE4E6', // Nhóm 2 - Đỏ hồng
  3: '#F3E8FF', // Nhóm 3 - Tím
  4: '#FFEDD5', // Nhóm 4 - Cam
  5: '#CCFBF1', // Nhóm 5 - Xanh ngọc
  6: '#FEF3C7', // Nhóm 6 - Nâu / Vàng đất
};

/**
 * Character Avatar cropped directly from authentic assets with 100% transparent background
 * Used in Pawns, Header, Footer, Leaderboard, and Lobby
 */
export function CharacterAvatar({
  id,
  className = 'w-8 h-8',
  showBg = true,
}: {
  id: number;
  className?: string;
  showBg?: boolean;
}) {
  const safeId = id >= 1 && id <= 6 ? id : 1;
  const bgColor = CHARACTER_BG_COLORS[safeId] || '#F1F5F9';

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${className} ${
        showBg ? 'shadow-2xs border border-white/60' : ''
      }`}
      style={{ backgroundColor: showBg ? bgColor : 'transparent' }}
    >
      <img
        src={`/assets/char_avatar_${safeId}.png`}
        alt={`Nhân vật ${safeId}`}
        className="w-full h-full object-contain select-none"
        loading="eager"
        draggable={false}
      />
    </div>
  );
}

/**
 * Full-Body Character Illustration cropped directly from authentic assets with 100% transparent background
 * Used in CharacterSelectModal, Modals & Detail screens
 */
export function CharacterFullFigure({
  id,
  className = 'w-full h-full',
}: {
  id: number;
  className?: string;
}) {
  const safeId = id >= 1 && id <= 6 ? id : 1;
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <img
        src={`/assets/char_full_${safeId}.png`}
        alt={`Nhân vật toàn thân ${safeId}`}
        className="w-full h-full object-contain select-none filter drop-shadow-sm"
        loading="eager"
        draggable={false}
      />
    </div>
  );
}

/**
 * 3D Golden Championship Victory Trophy with Laurel Wreath (100% transparent background)
 */
export function VictoryTrophy3D({ className = 'w-48 h-36' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vicCupGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="vicGoldTrim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <filter id="vicGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#vicGlow)">
        {/* Laurel Wreath Left */}
        <path d="M48 30C40 40 38 60 48 76C44 72 40 60 42 46C44 38 46 32 48 30Z" fill="#FBBF24" />
        <circle cx="43" cy="38" r="3" fill="#FCD34D" />
        <circle cx="40" cy="52" r="3.5" fill="#FCD34D" />
        <circle cx="43" cy="66" r="3" fill="#FCD34D" />

        {/* Laurel Wreath Right */}
        <path d="M112 30C120 40 122 60 112 76C116 72 120 60 118 46C116 38 114 32 112 30Z" fill="#FBBF24" />
        <circle cx="117" cy="38" r="3" fill="#FCD34D" />
        <circle cx="120" cy="52" r="3.5" fill="#FCD34D" />
        <circle cx="117" cy="66" r="3" fill="#FCD34D" />

        {/* Cup Handles */}
        <path d="M56 34C44 34 42 54 56 62" stroke="url(#vicCupGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M104 34C116 34 118 54 104 62" stroke="url(#vicCupGrad)" strokeWidth="6" strokeLinecap="round" fill="none" />

        {/* Main Cup Body */}
        <path d="M54 22H106V48C106 66 94 76 80 76C66 76 54 66 54 48V22Z" fill="url(#vicCupGrad)" />
        {/* Top Rim */}
        <ellipse cx="80" cy="22" rx="26" ry="5" fill="url(#vicGoldTrim)" />

        {/* Star Badge on Cup */}
        <polygon points="80,36 83,44 91,44 85,49 87,57 80,52 73,57 75,49 69,44 77,44" fill="#FFFFFF" fillOpacity="0.95" />

        {/* Stem & Pedestal */}
        <path d="M74 76H86V88H74V76Z" fill="url(#vicCupGrad)" />
        <polygon points="68,88 92,88 96,104 64,104" fill="url(#vicGoldTrim)" />
        <rect x="58" y="104" width="44" height="8" rx="2" fill="#78350F" />
        <rect x="62" y="106" width="36" height="4" rx="1" fill="#B45309" />
      </g>
    </svg>
  );
}

/**
 * 3D Golden Leaderboard Trophy on 100% transparent background
 */
export function LeaderboardTrophy3D({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lbGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      {/* Handles */}
      <path d="M16 18C10 18 10 32 18 36" stroke="url(#lbGold)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M48 18C54 18 54 32 46 36" stroke="url(#lbGold)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Cup */}
      <path d="M18 12H46V28C46 38 38 44 32 44C26 44 18 38 18 28V12Z" fill="url(#lbGold)" />
      <ellipse cx="32" cy="12" rx="14" ry="3" fill="#FEF08A" />
      <polygon points="32,20 34,25 39,25 35,28 37,33 32,30 27,33 29,28 25,25 30,25" fill="#FFFFFF" />
      {/* Stem & Base */}
      <rect x="29" y="44" width="6" height="8" fill="url(#lbGold)" />
      <polygon points="24,52 40,52 42,60 22,60" fill="#B45309" />
    </svg>
  );
}

/**
 * 3D Isometric Mini Smart City Trophy for Lobby on 100% transparent background
 */
export function LobbyIllustration3D({ className = 'w-40 h-28' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lobbyPlaza" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="lobbyBldgBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="lobbyBldgTeal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id="lobbyTrophyGlobe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Isometric Island Plaza Base */}
      <polygon points="80,18 140,50 80,82 20,50" fill="url(#lobbyPlaza)" />
      <polygon points="20,50 80,82 80,94 20,62" fill="#047857" />
      <polygon points="80,82 140,50 140,62 80,94" fill="#065F46" />

      {/* Left Modern Skyscraper */}
      <polygon points="40,32 54,25 54,58 40,65" fill="url(#lobbyBldgBlue)" />
      <polygon points="54,25 66,32 66,65 54,58" fill="#0284C7" />
      <polygon points="40,32 54,25 66,32 52,39" fill="#7DD3FC" />

      {/* Right Modern Skyscraper */}
      <polygon points="98,30 110,23 110,60 98,67" fill="url(#lobbyBldgTeal)" />
      <polygon points="110,23 122,30 122,67 110,60" fill="#0D9488" />
      <polygon points="98,30 110,23 122,30 110,37" fill="#5EEAD4" />

      {/* Central 3D Golden Globe Championship Trophy */}
      {/* Pedestal */}
      <path d="M66 52V56C66 58.8 72.3 61 80 61C87.7 61 94 58.8 94 56V52" fill="#CBD5E1" />
      <ellipse cx="80" cy="52" rx="14" ry="4.5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
      {/* Globe */}
      <circle cx="80" cy="38" r="13" fill="url(#lobbyTrophyGlobe)" />
      {/* Latitude / Longitude lines */}
      <ellipse cx="80" cy="38" rx="13" ry="5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
      <ellipse cx="80" cy="38" rx="6" ry="13" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />

      {/* Park Trees */}
      <circle cx="32" cy="50" r="5" fill="#10B981" />
      <circle cx="128" cy="48" r="5" fill="#10B981" />
      <circle cx="80" cy="74" r="4.5" fill="#10B981" />
    </svg>
  );
}

/**
 * 3D Isometric Question Rivalry Towers (Blue Tech vs Red Corp) on 100% transparent background
 */
export function QuestionArt3D({ className = 'w-36 h-20' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="qBlueTower" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="qRedTower" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id="qVsShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Blue Corporate Skyscraper (Left) */}
      <polygon points="20,24 38,15 38,66 20,74" fill="url(#qBlueTower)" />
      <polygon points="38,15 54,23 54,74 38,66" fill="#0369A1" />
      <polygon points="20,24 38,15 54,23 36,32" fill="#7DD3FC" />
      {/* Windows */}
      <line x1="26" y1="36" x2="32" y2="33" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="26" y1="44" x2="32" y2="41" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="26" y1="52" x2="32" y2="49" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />

      {/* Red Corporate Skyscraper (Right) */}
      <polygon points="86,23 102,15 102,66 86,74" fill="url(#qRedTower)" />
      <polygon points="102,15 120,24 120,74 102,66" fill="#BE123C" />
      <polygon points="86,23 102,15 120,24 104,32" fill="#FDA4AF" />
      {/* Windows */}
      <line x1="108" y1="33" x2="114" y2="36" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="108" y1="41" x2="114" y2="44" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="108" y1="49" x2="114" y2="52" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />

      {/* Center 3D VS Shield & Lightning */}
      <circle cx="70" cy="38" r="14" fill="url(#qVsShield)" stroke="#D97706" strokeWidth="2" />
      <text x="70" y="43" textAnchor="middle" fontSize="11" fontWeight="900" fill="#78350F" letterSpacing="0.5">VS</text>
      {/* Lightning spark */}
      <polygon points="68,14 74,24 70,24 72,30 66,21 70,21" fill="#F59E0B" />
    </svg>
  );
}

/**
 * 3D Broken Vintage Alarm Clock for DefeatModal on 100% transparent background
 */
export function DefeatClock3D({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clockCase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>
      {/* Top Twin Bells */}
      <ellipse cx="24" cy="20" rx="9" ry="5" transform="rotate(-30 24 20)" fill="url(#clockCase)" />
      <ellipse cx="56" cy="20" rx="9" ry="5" transform="rotate(30 56 20)" fill="url(#clockCase)" />
      <rect x="36" y="14" width="8" height="6" rx="2" fill="#64748B" />
      {/* Feet */}
      <polygon points="20,68 28,68 24,76" fill="#475569" />
      <polygon points="52,68 60,68 56,76" fill="#475569" />
      {/* Clock Body */}
      <circle cx="40" cy="46" r="26" fill="url(#clockCase)" />
      <circle cx="40" cy="46" r="21" fill="#FEF2F2" />
      {/* Cracked Glass Lines */}
      <path d="M26 36L38 46L34 56" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 46L54 40" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44 48L52 58" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Hands stopped at 00:00 (12:00) */}
      <line x1="40" y1="46" x2="40" y2="30" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="46" x2="40" y2="34" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="46" r="2.5" fill="#1E293B" />
    </svg>
  );
}
