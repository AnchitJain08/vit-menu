import React, { useState } from 'react';

const HostelMess = () => {
  const [selectedDay, setSelectedDay] = useState("MON");
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const daysMap = {
    "MON": 0, "TUE": 1, "WED": 2, "THU": 3, "FRI": 4, "SAT": 5, "SUN": 6
  };

  const meals = [
    {
      title: "BREAKFAST",
      time: "7:30-9:00",
      items: [
        ["IDLY", "POORI", "ONION VEG UTHAPPAM", "POHA", "BHATURA", "RAVA UPMA / PAV BHAJI", "MASALA DOSA"],
        ["SAMBAR, CHUTNEY", "BHAJI", "SAMBAR", "JALEBI", "CHOLE MASALA", "CHUTNEY", "SAMBAR, CHUTNEY"],
        ["MIDHU VADA/MASALA VADA", "", "CHUTNEY", "", "", "", ""],
        ["BANANA / CUT FRUIT", "BANANA / CUT FRUIT", "BANANA / CUT FRUIT", "BANANA / CUT FRUIT", "BANANA / CUT FRUIT", "BANANA / CUT FRUIT", "BANANA / CUT FRUIT"],
        ["BREAD, BUTTER JAM", "BREAD, BUTTER JAM", "BREAD, BUTTER JAM", "BREAD, BUTTER JAM", "BREAD, BUTTER JAM", "BREAD, BUTTER JAM", "BREAD, BUTTER JAM"],
        ["MILK, TEA, COFEE", "MILK, TEA, COFEE", "MILK, TEA, COFEE", "MILK, TEA, COFEE", "MILK, TEA, COFEE", "MILK, TEA, COFEE", "MILK, TEA, COFEE"]
      ]
    },
    {
      title: "LUNCH",
      time: "12:30-2:30",
      items: [
        ["RICE", "GHEE RICE", "RICE", "VEG PULAO", "VEG BIRYANI", "JEERA RICE", "VEG BIRIYANI"],
        ["ROTI", "ROTI", "ROTI", "ROTI", "ROTI", "ROTI", "ROTI"],
        ["FRYUMS", "SALAD", "SALAD", "VEG KOFTA", "MASOOR DAL", "SALAD", "MASALA DAL/MUTTER PANEER"],
        ["VEGETABLE KHICHDI/LEMON", "RAJMA", "Jeera Aalu", "TOMATO DAL", "BRINJAL MASALA/DUM ALOO", "POORI", ""],
        ["CHANNA DAL", "GHEE RICE", "MIX DAL", "VEG PULAO", "", "CHOLE MASALA", ""],
        ["BUTTER MILK", "CURD/JUICE", "PAYASAM /BOONDI", "PLAIN RICE", "", "", "JUICE"],
        ["", "", "VEG RAITA", "CURD/JUICE", "BOONDI RAITHA", "BUTTER MILK", "ONION CUCUMBER RAITHA"]
      ]
    },
    {
      title: "SNACKS",
      time: "5:00-6:30",
      items: [
        ["KACHORI/ NOODILES", "PANI POORI", "SAMOSA/ CHANA SUNDAL", "SWEET CORN SALAD/BURGER", "VADA PAV", "CUTLET/ DAVELI", "DHOKALA / PASTA"],
        ["SAUCE/CHUTNEY", "SAUCE/CHUTNEY", "SAUCE/CHUTNEY", "SAUCE/CHUTNEY", "SAUCE/CHUTNEY", "SAUCE/CHUTNEY", "SAUCE/CHUTNEY"],
        ["TEA / COFEE / MILK", "TEA / COFEE / MILK", "TEA / COFEE / MILK", "TEA / COFEE / MILK", "TEA / COFEE / MILK", "TEA / COFEE / MILK", "TEA / COFEE / MILK"]
      ]
    },
    {
      title: "DINNER",
      time: "7:30-9:00",
      items: [
        ["ROTI", "ROTI", "ROTI", "ROTI", "ROTI", "ROTI", "ROTI"],
        ["RICE", "RICE", "RICE", "RICE", "RICE", "WHITE RICE", "RICE"],
        ["BHINDI DO PIYAZA", "KUSKA", "PLAIN DAL", "SOUP", "DAL TADKA", "DAL FRY", "Mix veg"],
        ["DAL FRY", "MASALA DAL", "PANEER MASALA", "ALOO PANEER KOFTA", "CHILLI PANEER", "FRIED RICE", "MASOOR DHALL/SOYA MASALA"],
        ["", "FRUIT CUSTARD/HALWA", "", "DAL FRY", "", "VEJ MANCHURIAN/ ALOO SOYA DRY", "GULAB JAMUN/ PINEAPLE HALWA"]
      ]
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Hostel Mess Menu</h2>
      
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex mb-6 bg-white rounded-lg shadow-md p-1 overflow-x-auto">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`
                flex-1 min-w-[80px] py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${selectedDay === day 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {meals.map((meal, mealIndex) => (
            <div key={mealIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-3">
                <div className="text-lg font-semibold">{meal.title}</div>
                <div className="text-sm text-gray-300">{meal.time}</div>
              </div>
              <div className="p-4 space-y-2">
                {meal.items.map((row, rowIndex) => (
                  row[daysMap[selectedDay]] && (
                    <div key={rowIndex} className="text-sm text-gray-600 py-2 px-3 hover:bg-gray-50 rounded">
                      {row[daysMap[selectedDay]]}
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="w-32 px-4 py-2 text-left font-medium text-gray-600"></th>
                {days.map(day => (
                  <th key={day} className="px-4 py-3 text-center font-medium text-gray-600 bg-gray-50">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {meals.map((meal, mealIndex) => (
                <React.Fragment key={mealIndex}>
                  <tr>
                    <td className="bg-gray-800 text-white px-4 py-3">
                      <div className="text-lg font-semibold">{meal.title}</div>
                      <div className="text-sm opacity-90">{meal.time}</div>
                    </td>
                    {days.map((_, dayIndex) => (
                      <td key={dayIndex} className="px-4 py-3 text-sm text-gray-600 align-top hover:bg-gray-50 transition-colors duration-150">
                        {meal.items.map((row, rowIndex) => (
                          <div key={rowIndex} className="mb-2 last:mb-0">
                            {row[dayIndex]}
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>
                  {mealIndex < meals.length - 1 && (
                    <tr>
                      <td colSpan={8} className="h-2 bg-gray-50"></td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HostelMess;