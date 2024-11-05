import React, { useState } from 'react';
import { FaPizzaSlice, FaStar } from 'react-icons/fa';
import { GiNoodles, GiFruitBowl, GiChickenOven, GiBreadSlice } from 'react-icons/gi';
import { BiDish } from 'react-icons/bi';
import { IoLeafOutline } from 'react-icons/io5';
import MobileMenu from './MobileMenu';
import { useVegMode } from '../context/VegModeContext';
import { useNavigate } from 'react-router-dom';
import { getCafeData } from '../utils/cafeData';

const Mayuri = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isVegMode } = useVegMode();
  const navigate = useNavigate();
  const cafeData = getCafeData("Mayuri Restaurant");

  const getIconForSection = (key) => ({
    freshItems: <GiFruitBowl className="w-6 h-6" />,
    tandoori: <GiChickenOven className="w-6 h-6" />,
    pasta: <GiNoodles className="w-6 h-6" />,
    pizza: <FaPizzaSlice className="w-6 h-6" />,
    chinese: <GiNoodles className="w-6 h-6" />,
    mainCourse: <BiDish className="w-6 h-6" />,
    breads: <GiBreadSlice className="w-6 h-6" />
  }[key] || null);

  const menu = {
    freshItems: {
      title: "Fresh Items",
      items: [
        { name: "Fresh Lime Water", price: "₹60", isVeg: true },
        { name: "Fresh Lime Soda", price: "₹80", isVeg: true },
        { name: "Fresh Fruits Salad", price: "₹80", isVeg: true }
      ]
    },
    mainCourse: {
      title: "Main Course",
      items: [
        { name: "Kadhai Paneer", price: "₹130", isVeg: true },
        { name: "Butter Paneer Masala", price: "₹140", isVeg: true },
        { name: "Paneer Lababdar", price: "₹150", isVeg: true }
      ]
    },
    tandoori: {
      title: "Tandoori",
      items: [
        { name: "Soya Masala Tikka", price: "₹120", isVeg: true },
        { name: "Soya Malai Tikka", price: "₹130", isVeg: true },
        { name: "Paneer Tikka Masala", price: "₹140", isVeg: true },
        { name: "Paneer Malai Tikka", price: "₹150", isVeg: true }
      ]
    },
    chinese: {
      title: "Chinese",
      items: [
        { name: "Veg. Manchurian", price: "₹100", isVeg: true },
        { name: "Fried Rice", price: "₹110", isVeg: true },
        { name: "Veg. Hakka Noodles", price: "₹110", isVeg: true },
        { name: "Veg. Schezwan Noodles", price: "₹120", isVeg: true },
        { name: "Chilli Paneer", price: "₹130", isVeg: true }
      ]
    },
    pizza: {
      title: "Pizza",
      items: [
        { name: "Cheese Corn Pizza", price: "₹130", isVeg: true },
        { name: "Farm House Pizza", price: "₹150", isVeg: true },
        { name: "Tandoori Paneer Pizza", price: "₹180", isVeg: true }
      ]
    },
    pasta: {
      title: "Pasta",
      items: [
        { name: "Arrabiata Pasta (Red)", price: "₹130", isVeg: true },
        { name: "Alfredo Pasta (White)", price: "₹150", isVeg: true }
      ]
    },
    breads: {
      title: "Breads",
      items: [
        { name: "Tandoori Roti", price: "₹20", isVeg: true },
        { name: "Tandoori Butter Roti", price: "₹25", isVeg: true },
        { name: "Naan", price: "₹25", isVeg: true },
        { name: "Butter Naan", price: "₹30", isVeg: true },
        { name: "Stuffed Kulcha", price: "₹40", isVeg: true },
        { name: "Butter Garlic Naan", price: "₹40", isVeg: true },
        { name: "Tandoori Paratha", price: "₹40", isVeg: true },
        { name: "Stuffed Kulcha with Butter", price: "₹45", isVeg: true }
      ]
    }
  };

  const scrollToSection = (sectionTitle) => {
    const element = document.getElementById(sectionTitle.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredMenu = Object.entries(menu).reduce((acc, [key, section]) => {
    const filteredItems = section.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVegMode = isVegMode ? item.isVeg : true;
      return matchesSearch && matchesVegMode;
    });
    
    if (filteredItems.length > 0) {
      acc[key] = {
        ...section,
        items: filteredItems
      };
    }
    return acc;
  }, {});

  // Flatten menu items for search
  const allMenuItems = Object.values(menu).reduce((items, section) => {
    return [...items, ...section.items];
  }, []);

  const handleReviewClick = () => {
    navigate('/mayuri/reviews', { 
      state: { menuItems: allMenuItems }
    });
  };

  return (
    <div className="p-4">
      {/* Pure Veg Badge */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 rounded-full text-green-700 text-sm font-medium">
          <IoLeafOutline className="w-4 h-4" />
          <span>Pure Veg</span>
        </div>
      </div>

      {/* Title and Rating */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold">Mayuri Restaurant</h2>
          <button 
            onClick={handleReviewClick}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-white rounded-full
                     hover:bg-gray-700 transition-colors duration-200 text-sm"
          >
            <FaStar className="w-4 h-4 text-yellow-400" />
            <span className="font-medium">{cafeData.rating}</span>
            <span className="text-gray-300">({(cafeData.totalReviews/1000).toFixed(1)}K)</span>
          </button>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {Object.entries(searchTerm || isVegMode ? filteredMenu : menu).map(([key, section]) => (
          <div 
            key={key}
            id={section.title.toLowerCase().replace(/\s+/g, '-')}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="bg-gray-800 text-white px-4 py-3 flex items-center gap-2">
              <span className="transform hover:scale-110 transition-transform duration-200">
                {getIconForSection(key)}
              </span>
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <div className="p-4 space-y-2">
              {section.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded hover:shadow-sm hover:scale-[1.01] transition-all duration-200">
                  <span className="font-medium text-sm md:text-base flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}/>
                    {item.name}
                  </span>
                  <span className="text-gray-700 text-sm md:text-base">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        sections={Object.values(menu).map(section => section.title)}
        onSectionClick={scrollToSection}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default Mayuri; 