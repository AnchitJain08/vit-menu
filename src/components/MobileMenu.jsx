import React, { useState } from 'react';
import { IoRestaurantOutline } from 'react-icons/io5';
import { IoRestaurantSharp } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';

const MobileMenu = ({ sections, onSectionClick, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = sections.filter(section =>
    section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <>
      {/* Fixed Bottom Bar with equal spacing - Mobile & Desktop */}
      <div className="fixed bottom-4 z-50 flex justify-end items-center gap-4
                    md:right-8 md:left-auto md:w-auto">
        {/* Search Bar */}
        <div className="relative flex-1 md:flex-initial md:w-64">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full h-12 pl-11 pr-4 bg-white/90 backdrop-blur-sm rounded-full 
                     text-gray-700 shadow-lg focus:outline-none focus:ring-2 
                     focus:ring-gray-800 transition-all duration-200 text-base"
          />
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 bg-gray-800 rounded-full text-white shadow-lg 
                   hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
          aria-label="Open menu"
        >
          <IoRestaurantOutline className="w-6 h-6" />
        </button>
      </div>

      {/* Menu Modal */}
      {isOpen && (
        <>
          {/* Blurred Backdrop */}
          <div 
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Content - Floating design */}
          <div className="fixed z-50 md:right-8 md:bottom-20 md:w-72
                        inset-x-4 bottom-20 md:left-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl 
                          border border-gray-200/50 overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 
                           rounded-full transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <IoRestaurantSharp className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Sections List */}
              <div className="px-2 pb-2">
                <div className="max-h-[200px] overflow-y-auto rounded-xl">
                  {filteredSections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onSectionClick(section);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl
                               hover:bg-gray-100/80 active:bg-gray-200/80 
                               transition-colors duration-200 text-gray-700"
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu; 