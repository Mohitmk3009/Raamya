'use client'
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

// Helper component for quantity controls
const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => (
  <div className="flex items-center justify-center border border-yellow-400 w-24 rounded-md">
    <button onClick={onDecrease} disabled={quantity <= 1} className="px-3 py-1 text-lg font-bold text-yellow-400 cursor-pointer hover:text-white disabled:opacity-50">-</button>
    <span className="px-2 py-1 text-yellow-400">{String(quantity).padStart(2, '0')}</span>
    <button onClick={onIncrease} className="px-3 py-1 text-lg font-bold text-yellow-400 cursor-pointer hover:text-white">+</button>
  </div>
);

// Helper component for each product row with a checkbox
const CartItem = ({ item, onQuantityChange, onRemove, isSelected, onToggleSelect }) => (
    <div className="flex flex-col sm:flex-row items-center justify-between py-6 px-4 sm:px-0 border-b border-gray-800 font-redhead">
        <div className="flex items-center w-full sm:w-2/5">
            <input 
                type="checkbox" 
                checked={isSelected}
                onChange={onToggleSelect}
                className="w-5 h-5 mx-4 bg-gray-700 border-gray-600 rounded text-yellow-400 focus:ring-yellow-500 focus:ring-offset-gray-900"
            />
            <Image width={100} height={100} src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-md" />
            <div className="ml-4 sm:ml-6">
                <p className="text-lg font-semibold text-yellow-400">{item.name}</p>
                <p className="text-sm text-gray-400">Size: {item.size}</p>
                <button onClick={onRemove} className="text-xs text-red-500 hover:text-red-400 mt-2">Remove</button>
            </div>
        </div>

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


// Main Shopping Cart Component
export default function ShoppingCart() {
    const router = useRouter();
    const { 
        cartItems, 
        updateQuantity, 
        removeFromCart, 
        loading, 
        selectedItems, 
        toggleItemSelection, 
        toggleSelectAll 
    } = useCart();

    const { subtotal, totalSelectedItems, totalSelectedItemCount } = useMemo(() => {
        const selected = cartItems.filter(item => selectedItems.includes(`${item.product}-${item.size}`));
        const sub = selected.reduce((acc, item) => acc + (item.price * item.qty), 0);
        const count = selected.reduce((acc, item) => acc + item.qty, 0);
        return { 
            subtotal: sub, 
            totalSelectedItems: selected.length,
            totalSelectedItemCount: count
        };
    }, [cartItems, selectedItems]);

    const handleProceedToCheckout = () => {
        const itemsForCheckout = cartItems.filter(item => selectedItems.includes(`${item.product}-${item.size}`));
        if (itemsForCheckout.length === 0) {
            alert("Please select at least one item to proceed.");
            return;
        }
        sessionStorage.setItem('checkoutItems', JSON.stringify(itemsForCheckout));
        router.push('/checkout');
    };

    if (loading) return <div className="text-center font-redhead text-yellow-400 py-20">Loading Your Cart...</div>;

    return (
        <div className="bg-black text-yellow-400 py-10 font-redhead">
            <div className="max-w-[1400px] mx-auto px-4">
                <h1 className="text-3xl font-bold text-yellow-400 mb-6">Shopping Cart</h1>
                <div className="lg:flex lg:gap-8">
                    <div className="lg:w-2/3">
                        <div className="hidden sm:flex bg-yellow-600 text-black font-bold uppercase text-sm px-8 py-4 rounded-t-md items-center">
                            <div className="w-2/5 flex items-center">
                                <input 
                                    type="checkbox"
                                    checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                                    onChange={toggleSelectAll}
                                    className="w-5 h-5 mr-4 bg-gray-700 border-gray-600 rounded text-yellow-400 focus:ring-yellow-500 focus:ring-offset-gray-900"
                                />
                                Product
                            </div>
                            <div className="w-1/5 text-center">Price</div>
                            <div className="w-1/5 text-center">Quantity</div>
                            <div className="w-1/5 text-center">Subtotal</div>
                        </div>
                        <div className="border border-gray-800 rounded-md sm:border-t-0">
                            {cartItems && cartItems.length > 0 ? cartItems.map(item => {
                                const itemId = `${item.product}-${item.size}`;
                                return (
                                    <CartItem
                                        key={itemId}
                                        item={item}
                                        isSelected={selectedItems.includes(itemId)}
                                        onToggleSelect={() => toggleItemSelection(itemId)}
                                        onQuantityChange={(newQty) => updateQuantity(item.product, item.size, newQty)}
                                        onRemove={() => removeFromCart(item.product, item.size)}
                                    />
                                );
                            }) : (
                                <p className="text-center py-12 text-gray-500">Your cart is empty.</p>
                            )}
                        </div>
                    </div>
                    <div className="lg:w-1/3 mt-8 lg:mt-0">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-yellow-400 border-b border-gray-700 pb-4 mb-4">Order Summary</h2>
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between">
                                    <span>Subtotal ({totalSelectedItemCount} items)</span>
                                    <span>Rs {subtotal.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-yellow-400 border-t border-gray-700 mt-4 pt-4">
                                <span>Total</span>
                                <span>Rs {subtotal.toLocaleString()}</span>
                            </div>
                            <button 
                                onClick={handleProceedToCheckout}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-md mt-6 transition-colors"
                                disabled={totalSelectedItems === 0}
                            >
                                Proceed to checkout ({totalSelectedItems})
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}