"use client"
import { useEffect } from "react";

export function useContentProtection() {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleZoomKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && ["=", "-", "0"].includes(e.key)) {
        e.preventDefault();
      }
    };

    const handleZoomWheel = (e) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };

    const handleGesture = (e) => e.preventDefault();

    const preventDoubleTap = (e) => {
      if (e.detail > 1) e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleZoomKey);
    document.addEventListener("wheel", handleZoomWheel, { passive: false });
    document.addEventListener("gesturestart", handleGesture);
    document.addEventListener("gesturechange", handleGesture);
    document.addEventListener("gestureend", handleGesture);
    document.addEventListener("touchend", preventDoubleTap, { passive: false });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleZoomKey);
      document.removeEventListener("wheel", handleZoomWheel);
      document.removeEventListener("gesturestart", handleGesture);
      document.removeEventListener("gesturechange", handleGesture);
      document.removeEventListener("gestureend", handleGesture);
      document.removeEventListener("touchend", preventDoubleTap);
    };
  }, []);
}
