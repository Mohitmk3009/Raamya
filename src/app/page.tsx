'use client';
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HomePage from "./homepage/page";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Run only in the browser
    const alreadyShown = sessionStorage.getItem("loading_shown") === "true";

    if (alreadyShown) {
      setShowLoading(false);
    } else {
      const timer = setTimeout(() => {
        setShowLoading(false);
        sessionStorage.setItem("loading_shown", "true");
      }, 4000); // 3s wait + 1s animation
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative bg-black">
      <HomePage />
      {showLoading && <LoadingScreen />}
      <Analytics />
    </div>
  );
}
