'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable'; // NEW: Import the swipe hook

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Suggestions = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [itemsToShow, setItemsToShow] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2); // Tablet
      } else {
        setItemsToShow(4); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products.');
      }
      const data = await response.json();
      const productsToFilter = Array.isArray(data.products) ? data.products : [];
      const filteredProducts = productsToFilter.filter(product => product.isSuggested);
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
  
  const sourceProducts = useMemo(() => {
    if (newArrivalProducts.length === 0) {
      return [];
    }
    let source = [...newArrivalProducts];
    while (source.length > 0 && source.length < itemsToShow + 1) {
      source = [...source, ...newArrivalProducts];
    }
    return source;
  }, [newArrivalProducts, itemsToShow]);

  useEffect(() => {
    setCurrentIndex(itemsToShow);
  }, [itemsToShow, sourceProducts]);

  const loopedProducts = useMemo(() => {
    return sourceProducts.length > 0 ? [
      ...sourceProducts.slice(-itemsToShow),
      ...sourceProducts,
      ...sourceProducts.slice(0, itemsToShow),
    ] : [];
  }, [sourceProducts, itemsToShow]);

  const nextSlide = useCallback(() => {
    if (sourceProducts.length > 0) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [sourceProducts.length]);

  const prevSlide = () => {
    if (sourceProducts.length > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (sourceProducts.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, sourceProducts.length]);

  useEffect(() => {
    if (loopedProducts.length > 0) {
      if (currentIndex >= sourceProducts.length + itemsToShow) {
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(itemsToShow);
        }, 750); 
      } 
      else if (currentIndex <= 0) {
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(sourceProducts.length);
        }, 750);
      }
    }
  }, [currentIndex, loopedProducts.length, sourceProducts.length, itemsToShow]);

  useEffect(() => {
    if (!isAnimating) {
      requestAnimationFrame(() => setIsAnimating(true));
    }
  }, [isAnimating]);

  // NEW: Set up swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true, // Prevents scrolling the page up/down when swiping
    trackMouse: true // Allows dragging with a mouse as well
  });

  // --- Conditional UI ---
  if (loading) {
    return (
      <div className="bg-black h-96 flex items-center justify-center text-yellow-400 font-redhead">
        <p>Loading New Suggestions...</p>
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
        <p>No new Suggestions to show right now. Check back soon!</p>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="bg-black text-yellow-400 lg:pt-12 pt-6 lg:pb-8 overflow-hidden font-redhead">
      <div className="flex flex-col justify-between relative mb-10">
        <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
        <h2 className="text-center text-3xl md:text-5xl font-bold tracking-widest text-yellow-500 my-5 px-4 uppercase">
          You May Also Like
        </h2>
        <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
      </div>

      <div className="relative flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-gray-800/90 rounded-full disabled:opacity-50"
          disabled={newArrivalProducts.length === 0}
        >
          <ChevronLeft className="h-6 w-6 text-yellow-500" />
        </button>

        {/* NEW: Spread the handlers onto the swipeable container */}
        <div className="w-full overflow-hidden" {...handlers}>
          <div
            className={`flex ${isAnimating ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{
              cursor: 'grab', // NEW: Changes the cursor to indicate it's draggable
              width: `${(loopedProducts.length * 100) / itemsToShow}%`,
              transform: `translateX(-${(currentIndex * 100) / loopedProducts.length}%)`,
            }}
          >
            {loopedProducts.map((product, index) => (
              <Link
                key={`${product._id}-${index}`}
                href={`/product/${product._id}`}
                className={`group relative flex-shrink-0 block
                  ${itemsToShow === 1 ? "px-1" : "px-1 sm:px-0"}`}
                style={{ width: `${100 / loopedProducts.length}%` }}
                onClick={(e) => { 
                  // NEW: Prevents link click when dragging
                  if (handlers.trackMouse && e.movementX !== 0) {
                    e.preventDefault();
                  }
                }}
              >
                <Image
                  width={400}
                  height={600}
                  src={product.images[0] || '/placeholder.png'}
                  alt={product.name}
                  className={`w-full ${itemsToShow === 1 ? "h-[60vh]" : "h-[70vh] sm:h-[80vh]"} object-cover`}
                />

                {itemsToShow === 1 ? (
                  // --- Mobile Layout ---
                  <div className=" absolute bottom-0 text-center w-full bg-black/50 pr-4">
                    <h3 className="text-lg font-bold text-yellow-500 tracking-wider">{product.name}</h3>
                    <p className="text-xs text-yellow-300 uppercase tracking-wider ">{product.category || 'Category'}</p>
                    <p className="text-sm text-yellow-400 tracking-wider">&#8377;{product.price}</p>
                  </div>
                ) : (
                  // --- Desktop Layout ---
                  <div className="absolute inset-0 flex items-end p-4">
                    <h3 className="absolute bottom-4 left-2 text-5xl font-bold text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-x-full group-hover:translate-x-0 vertical-text">
                      {product.name.toUpperCase()}
                    </h3>
                    <div className="absolute top-2 right-4 text-right opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform -translate-y-full group-hover:translate-y-0">
                      <p className="text-lg font-semibold text-yellow-500">&#8377;{product.price}</p>
                      <p className="text-sm text-yellow-300 uppercase">{product.category || 'Category'}</p>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-gray-800/90 rounded-full disabled:opacity-50"
          disabled={newArrivalProducts.length === 0}
        >
          <ChevronRight className="h-6 w-6 text-yellow-500" />
        </button>
      </div>

      {/* <div className="text-center my-8">
        <Link href={'/allproducts?filter=newArrivals'}>
          <button className="bg-transparent border border-yellow-500 text-yellow-500 py-3 px-10 hover:bg-yellow-500 hover:text-black transition-colors duration-300 tracking-widest">
            VIEW MORE
          </button>
        </Link>
      </div> */}

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

export default Suggestions;