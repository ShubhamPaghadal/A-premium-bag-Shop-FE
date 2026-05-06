import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error, please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] font-sans">
      {/* Right side - Form (Swapped for variation) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-12">
            <ShoppingBag className="w-8 h-8 text-neutral-900" />
            <span className="text-xl font-medium tracking-widest uppercase text-neutral-900">LUMIÈRE</span>
          </div>

          <h1 className="text-3xl font-normal text-neutral-900 mb-2">Create an Account</h1>
          <p className="text-neutral-500 mb-8 font-light">Join us to experience premium bag collections.</p>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-sm text-sm mb-4 border border-red-100">{error}</div>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 block" htmlFor="name">Full Name</label>
              <input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-transparent border border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors duration-300 rounded-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 block" htmlFor="email">Email address</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent border border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors duration-300 rounded-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 block" htmlFor="password">Password</label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-transparent border border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors duration-300 rounded-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 block" htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-transparent border border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors duration-300 rounded-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-3.5 px-4 rounded-sm hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2 group mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="text-neutral-900 font-medium hover:underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Left side - Image */}
      <div className="md:w-1/2 h-64 md:h-screen relative overflow-hidden hidden md:block">
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop"
          alt="Premium Leather Bag Setup"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-10 right-10 z-20 text-white text-right">
          <h2 className="text-4xl font-light tracking-wide mb-2">Crafted for You</h2>
          <p className="text-white/90 font-light">Join the community of premium bag enthusiasts.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
