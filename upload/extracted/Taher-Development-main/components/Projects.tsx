'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectModal from './ProjectModal';
import VideoModal from './VideoModal';

function ProjectCarousel({ images, title, type, videoLink, onPlayVideo }: { images: string[], title: string, type: string, videoLink?: string, onPlayVideo?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-64 w-full overflow-hidden group/carousel">
      <div 
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0">
            <Image
              src={img}
              alt={`${title} - صورة ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-60 pointer-events-none"></div>
      
      <div className="absolute top-4 right-4 bg-[#0F172A]/90 text-[#D4AF37] text-xs font-bold px-4 py-1.5 rounded-sm border-r-2 gold-border shadow-md backdrop-blur-sm pointer-events-none z-10">
        {type}
      </div>

      {videoLink && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onPlayVideo) onPlayVideo();
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 border-2 border-[#D4AF37]/50 rounded-full flex items-center justify-center text-[#D4AF37] opacity-80 hover:opacity-100 hover:scale-110 hover:bg-black/70 hover:border-[#D4AF37] transition-all duration-300 z-10"
        >
          <Play fill="currentColor" size={24} className="ml-1" />
        </button>
      )}

      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0F172A] hover:scale-110 z-10"
          >
            <ChevronRight size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0F172A] hover:scale-110 z-10"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-[#D4AF37] w-4' : 'bg-white/50 w-1.5 hover:bg-white'} shadow-sm`}
                aria-label={`الذهاب للصورة ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      id: 1,
      title: "مجمع طاهر الفاخر",
      location: "القاهرة الجديدة",
      images: [
        "https://picsum.photos/seed/taherresidence1/800/600",
        "https://picsum.photos/seed/taherresidence2/800/600",
        "https://picsum.photos/seed/taherresidence3/800/600",
      ],
      type: "سكني متكامل",
      videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    },
    {
      id: 2,
      title: "أبراج النيل بلازا",
      location: "الزمالك",
      images: [
        "https://picsum.photos/seed/nileplaza1/800/600",
        "https://picsum.photos/seed/nileplaza2/800/600",
        "https://picsum.photos/seed/nileplaza3/800/600",
      ],
      type: "تجاري و إداري",
    },
    {
      id: 3,
      title: "كمبوند الأفق الأخضر",
      location: "الشيخ زايد",
      images: [
        "https://picsum.photos/seed/greenhorizon1/800/600",
        "https://picsum.photos/seed/greenhorizon2/800/600",
      ],
      type: "فيلات وتوين هاوس",
      videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    },
    {
      id: 4,
      title: "طاهر مول للأعمال",
      location: "العاصمة الإدارية",
      images: [
        "https://picsum.photos/seed/businessmall1/800/600",
        "https://picsum.photos/seed/businessmall2/800/600",
        "https://picsum.photos/seed/businessmall3/800/600",
      ],
      type: "مجمعات تجارية",
    },
    {
      id: 5,
      title: "فيلات الساحل الشمالي",
      location: "رأس الحكمة",
      images: [
        "https://picsum.photos/seed/northcoast1/800/600",
        "https://picsum.photos/seed/northcoast2/800/600",
      ],
      type: "مصيف فاخر",
    },
    {
      id: 6,
      title: "أكوا ريزيدنس",
      location: "العين السخنة",
      images: [
        "https://picsum.photos/seed/aquares1/800/600",
        "https://picsum.photos/seed/aquares2/800/600",
      ],
      type: "شاليهات فاخرة",
    },
    {
      id: 7,
      title: "جولدن فيو هيلز",
      location: "التجمع الخامس",
      images: [
        "https://picsum.photos/seed/goldenview1/800/600",
        "https://picsum.photos/seed/goldenview2/800/600",
      ],
      type: "فيلات مستقلة",
    },
    {
      id: 8,
      title: "رويال تاورز",
      location: "المنصورة الجديدة",
      images: [
        "https://picsum.photos/seed/royaltowers1/800/600",
        "https://picsum.photos/seed/royaltowers2/800/600",
      ],
      type: "أبراج سكنية",
    },
    {
      id: 9,
      title: "منتجع لاجونا بيتش",
      location: "الغردقة",
      images: [
        "https://picsum.photos/seed/lagunabeach1/800/600",
        "https://picsum.photos/seed/lagunabeach2/800/600",
      ],
      type: "منتجع سياحي",
    }
  ];

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="py-24 bg-[#0F172A] font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 gold-gradient"></div>
              <span className="text-xs tracking-[0.3em] uppercase gold-text font-bold">محفظة أعمالنا</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              مشاريعنا <span className="gold-text">المميزة</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl font-light">
              اكتشف مجموعة منتقاة من أحدث مشروعاتنا العقارية التي تم تصميمها لتوفير نمط حياة استثنائي يجمع بين الهدوء، الفخامة، والموقع الاستراتيجي.
            </p>
          </div>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="gold-text hover:text-[#0F172A] border gold-border hover:bg-[#D4AF37] px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap"
          >
            {showAll ? "عرض أقل" : "عرض جميع المشاريع"}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, delay: idx * 0.15, ease: "easeOut" } }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
              viewport={{ once: true, margin: "-50px" }}
              key={project.id}
              className="group bg-[#1E293B] rounded-sm overflow-hidden shadow-premium border border-slate-800 hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500 flex flex-col relative z-0 hover:z-10"
            >
              <ProjectCarousel 
                images={project.images} 
                title={project.title} 
                type={project.type} 
                videoLink={project.videoLink}
                onPlayVideo={() => project.videoLink && setSelectedVideo(project.videoLink)}
              />
              
              <div className="p-6 relative flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:gold-text transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-slate-400 gap-2 mb-6">
                    <MapPin size={18} className="gold-text" />
                    <span className="font-light text-sm">{project.location}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full border-t border-slate-700 pt-4 gold-text hover:text-white font-bold text-sm tracking-wide transition-all duration-300 text-right flex items-center gap-2 group-hover:border-[#D4AF37]"
                >
                  <span className="w-4 h-[1px] gold-gradient"></span>
                  تفاصيل المشروع
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      <VideoModal
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}
