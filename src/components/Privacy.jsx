import React from 'react';

const Privacy = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Data Collection</h3>
          <p className="text-gray-700">
            We do not collect any personal information through this menu dashboard.
          </p>
        </section>
        <section className="space-y-2">
          <h3 className="text-lg font-semibold">Usage Information</h3>
          <p className="text-gray-700">
            Basic usage statistics may be collected to improve user experience.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy; 