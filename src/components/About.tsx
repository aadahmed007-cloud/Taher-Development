'use client';

import { Award, Lightbulb, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    {
      icon: <Award className="w-10 h-10 text-[#0F172A]" strokeWidth={1.5} />,
      title: "الجودة الفائقة",
      description: "نلتزم بأعلى معايير الجودة العالمية في جميع مراحل البناء والتشطيب لضمان استدامة وروعة استثماراتك."
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-[#0F172A]" strokeWidth={1.5} />,
      title: "الابتكار المعماري",
      description: "تصاميم عصرية ورؤية مستقبلية تلبي احتياجات نمط الحياة الحديث، وتخلق مساحات ملهمة في كل تفصيلة."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-[#0F172A]" strokeWidth={1.5} />,
      title: "الثقة والمصداقية",
      description: "علاقتنا بعملائنا مبنية على أسس راسخة من الشفافية والالتزام المطلق بمواعيد التسليم والمواصفات المتعاقد عليها."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0F1C] font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 gold-gradient"></div>
            <span className="text-xs tracking-[0.3em] uppercase gold-text font-bold">رؤيتنا وقيمنا</span>
            <div className="h-[1px] w-8 gold-gradient"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            عن <span className="gold-text">طاهر للتطوير العقاري</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-light">
            منذ نشأتها، أخذت شركة طاهر للتطوير العقاري على عاتقها تقديم أرقى المستويات لعملائها في كل جوانب التطوير العمراني في مصر. شغفنا بالكمال ودقتنا في التنفيذ يجعلنا خيارك الأمثل للسكن الراقي والاستثمار الآمن.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 * idx }}
              key={idx}
              className="bg-[#1E293B] border border-[#D4AF37]/20 p-8 rounded-sm shadow-premium hover:border-[#D4AF37] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full gold-gradient opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

              <div className="w-16 h-16 rounded-sm gold-gradient flex items-center justify-center mb-6 shadow-premium transition-transform duration-300 group-hover:scale-105">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed font-light text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
