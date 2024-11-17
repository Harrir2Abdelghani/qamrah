import React, { useState } from 'react';
import { FaHome, FaUsers, FaShoppingBag, FaCog } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import {Link} from 'react-router-dom'
import { PiDresserFill } from "react-icons/pi";
import { IoBagAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // true for larger screens (>=768px), false for smaller screens

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Listen to window resize event to adjust sidebar open state for responsive behavior
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && !isOpen) {
      setIsOpen(true); // Expand sidebar on larger screens
    } else if (window.innerWidth < 768 && isOpen) {
      setIsOpen(false); // Collapse sidebar on mobile
    }
  });

  return (
    <div className={`flex ${isOpen ? 'w-64' : 'w-20'} h-screen bg-rose-50 transition-all duration-300`}>
      <div className="flex flex-col justify-between w-full h-full">
        {/* Top Section */}
        <div>
          {/* Logo and Close Button */}
          <div className="flex items-center justify-between p-4">
            {isOpen && <h1 className="text-2xl font-bold text-black">Qamrah</h1>}
            <button onClick={toggleSidebar} className="text-black">
              {isOpen ? (
                <MdClose size={24} /> // Close button for large devices
              ) : (
                <FaCog size={24} /> // Cog icon for small devices
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-4">
            <ul>
              <Link to='/' >
              <li className="flex items-center">
                <button className="flex items-center w-full text-left text-black p-4 hover:bg-rose-gold transition-all">
                  <FaHome size={24} className="mr-3" />
                  {isOpen && <span>Dashboard</span>}
                </button>
              </li>
              </Link>
              <li className="flex items-center">
                <button className="flex items-center w-full text-left text-black p-4 hover:bg-rose-gold transition-all">
                  <FaUsers size={24} className="mr-3" />
                  {isOpen && <span>Users</span>}
                </button>
              </li>
              <li className="flex items-center">
                <Link to='/listproduct'>
                <button className="flex items-center w-full text-left text-black p-4 hover:bg-rose-gold transition-all">
                  <PiDresserFill size={24} className="mr-3"/>
                  {isOpen && <span>Products</span>}
                </button>
                </Link>
                
              </li>
              <li className="flex items-center">
              <Link to='/addproduct'>
                <button className="flex items-center w-full text-left text-black p-4 hover:bg-rose-gold transition-all">
                  <IoBagAdd size={24} className="mr-3"/>
                  {isOpen && <span>Add</span>}
                </button>
                </Link>
                </li>
                <li className="flex items-center">
              <Link to='/deletproduct'>
                <button className="flex items-center w-full text-left text-black p-4 hover:bg-rose-gold transition-all">
                  <MdDelete size={24} className="mr-3"/>
                  {isOpen && <span>Delete</span>}
                </button>
                </Link>
                </li>
              <li className="flex items-center">
                <button className="flex items-center w-full text-left text-black p-4 hover:bg-rose-gold transition-all">
                  <FaCog size={24} className="mr-3" />
                  {isOpen && <span>Settings</span>}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 ">
          {/* Show Logout Button on large screens, Go Back icon on small screens */}
          <button className="w-full flex items-center justify-center text-black p-4 bg-red-500 hover:bg-red-600 transition-all rounded-md lg:hidden">
            <IoArrowBack size={24} /> {/* Icon for small screens */}
          </button>
          <button className="w-full  items-center justify-center text-black p-4 bg-red-500 hover:bg-red-600 transition-all rounded-md hidden lg:flex">
            Logout {/* Text for large screens */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
