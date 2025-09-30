'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import Lottie from 'lottie-react';
import Loader from '../../../public/lottie/Loading.json';


// --- ICONS ---
const HeartIcon = ({ filled = false, ...props }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>);
const StarIcon = ({ filled = true, ...props }) => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>);
const VerifiedIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>);
const MoreHorizontalIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>);

// --- SUB-COMPONENTS ---
const SuggestedItem = ({ item, onCartAction, isInCart }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Image width={48} height={48} src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-md object-cover border border-[#EFAF00]/50" />
                <div>
                    <p className="text-sm text-gray-300">Pair it with: {item.name}</p>
                    <p className="font-bold text-[#EFAF00] text-sm">₹{item.price}</p>
                </div>
            </div>
            <button
                onClick={() => onCartAction(isInCart ? 'remove' : 'add', item)}
                className={`font-bold py-2 px-4 rounded-md cursor-pointer transition-colors text-sm ${isInCart ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-[#EFAF00] text-black hover:bg-yellow-300'}`}
            >
                {isInCart ? 'REMOVE' : 'ADD'}
            </button>
        </div>
    );
};

const ProductDetails = ({ product }) => {
    // Return null if there's no product or description
    if (!product || !product.description) {
        return null;
    }

    const isFeatureList = product.description.includes('KEY FEATURES');

    return (
        <div className="text-gray-300 leading-relaxed p-4 md:p-6 font-redhead">
            <h3 className="font-bold text-xl text-yellow-300 mb-4">Product Description</h3>

            {isFeatureList ? (
                (() => {
                    const allParts = product.description.split('*').map(p => p.trim()).filter(Boolean);
                    const sizingChartStartIndex = allParts.findIndex(part => part.toUpperCase().startsWith('SIZING CHART'));

                    if (sizingChartStartIndex === -1 && allParts.length <= 1) {
                        return <p className="mb-4">{product.description}</p>;
                    }

                    const keyFeaturesTitle = allParts[0] || 'Key Features';
                    let features = [];
                    let sizingChartItems = [];

                    if (sizingChartStartIndex !== -1) {
                        features = allParts.slice(1, sizingChartStartIndex);
                        sizingChartItems = allParts.slice(sizingChartStartIndex + 1);
                    } else {
                        features = allParts.slice(1);
                    }

                    // The flexible parsing logic remains the same
                    const parsedSizes = sizingChartItems.map(item => {
                        const parts = item.split(/:\s*/);
                        if (parts.length < 2) return null;
                        const size = parts[0];
                        const measurementsStr = parts.slice(1).join(': ');
                        const result = { size: size };
                        const measurementPairs = measurementsStr.split(/\s*,\s*/);
                        measurementPairs.forEach(pair => {
                            const match = pair.match(/([a-z\s]+)\s+([\d.–]+)/i);
                            if (match) {
                                let key = match[1].trim().toLowerCase();
                                // Normalize all length variations into a single "length" key
                                if (key.includes('length')) {
                                    key = 'length';
                                }
                                result[key] = match[2];
                            }
                        });
                        return result;
                    }).filter(Boolean);

                    // --- ✨ 1. DYNAMICALLY FIND ALL HEADERS ---
                    // Create a Set of all unique measurement keys (e.g., 'bust', 'waist', 'hips', 'length')
                    const headerKeys = new Set();
                    parsedSizes.forEach(sizeObject => {
                        Object.keys(sizeObject).forEach(key => {
                            if (key !== 'size') {
                                headerKeys.add(key);
                            }
                        });
                    });
                    const dynamicHeaders = Array.from(headerKeys);

                    return (
                        <>
                            {/* Key Features Section */}
                            <div>
                                <h4 className="font-semibold text-lg text-white mb-3">{keyFeaturesTitle}</h4>
                                <ul className="list-disc list-inside space-y-2">
                                    {features.map((feature, index) => (
                                        <li key={`feature-${index}`}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* DYNAMIC Sizing Chart Section */}
                            {parsedSizes.length > 0 && (
                                <div className="mt-8 overflow-x-auto">
                                    <h4 className="font-semibold text-lg text-white uppercase mb-3">Sizing Chart</h4>
                                    <table className="min-w-full bg-[#1C1C1C] border border-[#3A3A3A] rounded-lg">
                                        <thead className="bg-[#FF9900] text-black">
                                            <tr>
                                                <th className="p-3 text-left text-sm font-bold uppercase tracking-wider">Size</th>
                                                {/* --- ✨ 2. RENDER DYNAMIC THEAD --- */}
                                                {dynamicHeaders.map(header => (
                                                    <th key={header} className="p-3 text-left text-sm font-bold uppercase tracking-wider">
                                                        {header} (in)
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* --- ✨ 3. RENDER DYNAMIC TBODY --- */}
                                            {parsedSizes.map((item, index) => (
                                                <tr key={`size-row-${index}`} className="border-b border-[#3A3A3A]">
                                                    <td className="p-3 font-mono">{item.size || 'N/A'}</td>
                                                    {dynamicHeaders.map(header => (
                                                        <td key={`${item.size}-${header}`} className="p-3">
                                                            {item[header] || '–'}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-xs text-gray-500 mt-2">All measurements are in inches. Please allow a 1-2$ inch tolerance.</p>
                                </div>
                            )}
                        </>
                    );
                })()
            ) : (
                <p className="mb-4">{product.description}</p>
            )}
        </div>
    );
};


const ReviewCard = ({ review }) => (
    <div className="border border-[#EFAF00]/30 rounded-lg lg:p-6 p-4 flex flex-col font-redhead">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2"><p className="font-bold text-white">{review.name}</p><VerifiedIcon className="text-green-500" /></div>
            <button className="text-gray-500 cursor-pointer hover:text-white"><MoreHorizontalIcon /></button>
        </div>
        <div className="flex items-center gap-1 mb-4 text-[#EFAF00]">{[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}</div>
        <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>
    </div>
);

const Reviews = ({ product, onReviewSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [visibleReviewCount, setVisibleReviewCount] = useState(4);

    const handleSubmit = async (e) => {
        e.preventDefault(); setError('');
        if (rating === 0) { setError('Please select a star rating.'); return; }
        if (!comment) { setError('Please write a comment.'); return; }
        try {
            await onReviewSubmit({ rating, comment });
            setComment(''); setRating(0);
        } catch (err) { setError(err.message); }
    };
    return (
        <div className="p-4 md:p-6 font-redhead">
            <div className="flex justify-between items-center lg:mb-6 gap-4"><h3 className="font-bold lg:text-xl text-white">ALL REVIEWS ({product.reviews.length})</h3><div className="flex items-center gap-4 "><select className="bg-black border border-[#EFAF00]/30 rounded-md py-2 px-3 text-white focus:outline-none cursor-pointer focus:border-[#EFAF00]"><option>Latest</option><option>Highest Rated</option></select></div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">{product.reviews.slice(0, visibleReviewCount).map(review => <ReviewCard key={review._id} review={review} />)}</div>
            {product.reviews.length > visibleReviewCount && (<div className="text-center mb-12"><button onClick={() => setVisibleReviewCount(prev => prev + 4)} className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-[#FFBB00] hover:text-white transition-colors">Load More Reviews</button></div>)}
            <div className="w-full mt-8"><h3 className="font-bold text-xl text-white mb-4">Write a Customer Review</h3>{error && <p className="text-red-500 mb-4">{error}</p>}<form onSubmit={handleSubmit} className="border border-[#EFAF00]/30 rounded-lg p-6"><div className="mb-4"><label className="block text-[#EFAF00] mb-2">Your Rating</label><div className="flex" onMouseLeave={() => setHoverRating(0)}>{[...Array(5)].map((_, i) => (<StarIcon key={i} onClick={() => setRating(i + 1)} onMouseEnter={() => setHoverRating(i + 1)} className={`cursor-pointer ${(hoverRating || rating) > i ? 'text-[#EFAF00]' : 'text-gray-600'}`} />))}</div></div><textarea placeholder="Write your review here" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full bg-transparent text-white placeholder-gray-500 border-b border-gray-700 focus:border-[#EFAF00] focus:outline-none h-24 resize-none mb-4"></textarea><button type="submit" className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-[#FFBB00] cursor-pointer w-full">Submit Your Review</button></form></div>
        </div>
    );
};

const FAQ = ({ faqs }) => {
    if (!faqs || faqs.length === 0) {
        return <div className="p-4 md:p-6 text-gray-500 font-redhead">No FAQs available for this product yet.</div>;
    }
    return (<div className="p-4 md:p-6 space-y-6 font-redhead">{faqs.map(item => (<div key={item._id} className="border-b border-[#EFAF00]/20 pb-4"><h4 className="font-bold text-lg text-yellow-300 mb-2">{item.question}</h4><p className="text-gray-300 leading-relaxed">{item.answer}</p></div>))}</div>);
};

// --- MAIN PRODUCT PAGE COMPONENT ---
export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const { id: productId } = params;
    const { addToCart, removeFromCart, cartItems } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('reviews');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const selectedVariant = product?.variants?.find(v => v.size === selectedSize);
    const isSelectedVariantOutOfStock = selectedVariant?.stock === 0;

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            setLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/products/${productId}`);
                if (!res.ok) throw new Error('Product not found.');
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (product) {
            setMainImage(product.images[0]);
            if (product.variants?.length > 0) {
                const defaultSize = product.variants.find(v => v.stock > 0)?.size || product.variants[0].size;
                setSelectedSize(defaultSize);
            }
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const isAlreadyWishlisted = wishlist.some(item => item._id === product._id);
            setIsWishlisted(isAlreadyWishlisted);
        }
    }, [product]);

    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('authToken'); // Check if user is logged in
        if (!token) {
            toast.error("Please login to add items to cart.");
            router.push('/login');
            return;
        }

        if (!selectedSize) {
            toast.error("Please select a size.");
            return;
        }

        try {
            const selectedVariant = product.variants.find(v => v.size === selectedSize);
            if (!selectedVariant || selectedVariant.stock === 0) {
                toast.error("This item is currently out of stock or not available.");
                return;
            }

            const itemToAdd = {
                product: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                size: selectedSize,
                sku: selectedVariant.sku,
            };

            await addToCart(itemToAdd, quantity);

            // 🎯 Move the success toast inside the try block
            toast.success(`${quantity} x ${product.name} (${selectedSize}) added to cart!`);

        } catch (error) {
            // This will catch errors from the addToCart function
            toast.error(`Error adding to cart: ${error.message}`);
            console.error(error);
        }
    };

    const handleBuyNow = () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error("Please login to buy the product.");
            router.push('/login');
            return;
        }
        if (!selectedSize) {
            toast.error("Please select a size.");
            return;
        }


        // --- 👇 FIND THE VARIANT TO GET THE SKU (SAME LOGIC) 👇 ---
        const selectedVariant = product.variants.find(v => v.size === selectedSize);
        if (!selectedVariant) {
            toast.error("Selected size is not available.");
            return;
        }

        // --- 👇 CREATE THE ITEM OBJECT WITH THE SKU 👇 ---
        const buyNowItem = {
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            sku: selectedVariant.sku, // Add the SKU here!
            qty: quantity,
        };

        sessionStorage.setItem('checkoutItems', JSON.stringify([buyNowItem]));
        router.push('/checkout');
    };

    const handleSuggestedItemCartAction = async (action, item) => {
        const token = localStorage.getItem('authToken'); // Check if user is logged in
        if (!token) {
            toast.error("Please login to add items to cart.");
            router.push('/login');
            return;
        }

        const size = item.variants?.[0]?.size || 'One Size';
        if (action === 'add') {
            const itemToAdd = { ...item, selectedSize: size };
            await addToCart(itemToAdd, 1);
            toast.success(`${item.name} added to cart!`);
        } else {
            await removeFromCart(item._id, size);
            toast.success(`${item.name} removed from cart!`);
        }
    };

    const handleReviewSubmit = async ({ rating, comment }) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ rating, comment })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to submit review.");
            const res = await fetch(`${API_BASE_URL}/products/${productId}`);
            const updatedProduct = await res.json();
            setProduct(updatedProduct);
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const handleAddToWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isAlreadyWishlisted = wishlist.some(item => item._id === product._id);

        if (isAlreadyWishlisted) {
            const updatedWishlist = wishlist.filter(item => item._id !== product._id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsWishlisted(false);
            toast.success("Item removed from wishlist!");
        } else {
            const itemToAdd = {
                _id: product._id,
                name: product.name,
                price: product.price,
                images: product.images,
                variants: product.variants,
                category: product.category,
            };
            wishlist.push(itemToAdd);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            setIsWishlisted(true);
            toast.success("Item added to wishlist!");
        }

        // 🎯 Dispatch a storage event to signal a change
        window.dispatchEvent(new Event('storage'));
    };
    if (loading) return <div className="flex justify-center items-center min-h-[90vh]">
        <Lottie animationData={Loader} loop={true} className="lg:w-64 lg:h-64 w-40 h-40" />
    </div>;
    if (error) return <div className="text-center font-redhead text-red-500 py-20">Error: {error}</div>;
    if (!product) return null;

    return (
        <div className="bg-black text-white min-h-screen lg:pt-10 lg:pb-20 px-5 py-10 font-redhead">
            <Toaster position="top-center" />
            <div className="mx-auto max-w-[1400px]">
                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:mb-20 mb-5">
                    <div className="lg:col-span-6 h-auto border border-[#EFAF00] p-2 rounded-lg">
                        {mainImage ? (
                            <Image width={1000} height={1200} src={mainImage} alt={product.name} className="w-full h-full object-cover rounded-md" />
                        ) : (
                            // Optional: You can add a placeholder div or spinner here while the image is loading
                            <div className="flex justify-center items-center py-8">
                                <Lottie animationData={Loader} loop={true} className="w-20 h-20" />
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-1 flex lg:flex-col justify-center items-center gap-2">
                        {product.images.map((img, index) => (
                            <div key={index} className={`border p-1 rounded-md cursor-pointer ${mainImage === img ? 'border-[#EFAF00]' : 'border-gray-700'}`} onClick={() => setMainImage(img)}>
                                <Image width={64} height={80} src={img} alt={`Thumbnail ${index + 1}`} className="w-16 h-20 object-cover rounded-sm" />
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-4 border border-[#EFAF00] lg:p-6 p-4 lg:min-w-[500px] h-fit lg:ml-12 rounded-lg flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-3xl font-bold text-[#EFAF00] tracking-wider">{product.name}</h1>
                            <button onClick={handleAddToWishlist} className={`p-2 cursor-pointer border rounded-md transition-colors ${isWishlisted ? 'bg-[#EFAF00] border-[#EFAF00]' : 'border-gray-600 hover:border-[#EFAF00]'}`}>
                                <HeartIcon filled={isWishlisted} className={`${isWishlisted ? 'text-white' : 'text-[#EFAF00]'}`} />
                            </button>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl mb-1 text-gray-200]">₹{product.price.toLocaleString('en-IN')}</p>

                            <p className="text-sm text-gray-500 line-through">₹{product.price * 2}</p>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">MRP incl. of all taxes</p>

                        {product.suggestedItems?.length > 0 && (
                            <div className="bg-gray-900 border border-[#EFAF00]/30 rounded-lg p-4 mb-8 space-y-4">
                                <h2 className="font-bold text-[#EFAF00] text-lg">BEST VALUE OFFERS</h2>
                                {product.suggestedItems.map(item => {
                                    const size = item.variants?.[0]?.size || 'One Size';
                                    const isInCart = cartItems.some(cartItem => cartItem.product === item._id && cartItem.size === size);
                                    return <SuggestedItem key={item._id} item={item} onCartAction={handleSuggestedItemCartAction} isInCart={isInCart} />;
                                })}
                            </div>
                        )}
                        <div className="mb-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
                            <div className="flex gap-2 flex-wrap">
                                {product.variants.map((variant) => (
                                    <button key={variant.size} onClick={() => setSelectedSize(variant.size)} disabled={variant.stock === 0} className={`w-12 cursor-pointer h-12 border rounded-md font-bold transition-colors ${selectedSize === variant.size ? 'bg-[#EFAF00] text-black border-[#EFAF00]' : 'border-gray-600 hover:border-[#EFAF00] disabled:opacity-50 disabled:cursor-not-allowed'}`}>
                                        {variant.size}
                                    </button>
                                ))}
                            </div>
                        </div>
<h1 className="text-sm font-bold text-[#EFAF00] tracking-wider mt-8 mb-2">Expected Delivery Time: 5 to 9 buisness days</h1>

                        <div className="flex items-center gap-4 mt-auto">
                            <div className="flex items-center border border-gray-600 rounded-md">
                                <button onClick={() => handleQuantityChange(-1)} className="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-l-md">-</button>
                                <span className="px-5 py-2 font-bold">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-r-md">+</button>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <button onClick={handleAddToCart} className="bg-[#EFAF00] text-black font-bold py-3 w-full cursor-pointer rounded-md hover:bg-yellow-300 transition-colors">
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleBuyNow}
                            className={`w-full font-bold py-3 mt-5 rounded-md  transition-colors ${isSelectedVariantOutOfStock ? 'bg-gray-700  text-gray-400 cursor-not-allowed' : 'bg-white cursor-pointer text-black hover:bg-gray-200'}`}
                            disabled={isSelectedVariantOutOfStock}
                        >
                            {isSelectedVariantOutOfStock ? 'OUT OF STOCK' : 'BUY NOW'}
                        </button>
                    </div>
                </main>

                <section>
                    <div className="flex justify-center items-center whitespace-nowrap gap-4 md:gap-8 border-b border-gray-800 lg:mb-8 mb-4">
                        <button onClick={() => setActiveTab('details')} className={`font-bold py-2 px-4 cursor-pointer font-redhead transition-colors duration-300 ${activeTab === 'details' ? 'text-[#EFAF00] border-b-2 border-[#EFAF00]' : 'text-gray-500 hover:text-yellow-300'}`}>DETAILS</button>
                        <button onClick={() => setActiveTab('reviews')} className={`font-bold py-2 px-4 cursor-pointer font-redhead transition-colors duration-300 ${activeTab === 'reviews' ? 'text-[#EFAF00] border-b-2 border-[#EFAF00]' : 'text-gray-500 hover:text-yellow-300'}`}>REVIEWS</button>
                        <button onClick={() => setActiveTab('faq')} className={`font-bold py-2 px-4 font-redhead cursor-pointer transition-colors duration-300 ${activeTab === 'faq' ? 'text-[#EFAF00] border-b-2 border-[#EFAF00]' : 'text-gray-500 hover:text-yellow-300'}`}>FAQs</button>
                    </div>
                    <div>
                        {activeTab === 'details' && <ProductDetails product={product} />}
                        {activeTab === 'reviews' && <Reviews product={product} onReviewSubmit={handleReviewSubmit} />}
                        {activeTab === 'faq' && <FAQ faqs={product.faqs} />}
                    </div>
                </section>
            </div>
        </div>
    );
}