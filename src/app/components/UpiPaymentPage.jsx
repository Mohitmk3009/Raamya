'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import upi from '../../assets/qr.jpg'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function UpiPaymentPage() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    const params = useParams();
    const router = useRouter();
    const { orderId } = params;

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId) return;
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch(`http://localhost:5001/api/orders/${orderId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Could not find your order.');
                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setStatusMessage(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    const checkPaymentStatus = async () => {
        setStatusMessage('Verifying payment, please wait...');
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.isPaid) {
                // Payment confirmed! Redirect to success page.
                router.push(`/payment-status/${orderId}/success`);
            } else {
                setStatusMessage('Payment not yet confirmed by admin. Please try again in a moment.');
            }
        } catch (err) {
            setStatusMessage('Could not verify status. Please contact support.');
        }
    };

    if (loading) return <div className="text-center text-white py-20">Loading Payment Details...</div>;
    if (!order) return <div className="text-center text-red-500 py-20">{statusMessage || 'Order not found.'}</div>;

    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center font-redhead p-4">
            <div className="max-w-md w-full bg-gray-900 border border-amber-400 rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-amber-400 mb-2">Scan to Complete Payment</h1>
                <p className="text-gray-400 mb-6">Use any UPI app to pay the amount below.</p>
                <div className="mb-6">
                    {/* IMPORTANT: Replace this with your actual QR code image */}
                    <Image
                    width={500}
                    height={500} 
                        src={upi} 
                        alt="UPI QR Code" 
                        className="w-64 h-64 mx-auto rounded-lg bg-white p-2"
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between text-2xl font-bold text-amber-400">
                        <span>Amount to Pay:</span>
                        <span>&#8377;{order.totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <button onClick={checkPaymentStatus} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg mt-8 w-full">
                    I Have Paid, Check Status
                </button>
                {statusMessage && <p className="text-sm text-yellow-300 mt-4">{statusMessage}</p>}
            </div>
        </div>
    );
}