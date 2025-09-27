import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import NewArrivals from '../components/NewArrivals'
import VideoGallery from '../components/VideoGallery'
import Footer from '../components/Footer'
import Subsribe from '../components/Subscribe'
import { Video } from 'lucide-react'
const page = () => {
  return (
    <div className='bg-black'>
      {/* <Header /> */}
      <Hero/>
      <NewArrivals/>
      {/* <VideoGallery/> */}
      <Subsribe/>
      <Footer/>
    </div>
  )
}

export default page
