'use client';
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HomePage from "./homepage/page";
import { Analytics } from "@vercel/analytics/next"
export default function Home() {
  const [showLoading, setShowLoading] = useState(() => {
    // Initialize state based on sessionStorage to show loading screen only once
    return sessionStorage.getItem('loading_shown') !== 'true';
  });

  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        // Set a flag in sessionStorage after the loading screen is hidden
        sessionStorage.setItem('loading_shown', 'true');
      }, 4000); // 3s wait + 1s slide animation
      return () => clearTimeout(timer);
    }
  }, [showLoading]);

  return (
    <div className="relative bg-black">
      {/* Main content */}
      <HomePage />

      {/* Overlay loading screen */}
      {showLoading && <LoadingScreen />}
    </div>
  );
}
