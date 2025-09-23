'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- CANCEL ORDER MODAL COMPONENT (UPDATED) ---
const CancelOrderModal = ({ onClose, onConfirm }) => {
    const [reason, setReason] = useState('');
    const [otherDetails, setOtherDetails] = useState('');

    const reasons = [
        "Ordered by mistake",
        "Item not required anymore",
        "Found a better price elsewhere",
        "Delivery is delayed",
        "Other" // "Other" option is included here
    ];

    const handleConfirm = () => {
        if (!reason) {
            alert('Please select a reason for cancellation.');
            return;
        }
        // This correctly passes the typed details if "Other" is selected
        onConfirm({ reason, details: reason === 'Other' ? otherDetails : '' });
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
                    
                    {/* --- NEW: Conditional Textbox for "Other" reason --- */}
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
                    {/* --- End of new section --- */}

                    <div className="pt-4 flex gap-4">
                        <button onClick={handleConfirm} className="w-full bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">CONFIRM CANCELLATION</button>
                        {/* <button onClick={onClose} className="w-full bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors">GO BACK</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MAIN ORDER DETAILS PAGE COMPONENT ---
export default function OrderDetailsPage({ params }) {
    const { orderId } = use(params);
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(true);

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
                console.log('Fetched order data:', data);
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

    const getStatusChip = (status) => {
        switch (status) {
            case 'Processing': return 'bg-yellow-500/20 text-yellow-400';
            case 'Shipped': return 'bg-blue-500/20 text-blue-400';
            case 'Delivered': return 'bg-green-500/20 text-green-400';
            case 'Cancelled': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };
    
    if (loading) return <div className="text-center text-white py-20 bg-black min-h-screen">Loading Order Details...</div>;
    if (error) return <div className="text-center text-red-500 py-20 bg-black min-h-screen">{error}</div>;
    if (!order) return <div className="text-center text-gray-500 py-20 bg-black min-h-screen">Order not found.</div>;

    return (
        <div className="bg-black text-white min-h-screen pt-12 font-redhead">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-8">
                    <p className="text-sm text-gray-400">
                        <Link href="/myaccount" className="hover:text-yellow-400">My Account</Link> &gt; <span>Order Details</span>
                    </p>
                    <h1 className="text-4xl font-extrabold text-yellow-400 mt-2">ORDER #{order._id}</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-gray-900 p-6 h-fit rounded-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-yellow-400 mb-6">ORDER ITEMS ({order.orderItems.length})</h2>
                        <div className="space-y-4">
                            {order.orderItems.map(item => (
                                <div key={item._id} className="flex items-center gap-4 border-b border-gray-700 pb-4">
                                    <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md object-cover"/>
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
                            <div className="flex justify-between"><span className="text-gray-400">Order Status:</span> <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusChip(order.status)}`}>{order.status}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Payment:</span> <span className={`font-semibold ${order.isPaid ? 'text-green-400' : 'text-red-400'}`}>{order.isPaid ? 'Paid' : 'Not Paid'}</span></div>
                            <hr className="border-gray-700 my-4" />
                            <div className="flex justify-between"><span className="text-gray-400">Subtotal:</span> <span>&#8377;{(order.itemsPrice || 0).toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Shipping:</span> <span>&#8377;{(order.shippingPrice || 0).toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Tax:</span> <span>&#8377;{(order.taxPrice || 0).toLocaleString()}</span></div>
                            <hr className="border-gray-700 my-4" />
                            <div className="flex justify-between text-xl font-bold"><span className="text-yellow-400">Total:</span> <span className="text-yellow-400">&#8377;{(order.totalPrice || 0).toLocaleString()}</span></div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-yellow-400 mb-4">SHIPPING ADDRESS</h3>
                            <div className="text-gray-300">
                                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                                <p className="font-semibold">{order.shippingAddress.phone}</p>
                                <div className="flex ">
                                    <p >{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                                <p>{order.shippingAddress.state}, {order.shippingAddress.postalCode}</p>
                                </div>
                                <p>{order.shippingAddress.country}</p>
                                
                            </div>
                        </div>

                        {/* --- NEW: Conditional Action Buttons --- */}
                        {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                            <div className="mt-8">
                                <button
                                    onClick={() => setIsCancelModalOpen(true)}
                                    className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    CANCEL ORDER
                                </button>
                            </div>
                        )}

                        {order.status === 'Delivered' && (
                            <div className="mt-8">
                                <Link
                                    href="/exchangemyorder"
                                    className="block w-full text-center bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors"
                                >
                                    EXCHANGE ORDER
                                </Link>
                            </div>
                        )}
                        {/* --- End of new section --- */}
                    </div>
                </div>
            </div>

            {isCancelModalOpen && <CancelOrderModal onClose={() => setIsCancelModalOpen(false)} onConfirm={handleCancelOrder} />}
        </div>
    );
}