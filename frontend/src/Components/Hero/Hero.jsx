import React, { useEffect, useState } from "react";
import heroImage from '../Assets/Hero.png'
import {Link } from 'react-router-dom'
const Hero = () => {
  const [animate, setAnimate] = useState(false);

  // Trigger the animation on component mount
  useEffect(() => {
    setAnimate(true);
  }, []);
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Column - Image */}
        <div
          className={`w-full mt-11  md:w-1/2 mb-8 md:mb-0 transform transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Column - Titles and Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1
            className={`text-3xl md:text-6xl font-bold  text-deepPlum ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } transition-all duration-700`}
          >
            ✨ Shine As Moon ✨
          </h1>
          <p
            className={`text-xl font-bold md:text-xl font-mono text-gray-700 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } transition-all duration-700 delay-200`}
          >
            Discover a world of beautiful dresses and stunning jewelry. Rent the perfect outfit for your special occasion.
          </p>
          <div
            className={`flex flex-col  sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } transition-all duration-700 delay-400`}
          >
            <Link to="/signin">
            <button className="bg-roseGold hover:bg-blushPink mt-5 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
              Rent Now
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero