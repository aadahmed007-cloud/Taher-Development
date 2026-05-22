'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  { name: 'الرئيسية', href: '#hero' },
  { name: 'من نحن', href: '#about' },
  { name: 'مشاريعنا', href: '#projects' },
  { name: 'آراء العملاء', href: '#testimonials' },
  { name: 'اتصل بنا', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  // Show/hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = ['hero', 'about', 'projects', 'testimonials', 'contact'];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed w-full z-50 transition-all duration-500 font-cairo ${
          isScrolled
            ? 'glass-strong border-b border-[rgba(200,168,78,0.12)] shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo - Right side (RTL) */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" onClick={() => handleLinkClick('#hero')}>
                <Logo className="h-12" />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 group"
                >
                  <span
                    className={`transition-colors duration-300 ${
                      activeSection === link.href.slice(1)
                        ? 'text-[#C8A84E]'
                        : 'text-slate-300 group-hover:text-[#C8A84E]'
                    }`}
                  >
                    {link.name}
                  </span>
                  <span
                    className={`absolute bottom-0 right-1/2 translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                      activeSection === link.href.slice(1)
                        ? 'w-6 bg-[#C8A84E]'
                        : 'w-0 bg-[#C8A84E] group-hover:w-4'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* CTA Button - Left side (RTL) */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="gold-gradient text-[#080C18] px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide hover:shadow-gold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Phone size={16} />
                اتصل بنا
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="w-10 h-10 rounded-xl border border-[rgba(200,168,78,0.2)] flex items-center justify-center text-[#C8A84E] hover:bg-[#C8A84E]/10 transition-all duration-300"
                aria-label="فتح القائمة"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sheet Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="bg-[#080C18] border-l border-[rgba(200,168,78,0.15)] w-[300px] p-0"
        >
          <SheetHeader className="p-6 border-b border-[rgba(200,168,78,0.1)]">
            <SheetTitle className="flex items-center justify-end">
              <Logo className="h-10" />
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col py-6 px-4">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#C8A84E] bg-[#C8A84E]/10'
                    : 'text-slate-300 hover:text-[#C8A84E] hover:bg-[#C8A84E]/5'
                }`}
              >
                <ChevronDown size={16} className="rotate-[-90deg] opacity-50" />
                {link.name}
              </motion.a>
            ))}

            <div className="mt-8 px-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="gold-gradient text-[#080C18] w-full py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:shadow-gold transition-all duration-300"
              >
                <Phone size={16} />
                اتصل بنا
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
