'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [settings, setSettings] = useState({
    name: session?.user?.name || 'المدير العام',
    email: session?.user?.email || 'admin@taher.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Auto-dismiss notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (settings.newPassword || settings.confirmPassword || settings.currentPassword) {
      if (!settings.currentPassword) {
        setNotification({ type: 'error', message: 'يجب إدخال كلمة المرور الحالية لتغييرها' });
        return;
      }
      if (settings.newPassword.length < 8) {
        setNotification({ type: 'error', message: 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل' });
        return;
      }
      if (settings.newPassword !== settings.confirmPassword) {
        setNotification({ type: 'error', message: 'كلمة المرور الجديدة وتأكيدها غير متطابقتين' });
        return;
      }
    }

    setIsSaving(true);

    try {
      const body: Record<string, string> = {
        name: settings.name,
        email: settings.email,
      };

      if (settings.currentPassword && settings.newPassword) {
        body.currentPassword = settings.currentPassword;
        body.newPassword = settings.newPassword;
      }

      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setNotification({ type: 'success', message: data.message || 'تم تحديث البيانات بنجاح' });
        // Clear password fields on success
        setSettings((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      } else {
        setNotification({ type: 'error', message: data.error || 'حدث خطأ أثناء تحديث البيانات' });
      }
    } catch {
      setNotification({ type: 'error', message: 'خطأ في الاتصال بالخادم' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center gap-3 p-4 rounded-sm border ${
              notification.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">الإعدادات</h2>
          <p className="text-slate-400 text-sm">تخصيص لوحة التحكم والخيارات العامة</p>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-[#C8A84E]/10 rounded-sm shadow-premium overflow-hidden p-6 md:p-10">
        <div className="max-w-2xl">
          <h3 className="text-xl text-white font-bold mb-6">إعدادات الحساب</h3>

          <form className="space-y-6" onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">اسم المستخدم</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors"
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
                    className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors"
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
                      className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors"
                      dir="ltr"
                    />
                    {settings.newPassword && settings.newPassword.length < 8 && (
                      <p className="text-red-400 text-xs mt-1">كلمة المرور يجب أن تكون 8 أحرف على الأقل</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      value={settings.confirmPassword}
                      onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                      className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors"
                      dir="ltr"
                    />
                    {settings.confirmPassword && settings.newPassword !== settings.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">كلمتا المرور غير متطابقتين</p>
                    )}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
