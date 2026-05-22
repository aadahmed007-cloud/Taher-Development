'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'المقر الرئيسي',
      details: ['القاهرة الجديدة، التجمع الخامس', 'أمام الجامعة الأمريكية، مبنى طاهر للتطوير'],
    },
    {
      icon: Phone,
      title: 'الهاتف المباشر',
      details: ['+20 100 123 4567'],
      dir: 'ltr' as const,
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: ['info@taherdevelopment.com'],
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0D1321] font-cairo overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-[15%] left-[-5%] w-[400px] h-[400px] bg-[#C8A84E]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-l from-[#C8A84E] to-transparent" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C8A84E] font-semibold">دعنا نتحدث</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#C8A84E] to-transparent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            اتصل <span className="gold-gradient-text">بنا</span>
          </h2>
          <p className="text-slate-400 text-lg font-light">
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في اتخاذ القرار الأفضل لاستثمارك العقاري.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Right: Contact Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass-card rounded-2xl p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-white mb-8">أرسل رسالة</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name - Floating Label */}
                <div className="floating-label-group">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#080C18] border border-slate-700/50 text-white rounded-xl px-4 py-4 pt-5 focus:outline-none focus:border-[#C8A84E] transition-all text-sm"
                    placeholder=" "
                    required
                    id="contact-name"
                  />
                  <label htmlFor="contact-name">الاسم الكامل</label>
                </div>

                {/* Phone - Floating Label */}
                <div className="floating-label-group">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#080C18] border border-slate-700/50 text-white rounded-xl px-4 py-4 pt-5 focus:outline-none focus:border-[#C8A84E] transition-all text-sm text-right"
                    placeholder=" "
                    dir="ltr"
                    required
                    id="contact-phone"
                  />
                  <label htmlFor="contact-phone">رقم الهاتف</label>
                </div>
              </div>

              {/* Email - Floating Label */}
              <div className="floating-label-group">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#080C18] border border-slate-700/50 text-white rounded-xl px-4 py-4 pt-5 focus:outline-none focus:border-[#C8A84E] transition-all text-sm"
                  placeholder=" "
                  dir="ltr"
                  required
                  id="contact-email"
                />
                <label htmlFor="contact-email">البريد الإلكتروني</label>
              </div>

              {/* Message - Floating Label */}
              <div className="floating-label-group">
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#080C18] border border-slate-700/50 text-white rounded-xl px-4 py-4 pt-5 focus:outline-none focus:border-[#C8A84E] transition-all text-sm resize-none"
                  placeholder=" "
                  required
                  id="contact-message"
                />
                <label htmlFor="contact-message">اكتب استفسارك هنا</label>
              </div>

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium ${
                    submitStatus.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  {submitStatus.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-gradient hover:brightness-110 text-[#080C18] font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-gold hover:shadow-gold-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span className="text-sm font-bold tracking-wide">جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-bold tracking-wide">إرسال الرسالة</span>
                    <Send size={18} className="rotate-180" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Left: Contact Info + Map (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Info Cards */}
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="glass-card rounded-2xl p-5 hover:border-[rgba(200,168,78,0.3)] hover:shadow-gold transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#C8A84E]/10 border border-[#C8A84E]/20 flex items-center justify-center text-[#C8A84E] shrink-0 group-hover:bg-[#C8A84E]/20 transition-colors duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 text-sm tracking-wide">{info.title}</h4>
                      {info.details.map((detail, detailIdx) => (
                        <p
                          key={detailIdx}
                          className="text-slate-400 text-sm leading-relaxed font-light"
                          dir={info.dir || 'rtl'}
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-2xl overflow-hidden border border-[rgba(200,168,78,0.15)] shadow-card relative h-56"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.642954157121!2d31.47271457639598!3d30.047098425268487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822c95350c33d%3A0xeab50d4f13ca8fd!2sNew%20Cairo%20City%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sar!2seg!4v1716301234567!5m2!1sar!2seg"
                title="موقع شركة طاهر للتطوير العقاري على خريطة القاهرة الجديدة"
                className="w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
