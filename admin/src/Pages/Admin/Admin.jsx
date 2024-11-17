import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import DeletProduct from '../../Components/DeletProduct/DeletProduct'
import Dashboard from '../../Components/Dashboard/Dashboard'
const Admin = () => {
  return (
    <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
          <Route path='/deletproduct' element={<DeletProduct />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
    </div>
  )
}

export default Admin
