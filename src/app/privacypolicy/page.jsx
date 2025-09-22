import React from 'react'
import Header from '../components/Header'
import PrivacyPolicy from '../components/PrivacyPolicy'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <PrivacyPolicy />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
