// 'use client';
// import React, { useState, useMemo, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// // --- SUB-COMPONENTS ---
// const OrderSummaryItem = ({ item }) => (
//     <div className="flex items-center space-x-4 mb-6 font-redhead">
//         <div className="w-20 h-24 bg-gray-700 rounded-md"><img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" /></div>
//         <div className="flex-1">
//             <p className="text-yellow-400">{item.name}</p>
//             <p className="text-sm text-gray-400">Qty: {item.qty}</p>
//         </div>
//         <p className="text-yellow-400">Rs {(item.price * item.qty).toLocaleString()}</p>
//     </div>
// );

// const PaymentOption = ({ title, children, isActive, onClick }) => (
//     <div className="border border-yellow-400 rounded-md font-redhead">
//         <button type="button" onClick={onClick} className="w-full flex justify-between items-center p-4 text-left">
//             <div className="flex items-center">
//                 <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${isActive ? 'border-yellow-400' : 'border-gray-500'}`}>{isActive && <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>}</span>
//                 <span>{title}</span>
//             </div>
//         </button>
//         {isActive && <div className="p-4 border-t border-yellow-400/50">{children}</div>}
//     </div>
// );

// const AddressModal = ({ onClose, onSave }) => {
//     const [formData, setFormData] = useState({ label: 'Home', name: '', phone: '', street: '', city: '', state: '', postalCode: '', country: 'India' });
//     const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
//     return (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md border border-gray-700 relative">
//                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl">&times;</button>
//                 <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-redhead">ADD NEW ADDRESS</h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input type="text" name="label" placeholder="Address Label (e.g., Home, Work)" value={formData.label} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
//                     <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
//                     <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
//                     <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
//                     <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
//                     <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
//                     <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
//                     <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
//                     <div className="pt-4"><button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500">SAVE ADDRESS</button></div>
//                 </form>
//             </div>
//         </div>
//     );
// };


// // --- MAIN CHECKOUT PAGE COMPONENT ---
// export default function CheckoutPage() {
//     const [cart, setCart] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const router = useRouter();
//     const [activePaymentMethod, setActivePaymentMethod] = useState('UPI');
    
//     const [contactDetails, setContactDetails] = useState({ firstName: '', lastName: '', phone: '', email: '' });
//     const [savedAddresses, setSavedAddresses] = useState([]);
//     const [selectedAddressId, setSelectedAddressId] = useState(null);
//     const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

//     useEffect(() => {
//         const fetchInitialData = async () => {
//             const token = localStorage.getItem('authToken');
//             if (!token) { router.push('/login'); return; }
//             try {
//                 const [cartRes, userRes] = await Promise.all([
//                     fetch('http://localhost:5001/api/cart', { headers: { 'Authorization': `Bearer ${token}` } }),
//                     fetch('http://localhost:5001/api/users/me', { headers: { 'Authorization': `Bearer ${token}` } })
//                 ]);

//                 if (!cartRes.ok) throw new Error('Failed to fetch cart.');
//                 const cartData = await cartRes.json();
//                 if (!cartData.items || cartData.items.length === 0) { router.push('/cart'); return; }
//                 setCart(cartData);

//                 if (userRes.ok) {
//                     const userData = await userRes.json();
//                     setContactDetails(prev => ({ ...prev, firstName: userData.name.split(' ')[0] || '', lastName: userData.name.split(' ').slice(1).join(' ') || '', email: userData.email }));
//                     setSavedAddresses(userData.addresses || []);
//                     if (userData.addresses && userData.addresses.length > 0) {
//                         setSelectedAddressId(userData.addresses[0]._id); // Pre-select the first address
//                     }
//                 }
//             } catch (err) { setError(err.message); } 
//             finally { setLoading(false); }
//         };
//         fetchInitialData();
//     }, [router]);
    
//     const handleContactChange = (e) => setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });

//     const { subtotal, shipping, total } = useMemo(() => {
//         const sub = cart?.items.reduce((sum, item) => sum + item.price * item.qty, 0) || 0;
//         const ship = sub > 2000 ? 0 : 150;
//         return { subtotal: sub, shipping: ship, total: sub + ship };
//     }, [cart]);

//     const handleSaveNewAddress = async (formData) => {
//         const token = localStorage.getItem('authToken');
//         try {
//             const res = await fetch('http://localhost:5001/api/users/me/addresses', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
//                 body: JSON.stringify(formData)
//             });
//             const updatedAddresses = await res.json();
//             if (!res.ok) throw new Error(updatedAddresses.message || "Failed to save address");
//             setSavedAddresses(updatedAddresses);
//             setSelectedAddressId(updatedAddresses[updatedAddresses.length - 1]._id); // Select the new address
//             setIsAddressModalOpen(false);
//         } catch (err) {
//             alert(`Error: ${err.message}`);
//         }
//     };

//     const placeOrderHandler = async (e) => {
//         e.preventDefault();
//         if (!selectedAddressId) {
//             alert("Please select a shipping address.");
//             return;
//         }
//         const token = localStorage.getItem('authToken');
//         setLoading(true);

//         const finalShippingAddress = savedAddresses.find(addr => addr._id === selectedAddressId);
        
//         try {
//             const res = await fetch('http://localhost:5001/api/orders', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//                 body: JSON.stringify({
//                     orderItems: cart.items,
//                     shippingAddress: {
//                         fullName: contactDetails.firstName + ' ' + contactDetails.lastName,
//                         phone: contactDetails.phone,
//                         address: finalShippingAddress.street,
//                         city: finalShippingAddress.city,
//                         state: finalShippingAddress.state,
//                         postalCode: finalShippingAddress.postalCode,
//                         country: finalShippingAddress.country,
//                     },
//                     paymentMethod: activePaymentMethod,
//                     shippingPrice: shipping,
//                     totalPrice: total,
//                 }),
//             });
//             const createdOrder = await res.json();
//             if (!res.ok) throw new Error(createdOrder.message || 'Failed to create order.');

//             if (activePaymentMethod === 'UPI') {
//                 router.push(`/upi-payment/${createdOrder._id}`);
//             } else { // Cash on Delivery
//                 router.push(`/payment-status/${createdOrder._id}/success`);
//             }
//         } catch (err) {
//             setError(err.message);
//             setLoading(false);
//         }
//     };

//     if (loading) return <div className="text-center text-white py-20">Loading Checkout...</div>;
//     if (error) return <div className="text-center text-red-500 py-20">Error: {error}</div>;

//     return (
//         <div className="bg-black text-yellow-400 min-h-screen pt-10 font-redhead">
//             {isAddressModalOpen && <AddressModal onClose={() => setIsAddressModalOpen(false)} onSave={handleSaveNewAddress} />}
//             <div className="max-w-7xl mx-auto px-4">
//                 <h1 className="text-4xl font-bold mb-8 tracking-wider uppercase">Checkout</h1>
//                 <form onSubmit={placeOrderHandler}>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//                         {/* Left Column */}
//                         <div className="space-y-8">
//                             <div className="border border-yellow-400 p-6 rounded-md">
//                                 <h2 className="text-lg font-semibold mb-4 tracking-wide">CONTACT DETAILS</h2>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     <input type="text" name="firstName" placeholder="First Name" value={contactDetails.firstName} onChange={handleContactChange} required className="w-full bg-black border border-yellow-400 rounded-md p-2" />
//                                     <input type="text" name="lastName" placeholder="Last Name" value={contactDetails.lastName} onChange={handleContactChange} required className="w-full bg-black border border-yellow-400 rounded-md p-2" />
//                                 </div>
//                                 <div className="mt-4"><input type="tel" name="phone" placeholder="Phone number" value={contactDetails.phone} onChange={handleContactChange} required className="w-full bg-black border border-yellow-400 rounded-md p-2" /></div>
//                                 <div className="mt-4"><input type="email" name="email" placeholder="Email Address" value={contactDetails.email} onChange={handleContactChange} required className="w-full bg-black border border-yellow-400 rounded-md p-2" /></div>
//                             </div>

//                             <div className="border border-yellow-400 p-6 rounded-md">
//                                 <h2 className="text-lg font-semibold mb-4 tracking-wide">SHIPPING ADDRESS</h2>
//                                 <div className="space-y-4">
//                                     {savedAddresses.map(addr => (
//                                         <div key={addr._id} onClick={() => setSelectedAddressId(addr._id)} className={`p-4 rounded-md border-2 cursor-pointer ${selectedAddressId === addr._id ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-700'}`}>
//                                             <p className="font-bold">{addr.label}</p>
//                                             <p className="text-sm text-gray-300">{`${addr.name}, ${addr.street}, ${addr.city}, ${addr.state} - ${addr.postalCode}`}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <button type="button" onClick={() => setIsAddressModalOpen(true)} className="mt-4 text-yellow-400 hover:underline">Add a new address</button>
//                             </div>
                            
//                             <div className="space-y-4">
//                                 <h2 className="text-lg font-semibold tracking-wide text-yellow-400">PAYMENT DETAILS</h2>
//                                 <PaymentOption title="UPI / QR Code" isActive={activePaymentMethod === 'UPI'} onClick={() => setActivePaymentMethod('UPI')}><p className="text-sm text-gray-400">You will be shown a QR Code to scan after placing the order.</p></PaymentOption>
//                                 <PaymentOption title="Cash on Delivery" isActive={activePaymentMethod === 'COD'} onClick={() => setActivePaymentMethod('COD')}><p className="text-sm text-gray-400">Pay with cash when your order is delivered.</p></PaymentOption>
//                             </div>
//                         </div>

//                         {/* Right Column */}
//                         <div className="border border-yellow-400 p-6 rounded-md h-fit">
//                             <h2 className="text-lg font-semibold mb-6 tracking-wide">ORDER SUMMARY</h2>
//                             <div className="max-h-[350px] overflow-y-auto pr-2">
//                                 {cart && cart.items.map((item) => <OrderSummaryItem key={`${item.product}-${item.size}`} item={item} />)}
//                             </div>
//                             <div className="mt-8 space-y-3 text-sm">
//                                 <div className="flex justify-between"><span>SUBTOTAL</span><span>Rs {subtotal.toLocaleString()}</span></div>
//                                 <div className="flex justify-between"><span>SHIPPING</span><span>{shipping === 0 ? 'FREE' : `Rs ${shipping}`}</span></div>
//                                 <div className="flex justify-between text-xl font-bold border-t border-yellow-400 pt-3 mt-3"><span>TOTAL</span><span>Rs {total.toLocaleString()}</span></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex justify-end mt-8">
//                         <button type="submit" disabled={loading} className="bg-yellow-400 text-black font-bold px-12 py-3 cursor-pointer rounded-md hover:bg-yellow-300 transition-colors text-lg disabled:opacity-50">
//                             {loading ? 'Processing...' : 'Place Order'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// --- SUB-COMPONENTS ---
const OrderSummaryItem = ({ item }) => (
    <div className="flex items-center space-x-4 mb-6 font-redhead">
        <div className="w-20 h-24 bg-gray-700 rounded-md"><img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" /></div>
        <div className="flex-1">
            <p className="text-yellow-400">{item.name}</p>
            <p className="text-sm text-gray-400">Qty: {item.qty}</p>
        </div>
        <p className="text-yellow-400">Rs {(item.price * item.qty).toLocaleString()}</p>
    </div>
);

const PaymentOption = ({ title, children, isActive, onClick }) => (
    <div className="border border-yellow-400 rounded-md font-redhead">
        <button type="button" onClick={onClick} className="w-full flex justify-between items-center p-4 text-left">
            <div className="flex items-center">
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${isActive ? 'border-yellow-400' : 'border-gray-500'}`}>{isActive && <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>}</span>
                <span>{title}</span>
            </div>
        </button>
        {isActive && <div className="p-4 border-t border-yellow-400/50">{children}</div>}
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
                <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-redhead">ADD NEW ADDRESS</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="label" placeholder="Address Label (e.g., Home, Work)" value={formData.label} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                    <div className="pt-4"><button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500">SAVE ADDRESS</button></div>
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
            <h3 className="text-2xl font-bold text-yellow-400 mb-4 font-redhead">UPI Payments</h3>
            <p className="text-gray-300 mb-6">We're sorry, UPI payments are currently unavailable.</p>
            <p className="text-gray-300">This feature is coming soon!</p>
            <button onClick={onClose} className="mt-6 bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500">OK</button>
        </div>
    </div>
);


// --- MAIN CHECKOUT PAGE COMPONENT ---
export default function CheckoutPage() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const [activePaymentMethod, setActivePaymentMethod] = useState('COD');
    
    const [contactDetails, setContactDetails] = useState({ firstName: '', lastName: '', phone: '', email: '' });
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [showUpiDialog, setShowUpiDialog] = useState(false); // New state for dialog

    useEffect(() => {
        const fetchInitialData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) { router.push('/login'); return; }
            try {
                const [cartRes, userRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/cart`, { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch(`${API_BASE_URL}/users/me`, { headers: { 'Authorization': `Bearer ${token}` } })
                ]);

                if (!cartRes.ok) throw new Error('Failed to fetch cart.');
                const cartData = await cartRes.json();
                if (!cartData.items || cartData.items.length === 0) { router.push('/cart'); return; }
                setCart(cartData);

                if (userRes.ok) {
                    const userData = await userRes.json();
                    setContactDetails(prev => ({ ...prev, firstName: userData.name.split(' ')[0] || '', lastName: userData.name.split(' ').slice(1).join(' ') || '', email: userData.email }));
                    setSavedAddresses(userData.addresses || []);
                    if (userData.addresses && userData.addresses.length > 0) {
                        setSelectedAddressId(userData.addresses[0]._id); // Pre-select the first address
                    }
                }
            } catch (err) { setError(err.message); } 
            finally { setLoading(false); }
        };
        fetchInitialData();
    }, [router]);
    
    const handleContactChange = (e) => setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });

    const { subtotal, shipping, total } = useMemo(() => {
        const sub = cart?.items.reduce((sum, item) => sum + item.price * item.qty, 0) || 0;
        const ship = sub > 2000 ? 0 : 150;
        return { subtotal: sub, shipping: ship, total: sub + ship };
    }, [cart]);

    const handleSaveNewAddress = async (formData) => {
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE_URL}/users/me/addresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify(formData)
            });
            const updatedAddresses = await res.json();
            if (!res.ok) throw new Error(updatedAddresses.message || "Failed to save address");
            setSavedAddresses(updatedAddresses);
            setSelectedAddressId(updatedAddresses[updatedAddresses.length - 1]._id); // Select the new address
            setIsAddressModalOpen(false);
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        if (!selectedAddressId) {
            alert("Please select a shipping address.");
            return;
        }
        const token = localStorage.getItem('authToken');
        setLoading(true);

        const finalShippingAddress = savedAddresses.find(addr => addr._id === selectedAddressId);
        
        try {
            const res = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    orderItems: cart.items,
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
            if (!res.ok) throw new Error(createdOrder.message || 'Failed to create order.');

            if (activePaymentMethod === 'UPI') {
                router.push(`/upi-payment/${createdOrder._id}`);
            } else { // Cash on Delivery
                router.push(`/payment-status/${createdOrder._id}/success`);
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center text-yellow-400 font-redhead text-white py-20">Loading Checkout...</div>;
    if (error) return <div className="text-center text-red-500 py-20">Error: {error}</div>;

    return (
        <div className="bg-black text-yellow-400 min-h-screen pt-10 font-redhead">
            {isAddressModalOpen && <AddressModal onClose={() => setIsAddressModalOpen(false)} onSave={handleSaveNewAddress} />}
            {showUpiDialog && <ComingSoonDialog onClose={() => setShowUpiDialog(false)} />}
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 tracking-wider uppercase">Checkout</h1>
                <form onSubmit={placeOrderHandler}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column */}
                        <div className="space-y-8">
                            <div className="border border-yellow-400 p-6 rounded-md">
                                <h2 className="text-lg font-semibold mb-4 tracking-wide">CONTACT DETAILS</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input type="text" name="firstName" placeholder="First Name" value={contactDetails.firstName} onChange={handleContactChange} required className="w-full bg-black border border-yellow-400 rounded-md p-2" />
                                    <input type="text" name="lastName" placeholder="Last Name" value={contactDetails.lastName} onChange={handleContactChange} required className="w-full bg-black border border-yellow-400 rounded-md p-2" />
                                </div>
                                <div className="mt-4"><input type="tel" name="phone" placeholder="Phone number" value={contactDetails.phone} onChange={handleContactChange} required className="w-full bg-black border border-yellow-400 rounded-md p-2" /></div>
                                <div className="mt-4"><input type="email" name="email" placeholder="Email Address" value={contactDetails.email} onChange={handleContactChange} required className="w-full bg-black border border-yellow-400 rounded-md p-2" /></div>
                            </div>

                            <div className="border border-yellow-400 p-6 rounded-md">
                                <h2 className="text-lg font-semibold mb-4 tracking-wide">SHIPPING ADDRESS</h2>
                                <div className="space-y-4">
                                    {savedAddresses.map(addr => (
                                        <div key={addr._id} onClick={() => setSelectedAddressId(addr._id)} className={`p-4 rounded-md border-2 cursor-pointer ${selectedAddressId === addr._id ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-700'}`}>
                                            <p className="font-bold">{addr.label}</p>
                                            <p className="text-sm text-gray-300">{`${addr.name}, ${addr.street}, ${addr.city}, ${addr.state} - ${addr.postalCode}`}</p>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => setIsAddressModalOpen(true)} className="mt-4 text-yellow-400 hover:underline">Add a new address</button>
                            </div>
                            
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold tracking-wide text-yellow-400">PAYMENT DETAILS</h2>
                                <PaymentOption title="UPI / QR Code" isActive={activePaymentMethod === 'UPI'} onClick={() => setShowUpiDialog(true)}><p className="text-sm text-gray-400">You will be shown a QR Code to scan after placing the order.</p></PaymentOption>
                                <PaymentOption title="Cash on Delivery" isActive={activePaymentMethod === 'COD'} onClick={() => setActivePaymentMethod('COD')}><p className="text-sm text-gray-400">Pay with cash when your order is delivered.</p></PaymentOption>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="border border-yellow-400 p-6 rounded-md h-fit">
                            <h2 className="text-lg font-semibold mb-6 tracking-wide">ORDER SUMMARY</h2>
                            <div className="max-h-[350px] overflow-y-auto pr-2">
                                {cart && cart.items.map((item) => <OrderSummaryItem key={`${item.product}-${item.size}`} item={item} />)}
                            </div>
                            <div className="mt-8 space-y-3 text-sm">
                                <div className="flex justify-between"><span>SUBTOTAL</span><span>Rs {subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>SHIPPING</span><span>{shipping === 0 ? 'FREE' : `Rs ${shipping}`}</span></div>
                                <div className="flex justify-between text-xl font-bold border-t border-yellow-400 pt-3 mt-3"><span>TOTAL</span><span>Rs {total.toLocaleString()}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button type="submit" disabled={loading} className="bg-yellow-400 text-black font-bold px-12 py-3 cursor-pointer rounded-md hover:bg-yellow-300 transition-colors text-lg disabled:opacity-50">
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}