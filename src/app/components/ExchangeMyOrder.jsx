import Link from 'next/link';
import React from 'react';

// A simple icon component for the list items, replicating the bullet points
const BulletIcon = () => (
  <svg
    className="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0 mt-1"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <circle cx="10" cy="10" r="4" />
  </svg>
);

const ExchangeOrderForm = () => {
  return (
    <div className="bg-black  text-yellow-400 font-sans pt-12 font-redhead">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs Navigation */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400 font-bold ">Exchange My Order</span>
        </nav>

        {/* Main Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 inline-block">
            Exchange My Order
          </h1>
           {/* <div className="w-48 h-1 bg-yellow-400 mx-auto mt-2"></div> */}
        </div>


        {/* Exchange Request Form */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg mb-12">
          <form>
            <div className="mb-6">
              <label htmlFor="orderNumber" className="block mb-2 text-sm font-medium text-gray-300">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                placeholder="e.g. #RAAMYA12345"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="reason" className="block mb-2 text-sm font-medium text-gray-300">
                Reason for Exchange
              </label>
              <textarea
                id="reason"
                rows="4"
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                placeholder="Please provide a detailed reason for your exchange request."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-md hover:bg-yellow-500 transition-colors duration-300"
            >
              Submit Exchange Request
            </button>
          </form>
        </div>

        {/* Policies Section */}
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-center text-yellow-400">
            RAAMYA Exchange and Cancellation Policy
          </h2>

          {/* Exchange Policy */}
          <div>
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Exchange Policy</h3>
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
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Non-Exchangeable Items</h3>
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
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Cancellation Policy</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <BulletIcon />
                <span>You may cancel your order for a **full refund** within **24 hours of placing the order**.</span>
              </li>
              <li className="flex items-start">
                <BulletIcon />
                <span>To request a cancellation, please email our customer service team at <a href="mailto:support@raamya.com" className="font-bold text-yellow-400 underline hover:text-yellow-300">support@raamya.com</a> with your order number.</span>
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
