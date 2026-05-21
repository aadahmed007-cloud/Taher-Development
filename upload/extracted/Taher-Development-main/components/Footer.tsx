import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1c] border-t border-[#D4AF37]/10 pt-16 pb-8 font-cairo overflow-hidden z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-1 border-r-2 gold-border pr-6 -mr-6">
            <div className="flex items-center mb-6">
              <Logo className="h-10" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
              شركة رائدة في مجال التطوير العقاري، نلتزم بتقديم مشاريع سكنية وتجارية فاخرة تلبي تطلعات عملائنا وترتقي بمفهوم الحياة العصرية.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/TaherRSDev" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-sm border border-slate-800 flex items-center justify-center text-slate-400 hover:border-[#D4AF37] hover:gold-text transition-all bg-[#0F172A] shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-sm border border-slate-800 flex items-center justify-center text-slate-400 hover:border-[#D4AF37] hover:gold-text transition-all bg-[#0F172A] shadow-sm">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-sm border border-slate-800 flex items-center justify-center text-slate-400 hover:border-[#D4AF37] hover:gold-text transition-all bg-[#0F172A] shadow-sm">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-6 font-bold">
              روابط سريعة
            </h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><a href="#" className="hover:gold-text transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>الرئيسية</a></li>
              <li><a href="#about" className="hover:gold-text transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>من نحن</a></li>
              <li><a href="#projects" className="hover:gold-text transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>المشاريع الحالية</a></li>
              <li><a href="#projects" className="hover:gold-text transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>مشاريع مستقبلية</a></li>
              <li><a href="#contact" className="hover:gold-text transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>اتصل بنا</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-6 font-bold">
              خدماتنا
            </h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><a href="#" className="hover:gold-text transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>تطوير المجتمعات السكنية</a></li>
              <li><a href="#" className="hover:gold-text transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>المراكز التجارية والإدارية</a></li>
              <li><a href="#" className="hover:gold-text transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>إدارة المشروعات المشتركة</a></li>
              <li><a href="#" className="hover:gold-text transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>الاستشارات العقارية</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-6 font-bold">
              النشرة البريدية
            </h4>
            <p className="text-slate-400 text-sm mb-6 font-light leading-relaxed">
              اشترك في نشرتنا البريدية ليصلك أحدث الأخبار والمشاريع الحصرية.
            </p>
            <form className="flex border border-[#D4AF37]/30 rounded-sm overflow-hidden focus-within:border-[#D4AF37] transition-all focus-within:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                className="bg-[#1E293B] text-white px-4 py-3 w-full focus:outline-none text-sm font-light placeholder-slate-500"
                dir="ltr"
              />
              <button 
                type="button"
                className="gold-gradient text-[#0F172A] font-bold px-6 py-3 hover:brightness-110 transition-all font-cairo text-sm uppercase tracking-wider"
              >
                اشتراك
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-600 font-cairo tracking-wide uppercase">
            © {new Date().getFullYear()} TAHER DEVELOPMENT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <a href="#" className="hover:gold-text transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:gold-text transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
