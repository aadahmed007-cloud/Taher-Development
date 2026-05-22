'use client';

import { Award, Lightbulb, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    icon: Award,
    title: 'الجودة الفائقة',
    description: 'نلتزم بأعلى معايير الجودة العالمية في جميع مراحل البناء والتشطيب لضمان استدامة استثماراتك.',
  },
  {
    icon: Lightbulb,
    title: 'الابتكار المعماري',
    description: 'تصاميم عصرية ورؤية مستقبلية تلبي احتياجات نمط الحياة الحديث في كل تفصيلة.',
  },
  {
    icon: ShieldCheck,
    title: 'الثقة والمصداقية',
    description: 'علاقتنا بعملائنا مبنية على الشفافية والالتزام المطلق بمواعيد التسليم والمواصفات.',
  },
  {
    icon: TrendingUp,
    title: 'الاستثمار الآمن',
    description: 'مشاريعنا في مواقع استراتيجية تضمن أعلى عوائد استثمارية على المدى الطويل.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#080C18] font-cairo overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Right side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-l from-[#C8A84E] to-transparent" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#C8A84E] font-semibold">
                رؤيتنا وقيمنا
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              عن{' '}
              <span className="gold-gradient-text">طاهر للتطوير العقاري</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed font-light mb-6">
              منذ نشأتها، أخذت شركة طاهر للتطوير العقاري على عاتقها تقديم أرقى المستويات لعملائها في كل جوانب التطوير العمراني في مصر. شغفنا بالكمال ودقتنا في التنفيذ يجعلنا خيارك الأمثل للسكن الراقي والاستثمار الآمن.
            </p>

            {/* Number highlights inline */}
            <div className="flex items-center gap-8 mb-8">
              <div className="text-center">
                <span className="text-3xl font-bold gold-gradient-text">15+</span>
                <p className="text-xs text-slate-500 mt-1 tracking-wide">سنوات خبرة</p>
              </div>
              <div className="w-[1px] h-12 bg-slate-800" />
              <div className="text-center">
                <span className="text-3xl font-bold gold-gradient-text">30+</span>
                <p className="text-xs text-slate-500 mt-1 tracking-wide">مشروع منجز</p>
              </div>
              <div className="w-[1px] h-12 bg-slate-800" />
              <div className="text-center">
                <span className="text-3xl font-bold gold-gradient-text">500+</span>
                <p className="text-xs text-slate-500 mt-1 tracking-wide">عميل سعيد</p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group glass-card rounded-xl p-4 hover:border-[rgba(200,168,78,0.3)] hover:shadow-gold transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#C8A84E]/10 flex items-center justify-center shrink-0 group-hover:bg-[#C8A84E]/20 transition-colors duration-300">
                        <Icon size={18} className="text-[#C8A84E]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[#C8A84E] transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#C8A84E]/40 text-[#C8A84E] rounded-xl font-bold text-sm tracking-wide hover:bg-[#C8A84E]/10 hover:border-[#C8A84E] hover:shadow-gold transition-all duration-300"
            >
              اقرأ المزيد
            </a>
          </motion.div>

          {/* Left side: Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Main image */}
              <div className="absolute top-0 right-0 w-[65%] h-[55%] rounded-2xl overflow-hidden border-2 border-[#C8A84E]/20 shadow-card z-10">
                <Image
                  src="https://picsum.photos/seed/taherlux1/600/400"
                  alt="مشاريع طاهر للتطوير العقاري الفاخرة"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 65vw, 400px"
                />
              </div>

              {/* Second image */}
              <div className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-2xl overflow-hidden border-2 border-[#C8A84E]/20 shadow-card z-10">
                <Image
                  src="https://picsum.photos/seed/taherlux2/600/400"
                  alt="تصاميم معمارية عصرية"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 55vw, 350px"
                />
              </div>

              {/* Decorative overlapping square */}
              <div className="absolute bottom-[20%] right-[10%] w-[45%] h-[40%] rounded-2xl border-2 border-[#C8A84E]/10 z-0 bg-[#C8A84E]/5" />

              {/* Gold accent corner */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20px] left-[30%] w-16 h-16 border border-[#C8A84E]/15 rounded-full z-20"
              />

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute bottom-[15%] right-[-10px] md:right-[-20px] glass-card rounded-2xl p-5 z-20 shadow-gold"
              >
                <span className="text-3xl font-bold gold-gradient-text block">15+</span>
                <span className="text-xs text-slate-400 font-light">سنوات من التميز</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
