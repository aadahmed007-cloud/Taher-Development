import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center font-cairo">
      <div className="text-center px-4">
        <div className="mb-8">
          <span className="text-[180px] md:text-[240px] font-black gold-text leading-none opacity-20">404</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 -mt-20 md:-mt-28">
          الصفحة غير موجودة
        </h1>
        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto font-light leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-10 py-4 gold-gradient text-[#0F172A] font-bold rounded-sm shadow-premium hover:brightness-110 transition-all"
          >
            العودة للرئيسية
          </Link>
          <a
            href="#contact"
            className="px-10 py-4 border gold-border gold-text font-bold rounded-sm hover:bg-[#C8A84E]/10 transition-all"
          >
            تواصل معنا
          </a>
        </div>
      </div>
    </div>
  );
}
