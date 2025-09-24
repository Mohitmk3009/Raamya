'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- CANCEL ORDER MODAL COMPONENT ---
const CancelOrderModal = ({ onClose, onConfirm }) => {
    const [reason, setReason] = useState('');
    const [otherDetails, setOtherDetails] = useState('');

    const reasons = [
        "Ordered by mistake",
        "Item not required anymore",
        "Found a better price elsewhere",
        "Delivery is delayed",
        "Other"
    ];

    const handleConfirm = () => {
        if (!reason) {
            alert('Please select a reason for cancellation.');
            return;
        }
        if (reason === 'Other' && !otherDetails.trim()) {
            alert('Please provide details for your cancellation reason.');
            return;
        }
        const finalReason = reason === 'Other' ? otherDetails.trim() : reason;
        onConfirm({ reason: finalReason, details: '' });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 w-full max-w-lg border border-gray-700 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl">&times;</button>
                <h2 className="text-2xl font-bold text-red-400 mb-4 font-redhead">CANCEL ORDER</h2>
                <p className="text-gray-400 mb-6">Please tell us why you are cancelling this order. This information will help us improve our service.</p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-white mb-2 text-sm" htmlFor="cancelReason">Reason for Cancellation *</label>
                        <select
                            id="cancelReason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                        >
                            <option value="" disabled>-- Select a reason --</option>
                            {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>

                    {reason === 'Other' && (
                        <div>
                            <label className="block text-white mb-2 text-sm" htmlFor="otherDetails">Please specify:</label>
                            <textarea
                                id="otherDetails"
                                value={otherDetails}
                                onChange={(e) => setOtherDetails(e.target.value)}
                                rows="3"
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                                placeholder="Please provide details about your cancellation reason."
                                required
                            />
                        </div>
                    )}
                    <div className="pt-4 flex gap-4">
                        <button onClick={handleConfirm} className="w-full bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">CONFIRM CANCELLATION</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MAIN ORDER DETAILS PAGE COMPONENT (UPDATED) ---
export default function OrderDetailsPage({ params }) {
    const { orderId } = use(params);
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                router.push('/login');
                return;
            }
            try {
                const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || 'Failed to fetch order details.');
                }
                const data = await res.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId, router]);

    const handleCancelOrder = async ({ reason, details }) => {
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ reason, details })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to cancel order.');
            }
            setOrder(prevOrder => ({ ...prevOrder, status: 'Cancelled' }));
            setIsCancelModalOpen(false);
            alert('Order has been cancelled successfully.');
        } catch (err) {
            console.error('Error in handleCancelOrder:', err);
            alert(`Error: ${err.message}`);
        }
    };

    // --- NEW: Enhanced status function ---
    const getOrderStatus = (order) => {
        // If an exchange request exists, its status takes priority
        if (order.status === 'Delivered' && order.exchangeRequest) {
            switch (order.exchangeRequest.status) {
                case 'Pending':
                    return { text: 'Exchange Pending', className: 'bg-blue-500/20 text-blue-400' };
                case 'Approved':
                    return { text: 'Exchange Approved', className: 'bg-teal-500/20 text-teal-400' };
                case 'Rejected':
                    return { text: 'Exchange Rejected', className: 'bg-red-500/20 text-red-400' };
                case 'Completed':
                    return { text: 'Exchange Completed', className: 'bg-green-500/20 text-green-400' };
                default:
                    // Fallback for any other exchange statuses
                    return { text: 'Exchange in Process', className: 'bg-gray-500/20 text-gray-400' };
            }
        }

        // Default status logic if no exchange is active
        switch (order.status) {
            case 'Processing':
                return { text: 'Processing', className: 'bg-yellow-500/20 text-yellow-400' };
            case 'Shipped':
                return { text: 'Shipped', className: 'bg-blue-500/20 text-blue-400' };
            case 'Delivered':
                return { text: 'Delivered', className: 'bg-green-500/20 text-green-400' };
            case 'Cancelled':
                return { text: 'Cancelled', className: 'bg-red-500/20 text-red-400' };
            default:
                return { text: order.status, className: 'bg-gray-500/20 text-gray-400' };
        }
    };


    const handleCancelClick = () => {
        const currentHoursSinceOrder = (new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 60 * 60);
        if (currentHoursSinceOrder >= 24) {
            alert("Sorry, orders can only be cancelled within 24 hours of placement.");
            window.location.reload();
        } else {
            setIsCancelModalOpen(true);
        }
    };

    if (loading) return <div className="text-center text-white py-20 bg-black min-h-screen">Loading Order Details...</div>;
    if (error) return <div className="text-center text-red-500 py-20 bg-black min-h-screen">{error}</div>;
    if (!order) return <div className="text-center text-gray-500 py-20 bg-black min-h-screen">Order not found.</div>;

    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const hoursSinceOrder = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
    const isCancellable = hoursSinceOrder < 24;

    // Get the dynamic status info
    const orderStatusInfo = getOrderStatus(order);

    return (
        <div className="bg-black text-white min-h-screen pt-12 font-redhead">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-8">
                    <p className="text-sm text-gray-400">
                        <Link href="/myaccount" className="hover:text-yellow-400">My Account</Link> &gt; <span>Order Details</span>
                    </p>
                    <h1 className="lg:text-4xl text-xl font-extrabold text-yellow-400 mt-2">ORDER #{order._id}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-gray-900 p-6 h-fit rounded-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-6">ORDER ITEMS ({order.orderItems.length})</h2>
                        <div className="space-y-4">
                            {order.orderItems.map(item => (
                                <div key={item._id} className="flex items-center gap-4 border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                                    <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md object-cover" />
                                    <div className="flex-grow">
                                        <p className="font-bold text-white">{item.name}</p>
                                        <p className="text-sm text-gray-400">Qty: {item.qty}</p>
                                    </div>
                                    <p className="font-semibold text-white">&#8377;{((item.price || 0) * (item.qty || 0)).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 self-start">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-6">SUMMARY</h2>
                        <div className="space-y-3 text-white">
                            {/* --- UPDATED STATUS DISPLAY --- */}
                            <div className="flex justify-between">
                                <span className="text-gray-400">Order Status:</span>
                                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${orderStatusInfo.className}`}>
                                    {orderStatusInfo.text}
                                </span>
                            </div>
                            <div className="flex justify-between"><span className="text-gray-400">Payment:</span> <span className={`font-semibold ${order.isPaid ? 'text-green-400' : 'text-red-400'}`}>{order.isPaid ? 'Paid' : 'Not Paid'}</span></div>

                            <div className="flex justify-between">
                                <span className="text-gray-400">Order Placed:</span>
                                <span className="text-right">
                                    <p>
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </span>
                            </div>

                            <hr className="border-gray-700 my-4" />
                            <div className="flex justify-between"><span className="text-gray-400">Subtotal:</span> <span>&#8377;{(order.itemsPrice || 0).toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Shipping:</span> <span>&#8377;{(order.shippingPrice || 0).toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Tax:</span> <span>&#8377;{(order.taxPrice || 0).toLocaleString()}</span></div>
                            <hr className="border-gray-700 my-4" />
                            <div className="flex justify-between text-xl font-bold"><span className="text-yellow-400">Total:</span> <span className="text-yellow-400">&#8377;{(order.totalPrice || 0).toLocaleString()}</span></div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-yellow-400 mb-4">SHIPPING ADDRESS</h3>
                            <div className="text-gray-300 leading-relaxed">
                                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                                <p>{order.shippingAddress.phone}</p>
                                <p>{order.shippingAddress.address}, {order.shippingAddress.street}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>

                        {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                            <div className="mt-8">
                                {isCancellable ? (
                                    <button
                                        onClick={handleCancelClick}
                                        className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        CANCEL ORDER
                                    </button>
                                ) : (
                                    <div className="text-center p-3 bg-gray-800 rounded-lg">
                                        <p className="text-gray-400 text-sm">Cancellation window (24 hours) has passed.</p>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* --- CORRECTED LOGIC FOR EXCHANGE BUTTON --- */}
                        {order.status === 'Delivered' && (
                            <div className="mt-8">
                                {/* Check for the existence of the exchangeRequest object */}
                                {order.exchangeRequest ? (
                                    // If an exchange request exists, show a message with its status
                                    <div className="text-center p-3 bg-blue-900/50 border border-blue-700 rounded-lg">
                                        <p className="text-blue-300 text-sm font-semibold">Your exchange request is in process.</p>
                                        <p className="text-xs text-gray-400 mt-1">Status: {order.exchangeRequest.status}</p>
                                    </div>
                                ) : (
                                    // Otherwise, show the exchange button
                                    <Link
                                        href={`/exchangemyorder?orderId=${order._id}`}
                                        className="block w-full text-center bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors"
                                    >
                                        EXCHANGE ORDER
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isCancelModalOpen && <CancelOrderModal onClose={() => setIsCancelModalOpen(false)} onConfirm={handleCancelOrder} />}
        </div>
    );
}