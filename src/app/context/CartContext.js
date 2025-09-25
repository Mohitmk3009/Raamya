'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            if (isAuthenticated) {
                setLoading(true);
                const token = localStorage.getItem('authToken');
                try {
                    const response = await fetch(`${API_BASE_URL}/cart`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setCartItems(data.items || []);
                    } else {
                        setCartItems([]);
                    }
                } catch (error) {
                    console.error("Failed to fetch cart:", error);
                    setCartItems([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setCartItems([]);
                setLoading(false);
            }
        };
        fetchCart();
    }, [isAuthenticated]);

    useEffect(() => {
        setSelectedItems(cartItems.map(item => `${item.product}-${item.size}`));
    }, [cartItems]);

    const toggleItemSelection = (itemId) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(itemId)
                ? prevSelected.filter(id => id !== itemId)
                : [...prevSelected, itemId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(item => `${item.product}-${item.size}`));
        }
    };

    const addToCart = async (item, quantity) => {
        if (!isAuthenticated) {
            alert("Please log in to add items to your cart.");
            return;
        }
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: item.product,
                    size: item.size,
                    qty: quantity
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to add item.");

            // --- VITAL FIX: Check if item already exists in cart and update quantity ---
            setCartItems(prevCartItems => {
                const existingItemIndex = prevCartItems.findIndex(
                    cartItem => cartItem.product === item.product && cartItem.size === item.size
                );

                if (existingItemIndex > -1) {
                    // Item exists, create a new array with the updated item
                    const newCart = [...prevCartItems];
                    newCart[existingItemIndex] = {
                        ...newCart[existingItemIndex],
                        qty: newCart[existingItemIndex].qty + quantity
                    };
                    return newCart;
                } else {
                    // Item is new, add it to the array with the correct quantity
                    return [...prevCartItems, { ...item, qty: quantity }];
                }
            });

        } catch (error) {
            console.error("Error adding to cart:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const removeFromCart = async (productId, size) => {
        if (!isAuthenticated) return;
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${productId}/${size}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to remove item.");
            setCartItems(data.items || []);
        } catch (error) {
            console.error("Error removing from cart:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const updateQuantity = async (productId, size, newQty) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ productId, size, qty: newQty })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to update quantity.");
            setCartItems(data.items || []);
        } catch (error) {
            console.error("Error updating quantity:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        loading,
        selectedItems,
        toggleItemSelection,
        toggleSelectAll,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};