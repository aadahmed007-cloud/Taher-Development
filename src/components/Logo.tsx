'use client';

import React, { useId } from 'react';

export default function Logo({ className = "h-12" }: { className?: string }) {
  const id = useId();
  const gradientId = `gold-gradient-${id}`;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Arabic Text */}
      <div className="flex flex-col items-end hidden sm:flex">
        <span className="text-xl font-black gold-gradient-text leading-none tracking-tight">طاهر</span>
        <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-[0.2em] mt-1.5">للتطوير العقاري</span>
      </div>

      {/* Center Icon */}
      <svg
        viewBox="0 0 100 140"
        className="h-full w-auto drop-shadow-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g>
          <path
            d="M 40 55 C 20 70, 25 105, 40 115 L 40 55 Z"
            fill={`url(#${gradientId})`}
          />
          <path
            d="M 45 40 L 45 125 L 55 115 L 55 10 L 45 40 Z"
            fill={`url(#${gradientId})`}
          />
          <path
            d="M 60 45 C 75 60, 75 95, 60 105 L 60 45 Z"
            fill={`url(#${gradientId})`}
          />
        </g>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9A7B2E" />
            <stop offset="0.5" stopColor="#C8A84E" />
            <stop offset="1" stopColor="#E8D48B" />
          </linearGradient>
        </defs>
      </svg>

      {/* English Text */}
      <div className="flex flex-col items-start hidden sm:flex">
        <span className="text-xl font-black gold-gradient-text leading-none tracking-tight">TAHER</span>
        <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-[0.15em] mt-1.5">Developments Company</span>
      </div>

      {/* Mobile Text */}
      <div className="flex flex-col items-center sm:hidden">
        <span className="text-lg font-black gold-gradient-text leading-none">TAHER</span>
        <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-widest mt-1">طاهر العقارية</span>
      </div>
    </div>
  );
}
