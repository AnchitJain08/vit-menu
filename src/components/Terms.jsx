import React from 'react';
import { IoInformationCircle } from 'react-icons/io5';

const Terms = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto bg-white dark:bg-[#121212]">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Terms & Conditions</h2>
      
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 space-y-6">
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Usage Terms</h3>
          <p className="text-gray-700 dark:text-gray-300">
            This platform is provided for informational purposes only. While we strive to maintain accurate and up-to-date information, prices and availability may vary.
          </p>
          <div className="flex items-start gap-2 bg-dark-section p-3 rounded-lg">
            <IoInformationCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <p className="text-sm text-gray-300">
              The actual prices at the venues may differ from those displayed on the dashboard.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu Updates</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Menu items and prices are subject to change without prior notice. We update our information regularly but cannot guarantee real-time accuracy.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Reviews & Ratings</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Users are encouraged to provide honest feedback through our review system. However, we reserve the right to remove any inappropriate or offensive content without notice.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Privacy & Data</h3>
          <p className="text-gray-700 dark:text-gray-300">
            We collect and store minimal user data to improve your experience. This includes your preferences and review history. For more information, please refer to our Privacy Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Disclaimer</h3>
          <p className="text-gray-700 dark:text-gray-300">
            While we make every effort to ensure the accuracy of information displayed, we cannot be held responsible for any inconvenience caused by inaccuracies or changes in menu items, prices, or availability.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Service Modifications</h3>
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without prior notice. This includes maintenance periods, updates, or system improvements.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;