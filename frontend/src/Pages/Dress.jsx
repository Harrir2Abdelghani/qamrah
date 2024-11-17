import React from 'react'
import DressSection from '../Components/Dress/DressSection'
import {ShopContext} from '../Context/ShopContext'
import Footer from '../Components/Footer/Footer'
import JoinUs from '../Components/JoinUs/JoinUs'
import Navbar from '../Components/Navbar/Navbar'
const Dress = () => {
  const all_product = React.useContext(ShopContext)
  return (
    <div className='mt-28'>
      <Navbar/>
      <DressSection />
      <JoinUs />  
      <Footer />
    </div>
  )
}

export default Dress