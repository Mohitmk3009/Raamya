import React from 'react'
import Header from '../components/Header'
import Cart from '../components/Cart'
import Suggestion from '../components/Suggestion'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
import NewArrivals from '../components/NewArrivals'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <Cart />
            {/* <NewArrivals/> */}
            <Suggestion/>
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
