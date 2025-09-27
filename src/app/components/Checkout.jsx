'use client';
import React, { useState, useMemo, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster component
import Lottie from 'lottie-react';
import Loader from '../../../public/lottie/Loading.json';
/**
 * To use toast notifications, you need to install the library first:
 *
 * npm install react-hot-toast
 * // or
 * yarn add react-hot-toast
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- SUB-COMPONENTS ---
const OrderSummaryItem = ({ item }) => (
    <div className="flex items-center space-x-4 mb-6 font-redhead">
        <div className="w-20 h-24 bg-gray-700 rounded-md">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
        </div>
        <div className="flex-1">
            <p className="text-[#EFAF00]">{item.name}</p>
            <p className="text-sm text-gray-400">Qty: {item.qty}</p>
        </div>
        <p className="text-[#EFAF00]">Rs {(item.price * item.qty).toLocaleString()}</p>
    </div>
);

const PaymentOption = ({ title, children, isActive, onClick }) => (
    <div className="border border-[#EFAF00]  rounded-md font-redhead">
        <button type="button" onClick={onClick} className="w-full cursor-pointer flex justify-between items-center p-4 text-left">
            <div className="flex items-center">
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${isActive ? 'border-[#EFAF00]' : 'border-gray-500'}`}>{isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#EFAF00]"></span>}</span>
                <span>{title}</span>
            </div>
        </button>
        {isActive && <div className="p-4 border-t border-[#EFAF00]/50">{children}</div>}
    </div>
);

const AddressModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({ label: 'Home', name: '', phone: '', street: '', city: '', state: '', postalCode: '', country: 'India' });
    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md border border-gray-700 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl">&times;</button>
                <h2 className="text-2xl font-bold text-[#EFAF00] mb-6 font-redhead">ADD NEW ADDRESS</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="label" placeholder="Address Label (e.g., Home, Work)" value={formData.label} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-[#EFAF00] cursor-pointer text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500">SAVE ADDRESS</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// New dialog component
const ComingSoonDialog = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-lg p-8 w-full max-w-lg text-center border border-gray-700 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl">&times;</button>
            <h3 className="text-2xl font-bold text-[#EFAF00] mb-4 font-redhead">UPI Payments</h3>
            <p className="text-gray-300 mb-6">We're sorry, UPI payments are currently unavailable.</p>
            <p className="text-gray-300">This feature will be coming in 7 days!</p>
            <button onClick={onClose} className="mt-6 bg-[#EFAF00] text-black font-bold py-2 px-6 cursor-pointer rounded-lg hover:bg-yellow-500">OK</button>
        </div>
    </div>
);

// --- MAIN CHECKOUT PAGE COMPONENT ---
export default function CheckoutPage() {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // Replaced useRouter with a simple navigation function for standalone use
    const navigateTo = (path) => {
        window.location.href = path;
    };
    const [activePaymentMethod, setActivePaymentMethod] = useState('COD');
    const [contactDetails, setContactDetails] = useState({ firstName: '', lastName: '', phone: '', email: '' });
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [showUpiDialog, setShowUpiDialog] = useState(false);

    useEffect(() => {
        const loadPageData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                navigateTo('/login');
                return;
            }

            const itemsFromSession = sessionStorage.getItem('checkoutItems');
            if (itemsFromSession) {
                const parsedItems = JSON.parse(itemsFromSession);
                if (parsedItems && parsedItems.length > 0) {
                    setOrderItems(parsedItems);
                } else {
                    toast.error("Please select items from your cart to check out.");
                    navigateTo('/cart');
                    return;
                }
            } else {
                toast.error("Please select items from your cart to check out.");
                navigateTo('/cart');
                return;
            }

            try {
                const userRes = await fetch(`${API_BASE_URL}/users/me`, { headers: { 'Authorization': `Bearer ${token}` } });
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setContactDetails(prev => ({ ...prev, firstName: userData.name.split(' ')[0] || '', lastName: userData.name.split(' ').slice(1).join(' ') || '', email: userData.email }));
                    setSavedAddresses(userData.addresses || []);
                    if (userData.addresses && userData.addresses.length > 0) {
                        setSelectedAddressId(userData.addresses[0]._id);
                    }
                }
            } catch (err) {
                setError("Could not load your user details.");
            } finally {
                setLoading(false);
            }
        };

        loadPageData();
    }, []); // Removed router from dependencies, as it's no longer a dependency

    const handleContactChange = (e) => setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });

    const { subtotal, shipping, total } = useMemo(() => {
        const sub = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
        const ship = sub > 1600 ? 0 : 99;
        return { subtotal: sub, shipping: ship, total: sub + ship };
    }, [orderItems]);

    const handleSaveNewAddress = async (formData) => {
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE_URL}/users/me/addresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            const updatedAddresses = await res.json();
            if (!res.ok) {
                throw new Error(updatedAddresses.message || "Failed to save address");
            }
            console.log('Received updated addresses:', updatedAddresses);
            setSavedAddresses(updatedAddresses);
            setSelectedAddressId(updatedAddresses[updatedAddresses.length - 1]._id);
            setIsAddressModalOpen(false);
            toast.success("Address saved successfully!");
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }
    };

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        if (!selectedAddressId) {
            toast.error("Please select a shipping address.");
            return;
        }
        const token = localStorage.getItem('authToken');
        setLoading(true);
        const finalShippingAddress = savedAddresses.find(addr => addr._id === selectedAddressId);

        console.log('Verifying order items before sending:', orderItems);
        console.log("--- BROWSER IS SENDING THIS DATA ---", JSON.stringify(orderItems, null, 2));

        const sanitizedOrderItems = orderItems.map(item => ({
            ...item,
            product: item.product || item._id,
        }));

        const invalidItem = sanitizedOrderItems.find(item => !item.product || !item.size);
        if (invalidItem) {
            toast.error(`Error: The item "${invalidItem.name}" is missing critical information (like size or product ID). Please remove it from your session and add it again from the product page.`);
            console.error("Invalid item found:", invalidItem);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    orderItems: sanitizedOrderItems,
                    shippingAddress: {
                        fullName: contactDetails.firstName + ' ' + contactDetails.lastName,
                        phone: contactDetails.phone,
                        address: finalShippingAddress.street,
                        city: finalShippingAddress.city,
                        state: finalShippingAddress.state,
                        postalCode: finalShippingAddress.postalCode,
                        country: finalShippingAddress.country,
                    },
                    paymentMethod: activePaymentMethod,
                    shippingPrice: shipping,
                    totalPrice: total,
                }),
            });
            const createdOrder = await res.json();
            if (!res.ok) {
                throw new Error(createdOrder.message || 'Failed to create order.');
            }

            sessionStorage.removeItem('checkoutItems');

            if (activePaymentMethod === 'UPI') {
                navigateTo(`/upi-payment/${createdOrder._id}`);
            } else {
                navigateTo(`/payment-status/${createdOrder._id}/success`);
            }
        } catch (err) {
            toast.error(`Error: ${err.message}`);
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-[90vh]">
        <Lottie animationData={Loader} loop={true} className="lg:w-64 lg:h-64 w-40 h-40" />
    </div>;
    if (error) return <div className="text-center text-red-500 py-20">Error: {error}</div>;

    return (
        <div className="bg-black text-[#EFAF00] min-h-screen pt-10 font-redhead">
            <Toaster position="top-center" />
            {isAddressModalOpen && <AddressModal onClose={() => setIsAddressModalOpen(false)} onSave={handleSaveNewAddress} />}
            {showUpiDialog && <ComingSoonDialog onClose={() => setShowUpiDialog(false)} />}
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 tracking-wider uppercase">Checkout</h1>
                <form onSubmit={placeOrderHandler}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column */}
                        <div className="space-y-8">
                            <div className="border border-[#EFAF00] p-6 rounded-md">
                                <h2 className="text-lg font-semibold mb-4 tracking-wide">CONTACT DETAILS</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input type="text" name="firstName" placeholder="First Name" value={contactDetails.firstName} onChange={handleContactChange} required className="w-full bg-black border border-[#EFAF00] rounded-md p-2" />
                                    <input type="text" name="lastName" placeholder="Last Name" value={contactDetails.lastName} onChange={handleContactChange} required className="w-full bg-black border border-[#EFAF00] rounded-md p-2" />
                                </div>
                                <div className="mt-4">
                                    <input type="tel" name="phone" placeholder="Phone number" value={contactDetails.phone} onChange={handleContactChange} required className="w-full bg-black border border-[#EFAF00] rounded-md p-2" />
                                </div>
                                <div className="mt-4">
                                    <input type="email" name="email" placeholder="Email Address" value={contactDetails.email} onChange={handleContactChange} required className="w-full bg-black border border-[#EFAF00] rounded-md p-2" />
                                </div>
                            </div>

                            <div className="border border-[#EFAF00] p-6 rounded-md">
                                <h2 className="text-lg font-semibold mb-4 tracking-wide">SHIPPING ADDRESS</h2>
                                <div className="space-y-4">
                                    {savedAddresses.map(addr => (
                                        <div key={addr._id} onClick={() => setSelectedAddressId(addr._id)} className={`p-4  rounded-md border-2 cursor-pointer ${selectedAddressId === addr._id ? 'border-[#EFAF00] bg-[#EFAF00]/10' : 'border-gray-700'}`}>
                                            <p className="font-bold">{addr.label}</p>
                                            <p className="text-sm text-gray-300">{`${addr.name}, ${addr.street}, ${addr.city}, ${addr.state} - ${addr.postalCode}`}</p>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => setIsAddressModalOpen(true)} className="mt-4 text-[#EFAF00] hover:underline">Add a new address</button>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold tracking-wide text-[#EFAF00]">PAYMENT DETAILS</h2>
                                <PaymentOption title="UPI / QR Code" isActive={activePaymentMethod === 'UPI'} onClick={() => setShowUpiDialog(true)}>
                                    <p className="text-sm text-gray-400">You will be shown a QR Code to scan after placing the order.</p>
                                </PaymentOption>
                                <PaymentOption title="Cash on Delivery" isActive={activePaymentMethod === 'COD'} onClick={() => setActivePaymentMethod('COD')}>
                                    <p className="text-sm text-gray-400">Pay with cash when your order is delivered.</p>
                                </PaymentOption>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="border border-[#EFAF00] p-6 rounded-md h-fit">
                            <h2 className="text-lg font-semibold mb-6 tracking-wide">ORDER SUMMARY</h2>
                            <div className="max-h-[350px] overflow-y-auto pr-2">
                                {orderItems.map((item) => <OrderSummaryItem key={`${item.product || item._id}-${item.size}`} item={item} />)}
                            </div>
                            <div className="mt-8 space-y-3 text-sm">
                                <div>
                                    <div className="flex justify-between"><span>SUBTOTAL</span><span>Rs {subtotal.toLocaleString()}</span></div>
                                    <div className="flex justify-between text-gray-500 text-xs">Including GST</div>
                                </div>

                                <div className="flex justify-between"><span>SHIPPING</span><span>{shipping === 0 ? 'FREE' : `Rs ${shipping}`}</span></div>
                                <div className="flex justify-between text-xl font-bold border-t border-[#EFAF00] pt-3 mt-3"><span>TOTAL</span><span>Rs {total.toLocaleString()}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button type="submit" disabled={loading} className="bg-[#EFAF00] text-black font-bold px-12 py-3 cursor-pointer rounded-md hover:bg-yellow-300 transition-colors text-lg disabled:opacity-50">
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
