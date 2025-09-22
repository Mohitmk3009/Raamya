import React from 'react'
import ProductDetail from '../../components/ProductDetails'
import Suggestion from '../../components/Suggestion'
import Subscribe from '../../components/Subscribe'
import Footer from '../../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <ProductDetail />
            <Suggestion/>
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
