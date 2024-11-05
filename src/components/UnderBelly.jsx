import React, { useState } from 'react';
import { FaPizzaSlice, FaCoffee, FaGlassWhiskey } from 'react-icons/fa';
import { GiNoodles, GiBreadSlice, GiCakeSlice } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import MobileMenu from './MobileMenu';

const UnderBelly = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getIconForSection = (key) => ({
    rolls: <GiBreadSlice className="w-6 h-6" />,
    chinese: <GiNoodles className="w-6 h-6" />,
    hotBeverages: <FaCoffee className="w-6 h-6" />,
    milkshakes: <FaGlassWhiskey className="w-6 h-6" />,
    freshJuices: <BiDrink className="w-6 h-6" />,
    pizza: <FaPizzaSlice className="w-6 h-6" />,
    pastry: <GiCakeSlice className="w-6 h-6" />
  }[key] || null);

  const menu = {
    hotBeverages: {
      title: "HOT BEVERAGES",
      items: [
        { name: "GINGER TEA", price: "₹15", isVeg: true },
        { name: "COFFEE", price: "₹15", isVeg: true },
        { name: "HOT CHOCOLATE", price: "₹40", isVeg: true },
        { name: "BLACK COFFEE", price: "₹30", isVeg: true }
      ]
    },
    milkshakes: {
      title: "MILKSHAKES",
      items: [
        { name: "BUTTERSCOTCH MILKSHAKE SMALL", price: "₹50", isVeg: true },
        { name: "VANILLA MILKSHAKE SMALL", price: "₹50", isVeg: true },
        { name: "CHOCOLATE MILKSHAKE SMALL", price: "₹50", isVeg: true },
        { name: "OREO MILKSHAKE SMALL", price: "₹60", isVeg: true },
        { name: "KITKAT MILKSHAKE SMALL", price: "₹60", isVeg: true },
        { name: "COLD COFFEE SMALL", price: "₹50", isVeg: true },
        { name: "BUTTERSCOTCH MILKSHAKE LARGE", price: "₹90", isVeg: true },
        { name: "VANILLA MILKSHAKE LARGE", price: "₹90", isVeg: true },
        { name: "CHOCOLATE MILKSHAKE LARGE", price: "₹90", isVeg: true },
        { name: "OREO MILKSHAKE LARGE", price: "₹98", isVeg: true },
        { name: "NUTELLA MILKSHAKE LARGE", price: "₹90", isVeg: true },
        { name: "KITKAT MILKSHAKE LARGE", price: "₹95", isVeg: true },
        { name: "COLD COFFEE LARGE", price: "₹80", isVeg: true }
      ]
    },
    freshJuices: {
      title: "FRESH JUICE",
      items: [
        { name: "ORANGE JUICE", price: "₹70", isVeg: true },
        { name: "SWEET LIME JUICE", price: "₹70", isVeg: true },
        { name: "PINEAPPLE JUICE", price: "₹70", isVeg: true },
        { name: "MANGO JUICE", price: "₹70", isVeg: true },
        { name: "LEMON ICE TEA LARGE", price: "₹63", isVeg: true },
        { name: "LIME MINT COOLER LARGE", price: "₹63", isVeg: true },
        { name: "LIME MINT COOLER SMALL", price: "₹42", isVeg: true },
        { name: "LEMON ICE TEA SMALL", price: "₹42", isVeg: true }
      ]
    },
    pizza: {
      title: "PIZZA",
      items: [
        { name: "SWEET CORN PIZZA", price: "₹200", isVeg: true },
        { name: "UB SPECIAL PIZZA", price: "₹200", isVeg: true },
        { name: "PANEER TIKKA PIZZA", price: "₹200", isVeg: true },
        { name: "VEG SUPREME PIZZA", price: "₹200", isVeg: true },
        { name: "CLASSIC MARGHERITA PIZZA", price: "₹200", isVeg: true },
        { name: "UB SPECIAL NON VEG PIZZA", price: "₹230", isVeg: false },
        { name: "CHICKEN TIKKA PIZZA", price: "₹230", isVeg: false },
        { name: "JALAPENO CHICKEN PIZZA", price: "₹230", isVeg: false }
      ]
    },
    chinese: {
      title: "CHINESE",
      items: [
        { name: "VEG NOODLES", price: "₹130", isVeg: true },
        { name: "VEG FRIED RICE", price: "₹130", isVeg: true },
        { name: "CHICKEN NOODLES", price: "₹142", isVeg: false },
        { name: "CHICKEN FRIED RICE", price: "₹142", isVeg: false },
        { name: "SCHEZWAN VEG NOODLES", price: "₹131", isVeg: true },
        { name: "SCHEZWAN VEG FRIED RICE", price: "₹131", isVeg: true },
        { name: "SCHEZWAN CHICKEN FRIED RICE", price: "₹152", isVeg: false },
        { name: "EGG FRIED RICE", price: "₹142", isVeg: false },
        { name: "PANEER FRIED RICE", price: "₹160", isVeg: true },
        { name: "SCHEZWAN CHICKEN NOODLES", price: "₹152", isVeg: false }
      ]
    },
    rolls: {
      title: "Rolls & Buns",
      items: [
        { name: "VEG PLAIT", price: "₹42", isVeg: true },
        { name: "VEG SUB ROLL", price: "₹42", isVeg: true },
        { name: "VEG TURNOVER", price: "₹32", isVeg: true },
        { name: "CHILLY CHEESE PLAIT", price: "₹53", isVeg: true },
        { name: "PANEER PIZZA BUN", price: "₹47", isVeg: true },
        { name: "VEG CRISPY ROLL", price: "₹42", isVeg: true },
        { name: "CHICKEN TURNOVER", price: "₹42", isVeg: false },
        { name: "CHICKEN PIZZA BUN", price: "₹53", isVeg: false },
        { name: "CHICKEN SUB ROLL", price: "₹53", isVeg: false }
      ]
    },
    pastry: {
      title: "PASTRY",
      items: [
        { name: "OREO PASTRY", price: "₹80", isVeg: true },
        { name: "KITKAT PASTRY", price: "₹80", isVeg: true },
        { name: "CHOCO TRUFFLE", price: "₹80", isVeg: true },
        { name: "BLUE BERRY", price: "₹80", isVeg: true },
        { name: "SWISS ROLL", price: "₹74", isVeg: true },
        { name: "WALNUT BROWNIE", price: "₹74", isVeg: true },
        { name: "CHOCO DOUGNUT", price: "₹42", isVeg: true },
        { name: "PINEAPPLE PASTRY", price: "₹80", isVeg: true },
        { name: "STRABERY PASTRY", price: "₹80", isVeg: true },
        { name: "REDVELVET PASTRY", price: "₹80", isVeg: true },
        { name: "BUTTERSCOTCH PASTRY", price: "₹80", isVeg: true }
      ]
    }
  };

  const filteredMenu = Object.entries(menu).reduce((acc, [key, section]) => {
    const filteredItems = section.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredItems.length > 0) {
      acc[key] = {
        ...section,
        items: filteredItems
      };
    }
    return acc;
  }, {});

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

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Under Belly Cafe</h2>
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

export default UnderBelly; 