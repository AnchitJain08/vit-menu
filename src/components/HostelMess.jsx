import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoRestaurantOutline } from 'react-icons/io5';
import MobileMenu from './MobileMenu';

const hostelMenu = {
  monday: {
    breakfast: {
      title: "BREAKFAST",
      time: "7:30-9:00",
      items: [
        "IDLY",
        "SAMBAR, CHUTNEY",
        "MIDHU VADA/MASALA VADA",
        "BANANA / CUT FRUIT",
        "BREAD, BUTTER JAM",
        "MILK, TEA, COFEE"
      ]
    },
    lunch: {
      title: "LUNCH",
      time: "12:30-2:30",
      items: [
        "RICE",
        "ROTI",
        "FRYUMS",
        "VEGETABLE KHICHDI/LEMON",
        "CHANNA DAL",
        "BUTTER MILK"
      ]
    },
    snacks: {
      title: "SNACKS",
      time: "5:00-6:30",
      items: [
        "KACHORI/NOODLES",
        "SAUCE/CHUTNEY",
        "TEA / COFEE / MILK"
      ]
    },
    dinner: {
      title: "DINNER",
      time: "7:30-9:00",
      items: [
        "ROTI",
        "RICE",
        "BHINDI DO PIYAZA",
        "DAL FRY"
      ]
    }
  },
  tuesday: {
    breakfast: {
      title: "BREAKFAST",
      time: "7:30-9:00",
      items: [
        "POORI",
        "BHAJI",
        "BANANA / CUT FRUIT",
        "BREAD, BUTTER JAM",
        "MILK, TEA, COFEE"
      ]
    },
    lunch: {
      title: "LUNCH",
      time: "12:30-2:30",
      items: [
        "GHEE RICE",
        "ROTI",
        "SALAD",
        "RAJMA",
        "GHEE RICE",
        "CURD/JUICE"
      ]
    },
    snacks: {
      title: "SNACKS",
      time: "5:00-6:30",
      items: [
        "PANI POORI",
        "SAUCE/CHUTNEY",
        "TEA / COFEE / MILK"
      ]
    },
    dinner: {
      title: "DINNER",
      time: "7:30-9:00",
      items: [
        "ROTI",
        "RICE",
        "KUSKA",
        "MASALA DAL",
        "FRUIT",
        "CUSTARD/HALWA"
      ]
    }
  },
  wednesday: {
    breakfast: {
      title: "BREAKFAST",
      time: "7:30-9:00",
      items: [
        "ONION VEG UTHAPPAM",
        "SAMBAR",
        "CHUTNEY",
        "BANANA / CUT FRUIT",
        "BREAD, BUTTER JAM",
        "MILK, TEA, COFEE"
      ]
    },
    lunch: {
      title: "LUNCH",
      time: "12:30-2:30",
      items: [
        "RICE",
        "ROTI",
        "SALAD",
        "Jeera Aalu",
        "MIX DAL",
        "PAYASAM /BOONDI",
        "VEG RAITA"
      ]
    },
    snacks: {
      title: "SNACKS",
      time: "5:00-6:30",
      items: [
        "SAMOSA/GHANA SUNDAL",
        "SAUCE/CHUTNEY",
        "TEA / COFEE / MILK"
      ]
    },
    dinner: {
      title: "DINNER",
      time: "7:30-9:00",
      items: [
        "ROTI",
        "RICE",
        "PLAIN DAL",
        "PANEER MASALA"
      ]
    }
  },
  thursday: {
    breakfast: {
      title: "BREAKFAST",
      time: "7:30-9:00",
      items: [
        "POHA",
        "JALEBI",
        "BANANA / CUT FRUIT",
        "BREAD, BUTTER JAM",
        "MILK, TEA, COFEE"
      ]
    },
    lunch: {
      title: "LUNCH",
      time: "12:30-2:30",
      items: [
        "VEG PULAO",
        "ROTI",
        "VEG KOFTA",
        "TOMATO DAL",
        "VEG PULAO",
        "PLAIN RICE",
        "CURD/JUICE"
      ]
    },
    snacks: {
      title: "SNACKS",
      time: "5:00-6:30",
      items: [
        "SWEET CORN",
        "SALAD/BURGER",
        "SAUCE/CHUTNEY",
        "TEA / COFEE / MILK"
      ]
    },
    dinner: {
      title: "DINNER",
      time: "7:30-9:00",
      items: [
        "ROTI",
        "RICE",
        "SOUP",
        "ALOO PANEER KOFTA",
        "DAL FRY"
      ]
    }
  },
  friday: {
    breakfast: {
      title: "BREAKFAST",
      time: "7:30-9:00",
      items: [
        "BHATURA",
        "CHOLE MASALA",
        "BANANA / CUT FRUIT",
        "BREAD, BUTTER JAM",
        "MILK, TEA, COFEE"
      ]
    },
    lunch: {
      title: "LUNCH",
      time: "12:30-2:30",
      items: [
        "VEG BIRYANI",
        "ROTI",
        "MASOOR DAL",
        "BRINJAL MASALA/DUM ALOO",
        "BOONDI RAITHA"
      ]
    },
    snacks: {
      title: "SNACKS",
      time: "5:00-6:30",
      items: [
        "VADA PAV",
        "SAUCE/CHUTNEY",
        "TEA / COFEE / MILK"
      ]
    },
    dinner: {
      title: "DINNER",
      time: "7:30-9:00",
      items: [
        "ROTI",
        "RICE",
        "DAL TADKA",
        "CHILLI PANEER"
      ]
    }
  },
  saturday: {
    breakfast: {
      title: "BREAKFAST",
      time: "7:30-9:00",
      items: [
        "RAVA UPMA / PAV BHAJI",
        "CHUTNEY",
        "BANANA / CUT FRUIT",
        "BREAD, BUTTER JAM",
        "MILK, TEA, COFEE"
      ]
    },
    lunch: {
      title: "LUNCH",
      time: "12:30-2:30",
      items: [
        "JEERA RICE",
        "ROTI",
        "SALAD",
        "POORI",
        "CHOLE MASALA",
        "BUTTER MILK"
      ]
    },
    snacks: {
      title: "SNACKS",
      time: "5:00-6:30",
      items: [
        "CUTLET/DAVELI",
        "SAUCE/CHUTNEY",
        "TEA / COFEE / MILK"
      ]
    },
    dinner: {
      title: "DINNER",
      time: "7:30-9:00",
      items: [
        "ROTI",
        "WHITE RICE",
        "DAL FRY",
        "FRIED RICE",
        "VEJ MANCHURIAN/ALOO SOYA DRY"
      ]
    }
  },
  sunday: {
    breakfast: {
      title: "BREAKFAST",
      time: "7:30-9:00",
      items: [
        "MASALA DOSA",
        "SAMBAR, CHUTNEY",
        "BANANA / CUT FRUIT",
        "BREAD, BUTTER JAM",
        "MILK, TEA, COFEE"
      ]
    },
    lunch: {
      title: "LUNCH",
      time: "12:30-2:30",
      items: [
        "VEG BIRYANI",
        "ROTI",
        "MASALA DAL/MUTTER PANEER",
        "JUICE",
        "ONION CUCUMBER RAITHA"
      ]
    },
    snacks: {
      title: "SNACKS",
      time: "5:00-6:30",
      items: [
        "DHOKALA / PASTA",
        "SAUCE/CHUTNEY",
        "TEA / COFEE / MILK"
      ]
    },
    dinner: {
      title: "DINNER",
      time: "7:30-9:00",
      items: [
        "ROTI",
        "RICE",
        "Mix veg",
        "MASOOR DHALLI/SOYA MASALA",
        "GULAB JAMUN/PINEAPLE HALWA"
      ]
    }
  }
};

// Add this helper function for short day names
const getShortDayName = (day) => {
  const shortNames = {
    'monday': 'Mon',
    'tuesday': 'Tue',
    'wednesday': 'Wed',
    'thursday': 'Thu',
    'friday': 'Fri',
    'saturday': 'Sat',
    'sunday': 'Sun'
  };
  return shortNames[day] || day;
};

const HostelMess = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get current day and time
    const now = new Date();
    const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const currentHour = now.getHours();

    // Map days to state values
    const dayMap = {
      0: 'sunday',
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday'
    };

    setSelectedDay(dayMap[currentDay]);

    // Determine meal time section
    let mealSection = '';
    if (currentHour >= 4 && currentHour < 10) {
      mealSection = 'breakfast';
    } else if (currentHour >= 10 && currentHour < 15) {
      mealSection = 'lunch';
    } else if (currentHour >= 15 && currentHour < 18) {
      mealSection = 'snacks';
    } else {
      mealSection = 'dinner';
    }

    // Scroll to current meal after a short delay
    setTimeout(() => {
      const element = document.getElementById(mealSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionTitle) => {
    const element = document.getElementById(sectionTitle.toLowerCase());
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Add search functionality
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Filter menu sections based on search
  const getFilteredMenu = () => {
    if (!searchTerm) return hostelMenu[selectedDay];

    const filteredSections = {};
    Object.entries(hostelMenu[selectedDay]).forEach(([mealTime, meal]) => {
      const filteredItems = meal.items.filter(item => 
        item.toLowerCase().includes(searchTerm)
      );
      if (filteredItems.length > 0) {
        filteredSections[mealTime] = {
          ...meal,
          items: filteredItems
        };
      }
    });
    return filteredSections;
  };

  const filteredMenu = getFilteredMenu();
  const hasResults = Object.keys(filteredMenu).length > 0;

  return (
    <div className="p-0 bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 right-0 left-0 bg-gray-100 z-50 border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className={`text-base font-medium text-gray-900 transition-opacity duration-300
                       ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
            Hostel Mess Menu
          </h2>
        </div>

        {/* Day Selection Tabs - More compact on mobile */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200/50">
          <div className="flex-none px-2 md:px-4 min-w-[500px] md:min-w-[768px] mx-auto">
            {Object.keys(hostelMenu).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 md:px-6 py-2 text-sm font-medium transition-colors relative
                         ${selectedDay === day 
                           ? 'text-gray-900' 
                           : 'text-gray-600 hover:text-gray-900'}`}
              >
                <span className="md:hidden">{getShortDayName(day)}</span>
                <span className="hidden md:inline">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                {selectedDay === day && (
                  <motion.div 
                    layoutId="activeDay"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Reduced spacing */}
      <div className="pt-5 px-4 md:pt-20 md:px-6 max-w-5xl mx-auto">
        {/* Title Section - Hidden on mobile when scrolled */}
        <div className="space-y-1 mb-3">
          <h1 className={`text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight 
                       font-[system-ui] transition-opacity duration-300 pl-2 md:pl-0
                       ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
            Hostel Mess Menu
          </h1>
        </div>

        {/* Menu Sections - Responsive grid based on screen width */}
        <div className="grid grid-cols-1 gap-2 md:gap-3">
          {hasResults ? (
            <div className={`grid gap-2 md:gap-3
                   grid-cols-1                    // Single column on mobile
                   min-[640px]:grid-cols-2        // 2x2 grid for tablets
                   lg:grid-cols-4                 // 4x1 grid for large screens
                   w-full min-[640px]:max-w-[768px] lg:max-w-[1200px] // Full width on mobile, max-width for larger screens
                   mx-auto                        // Center the grid
                   `}>
              {Object.entries(filteredMenu).map(([mealTime, meal]) => (
                <div key={mealTime} id={mealTime} className="flex flex-col">
                  <div className="flex items-center justify-between mb-2 px-2">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{meal.title}</h3>
                    <span className="text-xs md:text-sm text-gray-600">{meal.time}</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg overflow-hidden flex-1">
                    <div className="p-2 md:p-3 space-y-0.5 md:space-y-1">
                      {meal.items.map((item, index) => (
                        <div key={index} className="p-1.5 md:p-2 hover:bg-gray-200/50 rounded transition-all duration-200 px-3">
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
              <div className="text-gray-500 text-center">
                <p className="text-lg font-medium mb-2">No items found</p>
                <p className="text-sm">Try searching for something else</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Bar - Only show on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200/50 z-40">
        <div className="flex items-center gap-3 px-4 py-2">
          {/* Search Bar - Full width with padding for menu button */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-9 px-4 bg-white border border-gray-300 rounded-lg
                       text-gray-700 text-sm focus:outline-none"
            />
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="h-9 w-24 flex items-center justify-center gap-2 bg-white 
                     border border-gray-300 rounded-lg text-gray-700 text-sm shrink-0"
          >
            <span>Menu</span>
            <IoRestaurantOutline className="w-4 h-4" />
          </button>
        </div>
        
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>

      {/* Bottom spacer - Only show on mobile */}
      <div className="md:hidden h-[calc(3.5rem+env(safe-area-inset-bottom,0px))]" />

      {/* Menu Modal */}
      <MobileMenu 
        sections={['Breakfast', 'Lunch', 'Snacks', 'Dinner']}
        onSectionClick={scrollToSection}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default HostelMess;