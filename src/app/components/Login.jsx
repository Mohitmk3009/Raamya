// 'use client';
// import {React, useState } from 'react';
// import { useRouter } from 'next/navigation';

// // --- (Your SVG Icons: EyeIcon, GoogleIcon) ---
// const EyeIcon = ({ ...props }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg> );
// const GoogleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg> );

// // --- SIGN IN FORM ---
// const SignInForm = ({ setAuthMode }) => {
//     const router = useRouter();
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);
//         try {
//             const response = await fetch('http://localhost:5001/api/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });
//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message || 'Failed to login');
//             localStorage.setItem('authToken', data.token);
//             window.location.href = '/';
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <div className='font-redhead'>
//              <h2 className="text-3xl font-bold text-yellow-400 mb-6">SIGN IN</h2>
//              <form className="space-y-6" onSubmit={handleSubmit}>
//                 {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-md">{error}</p>}
//                 <div>
//                     <label className="block text-sm font-medium text-gray-400">Email Address</label>
//                     <input name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 p-2 rounded" placeholder="Email Address" />
//                 </div>
//                 <div className="relative">
//                     <label className="block text-sm font-medium text-gray-400">Password</label>
//                     <input name="password" type={passwordVisible ? "text" : "password"} value={formData.password} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 p-2 rounded" placeholder="Password" />
//                     <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400"><EyeIcon className="h-5 w-5" /></button>
//                 </div>
//                 <div className="flex items-center justify-end text-sm">
//                     <span onClick={() => setAuthMode('forgot')} className="font-medium text-yellow-400 hover:text-yellow-300 cursor-pointer">
//                         Forgot Password?
//                     </span>
//                 </div>
//                 <div>
//                     <button type="submit" disabled={loading} className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-md disabled:bg-gray-500">
//                         {loading ? 'Signing In...' : 'SIGN IN'}
//                     </button>
//                 </div>
//                 <p className="text-sm text-center text-gray-400">
//                     Don't have an account yet? <span onClick={() => setAuthMode('signup')} className="font-medium text-yellow-400 cursor-pointer">SIGN UP</span>
//                 </p>
//             </form>
//         </div>
//     );
// };

// // --- SIGN UP FORM ---
// const SignUpForm = ({ setAuthMode }) => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         if (formData.password !== formData.confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }
//         setLoading(true);
//         try {
//             const response = await fetch('http://localhost:5001/api/auth/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
//             });
//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message || 'Something went wrong');
//             alert('Registration successful! A welcome email has been sent. Please sign in.');
//             setAuthMode('signin');
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <div className='font-redhead'>
//             <h2 className="text-3xl font-bold text-yellow-400 mb-6">SIGN UP</h2>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//                 {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-md">{error}</p>}
//                 <div><label className="block text-sm font-medium text-gray-400">Name</label><input name="name" type="text" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 p-2 rounded" placeholder="Name" /></div>
//                 <div><label className="block text-sm font-medium text-gray-400">Email Address</label><input name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 p-2 rounded" placeholder="Email Address" /></div>
//                 <div><label className="block text-sm font-medium text-gray-400">Password</label><input name="password" type="password" value={formData.password} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 p-2 rounded" placeholder="Password" /></div>
//                 <div><label className="block text-sm font-medium text-gray-400">Confirm Password</label><input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 p-2 rounded" placeholder="Confirm Password" /></div>
//                 <div><button type="submit" disabled={loading} className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-md disabled:bg-gray-500">{loading ? 'Creating Account...' : 'Create Account'}</button></div>
//                 <div className="space-y-3"><a href="http://localhost:5001/api/auth/google" className="w-full flex items-center justify-center bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-gray-200"><GoogleIcon /> Sign up with Gmail</a></div>
//                 <p className="text-sm text-center text-gray-400">Already have an account? <span onClick={() => setAuthMode('signin')} className="font-medium text-yellow-400 cursor-pointer">SIGN IN</span></p>
//             </form>
//         </div>
//     );
// };

// // --- FORGOT PASSWORD FORM ---
// const ForgotPasswordForm = ({ setAuthMode }) => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState({ text: '', type: '' });
//     const [loading, setLoading] = useState(false);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage({ text: '', type: '' });
//         setLoading(true);
//         try {
//             const response = await fetch('http://localhost:5001/api/auth/forgotpassword', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email }),
//             });
//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message);
//             setMessage({ text: 'Success! A password reset link has been sent to your email.', type: 'success' });
//         } catch (err) {
//             setMessage({ text: err.message, type: 'error' });
//         } finally {
//             setLoading(false);
//         }
//     };
//     return (
//         <div className='font-redhead'>
//             <h2 className="text-3xl font-bold text-yellow-400 mb-6">RESET PASSWORD</h2>
//             <p className="text-gray-400 mb-4">Enter your email and we'll send a link to get back into your account.</p>
//             <form className="space-y-6" onSubmit={handleSubmit}>
//                 {message.text && <p className={`text-center text-sm p-2 rounded-md ${message.type === 'success' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>{message.text}</p>}
//                 <div><label className="block text-sm font-medium text-gray-400">Email Address</label><input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full bg-gray-700 p-2 rounded" placeholder="Email Address" /></div>
//                 <button type="submit" disabled={loading} className="w-full bg-yellow-400 text-black font-bold py-3 rounded disabled:bg-gray-500">{loading ? 'Sending...' : 'Send Reset Link'}</button>
//                 <p className="text-sm text-center text-gray-400">Back to <span onClick={() => setAuthMode('signin')} className="font-medium text-yellow-400 cursor-pointer">Sign In</span></p>
//             </form>
//         </div>
//     );
// };

// // --- MAIN AUTH FORM COMPONENT ---
// export default function AuthForm() {
//     const [authMode, setAuthMode] = useState('signin');
//     const renderForm = () => {
//         switch (authMode) {
//             case 'signin': return <SignInForm setAuthMode={setAuthMode} />;
//             case 'signup': return <SignUpForm setAuthMode={setAuthMode} />;
//             case 'forgot': return <ForgotPasswordForm setAuthMode={setAuthMode} />;
//             default: return <SignInForm setAuthMode={setAuthMode} />;
//         }
//     };
//     return (
//         <div className="bg-black min-h-screen font-redhead flex items-center justify-center p-4">
//             <div className="bg-black/80 border border-gray-800 rounded-2xl shadow-2xl shadow-yellow-400/10 max-w-3xl w-full">
//                 <div className="p-8 lg:p-12">
//                     <div className="text-center mb-8"><h1 className="text-4xl font-extrabold text-yellow-400 tracking-wider">RAAMYA</h1></div>
//                     <div className="relative bg-gray-800 p-1 flex rounded-full mb-8 border border-gray-700">
//                         <div className="absolute top-1 bottom-1 w-1/2 bg-yellow-400 rounded-full transition-transform" style={{ transform: authMode === 'signin' || authMode === 'forgot' ? 'translateX(0%)' : 'translateX(100%)' }}/>
//                         <button onClick={() => setAuthMode('signin')} className={`relative z-10 w-1/2 py-2 text-center font-bold transition-colors ${authMode === 'signin' || authMode === 'forgot' ? 'text-black' : 'text-white'}`}>SIGN IN</button>
//                         <button onClick={() => setAuthMode('signup')} className={`relative z-10 w-1/2 py-2 text-center font-bold transition-colors ${authMode === 'signup' ? 'text-black' : 'text-white'}`}>SIGN UP</button>
//                     </div>
//                     {renderForm()}
//                 </div>
//             </div>
//         </div>
//     );
// }
'use client';
import { React, useState } from 'react';
import { useRouter } from 'next/navigation';

// --- (Your SVG Icons: EyeIcon, EyeOffIcon, GoogleIcon) ---
const EyeIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.3 18.3 0 0 1 5.46-5.46" />
    <path d="M12 10.7a2.5 2.5 0 1 0 2.5 2.5" />
    <path d="M22 12s-3-7-10-7c-.4 0-.8.03-1.2.08" />
    <path d="M4.24 4.24 19.76 19.76" />
  </svg>
);
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// --- SIGN IN FORM ---
const SignInForm = ({ setAuthMode }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to login');
      localStorage.setItem('authToken', data.token);
      window.location.href = '/homepage';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='font-redhead'>
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">SIGN IN</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-md">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-white">Email Address</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-gray-700 p-2 rounded text-white focus:bg-white focus:text-black transition-colors duration-200"
            placeholder="Email Address"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-white">Password</label>
          <input
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-gray-700 p-2 rounded pr-10 text-white focus:bg-white focus:text-black transition-colors duration-200"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400"
          >
            {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <div className="flex items-center justify-end text-sm">
          <span onClick={() => setAuthMode('forgot')} className="font-medium text-yellow-400 hover:text-yellow-300 cursor-pointer">
            Forgot Password?
          </span>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-md disabled:bg-gray-500"
          >
            {loading ? 'Signing In...' : 'SIGN IN'}
          </button>
        </div>
        <p className="text-sm text-center text-white">
          Don't have an account yet? <span onClick={() => setAuthMode('signup')} className="font-medium text-yellow-400 cursor-pointer">SIGN UP</span>
        </p>
      </form>
    </div>
  );
};

// --- SIGN UP FORM ---
const SignUpForm = ({ setAuthMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
      alert('Registration successful! A welcome email has been sent. Please sign in.');
      setAuthMode('signin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='font-redhead'>
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">SIGN UP</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-md">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-white">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-gray-700 p-2 rounded text-white focus:bg-white focus:text-black transition-colors duration-200"
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Email Address</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-gray-700 p-2 rounded text-white focus:bg-white focus:text-black transition-colors duration-200"
            placeholder="Email Address"
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-white">Password</label>
          <input
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-gray-700 p-2 rounded pr-10 text-white focus:bg-white focus:text-black transition-colors duration-200"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400"
          >
            {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-white">Confirm Password</label>
          <input
            name="confirmPassword"
            type={confirmPasswordVisible ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-gray-700 p-2 rounded pr-10 text-white focus:bg-white focus:text-black transition-colors duration-200"
            placeholder="Confirm Password"
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400"
          >
            {confirmPasswordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-md disabled:bg-gray-500"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
        <div className="space-y-3">
          <a
            href="http://localhost:5001/api/auth/google"
            className="w-full flex items-center justify-center bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-gray-200"
          >
            <GoogleIcon /> Sign up with Gmail
          </a>
        </div>
        <p className="text-sm text-center text-white">
          Already have an account? <span onClick={() => setAuthMode('signin')} className="font-medium text-yellow-400 cursor-pointer">SIGN IN</span>
        </p>
      </form>
    </div>
  );
};

// --- FORGOT PASSWORD FORM ---
const ForgotPasswordForm = ({ setAuthMode }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage({ text: 'Success! A password reset link has been sent to your email.', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='font-redhead'>
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">RESET PASSWORD</h2>
      <p className="text-white mb-4">Enter your email and we'll send a link to get back into your account.</p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {message.text && <p className={`text-center text-sm p-2 rounded-md ${message.type === 'success' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>{message.text}</p>}
        <div>
          <label className="block text-sm font-medium text-white">Email Address</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full bg-gray-700 p-2 rounded text-white focus:bg-white focus:text-black transition-colors duration-200"
            placeholder="Email Address"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded disabled:bg-gray-500"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <p className="text-sm text-center text-white">
          Back to <span onClick={() => setAuthMode('signin')} className="font-medium text-yellow-400 cursor-pointer">Sign In</span>
        </p>
      </form>
    </div>
  );
};

// --- MAIN AUTH FORM COMPONENT ---
export default function AuthForm() {
  const [authMode, setAuthMode] = useState('signin');
  const renderForm = () => {
    switch (authMode) {
      case 'signin':
        return <SignInForm setAuthMode={setAuthMode} />;
      case 'signup':
        return <SignUpForm setAuthMode={setAuthMode} />;
      case 'forgot':
        return <ForgotPasswordForm setAuthMode={setAuthMode} />;
      default:
        return <SignInForm setAuthMode={setAuthMode} />;
    }
  };

  return (
    <div className="bg-black min-h-screen font-redhead flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-yellow-400/10 max-w-3xl w-full">
        <div className="p-8 lg:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wider">RAAMYA</h1>
          </div>
          <div className="relative bg-gray-800 p-1 flex rounded-full mb-8 border border-gray-700">
            <div
              className="absolute top-1 bottom-1 w-1/2 bg-yellow-400 rounded-full transition-transform"
              style={{ transform: authMode === 'signin' || authMode === 'forgot' ? 'translateX(0%)' : 'translateX(100%)' }}
            />
            <button
              onClick={() => setAuthMode('signin')}
              className={`relative z-10 w-1/2 py-2 text-center font-bold transition-colors ${authMode === 'signin' || authMode === 'forgot' ? 'text-black' : 'text-white'}`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`relative z-10 w-1/2 py-2 text-center font-bold transition-colors ${authMode === 'signup' ? 'text-black' : 'text-white'}`}
            >
              SIGN UP
            </button>
          </div>
          {renderForm()}
        </div>
      </div>
    </div>
  );
}