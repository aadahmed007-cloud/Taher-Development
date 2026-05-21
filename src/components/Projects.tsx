'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronLeft, ChevronRight, Play, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectModal from './ProjectModal';
import VideoModal from './VideoModal';

// ============================================
// Project type definition matching the database schema
// ============================================
export interface ProjectData {
  id: string;
  titleAr: string;
  locationAr: string;
  price: string;
  area?: string | null;
  descriptionAr?: string | null;
  status: string;
  type?: string | null;
  videoLink?: string | null;
  images: string[];
  amenities: string[];
  floorPlans: Array<{ name: string; image: string; area: string }>;
  createdAt: string;
}

function ProjectCarousel({
  images,
  title,
  type,
  videoLink,
  onPlayVideo,
}: {
  images: string[];
  title: string;
  type: string;
  videoLink?: string;
  onPlayVideo?: () => void;
}) {
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
        dir="ltr"
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
          <Play fill="currentColor" size={24} className="ms-1" />
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

// ============================================
// Main Projects Component
// Receives projects from server component (dynamic DB data)
// ============================================
export default function Projects({ projects }: { projects: ProjectData[] }) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

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
          {projects.length > 6 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="gold-text hover:text-[#0F172A] border gold-border hover:bg-[#D4AF37] px-8 py-3 rounded-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap"
            >
              {showAll ? "عرض أقل" : "عرض جميع المشاريع"}
            </button>
          )}
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">لا توجد مشاريع حالياً. ترقبوا مشاريعنا القادمة!</p>
          </div>
        ) : (
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
                {project.images && project.images.length > 0 ? (
                  <ProjectCarousel
                    images={project.images}
                    title={project.titleAr}
                    type={project.type || project.status}
                    videoLink={project.videoLink || undefined}
                    onPlayVideo={() => project.videoLink && setSelectedVideo(project.videoLink)}
                  />
                ) : (
                  <div className="h-64 w-full bg-[#1E293B] flex items-center justify-center">
                    <span className="text-slate-500 text-sm">لا توجد صورة</span>
                  </div>
                )}

                <div className="p-6 relative flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {project.titleAr}
                    </h3>
                    <div className="flex items-center text-slate-400 gap-2 mb-6">
                      <MapPin size={18} className="gold-text" />
                      <span className="font-light text-sm">{project.locationAr}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-700 pt-4 flex items-center justify-between group-hover:border-[#D4AF37]">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="gold-text hover:text-white font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="w-4 h-[1px] gold-gradient"></span>
                      تفاصيل المشروع
                    </button>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#D4AF37] text-xs font-medium transition-colors duration-300 border border-slate-700 hover:border-[#D4AF37] px-3 py-1.5 rounded-sm"
                    >
                      عرض التفاصيل
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
