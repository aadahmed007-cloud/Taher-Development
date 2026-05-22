'use client';

import { useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const quickLinks = [
  { name: 'الرئيسية', href: '#hero' },
  { name: 'من نحن', href: '#about' },
  { name: 'المشاريع الحالية', href: '#projects' },
  { name: 'مشاريع مستقبلية', href: '#projects' },
  { name: 'اتصل بنا', href: '#contact' },
];

const services = [
  'تطوير المجتمعات السكنية',
  'المراكز التجارية والإدارية',
  'إدارة المشروعات المشتركة',
  'الاستشارات العقارية',
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/TaherRSDev', label: 'فيسبوك' },
  { icon: Instagram, href: '#', label: 'انستغرام' },
  { icon: Linkedin, href: '#', label: 'لينكد إن' },
  { icon: Twitter, href: '#', label: 'تويتر' },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('شكراً لاشتراكك في نشرتنا البريدية!');
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050810] font-cairo relative overflow-hidden">
      {/* Decorative gold line at top */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C8A84E]/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C8A84E]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Logo className="h-10" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light">
              شركة رائدة في مجال التطوير العقاري، نلتزم بتقديم مشاريع سكنية وتجارية فاخرة تلبي تطلعات عملائنا وترتقي بمفهوم الحياة العصرية.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl border border-slate-800/80 flex items-center justify-center text-slate-500 hover:border-[#C8A84E]/40 hover:text-[#C8A84E] hover:bg-[#C8A84E]/5 transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-[11px] text-[#C8A84E] uppercase tracking-[0.2em] mb-6 font-bold flex items-center gap-3">
              <span className="w-5 h-[1px] bg-[#C8A84E]/40" />
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 font-light hover:text-[#C8A84E] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-[#C8A84E] group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-[11px] text-[#C8A84E] uppercase tracking-[0.2em] mb-6 font-bold flex items-center gap-3">
              <span className="w-5 h-[1px] bg-[#C8A84E]/40" />
              خدماتنا
            </h4>
            <ul className="space-y-3">
              {services.map((service, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 font-light hover:text-[#C8A84E] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-[#C8A84E] group-hover:w-3 transition-all duration-300" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-[11px] text-[#C8A84E] uppercase tracking-[0.2em] mb-6 font-bold flex items-center gap-3">
              <span className="w-5 h-[1px] bg-[#C8A84E]/40" />
              النشرة البريدية
            </h4>
            <p className="text-slate-500 text-sm mb-6 font-light leading-relaxed">
              اشترك في نشرتنا البريدية ليصلك أحدث الأخبار والمشاريع الحصرية.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
              <div className="flex rounded-xl overflow-hidden border border-[rgba(200,168,78,0.2)] focus-within:border-[#C8A84E]/50 transition-all focus-within:shadow-gold">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-[#0D1321] text-white px-4 py-3 w-full focus:outline-none text-sm font-light placeholder-slate-600"
                  dir="ltr"
                  required
                />
                <button
                  type="submit"
                  className="gold-gradient text-[#080C18] font-bold px-5 py-3 hover:brightness-110 transition-all text-sm uppercase tracking-wider shrink-0"
                >
                  اشتراك
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-600 tracking-wide uppercase">
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> TAHER DEVELOPMENT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex gap-6 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-[#C8A84E] transition-colors duration-300">سياسة الخصوصية</a>
              <a href="#" className="hover:text-[#C8A84E] transition-colors duration-300">الشروط والأحكام</a>
            </div>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl border border-[rgba(200,168,78,0.15)] flex items-center justify-center text-[#C8A84E] hover:bg-[#C8A84E] hover:text-[#080C18] transition-all duration-300"
              aria-label="العودة للأعلى"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
