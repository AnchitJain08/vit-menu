import React from 'react';

const Privacy = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto bg-white dark:bg-[#121212]">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Privacy Policy
      </h2>
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 space-y-4">
        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Data Collection
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            We are committed to protecting your privacy. We collect minimal data necessary to enhance your experience, such as preferences and review history.
          </p>
        </section>
        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Usage Information</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Basic usage statistics may be collected to improve user experience. This data is anonymized and used solely for analytical purposes.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy; 