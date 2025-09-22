'use client'
import Link from 'next/link';
import React from 'react';

const ExchangePolicy = () => {
  return (
    <div className="bg-black text-yellow-400   pt-10  text-justify font-redhead">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400 font-bold ">Exchange Policy</span>
        </nav>

        <h1 className="text-4xl font-bold text-yellow-500 mb-8">RAAMYA Exchange Policy</h1>

        <p className="mb-10 leading-relaxed">
          At RAAMYA, we value your satisfaction and want to ensure you have a smooth shopping experience. If you are not completely happy with your purchase, you may request an exchange under the following conditions:
        </p>

        {/* Eligibility Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Eligibility For Exchange</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>Exchanges are accepted within 3 days of the delivery date.</li>
            <li>Items must be unused, unwashed, and in their original condition with all tags and packaging intact.</li>
            <li>Products that show signs of wear, damage, or alteration will not be eligible for exchange.</li>
            <li>Only one exchange request can be made per order.</li>
          </ul>
        </div>

        {/* Non-Exchangeable Items Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Non-Exchangeable Items</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>Items purchased on sale or clearance cannot be exchanged.</li>
            <li>Accessories and intimate wear are non-exchangeable due to hygiene reasons.</li>
          </ul>
        </div>

        {/* How to Request an Exchange Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">How To Request An Exchange</h2>
          <ol className="list-decimal list-inside space-y-3 pl-4">
            <li>Go to the Exchange My Order page on our website.</li>
            <li>Enter your order details and select the reason for exchange.</li>
            <li>Once approved, ship the item back to us using the provided instructions.</li>
            <li>After inspection, we will dispatch your replacement item.</li>
          </ol>
        </div>
        
        {/* Important Notes Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Important Notes</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>Exchanges are subject to product availability.</li>
            <li>Customers are responsible for return shipping costs unless the exchange is due to a wrong or defective item.</li>
            <li>Exchanges requested after 3 days from delivery will not be accepted.</li>
            <li>For further assistance, please contact our RAAMYA Customer Service Team at <a href="mailto:Support@Raamya.Com" className="text-yellow-400 underline hover:text-yellow-300">Support@Raamya.Com</a></li>
          </ul>
        </div>

        {/* Cancellation Policy Section */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Cancellation Policy</h2>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>You may cancel your order for a full refund within 24 hours of placing the order.</li>
            <li>To request a cancellation, please email our Customer Service Team at <a href="mailto:Support@Raamya.Com" className="text-yellow-400 underline hover:text-yellow-300">Support@Raamya.Com</a> with your order number and the reason for the cancellation.</li>
            <li>Orders cannot be cancelled after 24 hours as they will have already been processed for shipping.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ExchangePolicy;
