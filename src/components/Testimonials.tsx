'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Quote, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'أحمد محمود',
    role: 'مستثمر عقاري',
    quote: 'استثماري مع شركة طاهر كان الأفضل على الإطلاق. جودة التشطيبات والالتزام الصارم بالمواعيد فاق توقعاتي بكثير، مما عزز ثقتي الكاملة في مشاريعهم المستقبلية.',
    image: 'https://picsum.photos/seed/user1/150/150',
    rating: 5,
  },
  {
    id: 2,
    name: 'د. سارة عبد الرحمن',
    role: 'طبيبة استشارية',
    quote: 'مستوى من الرفاهية والفخامة لم أشهده من قبل. تجربتي السكنية في مجمع طاهر أعادت تعريف معنى الراحة والأمان لعائلتي في بيئة متكاملة الخدمات.',
    image: 'https://picsum.photos/seed/user2/150/150',
    rating: 5,
  },
  {
    id: 3,
    name: 'م. خالد مصطفى',
    role: 'مدير تنفيذي',
    quote: 'الاحترافية العالية في التعامل والشفافية التامة في كل تفاصيل المشروع جعلت قرار الشراء سهلاً ومطمئناً. أنصح بشدة بالاستثمار مع هذا الكيان الرائد.',
    image: 'https://picsum.photos/seed/user3/150/150',
    rating: 5,
  },
  {
    id: 4,
    name: 'محمد علي إبراهيم',
    role: 'رجل أعمال',
    quote: 'تعاملت مع العديد من الشركات العقارية لكن طاهر للتطوير تميزت بالمصداقية والجودة الاستثنائية. مشروعي التجاري حقق عوائد تفوق التوقعات.',
    image: 'https://picsum.photos/seed/user4/150/150',
    rating: 5,
  },
  {
    id: 5,
    name: 'نورا حسين',
    role: 'محامية',
    quote: 'من أول زيارة للموقع شعرت بالفارق. الاهتمام بالتفاصيل واختيار المواد الأجود يعكس رؤية شركة تسعى للتميز الحقيقي وليس الشكلي فقط.',
    image: 'https://picsum.photos/seed/user5/150/150',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [direction, setDirection] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Update itemsPerView on client side to avoid SSR mismatch
  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth >= 768 ? 3 : 1);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
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

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-[#080C18] font-cairo overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A84E]/20 to-transparent" />
      <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] bg-[#C8A84E]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-l from-[#C8A84E] to-transparent" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C8A84E] font-semibold">آراء شركاء النجاح</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#C8A84E] to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ماذا يقول <span className="gold-gradient-text">عملاؤنا</span>
          </h2>
          <p className="text-slate-400 text-lg font-light">
            ثقة تدوم وعلاقات تبنى على المصداقية والالتزام بالتميز.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="glass-card rounded-2xl p-6 md:p-8 hover:border-[rgba(200,168,78,0.3)] hover:shadow-gold transition-all duration-300 group relative"
                  >
                    {/* Quote icon */}
                    <div className="mb-6">
                      <Quote size={32} className="text-[#C8A84E]/20 group-hover:text-[#C8A84E]/40 transition-colors duration-300" />
                    </div>

                    {/* Quote text */}
                    <p className="text-slate-300 leading-relaxed font-light mb-6 text-sm md:text-base">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Star rating */}
                    <div className="flex items-center gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < testimonial.rating ? 'text-[#C8A84E] fill-[#C8A84E]' : 'text-slate-700'}
                        />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[rgba(200,168,78,0.1)]">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-[#C8A84E]/20 p-0.5 shrink-0">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm tracking-wide">
                          {testimonial.name}
                        </h4>
                        <span className="text-[#C8A84E] text-xs font-light">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-xl border border-[rgba(200,168,78,0.2)] text-[#C8A84E] flex items-center justify-center hover:bg-[#C8A84E] hover:text-[#080C18] transition-all duration-300"
              aria-label="السابق"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-6 bg-[#C8A84E]'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`انتقل إلى الشريحة ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-xl border border-[rgba(200,168,78,0.2)] text-[#C8A84E] flex items-center justify-center hover:bg-[#C8A84E] hover:text-[#080C18] transition-all duration-300"
              aria-label="التالي"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A84E]/20 to-transparent" />
    </section>
  );
}
