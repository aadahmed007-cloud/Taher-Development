'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  UploadCloud,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  Building2,
  TrendingUp,
  Hammer,
  Ban,
} from 'lucide-react';
import Image from 'next/image';

interface DashboardProject {
  id: string;
  titleAr: string;
  locationAr: string;
  status: string;
  price: string;
  area?: string | null;
  descriptionAr?: string | null;
  type?: string | null;
  videoLink?: string | null;
  images: string[];
  amenities: string[];
}

export default function DashboardProjects() {
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Image Upload State
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [newProject, setNewProject] = useState({
    titleAr: '',
    locationAr: '',
    price: '',
    area: '',
    descriptionAr: '',
    status: 'متاح للبيع',
    type: '',
    videoLink: '',
    amenities: '',
  });

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Auto-dismiss notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Stats computed from projects
  const totalProjects = projects.length;
  const availableCount = projects.filter((p) => p.status === 'متاح للبيع').length;
  const underConstructionCount = projects.filter((p) => p.status === 'تحت الإنشاء').length;
  const soldOutCount = projects.filter((p) => p.status === 'مباع بالكامل').length;

  const filteredProjects = projects.filter((p) =>
    p.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) || p.locationAr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Upload files to server
  const uploadFiles = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        return data.urls || [];
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
    return [];
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Parse amenities from comma-separated string
      const amenitiesArray = newProject.amenities
        ? newProject.amenities.split(',').map((a) => a.trim()).filter((a) => a.length > 0)
        : [];

      const body = {
        titleAr: newProject.titleAr,
        locationAr: newProject.locationAr,
        price: newProject.price,
        area: newProject.area || null,
        descriptionAr: newProject.descriptionAr || null,
        status: newProject.status,
        type: newProject.type || null,
        videoLink: newProject.videoLink || null,
        images: uploadedImages,
        amenities: amenitiesArray,
      };

      let res: Response;

      if (isEditing && editingId) {
        res = await fetch(`/api/projects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }

      const data = await res.json();

      if (res.ok) {
        setNotification({
          type: 'success',
          message: isEditing ? 'تم تحديث المشروع بنجاح' : 'تم إضافة المشروع بنجاح',
        });
        closeModal();
        fetchProjects();
      } else {
        setNotification({
          type: 'error',
          message: data.error || 'حدث خطأ أثناء الحفظ',
        });
      }
    } catch {
      setNotification({ type: 'error', message: 'خطأ في الاتصال بالخادم' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotification({ type: 'success', message: 'تم حذف المشروع بنجاح' });
        fetchProjects();
      } else {
        const data = await res.json();
        setNotification({ type: 'error', message: data.error || 'فشل حذف المشروع' });
      }
    } catch {
      setNotification({ type: 'error', message: 'خطأ في الاتصال بالخادم' });
    }
  };

  const handleEdit = (project: DashboardProject) => {
    setIsEditing(true);
    setEditingId(project.id);
    setNewProject({
      titleAr: project.titleAr,
      locationAr: project.locationAr,
      price: project.price,
      area: project.area || '',
      descriptionAr: project.descriptionAr || '',
      status: project.status,
      type: project.type || '',
      videoLink: project.videoLink || '',
      amenities: (project.amenities || []).join(', '),
    });
    setUploadedImages(project.images || []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setNewProject({ titleAr: '', locationAr: '', price: '', area: '', descriptionAr: '', status: 'متاح للبيع', type: '', videoLink: '', amenities: '' });
    setUploadedImages([]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (files: File[]) => {
    const validImageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (validImageFiles.length === 0) return;

    setIsUploading(true);
    try {
      const urls = await uploadFiles(validImageFiles);
      setUploadedImages((prev) => [...prev, ...urls]);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1E293B] border border-[#C8A84E]/10 rounded-sm p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#C8A84E]/10 flex items-center justify-center">
              <Building2 size={20} className="text-[#C8A84E]" />
            </div>
            <span className="text-slate-400 text-sm">إجمالي المشاريع</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalProjects}</p>
        </div>
        <div className="bg-[#1E293B] border border-emerald-500/10 rounded-sm p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp size={20} className="text-emerald-400" />
            </div>
            <span className="text-slate-400 text-sm">متاح للبيع</span>
          </div>
          <p className="text-3xl font-bold text-emerald-400">{availableCount}</p>
        </div>
        <div className="bg-[#1E293B] border border-amber-500/10 rounded-sm p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Hammer size={20} className="text-amber-400" />
            </div>
            <span className="text-slate-400 text-sm">تحت الإنشاء</span>
          </div>
          <p className="text-3xl font-bold text-amber-400">{underConstructionCount}</p>
        </div>
        <div className="bg-[#1E293B] border border-slate-500/10 rounded-sm p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center">
              <Ban size={20} className="text-slate-400" />
            </div>
            <span className="text-slate-400 text-sm">مباع بالكامل</span>
          </div>
          <p className="text-3xl font-bold text-slate-400">{soldOutCount}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">إدارة المشاريع</h2>
          <p className="text-slate-400 text-sm">أضف، عدل، أو احذف مشاريع الشركة</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 gold-gradient text-[#0F172A] font-bold rounded-sm shadow-premium hover:brightness-110 transition-all flex items-center gap-2 text-sm"
        >
          <Plus size={18} />
          إضافة مشروع جديد
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-[#1E293B] border border-[#C8A84E]/10 rounded-sm shadow-premium overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#C8A84E]/10 flex justify-between items-center bg-[#0F172A]/50">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="ابحث عن مشروع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pr-10 bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm py-2 transition-colors placeholder-slate-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[#C8A84E]" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#0F172A]/80 border-b border-[#C8A84E]/10">
                  <th className="p-4 text-slate-300 font-bold text-sm">اسم المشروع</th>
                  <th className="p-4 text-slate-300 font-bold text-sm">الموقع</th>
                  <th className="p-4 text-slate-300 font-bold text-sm">الحالة</th>
                  <th className="p-4 text-slate-300 font-bold text-sm">السعر</th>
                  <th className="p-4 text-slate-300 font-bold text-sm w-20">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C8A84E]/5">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#C8A84E]/[0.03] transition-all duration-300 group">
                    <td className="p-4 relative">
                      <div className="absolute inset-y-0 right-0 w-[3px] bg-[#C8A84E] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>
                      <div className="text-white font-medium transform group-hover:-translate-x-1 transition-transform duration-300">{project.titleAr}</div>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">{project.locationAr}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-sm border ${
                        project.status === 'متاح للبيع'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : project.status === 'تحت الإنشاء'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : project.status === 'متاح للإيجار'
                          ? 'bg-[#C8A84E]/10 text-[#C8A84E] border-[#C8A84E]/20'
                          : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">{project.price}</td>
                    <td className="p-4 text-slate-400 text-sm">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-slate-400 hover:text-[#C8A84E] transition-colors p-1"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors p-1 mr-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProjects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      لا توجد مشاريع تطابق بحثك.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6" dir="rtl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#1E293B] rounded-sm shadow-premium border border-[#C8A84E]/30 flex flex-col max-h-[90vh] lg:max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#C8A84E]/10 bg-[#0F172A]">
                <h3 className="text-xl font-bold text-white">
                  {isEditing ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-[#C8A84E] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
                <form id="add-project-form" onSubmit={handleAddProject} className="space-y-6">
                  {/* Image Upload Zone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">صور المشروع</label>

                    <div
                      className={`border-2 border-dashed ${isDragging ? 'border-[#C8A84E] bg-[#C8A84E]/5' : 'border-slate-700 bg-[#0F172A]/50'} rounded-sm p-8 text-center hover:bg-[#0F172A] hover:border-[#C8A84E]/50 transition-colors cursor-pointer group relative`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileInput}
                        disabled={isUploading}
                      />
                      <div className="mx-auto w-16 h-16 mb-4 bg-[#1E293B] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        {isUploading ? (
                          <Loader2 size={28} className="text-[#C8A84E] animate-spin" />
                        ) : (
                          <UploadCloud size={28} className="text-[#C8A84E]" />
                        )}
                      </div>
                      <p className="text-slate-300 font-bold mb-1">
                        {isUploading ? 'جاري رفع الصور...' : 'اسحب وأفلت الصور هنا'}
                      </p>
                      <p className="text-slate-500 text-sm">أو انقر لاختيار الملفات (PNG, JPG, WEBP)</p>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <AnimatePresence>
                          {uploadedImages.map((imageUrl, index) => (
                            <motion.div
                              key={imageUrl + index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="relative aspect-square rounded-sm overflow-hidden border border-[#C8A84E]/20 group"
                            >
                              <Image
                                src={imageUrl}
                                alt={`Uploaded ${index}`}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                  }}
                                  className="w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">اسم المشروع</label>
                      <input
                        type="text"
                        value={newProject.titleAr}
                        onChange={(e) => setNewProject({ ...newProject, titleAr: e.target.value })}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors placeholder-slate-600"
                        placeholder="أدخل اسم المشروع"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">موقع المشروع</label>
                      <input
                        type="text"
                        value={newProject.locationAr}
                        onChange={(e) => setNewProject({ ...newProject, locationAr: e.target.value })}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors placeholder-slate-600"
                        placeholder="المدينة، المنطقة"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">الحالة</label>
                      <select
                        value={newProject.status}
                        onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors appearance-none"
                      >
                        <option value="متاح للبيع">متاح للبيع</option>
                        <option value="متاح للإيجار">متاح للإيجار</option>
                        <option value="تحت الإنشاء">تحت الإنشاء</option>
                        <option value="مباع بالكامل">مباع بالكامل</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">السعر المبدئي</label>
                      <input
                        type="text"
                        value={newProject.price}
                        onChange={(e) => setNewProject({ ...newProject, price: e.target.value })}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors placeholder-slate-600"
                        placeholder="مثال: يبدأ من 5,000,000 ج.م"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">النوع</label>
                      <input
                        type="text"
                        value={newProject.type}
                        onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors placeholder-slate-600"
                        placeholder="سكني، تجاري، منتجع..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">المساحة</label>
                      <input
                        type="text"
                        value={newProject.area}
                        onChange={(e) => setNewProject({ ...newProject, area: e.target.value })}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors placeholder-slate-600"
                        placeholder="مثال: 180 - 350 م²"
                      />
                    </div>
                  </div>

                  {/* Amenities Field */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">المرافق والخدمات</label>
                    <input
                      type="text"
                      value={newProject.amenities}
                      onChange={(e) => setNewProject({ ...newProject, amenities: e.target.value })}
                      className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors placeholder-slate-600"
                      placeholder="أدخل المرافق مفصولة بفواصل: حمام سباحة، حدائق، أمن..."
                    />
                    <p className="text-slate-500 text-xs mt-1">افصل بين كل مرفق بفاصلة (,)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">رابط الفيديو (اختياري)</label>
                    <input
                      type="url"
                      value={newProject.videoLink}
                      onChange={(e) => setNewProject({ ...newProject, videoLink: e.target.value })}
                      className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors placeholder-slate-600"
                      placeholder="https://www.youtube.com/embed/..."
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">وصف شامل للمشروع</label>
                    <textarea
                      value={newProject.descriptionAr}
                      onChange={(e) => setNewProject({ ...newProject, descriptionAr: e.target.value })}
                      className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#C8A84E] focus:border-[#C8A84E] sm:text-sm p-3 transition-colors placeholder-slate-600"
                      placeholder="اكتب تفاصيل المشروع والمميزات..."
                      rows={4}
                    ></textarea>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#C8A84E]/10 bg-[#0F172A] flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 border border-slate-700 text-slate-300 font-bold rounded-sm hover:bg-slate-800 transition-colors text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  form="add-project-form"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 gold-gradient text-[#0F172A] font-bold rounded-sm shadow-premium hover:brightness-110 transition-all text-sm disabled:opacity-60 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    isEditing ? 'تحديث المشروع' : 'حفظ المشروع'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
