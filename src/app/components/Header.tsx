import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === "/Register") {
    return null;
  }
    return (
      <header style={{ textAlign: "center", padding: "20px", background: "rgb(39 37 37)" }}>
        <nav className=" shadow-gray-300 w-100 px-8 md:px-auto">
          <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
            
            <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
              <ul className="flex font-semibold justify-between">
                <li className="md:px-4 md:py-2 text-indigo-500"><a href="#">Dashboard</a></li>
                <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Search</a></li>
                <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Explore</a></li>
                <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">About</a></li>
                <li className="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="order-2 md:order-3">
              <button onClick={() => navigate("/Register")} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        <span>Register</span>
                    </button>
            </div>
          </div>
        </nav>
      </header>
      
    );
  }