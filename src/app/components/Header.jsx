// 'use client';
// import Image from 'next/image';
// import React, { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { useRouter } from 'next/navigation';
// import login from '../../assets/icons/login.png';
// import bag from '../../assets/icons/bag.png';
// import Lottie from 'lottie-react';
// import Loader from '../../../public/lottie/Loading.json';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// // --- SVG ICONS ---
// const ChevronDownIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
// );
// const MenuIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
// );
// const CloseIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
// );
// const SearchIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//         <circle cx="11" cy="11" r="8"></circle>
//         <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//     </svg>
// );
// const HeartIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//     </svg>
// );

// const SearchPopup = ({ searchQuery, searchResults, isSearching, onResultClick, onClose }) => {
//     if (!searchQuery) return null;

//     return (
//         <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-black/90 backdrop-blur-md p-4 rounded-b-md shadow-lg border border-[#EFAF00]">
//             <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold text-[#EFAF00]">Search Results</h3>
//                 <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
//                     <CloseIcon size={24} />
//                 </button>
//             </div>
//             {isSearching ? (
//                 <div className="flex justify-center items-center py-8">
//                     <Lottie animationData={Loader} loop={true} className="w-20 h-20" />
//                 </div>
//             ) : searchResults.length > 0 ? (
//                 <ul className="space-y-3 max-h-80 overflow-y-auto">
//                     {searchResults.map(product => (
//                         <li key={product._id} onClick={() => onResultClick(product._id)} className="cursor-pointer hover:bg-gray-800 rounded-md p-2 transition">
//                             <div className="flex items-center space-x-4">
//                                 <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
//                                 <div>
//                                     <p className="text-sm font-bold text-white">{product.name}</p>
//                                     <p className="text-xs text-gray-400">₹{product.price}</p>
//                                 </div>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <div className="text-center py-8 text-gray-500">No products found.</div>
//             )}
//         </div>
//     );
// };

// export default function Header() {
//     const { isAuthenticated } = useAuth();
//     const { cartItems } = useCart();
//     const router = useRouter();

//     const [searchQuery, setSearchQuery] = useState('');
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const [wishlistItemCount, setWishlistItemCount] = useState(0);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//     const [searchResults, setSearchResults] = useState([]);
//     const [isSearching, setIsSearching] = useState(false);
//     const dropdownRef = useRef(null);
//     const searchRef = useRef(null);
//     const CATEGORIES = ['IT girl', 'Girly Pop', 'bloom girl', 'desi diva', 'street chic'];

//     const cartItemCount = cartItems.reduce((count, item) => count + item.qty, 0);

//     // Effect to update wishlist count in real-time
//     useEffect(() => {
//         const updateWishlistCount = () => {
//             const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//             setWishlistItemCount(storedWishlist.length);
//         };

//         updateWishlistCount();
//         window.addEventListener('storage', updateWishlistCount);

//         return () => {
//             window.removeEventListener('storage', updateWishlistCount);
//         };
//     }, []);


//     useEffect(() => {
//         if (!searchQuery.trim()) {
//             setSearchResults([]);
//             return;
//         }

//         setIsSearching(true);

//         const timer = setTimeout(async () => {
//             try {
//                 const response = await fetch(`${API_BASE_URL}/products?keyword=${searchQuery}`);
//                 const data = await response.json();
//                 setSearchResults(data.products || []);
//             } catch (error) {
//                 console.error("Search failed:", error);
//                 setSearchResults([]);
//             } finally {
//                 setIsSearching(false);
//             }
//         }, 500); // 500ms debounce time

//         return () => clearTimeout(timer);
//     }, [searchQuery]);


//     // Effect to close desktop dropdown and search on outside click
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsDropdownOpen(false);
//             }
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setIsSearchOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [dropdownRef, searchRef]);

//     // Effect to prevent body scroll when mobile menu is open
//     useEffect(() => {
//         document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
//         return () => { document.body.style.overflow = 'auto' };
//     }, [isMobileMenuOpen]);

//     const closeMobileMenu = () => {
//         setIsMobileMenuOpen(false);
//         setIsCategoryOpen(false);
//         setIsSearchOpen(false); // Close search when mobile menu is closed
//     };

//     const handleResultClick = (productId) => {
//         router.push(`/product/${productId}`);
//         setSearchQuery('');
//         setIsSearchOpen(false);
//         closeMobileMenu();
//     };

//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             router.push(`/allproducts?keyword=${searchQuery}`);
//             setSearchQuery('');
//             setIsSearchOpen(false); // Close search bar after search
//             closeMobileMenu(); // Close mobile menu if open
//         }
//     };

//     return (
//         <>
//             <style jsx global>{`
//                 @import url('https://db.onlinewebfonts.com/c/b3c57ee1d58f270818c2df37acff9fbc?family=Black+No.7');
//                 @import url("https://db.onlinewebfonts.com/c/5c55a2b5490cd6ebc5d9b2fa18e7d9df?family=Real+Head+Web+W01+Bold");
//                 .font-redhead { font-family: 'Real Head Web W01 Bold', sans-serif; }
//                 .font-black-no7-style { font-family: 'Black No.7'; }
//             `}</style>

//             <header className="bg-black text-[#EFAF00] shadow-md w-full font-redhead sticky top-0 z-50">
//                 <div className="mx-auto flex items-center justify-between md:p-4 p-2">
//                     {/* Left side: Logo */}
//                     <div className="w-1/4 text-3xl md:text-5xl font-bold tracking-wider bg-gradient-to-b text-transparent bg-clip-text from-[#EFAF00] md:mt-[-10px] mt-[-5px] to-yellow-800">
//                         <Link href="/homepage">RAAMYA</Link>
//                     </div>

//                     {/* Middle: Navigation Links - Remains centered */}
//                     <nav className="hidden lg:flex flex-1 justify-center items-center space-x-8 text-sm tracking-widest">
//                         <Link href="/allproducts" className="hover:text-white transition-colors duration-300">ALL PRODUCTS</Link>
//                         <Link href={{ pathname: '/allproducts', query: { filter: 'mostWanted' } }} className="hover:text-white transition-colors duration-300">MOST WANTED</Link>
//                         <Link href={{ pathname: '/allproducts', query: { filter: 'newArrivals' } }} className="hover:text-white transition-colors duration-300">NEW ARRIVALS</Link>
//                         <div className="relative" ref={dropdownRef}>
//                             <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center hover:text-white transition-colors duration-300">
//                                 CATEGORIES <ChevronDownIcon className={`ml-1 h-6 w-6 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
//                             </button>
//                             {isDropdownOpen && (
//                                 <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-black/70 backdrop-blur-sm ">
//                                     <div className="py-1">
//                                         {CATEGORIES.map((category) => (
//                                             <Link
//                                                 key={category}
//                                                 href={{ pathname: '/allproducts', query: { category: category } }}
//                                                 className="block px-4 py-2 text-sm text-[#EFAF00] hover:bg-gray-800 hover:text-white"
//                                                 onClick={() => setIsDropdownOpen(false)}>
//                                                 {category}
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                         <Link href="/contactus" className="hover:text-white transition-colors duration-300">CONTACT</Link>
//                     </nav>

//                     {/* Right side: Icons and Search */}
//                     <div className="hidden lg:flex w-1/4 justify-end items-center space-x-4">
//                         {/* Desktop Search: Expands on hover/focus */}
//                         <div
//                             className="relative flex items-center h-10"
//                             onMouseEnter={() => setIsSearchOpen(true)}
//                             onMouseLeave={() => setIsSearchOpen(false)}
//                             ref={searchRef}
//                         >
//                             <form onSubmit={handleSearchSubmit}>
//                                 <input
//                                     type="text"
//                                     placeholder="Search..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className={`
//                                         bg-gray-900 text-white placeholder-gray-500 rounded-full py-2 pl-4  focus:outline-none focus:ring-2 focus:ring-[#EFAF00]
//                                         transition-all duration-300 ease-in-out
//                                         ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}
//                                     `}
//                                 />
//                             </form>
//                             <button
//                                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                                 className={`absolute right-0 text-[#EFAF00] hover:text-white transition-colors duration-300`}
//                                 aria-label="Toggle search bar"
//                             >
//                                 <SearchIcon />
//                             </button>
//                             <SearchPopup
//                                 searchQuery={searchQuery}
//                                 searchResults={searchResults}
//                                 isSearching={isSearching}
//                                 onResultClick={handleResultClick}
//                                 onClose={() => setSearchQuery('')}
//                             />

//                         </div>

//                         {/* Desktop Wishlist Icon */}
//                         <Link href="/wishlist" className='relative rounded-full bg-gray-900 p-2 text-[#EFAF00] hover:scale-110 transition-all duration-300'>
//                             <HeartIcon className="w-6 h-6" />
//                             {wishlistItemCount > 0 && (
//                                 <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
//                                     {wishlistItemCount}
//                                 </span>
//                             )}
//                         </Link>

//                         {/* Desktop Cart Icon */}
//                         <Link href="/cart" className='relative rounded-full bg-[#EFAF00] p-2 hover:scale-110 transition-all duration-300'>
//                             <Image width={30} height={30} src={bag} alt="Shopping Cart Icon" className="w-6 h-6" />
//                             {cartItemCount > 0 && (
//                                 <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
//                                     {cartItemCount}
//                                 </span>
//                             )}
//                         </Link>

//                         {/* Login/My Account Icon */}
//                         {isAuthenticated ? (
//                             <Link href="/myaccount" className='rounded-full bg-white p-2 hover:scale-110 transition-all duration-300'>
//                                 <Image width={40} height={40} src={login} alt="User Profile Icon" className="w-6 h-6" />
//                             </Link>
//                         ) : (
//                             <Link href="/login" className='rounded-full bg-gray-200 p-2 hover:scale-110 transition-all duration-300'>
//                                 <Image width={40} height={40} src={login} alt="Login Icon" className="w-6 h-6" />
//                             </Link>
//                         )}
//                     </div>
//                     <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="relative lg:hidden z-50 h-8 w-8 text-[#EFAF00]" aria-label="Toggle menu">
//                         <MenuIcon className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
//                         <CloseIcon className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`} />
//                     </button>
//                     {/* Mobile Icons and Menu Toggle */}

//                 </div>
//             </header>

//             {/* --- MOBILE MENU PANEL --- */}
//             <div
//                 className={`fixed top-12 right-0 z-40 bg-black/80 backdrop-blur-sm h-screen w-full lg:hidden transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? "-translate-x-0" : "translate-x-full"
//                     }`}
//             >
//                 <nav className="flex flex-col items-end w-full text-base tracking-widest text-[#EFAF00] font-redhead p-4">

//                     <div className="lg:hidden flex items-center space-x-4 relative">
//                         {isSearchOpen ? (
//                             // Mobile search open state
//                             <div className="flex-1  left-0 right-0 ">
//                                 <form onSubmit={handleSearchSubmit}>
//                                     <input
//                                         type="text"
//                                         placeholder="Search..."
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         className="w-full bg-gray-900 text-white placeholder-gray-500 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#EFAF00]"
//                                     />
//                                 </form>
//                                 <button
//                                     type="button"
//                                     // onClick={() => setIsSearchOpen(false)}
//                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EFAF00] hover:text-white"
//                                     aria-label="Close search bar"
//                                 >
//                                     <CloseIcon className="w-6 h-6" />
//                                 </button>
//                                 <SearchPopup
//                                     searchQuery={searchQuery}
//                                     searchResults={searchResults}
//                                     isSearching={isSearching}
//                                     onResultClick={handleResultClick}
//                                     onClose={() => setSearchQuery('')}
//                                 />
//                             </div>
//                         ) : (
//                             // Mobile default state
//                             <>
//                                 <button onClick={() => setIsSearchOpen(true)} className="h-8 w-8 text-[#EFAF00]" aria-label="Open search bar">
//                                     <SearchIcon className="w-6 h-6" />
//                                 </button>

//                             </>
//                         )}
//                     </div>
//                     <Link
//                         href="/allproducts"
//                         onClick={closeMobileMenu}
//                         className={`w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 translate-x-10'}`}
//                     >
//                         ALL PRODUCTS
//                     </Link>
//                     <Link
//                         href={{ pathname: '/allproducts', query: { filter: 'mostWanted' } }}
//                         onClick={closeMobileMenu}
//                         className={`w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 translate-x-10'}`}
//                     >
//                         MOST WANTED
//                     </Link>
//                     <Link
//                         href={{ pathname: '/allproducts', query: { filter: 'newArrivals' } }}
//                         onClick={closeMobileMenu}
//                         className={`w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[250ms]' : 'opacity-0 translate-x-10'}`}
//                     >
//                         NEW ARRIVALS
//                     </Link>
//                     <div
//                         className={`w-full p-4 border-b border-yellow-800/50 transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 translate-x-10'}`}
//                     >
//                         <button
//                             onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//                             className="flex items-center justify-end w-full hover:text-white"
//                         >
//                             CATEGORIES
//                             <ChevronDownIcon className={`ml-2 h-6 w-6 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
//                         </button>
//                         {isCategoryOpen && (
//                             <div className="mt-4 flex flex-col items-end space-y-4 pr-4">
//                                 {CATEGORIES.map((category) => (
//                                     <Link
//                                         key={category}
//                                         href={{ pathname: "/allproducts", query: { category } }}
//                                         className="text-base text-[#EFAF00]/80 hover:text-white"
//                                         onClick={closeMobileMenu}
//                                     >
//                                         {category}
//                                     </Link>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     <Link
//                         href="/contactus"
//                         onClick={closeMobileMenu}
//                         className={`w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[350ms]' : 'opacity-0 translate-x-10'}`}
//                     >
//                         CONTACT
//                     </Link>
//                     <Link
//                         href="/cart"
//                         onClick={closeMobileMenu}
//                         className={`flex items-center justify-end gap-3 w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[400ms]' : 'opacity-0 translate-x-10'}`}
//                     >
//                         CART
//                         {cartItemCount > 0 && (
//                             <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
//                                 {cartItemCount}
//                             </span>
//                         )}
//                     </Link>
//                     <Link
//                         href="/wishlist"
//                         onClick={closeMobileMenu}
//                         className={`flex items-center justify-end gap-3 w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[400ms]' : 'opacity-0 translate-x-10'}`}
//                     >
//                         WISHLIST
//                         {wishlistItemCount > 0 && (
//                             <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
//                                 {wishlistItemCount}
//                             </span>
//                         )}
//                     </Link>
//                     <div
//                         className={`w-full p-4 transition-all border-b border-yellow-800/50 duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[450ms]' : 'opacity-0 translate-x-10'}`}
//                     >
//                         {isAuthenticated ? (
//                             <Link href="/myaccount" onClick={closeMobileMenu} className="hover:text-white">
//                                 MY ACCOUNT
//                             </Link>
//                         ) : (
//                             <Link href="/login" onClick={closeMobileMenu} className="hover:text-white">
//                                 LOGIN
//                             </Link>
//                         )}
//                     </div>
//                 </nav>
//             </div>
//         </>
//     );
// }


'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import login from '../../assets/icons/login.png';
import bag from '../../assets/icons/bag.png';
import Lottie from 'lottie-react';
import Loader from '../../../public/lottie/Loading.json';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// --- SVG ICONS ---
const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const CloseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const SearchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);
const HeartIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const SearchPopup = ({ searchQuery, searchResults, isSearching, onResultClick, onClose }) => {
    if (!searchQuery) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-black/80 backdrop-blur-md p-4 rounded-md shadow-lg border border-[#EFAF00]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#EFAF00]">Search Results</h3>
                <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
                    <CloseIcon size={24} />
                </button>
            </div>
            {isSearching ? (
                <div className="flex justify-center items-center py-8">
                    <Lottie animationData={Loader} loop={true} className="w-20 h-20" />
                </div>
            ) : searchResults.length > 0 ? (
                <ul className="space-y-3 max-h-80 overflow-y-auto">
                    {searchResults.map(product => (
                        <li key={product._id} onClick={() => onResultClick(product._id)} className="cursor-pointer hover:bg-gray-800 rounded-md p-2 transition">
                            <div className="flex items-center space-x-4">
                                <img src={product.images[0]} alt={product.name} className="w-16 h-20 object-cover rounded" />
                                <div>
                                    <p className="text-sm font-bold text-white">{product.name}</p>
                                    <p className="text-sm font-bold text-[#FFBB00]">{product.category}</p>
                                    <p className="text-xs text-gray-400">₹{product.price}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-8 text-gray-500">No products found.</div>
            )}
        </div>
    );
};

export default function Header() {
    const { isAuthenticated } = useAuth();
    const { cartItems } = useCart();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
    const [wishlistItemCount, setWishlistItemCount] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    const CATEGORIES = ['IT girl', 'Girly Pop', 'bloom girl', 'desi diva', 'street chic'];

    const cartItemCount = cartItems.reduce((count, item) => count + item.qty, 0);

    // Effect to update wishlist count in real-time
    useEffect(() => {
        const updateWishlistCount = () => {
            const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishlistItemCount(storedWishlist.length);
        };

        updateWishlistCount();
        window.addEventListener('storage', updateWishlistCount);

        return () => {
            window.removeEventListener('storage', updateWishlistCount);
        };
    }, []);


    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products?keyword=${searchQuery}`);
                const data = await response.json();
                setSearchResults(data.products || []);
            } catch (error) {
                console.error("Search failed:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 500); // 500ms debounce time

        return () => clearTimeout(timer);
    }, [searchQuery]);


    // Effect to close desktop dropdown and search on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsDesktopSearchOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef, searchRef]);

    // Effect to prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto' };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsCategoryOpen(false);
        setIsDesktopSearchOpen(false);
        setSearchQuery('');
    };

    const handleResultClick = (productId) => {
        router.push(`/product/${productId}`);
        setSearchQuery('');
        setIsDesktopSearchOpen(false);
        closeMobileMenu();
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/allproducts?keyword=${searchQuery}`);
            setSearchQuery('');
            setIsDesktopSearchOpen(false);
            closeMobileMenu();
        }
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://db.onlinewebfonts.com/c/b3c57ee1d58f270818c2df37acff9fbc?family=Black+No.7');
                @import url("https://db.onlinewebfonts.com/c/5c55a2b5490cd6ebc5d9b2fa18e7d9df?family=Real+Head+Web+W01+Bold");
                .font-redhead { font-family: 'Real Head Web W01 Bold', sans-serif; }
                .font-black-no7-style { font-family: 'Black No.7'; }
            `}</style>

            <header className="bg-black text-[#EFAF00] shadow-md w-full font-redhead sticky top-0 z-50">
                <div className="mx-auto flex items-center justify-between md:p-4 p-2">
                    {/* Left side: Logo */}
                    <div className="flex-shrink-0 text-3xl md:text-5xl font-bold tracking-wider bg-gradient-to-b text-transparent bg-clip-text from-[#EFAF00] to-yellow-800">
                        <Link href="/homepage">RAAMYA</Link>
                    </div>

                    {/* Middle: Navigation Links - Remains centered */}
                    <nav className="hidden lg:flex flex-1 justify-center ml-64 items-center space-x-8  text-sm tracking-widest">
                        <Link href="/allproducts" className="hover:text-white transition-colors duration-300">ALL PRODUCTS</Link>
                        <Link href={{ pathname: '/allproducts', query: { filter: 'mostWanted' } }} className="hover:text-white transition-colors duration-300">MOST WANTED</Link>
                        <Link href={{ pathname: '/allproducts', query: { filter: 'newArrivals' } }} className="hover:text-white transition-colors duration-300">NEW ARRIVALS</Link>
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center hover:text-white transition-colors duration-300">
                                CATEGORIES <ChevronDownIcon className={`ml-1 h-6 w-6 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-black/70 backdrop-blur-sm ">
                                    <div className="py-1">
                                        {CATEGORIES.map((category) => (
                                            <Link
                                                key={category}
                                                href={{ pathname: '/allproducts', query: { category: category } }}
                                                className="block px-4 py-2 text-sm text-[#EFAF00] hover:bg-gray-800 hover:text-white"
                                                onClick={() => setIsDropdownOpen(false)}>
                                                {category}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link href="/contactus" className="hover:text-white transition-colors duration-300">CONTACT</Link>
                    </nav>

                    {/* Right side: Icons and Search */}
                    <div className="hidden lg:flex w-1/4 justify-end items-center space-x-4">
                        {/* Desktop Search: Expands on click */}
                        <div className="relative flex items-center h-10" ref={searchRef}>
                            <form onSubmit={handleSearchSubmit}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`
                                        bg-gray-900 text-white placeholder-gray-500 rounded-full py-2 pl-4 focus:outline-none focus:ring-1 focus:ring-[#EFAF00]
                                        transition-all duration-300 ease-in-out
                                        ${isDesktopSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}
                                    `}
                                    onFocus={() => setIsDesktopSearchOpen(true)}
                                />
                            </form>
                            <button
                                onClick={() => setIsDesktopSearchOpen(!isDesktopSearchOpen)}
                                className={`text-[#EFAF00] hover:text-white transition-colors duration-300 ${isDesktopSearchOpen ? 'pl-2' : ''}`}
                                aria-label="Toggle search bar"
                            >
                                {isDesktopSearchOpen ? <CloseIcon /> : <SearchIcon />}
                            </button>
                            {isDesktopSearchOpen && (
                                <SearchPopup
                                    searchQuery={searchQuery}
                                    searchResults={searchResults}
                                    isSearching={isSearching}
                                    onResultClick={handleResultClick}
                                    onClose={() => { setSearchQuery(''); setIsDesktopSearchOpen(false); }}
                                />
                            )}
                        </div>
                        
                        {/* Desktop Wishlist Icon */}
                        <Link href="/wishlist" className='relative rounded-full bg-gray-900 p-2 text-[#EFAF00] hover:scale-110 transition-all duration-300'>
                            <HeartIcon className="w-6 h-6" />
                            {wishlistItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                                    {wishlistItemCount}
                                </span>
                            )}
                        </Link>

                        {/* Desktop Cart Icon */}
                        <Link href="/cart" className='relative rounded-full bg-[#EFAF00] p-2 hover:scale-110 transition-all duration-300'>
                            <Image width={30} height={30} src={bag} alt="Shopping Cart Icon" className="w-6 h-6" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* Login/My Account Icon */}
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
                    {/* Mobile Icons and Menu Toggle */}
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="relative lg:hidden z-50 h-8 w-8 mt-2 flex justify-center items-center text-[#EFAF00]" aria-label="Toggle menu">
                        <MenuIcon className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
                        <CloseIcon className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`} />
                    </button>
                </div>
            </header>

            {/* --- MOBILE MENU PANEL --- */}
            <div
                className={`fixed top-12 right-0 z-40 bg-black/80 backdrop-blur-sm  h-screen w-[40vh] lg:hidden transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? "-translate-x-0" : "translate-x-full"}`}
            >
                <nav className="flex flex-col items-end w-full text-base tracking-widest text-[#EFAF00] font-redhead p-4">
                    {/* Mobile Search Section - Animated in */}
                    <div className={`w-full transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 delay-100' : 'opacity-0'}`}>
                        <form onSubmit={handleSearchSubmit} className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-900 text-white placeholder-gray-500 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#EFAF00]"
                            />
                            <button
                                type="button"
                                onClick={() => { setSearchQuery(''); setSearchResults([])}}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EFAF00] hover:text-white"
                                aria-label="Clear search input"
                            >
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </form>
                        {searchQuery && (
                            <div className="relative">
                                <SearchPopup
                                    searchQuery={searchQuery}
                                    searchResults={searchResults}
                                    isSearching={isSearching}
                                    onResultClick={handleResultClick}
                                    onClose={() => { setSearchQuery(''); setSearchResults([])}}
                                />
                            </div>
                        )}
                    </div>
                    <Link
                        href="/allproducts"
                        onClick={closeMobileMenu}
                        className={`w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 translate-x-10'}`}
                    >
                        ALL PRODUCTS
                    </Link>
                    <Link
                        href={{ pathname: '/allproducts', query: { filter: 'mostWanted' } }}
                        onClick={closeMobileMenu}
                        className={`w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-200' : 'opacity-0 translate-x-10'}`}
                    >
                        MOST WANTED
                    </Link>
                    <Link
                        href={{ pathname: '/allproducts', query: { filter: 'newArrivals' } }}
                        onClick={closeMobileMenu}
                        className={`w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[250ms]' : 'opacity-0 translate-x-10'}`}
                    >
                        NEW ARRIVALS
                    </Link>
                    <div
                        className={`w-full p-4 border-b border-yellow-800/50 transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 translate-x-10'}`}
                    >
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="flex items-center justify-end w-full hover:text-white"
                        >
                            CATEGORIES
                            <ChevronDownIcon className={`ml-2 h-6 w-6 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isCategoryOpen && (
                            <div className="mt-4 flex flex-col items-end space-y-4 pr-4">
                                {CATEGORIES.map((category) => (
                                    <Link
                                        key={category}
                                        href={{ pathname: "/allproducts", query: { category } }}
                                        className="text-base text-[#EFAF00]/80 hover:text-white"
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
                        className={`w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[350ms]' : 'opacity-0 translate-x-10'}`}
                    >
                        CONTACT
                    </Link>
                    <Link
                        href="/wishlist"
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-end gap-3 w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[400ms]' : 'opacity-0 translate-x-10'}`}
                    >
                        WISHLIST
                        {wishlistItemCount > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                                {wishlistItemCount}
                            </span>
                        )}
                    </Link>
                    <Link
                        href="/cart"
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-end gap-3 w-full p-4 border-b border-yellow-800/50 hover:text-white transition-all duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[400ms]' : 'opacity-0 translate-x-10'}`}
                    >
                        CART
                        {cartItemCount > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    
                    <div
                        className={`w-full p-4 transition-all border-b border-yellow-800/50 duration-300 text-right ${isMobileMenuOpen ? 'opacity-100 translate-x-0 delay-[450ms]' : 'opacity-0 translate-x-10'}`}
                    >
                        {isAuthenticated ? (
                            <Link href="/myaccount" onClick={closeMobileMenu} className="hover:text-white">
                                MY ACCOUNT
                            </Link>
                        ) : (
                            <Link href="/login" onClick={closeMobileMenu} className="hover:text-white">
                                LOGIN
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}
