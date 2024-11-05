import React, { useState } from 'react';
import { GiNoodles, GiChickenOven, GiCoffeeCup, GiBreadSlice } from 'react-icons/gi';
import { BiDish } from 'react-icons/bi';
import { MdFoodBank } from 'react-icons/md';
import MobileMenu from './MobileMenu';

const CRCL = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getIconForSection = (key) => ({
    quickBites: <GiCoffeeCup className="w-6 h-6" />,
    tandoor: <GiChickenOven className="w-6 h-6" />,
    mainCourse: <BiDish className="w-6 h-6" />,
    breads: <GiBreadSlice className="w-6 h-6" />,
    paratha: <MdFoodBank className="w-6 h-6" />,
    dosa: <MdFoodBank className="w-6 h-6" />,
    chinese: <GiNoodles className="w-6 h-6" />
  }[key] || null);

  const menu = {
    quickBites: {
      title: "Quick Bites",
      items: [
        { name: "Bread Omelet", price: "₹60", isVeg: false },
        { name: "Plain Omelet", price: "₹40", isVeg: false },
        { name: "Samosa", price: "₹15", isVeg: true },
        { name: "Bread Pakode", price: "₹30", isVeg: true },
        { name: "Boiled Egg", price: "₹15", isVeg: false }
      ]
    },
    mainCourse: {
      title: "Main Course",
      items: [
        { name: "Kadai Paneer", price: "₹180", isVeg: true },
        { name: "Chilly Paneer", price: "₹180", isVeg: true },
        { name: "Chilly Chicken", price: "₹200", isVeg: false },
        { name: "Butter Paneer Masala", price: "₹190", isVeg: true },
        { name: "Kadai Chicken", price: "₹210", isVeg: false },
        { name: "Masala Chicken", price: "₹210", isVeg: false },
        { name: "Butter Chicken Masala", price: "₹230", isVeg: false }
      ]
    },
    tandoor: {
      title: "Tandoor Specialties",
      items: [
        { name: "Paneer Tikka", price: "₹180", isVeg: true },
        { name: "Paneer Tikka Masala", price: "₹200", isVeg: true },
        { name: "Chicken Tikka", price: "₹220", isVeg: false },
        { name: "Chicken Tikka Masala", price: "₹240", isVeg: false },
        { name: "Chicken 65", price: "₹200", isVeg: false },
        { name: "Tandoori Chicken (Full)", price: "₹450", isVeg: false },
        { name: "Tandoori Chicken (Half)", price: "₹250", isVeg: false },
        { name: "Tandoori Chicken (Quarter)", price: "₹140", isVeg: false }
      ]
    },
    chinese: {
      title: "Chinese",
      items: [
        { name: "Veg Fried Rice", price: "₹120", isVeg: true },
        { name: "Chicken Fried Rice", price: "₹150", isVeg: false },
        { name: "Egg Fried Rice", price: "₹130", isVeg: false },
        { name: "Schezwan Veg Fried Rice", price: "₹140", isVeg: true },
        { name: "Schezwan Chicken Rice", price: "₹170", isVeg: false },
        { name: "Chicken Noodles", price: "₹150", isVeg: false },
        { name: "Schezwan Veg Noodles", price: "₹140", isVeg: true },
        { name: "Schezwan Chicken Noodles", price: "₹170", isVeg: false },
        { name: "Egg Noodles", price: "₹130", isVeg: false }
      ]
    },
    dosa: {
      title: "Dosa",
      items: [
        { name: "Plain Dosa", price: "₹70", isVeg: true },
        { name: "Ghee Dosa", price: "₹90", isVeg: true },
        { name: "Onion Dosa", price: "₹90", isVeg: true },
        { name: "Masala Dosa", price: "₹100", isVeg: true }
      ]
    },
    paratha: {
      title: "Kothu Paratha",
      items: [
        { name: "Veg Kothu Paratha", price: "₹120", isVeg: true },
        { name: "Chicken Kothu Paratha", price: "₹150", isVeg: false }
      ]
    },
    breads: {
      title: "Breads",
      items: [
        { name: "Plain Roti", price: "₹15", isVeg: true },
        { name: "Butter Roti", price: "₹20", isVeg: true },
        { name: "Plain Naan", price: "₹30", isVeg: true },
        { name: "Butter Naan", price: "₹40", isVeg: true },
        { name: "Garlic Naan", price: "₹45", isVeg: true },
        { name: "Butter Kulcha", price: "₹45", isVeg: true }
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
    const filteredItems = section.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm)
    );
    
    if (filteredItems.length > 0) {
      acc[key] = {
        ...section,
        items: filteredItems
      };
    }
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6">CRCL Cafe</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {Object.entries(searchTerm ? filteredMenu : menu).map(([key, section]) => (
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

      {/* Mobile Menu with Search */}
      <MobileMenu 
        sections={Object.values(menu).map(section => section.title)}
        onSectionClick={scrollToSection}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default CRCL; 