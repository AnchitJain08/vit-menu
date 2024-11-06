import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UnderBelly from './UnderBelly';
import Mayuri from './Mayuri';
import CRCL from './CRCL';
import HostelMess from './HostelMess';
import About from './About';
import Terms from './Terms';
import Privacy from './Privacy';
import Contact from './Contact';
import { VegModeProvider } from '../context/VegModeContext';
import VegModeToggle from './VegModeToggle';
import { UserPreferencesProvider } from '../context/UserPreferencesContext';
import CafeReviews from './CafeReviews';

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <UserPreferencesProvider>
        <VegModeProvider>
          <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} isMobile={isMobile} />
            <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
              <VegModeToggle />
              <main className="bg-gray-50 min-h-screen">
                <div className={`container mx-auto px-4 transition-all duration-300 
                               ${isExpanded ? 'max-w-[2000px]' : 'max-w-[2200px]'}`}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/underbelly" replace />} />
                    <Route path="/underbelly" element={<UnderBelly />} />
                    <Route path="/mayuri" element={<Mayuri />} />
                    <Route path="/crcl" element={<CRCL />} />
                    <Route path="/hostel-mess" element={<HostelMess />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route 
                      path="/underbelly/reviews" 
                      element={
                        <CafeReviews 
                          restaurantName="Under Belly Cafe" 
                          restaurantPath="/underbelly"
                        />
                      } 
                    />
                    <Route 
                      path="/mayuri/reviews" 
                      element={
                        <CafeReviews 
                          restaurantName="Mayuri Restaurant" 
                          restaurantPath="/mayuri"
                        />
                      } 
                    />
                    <Route 
                      path="/crcl/reviews" 
                      element={
                        <CafeReviews 
                          restaurantName="CRCL Cafe" 
                          restaurantPath="/crcl"
                        />
                      } 
                    />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </VegModeProvider>
      </UserPreferencesProvider>
    </Router>
  );
};

export default Dashboard;