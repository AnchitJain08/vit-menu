import React from 'react';

const BottomControls = () => {
  return (
    <div className="fixed bottom-4 left-0 right-0 px-4 md:px-0 z-[45]">
      <div className="mx-auto max-w-5xl flex items-center justify-between md:justify-start md:gap-3 md:ml-4">
        {/* Left side empty for menu icon */}
        <div></div>
        {/* Right side empty for search icon */}
        <div className="md:hidden"></div>
      </div>
    </div>
  );
};

export default BottomControls; 