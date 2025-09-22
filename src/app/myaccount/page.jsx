import React from 'react'
import Header from '../components/Header'
import MyAccount from '../components/MyAccount'
import Footer from '../components/Footer'
const page = () => {
    return (
        <div className='bg-black'>
            {/* <Header /> */}
            <MyAccount />
            <Footer />
        </div>
    )
}

export default page
