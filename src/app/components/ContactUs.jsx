'use client';
import React, { useState } from 'react';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import toast, { Toaster } from 'react-hot-toast'; 
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
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreed: false
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });


      if (response.ok) {
        toast.success('Message sent successfully! Please check your email for a confirmation.');
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '', agreed: false });
      } else {
        const data = await response.json();
        toast.error(`Failed to send message: ${data.message || 'An unexpected error occurred.'}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white lg:p-10 p-5 pb-0 font-redhead">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <a href="/" className="hover:text-white text-[#EFAF00] transition-colors duration-300 cursor-pointer">Home</a>
          <span className="mx-2 text-[#EFAF00]">/</span>
          <span className="text-[#EFAF00] font-bold">Contact Us</span>
        </nav>

        {/* Main Title & Intro Text */}
        <div className="text-[#EFAF00] mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            CONTACT US
          </h1>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              We Always Love Hearing From Our Customers! Please Do Not Hesitate To Contact Us Should You Have Any Questions Regarding Our Products And Sizing Recommendations Or Inquiries About Your Current Order.
            </p>
            <p>
              Contact Our Customer Care Team Through The Contact Form Below, Email Us At support@raamya.net.in Or Live Chat With Us Via Our Chat Widget On The Bottom Right Hand Corner Of This Page.
            </p>
            <p>
              We Will Aim To Respond To You Within 1-2 Business Days.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-16 bg-gray-900 p-8 rounded-lg shadow-lg ">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#EFAF00] mb-8 flex items-center">
            <WriteIcon />
            Write Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="text-xs font-semibold text-gray-400 uppercase">FULL NAME <span className="text-[#EFAF00]">*</span></label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="w-full bg-gray-700 mt-2 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">EMAIL <span className="text-[#EFAF00]">*</span></label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email address" required className="w-full bg-gray-700 mt-2 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">PHONE</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" className="w-full bg-gray-700 mt-2 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">SUBJECT <span className="text-[#EFAF00]">*</span></label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject of your message" required className="w-full bg-gray-700 mt-2 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MESSAGE <span className="text-[#EFAF00]">*</span></label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Type your message here..." rows="6" required className="w-full bg-gray-700 mt-2 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-center">
              <input id="agreed" name="agreed" type="checkbox" checked={formData.agreed} onChange={handleChange} required className="h-5 cursor-pointer w-5 bg-gray-900 border-gray-700 rounded text-[#EFAF00] focus:ring-amber-500 accent-amber-500" />
              <label htmlFor="agreed" className="ml-3 text-sm text-gray-400">I agree that my personal data will be processed in accordance with the privacy policy</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#EFAF00] cursor-pointer text-black font-bold py-4 px-10 rounded-xl hover:bg-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status Message */}
            {status && (
              <div className="mt-4 p-4 rounded-xl text-center font-semibold" style={{ backgroundColor: status.includes('success') ? '#4ade80' : '#f87171' }}>
                <p>{status}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
