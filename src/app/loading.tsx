export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F172A] font-cairo">
      {/* Navbar skeleton */}
      <div className="fixed w-full z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-[#C8A84E]/20 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          <div className="h-8 w-40 bg-slate-800 rounded-sm animate-pulse"></div>
          <div className="hidden md:flex gap-8">
            <div className="h-4 w-20 bg-slate-800 rounded-sm animate-pulse"></div>
            <div className="h-4 w-20 bg-slate-800 rounded-sm animate-pulse"></div>
            <div className="h-4 w-20 bg-slate-800 rounded-sm animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="pt-28 pb-12 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="h-4 w-48 bg-slate-800 rounded-sm animate-pulse"></div>
            <div className="h-16 w-full bg-slate-800 rounded-sm animate-pulse"></div>
            <div className="h-16 w-3/4 bg-slate-800 rounded-sm animate-pulse"></div>
            <div className="h-6 w-full bg-slate-800 rounded-sm animate-pulse"></div>
            <div className="h-6 w-2/3 bg-slate-800 rounded-sm animate-pulse"></div>
            <div className="flex gap-4 mt-8">
              <div className="h-14 w-48 bg-slate-800 rounded-sm animate-pulse"></div>
              <div className="h-14 w-48 bg-slate-800/50 rounded-sm animate-pulse border border-slate-700"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] bg-slate-800/30 rounded-tr-[100px] rounded-bl-[100px] animate-pulse hidden md:block"></div>
        </div>
      </div>

      {/* Section skeletons */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <div className="h-4 w-32 bg-slate-800 rounded-sm animate-pulse mx-auto"></div>
              <div className="h-12 w-80 bg-slate-800 rounded-sm animate-pulse mx-auto"></div>
              <div className="h-6 w-96 bg-slate-800 rounded-sm animate-pulse mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((card) => (
                <div key={card} className="bg-slate-800/30 rounded-sm overflow-hidden">
                  <div className="h-64 bg-slate-800/50 animate-pulse"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 w-3/4 bg-slate-800 rounded-sm animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-slate-800 rounded-sm animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
