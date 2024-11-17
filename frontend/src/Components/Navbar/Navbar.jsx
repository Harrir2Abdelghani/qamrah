import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import qamrah from '../Assets/logo.png';
import { Link } from "react-router-dom";
import DelayedNavigation from '../../Pages/DelayedNavigation';

function Navbar({ toggleDarkMode, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleNavigation = (path) => {
    // Check if the path is for login or signup
    if (path === "/signin" || path === "/signup") {
      setRedirectPath(path);
    } else {
      window.location.href = path; // Navigate directly for other paths
    }
  };

  if (redirectPath) {
    return <DelayedNavigation path={redirectPath} />;
  }

  return (
    <div className=" cursor-pointer nav bg-offWhite shadow-md  fixed top-0 z-50 w-full shadow-roseGold border-b-2 border-roseGold  text-xl font-bold">
      <div className="flex justify-between items-center p-4">
        {/* Logo Section with Animation */}
        <div
          className={`w-24 h-12 -ml-8 object-left-top transform transition-transform duration-700 ${
            animate ? "translate-x-0" : "-translate-x-16"
          }`}
        >
          <Link to='/'>
          <img src={qamrah} alt="Qamrah Logo" className="h-full w-full object-cover " />
          </Link>
        </div>

        {/* Text for Mobile View */}
        <div className="block sm:hidden text-roseGold  -ml-8 text-lg font-dancing">
        💫 Qamrah | قمرة 💫
        </div>
        
        {/* Hamburger Icon for Mobile */}
        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-deepPlum w-6 h-6" />
            ) : (
              <FaBars className="text-deepPlum w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation Links and Buttons for Desktop */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          }  sm:flex  flex-col sm:flex-row gap-6 sm:gap-12 font-medium underline-none font-mono text-roseGold items-center absolute sm:static top-16 left-0 sm:left-auto w-full sm:w-auto bg-offWhite sm:bg-transparent p-4 sm:p-0 border-t-2 sm:border-0 border-roseGold sm:border-none shadow-lg sm:shadow-none`}
        >
          <li onClick={() => handleNavigation("/")}>
            Home
          </li>
          <li onClick={() => handleNavigation("/dress")}>
            Dress
          </li>
          <li onClick={() => handleNavigation("/jewelry")}>
            Jewelry
          </li>
          <li onClick={() => handleNavigation("/contact")}>
            Contact Us
          </li>

          {/* Buttons for Mobile View */}
          <div className="flex gap-10 mt-4 sm:hidden">
            <button
              className="bg-deepPlum  text-white px-4 py-2 rounded-full hover:bg-roseGold transition duration-300 shadow-md"
              onClick={() => handleNavigation("/signin")}
            >
              Sign In
            </button>
            <button
              className="bg-blushPink  text-white px-4 py-2 rounded-full hover:bg-roseGold transition duration-300 shadow-md"
              onClick={() => handleNavigation("/signup")}
            >
              Sign Up
            </button>
          </div>
        </ul>

        {/* Buttons Section - Visible on Desktop with Animation */}
        <div
          className={`hidden font-sans sm:flex gap-4 transform transition-transform duration-700 ${
            animate ? "translate-x-0" : "translate-x-16"
          }`}
        >
          {/* <button
            className="bg-deepPlum text-white px-6 py-2 rounded-full hover:bg-roseGold transition duration-300 shadow-md"
            onClick={() => handleNavigation("/signin")}
          >
            Sign In
          </button> */}
          {/* <button
            className="bg-blushPink font-sans text-white px-6 py-2 rounded-full hover:bg-roseGold transition duration-300 shadow-md"
            onClick={() => handleNavigation("/signup")}
          >
            Sign Up
          </button> */}
          <Link to="/signin">
            <button className="bg-roseGold hover:bg-blushPink text-white py-2 px-5 rounded-full shadow-lg transition duration-300">
              Sign In
            </button>
            </Link>
            {/* <Link to='/signup'>
            <button className="bg-deepPlum hover:bg-roseGold  text-white py-2 px-5 rounded-full shadow-lg transition duration-300">
              Sign Up
            </button>
            </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
