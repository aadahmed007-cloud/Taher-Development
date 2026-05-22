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
  ExternalLink,
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protect the dashboard route - redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  // Detect desktop viewport on client side to avoid SSR mismatch
  useEffect(() => {
    const updateDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    updateDesktop();
    window.addEventListener('resize', updateDesktop);
    return () => window.removeEventListener('resize', updateDesktop);
  }, []);

  // Fetch unread messages count
  useEffect(() => {
    if (status !== 'authenticated') return;

    let active = true;

    const loadUnread = async () => {
      try {
        const res = await fetch('/api/contact');
        if (res.ok && active) {
          const data = await res.json();
          const count = (data.leads || []).filter((l: { isRead: boolean }) => !l.isRead).length;
          setUnreadCount(count);
        }
      } catch {
        // Silently fail
      }
    };

    loadUnread();
    const interval = setInterval(loadUnread, 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [status]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-[#C8A84E] mx-auto mb-4" />
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
    { name: 'الرسائل الواردة', href: '/admin/dashboard/messages', icon: MessageSquare, badge: unreadCount },
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
        animate={{ x: isSidebarOpen ? 0 : isDesktop ? 0 : 300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:sticky top-0 right-0 z-50 h-screen w-72 bg-[#1E293B] border-l border-[#C8A84E]/10 flex flex-col transition-transform lg:translate-x-0"
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-[#C8A84E]/10">
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
                      ? 'bg-[#C8A84E]/10 text-[#C8A84E] border-r-2 border-[#C8A84E]'
                      : 'text-slate-400 hover:bg-[#0F172A] hover:text-slate-200 border-r-2 border-transparent'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon size={20} className={isActive ? 'text-[#C8A84E]' : 'text-slate-500 group-hover:text-slate-300'} />
                  <span className="font-medium">{item.name}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="mr-auto bg-[#C8A84E] text-[#0F172A] text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* View Site Link */}
          <div className="mt-6 pt-4 border-t border-[#C8A84E]/10">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-[#C8A84E] hover:bg-[#C8A84E]/5 rounded-sm transition-all duration-200"
            >
              <ExternalLink size={20} />
              <span className="font-medium">عرض الموقع</span>
            </a>
          </div>
        </div>

        <div className="p-4 border-t border-[#C8A84E]/10">
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
        <header className="h-20 bg-[#1E293B] border-b border-[#C8A84E]/10 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
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
              <div className="w-10 h-10 rounded-full bg-[#0F172A] border border-[#C8A84E]/30 flex items-center justify-center text-[#C8A84E] font-bold">
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
