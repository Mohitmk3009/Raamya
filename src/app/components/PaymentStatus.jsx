// 'use client'
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import successAnimation from '../../../public/lottie/success.json';
// import errorAnimation from '../../../public/lottie/error.json';
// import Lottie from 'lottie-react';

// // --- Helper Components for Icons ---

// // Animated Checkmark Icon for Success State using Lottie
// const AnimatedCheckmark = () => (
//   <div className="w-40 h-40 mx-auto">
//     <Lottie
//       animationData={successAnimation}
//       loop={false}
//       autoplay={true}
//       style={{ width: '100%', height: '100%' }}
//     />
//   </div>
// );

// // Error Icon for Failed State using Lottie
// const ErrorIcon = () => (
//   <div className="w-32 h-32 mx-auto mb-4">
//     <Lottie
//       animationData={errorAnimation}
//       loop={false}
//       autoplay={true}
//       style={{ width: '100%', height: '100%' }}
//     />
//   </div>
// );

// // --- Main Page Components ---

// // Component for Payment Success View
// const PaymentSuccess = ({ onAnimationEnd }) => {
//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       onAnimationEnd();
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [onAnimationEnd]);

//   return (
//     <div className="text-center text-yellow-200 font-redhead">
//       <AnimatedCheckmark />
//       <h1 className="text-4xl font-bold text-green-500 mt-6 mb-4">Payment Successful</h1>
//       <p className="text-lg">
//         Thank You For Choosing RAAMYA, Your Order Will Be Generated Based On Your Delivery Request.
//       </p>
//       <p className="mt-2">The Receipt Has Been Sent To Your Email</p>
//       <div className="mt-12 text-gray-400">
//         <p>Please Contact Us For Any Query</p>
//         <p className="mt-1">+1(123) 456-7890</p>
//         <p>OR</p>
//         <p>support@raamya.com</p>
//       </div>
//     </div>
//   );
// };

// // Component for Payment Failed View
// const PaymentFailed = ({ onRetry }) => (
//   <div className="text-center text-yellow-200 font-redhead">
//     <ErrorIcon />
//     <h1 className="text-4xl font-bold text-red-500 mb-4">Sorry, Payment Failed</h1>
//     <div className="max-w-xl mx-auto text-lg space-y-2">
//       <p>Unfortunately, Your Order Cannot Be Completed.</p>
//       <p>
//         Please Ensure That The Billing Address You Provided Is The Same One Where Your Debit/Credit
//         Card Is Registered.
//       </p>
//       <p>Alternatively, Please Try A Different Payment Method.</p>
//     </div>
//     <div className="mt-12 flex flex-col items-center space-y-4">
//       <button
//         onClick={onRetry}
//         className="bg-[#EFAF00] text-black font-bold py-3 px-16 rounded-lg text-lg hover:bg-yellow-600 transition-colors duration-300"
//       >
//         Pay Now
//       </button>
//       <button
//         onClick={onRetry}
//         className="text-gray-400 hover:text-white transition-colors duration-300"
//       >
//         Back To My Orders
//       </button>
//     </div>
//   </div>
// );

// // Component for the "Order Received" Modal
// const OrderModal = ({ onClose }) => {
//   const orderDetails = {
//     orderCode: '#0123_12345',
//     date: '25th September 2025',
//     total: 'Rs 6150/-',
//     paymentMethod: 'Cash on Delivery',
//     items: [
//       { id: 1, src: 'https://images.unsplash.com/photo-1579809160635-5eeeeae4d79f?q=80&w=688&auto=format&fit=crop' },
//       { id: 2, src: 'https://plus.unsplash.com/premium_photo-1682095661711-f5d67d0e75a9?q=80&w=687&auto=format&fit=crop' },
//       { id: 3, src: 'https://plus.unsplash.com/premium_photo-1673758905600-4863f662bc1d?q=80&w=687&auto=format&fit=crop' },
//     ],
//   };

//   return (
//     <motion.div
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-redhead"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative w-full max-w-lg mx-auto bg-black border border-[#EFAF00]/50 rounded-2xl shadow-[0_0_20px_theme(colors.yellow.500/0.5)] p-8 text-center text-yellow-200"
//         initial={{ scale: 0.5, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.5, opacity: 0 }}
//         transition={{ duration: 0.4, ease: 'easeOut', type: 'spring', stiffness: 200 }}
//       >
//         <h2 className="text-4xl font-bold mb-2">COMPLETE !!</h2>
//         <div className="bg-black/80 backdrop-blur-sm border border-[#EFAF00]/30 rounded-lg p-6">
//           <h3 className="text-3xl font-semibold">Thank you!</h3>
//           <p className="text-2xl mt-1 mb-6">Your order has been received</p>

//           <div className="flex justify-center space-x-4 mb-6">
//             {orderDetails.items.map(item => (
//               <div key={item.id} className="relative">
//                 <img
//                   src={item.src}
//                   alt={`Order item ${item.id}`}
//                   className="w-24 h-24 object-cover rounded-lg border-2 border-[#EFAF00]/50"
//                 />
//                 <span className="absolute -top-2 -right-2 bg-[#EFAF00] text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-black">
//                   {item.id}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="text-left space-y-2 text-yellow-100/80">
//             <div className="flex justify-between"><span className="font-semibold">Order Code :</span><span>{orderDetails.orderCode}</span></div>
//             <div className="flex justify-between"><span className="font-semibold">Date :</span><span>{orderDetails.date}</span></div>
//             <div className="flex justify-between"><span className="font-semibold">Total :</span><span>{orderDetails.total}</span></div>
//             <div className="flex justify-between"><span className="font-semibold">Payment Method :</span><span>{orderDetails.paymentMethod}</span></div>
//           </div>

//           <a href="/allproducts">
//             <button className="mt-8 bg-[#EFAF00] cursor-pointer text-black font-bold py-3 px-10 rounded-full text-lg hover:bg-yellow-600 transition-colors duration-300 border border-yellow-700 shadow-[0_0_10px_theme(colors.yellow.500/0.7)]">
//               Continue Shopping
//             </button>
//           </a>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };


// // Main App Component
// export default function App() {
//   const [paymentStatus, setPaymentStatus] = React.useState('success');
//   const [showModal, setShowModal] = React.useState(false);

//   const togglePaymentStatus = () => {
//     setPaymentStatus(prev => (prev === 'success' ? 'failed' : 'success'));
//     setShowModal(false);
//   };

//   const handleReset = () => {
//     setPaymentStatus('success');
//     setShowModal(false);
//   };

//   const handleAnimationEnd = () => {
//     setShowModal(true);
//   };

//   const renderContent = () => {
//     switch (paymentStatus) {
//       case 'success':
//         return <PaymentSuccess onAnimationEnd={handleAnimationEnd} />;
//       case 'failed':
//         return <PaymentFailed onRetry={handleReset} />;
//       default:
//         return <PaymentSuccess onAnimationEnd={handleAnimationEnd} />;
//     }
//   };

//   return (
//     <main className="bg-black min-h-[80vh] flex items-center justify-center  relative font-redhead">
//       {/* <button
//         onClick={togglePaymentStatus}
//         className="absolute top-4 right-4 bg-gray-700 text-white py-2 px-4 rounded-lg text-sm z-10"
//       >
//         Toggle Status (Dev)
//       </button> */}

//       <div className="w-full max-w-4xl mx-auto">{renderContent()}</div>

//       {/* AnimatePresence handles enter/exit animation */}
//       <AnimatePresence>{showModal && <OrderModal onClose={handleReset} />}</AnimatePresence>
//     </main>
//   );
// }
'use client';
import React, { useState, useEffect,useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import successAnimation from '../../../public/lottie/Success.json'; // Adjust path if needed
import errorAnimation from '../../../public/lottie/Error.json'; // Adjust path if needed
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
// import Image from 'next/image';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// --- SUB-COMPONENTS ---
const AnimatedCheckmark = () => (<div className="w-40 h-40 mx-auto"><Lottie animationData={successAnimation} loop={false} /></div>);
const ErrorIcon = () => (<div className="w-32 h-32 mx-auto mb-4"><Lottie animationData={errorAnimation} loop={false} /></div>);

const PaymentSuccess = ({ onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => { onAnimationEnd(); }, 3000); // Shorter delay
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="text-center text-yellow-200 font-redhead">
      <AnimatedCheckmark />
      <h1 className="lg:text-4xl text-2xl font-bold text-green-500 lg:mt-6 mt-2 mb-4">Order Placed Successfully!</h1>
      <p className="lg:text-lg">Thank you for choosing RAAMYA. Your order is being processed.</p>
    </div>
  );
};

const PaymentFailed = ({ onRetry }) => (
  <div className="text-center text-yellow-200 font-redhead">
    <ErrorIcon />
    <h1 className="text-4xl font-bold text-red-500 mb-4">Sorry, Payment Failed</h1>
    <div className="mt-12 flex flex-col items-center space-y-4">
      <button onClick={onRetry} className="bg-[#EFAF00] text-black font-bold py-3 px-16 rounded-lg text-lg cursor-pointer hover:bg-yellow-600">Try Payment Again</button>
    </div>
  </div>
);

const OrderModal = ({ order }) => {
  if (!order) return null;
  return (
    <motion.div
  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-redhead"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <motion.div
    className="relative w-full max-w-lg mx-auto bg-black border text-[#EFAF00] border-[#EFAF00]/50 rounded-2xl p-4"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.5, opacity: 0 }}
  >
   
    <h2 className="lg:text-5xl text-3xl text-center font-bold mb-4">COMPLETE !!</h2>

   

    <div className="bg-black/80 backdrop-blur-sm border  border-[#EFAF00]/30 rounded-lg p-6">
      <h3 className="text-3xl text-center font-semibold">Thank you!</h3>
      <p className="lg:text-2xl text-xl text-center mt-1 whitespace-nowrap mb-6">Your order has been received</p>

      {/* --- Order Summary --- */}
      <div className="text-left space-y-2 lg:text-base text-sm text-yellow-100/80 mb-6">
        <div className="flex justify-between">
          <span className="font-semibold">Order ID:</span>
          <span>{order._id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Date:</span>
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span>Rs {order.totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Payment Method:</span>
          <span>{order.paymentMethod}</span>
        </div>
      </div>

      {/* --- Ordered Products --- */}
      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
        {order.orderItems?.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 border border-[#EFAF00]/20 rounded-lg p-3"
          >
            <Image
            width={100}
            height={100}
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-sm text-yellow-200/80">
                Size: {item.size} | Qty: {item.qty}
              </p>
              <p className="text-[#EFAF00] font-bold">Rs {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <a href="/allproducts">
        <button className="mt-8 cursor-pointer bg-[#EFAF00] hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg text-lg w-full">
          Continue Shopping
        </button>
      </a>
    </div>
  </motion.div>
</motion.div>

    
  );
};

// --- MAIN PAGE COMPONENT ---
export default function PaymentResultPage() {
  const params = useParams();
  const router = useRouter();
  const { orderId, status } = params;
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState(null);
 const toastShown = useRef(false); // <- add this

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (status === 'success' && orderId) {
        const token = localStorage.getItem('authToken');
        try {
          const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, { headers: { 'Authorization': `Bearer ${token}` } });
          const data = await res.json();
          console.log(data);
          if (res.ok) setOrder(data);
        } catch (e) { console.error("Could not fetch order for modal"); }
      }
    };
    fetchOrderDetails();
  }, [orderId, status]);

  const handleRetry = () => {
    router.push(`/upipayment/${orderId}`);
  };

  // Only show the modal for COD orders for now, as UPI success is handled on the other page

  const handleAnimationEnd = () => {
    if (order) {
      setShowModal(true);

      // Only show toast once
      if (!toastShown.current) {
        toastShown.current = true;
        toast.success("Order details have been sent to your email!", { duration: 5000 });
      }

      // Redirect after 5 seconds
      setTimeout(() => {
        router.replace('/allproducts');
      }, 10000);
    }
  };

  return (
    <main className="bg-black lg:min-h-[90vh] min-h-screen flex items-center justify-center relative font-redhead">
      <Toaster position="top-center" />
      <div className="w-full max-w-4xl mx-auto">
        {status === 'success' ? <PaymentSuccess onAnimationEnd={handleAnimationEnd} /> : <PaymentFailed onRetry={handleRetry} />}
      </div>
      <AnimatePresence>{showModal && <OrderModal order={order} />}</AnimatePresence>
    </main>
  );
}