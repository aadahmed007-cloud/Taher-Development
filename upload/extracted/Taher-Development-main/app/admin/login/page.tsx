'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, integrate authentication here
    window.location.href = '/admin/dashboard';
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-cairo relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex justify-center mb-8 hover:opacity-80 transition-opacity">
          <Logo className="h-16" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          تسجيل الدخول للإدارة
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          لوحة تحكم شركة طاهر للتطوير العقاري
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-[#1E293B] py-8 px-4 shadow-premium sm:rounded-sm sm:px-10 border border-[#D4AF37]/20 relative overflow-hidden">
          {/* Subtle top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient"></div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                البريد الإلكتروني
              </label>
              <div className="mt-1 relative rounded-sm shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pr-10 bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm py-3 transition-colors placeholder-slate-600"
                  placeholder="admin@taher.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                كلمة المرور
              </label>
              <div className="mt-1 relative rounded-sm shadow-sm">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pr-10 bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm py-3 transition-colors placeholder-slate-600"
                  placeholder="••••••••"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-[#0F172A] border-slate-700 rounded-sm text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label htmlFor="remember-me" className="mr-2 block text-sm text-slate-400">
                  تذكرني
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#D4AF37] hover:text-[#FDE047] transition-colors">
                  نسيت كلمة المرور؟
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-sm font-bold text-[#0F172A] gold-gradient hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] focus:ring-offset-[#0F172A] transition-all items-center gap-2 group"
              >
                الدخول للوحة التحكم
                <ArrowRight size={16} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
