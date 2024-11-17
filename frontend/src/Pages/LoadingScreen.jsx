import React from 'react';
import logo from '../Components/Assets/logo.png'; 

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen bg-offWhite">
      <div className="text-center">
        {/* Logo with Animation */}
        <img 
          src={logo} 
          alt="Qamrah Logo" 
          className="w-28 h-24 mx-auto opacity-0 animate-fadeIn" 
          style={{ animation: 'fadeIn 1s ease-out forwards' }}
        />
        {/* Title with Animation */}
        <h1 
          className="mt-4 text-2xl font-pacifico text-deepPlum opacity-0 animate-fadeIn" 
          style={{ animation: 'fadeIn 1s ease-out 0.5s forwards, slideUp 1s ease-out 0.5s forwards' }}
        >
          Qamrah | Shine as you wish
        </h1>
      </div>
    </div>
  );
}

export default LoadingScreen;;
