import React from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "./SidebarContext"; // Import context hook

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, isMobile } = useSidebar(); // Use global sidebar state

  return (
    <div className={`sidebar p-3 border position-relative ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`} style={{ width: "230px", color: "rgb(76, 72, 136)" }}>
      <div className="d-flex justify-content-center align-items-center">
        {isMobile && (
          <button 
            className="btn m-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ backgroundColor: "rgb(76, 72, 136)", color: "white" }}
          >
            ☰
          </button>
        )}
        <div className="d-flex align-items-center">
          <img src="/assets/img/logo1.png" height="50px"/>
          <span className="fs-4 fw-semibold ms-1" style={{color:"rgb(76, 72, 136)"}}>Xpensr</span>
          </div>
      </div>
      <ul className="nav flex-column mt-3 text-center">
        <li className="nav-item">
        <Link to="/" className="dashboardLinks nav-link text-dark my-2">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard" className="dashboardLinks nav-link text-dark my-2">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/expanse" className="dashboardLinks nav-link text-dark my-2">Expenses</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
