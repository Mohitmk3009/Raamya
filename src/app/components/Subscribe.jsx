'use client'
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useContentProtection } from '../hooks/useContentProtection';
// It's good practice to define this in your .env file
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const Subscribe = () => {
    useContentProtection();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        const toastId = toast.loading('Subscribing...');

        try {
            const res = await fetch(`${API_BASE_URL}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                // The backend provides a specific error message, which we display
                throw new Error(data.message || 'Something went wrong.');
            }

            toast.success(data.message, { id: toastId });
            setEmail(''); // Clear the input field on success

        } catch (error) {
            toast.error(error.message, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="relative w-full h-[30vh] lg:min-h-[400px] my-12 md:my-20 bg-cover bg-center bg-no-repeat flex items-center bg-black font-redhead justify-center select-none touch-action-manipulation"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1744526313164-57e293bf8033?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
            {/* Add Toaster component here to make notifications visible */}
            <Toaster position="top-center" />
            
            <div className="relative z-10 w-full h-full flex items-center justify-center text-center flex-col p-5 sm:p-6 bg-black/70 ">

                <h2 className="text-[#EFAF00] font-bold text-2xl sm:text-4xl md:text-5xl mx-auto leading-tight max-w-2xl">
                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                </h2>

                <form
                    className="mt-8 mx-auto flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg"
                    onSubmit={handleSubmit}
                >
                    <div className="flex items-center border border-[#EFAF00] rounded-xl w-full sm:flex-grow">
                        <input
                            type="email"
                            name="email"
                            placeholder="YOUR E-MAIL ADDRESS"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent py-3 px-4 text-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#EFAF00] text-gray-900 cursor-pointer font-bold py-3 px-8 rounded-xl hover:bg-amber-500 transition-colors duration-300 w-full sm:w-auto disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {loading ? '...' : 'SUBSCRIBE'}
                    </button>
                </form>

            </div>
        </section>
    );
};

export default Subscribe;
