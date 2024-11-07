import React from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const QuantityControl = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center bg-red-500/90 rounded-lg h-7 w-[88px]">
      {/* Decrease Button */}
      <button
        onClick={onDecrease}
        className="w-7 h-7 flex items-center justify-center text-white
                 hover:bg-red-600/90 active:bg-red-700/90 transition-colors"
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
        onClick={onIncrease}
        className="w-7 h-7 flex items-center justify-center text-white
                 hover:bg-red-600/90 active:bg-red-700/90 transition-colors"
        aria-label="Increase quantity"
      >
        <HiPlus className="w-3 h-3" />
      </button>
    </div>
  );
};

export default QuantityControl; 