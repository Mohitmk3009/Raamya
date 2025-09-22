'use client';
import Image from 'next/image';
import React from 'react';
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


export default function Header() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <>
            {/* Style tag for fonts */}
            <style jsx global>{`
                @import url('https://db.onlinewebfonts.com/c/b3c57ee1d58f270818c2df37acff9fbc?family=Black+No.7');
                @import url("https://db.onlinewebfonts.com/c/5c55a2b5490cd6ebc5d9b2fa18e7d9df?family=Real+Head+Web+W01+Bold");
                .font-redhead { font-family: 'Real Head Web W01 Bold', sans-serif; }
                .font-black-no7-style { font-family: 'Black No.7'; }
            `}</style>

            <header className="bg-black text-yellow-400 shadow-md w-full font-redhead">
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
                        <Link href="#" className="hover:text-white transition-colors duration-300">CATEGORIES</Link>
                        <Link href="/contactus" className="hover:text-white transition-colors duration-300">CONTACT</Link>
                    </nav>

                    {/* Right-side Icons and Auth buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* <Link href="/wishlist" className='rounded-full bg-gray-800 p-2 hover:scale-110 transition-all duration-300'>
                            <Image width={30} height={30} src={heart} alt="Wishlist Icon" className="w-6 h-6" />
                        </Link> */}
                        <Link href="/cart" className='rounded-full bg-yellow-400 p-2 hover:scale-110 transition-all duration-300'>
                            <Image width={30} height={30} src={bag} alt="Shopping Cart Icon" className="w-6 h-6" />
                        </Link>
                        
                        {isAuthenticated ? (
                            // Show Profile and Logout if user is logged in
                            <>
                                <Link href="/myaccount" className='rounded-full bg-white p-2 hover:scale-110 transition-all duration-300'>
                                    <Image width={40} height={40} src={login} alt="User Profile Icon" className="w-6 h-6" />
                                </Link>
                                {/* <button 
                                    onClick={logout} 
                                    className="bg-red-600 text-white text-xs font-bold py-2 px-3 rounded-full hover:bg-red-700 transition-colors"
                                >
                                    LOGOUT
                                </button> */}
                            </>
                        ) : (
                            // Show Login options if user is not logged in
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