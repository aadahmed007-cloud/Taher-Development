'use client';

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">الرسائل الواردة</h2>
          <p className="text-slate-400 text-sm">استعرض رسائل العملاء والاستفسارات</p>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-[#D4AF37]/10 rounded-sm shadow-premium overflow-hidden min-h-[400px] flex items-center justify-center">
         <div className="text-center">
            <h3 className="text-xl text-slate-300 font-bold mb-2">لا توجد رسائل جديدة</h3>
            <p className="text-slate-500">سيظهر هنا بريد العملاء والاستفسارات بمجرد استلامها.</p>
         </div>
      </div>
    </div>
  );
}
