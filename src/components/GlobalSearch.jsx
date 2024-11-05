import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

const GlobalSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Don't show on analytics or other non-menu pages
  const nonMenuPaths = ['/analytics', '/about', '/terms', '/privacy', '/contact'];
  if (nonMenuPaths.includes(location.pathname)) {
    return null;
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <div className="fixed bottom-4 inset-x-4 z-50 flex justify-end items-center gap-4 md:hidden">
      {/* Search Bar */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full h-12 pl-11 pr-4 bg-white/90 backdrop-blur-sm rounded-full 
                   text-gray-700 shadow-lg focus:outline-none focus:ring-2 
                   focus:ring-gray-800 transition-all duration-200 text-base"
        />
        <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default GlobalSearch; 