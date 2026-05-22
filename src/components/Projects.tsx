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

const filterTabs = [
  { label: 'الكل', value: 'all' },
  { label: 'سكني', value: 'سكني' },
  { label: 'تجاري', value: 'تجاري' },
  { label: 'إداري', value: 'إداري' },
];

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
    <div className="relative h-full w-full overflow-hidden group/carousel">
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
              className="object-cover group-hover/carousel:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-transparent to-transparent opacity-70 pointer-events-none" />

      {/* Type badge */}
      <div className="absolute top-4 right-4 bg-[#080C18]/80 text-[#C8A84E] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#C8A84E]/20 shadow-md backdrop-blur-sm pointer-events-none z-10">
        {type}
      </div>

      {/* Video play button */}
      {videoLink && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onPlayVideo) onPlayVideo();
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 border-2 border-[#C8A84E]/40 rounded-full flex items-center justify-center text-[#C8A84E] opacity-0 group-hover/carousel:opacity-100 hover:opacity-100 hover:scale-110 hover:bg-black/60 hover:border-[#C8A84E] transition-all duration-300 z-10"
        >
          <Play fill="currentColor" size={22} className="ms-1" />
        </button>
      )}

      {/* Carousel arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-lg bg-black/40 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#C8A84E] hover:text-[#080C18] z-10"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 rounded-lg bg-black/40 border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#C8A84E] hover:text-[#080C18] z-10"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-1 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-[#C8A84E] w-4' : 'bg-white/40 w-1.5 hover:bg-white/60'}`}
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
// ============================================
export default function Projects({ projects }: { projects: ProjectData[] }) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.type === activeFilter);

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#0D1321] font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-l from-[#C8A84E] to-transparent" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C8A84E] font-semibold">محفظة أعمالنا</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#C8A84E] to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            مشاريعنا <span className="gold-gradient-text">المميزة</span>
          </h2>
          <p className="text-slate-400 text-lg font-light">
            اكتشف مجموعة منتقاة من أحدث مشروعاتنا العقارية المصممة لتوفير نمط حياة استثنائي.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === tab.value
                  ? 'gold-gradient text-[#080C18] shadow-gold'
                  : 'border border-[rgba(200,168,78,0.15)] text-slate-400 hover:text-[#C8A84E] hover:border-[#C8A84E]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - Bento Style */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">لا توجد مشاريع حالياً. ترقبوا مشاريعنا القادمة!</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project, idx) => {
                const isLarge = idx < 2;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    key={project.id}
                    className={`group relative rounded-2xl overflow-hidden border border-[rgba(200,168,78,0.1)] hover:border-[rgba(200,168,78,0.3)] hover:shadow-gold transition-all duration-500 cursor-pointer ${
                      isLarge ? 'md:col-span-1 h-[420px]' : 'h-[360px]'
                    }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Image */}
                    {project.images && project.images.length > 0 ? (
                      <ProjectCarousel
                        images={project.images}
                        title={project.titleAr}
                        type={project.type || project.status}
                        videoLink={project.videoLink || undefined}
                        onPlayVideo={() => project.videoLink && setSelectedVideo(project.videoLink)}
                      />
                    ) : (
                      <div className="h-full w-full bg-[#1A2236] flex items-center justify-center">
                        <span className="text-slate-500 text-sm">لا توجد صورة</span>
                      </div>
                    )}

                    {/* Hover overlay with details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-[#080C18]/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none" />

                    {/* Content overlay */}
                    <div className="absolute bottom-0 right-0 left-0 p-6 z-10">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {/* Price badge */}
                        {project.price && (
                          <div className="inline-flex items-center gap-1.5 bg-[#C8A84E]/15 border border-[#C8A84E]/25 rounded-lg px-3 py-1 mb-3 backdrop-blur-sm">
                            <span className="text-[#C8A84E] text-sm font-bold">{project.price}</span>
                          </div>
                        )}

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#C8A84E] transition-colors duration-300">
                          {project.titleAr}
                        </h3>

                        <div className="flex items-center text-slate-400 gap-2 mb-3">
                          <MapPin size={16} className="text-[#C8A84E]" />
                          <span className="font-light text-sm">{project.locationAr}</span>
                        </div>

                        {/* Hover-reveal details */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                              }}
                              className="text-[#C8A84E] text-sm font-bold flex items-center gap-1.5 hover:underline"
                            >
                              تفاصيل المشروع
                              <span className="w-4 h-[1px] bg-[#C8A84E]" />
                            </button>
                            <Link
                              href={`/projects/${project.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-slate-400 hover:text-[#C8A84E] text-xs font-medium transition-colors duration-300 border border-slate-700 hover:border-[#C8A84E] px-3 py-1.5 rounded-lg"
                            >
                              عرض التفاصيل
                              <ExternalLink size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
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
