'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'تم إرسال رسالتك بنجاح!',
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'حدث خطأ في الإرسال. يرجى المحاولة لاحقاً.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0F1C] font-cairo overflow-hidden relative">
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 gold-gradient"></div>
            <span className="text-xs tracking-[0.3em] uppercase gold-text font-bold">دعنا نتحدث</span>
            <div className="h-[1px] w-8 gold-gradient"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            اتصل <span className="gold-text">بنا</span>
          </h2>
          <p className="text-slate-400 text-lg font-light">
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في اتخاذ القرار الأفضل لاستثمارك العقاري.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#0F172A] rounded-sm shadow-premium border border-[#D4AF37]/20 overflow-hidden">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 relative bg-[#1E293B]"
          >
            <div className="absolute top-0 right-0 w-1 h-full gold-gradient"></div>
            <h3 className="text-2xl font-bold text-white mb-8">أرسل رسالة</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">الاسم</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner"
                    placeholder="الاسم الكامل"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner text-right"
                    placeholder="رقم الهاتف"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner"
                  placeholder="example@email.com"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">الرسالة</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner resize-none"
                  placeholder="اكتب استفسارك هنا..."
                  required
                ></textarea>
              </div>

              {/* Status Message */}
              {submitStatus && (
                <div className={`p-4 rounded-sm text-sm font-medium ${
                  submitStatus.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-gradient hover:brightness-110 text-[#0F172A] font-bold py-4 rounded-sm flex items-center justify-center gap-3 transition-all duration-300 mt-4 shadow-premium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span className="uppercase tracking-widest text-sm">جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <span className="uppercase tracking-widest text-sm">إرسال الرسالة</span>
                    <Send size={18} className="rotate-180" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-[#0F172A] p-8 md:p-12 border-r border-slate-800 flex flex-col justify-between space-y-12"
          >
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">معلومات التواصل</h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border gold-border rounded-sm flex items-center justify-center text-[#D4AF37] shrink-0 bg-[#1E293B]">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-wide">المقر الرئيسي</h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    القاهرة الجديدة، التجمع الخامس<br />
                    أمام الجامعة الأمريكية، مبنى طاهر للتطوير.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border gold-border rounded-sm flex items-center justify-center text-[#D4AF37] shrink-0 bg-[#1E293B]">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-wide">الهاتف المباشر</h4>
                  <p className="text-slate-400 text-sm font-light" dir="ltr">
                    +20 100 123 4567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border gold-border rounded-sm flex items-center justify-center text-[#D4AF37] shrink-0 bg-[#1E293B]">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 tracking-wide">البريد الإلكتروني</h4>
                  <p className="text-slate-400 text-sm font-light">
                    info@taherdevelopment.com
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-48 rounded-sm overflow-hidden border border-[#D4AF37]/30 shadow-premium relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.642954157121!2d31.47271457639598!3d30.047098425268487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822c95350c33d%3A0xeab50d4f13ca8fd!2sNew%20Cairo%20City%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sar!2seg!4v1716301234567!5m2!1sar!2seg"
                title="موقع شركة طاهر للتطوير العقاري على خريطة القاهرة الجديدة"
                className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
