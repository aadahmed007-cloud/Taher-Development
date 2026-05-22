'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Building2, Users, Award } from 'lucide-react';

const stats = [
  {
    icon: Calendar,
    value: 15,
    suffix: '+',
    label: 'سنوات الخبرة',
  },
  {
    icon: Building2,
    value: 30,
    suffix: '+',
    label: 'المشاريع المنجزة',
  },
  {
    icon: Users,
    value: 500,
    suffix: '+',
    label: 'العملاء السعداء',
  },
  {
    icon: Award,
    value: 12,
    suffix: '+',
    label: 'جوائز التميز',
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold gold-gradient-text">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 bg-[#0D1321] font-cairo overflow-hidden">
      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A84E]/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8A84E]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-xl border border-[rgba(200,168,78,0.2)] bg-[#C8A84E]/5 flex items-center justify-center mb-4 group-hover:bg-[#C8A84E]/10 group-hover:border-[#C8A84E]/40 transition-all duration-300">
                  <Icon size={24} className="text-[#C8A84E]" />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-sm text-slate-400 mt-2 font-light tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Gold accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A84E]/30 to-transparent" />
    </section>
  );
}
