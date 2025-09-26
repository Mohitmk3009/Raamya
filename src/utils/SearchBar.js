'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const SearchIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);

export default function Searchbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/allproducts?keyword=${searchQuery}`);
      setSearchQuery(''); // Clear search query after search
      setIsOpen(false); // Close the search bar
    }
  };

  return (
    <div
      className="relative flex items-center h-10 transition-all duration-500 ease-in-out"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`
            bg-gray-900 text-white placeholder-gray-500 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#EFAF00]
            transition-all duration-500 ease-in-out transform
            ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}
          `}
          aria-expanded={isOpen}
          aria-label="Search products"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            absolute transition-all duration-500 ease-in-out text-gray-500 hover:text-[#EFAF00]
            ${isOpen ? 'right-3' : 'right-0'}
          `}
          aria-label="Toggle search bar"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}