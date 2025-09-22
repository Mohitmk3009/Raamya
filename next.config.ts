import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["unsplash.com", "images.unsplash.com","upload.wikimedia.org","plus.unsplash.com"], // add your domains here
  },
  theme: {
    extend: {
      // Add your custom font family here
      fontFamily: {
        'realhead': ['"Real Head Web W01 Bold"', 'sans-serif'],
        'raamya': ['"Black No.7"', 'sans-serif'], // You can add the other one too!
      },
    },
  },
};

export default nextConfig;
