'use client';
import React from "react";

export default function VideoModal({ isOpen, onClose, videoSrc }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 font-redhead">
      <div className="relative w-full max-w-lg p-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl font-bold"
        >
          ✕
        </button>
        <video
          src={videoSrc}
          controls
          autoPlay
          className="w-full h-[200px] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
