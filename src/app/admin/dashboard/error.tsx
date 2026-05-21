'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center" dir="rtl">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">حدث خطأ</h2>
        <p className="text-slate-400 text-sm mb-4">
          {error.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 gold-gradient text-[#0F172A] font-bold rounded-sm shadow-premium hover:brightness-110 transition-all text-sm inline-flex items-center gap-2"
        >
          <RefreshCw size={16} />
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
