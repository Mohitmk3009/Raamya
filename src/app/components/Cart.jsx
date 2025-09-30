'use client'
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import Loader from '../../../public/lottie/Loading.json'; // adjust path to your file
import { useContentProtection } from '../hooks/useContentProtection';
// Quantity selector
const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => (
  <div className="flex items-center justify-center border text-[#EFAF00] w-24 rounded-md">
    <button
      onClick={onDecrease}
      disabled={quantity <= 1}
      className="px-3 py-1 text-lg font-bold text-[#EFAF00] cursor-pointer hover:text-white disabled:opacity-50"
    >
      -
    </button>
    <span className="px-2 py-1 text-[#EFAF00]">
      {String(quantity).padStart(2, '0')}
    </span>
    <button
      onClick={onIncrease}
      className="px-3 py-1 text-lg font-bold text-[#EFAF00] cursor-pointer hover:text-white"
    >
      +
    </button>
  </div>
);

// Cart item row
const CartItem = ({ item, onQuantityChange, onRemove, isSelected, onToggleSelect }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between py-6 px-4 sm:px-0 border-b border-gray-800 font-redhead">
    <div className="flex items-center w-full sm:w-2/5">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggleSelect}
        className="h-5 w-5 bg-gray-900 border-gray-700 rounded text-[#EFAF00] cursor-pointer focus:ring-amber-500 accent-amber-500 mx-4"
      />
      <Image
        width={100}
        height={100}
        src={item.image}
        alt={item.name}
        className="w-20 h-24 object-cover rounded-md"
      />
      <div className="ml-4 sm:ml-6">
        <p className="text-lg font-semibold text-[#EFAF00]">{item.name}</p>
        <p className="text-sm text-gray-400">Size: {item.size}</p>
        <button
          onClick={onRemove}
          className="text-xs text-red-500 cursor-pointer hover:text-red-400 mt-2"
        >
          Remove
        </button>
      </div>
    </div>

    {/* Desktop view */}
    <div className="hidden sm:flex items-center justify-between mt-4 sm:mt-0 w-full sm:w-3/5">
      <p className="w-1/3 text-center text-lg text-[#EFAF00]">
        Rs {item.price.toLocaleString()}
      </p>
      <div className="w-1/3 flex justify-center">
        <QuantitySelector
          quantity={item.qty}
          onDecrease={() => onQuantityChange(item.qty - 1)}
          onIncrease={() => onQuantityChange(item.qty + 1)}
        />
      </div>
      <p className="w-1/3 text-center text-lg text-[#EFAF00] font-semibold">
        Rs {(item.price * item.qty).toLocaleString()}
      </p>
    </div>

    {/* Mobile view */}
    <div className="sm:hidden w-full mt-6 space-y-3">
      <div className="flex justify-between items-center text-lg">
        <span className="font-semibold text-gray-400">Price:</span>
        <span className="text-[#EFAF00]">Rs {item.price.toLocaleString()}</span>
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
        <span className="text-[#EFAF00] font-semibold">
          Rs {(item.price * item.qty).toLocaleString()}
        </span>
      </div>
    </div>
  </div>
);

// Main ShoppingCart
export default function ShoppingCart() {
  const router = useRouter();
  useContentProtection();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    loading,
    selectedItems,
    toggleItemSelection,
    toggleSelectAll,
  } = useCart();

  const { subtotal, totalSelectedItems, totalSelectedItemCount } = useMemo(() => {
    const selected = cartItems.filter(item =>
      selectedItems.includes(`${item.product}-${item.size}`)
    );
    const sub = selected.reduce((acc, item) => acc + item.price * item.qty, 0);
    const count = selected.reduce((acc, item) => acc + item.qty, 0);
    return {
      subtotal: sub,
      totalSelectedItems: selected.length,
      totalSelectedItemCount: count,
    };
  }, [cartItems, selectedItems]);

  const handleProceedToCheckout = () => {
    const itemsForCheckout = cartItems.filter(item =>
      selectedItems.includes(`${item.product}-${item.size}`)
    );
    if (itemsForCheckout.length === 0) {
      toast.error('Please select at least one item to proceed.');
      return;
    }
    sessionStorage.setItem('checkoutItems', JSON.stringify(itemsForCheckout));
    router.push('/checkout');
  };

  // ✅ Lottie loader while cart is loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh]">
        <Lottie animationData={Loader} loop={true} className="lg:w-64 lg:h-64 w-40 h-40" />
      </div>
    );
  }

  return (
    <div className="bg-black text-[#EFAF00] min-h-screen py-10 font-redhead select-none touch-action-manipulation">
      <Toaster position="top-center" />
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#EFAF00] mb-6">Shopping Cart</h1>
        <div className="lg:flex lg:gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="hidden sm:flex bg-[#EFAF00] text-black font-bold uppercase text-sm px-8 py-4 rounded-t-md items-center">
              <div className="w-2/5 ml-[-15px] flex items-center">
                <input
                  type="checkbox"
                  checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                  onChange={toggleSelectAll}
                  className="h-5 w-5 bg-gray-900 border-gray-700 cursor-pointer rounded text-[#EFAF00] focus:ring-amber-500 accent-white mr-4"
                />
                Product
              </div>
              <div className="w-1/5 text-center">Price</div>
              <div className="w-1/5 text-center">Quantity</div>
              <div className="w-1/5 text-center">Subtotal</div>
            </div>
            <div className="border border-gray-800 rounded-md sm:border-t-0">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map(item => {
                  const itemId = `${item.product}-${item.size}`;
                  return (
                    <CartItem
                      key={itemId}
                      item={item}
                      isSelected={selectedItems.includes(itemId)}
                      onToggleSelect={() => toggleItemSelection(itemId)}
                      onQuantityChange={newQty =>
                        updateQuantity(item.product, item.size, newQty)
                      }
                      onRemove={() => removeFromCart(item.product, item.size)}
                    />
                  );
                })
              ) : (
                <p className="text-center py-12 text-gray-500">Your cart is empty.</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#EFAF00] border-b border-gray-700 pb-4 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span>Subtotal ({totalSelectedItemCount} items)</span>
                  <span>Rs {subtotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#EFAF00] border-t border-gray-700 mt-4 pt-4">
                <span>Total</span>
                <span>Rs {subtotal.toLocaleString()}</span>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-black font-bold py-4 rounded-md mt-6 transition-colors"
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
