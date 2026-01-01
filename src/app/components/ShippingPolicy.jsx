'use client'
import Link from 'next/link';
import React from 'react';
import { useContentProtection } from '../hooks/useContentProtection';
const ShippingPolicy = () => {
  useContentProtection();
  return (
    <div className="bg-black text-[#EFAF00] pt-10 font-redhead select-none touch-action-manipulation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white cursor-pointer">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#EFAF00] font-bold">Shipping & Delivery Policy</span>
        </nav>

        <h1 className="lg:text-4xl text-2xl font-bold text-[#EFAF00] mb-8">Shipping & Delivery Policy</h1>

        <p className="lg:mb-10 mb-5 leading-relaxed">
          Thank you for shopping at RAAMYA. We are committed to ensuring your products are delivered to you in a timely and secure manner.
        </p>

        {/* Section: Order Processing */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">1. Order Processing</h2>
          <p className="mb-4 leading-relaxed">
            Upon successful payment and order confirmation, our team will begin processing your order within 1-2 business days.
          </p>
          <p className="leading-relaxed">
            You will receive a confirmation email with your order details and a tracking number once your package has been shipped.
          </p>
        </div>

        {/* Section: Standard Delivery Time */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">2. Standard Delivery Time</h2>
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
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">3. Shipping Charges</h2>
          <p className="leading-relaxed">
            Shipping charges will be calculated and displayed at the checkout based on your order value and delivery location.
          </p>
        </div>

        {/* Section: Tracking Your Order */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">4. Tracking Your Order</h2>
          <p className="leading-relaxed">
            You can track the status of your order using the tracking number provided in your shipping confirmation email.
          </p>
        </div>

        {/* Section: Delivery Information */}
        <div className="lg:mb-10 mb-5">
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">5. Delivery Information</h2>
          <p className="mb-4 leading-relaxed">
            Please ensure that your shipping address is accurate and complete to avoid any delays or failed deliveries.
          </p>
          <p className="leading-relaxed">
            A signature may be required upon delivery. If you are not available to receive the package, the shipping carrier will leave a notification with instructions for re-delivery or pickup.
          </p>
        </div>

        {/* Section: Important Notice */}
        <div>
          <h2 className="text-2xl font-semibold text-[#EFAF00] mb-4">6. Important Notice</h2>
          <p className="leading-relaxed">
            This policy applies to shipping and delivery only. It does not cover exchanges, returns, or refunds. Please refer to our separate <Link href="/exchange-policy" className="text-[#EFAF00] underline hover:text-yellow-300">Exchange Policy</Link> for information on product exchanges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;