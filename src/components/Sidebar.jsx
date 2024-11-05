import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isExpanded, setIsExpanded, isMobile }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-700' : '';
  };

  const menuItems = [
    {
      section: "Dashboard",
      items: [
        {
          path: "/analytics",
          name: "Analytics",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )
        }
      ]
    },
    {
      section: "Campus Cafes",
      items: [
        {
          path: "/underbelly",
          name: "Under Belly",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M3 10V8a2 2 0 012-2h14a2 2 0 012 2v2M3 10v6a2 2 0 002 2h14a2 2 0 002-2v-6M3 10l9 3l9-3" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M12 13v6M8 15.5l4-1.5M16 15.5l-4-1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M7.5 8.5l*.5-.5M12 8.5l*.5-.5M16.5 8.5l*.5-.5" />
            </svg>
          )
        },
        {
          path: "/mayuri",
          name: "Mayuri",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M15 11h.01M9 11h.01" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M8 13s1.5 2 4 2 4-2 4-2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M12 17v.01" />
            </svg>
          )
        },
        {
          path: "/crcl",
          name: "CRCL",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M12 10v4M10 12h4" />
            </svg>
          )
        }
      ]
    },
    {
      section: "Hostel",
      items: [
        {
          path: "/hostel-mess",
          name: "Hostel Mess Menu",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M3 6h18M3 12h18M3 18h18" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M5 15V9M12 15V9M19 15V9" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
            </svg>
          )
        }
      ]
    }
  ];

  const footerLinks = [
    { path: "/about", name: "About Us" },
    { path: "/terms", name: "Terms & Conditions" },
    { path: "/privacy", name: "Privacy Policy" },
    { path: "/contact", name: "Contact Us" }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isExpanded ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out z-40
          ${isExpanded ? 'w-64' : 'w-20'} 
          ${isMobile && !isExpanded ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 h-16">
            <h1 className={`font-bold text-xl whitespace-nowrap transition-opacity duration-300
                          ${isExpanded ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
              VIT Bhopal Menu
            </h1>
            {!isMobile && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-lg hover:bg-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d={isExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            {menuItems.map((section, idx) => (
              <div key={idx} className="px-2 py-2">
                <div className={`text-gray-400 text-sm mb-2 transition-opacity duration-300 px-4
                              ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                  {section.section}
                </div>
                {section.items.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center mb-1 rounded-lg transition-all duration-200
                      hover:bg-gray-700 ${isActive(item.path)}
                      h-[44px] mx-2
                    `}
                  >
                    <div className={`
                      flex items-center justify-center
                      min-w-[44px] h-[44px]
                      ${isExpanded ? 'pl-2' : 'w-full'}
                    `}>
                      <div className="w-6 h-6">
                        {item.icon}
                      </div>
                    </div>
                    <span className={`transition-all duration-300 whitespace-nowrap
                                   ${isExpanded ? 'opacity-100 ml-2' : 'opacity-0 w-0 hidden'}`}>
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          {/* Footer Links */}
          <div className={`border-t border-gray-700 py-4 px-2 ${isExpanded ? '' : 'hidden'}`}>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200 px-2 py-1 rounded"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default Sidebar;