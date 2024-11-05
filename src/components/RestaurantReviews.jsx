import React, { useState } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';

const RestaurantReviews = ({ restaurantName }) => {
  const [activeTab, setActiveTab] = useState('recent');

  // Sample data - replace with real data
  const reviews = {
    rating: 4.3,
    totalReviews: 1432,
    distribution: [
      { stars: 5, count: 800 },
      { stars: 4, count: 400 },
      { stars: 3, count: 150 },
      { stars: 2, count: 52 },
      { stars: 1, count: 30 }
    ],
    recentReviews: [
      {
        id: 1,
        user: "Rahul S.",
        rating: 5,
        date: "2 days ago",
        comment: "Amazing food! The Paneer Tikka was perfectly spiced and the service was quick.",
        isVeg: true
      },
      {
        id: 2,
        user: "Priya M.",
        rating: 4,
        date: "1 week ago",
        comment: "Good variety of options. Loved the Chinese section. Portions could be bigger.",
        isVeg: true
      },
      // Add more reviews...
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with Overall Rating */}
      <div className="p-6 bg-gray-800 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{restaurantName} Reviews</h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{reviews.rating}</span>
            <FaStar className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <p className="text-gray-300 mt-1">{reviews.totalReviews} ratings</p>
      </div>

      {/* Rating Distribution */}
      <div className="p-6 border-b">
        <div className="space-y-2">
          {reviews.distribution.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-24">
                <span className="text-sm">{stars}</span>
                <FaStar className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${(count / reviews.totalReviews) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 w-16 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Tabs */}
      <div className="border-b">
        <div className="flex">
          {['recent', 'highest', 'lowest'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200
                        ${activeTab === tab 
                          ? 'text-gray-800 border-b-2 border-gray-800' 
                          : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="divide-y max-h-[400px] overflow-y-auto">
        {reviews.recentReviews.map((review) => (
          <div key={review.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-start gap-4">
              <FaUserCircle className="w-10 h-10 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium truncate">{review.user}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <IoTimeOutline className="w-4 h-4" />
                  <span>{review.date}</span>
                  {review.isVeg && (
                    <span className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantReviews; 