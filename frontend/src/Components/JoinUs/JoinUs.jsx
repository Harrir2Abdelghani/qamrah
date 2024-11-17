import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom'

const JoinUs = () => {
    const [animate, setAnimate] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAnimate(true);
              observer.disconnect(); // Stop observing once animation is triggered
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the section is visible
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => observer.disconnect();
    }, []);
  return (
    <section
      ref={sectionRef}
      className="container mx-auto text-black py-16 px-8"
    >
      <div
        className={`max-w-4xl mx-auto text-center transition-transform duration-1000 ease-out ${
          animate ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-full opacity-0'
        }`}
      >
        
        {/* Headline */}
        <h2 className="text-4xl font-bold mb-6 text-deepPlum">
          Be a Part of Something Special!
        </h2>
        
        {/* Subtext */}
        <p className="text-lg mb-8 text-gray-600">
          Create an account or log in to explore exclusive collections, manage your orders, and get personalized recommendations.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to='/signin'>
            <button
              className="bg-deepPlum  text-white px-4 py-2 rounded-full hover:bg-roseGold transition duration-300 shadow-md"
            >
              Sign In
            </button>
            </Link>
            <Link to='/signin'>
            <button
              className="bg-blushPink  text-white px-4 py-2 rounded-full hover:bg-roseGold transition duration-300 shadow-md"
            >
              Sign Up
            </button>
            </Link>
        </div>
      </div>
    </section>
  );
}

export default JoinUs