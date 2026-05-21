import React from 'react';

export default function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Arabic Text (Left side of the actual logo) */}
      <div className="flex flex-col items-end hidden sm:flex">
        <span className="text-2xl font-black text-white leading-none tracking-tight">طاهر</span>
        <span className="text-xs font-bold text-white uppercase tracking-widest mt-1">للتطوير العقاري</span>
      </div>

      {/* Center Icon (Copper/Brown Geometric Shape) */}
      <svg 
        viewBox="0 0 100 140" 
        className="h-full w-auto drop-shadow-lg"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g p-id="logo-group">
          {/* Left shape */}
          <path 
            d="M 40 55 C 20 70, 25 105, 40 115 L 40 55 Z" 
            fill="url(#copper-gradient)" 
          />
          {/* Middle shape */}
          <path 
            d="M 45 40 L 45 125 L 55 115 L 55 10 L 45 40 Z" 
            fill="url(#copper-gradient)" 
          />
          {/* Right shape */}
          <path 
            d="M 60 45 C 75 60, 75 95, 60 105 L 60 45 Z" 
            fill="url(#copper-gradient)" 
          />
        </g>
        <defs>
          <linearGradient id="copper-gradient" x1="0" y1="0" x2="0" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b67151" />
            <stop offset="0.5" stopColor="#a35f42" />
            <stop offset="1" stopColor="#8d4b32" />
          </linearGradient>
        </defs>
      </svg>

      {/* English Text (Right side of the actual logo) */}
      <div className="flex flex-col items-start hidden sm:flex">
        <span className="text-2xl font-black text-white leading-none tracking-tight">TAHER</span>
        <span className="text-[10px] font-bold text-white uppercase tracking-widest mt-1">Developments Company</span>
      </div>

      {/* Unified Text for Mobile */}
      <div className="flex flex-col items-center sm:hidden">
        <span className="text-xl font-black text-white leading-none">TAHER</span>
        <span className="text-[9px] font-bold text-white uppercase tracking-widest mt-1">طاهر العقارية</span>
      </div>
    </div>
  );
}
