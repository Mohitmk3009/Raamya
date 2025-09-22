import React from 'react'
import Header from '../components/Header'
import TermsandConditions from '../components/TermsandConditions'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <TermsandConditions />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default page
