import React from 'react';

const Terms = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Terms & Conditions</h2>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">1. Usage Terms</h3>
          <p className="text-gray-700">
            This menu dashboard is provided for informational purposes only. Prices and availability may vary.
          </p>
        </section>
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">2. Menu Updates</h3>
          <p className="text-gray-700">
            Menu items and prices are subject to change without prior notice.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms; 