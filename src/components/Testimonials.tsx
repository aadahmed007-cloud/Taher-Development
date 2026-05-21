'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "أحمد محمود",
    role: "مستثمر عقاري",
    quote: "استثماري مع شركة طاهر كان الأفضل على الإطلاق. جودة التشطيبات والالتزام الصارم بالمواعيد فاق توقعاتي بكثير، مما عزز ثقتي الكاملة في مشاريعهم المستقبلية.",
    image: "https://picsum.photos/seed/user1/150/150",
  },
  {
    id: 2,
    name: "د. سارة عبد الرحمن",
    role: "طبيبة استشارية",
    quote: "مستوى من الرفاهية والفخامة لم أشهده من قبل. تجربتي السكنية في مجمع طاهر أعادت تعريف معنى الراحة والأمان لعائلتي في بيئة متكاملة الخدمات.",
    image: "https://picsum.photos/seed/user2/150/150",
  },
  {
    id: 3,
    name: "م. خالد مصطفى",
    role: "مدير تنفيذي",
    quote: "الاحترافية العالية في التعامل والشفافية التامة في كل تفاصيل المشروع جعلت قرار الشراء سهلاً ومطمئناً. أنصح بشدة بالاستثمار مع هذا الكيان الرائد.",
    image: "https://picsum.photos/seed/user3/150/150",
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
  }, [nextSlide]);

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, startTimer]);

  const handleMouseEnter = () => pauseTimer();
  const handleMouseLeave = () => startTimer();
  const handleFocus = () => pauseTimer();
  const handleBlur = () => startTimer();

  return (
    <section
      className="py-24 bg-[#0A0F1C] font-cairo border-y border-[#D4AF37]/10 relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 gold-gradient"></div>
            <span className="text-xs tracking-[0.3em] uppercase gold-text font-bold">آراء شركاء النجاح</span>
            <div className="h-[1px] w-8 gold-gradient"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ماذا يقول <span className="gold-text">عملاؤنا</span>
          </h2>
          <p className="text-slate-400 text-lg font-light">
            ثقة تدوم وعلاقات تبنى على المصداقية والالتزام بالتميز.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-[#1E293B] border border-[#D4AF37]/20 rounded-sm shadow-premium p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-4 right-6 text-[#D4AF37]/10 transform rotate-180">
              <Quote size={120} />
            </div>

            <div className="relative z-10 h-64 sm:h-56 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col items-center text-center"
                >
                  <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8 max-w-2xl">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 gold-border p-0.5">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          fill
                          sizes="56px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <h4 className="text-white font-bold tracking-wide">
                        {testimonials[currentIndex].name}
                      </h4>
                      <span className="text-[#D4AF37] text-sm font-light uppercase tracking-widest">
                        {testimonials[currentIndex].role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-sm border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300"
              aria-label="السابق"
            >
              <ChevronRight size={24} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-slate-700 hover:bg-slate-500'}`}
                  aria-label={`انتقل إلى التقييم ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-sm border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300"
              aria-label="التالي"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
