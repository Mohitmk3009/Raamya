import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// --- SVG Icon Components ---
// These are kept separate for readability.

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#1DA1F2]">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.296 1.638 4.212 3.822 4.652-.662.18-1.37.21-2.067.077.598 1.879 2.343 3.249 4.418 3.286-1.714 1.34-3.877 2.145-6.232 2.145-.4 0-.792-.023-1.175-.068 2.214 1.424 4.843 2.258 7.666 2.258 9.196 0 14.226-7.624 14.008-14.456.974-.702 1.798-1.58 2.46-2.557z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0077B5]">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#EA4335]">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);


const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <defs>
            <radialGradient id="instaGradient" cx="0.3" cy="1" r="1">
                <stop offset="0" stopColor="#FFDC80" />
                <stop offset="0.1" stopColor="#FCAF45" />
                <stop offset="0.5" stopColor="#F77737" />
                <stop offset="0.7" stopColor="#F56040" />
                <stop offset="1" stopColor="#FD1D1D" />
            </radialGradient>
        </defs>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="url(#instaGradient)" fill="none" strokeWidth="2.5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#instaGradient)" fill="none" strokeWidth="2.5"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="url(#instaGradient)" fill="none" strokeWidth="2.5"></line>
    </svg>
);


const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 font-redhead">
            <div className="w-full  py-0  ">
                {/* Top section with columns */}
                <div className=' bg-[#FFBB00] h-0.5 w-full  '></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-8 lg:px-20 px-5 ">

                    {/* Column 1: Brand and Socials */}
                    <div className="space-y-4 ">
                        {/* mt-[-8px] */}
                        <h2 className="lg:text-6xl text-4xl  font-bold tracking-wider bg-gradient-to-b text-transparent bg-clip-text from-[#EFAF00]  to-yellow-800 raamya-font ">RAAMYA</h2>
                        <p className="text-base">
                           One Brand. Five Personalities. Infinite You. ✨
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Icons with hover effect */}
                            <a href="#" className="w-9 h-9 bg-white rounded-full flex hover:scale-110 items-center transition-all duration-300 justify-center group">
                                <div className="filter grayscale  group-hover:grayscale-0 transition duration-300">
                                    <TwitterIcon />
                                </div>
                            </a>
                            <a href="#" className="w-9 h-9 bg-white rounded-full flex hover:scale-110 items-center transition-all duration-300 justify-center group">
                                <div className="filter grayscale group-hover:grayscale-0 transition duration-300">
                                    <LinkedinIcon />
                                </div>
                            </a>
                            <a href="#" className="w-9 h-9 bg-white rounded-full flex hover:scale-110 items-center transition-all duration-300 justify-center group">
                                <div className="filter grayscale group-hover:grayscale-0 transition duration-300">
                                    <MailIcon />
                                </div>
                            </a>
                            <Link href={'https://www.instagram.com/raamya___?igsh=MWpiNTFoa2NuM29maQ=='} target='_blank' className="w-9 h-9 bg-white rounded-full flex hover:scale-110 items-center transition-all duration-300 justify-center group">
                                <div className="filter grayscale group-hover:grayscale-0 transition duration-300">
                                    <InstagramIcon />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Contact Us */}
                    <div>
                        <h3 className="text-[#FFBB00] font-bold text-lg tracking-wider mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-base">
                            <li><span className="font-semibold text-[#FFBB00]">Email:</span> support@raamya.net.in</li>
                            <li><span className="font-semibold text-[#FFBB00]">Mob:</span> +91-8950566899</li>
                            <li><span className="font-semibold text-[#FFBB00]">Opening Hours:</span> Mon to Sat: 10:30 AM - 6:30 PM</li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h3 className="text-[#FFBB00] text-lg font-bold tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2 text-base">
                            <li><Link href="/aboutus" className="hover:text-[#EFAF00] transition">About Us</Link></li>
                            <li><Link href="/contactus" className="hover:text-[#EFAF00] transition">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-[#EFAF00] transition">FAQ's</Link></li>
                            <li><Link href="/exchangemyorder" className="hover:text-[#EFAF00] transition">Exchange My Order</Link></li>
                            <li><Link href="/exchangepolicy" className="hover:text-[#EFAF00] transition">Exchange Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Policies */}
                    <div>
                        <h3 className="text-[#FFBB00] text-lg font-bold tracking-wider mb-4">Policies</h3>
                        <ul className="space-y-2 text-base">
                            <li><Link href="/privacypolicy" className="hover:text-[#EFAF00] transition">Privacy Policy</Link></li>
                            <li><Link href="/shippingpolicy" className="hover:text-[#EFAF00] transition">Shipping & Delivery Policy</Link></li>
                            <li><Link href="/exchangepolicy" className="hover:text-[#EFAF00] transition">Exchange Policy</Link></li>
                            <li><Link href="/termsandconditions" className="hover:text-[#EFAF00] transition">Terms & Conditions</Link></li>
                            <li><Link href="/exchangemyorder" className="hover:text-[#EFAF00] transition">Exchange My Order</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className=' bg-[#FFBB00] h-0.5 w-full  '></div>

                {/* Bottom section */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm px-10 py-5">
                    <p className="text-center sm:text-left  sm:mb-0">
                        © 2025 RAAMYA. All Rights Reserved.
                        <Link href="/termsandconditions" className="text-[#EFAF00] hover:underline ">Terms and Conditions applied</Link> | <Link href="/exchangepolicy" className="text-[#EFAF00] hover:underline ">Exchange Policy</Link> | Made in India 
                        {/* <Image width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/800px-Flag_of_India.svg.png?20240117202436" alt="Visa" className="h-8 w-14 bg-white p-1 hover:scale-110  transition-all duration-300  object-contain" /> */}
                    </p>
                    <div className="flex items-center space-x-4">
                        {/* Payment Icons */}
                        <Image width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8 w-14 bg-white p-1 hover:scale-110  transition-all duration-300  object-contain" />
                        <Image width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/UPI_logo.svg/1200px-UPI_logo.svg.png" alt="UPI" className="h-8 w-14 bg-white p-1 hover:scale-110  transition-all duration-300  object-contain" />
                        <Image width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1280px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-8 w-14 bg-white p-1 hover:scale-110  transition-all duration-300 object-contain" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


