'use client'
import Link from 'next/link';
import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="bg-black text-yellow-400 pt-10 text-justify font-redhead">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400 font-bold">Shipping & Delivery Policy</span>
        </nav>

        <h1 className="text-4xl font-bold text-yellow-500 mb-8">Shipping & Delivery Policy</h1>

        <p className="mb-10 leading-relaxed">
          Thank you for shopping at RAAMYA. We are committed to ensuring your products are delivered to you in a timely and secure manner.
        </p>

        {/* Section: Order Processing */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Order Processing</h2>
          <p className="mb-4 leading-relaxed">
            Upon successful payment and order confirmation, our team will begin processing your order within 1-2 business days.
          </p>
          <p className="leading-relaxed">
            You will receive a confirmation email with your order details and a tracking number once your package has been shipped.
          </p>
        </div>

        {/* Section: Standard Delivery Time */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Standard Delivery Time</h2>
          <p className="mb-4 leading-relaxed">
            Our standard delivery time is 5 to 9 business days from the date of order confirmation.
          </p>
          <p className="mb-4 leading-relaxed">
            Please note that business days do not include weekends or public holidays.
          </p>
          <p className="leading-relaxed">
            Delivery times may vary depending on the destination and unforeseen circumstances such as natural disasters, shipping carrier delays, or customs inspections. While we make every effort to deliver within the specified timeframe, we are not responsible for delays outside of our control.
          </p>
        </div>
        
        {/* Section: Shipping Charges */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Shipping Charges</h2>
          <p className="leading-relaxed">
            Shipping charges will be calculated and displayed at the checkout based on your order value and delivery location.
          </p>
        </div>

        {/* Section: Tracking Your Order */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Tracking Your Order</h2>
          <p className="leading-relaxed">
            You can track the status of your order using the tracking number provided in your shipping confirmation email.
          </p>
        </div>

        {/* Section: Delivery Information */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Delivery Information</h2>
          <p className="mb-4 leading-relaxed">
            Please ensure that your shipping address is accurate and complete to avoid any delays or failed deliveries.
          </p>
          <p className="leading-relaxed">
            A signature may be required upon delivery. If you are not available to receive the package, the shipping carrier will leave a notification with instructions for re-delivery or pickup.
          </p>
        </div>

        {/* Section: Important Notice */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Important Notice</h2>
          <p className="leading-relaxed">
            This policy applies to shipping and delivery only. It does not cover exchanges, returns, or refunds. Please refer to our separate <Link href="/exchange-policy" className="text-yellow-400 underline hover:text-yellow-300">Exchange Policy</Link> for information on product exchanges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;