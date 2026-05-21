'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mail, MailOpen, Trash2, Loader2, RefreshCw, Search, AlertCircle, CheckCircle } from 'lucide-react';
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

type FilterTab = 'all' | 'unread' | 'read';

export default function MessagesPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Auto-dismiss notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === id ? { ...lead, isRead: true } : lead
          )
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, isRead: true });
        }
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟ لا يمكن التراجع عن هذا الإجراء.')) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        setSelectedLead(null);
        setNotification({ type: 'success', message: 'تم حذف الرسالة بنجاح' });
      } else {
        const data = await res.json();
        setNotification({ type: 'error', message: data.error || 'فشل حذف الرسالة' });
      }
    } catch {
      setNotification({ type: 'error', message: 'خطأ في الاتصال بالخادم' });
    } finally {
      setIsDeleting(false);
    }
  };

  const unreadCount = leads.filter((l) => !l.isRead).length;

  // Filter leads by search and tab
  const filteredLeads = leads.filter((lead) => {
    // Tab filter
    if (activeFilter === 'unread' && lead.isRead) return false;
    if (activeFilter === 'read' && !lead.isRead) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query) ||
        lead.message.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const filterTabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: 'all', label: 'الكل', count: leads.length },
    { key: 'unread', label: 'غير مقروء', count: unreadCount },
    { key: 'read', label: 'مقروء', count: leads.length - unreadCount },
  ];

  return (
    <div className="space-y-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center gap-3 p-4 rounded-sm border ${
              notification.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Search Bar & Filter Tabs */}
      <div className="bg-[#1E293B] border border-[#D4AF37]/10 rounded-sm shadow-premium overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-[#D4AF37]/10 bg-[#0F172A]/50">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="ابحث في الرسائل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pr-10 bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm py-2 transition-colors placeholder-slate-500"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-[#D4AF37]/10 bg-[#0F172A]/30">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-5 py-3 text-sm font-bold transition-all duration-200 border-b-2 ${
                activeFilter === tab.key
                  ? 'text-[#D4AF37] border-[#D4AF37]'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`mr-2 text-xs ${
                  activeFilter === tab.key ? 'text-[#D4AF37]/70' : 'text-slate-500'
                }`}>
                  ({tab.count})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Messages List */}
        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <Loader2 size={32} className="animate-spin text-[#D4AF37]" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl text-slate-300 font-bold mb-2">
                {searchQuery ? 'لا توجد نتائج' : 'لا توجد رسائل'}
              </h3>
              <p className="text-slate-500">
                {searchQuery
                  ? 'لا توجد رسائل تطابق بحثك.'
                  : activeFilter === 'unread'
                  ? 'لا توجد رسائل غير مقروءة.'
                  : activeFilter === 'read'
                  ? 'لا توجد رسائل مقروءة.'
                  : 'سيظهر هنا بريد العملاء والاستفسارات بمجرد استلامها.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[#D4AF37]/5 max-h-[600px] overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {filteredLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`cursor-pointer transition-all hover:bg-[#D4AF37]/[0.03] ${
                    lead.isRead ? 'bg-[#1E293B]' : 'bg-[#1E293B] border-r-2 border-r-[#D4AF37]'
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
      </div>

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

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {!selectedLead.isRead && (
                  <button
                    onClick={() => markAsRead(selectedLead.id)}
                    className="w-full px-6 py-2.5 border border-[#D4AF37]/30 text-[#D4AF37] font-bold rounded-sm hover:bg-[#D4AF37]/10 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <MailOpen size={16} />
                    تعليم كمقروء
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedLead.id)}
                  disabled={isDeleting}
                  className="w-full px-6 py-2.5 border border-red-500/30 text-red-400 font-bold rounded-sm hover:bg-red-500/10 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      جاري الحذف...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      حذف الرسالة
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-full px-6 py-2.5 border border-slate-700 text-slate-300 font-bold rounded-sm hover:bg-slate-800 transition-colors text-sm"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
