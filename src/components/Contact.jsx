import React from 'react';
import { FaEnvelope, FaPhone, FaClock, FaWhatsapp, FaGithub, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto bg-white dark:bg-[#121212]">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Contact Us</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Get in Touch
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 group transform transition-transform duration-200 hover:scale-105">
              <FaEnvelope className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 group-hover:text-[#D44638]" />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-[#D44638]">Email</p>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-[#D44638]">anchitjain08@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3 group transform transition-transform duration-200 hover:scale-105">
              <FaPhone className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 group-hover:text-[#34B7F1]" />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-[#34B7F1]">Phone</p>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-[#34B7F1]">+91 9999765111</p>
              </div>
            </div>

            <div className="flex items-start gap-3 group transform transition-transform duration-200 hover:scale-105">
              <FaWhatsapp className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 group-hover:text-[#25D366]" />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-[#25D366]">WhatsApp Support</p>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-[#25D366]">+91 9999765111</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 flex justify-start space-x-4">
            <a href="https://github.com/anchitjain08" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transform transition-transform duration-200 hover:scale-110">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/anchit_jain_/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#E4405F] dark:hover:text-[#E4405F] transform transition-transform duration-200 hover:scale-110">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="mailto:anchitjain08@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-[#D44638] dark:hover:text-[#D44638] transform transition-transform duration-200 hover:scale-110">
              <FaEnvelope className="w-6 h-6" />
            </a>
            <a href="https://wa.me/919999765111" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#25D366] dark:hover:text-[#25D366] transform transition-transform duration-200 hover:scale-110">
              <FaWhatsapp className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaClock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Operating Hours</h3>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-3">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Campus Cafes</h4>
              <p className="text-gray-600 dark:text-gray-400">Monday - Saturday: 8:00 AM - 10:00 PM</p>
              <p className="text-gray-600 dark:text-gray-400">Sunday: 9:00 AM - 9:00 PM</p>
            </div>

            <div className="border-b pb-3">
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Hostel Mess</h4>
              <div className="text-gray-600 dark:text-gray-400">
                <p>Breakfast: 7:30 AM - 9:00 AM</p>
                <p>Lunch: 12:30 PM - 2:30 PM</p>
                <p>Snacks: 5:00 PM - 6:30 PM</p>
                <p>Dinner: 7:30 PM - 9:00 PM</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Support Hours</h4>
              <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-600 dark:text-gray-400">Saturday: 9:00 AM - 1:00 PM</p>
              <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 