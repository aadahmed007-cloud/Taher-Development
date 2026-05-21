// ============================================
// Project Detail Page - /projects/[id]
// Full project details with images carousel,
// amenities, floor plans, price, location, status
// ============================================

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Check,
  Home,
  Ruler,
  CalendarDays,
  Tag,
  Play,
  ArrowRight,
  Building2,
} from "lucide-react";

// Safe JSON parse helper
function safeJsonParse(jsonString: string, fallback: unknown = null): unknown {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

// Project detail data type
interface ProjectDetail {
  id: string;
  titleAr: string;
  locationAr: string;
  price: string;
  area: string | null;
  descriptionAr: string | null;
  status: string;
  type: string | null;
  videoLink: string | null;
  images: string[];
  amenities: string[];
  floorPlans: Array<{ name: string; image: string; area: string }>;
  createdAt: Date;
  updatedAt: Date;
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const project = await db.project.findUnique({ where: { id } });
    if (!project) {
      return { title: "مشروع غير موجود | طاهر للتطوير العقاري" };
    }

    return {
      title: `${project.titleAr} | طاهر للتطوير العقاري`,
      description:
        project.descriptionAr ||
        `اكتشف مشروع ${project.titleAr} في ${project.locationAr} - ${project.price}`,
      openGraph: {
        title: `${project.titleAr} | طاهر للتطوير العقاري`,
        description:
          project.descriptionAr ||
          `اكتشف مشروع ${project.titleAr} في ${project.locationAr}`,
        images: project.images
          ? [{ url: (safeJsonParse(project.images, []) as string[])[0] || "/og-image.jpg" }]
          : [{ url: "/og-image.jpg" }],
        type: "article",
        locale: "ar_EG",
      },
    };
  } catch {
    return { title: "مشروع | طاهر للتطوير العقاري" };
  }
}

// Fetch project from database
async function getProject(id: string): Promise<ProjectDetail | null> {
  const project = await db.project.findUnique({ where: { id } });

  if (!project) return null;

  return {
    ...project,
    images: safeJsonParse(project.images, []) as string[],
    amenities: safeJsonParse(project.amenities, []) as string[],
    floorPlans: safeJsonParse(project.floorPlans, []) as Array<{
      name: string;
      image: string;
      area: string;
    }>,
  };
}

// Status badge colors
function getStatusStyle(status: string): string {
  switch (status) {
    case "متاح للبيع":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "تحت الإنشاء":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "مباع بالكامل":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "متاح للإيجار":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  }
}

// ============================================
// Image Carousel (Server component with client interactivity via separate component)
// ============================================
function ProjectImageCarousel({ images, title }: { images: string[]; title: string }) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-[#1E293B] flex items-center justify-center rounded-sm">
        <div className="text-center">
          <Building2 size={48} className="mx-auto text-slate-600 mb-3" />
          <span className="text-slate-500 text-lg">لا توجد صورة متاحة</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-sm overflow-hidden group/carousel">
      {/* Main image display - first image by default, JS enhances with carousel */}
      {images.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-700"
          id={`slide-${idx}`}
          style={{ opacity: idx === 0 ? 1 : 0 }}
        >
          <Image
            src={img}
            alt={`${title} - صورة ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60 pointer-events-none"></div>

      {/* Navigation arrows - only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => {
              const slides = document.querySelectorAll('[id^="slide-"]');
              let currentIdx = 0;
              slides.forEach((s, i) => {
                if ((s as HTMLElement).style.opacity === "1") currentIdx = i;
              });
              const nextIdx = currentIdx === 0 ? slides.length - 1 : currentIdx - 1;
              slides.forEach((s, i) => {
                (s as HTMLElement).style.opacity = i === nextIdx ? "1" : "0";
              });
              // Update dots
              const dots = document.querySelectorAll('[data-dot]');
              dots.forEach((d, i) => {
                (d as HTMLElement).className =
                  i === nextIdx
                    ? "h-2 w-6 rounded-full bg-[#D4AF37] transition-all duration-300"
                    : "h-2 w-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300";
              });
            }}
            className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0F172A] hover:scale-110 z-10"
            aria-label="الصورة السابقة"
          >
            <ChevronRight size={24} />
          </button>
          <button
            onClick={() => {
              const slides = document.querySelectorAll('[id^="slide-"]');
              let currentIdx = 0;
              slides.forEach((s, i) => {
                if ((s as HTMLElement).style.opacity === "1") currentIdx = i;
              });
              const nextIdx = currentIdx === slides.length - 1 ? 0 : currentIdx + 1;
              slides.forEach((s, i) => {
                (s as HTMLElement).style.opacity = i === nextIdx ? "1" : "0";
              });
              // Update dots
              const dots = document.querySelectorAll('[data-dot]');
              dots.forEach((d, i) => {
                (d as HTMLElement).className =
                  i === nextIdx
                    ? "h-2 w-6 rounded-full bg-[#D4AF37] transition-all duration-300"
                    : "h-2 w-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300";
              });
            }}
            className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0F172A] hover:scale-110 z-10"
            aria-label="الصورة التالية"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                data-dot
                onClick={() => {
                  const slides = document.querySelectorAll('[id^="slide-"]');
                  slides.forEach((s, i) => {
                    (s as HTMLElement).style.opacity = i === idx ? "1" : "0";
                  });
                  const dots = document.querySelectorAll('[data-dot]');
                  dots.forEach((d, i) => {
                    (d as HTMLElement).className =
                      i === idx
                        ? "h-2 w-6 rounded-full bg-[#D4AF37] transition-all duration-300"
                        : "h-2 w-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300";
                  });
                }}
                className={
                  idx === 0
                    ? "h-2 w-6 rounded-full bg-[#D4AF37] transition-all duration-300"
                    : "h-2 w-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300"
                }
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
// Main Page Component
// ============================================
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0F172A] font-cairo">
      {/* Breadcrumb Navigation */}
      <nav
        className="bg-[#0a0f1c] border-b border-slate-800 py-4"
        aria-label="تنقل الصفحات"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-slate-400 hover:text-[#D4AF37] transition-colors"
              >
                الرئيسية
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li>
              <Link
                href="/#projects"
                className="text-slate-400 hover:text-[#D4AF37] transition-colors"
              >
                المشاريع
              </Link>
            </li>
            <li className="text-slate-600">/</li>
            <li className="text-[#D4AF37] font-medium">{project.titleAr}</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Project Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {project.titleAr}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#D4AF37]" />
                  <span className="font-light">{project.locationAr}</span>
                </div>
                {project.type && (
                  <div className="flex items-center gap-2">
                    <Tag size={18} className="text-[#D4AF37]" />
                    <span className="font-light">{project.type}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-sm text-sm font-bold border ${getStatusStyle(project.status)}`}
              >
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="mb-10 md:mb-14">
          <ProjectImageCarousel images={project.images} title={project.titleAr} />

          {/* Thumbnail strip */}
          {project.images && project.images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 custom-scrollbar">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const slides = document.querySelectorAll('[id^="slide-"]');
                    slides.forEach((s, i) => {
                      (s as HTMLElement).style.opacity = i === idx ? "1" : "0";
                    });
                    const dots = document.querySelectorAll('[data-dot]');
                    dots.forEach((d, i) => {
                      (d as HTMLElement).className =
                        i === idx
                          ? "h-2 w-6 rounded-full bg-[#D4AF37] transition-all duration-300"
                          : "h-2 w-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300";
                    });
                    // Scroll carousel into view
                    document
                      .getElementById("main-carousel")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="relative w-20 h-16 md:w-28 md:h-20 flex-shrink-0 rounded-sm overflow-hidden border-2 border-transparent hover:border-[#D4AF37] transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <Image
                    src={img}
                    alt={`${project.titleAr} - صورة مصغرة ${idx + 1}`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    sizes="112px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Key Info Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 md:mb-14">
          <div className="bg-[#1E293B] border border-slate-800 rounded-sm p-5 text-center hover:border-[#D4AF37]/30 transition-colors">
            <Tag size={24} className="mx-auto text-[#D4AF37] mb-2" />
            <p className="text-slate-400 text-xs mb-1">السعر</p>
            <p className="text-white font-bold text-lg" dir="ltr">
              {project.price}
            </p>
          </div>
          {project.area && (
            <div className="bg-[#1E293B] border border-slate-800 rounded-sm p-5 text-center hover:border-[#D4AF37]/30 transition-colors">
              <Ruler size={24} className="mx-auto text-[#D4AF37] mb-2" />
              <p className="text-slate-400 text-xs mb-1">المساحة</p>
              <p className="text-white font-bold text-lg" dir="ltr">
                {project.area}
              </p>
            </div>
          )}
          <div className="bg-[#1E293B] border border-slate-800 rounded-sm p-5 text-center hover:border-[#D4AF37]/30 transition-colors">
            <CalendarDays size={24} className="mx-auto text-[#D4AF37] mb-2" />
            <p className="text-slate-400 text-xs mb-1">الحالة</p>
            <p className="text-white font-bold text-lg">{project.status}</p>
          </div>
          {project.type && (
            <div className="bg-[#1E293B] border border-slate-800 rounded-sm p-5 text-center hover:border-[#D4AF37]/30 transition-colors">
              <Home size={24} className="mx-auto text-[#D4AF37] mb-2" />
              <p className="text-slate-400 text-xs mb-1">النوع</p>
              <p className="text-white font-bold text-lg">{project.type}</p>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-14">
          {/* Description & Amenities - 2 cols */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-4 border-b border-[#D4AF37]/20 pb-3">
                وصف المشروع
              </h2>
              <p className="text-slate-300 leading-relaxed font-light text-base md:text-lg">
                {project.descriptionAr ||
                  "يتميز هذا المشروع بتصميمه العصري الذي يواكب أحدث المعايير العالمية في البناء والتشييد، مقدماً تجربة فريدة تجمع بين رفاهية العيش والاستثمار الآمن في أكثر المواقع تميزاً."}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-[#D4AF37] mb-4 border-b border-[#D4AF37]/20 pb-3">
                المرافق والخدمات
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(project.amenities && project.amenities.length > 0
                  ? project.amenities
                  : [
                      "مساحات خضراء ولاندسكيب",
                      "أنظمة أمن وحراسة 24/7",
                      "كاميرات مراقبة ذكية",
                      "جراجات خاصة تحت الأرض",
                      "نادي صحي رياضي",
                      "منطقة ألعاب أطفال",
                    ]
                ).map((amenity: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center text-slate-300 font-light text-sm md:text-base bg-[#1E293B] border border-slate-800 rounded-sm p-3 hover:border-[#D4AF37]/30 transition-colors"
                  >
                    <Check
                      size={18}
                      className="text-[#D4AF37] ml-3 shrink-0"
                    />
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar - Quick Info */}
          <div className="space-y-6">
            {/* Video link */}
            {project.videoLink && (
              <a
                href={project.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#1E293B] border border-[#D4AF37]/30 rounded-sm p-5 text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300 group"
              >
                <Play
                  size={22}
                  className="group-hover:scale-110 transition-transform"
                />
                مشاهدة فيديو المشروع
              </a>
            )}

            {/* Project Info Card */}
            <div className="bg-[#1E293B] border border-slate-800 rounded-sm p-6">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-3">
                معلومات المشروع
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">الموقع</span>
                  <span className="text-white text-sm font-medium">
                    {project.locationAr}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">السعر</span>
                  <span className="text-[#D4AF37] text-sm font-bold" dir="ltr">
                    {project.price}
                  </span>
                </div>
                {project.area && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">المساحة</span>
                    <span className="text-white text-sm font-medium" dir="ltr">
                      {project.area}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">الحالة</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-bold border ${getStatusStyle(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>
                {project.type && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">النوع</span>
                    <span className="text-white text-sm font-medium">
                      {project.type}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floor Plans Section */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 border-b border-[#D4AF37]/20 pb-3">
            المخططات والمساحات
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(project.floorPlans && project.floorPlans.length > 0
              ? project.floorPlans
              : [
                  {
                    name: "نموذج (أ) - فاخر",
                    image: "https://picsum.photos/seed/plan1/500/300",
                    area: "180 - 220 m²",
                  },
                  {
                    name: "نموذج (ب) - مميز",
                    image: "https://picsum.photos/seed/plan2/500/300",
                    area: "120 - 150 m²",
                  },
                ]
            ).map(
              (
                plan: { name: string; image: string; area: string },
                idx: number
              ) => (
                <div
                  key={idx}
                  className="bg-[#1E293B] border border-slate-800 rounded-sm overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.1)]"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 flex justify-between items-center bg-[#0a0f1c]">
                    <span className="text-white font-bold text-sm tracking-wide">
                      {plan.name}
                    </span>
                    <span
                      className="text-[#D4AF37] text-xs font-mono"
                      dir="ltr"
                    >
                      {plan.area}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Contact CTA Section */}
        <section className="bg-gradient-to-l from-[#1E293B] to-[#0F172A] border border-[#D4AF37]/20 rounded-sm p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            مهتم بهذا المشروع؟
          </h2>
          <p className="text-slate-400 font-light max-w-2xl mx-auto mb-8 text-base md:text-lg">
            تواصل معنا الآن للحصول على مزيد من التفاصيل حول مشروع{" "}
            {project.titleAr}. فريقنا جاهز لمساعدتك في اتخاذ القرار الأفضل.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0F172A] font-bold px-8 py-4 rounded-sm hover:bg-[#F1D592] transition-all duration-300 text-sm md:text-base tracking-wide"
            >
              <Mail size={20} />
              أرسل استفسارك
              <ArrowRight size={18} className="rotate-180" />
            </Link>
            <a
              href="tel:+201000000000"
              className="inline-flex items-center gap-2 border border-[#D4AF37] text-[#D4AF37] font-bold px-8 py-4 rounded-sm hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-300 text-sm md:text-base tracking-wide"
            >
              <Phone size={20} />
              اتصل بنا الآن
            </a>
          </div>
        </section>

        {/* Back to Projects */}
        <div className="mt-8 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#D4AF37] font-light transition-colors text-sm"
          >
            <ArrowRight size={16} />
            العودة إلى جميع المشاريع
          </Link>
        </div>
      </div>
    </main>
  );
}
