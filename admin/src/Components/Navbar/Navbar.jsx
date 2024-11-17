import React from 'react';
import logo2 from '../../assets/logo2.png';

const Navbar = () => {
  return (
    <nav className="w-full bg-rose-50 shadow-md">
      <div className="max-w-8xl mx-auto flex items-center justify-between ">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <img src={logo2} alt="Logo" className=" ml-2 h-12 w-12" />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
