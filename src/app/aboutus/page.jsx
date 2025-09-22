import React from 'react'
import Header from '../components/Header'
import AboutUs from '../components/AboutUs'
import Suggestion from '../components/Suggestion'
import Footer from '../components/Footer'
import Subsribe from '../components/Subscribe'
import { Video } from 'lucide-react'
const Page = () => {
  return (
    <div className='bg-black'>
      {/* <Header /> */}
      <AboutUs />
      {/* <Suggestion /> */}
      <Subsribe/>
      <Footer/>
    </div>
  )
}

export default Page
