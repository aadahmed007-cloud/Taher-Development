'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  UploadCloud,
  X,
  Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';

const initialProjects = [
  { id: 1, title: 'مجمع طاهر الفاخر', location: 'القاهرة الجديدة', status: 'متاح للبيع', price: 'يبدأ من 5,000,000 ج.م' },
  { id: 2, title: 'أبراج النيل بلازا', location: 'الزمالك', status: 'تحت الإنشاء', price: 'يبدأ من 12,000,000 ج.م' },
  { id: 3, title: 'كمبوند الأفق الأخضر', location: 'الشيخ زايد', status: 'مباع بالكامل', price: 'يبدأ من 8,500,000 ج.م' },
  { id: 4, title: 'طاهر مول للأعمال', location: 'العاصمة الإدارية', status: 'متاح للإيجار', price: 'اتصل للتفاصيل' },
];

export default function DashboardProjects() {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Image Upload State
  const [uploadedImages, setUploadedImages] = useState<{url: string, file?: File}[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      uploadedImages.forEach(image => URL.revokeObjectURL(image.url));
    };
  }, [uploadedImages]);

  // Form State
  const [newProject, setNewProject] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    status: 'متاح للبيع'
  });

  const filteredProjects = projects.filter(p => 
    p.title.includes(searchQuery) || p.location.includes(searchQuery)
  );

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const id = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([{ id, ...newProject }, ...projects]);
    setIsModalOpen(false);
    setNewProject({ title: '', location: '', price: '', description: '', status: 'متاح للبيع' });
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validImageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const newImages = validImageFiles.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));
    
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-6">
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
      <div className="bg-[#1E293B] border border-[#D4AF37]/10 rounded-sm shadow-premium overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-[#D4AF37]/10 flex justify-between items-center bg-[#0F172A]/50">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="ابحث عن مشروع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pr-10 bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm py-2 transition-colors placeholder-slate-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#0F172A]/80 border-b border-[#D4AF37]/10">
                <th className="p-4 text-slate-300 font-bold text-sm">اسم المشروع</th>
                <th className="p-4 text-slate-300 font-bold text-sm">الموقع</th>
                <th className="p-4 text-slate-300 font-bold text-sm">الحالة</th>
                <th className="p-4 text-slate-300 font-bold text-sm">السعر</th>
                <th className="p-4 text-slate-300 font-bold text-sm w-16">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/5">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-[#D4AF37]/[0.03] transition-all duration-300 group">
                  <td className="p-4 relative">
                    <div className="absolute inset-y-0 right-0 w-[3px] bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>
                    <div className="text-white font-medium transform group-hover:-translate-x-1 transition-transform duration-300">{project.title}</div>
                  </td>
                  <td className="p-4 text-slate-400 text-sm">{project.location}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-sm border ${
                      project.status === 'متاح للبيع' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : project.status === 'تحت الإنشاء'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : project.status === 'متاح للإيجار'
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-sm">{project.price}</td>
                  <td className="p-4 text-slate-400 text-sm">
                    <button className="text-slate-400 hover:text-[#D4AF37] transition-colors p-1">
                      <Edit size={16} />
                    </button>
                    <button className="text-slate-400 hover:text-red-400 transition-colors p-1 mr-2">
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
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6" dir="rtl">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#1E293B] rounded-sm shadow-premium border border-[#D4AF37]/30 flex flex-col max-h-[90vh] lg:max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#D4AF37]/10 bg-[#0F172A]">
                <h3 className="text-xl font-bold text-white">إضافة مشروع جديد</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-[#D4AF37] transition-colors"
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
                      className={`border-2 border-dashed ${isDragging ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-slate-700 bg-[#0F172A]/50'} rounded-sm p-8 text-center hover:bg-[#0F172A] hover:border-[#D4AF37]/50 transition-colors cursor-pointer group relative`}
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
                      />
                      <div className="mx-auto w-16 h-16 mb-4 bg-[#1E293B] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UploadCloud size={28} className={isDragging ? 'text-[#D4AF37]' : 'text-[#D4AF37]'} />
                      </div>
                      <p className="text-slate-300 font-bold mb-1">اسحب وأفلت الصور هنا</p>
                      <p className="text-slate-500 text-sm">أو انقر لاختيار الملفات (PNG, JPG, WEBP)</p>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <AnimatePresence>
                          {uploadedImages.map((image, index) => (
                            <motion.div 
                              key={image.url}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="relative aspect-square rounded-sm overflow-hidden border border-[#D4AF37]/20 group"
                            >
                              <Image 
                                src={image.url} 
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
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors placeholder-slate-600"
                        placeholder="أدخل اسم المشروع"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">موقع المشروع</label>
                      <input
                        type="text"
                        value={newProject.location}
                        onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors placeholder-slate-600"
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
                        onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors appearance-none"
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
                        onChange={(e) => setNewProject({...newProject, price: e.target.value})}
                        className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors placeholder-slate-600"
                        placeholder="مثال: يبدأ من 5,000,000 ج.م"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">وصف شامل للمشروع</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="block w-full bg-[#0F172A] border border-slate-700 text-white rounded-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm p-3 transition-colors placeholder-slate-600"
                      placeholder="اكتب تفاصيل المشروع والمميزات..."
                      rows={4}
                      required
                    ></textarea>
                  </div>

                </form>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#D4AF37]/10 bg-[#0F172A] flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-slate-700 text-slate-300 font-bold rounded-sm hover:bg-slate-800 transition-colors text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  form="add-project-form"
                  className="px-8 py-2.5 gold-gradient text-[#0F172A] font-bold rounded-sm shadow-premium hover:brightness-110 transition-all text-sm"
                >
                  حفظ المشروع
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
