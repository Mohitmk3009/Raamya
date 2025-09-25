

'use client';
import React, { useState } from "react";
import VideoModal from "./VideoModal";
import { Play } from "lucide-react"; // ✅ Lucide Play icon
import Link from "next/link";

const videos = [
    { id: 1, src: "/videos/video2.mp4", poster: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, src: "/videos/video2.mp4", poster: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsfGVufDB8fDB8fHww" },
    { id: 3, src: "/videos/video3.mp4", poster: "https://plus.unsplash.com/premium_photo-1669703777695-f8052a432411?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, src: "/videos/video4.mp4", poster: "https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9kZWx8ZW58MHx8MHx8fDA%3D" },
    { id: 5, src: "/videos/video5.mp4", poster: "https://plus.unsplash.com/premium_photo-1707932497939-bca3196336f3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, src: "/videos/video6.mp4", poster: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vZGVsfGVufDB8fDB8fHww" },
];

export default function VideoGallery() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <>
            <div className='flex flex-col justify-between  relative pb-10 bg-black font-redhead'>

                <div className="bg-[#EFAF00] h-2 w-full blur-lg"></div>
                <h2 className="text-center text-3xl md:text-5xl font-bold tracking-widest text-[#EFAF00] my-5 px-4">
                   FOLLOW US ON INSTAGRAM <Link href={'https://www.instagram.com/raamya___?igsh=MWpiNTFoa2NuM29maQ=='} target="_blank"> @Raamya</Link>
                </h2>
                <div className="bg-[#EFAF00] h-2 w-full blur-lg"></div>

            </div>
            <div className="p-6  bg-black min-h-screen flex justify-center">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                    {/* Column 1 */}
                    <div className="flex flex-col lg:gap-10 gap-5 ">
                        {videos[0] && (
                            <VideoCard video={videos[0]} onClick={() => setSelectedVideo(videos[0].src)} className="lg:h-[600px] w-full lg:w-[400px]" />
                        )}
                        {videos[3] && (
                            <VideoCard video={videos[3]} onClick={() => setSelectedVideo(videos[3].src)} className="lg:h-[600px] w-full lg:w-[400px]" />
                        )}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col lg:gap-10 gap-5 lg:mt-20">
                        {videos[1] && (
                            <VideoCard video={videos[1]} onClick={() => setSelectedVideo(videos[1].src)} className="lg:h-[600px] w-full lg:w-[400px]" />
                        )}
                        {videos[4] && (
                            <VideoCard video={videos[4]} onClick={() => setSelectedVideo(videos[4].src)} className="lg:h-[600px] w-full lg:w-[400px]" />
                        )}
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col lg:gap-10 gap-5 ">
                        {videos[2] && (
                            <VideoCard video={videos[2]} onClick={() => setSelectedVideo(videos[2].src)} className="lg:h-[600px] w-full lg:w-[400px]" />
                        )}
                        {videos[5] && (
                            <VideoCard video={videos[5]} onClick={() => setSelectedVideo(videos[5].src)} className="lg:h-[600px] w-full lg:w-[400px]" />
                        )}
                    </div>

                </div>

                {/* Modal */}
                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoSrc={selectedVideo}
                />
            </div>
        </>

    );
}

/* Reusable VideoCard component */
function VideoCard({ video, onClick, className }) {
    return (
        <div
            className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg ${className}`}
            onClick={onClick}
        >
            <video
                src={video.src}
                poster={video.poster}
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onMouseOver={(e) => e.currentTarget.play()}
                onMouseOut={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.load(); // reset to poster
                }}
            />
            {/* Play Overlay Icon (only on hover) */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={48} className="text-white" />
            </div>
        </div>
    );
}


// 'use client';
// import React, { useState } from "react";
// import VideoModal from "./VideoModal";
// import { Play } from "lucide-react";

// const videos = [
//     { id: 1, src: "/videos/video1.mp4", poster: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { id: 2, src: "/videos/video2.mp4", poster: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsfGVufDB8fDB8fHww" },
//     { id: 3, src: "/videos/video3.mp4", poster: "https://plus.unsplash.com/premium_photo-1669703777695-f8052a432411?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { id: 4, src: "/videos/video4.mp4", poster: "https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9kZWx8ZW58MHx8MHx8fDA%3D" },
//     { id: 5, src: "/videos/video5.mp4", poster: "https://plus.unsplash.com/premium_photo-1707932497939-bca3196336f3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
//     { id: 6, src: "/videos/video6.mp4", poster: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vZGVsfGVufDB8fDB8fHww" },
// ];

// export default function VideoGallery() {
//     const [selectedVideo, setSelectedVideo] = useState(null);

//     // ✅ Programmatically create columns for a scalable and clean layout
//     const columns = [[], [], []];
//     videos.forEach((video, index) => {
//         columns[index % 3].push(video); // Distributes videos into 3 columns
//     });

//     return (
//         <>
//             <div className='flex flex-col justify-between relative pb-10 bg-black font-redhead'>
//                 <div className='bg-[#EFAF00] h-2 w-full blur-lg'></div>
//                 {/* ✅ MODIFICATION: Responsive heading font size */}
//                 <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-[#EFAF00] my-5 uppercase px-4">
//                     follow us on instagram @raamya
//                 </h2>
//                 <div className='bg-[#EFAF00] h-2 w-full blur-lg'></div>
//             </div>

//             {/* ✅ MODIFICATION: Added padding and max-width for better spacing */}
//             <div className="p-4 sm:p-6 bg-black min-h-screen">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
//                     {columns.map((col, colIndex) => (
//                         <div
//                             key={colIndex}
//                             // ✅ MODIFICATION: Staggered margin is now applied only on desktop
//                             className={`flex flex-col gap-4 md:gap-6 ${colIndex === 1 ? 'md:mt-20' : ''}`}
//                         >
//                             {col.map((video) => (
//                                 <VideoCard
//                                     key={video.id}
//                                     video={video}
//                                     onClick={() => setSelectedVideo(video.src)}
//                                 />
//                             ))}
//                         </div>
//                     ))}
//                 </div>

//                 <VideoModal
//                     isOpen={!!selectedVideo}
//                     onClose={() => setSelectedVideo(null)}
//                     videoSrc={selectedVideo}
//                 />
//             </div>
//         </>
//     );
// }

// /* Reusable VideoCard component */
// function VideoCard({ video, onClick }) { // Removed className from props
//     return (
//         <div
//             // ✅ MODIFICATION: Removed fixed sizes, now uses aspect ratio for a consistent vertical video shape
//             className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg w-full aspect-[9/16]"
//             onClick={onClick}
//         >
//             <video
//                 src={video.src}
//                 poster={video.poster}
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                 onMouseOver={(e) => e.currentTarget.play()}
//                 onMouseOut={(e) => {
//                     e.currentTarget.pause();
//                     e.currentTarget.load(); // reset to poster
//                 }}
//             />
//             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Play size={48} className="text-white" />
//             </div>
//         </div>
//     );
// }