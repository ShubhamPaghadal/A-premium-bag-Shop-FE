import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] font-sans">
      {/* Left side - Image */}
      <div className="md:w-1/2 h-64 md:h-screen relative overflow-hidden hidden md:block">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2000&auto=format&fit=crop"
          alt="Premium Leather Bag"
          className="w-full h-full object-inherit"
        />
        <div className="absolute bottom-10 left-10 z-20 text-white">
          <h2 className="text-4xl font-light tracking-wide mb-2">Elegance in Every Detail</h2>
          <p className="text-white/80 font-light">Discover our new collection of premium bags.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-12">
            <ShoppingBag className="w-8 h-8 text-neutral-900" />
            <span className="text-xl font-medium tracking-widest uppercase text-neutral-900">LUMIÈRE</span>
          </div>

          <h1 className="text-3xl font-normal text-neutral-900 mb-2">Welcome Back</h1>
          <p className="text-neutral-500 mb-8 font-light">Please enter your details to sign in.</p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 block" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent border border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors duration-300 rounded-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-neutral-700 block" htmlFor="password">Password</label>
                <a href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-transparent border border-neutral-300 focus:border-neutral-900 focus:ring-0 outline-none transition-colors duration-300 rounded-sm"
                required
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded-sm border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900" />
              <label htmlFor="remember" className="text-sm text-neutral-600">Remember for 30 days</label>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-3.5 px-4 rounded-sm hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2 group mt-8"
            >
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-neutral-600">
              Don't have an account?
              <Link to="/signup" className=" ">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
