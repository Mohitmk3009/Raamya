import React from 'react'
import Header from '../components/Header'
import ExchangePolicy from '../components/ExchangePolicy'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <ExchangePolicy />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
