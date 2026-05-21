'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Building2,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Loader2,
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protect the dashboard route - redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-[#D4AF37] mx-auto mb-4" />
          <p className="text-slate-400 font-cairo">جاري التحقق من الهوية...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  const navigation = [
    { name: 'المشاريع', href: '/admin/dashboard', icon: Building2 },
    { name: 'الرسائل الواردة', href: '/admin/dashboard/messages', icon: MessageSquare },
    { name: 'الإعدادات', href: '/admin/dashboard/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-cairo flex" dir="rtl">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0F172A]/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: 300 }}
        animate={{ x: isSidebarOpen ? 0 : typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : 300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:sticky top-0 right-0 z-50 h-screen w-72 bg-[#1E293B] border-l border-[#D4AF37]/10 flex flex-col transition-transform lg:translate-x-0"
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-[#D4AF37]/10">
          <Link href="/admin/dashboard" className="flex flex-col">
            <Logo className="h-8" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-r-2 border-[#D4AF37]'
                      : 'text-slate-400 hover:bg-[#0F172A] hover:text-slate-200 border-r-2 border-transparent'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon size={20} className={isActive ? 'text-[#D4AF37]' : 'text-slate-500 group-hover:text-slate-300'} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#D4AF37]/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-all duration-200 w-full"
          >
            <LogOut size={20} />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-[#1E293B] border-b border-[#D4AF37]/10 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-white hidden sm:block">لوحة التحكم</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-right">
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-white">{session.user?.name || 'المدير العام'}</p>
                <p className="text-xs text-slate-400">{session.user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#0F172A] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold">
                {(session.user?.name?.[0]) || 'أ'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0F172A] p-6 lg:p-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
