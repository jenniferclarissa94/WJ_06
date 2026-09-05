import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImagePreviewModalProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function ImagePreviewModal({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title
}: ImagePreviewModalProps) {
  const validImages = images.filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Touch / Swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const isPointerDown = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const safeIndex = Math.max(0, Math.min(initialIndex, validImages.length - 1));
      setCurrentIndex(safeIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialIndex, validImages.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, validImages.length, currentIndex]);

  if (!isOpen || validImages.length === 0 || typeof document === 'undefined') {
    return null;
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : validImages.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < validImages.length - 1 ? prev + 1 : 0));
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Only swipe if horizontal movement is greater than vertical movement
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Mouse Drag Swipe handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    pointerStartX.current = e.clientX;
    isPointerDown.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isPointerDown.current || pointerStartX.current === null) return;
    const diffX = pointerStartX.current - e.clientX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    pointerStartX.current = null;
    isPointerDown.current = false;
  };

  const currentSrc = validImages[currentIndex];

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in select-none"
      onClick={onClose}
    >
      {/* Header with Title, Counter and Close Button */}
      <div 
        className="w-full flex items-center justify-between text-white z-20 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          {title && (
            <span className="text-sm sm:text-base font-bold text-gray-200 truncate max-w-[200px] sm:max-w-md">
              {title}
            </span>
          )}
          {validImages.length > 1 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10 backdrop-blur-sm">
              {currentIndex + 1} / {validImages.length}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          aria-label="Close preview"
          className="w-10 h-10 rounded-full bg-black/50 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Stage with Left & Right Arrows and Swipe handlers */}
      <div 
        className="relative w-full flex-1 flex items-center justify-center my-auto overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Left Arrow Button */}
        {validImages.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 border border-white/20 text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-sm group cursor-pointer"
          >
            <ChevronLeft size={26} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* The Current Image */}
        <div 
          className="relative max-w-full max-h-[72vh] sm:max-h-[78vh] flex items-center justify-center p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            key={currentSrc}
            src={currentSrc}
            alt={title || `Preview ${currentIndex + 1}`}
            referrerPolicy="no-referrer"
            draggable={false}
            className="max-w-full max-h-[70vh] sm:max-h-[76vh] object-contain rounded-xl shadow-2xl transition-all duration-300 cursor-grab active:cursor-grabbing"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        {/* Right Arrow Button */}
        {validImages.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 active:scale-95 border border-white/20 text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-sm group cursor-pointer"
          >
            <ChevronRight size={26} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip for Fast Scrubbing */}
      {validImages.length > 1 && (
        <div 
          className="w-full max-w-lg z-20 shrink-0 pt-2 pb-1"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 justify-center items-center overflow-x-auto py-1 px-2 no-scrollbar">
            {validImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 transition-all ${
                  idx === currentIndex
                    ? 'ring-2 ring-[var(--color-primary)] scale-105 opacity-100'
                    : 'opacity-40 hover:opacity-80 border border-white/10'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
