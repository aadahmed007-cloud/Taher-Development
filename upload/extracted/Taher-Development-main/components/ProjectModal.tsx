import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import Image from 'next/image';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir="rtl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-[#1E293B] rounded-sm shadow-premium border border-[#D4AF37]/30 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-[#0F172A]">
               <h3 className="text-2xl font-bold text-white font-cairo">
                  {project.title} <span className="text-[#D4AF37] text-sm md:text-base pr-4 border-r border-slate-700 mr-4"> {project.location}</span>
               </h3>
               <button 
                 onClick={onClose}
                 className="text-slate-400 hover:text-[#D4AF37] hover:rotate-90 transition-all duration-300"
               >
                 <X size={28} />
               </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto font-cairo custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 {/* Details */}
                 <div>
                   <h4 className="text-[#D4AF37] font-bold mb-4 border-b border-[#D4AF37]/20 pb-2">نظرة عامة على المشروع</h4>
                   <p className="text-slate-300 leading-relaxed font-light mb-8 text-sm md:text-base">
                     {project.description || "يتميز هذا المشروع بتصميمه العصري الذي يواكب أحدث المعايير العالمية في البناء والتشييد، مقدماً تجربة فريدة تجمع بين رفاهية العيش والاستثمار الآمن في أكثر المواقع تميزاً."}
                   </p>

                   <h4 className="text-[#D4AF37] font-bold mb-4 border-b border-[#D4AF37]/20 pb-2">المرافق والخدمات</h4>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {(project.amenities || [
                       "مساحات خضراء ولاندسكيب", 
                       "أنظمة أمن وحراسة 24/7", 
                       "كاميرات مراقبة ذكية", 
                       "جراجات خاصة تحت الأرض",
                       "نادي صحي رياضي",
                       "منطقة ألعاب أطفال"
                     ]).map((amenity: string, idx: number) => (
                       <li key={idx} className="flex items-center text-slate-300 font-light text-sm">
                         <Check size={16} className="text-[#D4AF37] ml-2 shrink-0" />
                         {amenity}
                       </li>
                     ))}
                   </ul>
                 </div>

                 {/* Floor Plans / Media */}
                 <div>
                    <h4 className="text-[#D4AF37] font-bold mb-4 border-b border-[#D4AF37]/20 pb-2">المخططات والمساحات</h4>
                    <div className="space-y-6">
                      {(project.floorPlans || [
                        {name: "نموذج (أ) - فاخر", image: "https://picsum.photos/seed/plan1/500/300", area: "180 - 220 m²"},
                        {name: "نموذج (ب) - مميز", image: "https://picsum.photos/seed/plan2/500/300", area: "120 - 150 m²"}
                      ]).map((plan: any, idx: number) => (
                        <div key={idx} className="bg-[#0F172A] border border-slate-800 rounded-sm overflow-hidden group">
                          <div className="relative h-40 w-full overflow-hidden">
                            <Image 
                               src={plan.image}
                               alt={plan.name}
                               fill
                               className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                               referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="p-4 flex justify-between items-center bg-[#0a0f1c]">
                            <span className="text-white font-bold text-sm tracking-wide">{plan.name}</span>
                            <span className="text-[#D4AF37] text-xs font-mono" dir="ltr">{plan.area}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
