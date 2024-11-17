import { FaHome, FaShoppingBag, FaHeart, FaUser } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';

const UserFavorites = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderCreatedTime, setOrderCreatedTime] = useState('');

  const statuses = ['Order Created', 'Packed', 'Delivered', 'Returned'];

  useEffect(() => {
    const storedOrderId = localStorage.getItem('orderId');
    const storedOrderTime = localStorage.getItem('orderCreatedTime');
    
    if (storedOrderId) {
      setOrderId(storedOrderId);
      setOrderCreatedTime(storedOrderTime || new Date().toLocaleString());
      localStorage.setItem('orderCreatedTime', storedOrderTime || new Date().toLocaleString());
    }
  }, []);

  const handleNextStatus = () => {
    if (orderStatus < statuses.length - 1) {
      setOrderStatus(orderStatus + 1);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
      console.log('Response:', response.data);
      alert('Order deleted successfully');
      setOrderId(null);
      localStorage.removeItem('orderId');
      localStorage.removeItem('orderCreatedTime');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error deleting order');
    }
  };

  return (
    <div className="min-h-screen bg-white mt-8">
      <div className="mb-8 px-6">
        <h1 className="text-3xl font-extrabold mb-8 mt- text-center text-deepPlum">Your Order</h1>
        
        {orderId ? (
          <div className="flex flex-col items-center bg-pink-50 shadow-lg rounded-lg p-8 max-w-xl mx-auto">
            <p className="mb-4 text-lg text-gray-700">Order ID: <strong>{orderId}</strong></p>
            
            {/* QR Code with border */}
            <div className="mb-8 border-4 border-deepPlum p-4 rounded-lg shadow-md">
              <QRCodeCanvas value={`Order ID: ${orderId}`} size={120} />
            </div>

            {/* Order Status Timeline */}
            <div className="w-full flex justify-center">
  <div className="w-full max-w-md mx-auto">
    {statuses.map((status, index) => (
      <div key={index} className="relative mb-6 flex items-center">
        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold ${orderStatus >= index ? 'bg-deepPlum text-white' : 'bg-gray-300 text-gray-500'}`}>
          {index + 1}
        </div>
        <div className="ml-4 flex-1">
          <p className={`text-lg font-semibold ${orderStatus >= index ? 'text-deepPlum' : 'text-gray-500'}`}>
            {status}
          </p>
          {status === 'Order Created' && (
            <p className="text-gray-400 text-sm">Created on: {orderCreatedTime}</p>
          )}
        </div>
        {/* Vertical Line */}
        {index < statuses.length - 1 && (
          <div className={`absolute left-4 top-10 w-1 h-6 ${orderStatus > index ? 'bg-deepPlum' : 'bg-gray-300'}`} />
        )}
      </div>
    ))}
  </div>
</div>



            {/* Move to Next Status Button */}
            <button
              className="mt-6 bg-deepPlum text-white py-2 px-6 rounded-lg hover:bg-roseGold hover:text-deepPlum transition duration-300"
              onClick={handleNextStatus}
            >
              Move to Next Status
            </button>

            {/* Delete Order Button */}
            <button
              className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={handleDeleteOrder}
            >
              Delete Order
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">No order found. Please make a purchase first.</p>
        )}
      </div>

      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-deepPlum p-0 shadow-lg flex justify-around items-center space-x-8 rounded-t-3xl">
        <Link to="/user">
          <button
            className={`group flex flex-col items-center font-bold p-2 transition duration-300 ease-in-out
              ${location.pathname === '/user' ? 'text-white scale-105' : 'text-roseGold hover:scale-105'}`}
          >
            <FaHome className="text-2xl mb-1 transition duration-300" />
          </button>
        </Link>
        <Link to="/shop">
          <button
            className={`group flex flex-col items-center font-bold p-2 transition duration-300 ease-in-out
              ${location.pathname === '/shop' ? 'text-white scale-105' : 'text-roseGold hover:scale-105'}`}
          >
            <FaShoppingBag className="text-2xl mb-1 transition duration-300" />
          </button>
        </Link>
        <Link to="/favorites">  
          <button
            className={`group flex flex-col items-center font-bold p-2 transition duration-300 ease-in-out
              ${location.pathname === '/favorites' ? 'text-white scale-105' : 'text-roseGold hover:scale-105'}`}
          >
            <FaHeart className="text-2xl mb-1 transition duration-300" />
          </button>
        </Link>
        <Link to="/profile">
          <button
            className={`group flex flex-col items-center font-bold p-2 transition duration-300 ease-in-out
              ${location.pathname === '/profile' ? 'text-white scale-105' : 'text-roseGold hover:scale-105'}`}
          >
            <FaUser className="text-2xl mb-1 transition duration-300" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserFavorites;
