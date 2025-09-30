'use client';
import React, { useState, useRef } from "react";
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useContentProtection } from '../hooks/useContentProtection';
export default function VideoModal({ isOpen, onClose, post, allPosts, currentIndex, goToNext, goToPrevious }) {
  if (!isOpen || !post) return null;

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; // Minimum distance to register a swipe
useContentProtection();
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allPosts.length - 1;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasNext) {
      goToNext();
    } else if (isRightSwipe && hasPrevious) {
      goToPrevious();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 font-sans font-redhead select-none touch-action-manipulation">
      {/* Navigation Arrows */}
      {hasPrevious && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-50 transition-colors hidden md:block"
        >
          <ChevronLeft className="h-6 w-6 text-[#EFAF00]" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-50 transition-colors hidden md:block"
        >
          <ChevronRight className="h-6 w-6 text-[#EFAF00]" />
        </button>
      )}

      {/* Modal Content */}
      <div 
        className="relative bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-full md:max-w-4xl w-full mx-5 md:mx-4 h-[80vh] md:h-[70vh] rounded-lg"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Close Button - positioned inside the modal for better UX on smaller screens */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 z-10 p-1 rounded-full bg-white/70 hover:bg-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left Side: Media (Image or Video) */}
        <div className="relative flex-1 md:w-1/2 md:min-h-full flex items-center justify-center bg-black">
                    {post.type === 'video' ? (
                        <video
                            key={post.id}
                            src={post.mediaSrc}
                            controls
                            autoPlay
                            playsInline
                            className="w-full lg:h-full h-[300px] lg:object-cover object-contain"
                        />
                    ) : (
                        <Image
                            key={post.id}
                            src={post.mediaSrc}
                            alt="Instagram Post"
                            layout="fill"
                            className="w-full h-full lg:object-cover object-contain"
                        />
                    )}
                </div>

        {/* Right Side: Details */}
        <div className="flex-1 md:w-1/2 p-4 flex flex-col border-l border-gray-200">
          {/* Header */}
          <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
              <Image src="https://res.cloudinary.com/daby6uvkv/image/upload/v1758717128/exchange_requests/nebse2dpotri9iwj1x2o.png" alt="Profile" width={40} height={40} />
            </div>
            <span className="font-bold text-gray-800 ">{post.username}</span>
          </div>

          {/* Caption - scrollable if too long */}
          <div className="flex-grow overflow-y-auto pr-2 text-gray-700 custom-scrollbar">
            <p className="whitespace-pre-line text-sm leading-relaxed">{post.caption}</p>
          </div>

          {/* Footer (e.g., date) */}
          <div className="text-gray-500 text-xs mt-4 pt-3 border-t border-gray-100">
            <p>{post.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}