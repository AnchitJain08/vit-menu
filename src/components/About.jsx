import React from 'react';
import { FaUtensils, FaClipboardList, FaStar } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';

const About = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">About Us</h2>
      
      <div className="space-y-6">
        {/* Main Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to VIT Bhopal's Food Menu Dashboard - your comprehensive guide to campus dining. 
            We understand that good food is an essential part of campus life, which is why we've created 
            this platform to help you explore and discover all the dining options available at VIT Bhopal.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our platform provides real-time access to menus from various campus cafes and the hostel mess, 
            making it easier for students and staff to plan their meals and make informed dining choices.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaUtensils className="w-6 h-6 text-gray-700" />
              <h3 className="text-lg font-semibold">Multiple Venues</h3>
            </div>
            <p className="text-gray-600">
              Access menus from Under Belly Cafe, Mayuri Restaurant, CRCL Cafe, 
              and the Hostel Mess all in one place.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <IoFastFoodOutline className="w-6 h-6 text-gray-700" />
              <h3 className="text-lg font-semibold">Veg/Non-Veg Filter</h3>
            </div>
            <p className="text-gray-600">
              Easily filter menu items based on your dietary preferences with our 
              intuitive veg/non-veg toggle.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaStar className="w-6 h-6 text-gray-700" />
              <h3 className="text-lg font-semibold">Reviews & Ratings</h3>
            </div>
            <p className="text-gray-600">
              Read and share experiences through our rating system to help others 
              make informed dining choices.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-3">
              <FaClipboardList className="w-6 h-6 text-gray-700" />
              <h3 className="text-lg font-semibold">Weekly Mess Menu</h3>
            </div>
            <p className="text-gray-600">
              Stay updated with the hostel mess menu schedule, helping you plan 
              your meals for the entire week.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To enhance the campus dining experience by providing a user-friendly platform 
            that helps our community make informed dining choices. We strive to maintain 
            transparency in food options and pricing while fostering a connection between 
            our campus eateries and their patrons.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 