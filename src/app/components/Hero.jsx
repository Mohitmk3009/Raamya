'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link'; // Import the Link component
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
      {/* Next.js Image component for optimized images */}
      <Image
        src={src}
        alt={title}
        // Applying transitions for smooth hover effects
        fill
        className="w-full h-full object-cover transition-all duration-500 ease-in-out filter grayscale group-hover:grayscale-0 group-hover:scale-110"
      />
      {/* Overlay to darken the image slightly for better text visibility */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-opacity-20 transition-all duration-500"></div>
      
      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-yellow-400 text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase transition-all duration-500 ease-in-out transform group-hover:scale-110">
          {title}
        </h2>
      </div>
    </div>
  );
};

// The main grid component
export default function Hero() {
  // We define specific grid placement classes and add a 'queryValue' for the URL
  const categories = [
    {
      title: 'BLOOM GIRL',
      queryValue: 'bloom girl', // Matches the filter on the products page
      src: MODERNMUSE,
      placementClassName: 'lg:row-start-1 lg:col-start-1   ',
    },
    {
      title: 'DESI DIVA',
      queryValue: 'desi diva',
      src:DESIDIVA,
      placementClassName: 'lg:row-start-1 lg:col-start-3 ',
    },
    {
      title: 'IT GIRL',
      queryValue: 'IT girl',
      src: ITGIRL,
      // This is the corrected line
placementClassName: 'col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-2 lg:row-start-1 relative z-10',
    },
    {
      title: 'GIRLY POP',
      queryValue: 'Girly Pop',
      src: GIRLYPOP,
      placementClassName: 'lg:row-start-2 lg:col-start-1',
    },
    {
      title: 'STREET CHIC',
      queryValue: 'street chic',
      src: STREETCHIC,
      placementClassName: 'lg:row-start-2 lg:col-start-3',
    },
  ];

  return (
    <section className="w-full bg-black flex items-center justify-center">
      {/* The grid container now uses a 3-column, 2-row layout on large screens */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 w-full lg:h-[92vh] h-[85vh]">
        {categories.map((cat) => (
          // Wrap the ImageCard with a Link component
          <Link
            key={cat.title} // The key is now on the top-level element, Link
            href={{
              pathname: '/allproducts',
              query: { category: cat.queryValue }, // Use the queryValue for the URL
            }}
            className={cat.placementClassName} // Apply placement directly to the Link for grid positioning
          >
            <ImageCard
              src={cat.src}
              title={cat.title}
              containerClassName="h-full w-full" // Ensure card fills the Link's grid area
            />
          </Link>
        ))}
      </div>
    </section>
  );
}