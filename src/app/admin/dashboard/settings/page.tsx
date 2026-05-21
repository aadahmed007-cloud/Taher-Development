'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    name: session?.user?.name || 'المدير العام',
    email: session?.user?.email || 'admin@taher.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaved(true);
    setIsSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

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

          <form className="space-y-6" onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">اسم المستخدم</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors"
                dir="ltr"
              />
            </div>

            <div className="border-t border-slate-800 pt-6">
              <h4 className="text-lg text-white font-bold mb-4">تغيير كلمة المرور</h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">كلمة المرور الحالية</label>
                  <input
                    type="password"
                    value={settings.currentPassword}
                    onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
                    className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors"
                    dir="ltr"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">كلمة المرور الجديدة</label>
                    <input
                      type="password"
                      value={settings.newPassword}
                      onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
                      className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      value={settings.confirmPassword}
                      onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                      className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 gold-gradient text-[#0F172A] font-bold rounded-sm shadow-premium hover:brightness-110 transition-all text-sm disabled:opacity-60 flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  'حفظ التغييرات'
                )}
              </button>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm"
                >
                  <CheckCircle size={16} />
                  تم الحفظ بنجاح
                </motion.div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
