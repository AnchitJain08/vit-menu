import React from 'react';

const About = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">About Us</h2>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <p className="text-gray-700">
          Welcome to VIT Bhopal's Food Menu Dashboard - your one-stop destination for all campus dining information.
        </p>
        <p className="text-gray-700">
          Our platform provides real-time access to menus from various campus cafes and the hostel mess, making it easier for students and staff to plan their meals.
        </p>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-700">
            To provide a seamless and user-friendly experience for accessing dining information across the VIT Bhopal campus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 