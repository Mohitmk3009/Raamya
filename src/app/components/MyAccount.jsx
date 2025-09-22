// 'use client'
// import React, { useState } from 'react';

// // --- Helper Components & Data ---
// const ChevronRightIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//         <polyline points="9 18 15 12 9 6"></polyline>
//     </svg>
// );

// const ChevronLeftIcon = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//         <polyline points="15 18 9 12 15 6"></polyline>
//     </svg>
// );
// // Icon for the camera next to the user's name


// // Mock data for different sections
// const user = {
//     name: 'MOHIT KUMAR',
//     profileImage: 'https://placehold.co/100x100/e2e8f0/334155?text=SS'
// };

// const initialAddresses = [
//     { 
//         id: 1,
//         type: 'Billing',
//         name: 'RIDHI SHARMA',
//         phone: '+91 12345 12345',
//         address: '123 PANIPAT HARYANA ACDEFG INDIA - 110023 XYZ................'
//     },
//     { 
//         id: 2,
//         type: 'Shipping',
//         name: 'RIDHI SHARMA',
//         phone: '+91 12345 12345',
//         address: '123 PANIPAT HARYANA ACDEFG INDIA - 110023 XYZ................'
//     }
// ];

// const orderHistory = [
//     { id: '#1234_12345', date: '10th september, 2025', status: 'Ready to ship', price: 'Rs 15000' },
//     { id: '#1234_12345', date: '12th september, 2025', status: 'Delivered', price: 'Rs 40000' },
//     { id: '#1234_12345', date: '15th september, 2025', status: 'Delivered', price: 'Rs 10000' },
//     { id: '#1234_12345', date: '18th september, 2025', status: 'Delivered', price: 'Rs 5000' },
// ];

// const initialWishlistItems = [
//     { id: 1, name: 'Product Name 1', price: 'Rs 15000', image: 'https://images.unsplash.com/photo-1683849117820-a9c2fd92f3b9?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: 2, name: 'Product Name 2', price: 'Rs 10000', image: 'https://images.unsplash.com/photo-1740128041074-7fc1593e7851?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: 3, name: 'Product Name 3', price: 'Rs 40000', image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: 4, name: 'Product Name 4', price: 'Rs 22000', image: 'https://plus.unsplash.com/premium_photo-1664875849194-0adbac28529f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: 5, name: 'Product Name 5', price: 'Rs 5000', image: 'https://images.unsplash.com/photo-1579809160635-5eeeeae4d79f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
//     { id: 6, name: 'Product Name 6', price: 'Rs 30000', image: 'https://plus.unsplash.com/premium_photo-1664875849194-0adbac28529f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
// ];


// // --- Section Components ---

// const AccountDetails = () => (
//     <div className="w-full">
//         <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-redhead">ACCOUNT DETAILS</h2>
//         <form className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                     <label className="block text-white mb-2" htmlFor="first-name">First Name *</label>
//                     <input type="text" id="first-name" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                 </div>
//                 <div>
//                     <label className="block text-white mb-2" htmlFor="last-name">Last Name *</label>
//                     <input type="text" id="last-name" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                 </div>
//             </div>
//             <div>
//                 <label className="block text-white mb-2" htmlFor="display-name">Display Name *</label>
//                 <input type="text" id="display-name" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                 <p className="text-gray-400 text-sm mt-2">This will be how your name will be displayed in the account section and in reviews.</p>
//             </div>
//             <div>
//                 <label className="block text-white mb-2" htmlFor="email">Email *</label>
//                 <input type="email" id="email" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//             </div>

//             <h3 className="text-xl font-bold text-yellow-400 pt-6">PASSWORD</h3>
//             <div className="space-y-6">
//                 <div>
//                     <label className="block text-white mb-2" htmlFor="old-password">Old Password *</label>
//                     <input type="password" id="old-password" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                 </div>
//                 <div>
//                     <label className="block text-white mb-2" htmlFor="new-password">New Password *</label>
//                     <input type="password" id="new-password" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                 </div>
//                 <div>
//                     <label className="block text-white mb-2" htmlFor="repeat-password">Repeat New Password *</label>
//                     <input type="password" id="repeat-password" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                 </div>
//             </div>
//             <div>
//                 <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors">
//                     SAVE CHANGES
//                 </button>
//             </div>
//         </form>
//     </div>
// );

// const AddressModal = ({ onClose, onSave }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         address: '',
//         type: 'Shipping'
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSave(formData);
//     };
    
//     return (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md border border-gray-700 relative">
//                  <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl">&times;</button>
//                  <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-redhead">ADD NEW ADDRESS</h2>
//                  <form onSubmit={handleSubmit} className="space-y-4">
//                      <div>
//                         <label className="block text-white mb-2" htmlFor="name">Full Name *</label>
//                         <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                     </div>
//                      <div>
//                         <label className="block text-white mb-2" htmlFor="phone">Phone Number *</label>
//                         <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400" />
//                     </div>
//                      <div>
//                         <label className="block text-white mb-2" htmlFor="address">Full Address *</label>
//                         <textarea id="address" name="address" value={formData.address} onChange={handleChange} required rows="3" className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
//                     </div>
//                      <div>
//                         <label className="block text-white mb-2" htmlFor="type">Address Type</label>
//                         <select id="type" name="type" value={formData.type} onChange={handleChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
//                             <option>Shipping</option>
//                             <option>Billing</option>
//                         </select>
//                     </div>
//                     <div className="pt-4">
//                         <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors">
//                             SAVE ADDRESS
//                         </button>
//                     </div>
//                  </form>
//             </div>
//         </div>
//     );
// };


// const Address = ({ addresses, onAddNew }) => (
//     <div className="w-full">
//         <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-redhead">ADDRESS</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//            {addresses.map(addr => (
//              <div key={addr.id} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
//                 <h3 className="text-lg font-bold text-yellow-400 mb-4 uppercase">{addr.type} ADDRESS</h3>
//                 <p className="text-white">{addr.name}</p>
//                 <p className="text-white">{addr.phone}</p>
//                 <p className="text-gray-400">{addr.address}</p>
//             </div>
//            ))}
//         </div>
//         <button onClick={onAddNew} className="bg-gray-700 text-white font-bold py-2 px-6 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors">
//             ADD NEW
//         </button>
//     </div>
// );

// const Orders = () => (
//     <div className="w-full">
//         <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-redhead">ORDER HISTORY</h2>
//         <div className="overflow-x-auto">
//             <table className="w-full text-left text-white">
//                 <thead>
//                     <tr className="border-b border-yellow-400">
//                         <th className="py-3 pr-4">Number ID</th>
//                         <th className="py-3 pr-4">Dates</th>
//                         <th className="py-3 pr-4">Status</th>
//                         <th className="py-3 pr-4">Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orderHistory.map((order, index) => (
//                         <tr key={index} className="border-b border-gray-700">
//                             <td className="py-4 pr-4">{order.id}</td>
//                             <td className="py-4 pr-4">{order.date}</td>
//                             <td className="py-4 pr-4">{order.status}</td>
//                             <td className="py-4 pr-4">{order.price}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </div>
// );

// const Wishlist = ({ items, onRemove, onAdd }) => {
//     const [currentPage, setCurrentPage] = useState(0);
//     const itemsPerPage = 3;

//     const totalPages = Math.ceil(items.length / itemsPerPage);
//     const displayedItems = items.slice(
//         currentPage * itemsPerPage,
//         (currentPage + 1) * itemsPerPage
//     );

//     const handlePrev = () => {
//         setCurrentPage(prev => (prev > 0 ? prev - 1 : 0));
//     };

//     const handleNext = () => {
//         setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : prev));
//     };
    
//     // Reset to first page if current page becomes empty after deletion
//     React.useEffect(() => {
//         if (displayedItems.length === 0 && items.length > 0) {
//             setCurrentPage(prev => Math.max(0, prev - 1));
//         }
//     }, [items, displayedItems]);


//     return (
//         <div className="w-full">
//             <div className="flex justify-between items-center mb-6 font-redhead">
//                  <h2 className="text-2xl font-bold text-yellow-400">YOUR WISHLIST</h2>
//                  <button onClick={onAdd} className="bg-yellow-400 text-black font-bold text-sm py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
//                     Add Dummy Item
//                 </button>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="w-full text-left text-white">
//                     <thead>
//                         <tr className="border-b border-yellow-400 text-center">
//                             <th className="py-3 pr-4" colSpan="2">Product</th>
//                             <th className="py-3 pr-4">Price</th>
//                             <th className="py-3 pr-4">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {displayedItems.length > 0 ? displayedItems.map(item => (
//                             <tr key={item.id} className="border-b border-gray-700 align-middle text-center">
//                                 <td className="py-4 pr-2">
//                                     <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
//                                 </td>
//                                 <td className="py-4 pr-4">
//                                     <div className="flex items-center gap-4">
//                                         <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-md" />
//                                         <span>{item.name}</span>
//                                     </div>
//                                 </td>
//                                 <td className="py-4 pr-4">{item.price}</td>
//                                 <td className="py-4 pr-2">
//                                     <button className="bg-yellow-400 text-black font-bold text-sm py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
//                                         Add Cart
//                                     </button>
//                                 </td>
//                             </tr>
//                         )) : (
//                              <tr>
//                                 <td colSpan="4" className="text-center py-10 text-gray-400">Your wishlist is empty.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//                 {items.length > itemsPerPage && (
//                     <div className="flex justify-end mt-6 gap-2">
//                         <button onClick={handlePrev} disabled={currentPage === 0} className="p-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeftIcon size={20} /></button>
//                         <button onClick={handleNext} disabled={currentPage >= totalPages - 1} className="p-2 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRightIcon size={20} /></button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


// // --- Main App Component ---

// export default function App() {
//     const [activeSection, setActiveSection] = useState('account');
//     const [wishlist, setWishlist] = useState(initialWishlistItems);
//     const [addresses, setAddresses] = useState(initialAddresses);
//     const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

//     const handleRemoveFromWishlist = (itemId) => {
//         setWishlist(currentWishlist => currentWishlist.filter(item => item.id !== itemId));
//     };

//     const handleAddToWishlist = () => {
//         const newItem = {
//             id: Date.now(), // Use a simple unique ID for demo purposes
//             name: `New Product ${wishlist.length + 1}`,
//             price: `Rs ${Math.floor(Math.random() * 40000 + 5000)}`,
//             image: `https://placehold.co/80x80/e2e8f0/334155?text=New${wishlist.length + 1}`
//         };
//         setWishlist(currentWishlist => [...currentWishlist, newItem]);
//     };

//     const handleSaveAddress = (newAddress) => {
//         setAddresses(prev => [...prev, { ...newAddress, id: Date.now() }]);
//         setIsAddressModalOpen(false);
//     };

//     const menuItems = ['Account', 'Address', 'Orders', 'Wishlist', 'Log Out'];

//     const renderSection = () => {
//         switch (activeSection) {
//             case 'account':
//                 return <AccountDetails />;
//             case 'address':
//                 return <Address addresses={addresses} onAddNew={() => setIsAddressModalOpen(true)} />;
//             case 'orders':
//                 return <Orders />;
//             case 'wishlist':
//                 return <Wishlist items={wishlist} onRemove={handleRemoveFromWishlist} onAdd={handleAddToWishlist} />;
//             case 'log out':
//                 // You can add your logout logic here
//                 return <p className="text-white">You have been logged out.</p>;
//             default:
//                 return <AccountDetails />;
//         }
//     };
    
//     return (
//         <div className="bg-black text-white min-h-screen   pt-12 font-redhead">
//             <div className="max-w-7xl mx-auto p-4 sm:p-0">
//                 <h1 className="text-4xl font-extrabold text-yellow-400 text-center mb-10">MY ACCOUNT</h1>

//                 <div className="flex flex-col md:flex-row gap-10">
//                     {/* Left Sidebar */}
//                     <aside className="w-full md:w-1/4">
//                         <div className="bg-gray-200 text-black p-6 rounded-2xl flex flex-col items-center">
//                             <div className="flex items-center gap-2 mb-2">
//                                 <h2 className="text-lg font-bold">{user.name}</h2>
//                             </div>
//                             <nav className="w-full">
//                                 <ul className="space-y-2">
//                                     {menuItems.map(item => (
//                                         <li key={item}>
//                                             <button 
//                                                 onClick={() => setActiveSection(item.toLowerCase())}
//                                                 className={`w-full text-left p-3 rounded-lg text-base font-medium transition-colors ${
//                                                     activeSection === item.toLowerCase() 
//                                                     ? 'text-yellow-500' 
//                                                     : 'text-gray-700 hover:bg-gray-300'
//                                                 }`}
//                                             >
//                                                 {item}
//                                             </button>
//                                             {item !== 'Log Out' && <hr className="border-gray-300" />}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </nav>
//                         </div>
//                     </aside>

//                     {/* Right Content */}
//                     <main className="w-full md:w-3/4">
//                         {renderSection()}
//                     </main>
//                 </div>
//             </div>
//             {isAddressModalOpen && <AddressModal onClose={() => setIsAddressModalOpen(false)} onSave={handleSaveAddress} />}
//         </div>
//     );
// }

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// --- ICONS ---
const ChevronRightIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"></polyline></svg> );
const ChevronLeftIcon = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="15 18 9 12 15 6"></polyline></svg> );

// --- SUB-COMPONENTS ---

const AccountDetails = ({ user }) => {
    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [profileMessage, setProfileMessage] = useState({ text: '', type: '' });
    const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (user) {
            setProfileData({ name: user.name || '', email: user.email || '' });
        }
    }, [user]);

    const handleProfileChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileMessage({ text: 'Saving...', type: 'info' });
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(profileData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setProfileMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (error) {
            setProfileMessage({ text: error.message, type: 'error' });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordMessage({ text: 'Updating...', type: 'info' });
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage({ text: 'New passwords do not match.', type: 'error' });
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
            if (!res.ok) throw new Error(data.message);
            setPasswordMessage({ text: 'Password changed successfully!', type: 'success' });
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setPasswordMessage({ text: error.message, type: 'error' });
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-redhead">ACCOUNT DETAILS</h2>
            
            <form onSubmit={handleProfileSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
                {profileMessage.text && <p className={`text-center text-sm ${profileMessage.type === 'success' ? 'text-green-400' : profileMessage.type === 'error' ? 'text-red-400' : 'text-blue-400'}`}>{profileMessage.text}</p>}
                <div>
                    <label className="block text-white mb-2" htmlFor="name">Display Name *</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" value={profileData.name} onChange={handleProfileChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                </div>
                <div>
                    <label className="block text-white mb-2" htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" value={profileData.email} onChange={handleProfileChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                </div>
                <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500">SAVE CHANGES</button>
            </form>

            <form onSubmit={handlePasswordSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-yellow-400">CHANGE PASSWORD</h3>
                {passwordMessage.text && <p className={`text-center text-sm ${passwordMessage.type === 'success' ? 'text-green-400' : passwordMessage.type === 'error' ? 'text-red-400' : 'text-blue-400'}`}>{passwordMessage.text}</p>}
                <input type="password" name="oldPassword" placeholder="Current Password" value={passwordData.oldPassword} onChange={handlePasswordChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                <input type="password" name="newPassword" placeholder="New Password" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                <input type="password" name="confirmPassword" placeholder="Confirm New Password" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500">CHANGE PASSWORD</button>
            </form>
        </div>
    );
};

const AddressModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({ label: 'Home', name: '', phone: '', street: '', city: '', state: '', postalCode: '', country: 'India' });
    const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
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
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors">SAVE ADDRESS</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Address = ({ addresses, onAddNew }) => (
    <div className="w-full">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-redhead">ADDRESS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {addresses.map(addr => (
                <div key={addr._id} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-bold text-yellow-400 mb-4 uppercase">{addr.label || 'ADDRESS'}</h3>
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

    if (!orders || orders.length === 0) {
        return <div className="text-center text-gray-500 py-10"><p>You haven't placed any orders yet.</p></div>;
    }
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-redhead">ORDER HISTORY</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-white">
                    <thead><tr className="border-b border-yellow-400 text-sm"><th className="py-3 pr-4">ORDER ID</th><th className="py-3 pr-4">DATE</th><th className="py-3 pr-4">TOTAL</th><th className="py-3 pr-4">PAYMENT</th><th className="py-3 pr-4">STATUS</th><th></th></tr></thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <tr key={order._id} className="border-b border-gray-700">
                                <td className="py-4 pr-4 font-mono text-xs">{order._id}</td>
                                <td className="py-4 pr-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="py-4 pr-4 font-bold">&#8377;{order.totalPrice.toLocaleString()}</td>
                                <td className="py-4 pr-4"><span className={`px-2 py-1 text-xs rounded-full ${order.isPaid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{order.isPaid ? 'Paid' : 'Not Paid'}</span></td>
                                <td className="py-4 pr-4"><span className={`px-2 py-1 text-xs rounded-full ${order.isDelivered ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{order.isDelivered ? 'Delivered' : 'Processing'}</span></td>
                                <td className="py-4 pr-4"><Link href={`/order/${order._id}`} className="text-amber-400 hover:underline text-sm">View Details</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
    const { logout } = useAuth();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) { router.push('/login'); return; }
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
            } catch (err) { setError(err.message); } 
            finally { setLoading(false); }
        };
        fetchData();
    }, [router]);

    const handleMenuClick = (item) => {
        if (item === 'log out') { logout(); } 
        else { setActiveSection(item); }
    };

    const handleSaveAddress = async (formData) => {
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`${API_BASE_URL}/users/me/addresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify(formData)
            });
            const updatedAddresses = await res.json();
            if (!res.ok) throw new Error(updatedAddresses.message || "Failed to save address");
            setUser(prevUser => ({...prevUser, addresses: updatedAddresses}));
            setIsAddressModalOpen(false);
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const renderSection = () => {
        if (!user) return null;
        switch (activeSection) {
            case 'account': return <AccountDetails user={user} />;
            case 'address': return <Address addresses={user.addresses || []} onAddNew={() => setIsAddressModalOpen(true)} />;
            case 'orders': return <Orders orders={orders} />;
            // case 'wishlist': return <div className="text-center text-gray-500 py-10">Wishlist feature coming soon!</div>;
            default: return <AccountDetails user={user} />;
        }
    };

    if (loading) return <div className="text-center text-white py-20">Loading Your Account...</div>;
    if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

    const menuItems = ['Account', 'Address', 'Orders', 'Log Out'];

    return (
        <div className="bg-black text-white min-h-screen pt-12 font-redhead">
            <div className="max-w-7xl mx-auto p-4 sm:p-0">
                <h1 className="text-4xl font-extrabold text-yellow-400 text-center mb-10">MY ACCOUNT</h1>
                <div className="flex flex-col md:flex-row gap-10">
                    <aside className="w-full md:w-1/4">
                        <div className="bg-gray-200 text-black p-6 rounded-2xl flex flex-col items-center">
                            <h2 className="text-lg font-bold">{user?.name}</h2>
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

