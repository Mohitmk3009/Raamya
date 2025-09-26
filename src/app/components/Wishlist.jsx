'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ITEMS_PER_PAGE = 9;

// --- Icon Components ---
const ChevronRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"></polyline></svg>
);
const ChevronLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="15 18 9 12 15 6"></polyline></svg>
);

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useCart();

    // Fetch full product details on component load for accurate stock status
    useEffect(() => {
        const fetchWishlistDetails = async () => {
            setIsLoading(true);
            const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            if (storedWishlist.length === 0) {
                setWishlistItems([]);
                setIsLoading(false);
                return;
            }

            try {
                const productPromises = storedWishlist.map(item =>
                    fetch(`${API_BASE_URL}/products/${item._id}`).then(res => res.ok ? res.json() : null)
                );
                
                const products = await Promise.all(productPromises);
                
                const detailedItems = products.filter(Boolean).map(product => ({
                    ...product,
                    inStock: product.variants && product.variants.some(v => v.stock > 0),
                }));

                setWishlistItems(detailedItems);
            } catch (error) {
                console.error("Failed to fetch wishlist details:", error);
                toast.error("Could not load wishlist items.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchWishlistDetails();
    }, []);

    const handleRemoveFromWishlist = (productId) => {
        const updatedWishlist = wishlistItems.filter(item => item._id !== productId);
        // Also update localStorage with the minimal object structure
        const updatedStorage = updatedWishlist.map(({ _id, name, price, images }) => ({ _id, name, price, images }));
        localStorage.setItem('wishlist', JSON.stringify(updatedStorage));
        setWishlistItems(updatedWishlist);
        toast.success("Item removed from wishlist.");
        window.dispatchEvent(new Event('storage')); // Notify other parts of the app
    };

    const handleMoveToCart = async (item) => {
        if (!item.inStock) {
            toast.error("This item is currently out of stock.");
            return;
        }

        try {
            const availableVariant = item.variants.find(v => v.stock > 0);
            if (!availableVariant) {
                toast.error("This item is currently out of stock.");
                return;
            }

            const cartItem = {
                product: item._id,
                name: item.name,
                price: item.price,
                image: item.images[0],
                size: availableVariant.size,
                sku: availableVariant.sku,
            };

            await addToCart(cartItem, 1);
            handleRemoveFromWishlist(item._id); // This will update state and localStorage
            toast.success("Item moved to cart!");
        } catch (error) {
            toast.error(`Failed to move item to cart: ${error.message}`);
            console.error(error);
        }
    };

    const handleMoveAllToCart = async () => {
        const itemsToMove = wishlistItems.filter(item => item.inStock);
        if (itemsToMove.length === 0) {
            toast.error("No in-stock items available to move.");
            return;
        }

        const movingToast = toast.loading(`Moving ${itemsToMove.length} items to cart...`);

        const movePromises = itemsToMove.map(item => {
            const availableVariant = item.variants.find(v => v.stock > 0);
            const cartItem = {
                product: item._id, name: item.name, price: item.price,
                image: item.images[0], size: availableVariant.size, sku: availableVariant.sku,
            };
            return addToCart(cartItem, 1).then(() => item._id); // Return ID on success
        });

        try {
            const movedItemIds = await Promise.all(movePromises);
            
            const updatedWishlist = wishlistItems.filter(item => !movedItemIds.includes(item._id));
            const updatedStorage = updatedWishlist.map(({ _id, name, price, images }) => ({ _id, name, price, images }));
            
            localStorage.setItem('wishlist', JSON.stringify(updatedStorage));
            setWishlistItems(updatedWishlist);
            window.dispatchEvent(new Event('storage'));

            toast.dismiss(movingToast);
            toast.success(`${movedItemIds.length} items moved to cart!`);
            
        } catch (error) {
            toast.dismiss(movingToast);
            toast.error("Some items could not be moved. Please try again.");
            console.error("Error moving all items to cart:", error);
        }
    };

    // --- Pagination Logic ---
    const totalPages = Math.ceil(wishlistItems.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = wishlistItems.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    if (isLoading) {
        return (
            <div className="bg-black text-white min-h-screen flex justify-center items-center">
                <p className="text-xl text-gray-400">Loading your wishlist...</p>
            </div>
        );
    }
    
    return (
        <div className="bg-black text-white min-h-screen font-sans">
            <Toaster position="top-center" />
            <div className="container mx-auto max-w-[1200px] py-10 px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-wide uppercase">
                        YOUR WISHLIST
                    </h1>
                    <p className="text-gray-400 text-lg mb-8">
                        YOU HAVE {wishlistItems.length} ITEMS SAVED
                    </p>
                    {wishlistItems.length > 0 && (
                        <button 
                            onClick={handleMoveAllToCart}
                            className="bg-transparent border border-[#FFBB00] text-[#FFBB00] font-bold py-3 px-8 rounded-md hover:bg-[#FFBB00] hover:text-black transition-colors duration-300 uppercase"
                        >
                            MOVE ALL TO CART
                        </button>
                    )}
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <p className="text-xl">Your wishlist is empty. Start adding some products!</p>
                        <Link href="/products" className="mt-4 inline-block bg-[#EFAF00] text-black font-bold py-3 px-6 rounded-md hover:bg-yellow-300 transition-colors">
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {currentItems.map(item => (
                                <div key={item._id} className="group p-4 border border-[#FFBB00] rounded-lg flex flex-col items-center">
                                    <Image
                                        src={item.images[0]}
                                        alt={item.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-[300px] object-cover mb-4 rounded-md"
                                    />
                                    <div className="text-left w-full mt-auto">
                                        <h2 className="text-xl font-bold tracking-wide text-[#FFBB00]">{item.name}</h2>
                                        <p className="text-gray-400">Rs {item.price}/-</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className={`font-bold ${item.inStock ? 'text-green-500' : 'text-gray-500'}`}>
                                                {item.inStock ? 'In Stock' : 'Out of Stock'}
                                            </p>
                                            <button 
                                                onClick={() => handleRemoveFromWishlist(item._id)}
                                                className={`transition-colors ${!item.inStock ? 'text-red-500 hover:text-red-400' : 'text-white hover:text-gray-400'}`}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleMoveToCart(item)}
                                        disabled={!item.inStock}
                                        className="mt-4 bg-[#FFBB00] text-black font-bold py-3 px-6 rounded-md transition-colors w-full uppercase disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-yellow-300"
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        {/* --- NEW: Pagination Controls with Icons --- */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 space-x-4">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-[#EFAF00] text-[#EFAF00] rounded-full hover:bg-[#EFAF00] hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeftIcon className="h-5 w-5" />
                                </button>
                                <span className="text-gray-400">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-[#EFAF00] text-[#EFAF00] rounded-full hover:bg-[#EFAF00] hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRightIcon className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}