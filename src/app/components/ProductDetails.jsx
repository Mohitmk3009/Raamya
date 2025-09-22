'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// --- ICONS ---
const HeartIcon = ({ filled = false, ...props }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>);
const StarIcon = ({ filled = true, ...props }) => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>);
const VerifiedIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> );
const FilterIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg> );
const MoreHorizontalIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg> );


// --- SUB-COMPONENTS ---
const SuggestedItem = ({ item, onCartAction, isInCart }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Image width={48} height={48} src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-md object-cover border border-amber-500/50" />
                <div>
                    <p className="text-sm text-gray-300">Pair it with: {item.name}</p>
                    <p className="font-bold text-amber-400 text-sm">&#8377;{item.price}</p>
                </div>
            </div>
            <button
                onClick={() => onCartAction(isInCart ? 'remove' : 'add', item, item.variants?.[0]?.size || 'One Size', 1)}
                className={`font-bold py-2 px-4 rounded-md transition-colors text-sm ${isInCart ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-amber-400 text-black hover:bg-amber-300'}`}
            >
                {isInCart ? 'REMOVE' : 'ADD'}
            </button>
        </div>
    );
};

const ProductDetails = ({ product }) => (<div className="text-gray-300 leading-relaxed p-4 md:p-6 font-redhead"><h3 className="font-bold text-xl text-amber-300 mb-4">Product Description</h3><p className="mb-4">{product.description}</p></div>);

const ReviewCard = ({ review }) => (
    <div className="border border-amber-500/30 rounded-lg p-6 flex flex-col font-redhead">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
                <p className="font-bold text-white">{review.name}</p>
                {/* We can add a verified field to the review schema later if needed */}
                <VerifiedIcon className="text-green-500" />
            </div>
            <button className="text-gray-500 hover:text-white"><MoreHorizontalIcon /></button>
        </div>
        <div className="flex items-center gap-1 mb-4 text-amber-400">{[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}</div>
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
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="font-bold text-xl text-white">ALL REVIEWS ({product.reviews.length})</h3>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-md border border-amber-500/30 hover:border-amber-400"><FilterIcon className="w-5 h-5 text-white" /></button>
                    <select className="bg-black border border-amber-500/30 rounded-md py-2 px-3 text-white focus:outline-none focus:border-amber-400"><option>Latest</option><option>Highest Rated</option></select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {product.reviews.slice(0, visibleReviewCount).map(review => <ReviewCard key={review._id} review={review} />)}
            </div>
            {product.reviews.length > visibleReviewCount && (
                <div className="text-center mb-12">
                    <button onClick={() => setVisibleReviewCount(prev => prev + 4)} className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-[#FFBB00] hover:text-white transition-colors">Load More Reviews</button>
                </div>
            )}
            <div className="w-full mt-8">
                <h3 className="font-bold text-xl text-white mb-4">Write a Customer Review</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="border border-amber-500/30 rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-amber-400 mb-2">Your Rating</label>
                        <div className="flex" onMouseLeave={() => setHoverRating(0)}>{[...Array(5)].map((_, i) => (<StarIcon key={i} onClick={() => setRating(i + 1)} onMouseEnter={() => setHoverRating(i + 1)} className={`cursor-pointer ${(hoverRating || rating) > i ? 'text-amber-400' : 'text-gray-600'}`} />))}</div>
                    </div>
                    <textarea placeholder="Write your review here" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full bg-transparent text-white placeholder-gray-500 border-b border-gray-700 focus:border-amber-400 focus:outline-none h-24 resize-none mb-4"></textarea>
                    <button type="submit" className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-[#FFBB00] w-full">Submit Your Review</button>
                </form>
            </div>
        </div>
    );
};

const FAQ = ({ faqs }) => {
    if (!faqs || faqs.length === 0) {
        return <div className="p-4 md:p-6 text-gray-500 font-redhead">No FAQs available for this product yet.</div>;
    }
    return (
        <div className="p-4 md:p-6 space-y-6 font-redhead">{faqs.map(item => (<div key={item._id} className="border-b border-amber-500/20 pb-4"><h4 className="font-bold text-lg text-amber-300 mb-2">{item.question}</h4><p className="text-gray-300 leading-relaxed">{item.answer}</p></div>))}</div>
    );
};

// --- MAIN PRODUCT PAGE COMPONENT ---
export default function ProductPage() {
    const params = useParams();
    const { id: productId } = params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [activeTab, setActiveTab] = useState('reviews');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchProductAndCart = async () => {
            if (!productId) return;
            setLoading(true);
            try {
                const productRes = await fetch(`${API_BASE_URL}/products/${productId}`);
                if (!productRes.ok) throw new Error('Product not found.');
                const productData = await productRes.json();
                setProduct(productData);
                setMainImage(productData.images[0]);
                if (productData.variants?.length > 0) {
                    setSelectedSize(productData.variants.find(v => v.stock > 0)?.size || productData.variants[0].size);
                }
                const token = localStorage.getItem('authToken');
                if (token) {
                    const cartRes = await fetch(`${API_BASE_URL}/cart`, { headers: { 'Authorization': `Bearer ${token}` } });
                    if (cartRes.ok) {
                        const cartData = await cartRes.json();
                        setCartItems(cartData.items || []);
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProductAndCart();
    }, [productId]);

    const handleQuantityChange = (amount) => setQuantity(prev => Math.max(1, prev + amount));

    const handleCartAction = async (action, productToAdd, size, qty) => {
        const token = localStorage.getItem('authToken');
        if (!token) { window.location.href = '/login'; return; }
        const isRemove = action === 'remove';
        const endpoint = isRemove ? `${API_BASE_URL}/cart/${productToAdd._id}/${size}` : `${API_BASE_URL}/cart`;
        try {
            const response = await fetch(endpoint, {
                method: isRemove ? 'DELETE' : 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: isRemove ? null : JSON.stringify({ productId: productToAdd._id, size, qty })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setCartItems(data.items);
            alert(`Item ${isRemove ? 'removed from' : 'added to'} cart!`);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
    
    const handleReviewSubmit = async ({ rating, comment }) => {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('You must be logged in to write a review.');
        const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ rating, comment })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to submit review.");
        fetchProductAndCart(); // Refetch everything to update reviews and cart
    };

    const handleAddToWishlist = () => {
        setIsWishlisted(!isWishlisted);
        alert('Wishlist functionality will be built next!');
    };

    if (loading) return <div className="text-center text-white py-20">Loading Product...</div>;
    if (error) return <div className="text-center text-red-500 py-20">Error: {error}</div>;
    if (!product) return null;

    return (
        <div className="bg-black text-white min-h-screen pt-10 pb-20 font-redhead">
            <div className="mx-auto max-w-[1400px]">
                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    <div className="lg:col-span-6 max-h-[800px] border border-amber-400 p-2 rounded-lg"><Image width={1000} height={1200} src={mainImage} alt={product.name} className="w-full h-full object-cover rounded-md" /></div>
                    <div className="lg:col-span-1 flex lg:flex-col justify-center items-center gap-2">
                        {product.images.map((img, index) => (
                            <div key={index} className={`border p-1 rounded-md cursor-pointer ${mainImage === img ? 'border-amber-400' : 'border-gray-700'}`} onClick={() => setMainImage(img)}>
                                <Image width={64} height={80} src={img} alt={`Thumbnail ${index + 1}`} className="w-16 h-20 object-cover rounded-sm" />
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-4 border border-amber-400 p-6 min-w-[500px] ml-12 rounded-lg flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-3xl font-bold text-amber-300 tracking-wider">{product.name}</h1>
                            <button onClick={handleAddToWishlist} className={`p-2 border rounded-md transition-colors ${isWishlisted ? 'bg-amber-400 border-amber-400 text-white' : 'border-gray-600 hover:border-amber-400 text-white'}`}><HeartIcon filled={isWishlisted} className={`${isWishlisted ? 'text-white' : 'text-amber-400'}`} /></button>
                        </div>
                        <p className="text-2xl mb-1 text-gray-200">&#8377;{product.price.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-gray-400 mb-6">MRP incl. of all taxes</p>
                        {product.suggestedItems?.length > 0 && (
                            <div className="bg-gray-900 border border-amber-500/30 rounded-lg p-4 mb-8 space-y-4">
                                <h2 className="font-bold text-amber-400 text-lg">BEST VALUE OFFERS</h2>
                                {product.suggestedItems.map(item => {
                                    const isInCart = cartItems.some(cartItem => cartItem.product.toString() === item._id.toString() && cartItem.size === (item.variants?.[0]?.size || 'One Size'));
                                    return <SuggestedItem key={item._id} item={item} onCartAction={handleCartAction} isInCart={isInCart} />;
                                })}
                            </div>
                        )}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
                            <div className="flex gap-2 flex-wrap">{product.variants.map((variant) => (<button key={variant.size} onClick={() => setSelectedSize(variant.size)} disabled={variant.stock === 0} className={`w-12 h-12 border rounded-md font-bold transition-colors ${selectedSize === variant.size ? 'bg-amber-400 text-black border-amber-400' : 'border-gray-600 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed'}`}>{variant.size}</button>))}</div>
                        </div>
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Apply Coupon</label>
                            <div className="flex"><input type="text" placeholder="Enter coupon code" className="w-full bg-gray-800 border border-gray-700 rounded-l-md p-3 text-gray-400 focus:outline-none focus:border-yellow-500" /><button className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-r-md transition-colors whitespace-nowrap">APPLY</button></div>
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className="flex items-center border border-gray-600 rounded-md">
                                <button onClick={() => handleQuantityChange(-1)} className="px-4 py-3 hover:bg-gray-800 rounded-l-md">-</button>
                                <span className="px-5 py-2 font-bold">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="px-4 py-3 hover:bg-gray-800 rounded-r-md">+</button>
                            </div>
                            <button onClick={() => handleCartAction('add', product, selectedSize, quantity)} className="bg-amber-400 text-black font-bold py-3 w-full rounded-md hover:bg-amber-300">ADD TO CART</button>
                        </div>
                    </div>
                </main>
                <section>
                    <div className="flex justify-center items-center gap-4 md:gap-8 border-b border-gray-800 mb-8">
                        <button onClick={() => setActiveTab('details')} className={`font-bold py-2 px-4 font-redhead transition-colors duration-300 ${activeTab === 'details' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500 hover:text-amber-300'}`}>PRODUCT DETAILS</button>
                        <button onClick={() => setActiveTab('reviews')} className={`font-bold py-2 px-4 font-redhead transition-colors duration-300 ${activeTab === 'reviews' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500 hover:text-amber-300'}`}>RATING AND REVIEWS</button>
                        <button onClick={() => setActiveTab('faq')} className={`font-bold py-2 px-4 font-redhead transition-colors duration-300 ${activeTab === 'faq' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-500 hover:text-amber-300'}`}>FAQs</button>
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