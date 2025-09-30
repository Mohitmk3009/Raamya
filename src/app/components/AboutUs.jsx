
'use client';
import Link from 'next/link';
import React from 'react';
import { useContentProtection } from '../hooks/useContentProtection';
// A simple Icon component for the list items
const ListItemCheck = () => (
  <svg
    className="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0 mt-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);


export default function AboutUs() {
  useContentProtection(); 
  return (
    <div className="bg-black text-[#EFAF00] lg:px-0 px-5 pt-10 font-redhead select-none touch-action-manipulation">
      <div className="max-w-[1400px]  mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white cursor-pointer">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#EFAF00] font-bold ">About Us</span>
        </nav>

        {/* Main Title */}
        <h1 className="lg:text-4xl text-2xl sm:text-5xl font-bold text-[#EFAF00] mb-6 uppercase">
          About Us – Raamya ✨
        </h1>
        {/* <p className="text-lg text-yellow-400 mb-2">
          Welcome To Raamya, Where We Believe That Every Thread Tells A Story And Every Garment Is A Work Of Art.
        </p> */}

        {/* Introductory Paragraph */}
        <p className="mb-2 leading-relaxed">
          Fashion is not just fabric stitched together — it is identity, mood, and confidence woven into every thread. At Raamya, established in 2025, we believe that today’s woman is not confined to one personality. She is a blend of many, shifting between styles and energies with effortless grace. And her fashion should celebrate every shade of who she is.
        </p>
        <p className="lg:mb-10 mb-5 leading-relaxed">
          That’s why Raamya was born — to remind women everywhere that one person can slay in all styles. In a world where individuality shines brighter than ever, we are here to break the myth that fashion is about fitting into a single box. Instead, we celebrate versatility, self-expression, and the power of confidence.
        </p>
        {/* Our Heritage, Our Craft Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-[#EFAF00] mb-4">It Girl</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              The modern trailblazer. Sleek, chic, and effortlessly stylish, she knows how to set trends while staying true to herself. Perfect for the days when ambition takes the lead and confidence is her best accessory.
            </p>
          </div>
        </div>

        <div className="lg:mb-10 mb-5">
          <h2 className="text-3xl font-semibold text-[#EFAF00] mb-4">Girly Pop</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              Playful, sweet, and radiant. This personality is all about joy and charm, embracing vibrant colors and flirty cuts. She’s fun, she’s lighthearted, and she turns heads with her glow.
            </p>
          </div>
        </div>

        <div className="lg:mb-10 mb-5">
          <h2 className="text-3xl font-semibold text-[#EFAF00] mb-4">Street Chic</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              Edgy, bold, and unapologetic. Street Chic is for the fearless woman who isn’t afraid to own her space. With powerful silhouettes and statement-making fits, she’s a walking definition of confidence.
            </p>
          </div>
        </div>

        <div className="lg:mb-10 mb-5">
          <h2 className="text-3xl font-semibold text-[#EFAF00] mb-4">Desi Diva</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              Rooted in tradition, yet glowing with modern elegance. This look celebrates culture with a contemporary twist. Whether it’s festive glamour or everyday grace, Desi Diva makes every moment iconic.
            </p>
          </div>
        </div>

        <div className="lg:mb-10 mb-5">
          <h2 className="text-3xl font-semibold text-[#EFAF00] mb-4">Bloom Girl</h2>
          <div className="space-y-6 leading-relaxed">
            <p>
              Soft, free-spirited, and radiant with natural charm. Bloom Girl is about effortless beauty, fresh vibes, and clothing that feels like sunshine on your skin.
            </p>
          </div>
        </div>
        {/* Our Commitment To You Section */}
        <div className="mb-2">
          {/* <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Our Commitment To You</h2> */}
          <div className="space-y-2 leading-relaxed">
            <p>
              At Raamya, we know that women are never just one thing. On different days, in different moods, she embodies all these personalities and more. Why limit her fashion to one side of herself when she has the power to slay in them all?
            </p>
            <p>
              Our purpose is simple yet powerful: to create fashion that empowers women to express every mood and every version of themselves. We design pieces that flow seamlessly between personalities, so you can step into the day as whoever you want to be — without limits, without labels.
            </p>
          </div>
        </div>

        {/* Thank You Message */}
        <p className="font-bold text-[#EFAF00] lg:mb-10 mb-5 leading-relaxed">
          Every collection at Raamya is crafted with care, inspired by confidence, and made to celebrate individuality. Because fashion is not only about how you look, but also about how you feel in what you wear. And at Raamya, we want every woman to feel unstoppable.
        </p>


        {/* Our Mission Section */}
        {/* <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Our Mission Is Simple Yet Powerful:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2 mt-1">&#8226;</span>
              <span>To Inspire Confidence Through Thoughtful Design.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2 mt-1">&#8226;</span>
              <span>To Celebrate Uniqueness By Creating Versatile, Expressive Collections.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2 mt-1">&#8226;</span>
              <span>To Make Fashion Accessible While Upholding Uncompromising Quality.</span>
            </li>
          </ul>
        </div> */}

      </div>
    </div>
  );
}
