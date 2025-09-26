'use client';
import React, { useState } from "react";
import VideoModal from "./VideoModal";
import { Play } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

const mediaPosts = [
    {
        id: 1,
        type: 'video',
        mediaSrc: "/videos/video-1.mp4",
        poster: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        username: "raamya___",
        caption: "This Navratri, no repeats, no excuses. 🪞 9 looks. Infinite Nazar.\nWhich one's most wanted for you? 🫶🏼\n\nTag your Garba +1 and let them pick your outfit.💃",
        date: "21 September"
    },
    {
        id: 2,
        type: 'image',
        mediaSrc: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Make sure this path is correct and the image exists
        username: "raamya___",
        caption: "A beautiful day in pink and white.",
        date: "25 September"
    },
    {
        id: 3,
        type: 'video',
        mediaSrc: "/videos/video-1.mp4",
        poster: "https://plus.unsplash.com/premium_photo-1669703777695-f8052a432411?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        username: "raamya___",
        caption: "Ready for the festivities! 🎉",
        date: "26 September"
    },
    {
        id: 4,
        type: 'image',
        mediaSrc: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Make sure this path is correct and the image exists
        username: "raamya___",
        caption: "And just like that... Navratri mode is ON! 💥",
        date: "22 September"
    },
    {
        id: 5,
        type: 'video',
        mediaSrc: "/videos/video-1.mp4",
        poster: "https://plus.unsplash.com/premium_photo-1707932497939-bca3196336f3?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        username: "raamya___",
        caption: "Feeling the festive vibes.",
        date: "20 September"
    },
    {
        id: 6,
        type: 'video',
        mediaSrc: "/videos/video-1.mp4",
        poster: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vZGVsfGVufDB8fDB8fHww",
        username: "raamya___",
        caption: "Spinning into the new season.",
        date: "19 September"
    },
];

export default function VideoGallery() {
    // ✅ Change state to hold the index of the selected post
    const [selectedIndex, setSelectedIndex] = useState(null);

    const openModal = (index) => {
        setSelectedIndex(index);
    };

    const closeModal = () => {
        setSelectedIndex(null);
    };

    const goToNext = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % mediaPosts.length);
    };

    const goToPrevious = () => {
        setSelectedIndex((prevIndex) => (prevIndex - 1 + mediaPosts.length) % mediaPosts.length);
    };

    return (
        <>
            <div className='flex flex-col justify-between relative pb-10 bg-black font-redhead'>
                <div className="bg-[#EFAF00] h-2 w-full blur-lg"></div>
                <h2 className="text-center text-2xl md:text-5xl font-bold tracking-widest text-[#EFAF00] lg:my-5 my-2 lg:px-4 px-4">
                    FOLLOW US ON INSTAGRAM <Link href={'https://www.instagram.com/raamya___?igsh=MWpiNTFoa2NuM29maQ=='} target="_blank"> @Raamya___</Link>
                </h2>
                <div className="bg-[#EFAF00] h-2 w-full blur-lg"></div>
            </div>
            <div className="p-6 bg-black lg:min-h-screen flex justify-center">
                <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                    {mediaPosts.map((post, index) => (
                        <div key={post.id} className={`${index % 3 === 1 ? 'lg:mt-5 mt-3' : ''}`}> {/* Apply margin to middle column */}
                            <VideoCard post={post} onClick={() => openModal(index)} className="lg:h-[600px] h-[150px] w-full lg:w-[400px]" />
                        </div>
                    ))}
                </div>

                {/* Modal */}
                <VideoModal
                    isOpen={selectedIndex !== null}
                    onClose={closeModal}
                    post={selectedIndex !== null ? mediaPosts[selectedIndex] : null}
                    allPosts={mediaPosts} // ✅ Pass all posts
                    currentIndex={selectedIndex} // ✅ Pass current index
                    goToNext={goToNext} // ✅ Pass navigation functions
                    goToPrevious={goToPrevious} // ✅ Pass navigation functions
                />
            </div>
        </>
    );
}

function VideoCard({ post, onClick, className }) {
    return (
        <div
            className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg ${className}`}
            onClick={onClick}
        >
            {post.type === 'video' ? (
                <video
                    src={post.mediaSrc}
                    poster={post.poster}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseOut={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.load();
                    }}
                />
            ) : (
                <Image
                    src={post.mediaSrc}
                    alt="Instagram Post"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
            )}
            
            {post.type === 'video' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={48} className="text-white" />
                </div>
            )}
        </div>
    );
}