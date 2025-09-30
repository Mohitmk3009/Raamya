// hooks/useContentProtection.js
"use client"
import { useEffect } from 'react';

export function useContentProtection() {
    useEffect(() => {
        // Anti-Copy: Disable right-click context menu
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // Anti-Zoom: Prevent keyboard shortcuts (Ctrl/Cmd + scroll/plus/minus)
        const handleZoomKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '-' || e.key === '0')) {
                e.preventDefault();
            }
        };
        const handleZoomWheel = (e) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleZoomKey);
        document.addEventListener('wheel', handleZoomWheel, { passive: false });

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleZoomKey);
            document.removeEventListener('wheel', handleZoomWheel);
        };
    }, []);
}