'use client';

import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center pt-28 pb-12 overflow-hidden bg-[#0F172A] font-cairo">
      {/* Background Glow Overlay */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12">
        
        {/* Text Content Area */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 gold-gradient"></div>
              <span className="text-xs tracking-[0.3em] uppercase gold-text">شركة رائدة في التطوير العقاري</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
              إرث من الفخامة، <br />
              <span className="gold-text">رؤية للمستقبل</span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed font-light">
              نحن في شركة طاهر للتطوير العقاري نصمم مساحات تعيد تعريف مفهوم السكن الراقي والعيش المعاصر. استثمر في عقارات تجمع بين العراقة المعمارية وأحدث التقنيات العالمية في قلب المناطق الحيوية.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 gold-gradient text-[#0F172A] font-bold rounded-sm shadow-premium hover:brightness-110 transition-all flex items-center gap-2"
              >
                استكشف المشاريع
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 border gold-border gold-text font-bold rounded-sm hover:bg-[#D4AF37]/10 transition-all flex items-center gap-2"
              >
                طلب عرض استثماري
              </a>
            </div>
          </motion.div>
        </div>

        {/* Feature Visual Area */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[500px] relative z-10 hidden md:flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full relative"
          >
            {/* Outline Offset */}
            <div className="absolute w-full h-full border border-[#D4AF37]/20 rounded-tr-[100px] rounded-bl-[100px] translate-x-4 translate-y-4"></div>
            
            {/* Image Container */}
            <div className="w-full h-full bg-[#1E293B] rounded-tr-[100px] rounded-bl-[100px] overflow-hidden shadow-premium border border-[#D4AF37]/30 flex flex-col relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url("https://picsum.photos/seed/luxurybuilding3/1920/1080")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent"></div>
              
              <div className="absolute bottom-6 right-6 bg-[#0F172A]/90 p-4 border-r-4 gold-border border-[#D4AF37]">
                <span className="block text-xs gold-text">مشروع اللؤلؤة المميز</span>
                <span className="block text-sm font-bold text-white">القاهرة الجديدة، مصر</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
