'use client';
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HomePage from "./homepage/page";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 4000); // 3s wait + 1s slide animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-black">
      {/* Main content */}
      <HomePage />

      {/* Overlay loading screen */}
      {showLoading && <LoadingScreen />}
    </div>
  );
}
