import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaEnvelope className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:support@vitbhopal.ac.in" 
                   className="text-blue-600 hover:underline">
                  support@vitbhopal.ac.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaPhone className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">+91 755 123 4567</p>
                <p className="text-gray-600">+91 755 765 4321</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaWhatsapp className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">WhatsApp Support</p>
                <p className="text-gray-600">+91 755 987 6543</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">
                  VIT Bhopal University<br />
                  Bhopal-Indore Highway<br />
                  Kothrikalan, Sehore<br />
                  Madhya Pradesh - 466114
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaClock className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Operating Hours</h3>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-3">
              <h4 className="font-medium mb-2">Campus Cafes</h4>
              <p className="text-gray-600">Monday - Saturday: 8:00 AM - 10:00 PM</p>
              <p className="text-gray-600">Sunday: 9:00 AM - 9:00 PM</p>
            </div>

            <div className="border-b pb-3">
              <h4 className="font-medium mb-2">Hostel Mess</h4>
              <div className="text-gray-600">
                <p>Breakfast: 7:30 AM - 9:00 AM</p>
                <p>Lunch: 12:30 PM - 2:30 PM</p>
                <p>Snacks: 5:00 PM - 6:30 PM</p>
                <p>Dinner: 7:30 PM - 9:00 PM</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Support Hours</h4>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 