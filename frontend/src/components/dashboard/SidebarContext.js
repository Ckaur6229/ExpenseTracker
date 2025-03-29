import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const SidebarContext = createContext();

// Context Provider Component
export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      setSidebarOpen(!mobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom Hook to use SidebarContext
export const useSidebar = () => useContext(SidebarContext);
