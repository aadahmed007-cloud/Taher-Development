'use client';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">الإعدادات</h2>
          <p className="text-slate-400 text-sm">تخصيص لوحة التحكم والخيارات العامة</p>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-[#D4AF37]/10 rounded-sm shadow-premium overflow-hidden p-6 md:p-10">
         <div className="max-w-2xl">
            <h3 className="text-xl text-white font-bold mb-6">إعدادات الحساب</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">اسم المستخدم</label>
                <input
                  type="text"
                  defaultValue="المدير العام"
                  className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  defaultValue="admin@taher.com"
                  className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors"
                  dir="ltr"
                />
              </div>
              
              <div>
                <button className="px-6 py-2.5 gold-gradient text-[#0F172A] font-bold rounded-sm shadow-premium hover:brightness-110 transition-all text-sm">
                  حفظ التغييرات
                </button>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
