'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const NewArrivals = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for responsive number of items to show
  const [itemsToShow, setItemsToShow] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(itemsToShow);
  const [isAnimating, setIsAnimating] = useState(true);

  // Effect to update carousel layout based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile: 1 item
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) { // Tablet: 2 items
        setItemsToShow(2);
      } else { // Desktop: 4 items
        setItemsToShow(4);
      }
    };

    handleResize(); // Set initial value on component mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to reset the carousel's position when the layout changes (e.g., on resize)
  useEffect(() => {
    setCurrentIndex(itemsToShow);
  }, [itemsToShow]);

  // Function to fetch products from the backend
  const fetchNewArrivals = async () => {
    try {
      // Add console.log(API_BASE_URL) here to debug your environment variable
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products.');
      }
      const data = await response.json();

      // Ensure data.products is an array before filtering
      const productsToFilter = Array.isArray(data.products) ? data.products : [];
      const filteredProducts = productsToFilter.filter(product => product.isNewArrival);

      // Add console.log(filteredProducts) here to check if your filter is working
      setNewArrivalProducts(filteredProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  // Carousel navigation logic
  const nextSlide = useCallback(() => {
    if (newArrivalProducts.length > itemsToShow) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [newArrivalProducts.length, itemsToShow]);

  const prevSlide = () => {
    if (newArrivalProducts.length > itemsToShow) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Create a looped array for seamless infinite scrolling
  const loopedProducts = newArrivalProducts.length > 0 ? [
    ...newArrivalProducts.slice(-itemsToShow),
    ...newArrivalProducts,
    ...newArrivalProducts.slice(0, itemsToShow),
  ] : [];

  // Auto-play interval
  useEffect(() => {
    if (newArrivalProducts.length > itemsToShow) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, newArrivalProducts.length, itemsToShow]);

  // Logic to handle the seamless jump when reaching cloned slides
  useEffect(() => {
    if (loopedProducts.length > 0) {
      if (currentIndex === loopedProducts.length - itemsToShow) {
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(itemsToShow);
        }, 500);
      }
      if (currentIndex === 0) {
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(newArrivalProducts.length);
        }, 500);
      }
    }
  }, [currentIndex, loopedProducts.length, newArrivalProducts.length, itemsToShow]);

  // Re-enable animation after the seamless jump
  useEffect(() => {
    if (!isAnimating) {
      requestAnimationFrame(() => setIsAnimating(true));
    }
  }, [isAnimating]);

  // --- Conditional Rendering for Loading, Error, and No Products States ---
  if (loading) {
    return (
      <div className="bg-black h-96 flex items-center justify-center text-yellow-400 font-redhead">
        <p>Loading New Arrivals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black h-96 flex items-center justify-center text-red-500 font-redhead">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (newArrivalProducts.length === 0) {
    return (
      <div className="bg-black py-12 flex items-center justify-center text-white font-redhead">
        <p>No new arrivals to show right now. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-yellow-400 pt-12 pb-8 overflow-hidden font-redhead">
      <div className="flex flex-col justify-between relative mb-10">
        <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
        <h2 className="text-center text-3xl md:text-5xl font-bold tracking-widest text-yellow-500 my-5 px-4">
          NEW ARRIVALS
        </h2>
        <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
      </div>

      <div className="relative flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-gray-800/90 rounded-full disabled:opacity-50"
          disabled={newArrivalProducts.length <= itemsToShow}
        >
          <ChevronLeft className="h-6 w-6 text-yellow-500" />
        </button>

        <div className="w-full overflow-hidden">
          <div
            className={`flex ${isAnimating ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{
              width: `${(loopedProducts.length * 100) / itemsToShow}%`,
              transform: `translateX(-${(currentIndex * 100) / loopedProducts.length}%)`,
            }}
          >
            {loopedProducts.map((product, index) => (
              <Link
                key={`${product._id}-${index}`}
                href={`/product/${product._id}`}
                className="group relative flex-shrink-0 block"
                style={{ width: `${100 / loopedProducts.length}%` }}
              >
                <div className="px-1 sm:px-2">
                  <Image
                    width={400}
                    height={600}
                    src={product.images[0] || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-[70vh] sm:h-[80vh] object-cover"
                  />
                  <div className="absolute inset-0 flex items-end p-4">
                    <h3 className="absolute bottom-4 left-2 text-5xl font-bold text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-x-full group-hover:translate-x-0 vertical-text">
                      {product.name.toUpperCase()}
                    </h3>
                    <p className="absolute top-2 right-4 text-lg font-semibold text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform -translate-y-full group-hover:translate-y-0">
                      &#8377;{product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-gray-800/90 rounded-full disabled:opacity-50"
          disabled={newArrivalProducts.length <= itemsToShow}
        >
          <ChevronRight className="h-6 w-6 text-yellow-500" />
        </button>
      </div>

      <div className="text-center my-8">
        <Link href={'/allproducts'}>
          <button className="bg-transparent border border-yellow-500 text-yellow-500 py-3 px-10 hover:bg-yellow-500 hover:text-black transition-colors duration-300 tracking-widest">
            VIEW MORE
          </button>
        </Link>
      </div>
      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default NewArrivals;