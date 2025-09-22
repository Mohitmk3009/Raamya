'use client';
import Image from 'next/image';
import React from 'react';
import ITGIRL from '../../assets/it_girl.jpg';
import DESIDIVA from '../../assets/desi_diva.jpg';
import MODERNMUSE from '../../assets/modern_muse.jpg';
import GIRLYPOP from '../../assets/girly_pop.jpg';
import STREETCHIC from '../../assets/street_chic.jpg';
// A reusable card component for each image box
const ImageCard = ({ src, title, containerClassName }) => {
  return (
    // The main container for each card, which needs a defined height for the image to fill it.
    <div className={`relative overflow-hidden group cursor-pointer ${containerClassName} h-64 md:h-full font-redhead`}>
      {/* Standard <img> tag for compatibility */}
      <Image
        src={src}
        alt={title}
        // Applying transitions for smooth hover effects
        fill
        className="w-full h-full object-cover transition-all duration-500 ease-in-out filter grayscale group-hover:grayscale-0 group-hover:scale-110"
      />
      {/* Overlay to darken the image slightly for better text visibility */}
      <div className="absolute inset-0bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-500"></div>
      
      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-yellow-400  text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase transition-all duration-500 ease-in-out transform group-hover:scale-110">
          {title}
        </h2>
      </div>
    </div>
  );
};

// The main grid component
export default function Hero() {
  // We define specific grid placement classes for each category on large screens
  const categories = [
    {
      title: 'BLOOM GIRL',
      src: MODERNMUSE,
      // Places this item in the top-left corner
      placementClassName: 'lg:row-start-1 lg:col-start-1',
    },
    {
      title: 'DESI DIVA',
      src:DESIDIVA,
      // Places this item in the top-right corner
      placementClassName: 'lg:row-start-1 lg:col-start-3',
    },
    {
      title: 'IT GIRL',
      src: ITGIRL,
      // This is the central image. It spans two rows and has a higher z-index.
      placementClassName: 'lg:row-span-2 lg:col-start-2 relative z-10 ', 
    },
    {
      title: 'GIRLY POP',
      src: GIRLYPOP,
      // Places this item in the bottom-left corner
      placementClassName: 'lg:row-start-2 lg:col-start-1',
    },
    {
      title: 'STREET CHIC',
      src: STREETCHIC,
      // Places this item in the bottom-right corner
      placementClassName: 'lg:row-start-2 lg:col-start-3',
    },
  ];

  return (
    <section className="w-full bg-black  flex items-center justify-center">
      {/* The grid container now uses a 3-column, 2-row layout on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2  w-full  h-[92vh]">
        {categories.map((cat) => (
          <ImageCard
            key={cat.title}
            src={cat.src}
            title={cat.title}
            containerClassName={cat.placementClassName}
          />
        ))}
      </div>
    </section>
  );
}

