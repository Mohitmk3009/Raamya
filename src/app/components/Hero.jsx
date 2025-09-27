'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useMediaQuery } from '../hooks/useMediaQuery'; // Adjust the import path if needed

// --- DESKTOP IMAGES ---
import ITGIRL from '../../assets/IT girl2.jpg';
import DESIDIVA from '../../assets/desi_diva.png';
import BLOOMGIRL from '../../assets/bloom_girl.png';
import GIRLYPOP from '../../assets/Girly pop2.png';
import STREETCHIC from '../../assets/street_chic.png';

// --- MOBILE IMAGES (Make sure you have these image files in your assets folder) ---
import ITGIRL_MOBILE from '../../assets/it_girl_mobile.jpg';
import DESIDIVA_MOBILE from '../../assets/desi_diva.png';
import BLOOMGIRL_MOBILE from '../../assets/bloom_girl.png';
import GIRLYPOP_MOBILE from '../../assets/Girly pop2.png';
import STREETCHIC_MOBILE from '../../assets/street_chic.png';

// A reusable card component for each image box
const ImageCard = ({ src, mobileSrc, title, containerClassName }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const imageSource = isMobile ? mobileSrc : src;

  return (
    <div className={`relative overflow-hidden group cursor-pointer ${containerClassName} h-64 md:h-full font-redhead`}>
      <Image
        src={imageSource}
        alt={title}
        fill
        priority // Add priority for images loading "above the fold"
        // --- THIS IS THE CRITICAL FIX ---
        sizes="(max-width: 768px) 100vw, 100vw"
        className="w-full h-full object-cover transition-all duration-500 ease-in-out filter  group-hover:grayscale-0 group-hover:scale-110"
      />

      {/* Overlay to darken the image slightly for better text visibility */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-opacity-20 transition-all duration-500"></div>

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-[#EFAF00] text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase transition-all duration-500 ease-in-out transform group-hover:scale-110">
          {title}
        </h2>
      </div>
    </div>
  );
};

// The main grid component
export default function Hero() {
  // The categories array now includes a `mobileSrc` for each item.
  const categories = [
    {
      title: 'BLOOM GIRL',
      queryValue: 'bloom girl',
      src: BLOOMGIRL,
      mobileSrc: BLOOMGIRL_MOBILE,
      placementClassName: 'lg:row-start-1 lg:col-start-1',
    },
    {
      title: 'DESI DIVA',
      queryValue: 'desi diva',
      src: DESIDIVA,
      mobileSrc: DESIDIVA_MOBILE,
      placementClassName: 'lg:row-start-1 lg:col-start-3',
    },
    {
      title: 'IT GIRL',
      queryValue: 'IT girl',
      src: ITGIRL,
      mobileSrc: ITGIRL_MOBILE,
      placementClassName: 'col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1 relative z-10',
    },
    {
      title: 'GIRLY POP',
      queryValue: 'girly pop',
      src: GIRLYPOP,
      mobileSrc: GIRLYPOP_MOBILE,
      placementClassName: 'lg:row-start-2 lg:col-start-1',
    },
    {
      title: 'STREET CHIC',
      queryValue: 'street chic',
      src: STREETCHIC,
      mobileSrc: STREETCHIC_MOBILE,
      placementClassName: 'lg:row-start-2 lg:col-start-3',
    },
  ];

  return (
    <section className="w-full bg-black flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 w-full lg:h-[92vh] h-[85vh]">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={{
              pathname: '/allproducts',
              query: { category: cat.queryValue },
            }}
            className={cat.placementClassName}
          >
            <ImageCard
              src={cat.src}
              mobileSrc={cat.mobileSrc} // Pass the new prop to the card
              title={cat.title}
              containerClassName="h-full w-full"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}