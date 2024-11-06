import React from 'react';
import { IoInformationCircle } from 'react-icons/io5';

const Terms = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Terms & Conditions</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Usage Terms */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">1. Usage Terms</h3>
          <p className="text-gray-700">
            This menu dashboard is provided for informational purposes only. While we strive 
            to maintain accurate and up-to-date information, prices and availability may vary.
          </p>
          <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
            <IoInformationCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <p className="text-sm text-blue-700">
              The actual prices at the venues may differ from those displayed on the dashboard.
            </p>
          </div>
        </section>

        {/* Menu Updates */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">3. Menu Updates</h3>
          <p className="text-gray-700">
            Menu items and prices are subject to change without prior notice. We update our 
            information regularly but cannot guarantee real-time accuracy.
          </p>
        </section>

        {/* Reviews & Ratings */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">4. Reviews & Ratings</h3>
          <p className="text-gray-700">
            Users are encouraged to provide honest feedback through our review system. However, 
            we reserve the right to remove any inappropriate or offensive content without notice.
          </p>
        </section>

        {/* Privacy & Data */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">5. Privacy & Data</h3>
          <p className="text-gray-700">
            We collect and store minimal user data to improve your experience. This includes 
            your preferences and review history. For more information, please refer to our 
            Privacy Policy.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">6. Disclaimer</h3>
          <p className="text-gray-700">
            While we make every effort to ensure the accuracy of information displayed, we 
            cannot be held responsible for any inconvenience caused by inaccuracies or changes 
            in menu items, prices, or availability.
          </p>
        </section>

        {/* Service Modifications */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">7. Service Modifications</h3>
          <p className="text-gray-700">
            We reserve the right to modify, suspend, or discontinue any aspect of the service 
            at any time without prior notice. This includes maintenance periods, updates, or 
            system improvements.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms; 