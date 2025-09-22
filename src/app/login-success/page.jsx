'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Get the token from the URL query parameters
        const token = searchParams.get('token');

        if (token) {
            // Save the token to the browser's localStorage
            localStorage.setItem('authToken', token);
            
            // Redirect to the homepage. We use window.location.href to force
            // a full page reload, which ensures the Header component updates its state.
            window.location.href = '/'; 

        } else {
            // If for some reason there's no token, send back to the login page
            router.push('/login');
        }
    }, [router, searchParams]);

    // This component just shows a loading message while the logic runs
    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-yellow-400">Login Successful!</h1>
                <p className="mt-2">Please wait, we're redirecting you...</p>
            </div>
        </div>
    );
}

// Wrap the component in Suspense as a best practice for components that use useSearchParams
export default function LoginSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginSuccessContent />
        </Suspense>
    );
}