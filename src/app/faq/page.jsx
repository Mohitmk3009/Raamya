import React from 'react'
import Header from '../components/Header'
import FAQ from '../components/Faq'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <FAQ />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
