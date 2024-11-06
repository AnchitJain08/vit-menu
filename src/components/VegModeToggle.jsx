import React from 'react';
import { useVegMode } from '../context/VegModeContext';

const VegModeToggle = () => {
  const { isVegMode, setIsVegMode } = useVegMode();

  return (
    <div className="fixed top-4 right-36 z-50 flex items-center gap-2">
      <button
        onClick={() => setIsVegMode(!isVegMode)}
        className={`flex items-center px-3 py-1.5 rounded-full shadow-lg 
                   transition-all duration-200 backdrop-blur-sm
                   ${isVegMode 
                     ? 'bg-green-500/90 text-white' 
                     : 'bg-white/90 text-gray-700'}`}
      >
        <span className="text-sm font-medium">VEG</span>
        <div className={`ml-2 w-4 h-4 rounded-full border-2 
                      ${isVegMode ? 'border-white bg-green-500' : 'border-gray-400'}`} />
      </button>
    </div>
  );
};

export default VegModeToggle; 