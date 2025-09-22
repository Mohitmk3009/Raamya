// 'use client';

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import Image from 'next/image';

// const products = [
//   { id: 1, name: 'Urban Luxe T-Shirt', price: '1500/-', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
//   { id: 2, name: 'Active Activewear Top', price: '1500/-', imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80' },
//   { id: 3, name: 'Minimal Glow Denim', price: '1500/-', imageUrl: 'https://images.unsplash.com/photo-1601762603339-fd61e28b698a?auto=format&fit=crop&w=800&q=80' },
//   { id: 4, name: 'Emerald Green Blazer', price: '1670/-', imageUrl: 'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=800&q=80' },
//   { id: 5, name: 'Classic Black Hoodie', price: '2200/-', imageUrl: 'https://images.unsplash.com/photo-1523297467724-f6758d7124c5?auto=format&fit=crop&w=800&q=80' },
//   { id: 6, name: 'Sunset Orange Dress', price: '3100/-', imageUrl: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=800&q=80' },
//   { id: 7, name: 'Ocean Blue Jumpsuit', price: '2850/-', imageUrl: 'https://images.unsplash.com/photo-1512310604669-443f26c35f52?q=80&w=734&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
// ];

// const NewArrivals = () => {
//   const itemsToShow = 4;
//   const [currentIndex, setCurrentIndex] = useState(itemsToShow); // start from cloned section
//   const [isAnimating, setIsAnimating] = useState(true);
//   const containerRef = useRef(null);


//   // clone: last few + all + first few
//   const loopedProducts = [
//     ...products.slice(-itemsToShow),
//     ...products,
//     ...products.slice(0, itemsToShow),
//   ];

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prev) => prev + 1);
//   }, []);

//   const prevSlide = () => {
//     setCurrentIndex((prev) => prev - 1);
//   };

//   // Auto play
//   useEffect(() => {
//     const interval = setInterval(nextSlide, 3000);
//     return () => clearInterval(interval);
//   }, [nextSlide]);

//   // Handle seamless reset when reaching clones
//   useEffect(() => {
//     if (currentIndex === loopedProducts.length - itemsToShow) {
//       // reached cloned end → reset
//       setTimeout(() => {
//         setIsAnimating(false);
//         setCurrentIndex(itemsToShow);
//       }, 500); // wait for animation
//     }
//     if (currentIndex === 0) {
//       // reached cloned start → reset
//       setTimeout(() => {
//         setIsAnimating(false);
//         setCurrentIndex(products.length);
//       }, 500);
//     }
//   }, [currentIndex, loopedProducts.length]);

//   // re-enable animation after instant jump
//   useEffect(() => {
//     if (!isAnimating) {
//       requestAnimationFrame(() => setIsAnimating(true));
//     }
//   }, [isAnimating]);

//   return (
//     <div className="bg-black text-yellow-400 pt-12 pb-8 overflow-hidden font-redhead">
//       <div className="flex flex-col justify-between relative mb-10">
//         <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
//         <h2 className="text-center text-5xl font-bold tracking-widest text-yellow-500 my-5">
//           NEW ARRIVALS
//         </h2>
//         <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
//       </div>

//       <div className="relative flex items-center justify-center">
//         {/* Left Arrow */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-10 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-gray-800/90 rounded-full hover:bg-opacity-75"
//         >
//           <ChevronLeft className="h-6 w-6 text-yellow-500" />
//         </button>

//         {/* Carousel */}
//         <div
//   className={`flex ${isAnimating ? 'transition-transform duration-700 ease-in-out' : ''}`}
//   style={{
//     transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
//     width: `${(loopedProducts.length * 100) / itemsToShow}%`, // total width = #items * (100/itemsToShow)
//   }}
// >
//   {loopedProducts.map((product, index) => (
//     <div
//       key={index}
//       className="group relative flex-shrink-0"
//       style={{ width: `${100 / itemsToShow}%` }} // each item = 100/itemsToShow %
//     >
//       <Image
//         width={400}
//         height={600}
//         src={product.imageUrl}
//         alt={product.name}
//         className="w-full h-[80vh] object-cover"
//       />

//       {/* Hover Overlay */}
//       <div className="absolute inset-0 flex items-end p-4">
//         <h3 className="absolute bottom-4 left-2 text-5xl font-bold text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-x-full group-hover:translate-x-0 vertical-text">
//           {product.name.toUpperCase()}
//         </h3>
//         <p className="absolute top-2 right-4 text-lg font-semibold text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform -translate-y-full group-hover:translate-y-0">
//           &#8377;{product.price}
//         </p>
//       </div>
//     </div>
//   ))}
// </div>


//         {/* Right Arrow */}
//         <button
//           onClick={nextSlide}
//           className="absolute right-10 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-gray-800/90 rounded-full hover:bg-opacity-75"
//         >
//           <ChevronRight className="h-6 w-6 text-yellow-500" />
//         </button>
//       </div>

//       <div className="text-center my-8">
//         <button className="bg-transparent border border-yellow-500 text-yellow-500 py-3 px-10 hover:bg-yellow-500 hover:text-black transition-colors duration-300 tracking-widest">
//           VIEW MORE
//         </button>
//       </div>

//       <style jsx global>{`
//         .vertical-text {
//           writing-mode: vertical-rl;
//           text-orientation: mixed;
//           transform: rotate(180deg);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default NewArrivals;
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NewArrivals = () => {
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
      const filteredProducts = data.products.filter(product => product.isNewArrival);

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
        <p>Loading new arrivals...</p>
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
        <p>No new arrivals found.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-yellow-400 pt-12 pb-8 overflow-hidden font-redhead">
      <div className="flex flex-col justify-between relative mb-10">
        <div className="bg-yellow-400 h-2 w-full blur-lg"></div>
        <h2 className="text-center text-5xl font-bold tracking-widest text-yellow-500 my-5">
          NEW ARRIVALS
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

      <div className="text-center my-8">
        <Link href={'/allproducts'} >
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