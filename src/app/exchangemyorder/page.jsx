import React from 'react'
import Header from '../components/Header'
import ExchangeMyOrder from '../components/ExchangeMyOrder'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <ExchangeMyOrder />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
