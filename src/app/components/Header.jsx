'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import login from '../../assets/icons/login.png';
import bag from '../../assets/icons/bag.png';
import heart from '../../assets/icons/heart.png';

// SVG Icon for Google
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

// SVG Icon for Dropdown Chevron
const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

export default function Header() {
    const { isAuthenticated, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const CATEGORIES = ['IT girl', 'Girly Pop', 'bloom girl', 'desi diva', 'street chic'];

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <>
            <style jsx global>{`
                @import url('https://db.onlinewebfonts.com/c/b3c57ee1d58f270818c2df37acff9fbc?family=Black+No.7');
                @import url("https://db.onlinewebfonts.com/c/5c55a2b5490cd6ebc5d9b2fa18e7d9df?family=Real+Head+Web+W01+Bold");
                .font-redhead { font-family: 'Real Head Web W01 Bold', sans-serif; }
                .font-black-no7-style { font-family: 'Black No.7'; }
            `}</style>

            {/* Added sticky, top-0, and z-50 for the sticky effect */}
            <header className="bg-black text-yellow-400 shadow-md w-full font-redhead sticky top-0 z-50">
                <div className="mx-auto flex items-center justify-between p-4">
                    {/* Logo */}
                    <div className="text-5xl font-bold tracking-wider bg-gradient-to-b text-transparent bg-clip-text from-yellow-400 mt-[-10px] to-yellow-800">
                        <Link href="/homepage">RAAMYA</Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8 text-sm tracking-widest">
                        <Link href="/allproducts" className="hover:text-white transition-colors duration-300">ALL PRODUCTS</Link>
                        <Link href="#" className="hover:text-white transition-colors duration-300">MOST WANTED</Link>
                        <Link href="#" className="hover:text-white transition-colors duration-300">NEW ARRIVALS</Link>
                        
                        {/* Categories Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center hover:text-white transition-colors duration-300"
                            >
                                CATEGORIES
                                <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-yellow-500/50">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        {CATEGORIES.map((category) => (
                                            <Link
                                                key={category}
                                                href={{ pathname: '/allproducts', query: { category: category } }}
                                                className="block px-4 py-2 text-sm text-yellow-400 hover:bg-gray-800 hover:text-white"
                                                role="menuitem"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                {category}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link href="/contactus" className="hover:text-white transition-colors duration-300">CONTACT</Link>
                    </nav>

                    {/* Right-side Icons and Auth buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/cart" className='rounded-full bg-yellow-400 p-2 hover:scale-110 transition-all duration-300'>
                            <Image width={30} height={30} src={bag} alt="Shopping Cart Icon" className="w-6 h-6" />
                        </Link>
                        
                        {isAuthenticated ? (
                            <>
                                <Link href="/myaccount" className='rounded-full bg-white p-2 hover:scale-110 transition-all duration-300'>
                                    <Image width={40} height={40} src={login} alt="User Profile Icon" className="w-6 h-6" />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className='rounded-full bg-gray-200 p-2 hover:scale-110 transition-all duration-300'>
                                    <Image width={40} height={40} src={login} alt="Login Icon" className="w-6 h-6" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}