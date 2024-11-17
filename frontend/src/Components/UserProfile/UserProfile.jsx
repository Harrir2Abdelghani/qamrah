import React, { useState, useEffect } from 'react';
import { FiPhone, FiLogOut, FiShoppingBag, FiMessageSquare, FiShare2, FiGlobe } from 'react-icons/fi';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaHeart, FaUser } from 'react-icons/fa';
import axios from 'axios';

export const UserProfile = () => {
    const location = useLocation();
    const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null);
  const [isPhoneEditable, setIsPhoneEditable] = useState(true);

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
      setIsPhoneEditable(false);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem('profileImage', imageUrl);  // Save the image URL to localStorage
    }
  };

  const handleAddPhoneNumber = () => {
    if (phoneNumber) {
      localStorage.setItem('phoneNumber', phoneNumber);  // Save phone number to localStorage
      setIsPhoneEditable(false);  // Disable the input after adding
    }
  };

  const handleLogout = () => {
    // Implement real logout functionality here
    localStorage.removeItem('auth-token');  // Remove auth token
    window.location.href = '/';  // Redirect to login page
  };

  const handleContactUs = () => {
    window.location.href = '/contact';  // Redirect to a 404 page
  };

  const handleShareApp = () => {
    const shareLink = 'http://localhost:3000';

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareLink)
        .then(() => alert('App link copied to clipboard!'))
        .catch(() => alert('Failed to copy the link'));
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('App link copied to clipboard!');
    }
  };

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login function
  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/signin", {
        email: userEmail,
        password: userPassword
      });

      if (response.data.success) {
        // Store authToken and userId in localStorage
        localStorage.setItem("auth-Token", response.data.authToken);
        localStorage.setItem("userId", response.data.userId);

        setIsLoggedIn(true); // Update the state to show profile data
      } else {
        setError(response.data.errors);
      }
    } catch (error) {
      setError("Error logging in");
    }
  };

  // Fetch user name if logged in
  useEffect(() => {
    const fetchUserName = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/user/${userId}`);
          setUserName(response.data.name);
        } catch (err) {
          setError("Failed to fetch user data");
        }
      }
    };

    if (isLoggedIn) {
      fetchUserName();
    }
  }, [isLoggedIn]);
  
  return (
    <div>
     <div className="min-h-screen bg-pink-100 p-6 mb-8">
     <div className="absolute top-32 right-0 text-rose-500 text-2xl animate-spin_slow">★</div>
  <div className="absolute top-0 left-0 text-rose-500 text-2xl animate-pulse">★</div>
  <div className="absolute bottom-6 left-32 text-rose-500 text-xl animate-bounce">✦</div>
  <div className="absolute top-96 right-1 text-rose-500 text-xl animate-float">✦</div>
  <div className="absolute top-52 left-4 text-rose-500 text-xl animate-spin_slow">✦</div>
  <div className="absolute top-96 left-4 text-rose-500 text-xl animate-pulse">✦</div>
  <div className="absolute top-4 left-40 text-rose-500 text-xl animate-float">✦</div>
  <div className="absolute left-72 text-rose-500 text-2xl animate-bounce">★</div>
  <div className="absolute -top-20 -right-6 text-rose-500 text-2xl animate-pulse">★</div>
  <div className="absolute top-80 left-20 text-rose-500 text-xl animate-float">✦</div>
  {/* Profile Header */}
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-md mx-auto">
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <img
          src={profileImage || "https://via.placeholder.com/150"}
          className="w-32 h-32 rounded-full object-cover border-4 border-pink-300"
        />
        <label className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full text-white cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
          Edit
        </label>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <FiPhone className="text-pink-500 mr-2" />
          <input
            type="text"
            placeholder="Add Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={!isPhoneEditable}
            className={`border border-pink-300 rounded-md p-2 text-center w-48 ${!isPhoneEditable ? 'bg-gray-200 cursor-not-allowed' : ''}`}
          />
          {isPhoneEditable && (
            <button
              onClick={handleAddPhoneNumber}
              className="ml-2 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
            >
              Add
            </button>
          )}
        </div>
        <p className="text-lg font-semibold">
          {error ? error : `Welcome, ${userName || "Loading..."}`}
        </p>
      </div>
    </div>
  </div>

  {/* Menu Buttons */}
  <div className="grid gap-4 max-w-md mx-auto">
     {/* About Us */}
     <div className="bg-white rounded-xl shadow-lg p-6 text-deepPlum">
      <h3 className="text-lg font-bold">About Us</h3>
      <p className="mt-2 text-gray-600">
        We are a company that provides premium fashion products for women. Our mission is to offer a seamless shopping experience with style and elegance.
      </p>
    </div>
    {/* Purchase History */}
    <Link to='/favorite'>
    <button className="flex items-center w-full bg-white rounded-xl shadow-lg p-4 text-deepPlum hover:bg-pink-100 transition">
      <FiShoppingBag className="text-pink-500 text-xl mr-4" />
      Purchase History
    </button>
    </Link>
     

    {/* Contact Us */}
    <button
      onClick={handleContactUs}
      className="flex items-center w-full bg-white rounded-xl shadow-lg p-4 text-deepPlum hover:bg-pink-100 transition"
    >
      <FiMessageSquare className="text-pink-500 text-xl mr-4" />
      Contact Us
    </button>

    {/* Share App */}
    <button
      onClick={handleShareApp}
      className="flex items-center w-full bg-white rounded-xl shadow-lg p-4 text-deepPlum hover:bg-pink-100 transition"
    >
      <FiShare2 className="text-pink-500 text-xl mr-4" />
      Share App
    </button>

    {/* Change Language */}
    <button className="flex items-center w-full bg-white rounded-xl shadow-lg p-4 text-deepPlum hover:bg-pink-100 transition">
      <FiGlobe className="text-pink-500 text-xl mr-4" />
      Change Language
    </button>

{/* Logout */}
<div className='flex justify-center'>
  <button
    onClick={handleLogout}
    className="flex items-center font-bold text-lg justify-center text-center bg-pink-500 rounded-xl shadow-lg w-1/2 p-4 text-deepPlum hover:bg-pink-100 transition"
  >
    <FiLogOut className="text-deepPlum font-bold text-xl " />
    <span className="ml-1">Logout</span>
  </button>
</div>

   
  </div>
</div>


        {/* Bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-deepPlum p-0 shadow-lg flex justify-around items-center space-x-8 rounded-t-3xl ">
        <Link to="/user">
          <button
            className={`group flex flex-col items-center font-bold p-2  transition duration-300 ease-in-out
              ${location.pathname === '/user' ? ' text-white scale-105' : 'text-roseGold hover:scale-105'}`}
          >
            <FaHome className="text-2xl mb-1 transition duration-300" />
          </button>
        </Link>
        <Link to="/shop">
          <button
            className={`group flex flex-col items-center font-bold p-2  transition duration-300 ease-in-out
              ${location.pathname === '/shop' ? ' text-white scale-105' : 'text-roseGold hover:scale-105'}`}
          >
            <FaShoppingBag className="text-2xl mb-1 transition duration-300" />
          </button>
        </Link>
        <Link to="/favorites">
          <button
            className={`group flex flex-col items-center font-bold p-2  transition duration-300 ease-in-out
              ${location.pathname === '/favorites' ? ' text-white scale-105' : 'text-roseGold hover:scale-105'}`}
          >
            <FaHeart className="text-2xl mb-1 transition duration-300" />
          </button>
        </Link>
        <Link to="/profile">
          <button
            className={`group flex flex-col items-center font-bold p-2  transition duration-300 ease-in-out
              ${location.pathname === '/profile' ? ' text-white scale-105' : 'text-roseGold hover:scale-105'}`}
          >
            <FaUser className="text-2xl mb-1 transition duration-300" />
          </button>
        </Link>
      </div>
    </div>
  )
}
