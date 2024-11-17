import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useLocation, useEffect, useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoute'
import Home from './Pages/Home'
import Dress from './Pages/Dress'
import Jewelry from './Pages/Jewelry' 
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Contact from './Pages/Contact';
import Product from './Pages/Product';
import React from 'react';
import UserPage from './Pages/UserPage';
import UserFav from './Pages/UserFav';
import UserShopPage from './Pages/UserShopPage';
import Profile from './Pages/Profile'
function App() {
  return (
    <div >
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dress' element={<Dress />} />
          <Route path='/jewelry' element={<Jewelry />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
        </Routes>
    
        <Routes>
          <Route path='/user' element={<UserPage />} />
          <Route path="/favorites" element={<ProtectedRoute element={<UserFav />} />} />
          <Route path='/shop' element={<ProtectedRoute element={<UserShopPage />} />} />
          <Route path='/profile' element={<ProtectedRoute element={<Profile />} />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
