// 'use client';
// import React, { useState, useEffect, useRef } from 'react';

// export default function LoadingScreen() {
//   const [position1, setPosition1] = useState({ top: '0%', left: '0%' });
//   const [position2, setPosition2] = useState({ top: '100%', left: '100%' });
//   const [slideUp, setSlideUp] = useState(false);

//   const requestRef = useRef();
//   const angleRef = useRef(0);

//   // Circles animation
//   const animate = () => {
//     angleRef.current += 0.005;

//     const top1 = 50 + 40 * Math.sin(angleRef.current);
//     const left1 = 50 + 40 * Math.cos(angleRef.current);

//     const top2 = 50 - 40 * Math.sin(angleRef.current);
//     const left2 = 50 - 40 * Math.cos(angleRef.current);

//     setPosition1({ top: `${top1}%`, left: `${left1}%` });
//     setPosition2({ top: `${top2}%`, left: `${left2}%` });

//     requestRef.current = requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate);

//     // Trigger slide after 3 seconds
//     const timer = setTimeout(() => {
//       setSlideUp(true);
//     }, 3000);

//     return () => {
//       cancelAnimationFrame(requestRef.current);
//       clearTimeout(timer);
//     };
//   }, []);

//   return (
//     <>
//       <style jsx global>{`
//         @keyframes zoomInAndStay {
//           0% {
//             transform: scale(0.5) rotate(-45deg);
//             opacity: 0;
//           }
//           100% {
//             transform: scale(1) rotate(-45deg);
//             opacity: 0.3;
//           }
//         }
//         .animate-zoom-in {
//           animation: zoomInAndStay 1.5s ease-out forwards;
//         }
//         @keyframes fadeInUp {
//           0% {
//             opacity: 0;
//             transform: translateY(30px) scale(0.95);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fadeInUp 1.2s ease-out 0.5s forwards;
//           opacity: 0;
//         }
//       `}</style>

//       <main
//         className={`fixed inset-0 z-50 flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-black font-redhead transform transition-transform duration-1000 ${
//           slideUp ? "-translate-y-full" : "translate-y-0"
//         }`}
//       >
//         {/* Decorative curved lines */}
//         {/* <div className="absolute -top-96 -right-96 w-[800px] h-[800px] border-2 border-white animate-zoom-in rounded-full opacity-20"></div> */}
//         {/* <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] border-2 border-white animate-zoom-in rounded-full opacity-20"></div> */}

//         {/* First moving blurry circle */}
//         {/* <div
//           className="absolute w-[800px] h-[800px] bg-white rounded-full transition-all duration-1000 ease-linear blur-3xl opacity-10"
//           style={{
//             top: position1.top,
//             left: position1.left,
//             transform: 'translate(-50%, -50%)',
//           }}
//         ></div> */}

//         {/* Second moving blurry circle */}
//         {/* <div
//           className="absolute w-[800px] h-[800px] bg-white rounded-full transition-all duration-1000 ease-linear blur-3xl opacity-10"
//           style={{
//             top: position2.top,
//             left: position2.left,
//             transform: 'translate(-50%, -50%)',
//           }}
//         ></div> */}

//         {/* RAAMYA Text */}
//         <div className="relative flex flex-col items-center">
//           {/* <div className="w-full flex flex-col items-start">
//             <div className="w-20 md:w-28 h-1 bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 animate-fade-in-up"></div>
//           </div> */}

//           <h1
//             className="font-redhead text-7xl md:text-[250px] font-bold tracking-wider text-transparent bg-clip-text mb-[20px] bg-gradient-to-b from-[#EFAF00]  to-yellow-800 animate-fade-in-up"
//             // style={{ fontFamily: "'Black No.7', sans-serif" }}
//           >
//             {/* mt-[-90px]  */}
//             RAAMYA
//           </h1>

//           {/* <div className="w-full flex flex-col items-end">
//             <div className="w-20 md:w-28 h-1 bg-gradient-to-r mr-2 from-yellow-500 via-amber-300 to-yellow-500 animate-fade-in-up"></div>
//           </div> */}
//         </div>
//       </main>
//     </>
//   );
// }

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useContentProtection } from '../hooks/useContentProtection';
export default function LoadingScreen() {
  useContentProtection();
  const [position1, setPosition1] = useState({ top: '0%', left: '0%' });
  const [position2, setPosition2] = useState({ top: '100%', left: '100%' });
  const [slideUp, setSlideUp] = useState(false);

  const requestRef = useRef();
  const angleRef = useRef(0);

  // Circles animation
  const animate = () => {
    angleRef.current += 0.005;

    const top1 = 50 + 40 * Math.sin(angleRef.current);
    const left1 = 50 + 40 * Math.cos(angleRef.current);

    const top2 = 50 - 40 * Math.sin(angleRef.current);
    const left2 = 50 - 40 * Math.cos(angleRef.current);

    setPosition1({ top: `${top1}%`, left: `${left1}%` });
    setPosition2({ top: `${top2}%`, left: `${left2}%` });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);

    // Trigger slide after 3 seconds
    const timer = setTimeout(() => {
      setSlideUp(true);
    }, 3000);

    return () => {
      cancelAnimationFrame(requestRef.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes zoomInAndStay {
          0% {
            transform: scale(0.5) rotate(-45deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotate(-45deg);
            opacity: 0.3;
          }
        }
        .animate-zoom-in {
          animation: zoomInAndStay 1.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>

      <main
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none touch-action-manipulation w-full h-[100vh] overflow-hidden bg-black font-redhead transform transition-transform duration-1000 ${
          slideUp ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Decorative curved lines - Made responsive */}
        {/* <div className="absolute -top-48 -right-48 w-[400px] h-[400px] md:-top-96 md:-right-96 md:w-[800px] md:h-[800px] border-2 border-white animate-zoom-in rounded-full opacity-20"></div>
        <div className="absolute -bottom-48 -left-48 w-[400px] h-[400px] md:-bottom-96 md:-left-96 md:w-[800px] md:h-[800px] border-2 border-white animate-zoom-in rounded-full opacity-20"></div> */}

        {/* First moving blurry circle - Made responsive */}
        {/* <div
          className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-white rounded-full transition-all duration-1000 ease-linear blur-3xl opacity-10"
          style={{
            top: position1.top,
            left: position1.left,
            transform: 'translate(-50%, -50%)',
          }}
        ></div> */}

        {/* Second moving blurry circle - Made responsive */}
        {/* <div
          className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-white rounded-full transition-all duration-1000 ease-linear blur-3xl opacity-10"
          style={{
            top: position2.top,
            left: position2.left,
            transform: 'translate(-50%, -50%)',
          }}
        ></div> */}

        {/* RAAMYA Text */}
        <div className="relative flex flex-col items-center">
          {/* <div className="w-full flex flex-col items-start">
            <div className="w-20 md:w-28 h-1 bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 animate-fade-in-up"></div>
          </div> */}

          <h1
            // Responsive font sizes for different breakpoints
            className="font-redhead text-7xl sm:text-8xl lg:text-[180px] xl:text-[250px] font-bold tracking-wider text-transparent bg-clip-text my-4 bg-gradient-to-b from-[#EFAF00] to-yellow-800 animate-fade-in-up"
          >
            RAAMYA
          </h1>

          {/* <div className="w-full flex flex-col items-end">
            <div className="w-20 md:w-28 h-1 bg-gradient-to-r mr-2 from-yellow-500 via-amber-300 to-yellow-500 animate-fade-in-up"></div>
          </div> */}
        </div>
      </main>
    </>
  );
}