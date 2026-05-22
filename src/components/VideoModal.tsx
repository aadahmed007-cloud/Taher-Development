'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

const ALLOWED_VIDEO_HOSTS = [
  'youtube.com',
  'www.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
  'vimeo.com',
  'player.vimeo.com',
];

function isVideoUrlSafe(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_VIDEO_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

export default function VideoModal({ videoUrl, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (videoUrl) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [videoUrl, onClose]);

  return (
    <AnimatePresence>
      {videoUrl && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
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
            className="relative w-full max-w-4xl bg-black rounded-sm shadow-premium border border-[#C8A84E]/30 overflow-hidden aspect-video flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-[#C8A84E] hover:text-[#0F172A] w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 pointer-events-auto"
            >
              <X size={24} />
            </button>
            <div className="w-full h-full relative pointer-events-auto">
              {videoUrl && isVideoUrlSafe(videoUrl) ? (
              <iframe
                src={videoUrl}
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
                title="فيديو المشروع"
              />
              ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
                رابط الفيديو غير مدعوم
              </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
