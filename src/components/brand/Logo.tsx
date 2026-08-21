import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark' | 'mark' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  className?: string;
  showTagline?: boolean;
}

export function Logo({
  variant = 'light',
  size = 'md',
  href = '/',
  className = '',
  showTagline = true,
}: LogoProps) {
  // Dimensions map
  const dimensions = {
    sm: { mark: 34, height: 34, text: 'text-xl', sub: 'text-[9px] tracking-[0.24em]' },
    md: { mark: 44, height: 44, text: 'text-2xl sm:text-[1.65rem]', sub: 'text-[10px] tracking-[0.28em]' },
    lg: { mark: 56, height: 56, text: 'text-3xl', sub: 'text-xs tracking-[0.32em]' },
    xl: { mark: 76, height: 76, text: 'text-4xl sm:text-5xl', sub: 'text-sm tracking-[0.36em]' },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3.5 transition-opacity hover:opacity-95 group ${className}`}>
      {/* Precision Circular Lion & F/S Monogram Crest Icon */}
      <div 
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: dimensions.mark, height: dimensions.mark }}
      >
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Sweeping Arc */}
          <path 
            d="M 82 178 C 50 164, 34 128, 38 90 C 44 52, 74 26, 114 26 C 142 26, 168 44, 176 76" 
            stroke="#4FA3CD" 
            strokeWidth="6.5" 
            strokeLinecap="round"
          />

          {/* Top Mane Crown Rays */}
          <path 
            d="M 92 42 C 108 38, 128 42, 142 56" 
            stroke="#4FA3CD" 
            strokeWidth="5" 
            strokeLinecap="round"
          />

          {/* Letter F: Vertical Left Stem */}
          <path 
            d="M 66 60 L 66 150" 
            stroke="#4FA3CD" 
            strokeWidth="6.5" 
            strokeLinecap="round"
          />

          {/* Letter F: Top Bar sweeping into Mane & Ear */}
          <path 
            d="M 66 60 C 86 58, 108 56, 124 66 C 128 54, 138 56, 140 68" 
            stroke="#4FA3CD" 
            strokeWidth="6" 
            strokeLinecap="round"
          />

          {/* Letter F: Middle Horizontal Bar */}
          <path 
            d="M 66 98 L 96 98" 
            stroke="#4FA3CD" 
            strokeWidth="6" 
            strokeLinecap="round"
          />

          {/* Lion Face Profile: Brow, Nose, Snout & Open Roar Mouth */}
          <path 
            d="M 140 68 C 146 78, 154 88, 164 96 C 168 100, 172 102, 172 107 C 170 112, 162 114, 158 115 C 166 118, 162 126, 154 128 C 146 130, 142 138, 142 148 C 142 160, 134 170, 118 176" 
            stroke="#4FA3CD" 
            strokeWidth="5.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />

          {/* Lion Eye Feature */}
          <path 
            d="M 140 92 Q 146 88 152 92" 
            stroke="#4FA3CD" 
            strokeWidth="4" 
            strokeLinecap="round"
          />

          {/* Letter S: Nested Center Flow Monogram */}
          <path 
            d="M 116 102 C 104 90, 78 92, 78 114 C 78 136, 115 132, 115 154 C 115 174, 88 174, 72 156" 
            stroke="#4FA3CD" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />

          {/* Scripture Reference Pill (D8:18) */}
          <rect 
            x="86" 
            y="178" 
            width="28" 
            height="12" 
            rx="3" 
            fill="#4FA3CD" 
            fillOpacity="0.15" 
          />
          <text 
            x="100" 
            y="187" 
            textAnchor="middle" 
            fontFamily="Inter, sans-serif" 
            fontSize="8" 
            fontWeight="800" 
            fill="#4FA3CD" 
            letterSpacing="0.8"
          >
            D8:18
          </text>
        </svg>
      </div>

      {/* Typography Wordmark & Tagline */}
      {variant !== 'mark' && (
        <div className="flex flex-col select-none justify-center">
          <span 
            className={`font-serif font-bold leading-none tracking-tight ${dimensions.text} ${
              variant === 'dark' ? 'text-white' : 'text-brand-navy dark:text-white'
            }`}
            style={{ fontFamily: 'var(--font-serif, "Playfair Display", "Cinzel", serif)' }}
          >
            FirstSavvy
          </span>
          {showTagline && (
            <span 
              className={`font-sans font-bold uppercase mt-1.5 ${dimensions.sub} ${
                variant === 'dark' ? 'text-brand-sky' : 'text-brand-sky dark:text-brand-softBlue'
              }`}
            >
              Stars To Legacy
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky rounded-lg p-0.5" aria-label="FirstSavvy Home">
        {content}
      </Link>
    );
  }

  return content;
}
