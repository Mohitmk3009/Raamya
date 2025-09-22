import React from 'react'
import Header from '../components/Header'
import Checkout from '../components/Checkout'
import Suggestion from '../components/Suggestion'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <Checkout />
            <Suggestion/>
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
