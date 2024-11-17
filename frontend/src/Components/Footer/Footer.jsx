import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import footer from '../Assets/footer.png'

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    // Start the subscription process
    setLoading(true);

    try {
      // Assuming you have a backend endpoint to handle subscription
      const response = await fetch('http://192.168.1.38:4000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Thank you for subscribing!');
        setEmail(''); // Reset the input field
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setMessage('Error occurred. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-8">
      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
      <h3 className="text-2xl font-bold mb-4 text-deepPlum">Join Our Newsletter</h3>
      <p className="mb-6 text-md">
        Stay updated with the latest collections and offers. Enter your email below to join our newsletter!
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-2/3 p-3 rounded-full text-black mb-4 sm:mb-0 sm:mr-4"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-8 rounded-full shadow-md transition"
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <p className="mt-4 text-md text-red-500">{message}</p>}
    </div>

      {/* Footer Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-700 pt-8">
        
        {/* Logo and Social Media */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="mb-4">
            {/* Replace with your logo */}
            {/* <img src={footer} alt="Footer Logo" className="w-32 h-32" /> */}
            <h4 className="text-4xl font-bold font-dancing text-pink-500 mb-4">Qamrah</h4> 
          </div>
          <div className="flex space-x-4 text-xl text-deepPlum">
            <a href="https://www.facebook.com/lamia.gue.77/?_rdr" aria-label="Facebook" target='_blank' className="hover:text-pink-500 transition">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/lamia._.za/" target='_blank' aria-label="Instagram" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="mailto:support@qamrah.com" target='_blank' aria-label="Email" className="hover:text-pink-500 transition">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Centered About Us Section */}
        <div className="sm:text-center sm:mx-auto text-center">
          <h4 className="font-bold mb-4 text-pink-500 text-center">About Us</h4>
          <ul>
            <li className="mb-2 text-deepPlum hover:text-pink-500 transition">
              <a href="/">Our Story</a>
            </li>
            <li className="mb-2 text-deepPlum hover:text-pink-500 transition">
              <a href="/contact">Contact Us</a>
            </li>
            <li className="mb-2 text-deepPlum hover:text-pink-500 transition">
              <a href="/contact">FAQ</a>
            </li>
          </ul>
        </div>
      
        <div className='sm:text-center sm:mx-auto text-center'>
          <h4 className="font-bold mb-4 text-pink-500 text-center">Account</h4>
          <ul>
            <li className="mb-2 text-deepPlum hover:text-pink-500 transition">
              <a href="/profile">My Account</a>
            </li>
            <li className="mb-2 text-deepPlum hover:text-pink-500 transition">
              <a href="/favorites">Order History</a>
            </li>
            <li className="mb-2 text-deepPlum hover:text-pink-500 transition">
              <a href="/shop">Wishlist</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-14 text-center text-gray-500">
        © 2024 Qamrah | Made With ❤️ In Dz.
      </div>
    </footer>
  )
}

export default Footer