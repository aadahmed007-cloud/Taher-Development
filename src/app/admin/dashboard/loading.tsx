export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse" dir="rtl">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#1E293B] border border-[#D4AF37]/10 rounded-sm p-4 md:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-slate-700" />
              <div className="h-4 bg-slate-700 rounded w-20" />
            </div>
            <div className="h-8 bg-slate-700 rounded w-12" />
          </div>
        ))}
      </div>

      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="h-7 bg-slate-700 rounded w-40 mb-2" />
          <div className="h-4 bg-slate-700 rounded w-56" />
        </div>
        <div className="h-10 bg-slate-700 rounded w-40" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-[#1E293B] border border-[#D4AF37]/10 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-[#D4AF37]/10 bg-[#0F172A]/50">
          <div className="h-9 bg-slate-700 rounded max-w-md" />
        </div>
        <div className="divide-y divide-slate-800">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className="h-4 bg-slate-700 rounded w-32" />
              <div className="h-4 bg-slate-700 rounded w-24" />
              <div className="h-6 bg-slate-700 rounded w-20" />
              <div className="h-4 bg-slate-700 rounded w-28" />
              <div className="h-4 bg-slate-700 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
