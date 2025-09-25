'use client'
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// Removed next/link and next/image imports for a standalone component
// Using standard a and img tags instead for broader compatibility

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// A simple icon component for the list items
const BulletIcon = () => (
  <svg className="w-4 h-4 mr-2 text-[#EFAF00] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="4" />
  </svg>
);

const ExchangeOrderForm = () => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
    selectedReason: '',
    otherReasonDetails: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const exchangeReasons = [
    "Incorrect size received",
    "Wrong item received",
    "Item is damaged or defective",
    "Other"
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalReason = formData.selectedReason === 'Other'
      ? formData.otherReasonDetails
      : formData.selectedReason;

    if (!finalReason.trim()) {
      toast.error('Please provide a reason for the exchange.');
      return;
    }

    const submissionData = new FormData();
    submissionData.append('orderNumber', formData.orderNumber);
    submissionData.append('email', formData.email);
    submissionData.append('reason', finalReason);
    if (imageFile) {
      submissionData.append('image', imageFile);
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/exchanges`, {
        method: 'POST',
        body: submissionData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      toast.success(data.message);
      setFormData({ orderNumber: '', email: '', selectedReason: '', otherReasonDetails: '' });
      setImageFile(null);
      setImagePreview('');
      e.target.reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-[#EFAF00] font-sans pt-12 font-redhead">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto p-4">
        <nav className="text-lg mb-8">
          <a href="/homepage" className="hover:text-white cursor-pointer">Home</a>
          <span className="mx-2">/</span>
          <span className="text-[#EFAF00] font-bold">Exchange My Order</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#EFAF00] inline-block">
            Exchange My Order
          </h1>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg shadow-lg mb-12">
          <form onSubmit={handleSubmit}>
            {/* The old message display element has been removed */}
            <div className="mb-6">
              <label htmlFor="orderNumber" className="block mb-2 text-sm font-medium text-gray-300">Order Number</label>
              <input
                type="text"
                id="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EFAF00] transition-all"
                placeholder="e.g., #RAAMYA12345 or just the ID"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EFAF00] transition-all"
                placeholder="The email you used to place the order"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-300">Upload Image (Mandatory)</label>
              <p className="text-xs text-gray-500 mb-2">If your item is damaged or incorrect, please upload a photo.</p>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md text-sm text-gray-400
                                           file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                                           file:text-sm file:font-semibold file:bg-[#EFAF00] file:text-gray-900
                                           hover:file:bg-yellow-500 transition-all cursor-pointer"
              />
            </div>

            {imagePreview && (
              <div className="mb-6">
                <p className="block mb-2 text-sm font-medium text-gray-300">Image Preview</p>
                <div className="border border-gray-600 rounded-md p-2">
                  <img src={imagePreview} alt="Selected preview" width={100} height={100} className="rounded-md object-cover" />
                </div>
              </div>
            )}
            <div className="mb-6">
              <label htmlFor="selectedReason" className="block mb-2 text-sm font-medium text-gray-300">Reason for Exchange</label>
              <select
                id="selectedReason"
                value={formData.selectedReason}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#EFAF00] transition-all"
                required
              >
                <option value="" disabled>-- Please select a reason --</option>
                {exchangeReasons.map(reason => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            {formData.selectedReason === 'Other' && (
              <div className="mb-8">
                <label htmlFor="otherReasonDetails" className="block mb-2 text-sm font-medium text-gray-300">Please provide more details</label>
                <textarea
                  id="otherReasonDetails"
                  rows="4"
                  value={formData.otherReasonDetails}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EFAF00] transition-all"
                  placeholder="Please specify the reason for your exchange request."
                  required
                ></textarea>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EFAF00] cursor-pointer text-gray-900 font-bold py-3 px-4 rounded-md hover:bg-white transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Submitting...' : 'Submit Exchange Request'}
            </button>
          </form>
        </div>




        {/* Policies Section */}
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center text-[#EFAF00]">
            RAAMYA Exchange and Cancellation Policy
          </h2>

          {/* Exchange Policy */}
          <div>
            <h3 className="text-2xl font-semibold text-[#EFAF00] mb-4">Exchange Policy</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <BulletIcon />
                <span>Exchanges are accepted within **3 days of the delivery date**.</span>
              </li>
              <li className="flex items-start">
                <BulletIcon />
                <span>Items must be **unused, unwashed**, and in their **original condition with all tags and packaging intact**.</span>
              </li>
              <li className="flex items-start">
                <BulletIcon />
                <span>Products that show signs of wear, damage, or alteration will not be eligible for exchange.</span>
              </li>
              <li className="flex items-start">
                <BulletIcon />
                <span>Only **one exchange request** can be made per order.</span>
              </li>
            </ul>
          </div>

          {/* Non-Exchangeable Items */}
          <div>
            <h3 className="text-2xl font-semibold text-[#EFAF00] mb-4">Non-Exchangeable Items</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <BulletIcon />
                <span>Items purchased **on sale or clearance** cannot be exchanged.</span>
              </li>
              <li className="flex items-start">
                <BulletIcon />
                <span>**Accessories and intimate wear** are non-exchangeable for hygiene reasons.</span>
              </li>
            </ul>
          </div>

          {/* Cancellation Policy */}
          <div>
            <h3 className="text-2xl font-semibold text-[#EFAF00] mb-4">Cancellation Policy</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <BulletIcon />
                <span>You may cancel your order for a **full refund** within **24 hours of placing the order**.</span>
              </li>
              <li className="flex items-start">
                <BulletIcon />
                <span>To request a cancellation, please email our customer service team at <a href="mailto:support@raamya.net.in" className="font-bold text-[#EFAF00] underline hover:text-yellow-300">support@raamya.net.in</a> with your order number.</span>
              </li>
              <li className="flex items-start">
                <BulletIcon />
                <span>Orders cannot be cancelled after 24 hours as they will have already been processed for shipping.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeOrderForm;
