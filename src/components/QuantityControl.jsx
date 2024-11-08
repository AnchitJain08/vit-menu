import React from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const QuantityControl = ({ quantity, onIncrease, onDecrease }) => {
  const handleDecrease = (e) => {
    e.stopPropagation();
    if (onDecrease) {
      onDecrease();
    }
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (onIncrease) {
      onIncrease();
    }
  };

  return (
    <div className="flex items-center bg-red-500/90 rounded-lg h-7 w-[88px]">
      {/* Decrease Button */}
      <button
        onClick={handleDecrease}
        className="w-7 h-7 flex items-center justify-center text-white
                 hover:bg-red-600/90 active:bg-red-700/90 transition-colors rounded-l-lg"
        aria-label="Decrease quantity"
      >
        <HiMinus className="w-3 h-3" />
      </button>

      {/* Quantity Display */}
      <div className="w-[30px] h-7 flex items-center justify-center text-white 
                    font-medium text-sm">
        {quantity}
      </div>

      {/* Increase Button */}
      <button
        onClick={handleIncrease}
        className="w-7 h-7 flex items-center justify-center text-white
                 hover:bg-red-600/90 active:bg-red-700/90 transition-colors rounded-r-lg"
        aria-label="Increase quantity"
      >
        <HiPlus className="w-3 h-3" />
      </button>
    </div>
  );
};

export default QuantityControl; 