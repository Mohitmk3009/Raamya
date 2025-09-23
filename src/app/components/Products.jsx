'use client';
import Image from 'next/image';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- ICONS ---
const SearchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);
const ChevronRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);
const ChevronLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);
// NEW: Filter and Close Icons for mobile
const FilterIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
);
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="text-gray-300 group font-redhead" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Link href={`/product/${product._id}`} className="block overflow-hidden mb-4 border border-gray-800">
                <Image
                    width={1000}
                    height={1000}
                    src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                    alt={product.name}
                    className="w-full h-auto max-h-[500px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
            </Link>
            <p className="text-sm text-[#FFBB00]">{product.category}</p>
            <div className='flex justify-between items-center text-lg'>
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="font-semibold text-yellow-500">&#8377;{product.price}</p>
            </div>
        </div>
    );
};

// --- ACCORDION COMPONENT ---
const FilterAccordion = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="py-3 border-b border-gray-800 font-redhead">
            <h4 className="font-medium flex justify-between items-center text-[#FFBB00] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {title}
                <ChevronRightIcon size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
            </h4>
            {isOpen && <div className="mt-4 text-sm">{children}</div>}
        </div>
    );
};

// --- SIDEBAR COMPONENT ---
const Sidebar = ({ filters, setFilters, maxProductPrice }) => {
    const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
    const CATEGORIES = ['IT girl', 'Girly Pop', 'bloom girl', 'desi diva', 'street chic'];

    const handleSizeSelect = (size) => setFilters(prev => ({ ...prev, selectedSize: prev.selectedSize === size ? null : size }));
    const handleAvailabilityChange = (e) => setFilters(prev => ({ ...prev, availability: { ...prev.availability, [e.target.name]: e.target.checked } }));
    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setFilters(prev => {
            const newCategories = checked ? [...prev.selectedCategories, value] : prev.selectedCategories.filter(c => c !== value);
            return { ...prev, selectedCategories: newCategories };
        });
    };
    const handlePriceChange = (e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }));

    return (
        <aside className="w-full font-redhead">
            <div className="py-6">
                <h3 className="font-bold mb-4 text-2xl text-[#FFBB00]">FILTERS</h3>
                <div className="mb-6">
                    <h4 className="font-medium mb-3 text-[#FFBB00]">SIZE</h4>
                    <div className="flex flex-wrap gap-2">{SIZES.map(size => <button key={size} onClick={() => handleSizeSelect(size)} className={`w-10 h-10 border text-sm transition ${filters.selectedSize === size ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-gray-700 hover:bg-gray-700'}`}>{size}</button>)}</div>
                </div>
                <FilterAccordion title="Availability" defaultOpen={true}>
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm cursor-pointer">
                            <input type="checkbox" name="inStock" checked={filters.availability.inStock} onChange={handleAvailabilityChange} className="bg-transparent border-gray-600 rounded-sm" />
                            <span>In Stock</span>
                        </label>
                    </div>
                </FilterAccordion>
                <FilterAccordion title="Category" defaultOpen={true}>
                    <div className="space-y-2">{CATEGORIES.map(cat => <label key={cat} className="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" value={cat} checked={filters.selectedCategories.includes(cat)} onChange={handleCategoryChange} className="bg-transparent border-gray-600 rounded-sm" /><span>{cat}</span></label>)}</div>
                </FilterAccordion>
                <FilterAccordion title="Price Range" defaultOpen={true}>
                    <div className="px-1 pt-2">
                        <input type="range" min="0" max={maxProductPrice} value={filters.maxPrice} onChange={handlePriceChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2"><span>₹0</span><span>₹{filters.maxPrice}</span></div>
                    </div>
                </FilterAccordion>
            </div>
        </aside>
    );
};

// --- Inner component that contains the page logic ---
function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get('category');

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const maxProductPrice = 50000;
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filters, setFilters] = useState({
        keyword: '',
        sortBy: 'default',
        selectedSize: null,
        availability: { inStock: false, outOfStock: false },
        selectedCategories: categoryFromUrl ? [categoryFromUrl] : [],
        maxPrice: maxProductPrice,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const params = new URLSearchParams();

            if (filters.keyword) params.append('keyword', filters.keyword);
            if (filters.sortBy !== 'default') params.append('sortBy', filters.sortBy);
            if (filters.selectedSize) params.append('size', filters.selectedSize);
            
            const { inStock } = filters.availability;
            if (inStock) {
                params.append('inStock', 'true');
            }

            if (filters.selectedCategories.length > 0) params.append('category', filters.selectedCategories.join(','));
            if (filters.maxPrice < maxProductPrice) params.append('maxPrice', filters.maxPrice);
            params.append('pageNumber', page);

            try {
                const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
                const data = await response.json();
                setProducts(data.products);
                setPage(data.page);
                setPages(data.pages);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, page]);

    useEffect(() => {
        setPage(1);
    }, [filters]);
    
    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isFilterOpen]);


    const handleGoToPage = (pageNumber) => {
        setPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-black text-gray-400 lg:min-h-screen font-redhead px-5 py-10 md:p-10 pb-0">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row">
                    {/* --- DESKTOP SIDEBAR --- */}
                    <div className="hidden lg:block lg:w-1/4 lg:pr-8">
                        <Sidebar filters={filters} setFilters={setFilters} maxProductPrice={maxProductPrice} />
                    </div>

                    <main className="w-full lg:w-3/4 lg:pl-8">
                        <div className="flex justify-between items-center mb-6">
                            <div className="lg:text-lg text-sm font-bold text-[#FFBB00]"><span className="font-normal">Home /</span> Products</div>
                            <div className="flex items-center border text-[#FFBB00] border-gray-700 p-2 rounded-md">
                                <label htmlFor="sort" className="mr-2 lg:text-sm text-xs">SORT BY</label>
                                <select id="sort" value={filters.sortBy} onChange={e => setFilters(prev => ({...prev, sortBy: e.target.value}))} className="bg-black text-sm outline-none">
                                    <option value="default">Default</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* --- MOBILE FILTER BUTTON & SEARCH BAR --- */}
                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <div className="relative flex-grow">
                                <input type="text" placeholder="Search Products..." value={filters.keyword} onChange={e => setFilters(prev => ({...prev, keyword: e.target.value}))} className="w-full bg-black border border-gray-700 text-white p-3 pl-12 focus:outline-none focus:bg-gray-900 focus:border-yellow-500 rounded-md" />
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            </div>
                            <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center justify-center gap-2 p-3 bg-black border border-yellow-500 text-yellow-500 rounded-md font-semibold">
                                <FilterIcon size={18} />
                                FILTERS
                            </button>
                        </div>
                        
                        {loading ? (
                            <div className="text-center py-20 text-yellow-400">Loading Products...</div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {products.map(product => <ProductCard key={product._id} product={product} />)}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">No products found matching your criteria.</div>
                        )}

                        <div className="flex justify-center items-center lg:mt-12 lg:pb-12 mt-5 space-x-2">
                            <button onClick={() => handleGoToPage(page - 1)} disabled={page === 1} className="p-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeftIcon size={20} /></button>
                            {pages > 1 && Array.from({ length: pages }, (_, i) => i + 1).map(pageNum => (
                                <button key={pageNum} onClick={() => handleGoToPage(pageNum)} className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition ${page === pageNum ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-yellow-500 hover:text-black'}`}>{pageNum}</button>
                            ))}
                            <button onClick={() => handleGoToPage(page + 1)} disabled={page === pages || pages === 0} className="p-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRightIcon size={20} /></button>
                        </div>
                    </main>
                </div>
            </div>

            {/* --- MOBILE FILTER DRAWER --- */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black/60" onClick={() => setIsFilterOpen(false)}></div>
                    <div className="relative w-full max-w-xs bg-black h-full shadow-xl flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-gray-800">
                           <h2 className="text-lg font-bold text-yellow-500">Filters</h2>
                           <button onClick={() => setIsFilterOpen(false)} className="p-1 text-gray-400 hover:text-white">
                                <XIcon size={24}/>
                           </button>
                        </div>
                        <div className="flex-grow overflow-y-auto px-4">
                            <Sidebar filters={filters} setFilters={setFilters} maxProductPrice={maxProductPrice} />
                        </div>
                         <div className="p-4 border-t border-gray-800">
                            <button 
                                onClick={() => setIsFilterOpen(false)} 
                                className="w-full bg-yellow-500 text-black font-bold py-3 rounded-md hover:bg-yellow-600 transition-colors"
                            >
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- MAIN PRODUCTS PAGE COMPONENT ---
export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="bg-black text-yellow-400 min-h-screen flex items-center justify-center font-redhead">
                <p className="text-xl">Loading Page...</p>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}