import React from 'react';
import { IoRestaurantSharp } from 'react-icons/io5';

const MobileMenu = ({ sections, onSectionClick, isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <>
          {/* Dark Backdrop */}
          <div 
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[0.0625rem]"
            onClick={onClose}
          />

          {/* Menu Content */}
          <div className="fixed z-[70] bottom-[4rem] inset-x-[1rem] md:right-[2rem] md:left-auto md:w-[18rem]">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center px-[1rem] py-[0.75rem] border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">Categories</h3>
                <button 
                  onClick={onClose}
                  className="w-[1.75rem] h-[1.75rem] flex items-center justify-center 
                           hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <IoRestaurantSharp className="w-[1rem] h-[1rem] text-gray-500" />
                </button>
              </div>

              {/* Sections List */}
              <div className="px-[0.5rem] py-[0.5rem]">
                <div className="max-h-[min(25rem,60vh)] overflow-y-auto">
                  {sections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onSectionClick(section);
                        onClose();
                      }}
                      className="w-full text-left px-[0.75rem] py-[0.625rem] rounded-lg
                               text-gray-700 hover:bg-gray-100 
                               active:bg-gray-200 transition-colors duration-200"
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