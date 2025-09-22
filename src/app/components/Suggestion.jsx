// 'use client'
// import React, { useState, useEffect, useRef, useMemo } from 'react';

// // --- Product Data ---
// // You can fetch this data from an API or have it in a separate file.
// const products = [
//     { id: 1, category: 'T-Shirt', name: 'Basic Slim Fit T-Shirt', price: 199, image1: 'https://images.unsplash.com/photo-1683849117820-a9c2fd92f3b9?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://images.unsplash.com/photo-1683849116110-56294e55920e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  },
//     { id: 2, category: 'T-Shirt', name: 'Basic Heavy Weight T-Shirt', price: 249, image1: 'https://images.unsplash.com/photo-1579809160635-5eeeeae4d79f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://images.unsplash.com/photo-1579809160794-b857f9898832?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  },
//     { id: 3, category: 'Zipper', name: 'Full Sleeve Zipper', price: 350, image1: 'https://images.unsplash.com/photo-1740128041074-7fc1593e7851?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://images.unsplash.com/photo-1740128041010-5b1f934db955?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  },
//     { id: 4, category: 'Zipper', name: 'Stylish Sleeve Zipper', price: 299, image1: 'https://plus.unsplash.com/premium_photo-1682095661711-f5d67d0e75a9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://plus.unsplash.com/premium_photo-1682095672918-234595db1df8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  },
//     { id: 5, category: 'T-Shirt', name: 'Casual Full Sleeve', price: 150, image1: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://images.unsplash.com/photo-1503342250614-ca440786f637?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  },
//     { id: 6, category: 'Jacket', name: 'Denim Classic Jacket', price: 499, image1: 'https://plus.unsplash.com/premium_photo-1734388423063-bcad4a2d2d9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://plus.unsplash.com/premium_photo-1734388423075-047e2039d5fd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', },
//     { id: 7, category: 'Hoodie', name: 'Oversized Comfy Hoodie', price: 399, image1: 'https://plus.unsplash.com/premium_photo-1673758905600-4863f662bc1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://plus.unsplash.com/premium_photo-1673758910160-029abce3cd81?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  },
//     { id: 8, category: 'Jeans', name: 'Slim-fit Black Jeans', price: 450, image1: 'https://plus.unsplash.com/premium_photo-1664875849194-0adbac28529f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://plus.unsplash.com/premium_photo-1664875849457-a73a4231f115?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',  },
// ];

// // --- Chevron Icon Component ---
// const ChevronIcon = ({ direction = 'left', ...props }) => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         {...props}
//     >
//         {direction === 'left' ? (
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         ) : (
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         )}
//     </svg>
// );


// // --- Product Card Component ---
// const ProductCard = ({ product }) => (
//     <div className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 p-2 font-redhead">
//         <div className="bg-gray-900 rounded-lg overflow-hidden group">
//             <div className="relative aspect-[3/4] overflow-hidden">
//                 <img
//                     src={product.image1}
//                     alt={product.name}
//                     className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-in-out opacity-100 hover:scale-110 group-hover:opacity-0"
//                 />
//                 <img
//                     src={product.image2}
//                     alt={product.name}
//                     className="absolute inset-0 w-full h-full object-cover transition-all duration-300 ease-in-out opacity-0 hover:scale-110 group-hover:opacity-100"
//                 />
//             </div>
//             <div className="p-4">
//                 <p className="text-sm text-yellow-400">{product.category}</p>
//                 <div className='flex justify-between items-center mt-1'>
//                     <h3 className="font-bold text-gray-200 truncate">{product.name}</h3>
//                     <p className="text-lg font-semibold text-yellow-400">&#8377;{product.price}</p>

//                 </div>
//                 {/* <div className="flex justify-between items-center mt-2">
//                     <div className="flex space-x-1">
//                         <span className="w-4 h-4 rounded-full bg-white border-2 border-gray-500"></span>
//                         <span className="w-4 h-4 rounded-full bg-blue-600 border-2 border-gray-500"></span>
//                         <span className="w-4 h-4 rounded-full bg-gray-800 border-2 border-gray-500"></span>
//                     </div>
//                 </div> */}
//             </div>
//         </div>
//     </div>
// );


// // --- Main Carousel Component ---
// const Suggestion = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [itemsVisible, setItemsVisible] = useState(4);
//     const [isTransitioning, setIsTransitioning] = useState(false);
//     const carouselRef = useRef(null);

//     // --- Responsive Logic ---
//     useEffect(() => {
//         const getVisibleItemsCount = () => {
//             if (typeof window !== 'undefined') {
//                 if (window.innerWidth < 640) return 1;
//                 if (window.innerWidth < 1024) return 2;
//             }
//             return 4;
//         };

//         const handleResize = () => {
//             setItemsVisible(getVisibleItemsCount());
//         };

//         handleResize(); // Set initial value on mount
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Create a looped list of products for seamless scrolling
//     const loopedProducts = useMemo(() => {
//         if (products.length <= itemsVisible) return products;
//         const startClones = products.slice(-itemsVisible);
//         const endClones = products.slice(0, itemsVisible);
//         return [...startClones, ...products, ...endClones];
//     }, [itemsVisible]);

//     // Set initial position to the start of the "real" products
//     useEffect(() => {
//         setCurrentIndex(itemsVisible);
//     }, [itemsVisible]);

//     // Handle the infinite loop transition
//     useEffect(() => {
//         if (!isTransitioning) return;
//         const timer = setTimeout(() => {
//             if (carouselRef.current) {
//                 carouselRef.current.style.transitionDuration = '0ms';
//                 if (currentIndex === itemsVisible - 1) {
//                     setCurrentIndex(products.length + itemsVisible - 1);
//                 } else if (currentIndex === products.length + itemsVisible) {
//                     setCurrentIndex(itemsVisible);
//                 }
//             }
//             const transitionEndTimer = setTimeout(() => {
//                 setIsTransitioning(false);
//                 if (carouselRef.current) {
//                     carouselRef.current.style.transitionDuration = '500ms';
//                 }
//             }, 50);
//             return () => clearTimeout(transitionEndTimer);
//         }, 500);

//         return () => clearTimeout(timer);
//     }, [isTransitioning, currentIndex, itemsVisible, products.length]);


//     // --- Navigation Handlers ---
//     const prev = () => {
//         if (isTransitioning) return;
//         setCurrentIndex((prev) => prev - 1);
//         setIsTransitioning(true);
//     };

//     const next = () => {
//         if (isTransitioning) return;
//         setCurrentIndex((prev) => prev + 1);
//         setIsTransitioning(true);
//     };

//     // --- Sliding Animation ---
//     const transformStyle = {
//         transform: `translateX(-${(currentIndex * 100) / itemsVisible}%)`,
//         transitionProperty: 'transform',
//         transitionTimingFunction: 'ease-in-out',
//     };

//     return (
//         <div className="w-full bg-black pt-12 font-redhead">
//             <div className="flex flex-col justify-between relative mb-10">
//                 <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
//                 <h2 className="text-center text-5xl font-bold tracking-widest text-yellow-500 my-5 uppercase">
//                     You Might Also Like
//                 </h2>
//                 <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
//             </div>
//             <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            
//                 <div className="relative">
//                     {/* Previous Button */}
//                     <button
//                         onClick={prev}
//                         className="absolute top-1/2 left-4 -translate-y-10 bg-black/50 hover:bg-gray-800/90 rounded-full w-10 h-10 flex items-center justify-center text-yellow-400 transition-all duration-300 z-10"
//                         aria-label="Previous Product"
//                     >
//                         <ChevronIcon direction="left" />
//                     </button>

//                     {/* Carousel */}
//                     <div className="overflow-hidden">
//                         <div
//                             ref={carouselRef}
//                             className="flex"
//                             style={transformStyle}
//                         >
//                             {loopedProducts.map((product, index) => (
//                                 // Using index for key is acceptable here because the list is static within a render
//                                 <ProductCard key={`${product.id}-${index}`} product={product} />
//                             ))}
//                         </div>
//                     </div>

//                     {/* Next Button */}
//                     <button
//                         onClick={next}
//                         className="absolute top-1/2 right-4 -translate-y-10 bg-black/50 hover:bg-gray-800/90 rounded-full w-10 h-10 flex items-center justify-center text-yellow-400 transition-all duration-300 z-10"
//                         aria-label="Next Product"
//                     >
//                         <ChevronIcon direction="right" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Suggestion;

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Suggestion = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsToShow = 4;
  const [currentIndex, setCurrentIndex] = useState(itemsToShow);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef(null);

  // Function to fetch products from the backend
  const fetchNewArrivals = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch products.');
      }
      const data = await response.json();
      const filteredProducts = data.products.filter(product => product.isSuggested);

      setNewArrivalProducts(filteredProducts);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  // Handle auto-play and infinite loop logic only after products are loaded
  const nextSlide = useCallback(() => {
    if (newArrivalProducts.length > 0) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [newArrivalProducts.length]);

  const prevSlide = () => {
    if (newArrivalProducts.length > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const loopedProducts = newArrivalProducts.length > 0 ? [
    ...newArrivalProducts.slice(-itemsToShow),
    ...newArrivalProducts,
    ...newArrivalProducts.slice(0, itemsToShow),
  ] : [];

  // Auto play
  useEffect(() => {
    if (newArrivalProducts.length > 0) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, newArrivalProducts.length]);

  // Handle seamless reset when reaching clones
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

  // Re-enable animation after instant jump
  useEffect(() => {
    if (!isAnimating) {
      requestAnimationFrame(() => setIsAnimating(true));
    }
  }, [isAnimating]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-yellow-400 font-redhead">
        <p>Loading new suggestion...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-red-500 font-redhead">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (newArrivalProducts.length === 0) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white font-redhead">
        <p>No new suggestion found.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-yellow-400 pt-12 pb-8 overflow-hidden font-redhead">
      <div className="flex flex-col justify-between relative mb-10">
        <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
        <h2 className="text-center text-5xl font-bold tracking-widest text-yellow-500 my-5 uppercase">
         you may like this
        </h2>
        <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-10 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-gray-800/90 rounded-full hover:bg-opacity-75"
        >
          <ChevronLeft className="h-6 w-6 text-yellow-500" />
        </button>

        {/* Carousel */}
        <div
          className={`flex ${isAnimating ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
            width: `${(loopedProducts.length * 100) / itemsToShow}%`,
          }}
        >
          {loopedProducts.map((product, index) => (
            <Link
              key={index}
              href={`/product/${product._id}`}
              className="group relative flex-shrink-0 block"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <Image
                width={400}
                height={600}
                src={product.images[0] || '/placeholder.png'}
                alt={product.name}
                className="w-full h-[80vh] object-cover"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="absolute bottom-4 left-2 text-5xl font-bold text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-x-full group-hover:translate-x-0 vertical-text">
                  {product.name.toUpperCase()}
                </h3>
                <p className="absolute top-2 right-4 text-lg font-semibold text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform -translate-y-full group-hover:translate-y-0">
                  &#8377;{product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-10 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-gray-800/90 rounded-full hover:bg-opacity-75"
        >
          <ChevronRight className="h-6 w-6 text-yellow-500" />
        </button>
      </div>

      {/* <div className="text-center my-8">
        <button className="bg-transparent border border-yellow-500 text-yellow-500 py-3 px-10 hover:bg-yellow-500 hover:text-black transition-colors duration-300 tracking-widest">
          VIEW MORE
        </button>
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

export default Suggestion;