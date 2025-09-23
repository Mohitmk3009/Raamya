import React from 'react'
import Header from '../components/Header'
import MyAccount from '../components/MyAccount'
import Footer from '../components/Footer'
const page = () => {
    return (
        <>
        <div className='bg-black min-h-screen flex flex-col items-center justify-center'>
            {/* <Header /> */}
            <MyAccount />
        </div>
            <Footer />
        </>
        
    )
}

export default page
