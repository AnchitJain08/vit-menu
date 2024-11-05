import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const Analytics = () => {
  // Sample data - replace with real data
  const popularItems = [
    { name: 'Butter Chicken', value: 450 },
    { name: 'Pizza', value: 400 },
    { name: 'Noodles', value: 350 },
    { name: 'Biryani', value: 300 },
    { name: 'Burger', value: 250 }
  ];

  const monthlyRevenue = [
    { month: 'Jan', UnderBelly: 4000, Mayuri: 2400, CRCL: 2400 },
    { month: 'Feb', UnderBelly: 3000, Mayuri: 1398, CRCL: 2210 },
    { month: 'Mar', UnderBelly: 2000, Mayuri: 9800, CRCL: 2290 },
    { month: 'Apr', UnderBelly: 2780, Mayuri: 3908, CRCL: 2000 },
    { month: 'May', UnderBelly: 1890, Mayuri: 4800, CRCL: 2181 }
  ];

  const cafeRatings = [
    { name: 'UnderBelly', value: 85 },
    { name: 'Mayuri', value: 78 },
    { name: 'CRCL', value: 82 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1.2k</div>
              <div className="text-sm text-gray-600">Daily Orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">₹52k</div>
              <div className="text-sm text-gray-600">Daily Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">82%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Active Cafes</div>
            </div>
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Most Popular Items</h3>
          <div className="h-64">
            <BarChart width={300} height={250} data={popularItems}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>

        {/* Cafe Ratings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Cafe Ratings</h3>
          <div className="h-64">
            <PieChart width={300} height={250}>
              <Pie
                data={cafeRatings}
                cx={150}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {cafeRatings.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-full">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue Trend</h3>
          <div className="h-80">
            <LineChart
              width={1000}
              height={300}
              data={monthlyRevenue}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="UnderBelly" stroke="#8884d8" />
              <Line type="monotone" dataKey="Mayuri" stroke="#82ca9d" />
              <Line type="monotone" dataKey="CRCL" stroke="#ffc658" />
            </LineChart>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-full">
          <h3 className="text-lg font-semibold mb-4">Today's Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-semibold text-lg mb-2">UnderBelly</div>
              <ul className="list-disc list-inside text-gray-600">
                <li>Butter Chicken Pizza</li>
                <li>Schezwan Noodles</li>
                <li>Cold Coffee</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-semibold text-lg mb-2">Mayuri</div>
              <ul className="list-disc list-inside text-gray-600">
                <li>Paneer Tikka</li>
                <li>Butter Naan</li>
                <li>Fresh Lime Soda</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-semibold text-lg mb-2">CRCL</div>
              <ul className="list-disc list-inside text-gray-600">
                <li>Chicken Biryani</li>
                <li>Masala Dosa</li>
                <li>Cold Coffee</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 