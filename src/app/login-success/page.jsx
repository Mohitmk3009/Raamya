'use client';

import React, { useState, useEffect } from 'react';

function LoginSuccessContent() {
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // Get the token from the URL query parameters
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');

        if (token) {
            // Save the token to the browser's localStorage
            localStorage.setItem('authToken', token);
            setShowToast(true);

            // Hide the toast after 3 seconds and then redirect
            const timeoutId = setTimeout(() => {
                setShowToast(false);
                window.location.href = '/'; 
            }, 3000);

            // Cleanup the timeout if the component unmounts
            return () => clearTimeout(timeoutId);

        } else {
            // If for some reason there's no token, send back to the login page
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-yellow-400">Login Successful!</h1>
                <p className="mt-2">Please wait, we're redirecting you...</p>
            </div>
            {showToast && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform animate-fade-in-up z-50">
                    Login Successful!
                </div>
            )}
        </div>
    );
}

// Main page component
export default function LoginSuccessPage() {
    return <LoginSuccessContent />;
}
