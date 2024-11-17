import React, { useState, useEffect, useRef } from 'react';
import banner from '../Assets/banner.jpg'
import {Link} from 'react-router-dom'
import jewelry1 from '../Assets/jewelry1.jpg'
import jewelry2 from '../Assets/jewelry2.jpg'
import jewelry3 from '../Assets/jewelry3.jpg'
import jewelry4 from '../Assets/jewelry4.jpg'
import jewelry5 from '../Assets/jewelry5.jpg'

const JewelrySection = () => {
    const [animate, setAnimate] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const cardRefs = useRef([]);
  const jewelries = [
    
    {
      id: 2,
      title: 'Chic',
      description: 'A breezy and stylish dress for summer days.',
      price: 500,
      image: jewelry2,
    },
    {
      id: 3,
      title: 'Classic',
      description: 'A timeless black dress suitable .',
      price: 800,
      image: jewelry3,
    },
    {
      id: 4,
      title: 'Floral',
      description: 'A vibrant floral print dress for.',
      price: 900,
      image: jewelry4,
    },
    {
      id: 5,
      title: 'Elegant',
      description: 'A bold and beautiful red dress for evening.',
      price: 600,
      image: jewelry5,
    },
    
  ];
  const sortedJewelries = [...jewelries].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });

  // Filter and sort logic
  const filteredJewelries = sortedJewelries.filter(jewelry =>
    jewelry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    setAnimate(true); // Trigger the animation when the component mounts
  }, []);

  return (
    <>
    <section className="relative bg-cover bg-center h-96  text-dark font-dancing -mt-8">
    <div className="absolute inset-0 bg-opacity-50">
      <img src={banner} /> 
      </div> {/* Overlay */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
      <div className="text-center mt-20">
      <h1
        className={`text-4xl md:text-6xl font-bold transition-all duration-700 ease-out mt-10  ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        Explore Our Latest Jewelry
      </h1>
      <p
        className={`mt-4  text-sm font-mono  md:text-2xl transition-all duration-700 ease-out delay-200 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        Luxury and Elegance in Every Stitch
      </p>
      <Link to='/signin'>
      <button
        className={`mt-6 px-6 py-3 bg-deepPlum hover:bg-roseGold text-white text-lg font-medium rounded-full font-sans shadow-lg transition-all duration-700 ease-out delay-500 transform ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } hover:bg-gray-700 hover:scale-105`}
      >
        Shop Now
      </button>
      </Link>
      </div>
    </div>
    <hr className="border-t-2 border-roseGold mt-20 w-1/2 mx-auto" />
  </section>

  <section className="py-8 px-4 mt-40">
      {/* Search and Sort Options */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-1">
        <input
          type="text"
          placeholder="Search dresses..."
          className="p-2 border font-dancing text-xl font-bold border-deepPlum rounded-lg w-full max-w-xs focus:ring-roseGold focus:border-roseGold mb-4 sm:mb-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border font-bold border-gray-300 rounded-lg text-deepPlum focus:ring-roseGold focus:border-roseGold"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Dress Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
  {filteredJewelries.length > 0 ? (
    filteredJewelries.map((jewelry) => (
      <div
        key={jewelry.id}
        className="relative bg-gradient-to-br from-rose-100 via-white to-rose-200 border border-gray-200 rounded-xl shadow-lg "
      >
        {/* Discount Badge */}
        {jewelry.discount && (
          <span className="absolute top-4 left-4 bg-roseGold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {jewelry.discount}% OFF
          </span>
        )}

        {/* Image Section */}
        <div className="overflow-hidden rounded-t-xl">
          <img
            src={jewelry.image}
            alt={jewelry.title}
            className="w-full h-64 object-cover transform transition duration-500 hover:scale-110"
          />
        </div>

        {/* Product Info Section */}
        <div className="p-5 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2 text-black text-center font-mono">
            {jewelry.title}
          </h2>

          {/* Price Section */}
          <div className="flex justify-center items-center space-x-4 mb-2">
            {jewelry.old_price && (
              <span className="text-lg text-gray-400 font-semibold line-through">
                Dz {jewelry.old_price}
              </span>
            )}
            <span className="text-lg text-white font-bold bg-deepPlum py-2 px-4 rounded-full shadow-md">
              Dz {jewelry.price}
            </span>
          </div>

          {/* Add to Cart Button */}
          <Link to='/signin'>
          <button className="bg-roseGold mt-4 text-white py-2 px-6 rounded-full shadow-lg hover:bg-deepPlum transition-all duration-500">
            Add 
          </button>
          </Link>
        </div>
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-600">No dresses found</p>
  )}
</div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
      <div className="text-center mt-10">
      <Link to='/signin'>
      <button
        className={`mt-6 px-6 py-3 bg-deepPlum hover:bg-roseGold text-white text-lg font-medium rounded-full font-sans shadow-lg transition-all duration-700 ease-out delay-500 transform ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } hover:bg-gray-700 hover:scale-105`}
      >
        Shop Now
      </button>
      </Link>
      </div>
    </div>
      <hr className="border-t-2 border-roseGold mt-20 w-1/2 mx-auto" />
    </section>
</>
  )
}

export default JewelrySection