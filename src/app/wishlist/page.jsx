import React from 'react'

import Wishlist from '../components/Wishlist'
import Suggestion from '../components/Suggestion'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'

const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <Wishlist />
            {/* <NewArrivals/> */}
            <Suggestion/>
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
