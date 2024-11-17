import React from 'react'
import Hero from '../Components/Hero/Hero'
import PopularDress from '../Components/Popular/Popular-dress'
import data_dress_product from '../Components/Assets/dress_data'
import data_jewerly_product from '../Components/Assets/jewerly_data'
import PopularJewerly from '../Components/Popular/Popular-Jewerly'
import Offer from '../Components/Offer/Offer'
import Footer from '../Components/Footer/Footer'
import JoinUs from '../Components/JoinUs/JoinUs'
import Navbar from '../Components/Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero />
      <PopularDress data_dress_product={data_dress_product} />
      <br/>
      <PopularJewerly data_jewerly_product={data_jewerly_product} />
      <Offer />
      <JoinUs />  
      <Footer />
    </div>
  ) 
}
export default Home