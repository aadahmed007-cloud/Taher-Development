'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mail, MailOpen, Trash2, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const markAsRead = async (id: string) => {
    // This would typically be a PATCH to /api/leads/[id]
    // For now, update locally
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, isRead: true } : lead
      )
    );
  };

  const unreadCount = leads.filter((l) => !l.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">الرسائل الواردة</h2>
          <p className="text-slate-400 text-sm">
            استعرض رسائل العملاء والاستفسارات
            {unreadCount > 0 && (
              <span className="text-[#D4AF37] font-bold mr-2">({unreadCount} جديد)</span>
            )}
          </p>
        </div>
        <button
          onClick={fetchLeads}
          className="px-4 py-2 border border-slate-700 text-slate-300 font-bold rounded-sm hover:bg-slate-800 transition-colors text-sm flex items-center gap-2"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          تحديث
        </button>
      </div>

      {isLoading ? (
        <div className="bg-[#1E293B] border border-[#D4AF37]/10 rounded-sm shadow-premium overflow-hidden min-h-[400px] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#D4AF37]" />
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-[#1E293B] border border-[#D4AF37]/10 rounded-sm shadow-premium overflow-hidden min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl text-slate-300 font-bold mb-2">لا توجد رسائل جديدة</h3>
            <p className="text-slate-500">سيظهر هنا بريد العملاء والاستفسارات بمجرد استلامها.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {leads.map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`bg-[#1E293B] border rounded-sm overflow-hidden cursor-pointer transition-all hover:border-[#D4AF37]/30 ${
                  lead.isRead ? 'border-slate-800' : 'border-[#D4AF37]/20 bg-[#1E293B]'
                }`}
                onClick={() => {
                  setSelectedLead(lead);
                  if (!lead.isRead) markAsRead(lead.id);
                }}
              >
                <div className="p-4 md:p-6 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    lead.isRead ? 'bg-slate-800 text-slate-500' : 'bg-[#D4AF37]/10 text-[#D4AF37]'
                  }`}>
                    {lead.isRead ? <MailOpen size={20} /> : <Mail size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h4 className="text-white font-bold text-sm truncate">{lead.name}</h4>
                      <span className="text-slate-500 text-xs whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-1" dir="ltr">{lead.email}</p>
                    <p className="text-slate-500 text-xs truncate">{lead.message}</p>
                  </div>
                  {!lead.isRead && (
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0 mt-2"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir="rtl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#1E293B] rounded-sm shadow-premium border border-[#D4AF37]/30 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">تفاصيل الرسالة</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-widest">الاسم</span>
                  <p className="text-white font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-widest">البريد الإلكتروني</span>
                  <p className="text-white font-medium" dir="ltr">{selectedLead.email}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-widest">رقم الهاتف</span>
                  <p className="text-white font-medium" dir="ltr">{selectedLead.phone}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-widest">الرسالة</span>
                  <p className="text-slate-300 leading-relaxed">{selectedLead.message}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-xs uppercase tracking-widest">تاريخ الإرسال</span>
                  <p className="text-white text-sm">{new Date(selectedLead.createdAt).toLocaleString('ar-EG')}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="mt-6 w-full px-6 py-2.5 border border-slate-700 text-slate-300 font-bold rounded-sm hover:bg-slate-800 transition-colors text-sm"
              >
                إغلاق
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
