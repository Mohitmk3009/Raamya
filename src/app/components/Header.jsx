'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import login from '../../assets/icons/login.png';
import bag from '../../assets/icons/bag.png';

// --- SVG ICONS ---
const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const CloseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default function Header() {
    const { isAuthenticated } = useAuth();

    // --- STEP 1: Correct State Variables ---
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);       // For DESKTOP dropdown
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);   // For main MOBILE menu panel
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);       // For MOBILE categories dropdown

    const dropdownRef = useRef(null);
    const CATEGORIES = ['IT girl', 'Girly Pop', 'bloom girl', 'desi diva', 'street chic'];

    // Effect to close desktop dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    // Effect to prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto' };
    }, [isMobileMenuOpen]);

    // --- STEP 2: Correct the closeMobileMenu Function ---
    // This now closes the main menu AND resets the category dropdown
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsCategoryOpen(false);
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://db.onlinewebfonts.com/c/b3c57ee1d58f270818c2df37acff9fbc?family=Black+No.7');
                @import url("https://db.onlinewebfonts.com/c/5c55a2b5490cd6ebc5d9b2fa18e7d9df?family=Real+Head+Web+W01+Bold");
                .font-redhead { font-family: 'Real Head Web W01 Bold', sans-serif; }
                .font-black-no7-style { font-family: 'Black No.7'; }
            `}</style>

            <header className="bg-black text-yellow-400 shadow-md w-full font-redhead sticky top-0 z-50">
                <div className="mx-auto flex items-center justify-between md:p-4 p-2">
                    <div className="text-3xl md:text-5xl font-bold tracking-wider bg-gradient-to-b text-transparent bg-clip-text from-yellow-400 md:mt-[-10px] mt-[-5px] to-yellow-800">
                        <Link href="/homepage">RAAMYA</Link>
                    </div>

                    <nav className="hidden lg:flex items-center space-x-8 text-sm tracking-widest">
                        {/* Desktop navigation links... */}
                        <Link href="/allproducts" className="hover:text-white transition-colors duration-300">ALL PRODUCTS</Link>
                        <Link href="#" className="hover:text-white transition-colors duration-300">MOST WANTED</Link>
                        <Link href="#" className="hover:text-white transition-colors duration-300">NEW ARRIVALS</Link>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center hover:text-white transition-colors duration-300"
                            >
                                CATEGORIES
                                <ChevronDownIcon className={`ml-1 h-6 w-6 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-black/70 backdrop-blur-sm ">
                                    <div className="py-1">
                                        {CATEGORIES.map((category) => (
                                            <Link
                                                key={category}
                                                href={{ pathname: '/allproducts', query: { category: category } }}
                                                className="block px-4 py-2 text-sm text-yellow-400 hover:bg-gray-800 hover:text-white"
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

                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Desktop icons... */}
                        <Link href="/cart" className='rounded-full bg-yellow-400 p-2 hover:scale-110 transition-all duration-300'>
                            <Image width={30} height={30} src={bag} alt="Shopping Cart Icon" className="w-6 h-6" />
                        </Link>
                        {isAuthenticated ? (
                            <Link href="/myaccount" className='rounded-full bg-white p-2 hover:scale-110 transition-all duration-300'>
                                <Image width={40} height={40} src={login} alt="User Profile Icon" className="w-6 h-6" />
                            </Link>
                        ) : (
                            <Link href="/login" className='rounded-full bg-gray-200 p-2 hover:scale-110 transition-all duration-300'>
                                <Image width={40} height={40} src={login} alt="Login Icon" className="w-6 h-6" />
                            </Link>
                        )}
                    </div>

                    {/* --- STEP 3: Update Hamburger to use `isMobileMenuOpen` --- */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="relative z-50 h-8 w-8 text-yellow-400" aria-label="Toggle menu">
                            <MenuIcon className={`absolute transition-all mt-[-12px] duration-300 transform ${isMobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
                            <CloseIcon className={`absolute transition-all mt-[-12px] duration-300 transform ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* --- STEP 4: Update Mobile Menu to use correct states --- */}
            {/* --- MOBILE MENU PANEL (SLIDES IN FROM THE RIGHT) --- */}
            <div
                // MODIFICATION 1: Positioned on the right and slides with `translate-x-full`
                className={`fixed top-10 right-0 z-40 bg-black/70 backdrop-blur-sm h-screen w-[70vw]  transition-transform duration-500 ease-in-out lg:hidden ${isMobileMenuOpen ? "-translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Added padding and full height for better alignment */}
                <nav className="flex flex-col items-start justify-center h-fit space-y-5 p-8 text-base tracking-widest text-yellow-400 font-redhead lg:text-xl">

                    {/* MODIFICATION 2: Each item now has a staggered slide-in animation */}
                    <Link
                        href="/allproducts"
                        onClick={closeMobileMenu}
                        className={`hover:text-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        PRODUCTS
                    </Link>

                    <Link
                        href="#"
                        onClick={closeMobileMenu}
                        className={`hover:text-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        MOST WANTED
                    </Link>

                    <Link
                        href="#"
                        onClick={closeMobileMenu}
                        className={`hover:text-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[250ms]' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        NEW ARRIVALS
                    </Link>

                    <div
                        className={`w-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="flex items-center justify-start w-full hover:text-white"
                        >
                            CATEGORIES
                            <ChevronDownIcon
                                className={`ml-2 h-6 w-6 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {isCategoryOpen && (
                            <div className="mt-4 flex flex-col items-start space-y-4 pl-4">
                                {CATEGORIES.map((category) => (
                                    <Link
                                        key={category}
                                        href={{ pathname: "/allproducts", query: { category } }}
                                        className="text-base text-yellow-400/80 hover:text-white" // text-lg was a bit large
                                        onClick={closeMobileMenu}
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        href="/contactus"
                        onClick={closeMobileMenu}
                        className={`hover:text-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[350ms]' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        CONTACT
                    </Link>

                    <Link
                        href="/cart"
                        onClick={closeMobileMenu}
                        className={`hover:text-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[400ms]' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        CART
                    </Link>

                    <div
                        className={`transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[450ms]' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        {isAuthenticated ? (
                            <Link
                                href="/myaccount"
                                onClick={closeMobileMenu}
                                className="hover:text-white"
                            >
                                MY ACCOUNT
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                onClick={closeMobileMenu}
                                className="hover:text-white"
                            >
                                LOGIN
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}