import React from 'react'
import Header from '../components/Header'
import ContactUs from '../components/ContactUs'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <ContactUs />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
