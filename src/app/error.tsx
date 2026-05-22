'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center font-cairo">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full border-2 border-red-500/30 flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          حدث خطأ غير متوقع
        </h1>
        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto font-light leading-relaxed">
          نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="px-10 py-4 gold-gradient text-[#0F172A] font-bold rounded-sm shadow-premium hover:brightness-110 transition-all"
          >
            إعادة المحاولة
          </button>
          <a
            href="/"
            className="px-10 py-4 border gold-border gold-text font-bold rounded-sm hover:bg-[#C8A84E]/10 transition-all"
          >
            العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}
