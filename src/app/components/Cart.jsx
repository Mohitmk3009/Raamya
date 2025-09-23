'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper component for quantity controls (No changes needed)
const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => (
  <div className="flex items-center justify-center border border-yellow-400 w-24 rounded-md">
    <button onClick={onDecrease} disabled={quantity <= 1} className="px-3 py-1 text-lg font-bold text-yellow-400 cursor-pointer hover:text-white disabled:opacity-50">-</button>
    <span className="px-2 py-1 text-yellow-400">{String(quantity).padStart(2, '0')}</span>
    <button onClick={onIncrease} className="px-3 py-1 text-lg font-bold text-yellow-400 cursor-pointer hover:text-white">+</button>
  </div>
);

// Helper component for each product row (UPDATED FOR MOBILE)
const CartItem = ({ item, onQuantityChange, onRemove }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between py-6 px-4 sm:px-0 border-b border-gray-800 font-redhead">
    {/* Product Info */}
    <div className="flex items-center w-full sm:w-2/5">
      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-md" />
      <div className="ml-4 sm:ml-6">
        <p className="text-lg font-semibold text-yellow-400">{item.name}</p>
        <p className="text-sm text-gray-400">Size: {item.size}</p>
        <button onClick={onRemove} className="text-xs text-red-500 hover:text-red-400 mt-2">Remove</button>
      </div>
    </div>

    {/* Desktop View: Price, Quantity, Subtotal in columns */}
    <div className="hidden sm:flex items-center justify-between mt-4 sm:mt-0 w-full sm:w-3/5">
      <p className="w-1/3 text-center text-lg text-yellow-400">Rs {item.price.toLocaleString()}</p>
      <div className="w-1/3 flex justify-center">
        <QuantitySelector
          quantity={item.qty}
          onDecrease={() => onQuantityChange(item.qty - 1)}
          onIncrease={() => onQuantityChange(item.qty + 1)}
        />
      </div>
      <p className="w-1/3 text-center text-lg text-yellow-400 font-semibold">Rs {(item.price * item.qty).toLocaleString()}</p>
    </div>

    {/* Mobile View: Labeled Price, Quantity, Subtotal */}
    <div className="sm:hidden w-full mt-6 space-y-3">
        <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-400">Price:</span>
            <span className="text-yellow-400">Rs {item.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-400 text-lg">Quantity:</span>
            <QuantitySelector
                quantity={item.qty}
                onDecrease={() => onQuantityChange(item.qty - 1)}
                onIncrease={() => onQuantityChange(item.qty + 1)}
            />
        </div>
        <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-400">Subtotal:</span>
            <span className="text-yellow-400 font-semibold">Rs {(item.price * item.qty).toLocaleString()}</span>
        </div>
    </div>
  </div>
);


// Main Shopping Cart Component (No changes needed)
export default function ShoppingCart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    const fetchCart = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch your cart.');
            const data = await response.json();
            setCart(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantityChange = async (item, newQty) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ productId: item.product, size: item.size, qty: newQty })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setCart(data);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleRemoveProduct = async (item) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${item.product}/${item.size}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setCart(data);
        } catch (err) {
            alert(err.message);
        }
    };

    const subtotal = useMemo(() => {
        return cart?.items.reduce((acc, p) => acc + p.price * p.qty, 0) || 0;
    }, [cart]);

    if (loading) return <div className="text-center font-redhead text-yellow-400 py-20">Loading Your Cart...</div>;
    if (error) return <div className="text-center font-redhead text-red-500 py-20">Error: {error}</div>;

    return (
        <div className="bg-black text-yellow-400 py-10 font-redhead">
            <div className="max-w-[1400px] mx-auto px-4">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6">Shopping Cart</h1>
                <div className="lg:flex lg:gap-8">
                    {/* Left Side: Product List */}
                    <div className="lg:w-2/3">
                        <div className="hidden sm:flex bg-yellow-600 text-black font-bold uppercase text-sm px-8 py-4 rounded-t-md">
                            <div className="w-2/5">Product</div>
                            <div className="w-1/5 text-center">Price</div>
                            <div className="w-1/5 text-center">Quantity</div>
                            <div className="w-1/5 text-center">Subtotal</div>
                        </div>
                        <div className="border border-gray-800 rounded-md sm:border-t-0">
                            {cart && cart.items.length > 0 ? cart.items.map(item => (
                                <CartItem
                                    key={`${item.product}-${item.size}`}
                                    item={item}
                                    onQuantityChange={(newQty) => handleQuantityChange(item, newQty)}
                                    onRemove={() => handleRemoveProduct(item)}
                                />
                            )) : (
                                <p className="text-center py-12 text-gray-500">Your cart is empty.</p>
                            )}
                        </div>
                    </div>
                    {/* Right Side: Cart Total & Checkout */}
                    <div className="lg:w-1/3 mt-8 lg:mt-0">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-yellow-400 border-b border-gray-700 pb-4 mb-4">Cart Total</h2>
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between">
                                    <span>Subtotal: ({cart?.items.length || 0} items)</span>
                                    <span>Rs {subtotal.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-yellow-400 border-t border-gray-700 mt-4 pt-4">
                                <span>Total</span>
                                <span>Rs {subtotal.toLocaleString()}</span>
                            </div>
                            <a href='/checkout'>
                                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-md mt-6 transition-colors" disabled={!cart || cart.items.length === 0}>
                                    Proceed to checkout
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}