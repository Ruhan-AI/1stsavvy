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
    sm: { mark: 32, height: 32, text: 'text-lg', sub: 'text-[9px] tracking-[0.25em]' },
    md: { mark: 40, height: 44, text: 'text-2xl', sub: 'text-[10px] tracking-[0.3em]' },
    lg: { mark: 52, height: 56, text: 'text-3xl', sub: 'text-xs tracking-[0.35em]' },
    xl: { mark: 72, height: 80, text: 'text-4xl', sub: 'text-sm tracking-[0.4em]' },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}>
      {/* Precision Circular Lion & F/S Crest Icon */}
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
          {/* Outer Ring */}
          <circle 
            cx="100" 
            cy="100" 
            r="90" 
            stroke="#4FA3CD" 
            strokeWidth="7" 
            strokeDasharray="480 60" 
            strokeLinecap="round"
          />
          {/* Lion Mane & F Shape */}
          <path 
            d="M 65 50 C 95 35, 140 45, 160 80 C 175 110, 165 140, 145 165 C 130 180, 100 190, 80 170" 
            stroke="#4FA3CD" 
            strokeWidth="7" 
            strokeLinecap="round"
          />
          {/* Lion Face Profile */}
          <path 
            d="M 125 75 C 145 75, 165 90, 165 105 C 165 115, 155 125, 145 125 C 158 135, 152 150, 138 152" 
            stroke="#4FA3CD" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
          {/* Center S Curve */}
          <path 
            d="M 100 70 C 70 75, 70 110, 105 120 C 135 130, 125 170, 85 170" 
            stroke="#4FA3CD" 
            strokeWidth="7" 
            strokeLinecap="round"
          />
          {/* Top Crown / Mane accents */}
          <path 
            d="M 90 40 L 105 55 M 120 42 L 130 60" 
            stroke="#4FA3CD" 
            strokeWidth="5" 
            strokeLinecap="round"
          />
          {/* Micro DB:18 Tag */}
          <text 
            x="100" 
            y="195" 
            textAnchor="middle" 
            fontFamily="Inter, sans-serif" 
            fontSize="9" 
            fontWeight="700" 
            fill="#4FA3CD" 
            letterSpacing="1"
          >
            08:18
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
          >
            FirstSavvy
          </span>
          {showTagline && (
            <span 
              className={`font-sans font-bold uppercase mt-1 ${dimensions.sub} ${
                variant === 'dark' ? 'text-brand-softBlue' : 'text-brand-sky dark:text-brand-softBlue'
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
