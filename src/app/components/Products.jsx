// 'use client'
// import Image from 'next/image';
// import React, { useState, useMemo, useEffect } from 'react';

// // --- ICONS (inlined for simplicity) ---
// const SearchIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//         <circle cx="11" cy="11" r="8"></circle>
//         <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//     </svg>
// );

// const ChevronRightIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//         <polyline points="9 18 15 12 9 6"></polyline>
//     </svg>
// );

// const ChevronLeftIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//         <polyline points="15 18 9 12 15 6"></polyline>
//     </svg>
// );


// // Mock data for products, updated with new properties for filtering
// const products = [
//     { id: 1, category: 'Bloom Girl', name: 'Basic Slim Fit T-Shirt', price: 199, image1: 'https://images.unsplash.com/photo-1683849117820-a9c2fd92f3b9?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://images.unsplash.com/photo-1683849116110-56294e55920e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', size: 'M', inStock: true,  },
//     { id: 2, category: 'IT Girl', name: 'Basic Heavy Weight T-Shirt', price: 849, image1: 'https://images.unsplash.com/photo-1579809160635-5eeeeae4d79f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://images.unsplash.com/photo-1579809160794-b857f9898832?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', size: 'L', inStock: true,  },
//     { id: 3, category: 'Girly Pop', name: 'Full Sleeve Zipper', price: 350, image1: 'https://images.unsplash.com/photo-1740128041074-7fc1593e7851?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://images.unsplash.com/photo-1740128041010-5b1f934db955?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', size: 'S', inStock: false,  },
//     { id: 4, category: 'IT Girl', name: 'Stylish Sleeve Zipper', price: 299, image1: 'https://plus.unsplash.com/premium_photo-1682095661711-f5d67d0e75a9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://plus.unsplash.com/premium_photo-1682095672918-234595db1df8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', size: 'S', inStock: true,  },
//     { id: 5, category: 'Desi Diva', name: 'Casual Full Sleeve', price: 150, image1: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://images.unsplash.com/photo-1503342250614-ca440786f637?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', size: 'M', inStock: true,  },
//     { id: 6, category: 'Street Chic', name: 'Denim Classic Jacket', price: 499, image1: 'https://plus.unsplash.com/premium_photo-1734388423063-bcad4a2d2d9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://plus.unsplash.com/premium_photo-1734388423075-047e2039d5fd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', size: 'L', inStock: true,  },
//     { id: 7, category: 'Bloom Girl', name: 'Oversized Comfy Hoodie', price: 399, image1: 'https://plus.unsplash.com/premium_photo-1673758905600-4863f662bc1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://plus.unsplash.com/premium_photo-1673758910160-029abce3cd81?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', size: 'L', inStock: false,  },
//     { id: 8, category: 'Street Chic', name: 'Slim-fit Black Jeans', price: 450, image1: 'https://plus.unsplash.com/premium_photo-1664875849194-0adbac28529f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', image2: 'https://plus.unsplash.com/premium_photo-1664875849457-a73a4231f115?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D', size: 'M', inStock: true, },
// ];

// const ProductCard = ({ product }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     return (
//         <div className="text-gray-300 group font-redhead" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
//             <a href="/productdetails" className="block overflow-hidden mb-4 border border-gray-800">
//                 <Image width={1000} height={1000} src={isHovered ? product.image2 : product.image1} alt={product.name} className="w-full h-auto max-h-[500px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"  />
//             </a>
//             <p className="text-sm text-[#FFBB00]">{product.category}</p>
//             <div className='flex justify-between items-center text-lg'>
//                 <h3 className="font-medium mb-1">{product.name}</h3>
//                 <p className="font-semibold text-yellow-500">&#8377;{product.price}</p>
//             </div>
//         </div>
//     );
// };

// const FilterAccordion = ({ title, children, defaultOpen = false }) => {
//     const [isOpen, setIsOpen] = useState(defaultOpen);
//     return (
//         <div className="py-3 border-b border-gray-800 font-redhead">
//             <h4 className="font-medium flex justify-between items-center text-[#FFBB00] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
//                 {title}
//                 <ChevronRightIcon size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
//             </h4>
//             {isOpen && <div className="mt-4 text-sm">{children}</div>}
//         </div>
//     );
// };

// const Sidebar = ({ setGridClass, gridClass, filters, setFilters, maxProductPrice }) => {
//     const SIZES = ['XS', 'S', 'M', 'L', ];
//     const uniqueCategories = [...new Set(products.map(p => p.category))];

//     const handleSizeSelect = (size) => {
//         setFilters(prev => ({ ...prev, selectedSize: prev.selectedSize === size ? null : size }));
//     };

//     const handleAvailabilityChange = (e) => {
//         const { name, checked } = e.target;
//         setFilters(prev => ({ ...prev, availability: { ...prev.availability, [name]: checked } }));
//     };

//     const handleCategoryChange = (e) => {
//         const { value, checked } = e.target;
//         setFilters(prev => {
//             const newCategories = checked
//                 ? [...prev.selectedCategories, value]
//                 : prev.selectedCategories.filter(c => c !== value);
//             return { ...prev, selectedCategories: newCategories };
//         });
//     };

//     const handlePriceChange = (e) => {
//         setFilters(prev => ({ ...prev, maxPrice: e.target.value }));
//     };

//     return (
//         <aside className="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0 font-redhead">
//             <div className="flex items-center justify-between pb-4 border-b border-gray-800">
//                 <div className="flex items-center space-x-1 border border-gray-700 p-1 rounded-md">
//                     <button title="3 Columns" onClick={() => setGridClass('grid-cols-3')} className={`p-2 rounded-sm ${gridClass === 'grid-cols-3' ? 'bg-gray-800 text-[#FFBB00]' : 'hover:bg-gray-600 '}`}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="18"></rect><rect x="10" y="3" width="6" height="18"></rect><rect x="17" y="3" width="6" height="18"></rect></svg></button>
//                     <button title="4 Columns" onClick={() => setGridClass('grid-cols-4')} className={`p-2 rounded-sm ${gridClass === 'grid-cols-4' ? 'bg-gray-800 text-[#FFBB00]' : 'hover:bg-gray-600'}`}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="4" height="18"></rect><rect x="8.5" y="3" width="4" height="18"></rect><rect x="14" y="3" width="4" height="18"></rect><rect x="19.5" y="3" width="4" height="18"></rect></svg></button>
//                     <button title="6 Columns" onClick={() => setGridClass('grid-cols-6')} className={`p-2 rounded-sm ${gridClass === 'grid-cols-6' ? 'bg-gray-800 text-[#FFBB00]' : 'hover:bg-gray-600'}`}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="3" height="18"></rect><rect x="6" y="3" width="3" height="18"></rect><rect x="10" y="3" width="3" height="18"></rect><rect x="14" y="3" width="3" height="18"></rect><rect x="18" y="3" width="3" height="18"></rect><rect x="21" y="3" width="3" height="18"></rect></svg></button>
//                 </div>
//             </div>
//             <div className="py-6">
//                 <h3 className="font-bold mb-4 text-2xl text-[#FFBB00]">FILTERS</h3>
//                 <div className="mb-6">
//                     <h4 className="font-medium mb-3 text-[#FFBB00]">SIZE</h4>
//                     <div className="flex flex-wrap gap-2">{SIZES.map(size => <button key={size} onClick={() => handleSizeSelect(size)} className={`w-10 h-10 border text-sm transition ${filters.selectedSize === size ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-gray-700 hover:bg-gray-700'}`}>{size}</button>)}</div>
//                 </div>
//                 <FilterAccordion title="Availability" defaultOpen={true}>
//                     <div className="space-y-2">
//                         <label className="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" name="inStock" checked={filters.availability.inStock} onChange={handleAvailabilityChange} className="bg-transparent border-gray-600 rounded-sm" /><span>In Stock</span></label>
//                         <label className="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" name="outOfStock" checked={filters.availability.outOfStock} onChange={handleAvailabilityChange} className="bg-transparent border-gray-600 rounded-sm" /><span>Out Of Stock</span></label>
//                     </div>
//                 </FilterAccordion>
//                 <FilterAccordion title="Category">
//                     <div className="space-y-2">{uniqueCategories.map(cat => <label key={cat} className="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" value={cat} checked={filters.selectedCategories.includes(cat)} onChange={handleCategoryChange} className="bg-transparent border-gray-600 rounded-sm" /><span>{cat}</span></label>)}</div>
//                 </FilterAccordion>
//                 <FilterAccordion title="Price Range" defaultOpen={true}>
//                     <div className="px-1 pt-2">
//                          <input
//                             type="range"
//                             min="0"
//                             max={maxProductPrice}
//                             value={filters.maxPrice}
//                             onChange={handlePriceChange}
//                             className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
//                         />
//                         <div className="flex justify-between text-xs text-gray-400 mt-2">
//                             <span>₹0</span>
//                             <span>₹{filters.maxPrice}</span>
//                         </div>
//                     </div>
//                 </FilterAccordion>
//             </div>
//         </aside>
//     );
// };

// export default function ProductsPage() {
//     const [gridClass, setGridClass] = useState('grid-cols-3');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [productsPerPage, setProductsPerPage] = useState(6);
    
//     const maxProductPrice = useMemo(() => Math.ceil(Math.max(...products.map(p => p.price)) / 100) * 100, []);

//     const [filters, setFilters] = useState({
//         searchTerm: '',
//         sortBy: 'default',
//         selectedSize: null,
//         availability: { inStock: false, outOfStock: false },
//         selectedCategories: [],
//         maxPrice: maxProductPrice,
//     });

//     useEffect(() => {
//         const productsMap = { 'grid-cols-3': 6, 'grid-cols-4': 8, 'grid-cols-6': 12 };
//         setProductsPerPage(productsMap[gridClass] || 6);
//         setCurrentPage(1);
//     }, [gridClass]);

//     const filteredAndSortedProducts = useMemo(() => {
//         let tempProducts = [...products];

//         // Filtering logic
//         if (filters.availability.inStock && !filters.availability.outOfStock) tempProducts = tempProducts.filter(p => p.inStock);
//         if (!filters.availability.inStock && filters.availability.outOfStock) tempProducts = tempProducts.filter(p => !p.inStock);
//         if (filters.selectedSize) tempProducts = tempProducts.filter(p => p.size.toUpperCase() === filters.selectedSize.toUpperCase());
//         if (filters.selectedCategories.length > 0) tempProducts = tempProducts.filter(p => filters.selectedCategories.includes(p.category));
        
//         if (filters.searchTerm) {
//             tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()));
//         }

//         const max = parseFloat(filters.maxPrice);

//         if (!isNaN(max)) {
//             tempProducts = tempProducts.filter(p => p.price <= max);
//         }
        
//         // Sorting logic
//         if (filters.sortBy === 'price-asc') tempProducts.sort((a, b) => a.price - b.price);
//         if (filters.sortBy === 'price-desc') tempProducts.sort((a, b) => b.price - a.price);
        
//         return tempProducts;
//     }, [filters]);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [filters]);

//     const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
//     const paginatedProducts = useMemo(() => {
//         const startIndex = (currentPage - 1) * productsPerPage;
//         return filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);
//     }, [currentPage, filteredAndSortedProducts, productsPerPage]);

//     const handleGoToPage = (pageNumber) => {
//         setCurrentPage(pageNumber);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
    
//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             handleGoToPage(currentPage - 1);
//         }
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             handleGoToPage(currentPage + 1);
//         }
//     };

//     return (
//         <div className="bg-black text-gray-400 min-h-screen font-redhead p-10 pb-0 ">
//             <div className="container mx-auto">
//                 <div className="flex flex-col lg:flex-row">
//                     <Sidebar setGridClass={setGridClass} gridClass={gridClass} filters={filters} setFilters={setFilters} maxProductPrice={maxProductPrice} />
//                     <main className="w-full lg:w-3/4 lg:pl-8">
//                         <div className="flex justify-between items-center mb-6">
//                             <div className="text-lg font-bold text-[#FFBB00]"><span className=" font-normal">Home /</span> Products</div>
//                             <div className="flex items-center border text-[#FFBB00] border-gray-700 p-2 rounded-md">
//                                 <label htmlFor="sort" className="mr-2 text-sm">SORT BY</label>
//                                 <select id="sort" value={filters.sortBy} onChange={e => setFilters(prev => ({...prev, sortBy: e.target.value}))} className="bg-black text-sm outline-none">
//                                     <option value="default">Default</option>
//                                     <option value="price-asc">Price: Low to High</option>
//                                     <option value="price-desc">Price: High to Low</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="relative mb-8">
//                             <input type="text" placeholder="Search" value={filters.searchTerm} onChange={e => setFilters(prev => ({...prev, searchTerm: e.target.value}))} className="w-full bg-black border border-gray-700 text-white p-3 pl-12 focus:outline-none focus:bg-gray-900 focus:border-yellow-500 rounded-md" />
//                             <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
//                         </div>
//                         <div className={`grid ${gridClass} gap-8`}>
//                             {paginatedProducts.map(product => <ProductCard key={product.id} product={product} />)}
//                         </div>
//                         <div className="flex justify-center items-center mt-12 pb-12 space-x-2">
//                             <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeftIcon size={20} /></button>
                            
//                             {/* Page Numbers */}
//                             {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                                 <button
//                                     key={page}
//                                     onClick={() => handleGoToPage(page)}
//                                     className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition ${
//                                         currentPage === page
//                                         ? 'bg-yellow-500 text-black'
//                                         : 'bg-gray-800 text-gray-300 hover:bg-yellow-500 hover:text-black'
//                                     }`}
//                                 >
//                                     {page}
//                                 </button>
//                             ))}

//                             <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0} className="p-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRightIcon size={20} /></button>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';
import Image from 'next/image';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

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
const Sidebar = ({ setGridClass, gridClass, filters, setFilters, maxProductPrice }) => {
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
        <aside className="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0 font-redhead">
            <div className="py-6">
                <h3 className="font-bold mb-4 text-2xl text-[#FFBB00]">FILTERS</h3>
                <div className="mb-6">
                    <h4 className="font-medium mb-3 text-[#FFBB00]">SIZE</h4>
                    <div className="flex flex-wrap gap-2">{SIZES.map(size => <button key={size} onClick={() => handleSizeSelect(size)} className={`w-10 h-10 border text-sm transition ${filters.selectedSize === size ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-gray-700 hover:bg-gray-700'}`}>{size}</button>)}</div>
                </div>
                <FilterAccordion title="Availability" defaultOpen={true}>
                    <div className="space-y-2"><label className="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" name="inStock" checked={filters.availability.inStock} onChange={handleAvailabilityChange} className="bg-transparent border-gray-600 rounded-sm" /><span>In Stock</span></label></div>
                </FilterAccordion>
                <FilterAccordion title="Category">
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

// --- MAIN PRODUCTS PAGE COMPONENT ---
export default function ProductsPage() {
    const [gridClass, setGridClass] = useState('grid-cols-3');
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const maxProductPrice = 50000; // Set a static max price for the slider

    const [filters, setFilters] = useState({
        keyword: '',
        sortBy: 'default',
        selectedSize: null,
        availability: { inStock: false },
        selectedCategories: [],
        maxPrice: maxProductPrice,
    });

    // This useEffect is the engine of the page. It re-fetches data whenever filters or page number change.
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const params = new URLSearchParams();

            if (filters.keyword) params.append('keyword', filters.keyword);
            if (filters.sortBy !== 'default') params.append('sortBy', filters.sortBy);
            if (filters.selectedSize) params.append('size', filters.selectedSize);
            if (filters.availability.inStock) params.append('inStock', 'true');
            if (filters.selectedCategories.length > 0) params.append('category', filters.selectedCategories.join(','));
            if (filters.maxPrice < maxProductPrice) params.append('maxPrice', filters.maxPrice);
            params.append('pageNumber', page);

            try {
                const response = await fetch(`http://localhost:5001/api/products?${params.toString()}`);
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

    // Reset to page 1 whenever filters change
    useEffect(() => {
        setPage(1);
    }, [filters]);


    const handleGoToPage = (pageNumber) => {
        setPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-black text-gray-400 min-h-screen font-redhead p-10 pb-0 ">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row">
                    <Sidebar setGridClass={setGridClass} gridClass={gridClass} filters={filters} setFilters={setFilters} maxProductPrice={maxProductPrice} />
                    <main className="w-full lg:w-3/4 lg:pl-8">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-lg font-bold text-[#FFBB00]"><span className=" font-normal">Home /</span> Products</div>
                            <div className="flex items-center border text-[#FFBB00] border-gray-700 p-2 rounded-md">
                                <label htmlFor="sort" className="mr-2 text-sm">SORT BY</label>
                                <select id="sort" value={filters.sortBy} onChange={e => setFilters(prev => ({...prev, sortBy: e.target.value}))} className="bg-black text-sm outline-none">
                                    <option value="default">Default</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative mb-8">
                            <input type="text" placeholder="Search" value={filters.keyword} onChange={e => setFilters(prev => ({...prev, keyword: e.target.value}))} className="w-full bg-black border border-gray-700 text-white p-3 pl-12 focus:outline-none focus:bg-gray-900 focus:border-yellow-500 rounded-md" />
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        </div>
                        
                        {loading ? (
                            <div className="text-center py-20 text-yellow-400">Loading Products...</div>
                        ) : products.length > 0 ? (
                            <div className={`grid ${gridClass} gap-8`}>
                                {products.map(product => <ProductCard key={product._id} product={product} />)}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">No products found matching your criteria.</div>
                        )}

                        <div className="flex justify-center items-center mt-12 pb-12 space-x-2">
                            <button onClick={() => handleGoToPage(page - 1)} disabled={page === 1} className="p-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeftIcon size={20} /></button>
                            {pages > 1 && Array.from({ length: pages }, (_, i) => i + 1).map(pageNum => (
                                <button key={pageNum} onClick={() => handleGoToPage(pageNum)} className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition ${page === pageNum ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-yellow-500 hover:text-black'}`}>{pageNum}</button>
                            ))}
                            <button onClick={() => handleGoToPage(page + 1)} disabled={page === pages || pages === 0} className="p-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRightIcon size={20} /></button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}