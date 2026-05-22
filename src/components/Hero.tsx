'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.3, 0.8]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const headingLines = [
    { text: 'إرث من', delay: 0 },
    { text: 'الفخامة،', delay: 0.15 },
    { text: 'رؤية للمستقبل', delay: 0.3 },
  ];

  const stats = [
    { value: '+15', label: 'سنة خبرة' },
    { value: '+30', label: 'مشروع' },
    { value: '+500', label: 'عميل' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080C18] font-cairo">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <Image
          src="https://picsum.photos/seed/luxuryskyline7/1920/1080"
          alt="خلفية مشاريع طاهر للتطوير العقاري"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 overlay-dark" />
      </motion.div>

      {/* Decorative Gold Elements */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* Top-right gold circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full border border-[#C8A84E]/10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute top-[12%] left-[7%] w-20 h-20 rounded-full border border-[#C8A84E]/15"
        />

        {/* Bottom-left gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
          className="absolute bottom-[25%] right-0 w-64 h-[1px] bg-gradient-to-l from-[#C8A84E]/30 to-transparent origin-right"
        />

        {/* Floating gold dots */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-[#C8A84E]/40"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[35%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#C8A84E]/30"
        />
        <motion.div
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[60%] right-[8%] w-1 h-1 rounded-full bg-[#E8D48B]/40"
        />

        {/* Geometric lines */}
        <motion.div
          initial={{ opacity: 0, rotate: 45 }}
          animate={{ opacity: 1, rotate: 45 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-[5%] right-[3%] w-24 h-24 border border-[#C8A84E]/8 rotate-45"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-[15%] left-[5%] w-40 h-[1px] bg-gradient-to-r from-[#C8A84E]/20 to-transparent rotate-[30deg]"
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-gradient-to-l from-[#C8A84E] to-transparent" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C8A84E] font-semibold">
              شركة رائدة في التطوير العقاري
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#C8A84E] to-transparent" />
          </motion.div>

          {/* Main Heading - Staggered Lines */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-[1.15] mb-8">
            {headingLines.map((line, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + line.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`block ${idx === 2 ? 'gold-gradient-text' : ''}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            نحن في شركة طاهر للتطوير العقاري نصمم مساحات تعيد تعريف مفهوم السكن الراقي والعيش المعاصر
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="gold-gradient text-[#080C18] px-10 py-4 rounded-xl font-bold text-base tracking-wide hover:shadow-gold-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              استكشف المشاريع
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-10 py-4 border border-[#C8A84E]/40 text-[#C8A84E] rounded-xl font-bold text-base tracking-wide hover:bg-[#C8A84E]/10 hover:border-[#C8A84E] hover:shadow-gold transition-all duration-300 flex items-center gap-2"
            >
              طلب عرض استثماري
            </a>
          </motion.div>

          {/* Floating Stats Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-bold gold-gradient-text">{stat.value}</span>
                <span className="text-sm text-slate-400 font-light">{stat.label}</span>
                {idx < stats.length - 1 && (
                  <div className="hidden md:block w-[1px] h-8 bg-slate-700 ms-6" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">اكتشف المزيد</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-[#C8A84E]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
