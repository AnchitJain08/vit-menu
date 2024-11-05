import React from 'react';

const Contact = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <p className="text-gray-700">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> support@vitbhopal.ac.in
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +91 XXX XXX XXXX
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> VIT Bhopal University, Bhopal-Indore Highway
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Operating Hours</h3>
            <div className="space-y-2">
              <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-700">Saturday: 9:00 AM - 1:00 PM</p>
              <p className="text-gray-700">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 