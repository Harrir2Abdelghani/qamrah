import React from 'react'
import JewelrySection from '../Components/Jawelry/JewelrySection'
import Footer from '../Components/Footer/Footer'
import JoinUs from '../Components/JoinUs/JoinUs'
import Navbar from '../Components/Navbar/Navbar'
const Jewelry = () => {
  return (
    <div className='mt-28'>
      <Navbar/>
        <JewelrySection />
        <JoinUs />  
      <Footer />
    </div>
  )
}

export default Jewelry