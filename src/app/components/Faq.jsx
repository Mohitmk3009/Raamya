'use client'
import Link from 'next/link';
import React, { useState } from 'react';

// Data for the FAQ section
const faqData = [
  {
    question: 'How Do I Contact Your Customer Service?',
    answer: 'Our RAAMYA Customer Service Team Is Available Monday Through Friday, 9 AM – 5 PM IST, Excluding Holidays. You Can Reach Us Via Email At support@raamya.net.in (Preferred And Fastest Response), Via Chat Using The Icon At The Bottom Right Corner Of Our Website, Or By Leaving Us A Voicemail At +91-8950566899. We’ll Get Back To You Within 24 Business Hours.',
  },
  {
    question: '1. What is RAAMYA?',
    answer: 'RAAMYA is a brand that celebrates the rich heritage of Indian ethnic wear, blending traditional craftsmanship with modern aesthetics to create timeless and exquisite fashion.',
  },
  {
    question: '2. Can I Cancel Or Modify My Order?',
    answer: 'Once an order is placed, we begin processing it immediately to ensure quick delivery. Therefore, we are unable to cancel or modify orders. Please review your order carefully before confirming your purchase.',
  },
  {
    question: '3. What Are My Shipping Options?',
    answer: 'We offer standard and express shipping options. Shipping times and costs vary depending on your location. You can find detailed information on our Shipping Policy page.',
  },
  {
    question: '4. What Type Of Payment Methods Do You Offer?',
    answer: 'We accept a variety of payment methods, including major credit cards (Visa, MasterCard, American Express), debit cards, and other secure online payment gateways.',
  },
  {
    question: '5. Which Size Will Fit Me Best?',
    answer: 'We Offer Product And Body Measurements On Each Of Our Products Pages, Just Click On "Size Guide" To Find Your Best Fit. Measuring Guides Are Included.',
  },
  {
    question: '6. How Can I Contact Customer Support?',
    answer: 'You can contact our customer support team via the contact form on our website, by emailing support@raamya.com, or by using the live chat feature during business hours.',
  },
  {
    question: '7. Where Are RAAMYA Products Made?',
    answer: 'Our products are proudly made in India. We collaborate with skilled artisans and weavers from various regions to bring you authentic and high-quality garments.',
  },
  {
    question: '8. How Do You Find And Evaluate Your Suppliers?',
    answer: 'We have a rigorous process for selecting suppliers that aligns with our commitment to ethical and sustainable practices. We prioritize partners who share our values of quality craftsmanship and fair labor.',
  },
  {
    question: '9. Why Choose RAAMYA?',
    answer: 'Choose RAAMYA for a unique blend of tradition and modernity, exceptional quality, and a commitment to ethical fashion. Every piece tells a story and is crafted to make you feel beautiful and confident.',
  },
];


// Individual FAQ Item Component
const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-800 py-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onClick}
      >
        <h3 className="text-md sm:text-lg font-semibold text-amber-400">{item.question}</h3>
        <div className="text-amber-400 text-2xl font-light">
          {isOpen ? '−' : '+'}
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen mt-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
};


// Main FAQ Component
export default function FAQ() {
  // State to track which FAQ items are open. Defaulting 0 and 5 to open as in the screenshot.
  const [openIndexes, setOpenIndexes] = useState([0]);

  const handleItemClick = (index) => {
    setOpenIndexes(prevIndexes =>
      prevIndexes.includes(index)
        ? prevIndexes.filter(i => i !== index) // Close item if already open
        : [...prevIndexes, index] // Open item if closed
    );
  };

  return (
    <div className="bg-black text-yellow-400  pt-10 text-justify font-redhead ">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-lg mb-8">
          <Link href="/homepage" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400 font-bold ">FAQs</span>
        </nav>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-400 mb-8">
          FAQs
        </h1>

        {/* FAQ List */}
        <div>
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndexes.includes(index)}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
