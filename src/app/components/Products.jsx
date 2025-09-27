'use client';
import React, { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import Lottie from 'lottie-react';
import Loader from '../../../public/lottie/Loading.json';
import Image from 'next/image';
// --- ICONS ---
const SearchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const ChevronRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"></polyline></svg>
);
const ChevronLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const FilterIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

// --- MODIFIED: Grid layout icons to show lines ---
const Grid3Icon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="4" width="18" height="6" rx="1"></rect>
        <rect x="3" y="14" width="18" height="6" rx="1"></rect>
    </svg>
);

// Icon for 4-column layout ("4 box" style with more space)
const Grid4Icon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="4" y="4" width="6" height="6" rx="1"></rect>
        <rect x="14" y="4" width="6" height="6" rx="1"></rect>
        <rect x="4" y="14" width="6" height="6" rx="1"></rect>
        <rect x="14" y="14" width="6" height="6" rx="1"></rect>
    </svg>
);

// Icon for 6-column layout ("6 vertical line" style)
const Grid6Icon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="4" y1="3" x2="4" y2="21"></line>
        <line x1="8" y1="3" x2="8" y2="21"></line>
        <line x1="12" y1="3" x2="12" y2="21"></line>
        <line x1="16" y1="3" x2="16" y2="21"></line>
        <line x1="20" y1="3" x2="20" y2="21"></line>
    </svg>
);


// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ product, gridCols, mobileGridCols }) => {
    const [isHovered, setIsHovered] = useState(false);
    const mobileHeightClasses = {
        1: 'h-[500px]', // 1 column layout
        2: 'h-[300px]', // 2 column layout
    };

    // Define height classes for desktop view (note the 'lg:' prefix)
    const desktopHeightClasses = {
        3: 'lg:h-[500px]', // 3 column layout
        4: 'lg:h-[400px]', // 4 column layout
        6: 'lg:h-[250px]', // 6 column layout
    };
    const containerHeightClass = `${mobileHeightClasses[mobileGridCols]} ${desktopHeightClasses[gridCols]}`;

    
    return (
        <div
            className="text-gray-300 group font-redhead"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 1. THE CONTAINER: Must be 'relative' and have 'overflow-hidden' */}
            <a
                href={`/product/${product._id}`}
                className={`relative block w-full overflow-hidden mb-4 border border-gray-800 ${containerHeightClass}`}
            >
                {/* 2. THE IMAGE: Positioned 'absolute' to fill the container */}
                <Image
                    width={1000}
                    height={1000}
                    src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full pointer-events-none  h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />

                {product.isOutOfStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <span className="text-white text-lg font-bold">Out of Stock</span>
                    </div>
                )}
            </a>

            {/* Product Details */}
            <p className="text-sm text-[#FFBB00] uppercase">{product.category}</p>
            <div className='flex justify-between items-center text-lg'>
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="font-semibold text-[#EFAF00]">₹{product.price}</p>
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
    const handleAvailabilityChange = (e) => {
        const { name, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            availability: {
                ...prev.availability,
                [name]: checked
            }
        }));
    };
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
                    <div className="flex flex-wrap gap-2">{SIZES.map(size => <button key={size} onClick={() => handleSizeSelect(size)} className={`w-10 h-10 border cursor-pointer text-sm transition ${filters.selectedSize === size ? 'bg-[#EFAF00] border-[#EFAF00] text-black' : 'border-gray-700 hover:bg-gray-700'}`}>{size}</button>)}</div>
                </div>
                <FilterAccordion title="Availability" defaultOpen={true}>
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={filters.availability.inStock}
                                onChange={handleAvailabilityChange}
                                className="bg-transparent cursor-pointer border-gray-600 rounded-sm"
                            />
                            <span>In Stock</span>
                        </label>
                        <label className="flex items-center space-x-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                name="outOfStock"
                                checked={filters.availability.outOfStock}
                                onChange={handleAvailabilityChange}
                                className="bg-transparent cursor-pointer border-gray-600 rounded-sm"
                            />
                            <span>Out of Stock</span>
                        </label>
                    </div>
                </FilterAccordion>
                <FilterAccordion title="Category" defaultOpen={true}>
                    <div className="space-y-2">{CATEGORIES.map(cat => <label key={cat} className="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" value={cat} checked={filters.selectedCategories.includes(cat)} onChange={handleCategoryChange} className="bg-transparent cursor-pointer border-gray-600 rounded-sm" /><span>{cat}</span></label>)}</div>
                </FilterAccordion>
                <FilterAccordion title="Price Range" defaultOpen={true}>
                    <div className="px-1 pt-2">
                        <input type="range" min="0" max={maxProductPrice} value={filters.maxPrice} onChange={handlePriceChange} className="w-full h-2 bg-gray-700  rounded-lg appearance-none cursor-pointer accent-[#EFAF00]" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2"><span>₹0</span><span>₹{filters.maxPrice}</span></div>
                    </div>
                </FilterAccordion>
            </div>
        </aside>
    );
};

// --- SEARCH POPUP COMPONENT ---
const SearchPopup = ({ searchQuery, searchResults, isSearching, onResultClick, onClose }) => {
    if (!searchQuery) return null;

    return (
        <div className="absolute top-16 left-0 right-0 z-50 bg-black/80 backdrop-blur-md p-4 rounded-md shadow-lg border border-[#EFAF00]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#EFAF00]">Search Results</h3>
                <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
                    <XIcon size={24} />
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
                            <div className="flex items-center space-x-4 cursor-pointer">
                                <Image width={200} height={200} src={product.images[0]} alt={product.name} className="w-16 h-20 object-cover rounded" />
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

// --- Inner component that contains the page logic ---
function ProductsContent() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const maxProductPrice = 50000;
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [gridCols, setGridCols] = useState(3);
    const [mobileGridCols, setMobileGridCols] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    // Search state
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchPopup, setShowSearchPopup] = useState(false);

    // Ref to detect clicks outside the search area
    const searchRef = useRef(null);

    const [filters, setFilters] = useState({
        keyword: '',
        filter: '',
        sortBy: 'default',
        selectedSize: null,
        availability: { inStock: false, outOfStock: false },
        selectedCategories: [],
        maxPrice: maxProductPrice,
    });


    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        const filter = searchParams.get('filter') || '';
        const category = searchParams.get('category') ? searchParams.get('category').split(',') : [];

        setFilters(prev => ({
            ...prev,
            keyword: keyword,
            filter: filter,
            selectedCategories: category,
        }));
        setPage(1); // Reset to page 1 for new search/filter
    }, [searchParams]);


    useEffect(() => {
        const handleResize = () => {
            const isDesktop = window.innerWidth >= 1024; // Tailwind's 'lg' breakpoint

            if (isDesktop) {
                if (gridCols === 3) setPageSize(9);
                else if (gridCols === 4) setPageSize(12);
                else if (gridCols === 6) setPageSize(18);
            } else {
                // For mobile, it's always 10 products per page
                setPageSize(10);
            }
        };

        handleResize(); // Set initial size
        window.addEventListener('resize', handleResize); // Add listener for screen changes

        // Cleanup the listener
        return () => window.removeEventListener('resize', handleResize);
    }, [gridCols]); // Re-run this logic whenever the desktop grid layout changes


    // Debounce function for search input
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const params = new URLSearchParams();
            params.append('exclude', 'New shirt');
            if (filters.keyword) params.append('keyword', filters.keyword);
            if (filters.filter) params.append('filter', filters.filter);
            if (filters.sortBy !== 'default') params.append('sortBy', filters.sortBy);

            if (filters.selectedSize) params.append('size', filters.selectedSize);

            const { inStock, outOfStock } = filters.availability;
            if (inStock) {
                params.append('inStock', 'true');
            }
            if (outOfStock) {
                params.append('outOfStock', 'true');
            }

            if (filters.selectedCategories.length > 0) params.append('category', filters.selectedCategories.join(','));
            if (filters.maxPrice < maxProductPrice) params.append('maxPrice', filters.maxPrice);

            params.append('pageSize', pageSize);
            params.append('pageNumber', page);
            try {
                const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
                const data = await response.json();

                const productsWithStockStatus = data.products.map(product => {
                    const isOutOfStock = product.variants.every(variant => variant.stock === 0);
                    return {
                        ...product,
                        isOutOfStock: isOutOfStock
                    };
                });

                const filteredProducts = productsWithStockStatus.filter(
                    product => product.name !== 'New shirt'
                );
                setProducts(filteredProducts);

                setPage(data.page);
                setPages(data.pages);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };


        const timer = setTimeout(() => {
            fetchProducts();
        }, 300); // Debounce to prevent multiple fetches on rapid state changes

        return () => clearTimeout(timer);
    }, [filters, page, pageSize]);

    useEffect(() => {
        setPage(1);
    }, [filters, pageSize]);

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

    // Debounced search logic
    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            setShowSearchPopup(false);
            return;
        }

        setIsSearching(true);
        setShowSearchPopup(true);

        const timer = setTimeout(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products?keyword=${searchTerm}`);
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
    }, [searchTerm]);

    // Hook to handle clicks outside the search popup
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    const handleGoToPage = (pageNumber) => {
        setPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleResultClick = (productId) => {
        // Redirect to product page or filter products
        // For this example, we'll just close the popup
        setShowSearchPopup(false);
        setSearchTerm('');
        // You could also use useRouter to navigate:
        // router.push(`/product/${productId}`);
    };

    const gridLayoutClasses = {
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        6: 'lg:grid-cols-6',
    };

    const mobileGridLayoutClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
    };

    return (
        <div className="bg-black text-gray-400 lg:min-h-screen font-redhead px-5 py-10 md:p-10 pb-0">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row">
                    <div className="hidden lg:block lg:w-1/4 lg:pr-8">
                        <Sidebar filters={filters} setFilters={setFilters} maxProductPrice={maxProductPrice} />
                    </div>

                    <main className="w-full lg:w-3/4 lg:pl-8">
                        <div className="lg:text-lg text-sm font-bold mb-6 lg:hidden text-[#EFAF00]"><span className="font-normal hover:text-white cursor-pointer">Home /</span> Products</div>

                        <div className="flex justify-between items-center mb-6">
                            <div className="lg:text-lg text-sm font-bold hidden lg:block text-[#EFAF00]"><span className="font-normal hover:text-white cursor-pointer">Home /</span> Products</div>

                            <div className="lg:flex items-center gap-4 hidden">
                                <div className="hidden lg:flex items-center gap-1 border border-gray-700 p-1 rounded-md">
                                    <button onClick={() => setGridCols(3)} className={`p-1 rounded cursor-pointer transition-colors ${gridCols === 3 ? 'bg-gray-700 text-[#EFAF00]' : 'text-gray-500 hover:text-white'}`}>
                                        <Grid3Icon />
                                    </button>
                                    <button onClick={() => setGridCols(4)} className={`p-1 rounded cursor-pointer transition-colors ${gridCols === 4 ? 'bg-gray-700 text-[#EFAF00]' : 'text-gray-500 hover:text-white'}`}>
                                        <Grid4Icon />
                                    </button>
                                    <button onClick={() => setGridCols(6)} className={`p-1 rounded cursor-pointer transition-colors ${gridCols === 6 ? 'bg-gray-700 text-[#EFAF00]' : 'text-gray-500 hover:text-white'}`}>
                                        <Grid6Icon />
                                    </button>
                                </div>
                                <div className="flex items-center border text-[#FFBB00] border-gray-700 p-2 cursor-pointer rounded-md">
                                    <label htmlFor="sort" className="mr-2 lg:text-sm text-xs">SORT BY</label>
                                    <select id="sort" value={filters.sortBy} onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value }))} className="bg-black text-sm outline-none">
                                        <option value="default">Default</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between lg:hidden w-full">
                                <div className="lg:hidden flex items-center gap-1 border border-gray-700 p-1 rounded-md">
                                    <button onClick={() => setMobileGridCols(1)} className={`p-1 rounded cursor-pointer transition-colors ${mobileGridCols === 1 ? 'bg-gray-700 text-[#EFAF00]' : 'text-gray-500 hover:text-white'}`}>
                                        <Grid3Icon />
                                    </button>
                                    <button onClick={() => setMobileGridCols(2)} className={`p-1 rounded cursor-pointer transition-colors ${mobileGridCols === 2 ? 'bg-gray-700 text-[#EFAF00]' : 'text-gray-500 hover:text-white'}`}>
                                        <Grid4Icon />
                                    </button>
                                </div>
                                <div className="flex items-center border text-[#FFBB00] border-gray-700 p-2 cursor-pointer rounded-md">
                                    <label htmlFor="sort" className="mr-2 lg:text-sm text-xs">SORT BY</label>
                                    <select id="sort" value={filters.sortBy} onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value }))} className="bg-black text-sm outline-none">
                                        <option value="default">Default</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Search Input for ProductsPage */}
                        <div ref={searchRef} className="relative flex flex-col md:flex-row gap-4 mb-8">
                            <div className="flex-grow">
                                <input
                                    type="text"
                                    placeholder="Search Products..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-black border border-gray-700  text-white p-3 pl-12 focus:outline-none focus:bg-gray-900 focus:border-[#EFAF00] rounded-md"
                                />
                                <SearchIcon className="absolute left-3 top-3 lg:top-1/2 lg:-translate-y-1/2 text-gray-500" size={20} />
                            </div>
                            <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center justify-center gap-2 p-3 bg-black border border-[#EFAF00] text-[#EFAF00] rounded-md font-semibold">
                                <FilterIcon size={18} />
                                FILTERS
                            </button>
                            {showSearchPopup && (
                                <SearchPopup
                                    searchQuery={searchTerm}
                                    searchResults={searchResults}
                                    isSearching={isSearching}
                                    onResultClick={handleResultClick}
                                    onClose={() => setShowSearchPopup(false)}
                                />
                            )}
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center min-h-[90vh]">
                                <Lottie animationData={Loader} loop={true} className="lg:w-54 lg:h-54 w-40 h-40" />
                            </div>
                        ) : products.length > 0 ? (
                            <div className={`grid ${mobileGridLayoutClasses[mobileGridCols]} md:grid-cols-2 ${gridLayoutClasses[gridCols]} gap-6 md:gap-8`}>
                                {products.map(product => <ProductCard key={product._id} product={product} gridCols={gridCols} mobileGridCols={mobileGridCols} />)}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">No products found matching your criteria.</div>
                        )}

                        <div className="flex justify-center items-center lg:mt-12 lg:pb-12 mt-5 space-x-2">
                            <button onClick={() => handleGoToPage(page - 1)} disabled={page === 1} className="p-2 border cursor-pointer border-[#EFAF00] text-[#EFAF00] rounded-full hover:bg-[#EFAF00] hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeftIcon size={20} /></button>
                            {pages > 1 && Array.from({ length: pages }, (_, i) => i + 1).map(pageNum => (
                                <button key={pageNum} onClick={() => handleGoToPage(pageNum)} className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition ${page === pageNum ? 'bg-[#EFAF00] text-black' : 'bg-gray-800 text-gray-300 hover:bg-[#EFAF00] hover:text-black'}`}>{pageNum}</button>
                            ))}
                            <button onClick={() => handleGoToPage(page + 1)} disabled={page === pages || pages === 0} className="p-2 border cursor-pointer border-[#EFAF00] text-[#EFAF00] rounded-full hover:bg-[#EFAF00] hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRightIcon size={20} /></button>
                        </div>
                    </main>
                </div>
            </div>

            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out lg:hidden ${isFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                aria-hidden={!isFilterOpen}
            >
                <div
                    className="fixed inset-0 bg-black/60"
                    onClick={() => setIsFilterOpen(false)}
                ></div>
                <div
                    className={`relative w-full max-w-xs bg-black h-full shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-800">
                        <h2 className="text-lg font-bold text-[#EFAF00]">Filters</h2>
                        <button onClick={() => setIsFilterOpen(false)} className="p-1 text-gray-400 hover:text-white">
                            <XIcon size={24} />
                        </button>
                    </div>
                    <div className="flex-grow overflow-y-auto px-4">
                        <Sidebar filters={filters} setFilters={setFilters} maxProductPrice={maxProductPrice} />
                    </div>
                    <div className="p-4 border-t border-gray-800">
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="w-full bg-[#EFAF00] text-black font-bold py-3 rounded-md hover:bg-yellow-600 transition-colors"
                        >
                            Show Results
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- MAIN PRODUCTS PAGE COMPONENT ---
export default function ProductsPage() {

    return (
        <Suspense>
            <ProductsContent />
        </Suspense>
    );
}
