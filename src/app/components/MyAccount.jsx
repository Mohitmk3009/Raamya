'use client';

import React, { useState, useEffect } from 'react';
// Replaced next/link with <a> and useRouter with window.location.href for standalone use
import toast, { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import Loader from '../../../public/lottie/Loading.json';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- ICONS ---
const ChevronRightIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -5 34 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"></polyline></svg>);
const ChevronLeftIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5 -5 34 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="15 18 9 12 15 6"></polyline></svg>);

// --- SUB-COMPONENTS ---

const AccountDetails = ({ user }) => {
    const [profileData, setProfileData] = useState({ name: '', email: '', phone: '' });
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

    // We no longer need these state variables
    // const [profileMessage, setProfileMessage] = useState({ text: '', type: '' });
    // const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);
    console.log(user);
    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };
    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Saving profile...'); // Show loading toast
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(profileData),
            });
            const data = await res.json();
            if (!res.ok) { throw new Error(data.message || 'Failed to update profile.'); }
            toast.success('Profile updated successfully!', { id: toastId }); // Update to success toast
        } catch (error) {
            toast.error(error.message, { id: toastId }); // Update to error toast
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Updating password...'); // Show loading toast
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('New passwords do not match.', { id: toastId }); // Update to error toast
            return;
        }
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE_URL}/users/me/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword }),
            });
            const data = await res.json();
            if (!res.ok) { throw new Error(data.message || 'Failed to change password.'); }
            toast.success('Password changed successfully!', { id: toastId }); // Update to success toast
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.message, { id: toastId }); // Update to error toast
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-[#EFAF00] mb-6 font-redhead">ACCOUNT DETAILS</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
                {/* The old message display element has been removed */}
                <div>
                    <label className="block text-white mb-2" htmlFor="name">Display Name *</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" value={profileData.name} onChange={handleProfileChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" required />
                </div>
                <div>
                    <label className="block text-white mb-2" htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" value={profileData.email} onChange={handleProfileChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" required />
                </div>
                <div>
                    <label className="block text-white mb-2" htmlFor="phone">Mobile Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="Your Mobile Number" value={profileData.phone} onChange={handleProfileChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                </div>
                <button type="submit" className="bg-[#EFAF00] text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500">SAVE CHANGES</button>
            </form>
            <form onSubmit={handlePasswordSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-[#EFAF00]">CHANGE PASSWORD</h3>
                {/* The old message display element has been removed */}
                <input type="password" name="oldPassword" placeholder="Current Password" value={passwordData.oldPassword} onChange={handlePasswordChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" required />
                <input type="password" name="newPassword" placeholder="New Password" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" required />
                <input type="password" name="confirmPassword" placeholder="Confirm New Password" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" required />
                <button type="submit" className="bg-[#EFAF00] text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500">CHANGE PASSWORD</button>
            </form>
        </div>
    );
};

const AddressModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({ label: 'Home', name: '', phone: '', street: '', city: '', state: '', postalCode: '', country: 'India' });
    const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-redhead">
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
                    <div className="pt-4"><button type="submit" className="w-full bg-[#EFAF00] text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors">SAVE ADDRESS</button></div>
                </form>
            </div>
        </div>
    );
};

const Address = ({ addresses, onAddNew }) => (
    <div className="w-full ">
        <h2 className="text-2xl font-bold text-[#EFAF00] mb-6 font-redhead">ADDRESS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {addresses.map(addr => (
                <div key={addr._id} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-bold text-[#EFAF00] mb-4 uppercase">{addr.label || 'ADDRESS'}</h3>
                    <p className="text-white">{addr.fullName || addr.name}</p>
                    <p className="text-white">{addr.phone}</p>
                    <p className="text-gray-400">{`${addr.address || addr.street}, ${addr.city}, ${addr.state} - ${addr.postalCode || addr.zipCode}`}</p>
                </div>
            ))}
        </div>
        <button onClick={onAddNew} className="bg-gray-700 text-white font-bold py-2 px-6 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors">ADD NEW</button>
    </div>
);

const Orders = ({ orders }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 8;
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const getStatus = (order) => {
        if (order.hasExchangeRequest) {
            return { text: 'Exchange Requested', className: 'bg-purple-500 text-white' };
        }
        switch (order.status) {
            case 'Cancelled': return { text: 'Cancelled', className: 'bg-red-600 text-white' };
            case 'Delivered': return { text: 'Delivered', className: 'bg-green-500 text-white' };
            case 'Shipped': return { text: 'Shipped', className: 'bg-blue-500 text-white' };
            case 'Processing': default: return { text: 'Processing', className: 'bg-yellow-500 text-black' };
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (!orders || orders.length === 0) {
        return <div className="text-center text-gray-500 py-10"><p>You haven't placed any orders yet.</p></div>;
    }

    return (
        <div className="lg:min-w-[800px] min-w-[360px] w-full ">
            <h2 className="text-2xl font-bold text-[#EFAF00] mb-6 font-redhead">ORDER HISTORY</h2>

            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left text-white align-middle">
                    <thead>
                        <tr className="border-b border-[#EFAF00] text-sm">
                            <th className="py-3 pr-4">ORDER ID</th>
                            <th className="py-3 pr-4">DATE</th>
                            <th className="py-3 pr-4">TOTAL</th>
                            <th className="py-3 pr-4">PAYMENT</th>
                            <th className="py-3 pr-4">STATUS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => {
                            const status = getStatus(order);
                            return (
                                <tr key={order._id} className="border-b border-gray-700">
                                    <td className="py-4 pr-4 font-mono text-xs">{order._id}</td>
                                    <td className="py-4 pr-4 font-bold">{formatDate(order.createdAt)}</td>
                                    <td className="py-4 pr-4 font-bold">&#8377;{order.totalPrice.toLocaleString()}</td>
                                    <td className="py-4 pr-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${order.isPaid ? 'bg-green-500 text-white' : 'bg-red-600 text-white'}`}>
                                            {order.isPaid ? 'Paid' : 'Not Paid'}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <span className={`px-2 py-1 whitespace-nowrap text-xs rounded-full ${status.className}`}>{status.text}</span>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <a href={`/order/${order._id}`} className="text-amber-400 hover:underline text-sm">View Details</a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden space-y-4">
                {currentOrders.map((order) => {
                    const status = getStatus(order);
                    return (
                        <div key={order._id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-700">
                                <div>
                                    <span className="text-xs text-gray-400 block">ORDER ID</span>
                                    <span className="font-mono text-sm  font-semibold">{order._id}</span>
                                </div>
                                <span className={`px-2 py-1 text-xs whitespace-nowrap rounded-full ${status.className}`}>{status.text}</span>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Date:</span>
                                    <span className="font-semibold">{formatDate(order.createdAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Total:</span>
                                    <span className="font-bold text-base">&#8377;{order.totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Payment:</span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${order.isPaid ? 'bg-green-500 text-white' : 'bg-red-600 text-white'}`}>
                                        {order.isPaid ? 'Paid' : 'Not Paid'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 text-right">
                                <a href={`/order/${order._id}`} className="text-amber-400 hover:underline text-sm font-semibold">View Details</a>
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-end items-center mt-6 gap-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border border-yellow-500 text-yellow-500 rounded-full disabled:opacity-50"><ChevronLeftIcon size={20} /></button>
                    <span className="text-sm">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border border-yellow-500 text-yellow-500 rounded-full disabled:opacity-50"><ChevronRightIcon size={20} /></button>
                </div>
            )}
        </div>
    );
};


// --- MAIN MyAccountPage COMPONENT ---
export default function MyAccountPage() {
    const [activeSection, setActiveSection] = useState('account');
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    // Replaced useRouter with a simple navigation function for standalone use
    const navigateTo = (path) => {
        window.location.href = path;
    };
    const logout = () => {
        localStorage.removeItem('authToken');
        window.location.replace('/login'); // ← use replace to prevent back navigation
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                window.location.replace('/login'); // ← replace instead of navigateTo
                return;
            }
            try {
                const [userRes, ordersRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/users/me`, { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch(`${API_BASE_URL}/orders/myorders`, { headers: { 'Authorization': `Bearer ${token}` } })
                ]);
                if (!userRes.ok || !ordersRes.ok) throw new Error('Failed to fetch account data.');
                const userData = await userRes.json();

                const ordersData = await ordersRes.json();
                setUser(userData);
                setOrders(ordersData);
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const handleMenuClick = (item) => {
        if (item === 'log out') { logout(); }
        else { setActiveSection(item); }
    };

    const handleSaveAddress = async (formData) => {
        const toastId = toast.loading("Saving address...");
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE_URL}/users/me/addresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            const updatedAddresses = await res.json();
            if (!res.ok) throw new Error(updatedAddresses.message || "Failed to save address");
            setUser(prevUser => ({ ...prevUser, addresses: updatedAddresses }));
            setIsAddressModalOpen(false);
            toast.success("Address saved successfully!", { id: toastId });
        } catch (err) {
            toast.error(`Error: ${err.message}`, { id: toastId });
        }
    };

    const renderSection = () => {
        if (!user) return null;
        switch (activeSection) {
            case 'account': return <AccountDetails user={user} />;
            case 'address': return <Address addresses={user.addresses || []} onAddNew={() => setIsAddressModalOpen(true)} />;
            case 'orders': return <Orders orders={orders} />;
            default: return <AccountDetails user={user} />;
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-[90vh]">
        <Lottie animationData={Loader} loop={true} className="lg:w-64 lg:h-64 w-40 h-40" />
      </div>;
    // Removed error message display here as toasts will handle it
    // if (error) return <div className="text-center font-redhead text-red-500 py-20">{error}</div>;

    const menuItems = ['Account', 'Address', 'Orders', 'Log Out'];

    return (
        <div className="bg-black text-white min-h-screen py-12 font-redhead">
            <Toaster position="top-center" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-[#EFAF00] text-center mb-10">MY ACCOUNT</h1>
                <div className="flex flex-col md:flex-row gap-10">
                    <aside className="w-full md:w-[400px]">
                        <div className="bg-gray-200  text-black p-6 rounded-2xl flex flex-col items-center">
                            <h2 className="text-lg text-black font-bold">{user?.name}</h2>
                            <nav className="w-full mt-4">
                                <ul className="space-y-2">
                                    {menuItems.map(item => (
                                        <li key={item}><button onClick={() => handleMenuClick(item.toLowerCase())} className={`w-full text-left p-3 rounded-lg text-base font-medium transition-colors ${activeSection === item.toLowerCase() ? 'text-yellow-500' : 'text-gray-700 hover:bg-gray-300'}`}>{item}</button>{item !== 'Log Out' && <hr className="border-gray-300" />}</li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>
                    <main className="w-full md:w-3/4">{renderSection()}</main>
                </div>
            </div>
            {isAddressModalOpen && <AddressModal onClose={() => setIsAddressModalOpen(false)} onSave={handleSaveAddress} />}
        </div>
    );
}
