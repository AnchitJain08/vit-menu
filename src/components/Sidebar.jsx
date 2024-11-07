import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMenu, IoChevronForward } from 'react-icons/io5';
import { GiCoffeeCup } from 'react-icons/gi';
import { MdRestaurant } from 'react-icons/md';
import { BsBuilding } from 'react-icons/bs';
import { SiCodechef } from 'react-icons/si';

const Sidebar = ({ isExpanded, setIsExpanded, isMobile }) => {
  const location = useLocation();

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-700/50' : '';
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button 
          onClick={handleExpandToggle}
          className="fixed top-4 left-4 z-[100] h-8 w-8 flex items-center justify-center 
                   bg-gray-200 text-gray-700 rounded-lg border border-gray-300"
          aria-label="Toggle menu"
        >
          <IoMenu className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Sidebar content */}
      <div className={`fixed inset-y-0 left-0 bg-gray-800 text-white
                    transition-all duration-300 
                    ${isMobile ? 'w-64' : isExpanded ? 'w-64' : 'w-16'}
                    ${isMobile ? (isExpanded ? 'translate-x-0 z-[110]' : '-translate-x-full z-20') : 'translate-x-0 z-[110]'}`}
      >
        <div className="h-full overflow-y-auto flex flex-col">
          {/* Title with expand/collapse button */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            {isExpanded ? (
              <>
                <h1 className="text-lg font-semibold">VIT Bhopal Menu</h1>
                {!isMobile && (
                  <button
                    onClick={handleExpandToggle}
                    className="p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
                    aria-label="Collapse sidebar"
                  >
                    <IoChevronForward className="w-5 h-5 rotate-180" />
                  </button>
                )}
              </>
            ) : !isMobile && (
              <button
                onClick={handleExpandToggle}
                className="p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
                aria-label="Expand sidebar"
              >
                <IoChevronForward className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Sections */}
          <div className="flex-1 py-4">
            {/* Campus Cafes Section */}
            {isExpanded && (
              <div className="px-4 mb-2">
                <h2 className="text-sm font-medium text-gray-400">Campus Cafes</h2>
              </div>
            )}
            <nav className="space-y-1 px-2">
              <Link
                to="/underbelly"
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg
                          transition-colors duration-200 hover:bg-gray-700/50
                          ${isActive('/underbelly')}`}
                title={!isExpanded ? "Under Belly" : ""}
              >
                <SiCodechef className="w-5 h-5 min-w-[20px]" />
                {isExpanded && <span>Under Belly</span>}
              </Link>
              <Link
                to="/mayuri"
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg
                          transition-colors duration-200 hover:bg-gray-700/50
                          ${isActive('/mayuri')}`}
                title={!isExpanded ? "Mayuri" : ""}
              >
                <MdRestaurant className="w-5 h-5 min-w-[20px]" />
                {isExpanded && <span>Mayuri</span>}
              </Link>
              <Link
                to="/crcl"
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg
                          transition-colors duration-200 hover:bg-gray-700/50
                          ${isActive('/crcl')}`}
                title={!isExpanded ? "CRCL" : ""}
              >
                <GiCoffeeCup className="w-5 h-5 min-w-[20px]" />
                {isExpanded && <span>CRCL</span>}
              </Link>
            </nav>

            {/* Hostel Section */}
            {isExpanded && (
              <div className="px-4 mt-6 mb-2">
                <h2 className="text-sm font-medium text-gray-400">Hostel</h2>
              </div>
            )}
            <nav className="space-y-1 px-2">
              <Link
                to="/hostel-mess"
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg
                          transition-colors duration-200 hover:bg-gray-700/50
                          ${isActive('/hostel-mess')}`}
                title={!isExpanded ? "Hostel Mess Menu" : ""}
              >
                <BsBuilding className="w-5 h-5 min-w-[20px]" />
                {isExpanded && <span>Hostel Mess Menu</span>}
              </Link>
            </nav>
          </div>

          {/* Footer Links - Only show when expanded */}
          {isExpanded && (
            <div className="mt-auto py-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 text-sm text-gray-400">
                <Link
                  to="/about"
                  onClick={handleLinkClick}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  About Us
                </Link>
                <Link
                  to="/terms"
                  onClick={handleLinkClick}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/privacy"
                  onClick={handleLinkClick}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105]"
          onClick={handleExpandToggle}
        />
      )}
    </>
  );
};

export default Sidebar;