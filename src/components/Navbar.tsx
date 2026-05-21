'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'الرئيسية', href: '#' },
    { name: 'من نحن', href: '#about' },
    { name: 'مشاريعنا', href: '#projects' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all duration-300 font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Logo className="h-12" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 font-light tracking-widest uppercase hover:text-[#D4AF37] transition-all duration-300 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <a
              href="#contact"
              className="px-6 py-2 border gold-border gold-text rounded-full hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300 font-light tracking-widest uppercase text-sm"
            >
              اتصل بنا
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="gold-text hover:text-white transition-colors"
              aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-[#D4AF37]/20">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-sm text-sm font-light tracking-widest uppercase text-slate-300 hover:text-[#D4AF37] hover:bg-slate-800/50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-6 text-center border gold-border gold-text px-6 py-3 rounded-full font-light tracking-widest uppercase w-full hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
