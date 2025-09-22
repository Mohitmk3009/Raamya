// 'use client'
// import React, { useState, useMemo } from 'react';

// // You can fetch this data from an API or have it in a separate file.
// const initialProducts = [
//   {
//     id: 1,
//     name: 'Emerald Green Blazer',
//     image: 'https://images.unsplash.com/photo-1579809160635-5eeeeae4d79f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     seller: 'by ZSCHIMMER & SCHWARZ',
//     price: 5000,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: 'Sunshine Yellow Jumpsuit',
//     image: 'https://plus.unsplash.com/premium_photo-1682095661711-f5d67d0e75a9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     seller: 'by GUCCI',
//     price: 5000,
//     quantity: 1,
//   },
//   {
//     id: 3,
//     name: 'Royal Blue Evening Gown',
//     image: 'https://plus.unsplash.com/premium_photo-1673758905600-4863f662bc1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     seller: 'by PRADA',
//     price: 5000,
//     quantity: 1,
//   },
//   {
//     id: 4,
//     name: 'Fiery Red Cocktail Dress',
//     image: 'https://images.unsplash.com/photo-1683849117820-a9c2fd92f3b9?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     seller: 'by VERSACE',
//     price: 5000,
//     quantity: 1,
//   },
// ];

// // Helper component for quantity controls
// const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => (
//   <div className="flex items-center justify-center border border-yellow-400 w-24 rounded-md">
//     <button onClick={onDecrease} className="px-3 py-1 text-lg font-bold text-yellow-400 cursor-pointer hover:text-white ">-</button>
//     <span className="px-2 py-1 text-yellow-400">{quantity.toString().padStart(2, '0')}</span>
//     <button onClick={onIncrease} className="px-3 py-1 text-lg font-bold text-yellow-400 cursor-pointer hover:text-white">+</button>
//   </div>
// );

// // Helper component for each product row
// const CartItem = ({ product, onQuantityChange, onRemove, onToggleSelection, isSelected }) => (
//   <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-b border-gray-800 font-redhead">
//     <div className="flex items-center w-full sm:w-2/5">
//       <input type="checkbox" checked={isSelected} onChange={onToggleSelection} className="form-checkbox h-4 w-4 mx-4 bg-black border-yellow-500 text-yellow-500 rounded-sm focus:ring-0" />
//       <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded-md" />
//       <div className="ml-4 sm:ml-6">
//         <p className="text-lg font-semibold text-yellow-400">{product.name}</p>
//         <p className="text-sm text-gray-400">{product.seller}</p>
//         <button onClick={onRemove} className="text-xs text-red-500 hover:text-red-400 mt-2">Remove</button>
//       </div>
//     </div>
//     <div className="flex items-center justify-between mt-4 sm:mt-0 w-full sm:w-3/5 ">
//       <p className="w-1/3 text-center text-lg text-yellow-400">Rs {product.price.toLocaleString()}</p>
//       <div className="w-1/3 flex justify-center">
//         <QuantitySelector
//           quantity={product.quantity}
//           onDecrease={() => onQuantityChange(product.id, product.quantity - 1)}
//           onIncrease={() => onQuantityChange(product.id, product.quantity + 1)}
//         />
//       </div>
//       <p className="w-1/3 text-center text-lg text-yellow-400 font-semibold">Rs {(product.price * product.quantity).toLocaleString()}</p>
//     </div>
//   </div>
// );


// // Main Shopping Cart Component
// export default function ShoppingCart() {
//   const [products, setProducts] = useState(initialProducts);
//   const [selectedIds, setSelectedIds] = useState(new Set(products.map(p => p.id)));

//   const handleQuantityChange = (productId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setProducts(products.map(p => p.id === productId ? { ...p, quantity: newQuantity } : p));
//   };

//   const handleRemoveProduct = (productId) => {
//     setProducts(products.filter(p => p.id !== productId));
//     const newSelectedIds = new Set(selectedIds);
//     newSelectedIds.delete(productId);
//     setSelectedIds(newSelectedIds);
//   };

//   const handleToggleSelection = (productId) => {
//     const newSelectedIds = new Set(selectedIds);
//     if (newSelectedIds.has(productId)) {
//       newSelectedIds.delete(productId);
//     } else {
//       newSelectedIds.add(productId);
//     }
//     setSelectedIds(newSelectedIds);
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedIds(new Set(products.map(p => p.id)));
//     } else {
//       setSelectedIds(new Set());
//     }
//   };

//   const isAllSelected = products.length > 0 && selectedIds.size === products.length;

//   const { subtotal, totalItems } = useMemo(() => {
//     const selectedProducts = products.filter(p => selectedIds.has(p.id));
//     const sub = selectedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);
//     const items = selectedProducts.reduce((acc, p) => acc + p.quantity, 0);
//     return {
//       subtotal: sub,
//       totalItems: items,
//     };
//   }, [products, selectedIds]);

//   const shipping = 150;
//   const total = subtotal + shipping;

//   return (
//     <div className="bg-black   text-yellow-400 py-10 font-redhead">
//       <div className="max-w-[1400px] mx-auto px-4">
//         <h1 className="text-3xl font-bold text-yellow-400 mb-2">Shopping Cart</h1>
//         <div className="flex items-center mb-6">
//           <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} className="form-checkbox h-4 w-4 ml-4 bg-black border-yellow-500 text-yellow-500 rounded-sm focus:ring-0" />
//           <label className="ml-3 text-sm font-medium text-yellow-500 uppercase tracking-wider">Select All Items</label>
//         </div>

//         <div className="lg:flex lg:gap-8">
//           {/* Left Side: Product List */}
//           <div className="lg:w-2/3">
//             <div className="hidden sm:flex bg-yellow-600 text-black font-bold uppercase text-sm px-8 py-4 rounded-t-md">
//               <div className="w-2/5">Product</div>
//               <div className="w-1/5 text-center">Price</div>
//               <div className="w-1/5 pl-5 text-center">Quantity</div>
//               <div className="w-1/5 pl-12 text-center">Subtotal</div>
//             </div>
//             <div className="border-l border-r border-b border-gray-800 rounded-b-md sm:border-t-0">
//               {products.length > 0 ? products.map(product => (
//                 <CartItem
//                   key={product.id}
//                   product={product}
//                   onQuantityChange={handleQuantityChange}
//                   onRemove={() => handleRemoveProduct(product.id)}
//                   onToggleSelection={() => handleToggleSelection(product.id)}
//                   isSelected={selectedIds.has(product.id)}
//                 />
//               )) : (
//                 <p className="text-center py-12 text-gray-500">Your cart is empty.</p>
//               )}
//             </div>
//             <div className="flex justify-between mt-8">
//               <button className="bg-gray-800 hover:bg-gray-700 text-yellow-400 font-bold py-3 px-6 rounded-md transition-colors">Return To Shop</button>
//               <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-md transition-colors">Update Cart</button>
//             </div>
//           </div>

//           {/* Right Side: Cart Total & Checkout */}
//           <div className="lg:w-1/3 mt-8 lg:mt-0">
//             <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
//               <h2 className="text-xl font-bold text-yellow-400 border-b border-gray-700 pb-4 mb-4">Cart Total</h2>
//               <div className="space-y-4 text-lg">
//                 <div className="flex justify-between">
//                   <span>Subtotal: ({totalItems} items)</span>
//                   <span>Rs {subtotal.toLocaleString()}</span>
//                 </div>
//                  <div className="flex justify-between text-gray-400">
//                   <span>Shipping</span>
//                   <span>Rs {shipping.toLocaleString()}</span>
//                 </div>
//               </div>
//                <div className="flex justify-between text-sm text-gray-500 pt-2">
//                     <span>(GST Included)</span>
//                 </div>
//               <div className="flex justify-between text-xl font-bold text-yellow-400 border-t border-gray-700 mt-4 pt-4">
//                 <span>Total</span>
//                 <span>Rs {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//               </div>
//               <a href='/checkout'>
//                 <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-md mt-6 transition-colors">
//                   Proceed to checkout
//                 </button>
//               </a>

//               <div className="mt-8">
//                 <div className="flex">
//                   <input type="text" placeholder="Coupon Code" className="w-full bg-gray-800 border border-gray-700 rounded-l-md p-3 text-gray-400 focus:outline-none focus:border-yellow-500" />
//                   <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-r-md transition-colors whitespace-nowrap">Apply Coupon</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Helper component for quantity controls
const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => (
  <div className="flex items-center justify-center border border-yellow-400 w-24 rounded-md">
    <button onClick={onDecrease} disabled={quantity <= 1} className="px-3 py-1 text-lg font-bold text-yellow-400 cursor-pointer hover:text-white disabled:opacity-50">-</button>
    <span className="px-2 py-1 text-yellow-400">{String(quantity).padStart(2, '0')}</span>
    <button onClick={onIncrease} className="px-3 py-1 text-lg font-bold text-yellow-400 cursor-pointer hover:text-white">+</button>
  </div>
);

// Helper component for each product row
const CartItem = ({ item, onQuantityChange, onRemove }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between py-6 border-b border-gray-800 font-redhead">
    <div className="flex items-center w-full sm:w-2/5">
      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-md" />
      <div className="ml-4 sm:ml-6">
        <p className="text-lg font-semibold text-yellow-400">{item.name}</p>
        <p className="text-sm text-gray-400">Size: {item.size}</p>
        <button onClick={onRemove} className="text-xs text-red-500 hover:text-red-400 mt-2">Remove</button>
      </div>
    </div>
    <div className="flex items-center justify-between mt-4 sm:mt-0 w-full sm:w-3/5 ">
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
  </div>
);


// Main Shopping Cart Component
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
            const response = await fetch('http://localhost:5001/api/cart', {
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
            const response = await fetch('http://localhost:5001/api/cart', {
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
            const response = await fetch(`http://localhost:5001/api/cart/${item.product}/${item.size}`, {
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

    if (loading) return <div className="text-center text-white py-20">Loading Your Cart...</div>;
    if (error) return <div className="text-center text-red-500 py-20">Error: {error}</div>;

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
                        <div className="border-l border-r border-b border-gray-800 rounded-b-md sm:border-t-0">
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