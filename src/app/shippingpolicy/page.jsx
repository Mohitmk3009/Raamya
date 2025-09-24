import React from 'react'
import Header from '../components/Header'
import ShippingPolicy from '../components/ShippingPolicy'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <ShippingPolicy />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
