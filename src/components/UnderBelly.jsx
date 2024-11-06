import React, { useState } from 'react';
import { FaPizzaSlice, FaCoffee, FaGlassWhiskey, FaStar } from 'react-icons/fa';
import { 
  GiNoodles, 
  GiBreadSlice, 
  GiCakeSlice, 
  GiSandwich, 
  GiHotMeal,
  GiChickenLeg,
  GiRawEgg,
  GiTacos,
  GiDumpling,
  GiCook
} from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import MobileMenu from './MobileMenu';
import { useVegMode } from '../context/VegModeContext';
import { getCafeData } from '../utils/cafeData';
import { useNavigate } from 'react-router-dom';

const UnderBelly = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isVegMode } = useVegMode();
  const navigate = useNavigate();
  const cafeData = getCafeData("Under Belly Cafe");

  const getIconForSection = (key) => ({
    rolls: <GiBreadSlice className="w-6 h-6" />,
    chinese: <GiNoodles className="w-6 h-6" />,
    hotBeverages: <FaCoffee className="w-6 h-6" />,
    milkshakes: <FaGlassWhiskey className="w-6 h-6" />,
    freshJuices: <BiDrink className="w-6 h-6" />,
    pizza: <FaPizzaSlice className="w-6 h-6" />,
    pastry: <GiCakeSlice className="w-6 h-6" />,
    southIndian: <GiNoodles className="w-6 h-6" />,
    sandwiches: <GiSandwich className="w-6 h-6" />,
    nonVegStarters: <GiChickenLeg className="w-6 h-6" />,
    eggVarieties: <GiRawEgg className="w-6 h-6" />,
    momos: <GiDumpling className="w-6 h-6" />,
    nachos: <GiTacos className="w-6 h-6" />,
    vegPasta: <GiNoodles className="w-6 h-6" />,
    nonVegPasta: <GiNoodles className="w-6 h-6" />
  }[key] || null);

  const menu = {
    sandwiches: {
      title: "SANDWICHES & BURGERS",
      items: [
        { 
          name: "DOUBLE CHEESE SANDWICH", 
          price: "₹89", 
          withFries: "₹137",
          isVeg: true 
        },
        { 
          name: "SWEET CORN SANDWICH", 
          price: "₹89", 
          withFries: "₹126",
          isVeg: true 
        },
        { 
          name: "PANEER TIKKA SANDWICH", 
          price: "₹100", 
          withFries: "₹152",
          isVeg: true 
        },
        { 
          name: "CHICKEN TIKKA SANDWICH", 
          price: "₹121", 
          withFries: "₹163",
          isVeg: false 
        },
        { 
          name: "MUSHROOM CHEESE SANDWICH", 
          price: "₹100", 
          withFries: "₹152",
          isVeg: true 
        },
        { 
          name: "CLASSIC CHICKEN CLUB SANDWICH", 
          price: "₹121", 
          withFries: "₹152",
          isVeg: false 
        },
        { 
          name: "CHEESE MAYO GRILLED CHICKEN SANDWICH", 
          price: "₹110", 
          withFries: "₹152",
          isVeg: false 
        },
        { 
          name: "BOMBAY GRILLED SANDWICH", 
          price: "₹68", 
          withFries: "₹137",
          isVeg: true 
        },
        { 
          name: "VEG CHEESE BURGER", 
          price: "₹95", 
          withFries: "₹152",
          isVeg: true 
        },
        { 
          name: "CHICKEN BURGER", 
          price: "₹116", 
          withFries: "₹163",
          isVeg: false 
        },
        { 
          name: "VEG WRAP", 
          price: "₹95", 
          withFries: "₹147",
          isVeg: true 
        },
        { 
          name: "CHICKEN WRAP", 
          price: "₹121", 
          withFries: "₹158",
          isVeg: false 
        },
        { 
          name: "PANEER WRAP", 
          price: "₹100", 
          withFries: "₹152",
          isVeg: true 
        }
      ]
    },
    nonVegStarters: {
      title: "NON VEG STARTERS",
      items: [
        { name: "CHICKEN NUGGETS", price: "₹152", isVeg: false },
        { name: "CHICKEN WINGS", price: "₹152", isVeg: false },
        { name: "CHICKEN TIKKA", price: "₹168", isVeg: false },
        { name: "CHICKEN MALAI TIKKA", price: "₹168", isVeg: false },
        { name: "TANDOORI CHICKEN HALF", price: "₹210", isVeg: false },
        { name: "TANDOORI CHICKEN FULL", price: "₹399", isVeg: false },
        { name: "CHILLY CHICKEN DRY", price: "₹140", isVeg: false },
        { name: "CHILLY CHICKEN GRAVY", price: "₹150", isVeg: false },
        { name: "DRAGON CHICKEN", price: "₹152", isVeg: false },
        { name: "CHICKEN 65", price: "₹152", isVeg: false }
      ]
    },
    southIndian: {
      title: "SOUTH INDIAN",
      items: [
        { name: "MASALA DOSA", price: "₹80", isVeg: true },
        { name: "BUTTER MASALA DOSA", price: "₹90", isVeg: true },
        { name: "PLAIN DOSA", price: "₹70", isVeg: true },
        { name: "GHEE DOSA", price: "₹79", isVeg: true },
        { name: "BUTTER DOSA", price: "₹80", isVeg: true },
        { name: "CHILLY GARLIC PANEER DOSA", price: "₹116", isVeg: true },
        { name: "GHEE SAMBAR IDLY (3)", price: "₹60", isVeg: true },
        { name: "PAPER MASALA DOSA", price: "₹70", isVeg: true },
        { name: "PANEER KHEEMA DOSA", price: "₹105", isVeg: true },
        { name: "CHEESE MASALA DOSA", price: "₹100", isVeg: true },
        { name: "CHILLY CHEESE GARLIC DOSA", price: "₹130", isVeg: true },
        { name: "ONION CHEESE MASALA DOSA", price: "₹100", isVeg: true }
      ]
    },
    momos: {
      title: "MOMOS",
      items: [
        { name: "VEG MOMOS", price: "₹105", isVeg: true },
        { name: "PANEER MOMOS", price: "₹126", isVeg: true },
        { name: "CHICKEN MOMOS", price: "₹137", isVeg: false }
      ]
    },
    vegPasta: {
      title: "VEG PASTA",
      items: [
        { 
          name: "PENNE ALFREDO PASTA", 
          price: "₹105",
          large: "₹168", 
          isVeg: true 
        },
        { 
          name: "PENNE ARABIATA", 
          price: "₹105",
          large: "₹168", 
          isVeg: true 
        },
        { 
          name: "PINK SAUCE PASTA", 
          price: "₹105",
          large: "₹168", 
          isVeg: true 
        },
        { 
          name: "BASIL SAUCE PASTA", 
          price: "₹105",
          large: "₹168", 
          isVeg: true 
        }
      ]
    },
    nonVegPasta: {
      title: "NON VEG PASTA",
      items: [
        { 
          name: "PENNE ALFREDO CHICKEN", 
          price: "₹127",
          large: "₹179", 
          isVeg: false 
        },
        { 
          name: "PENNE ARABIATA CHICKEN", 
          price: "₹127",
          large: "₹179", 
          isVeg: false 
        },
        { 
          name: "PINK SAUCE CHICKEN PASTA", 
          price: "₹127",
          large: "₹179", 
          isVeg: false 
        },
        { 
          name: "BASIL SAUCE CHICKEN PASTA", 
          price: "₹127",
          large: "₹179", 
          isVeg: false 
        }
      ]
    },
    eggVarieties: {
      title: "EGG VARIETIES",
      items: [
        { name: "BREAD OMELETTE", price: "₹63", isVeg: false },
        { name: "MASALA OMELETTE", price: "₹37", isVeg: false },
        { name: "CHEESE OMELETTE", price: "₹53", isVeg: false },
        { name: "EGG BHURJI", price: "₹37", isVeg: false }
      ]
    },
    nachos: {
      title: "NACHOS",
      items: [
        { name: "VEG MIXED NACHOS", price: "₹100", isVeg: true },
        { name: "CHICKEN NACHOS", price: "₹121", isVeg: false }
      ]
    },
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
    }
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

  const allMenuItems = Object.values(menu).reduce((items, section) => {
    return [...items, ...section.items];
  }, []);

  const handleReviewClick = () => {
    navigate('/underbelly/reviews', { 
      state: { menuItems: allMenuItems }
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold">Under Belly Cafe</h2>
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
              {/* Price Column Headers */}
              {(section.title === "SANDWICHES & BURGERS" || 
                section.title === "VEG PASTA" || 
                section.title === "NON VEG PASTA") && (
                <div className="grid grid-cols-[1fr,auto,auto] gap-4 pb-2 border-b text-xs text-gray-500">
                  <div>Item</div>
                  <div className="text-right px-2">
                    {section.title === "SANDWICHES & BURGERS" ? "Without Fries" : "Small"}
                  </div>
                  <div className="text-right px-2">
                    {section.title === "SANDWICHES & BURGERS" ? "With Fries" : "Large"}
                  </div>
                </div>
              )}

              {/* Menu Items */}
              {section.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded hover:shadow-sm hover:scale-[1.01] transition-all duration-200">
                  <span className="font-medium text-sm md:text-base flex items-center flex-1">
                    <span className={`w-2 h-2 rounded-full mr-2 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}/>
                    {item.name}
                  </span>
                  {(item.withFries || item.large) ? (
                    <div className="grid grid-cols-2 gap-4 text-right">
                      <span className="text-gray-700 text-sm md:text-base">{item.price}</span>
                      <span className="text-gray-700 text-sm md:text-base">
                        {item.withFries || item.large}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-700 text-sm md:text-base">{item.price}</span>
                  )}
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

export default UnderBelly;