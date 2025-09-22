'use client';
import Link from 'next/link';
import React, { useState } from 'react';

// --- SVG Icon Components ---

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const WriteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);


export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    agreed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    // Reset form after submission
    setFormData({ fullName: '', companyName: '', email: '', phone: '', agreed: false });
  };

  return (
    <div className="bg-black text-yellow-400  p-10  font-redhead">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400 font-bold ">Contact Us</span>
        </nav>

        {/* Main Title & Intro Text */}
        <div className="text-amber-400 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            CONTACT US
            </h1>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                We Always Love Hearing From Our Customers! Please Do Not Hesitate To Contact Us Should You Have Any Questions Regarding Our Products And Sizing Recommendations Or Inquiries About Your Current Order.
                </p>
                <p>
                Contact Our Customer Care Team Through The Contact Form Below, Email Us At Hello@raamya.com Or Live Chat With Us Via Our Chat Widget On The Bottom Right Hand Corner Of This Page.
                </p>
                <p>
                We Will Aim To Respond To You Within 1-2 Business Days.
                </p>
            </div>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-8 flex items-center">
            <WriteIcon />
            Write Us
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="text-xs font-semibold text-gray-400 uppercase ">FULL NAME <span className="text-amber-400">*</span></label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="w-full bg-gray-900/50 mt-2 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">COMPANY NAME <span className="text-amber-400">*</span></label>
              <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Your company name" required className="w-full bg-gray-900/50 mt-2 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">EMAIL <span className="text-amber-400">*</span></label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email address" required className="w-full bg-gray-900/50 mt-2 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">PHONE <span className="text-amber-400">*</span></label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" required className="w-full bg-gray-900/50 mt-2 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
            </div>
            
            {/* Privacy Policy Checkbox */}
            <div className="flex items-center">
              <input id="agreed" name="agreed" type="checkbox" checked={formData.agreed} onChange={handleChange} required className="h-5 w-5 bg-gray-900 border-gray-700 rounded text-amber-500 focus:ring-amber-500 accent-amber-500" />
              <label htmlFor="agreed" className="ml-3 text-sm text-gray-400">I agree that my personal data will be processed in accordance with the privacy policy</label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full sm:w-auto bg-amber-500 text-black font-bold py-4 px-10 rounded-xl hover:bg-amber-600 transition duration-300">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Chat Card */}
          <div className="bg-amber-600/20 border border-amber-600 p-6 rounded-lg text-center flex flex-col items-center justify-between text-white">
            <div className="flex flex-col items-center">
                <ChatIcon />
                <h3 className="text-xl font-bold mb-2">Chat With Us</h3>
                <p className="text-sm text-gray-300 mb-4">We Are Here And Ready To Chat</p>
            </div>
            <button className="border border-amber-500 text-amber-500 font-semibold py-2 px-6 rounded-md hover:bg-amber-500 hover:text-black transition duration-300 w-full">
              Start Chat
            </button>
          </div>

          {/* Call Card */}
          <div className="bg-amber-600/20 border border-amber-600 p-6 rounded-lg text-center flex flex-col items-center justify-between text-white">
            <div className="flex flex-col items-center">
                <PhoneIcon />
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-sm text-gray-300 mb-4">We're Here To Talk To You</p>
            </div>
            <button className="border border-amber-500 text-amber-500 font-semibold py-2 px-6 rounded-md hover:bg-amber-500 hover:text-black transition duration-300 w-full">
              +1(929)460-3208
            </button>
          </div>

          {/* Email Card */}
          <div className="bg-amber-600/20 border border-amber-600 p-6 rounded-lg text-center flex flex-col items-center justify-between text-white">
            <div className="flex flex-col items-center">
                <EmailIcon />
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-sm text-gray-300 mb-4">You Are Welcome To Send Us An Email</p>
            </div>
            <button className="border border-amber-500 text-amber-500 font-semibold py-2 px-6 rounded-md hover:bg-amber-500 hover:text-black transition duration-300 w-full">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


