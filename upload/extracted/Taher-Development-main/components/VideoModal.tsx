import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {videoUrl && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6" dir="rtl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-black rounded-sm shadow-premium border border-[#D4AF37]/30 overflow-hidden aspect-video flex flex-col"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-[#D4AF37] hover:text-[#0F172A] w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 pointer-events-auto"
            >
              <X size={24} />
            </button>
            <div className="w-full h-full relative pointer-events-auto">
              <iframe 
                src={videoUrl} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                className="w-full h-full border-0"
                title="Project Video"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
