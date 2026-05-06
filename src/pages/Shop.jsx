import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Filter, ChevronDown, Heart, LogOut } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'The Classic Tote',
    price: 250,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
    isNew: false,
  },
  {
    id: 2,
    name: 'Urban Backpack',
    price: 180,
    discountPrice: 150,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    isNew: false,
  },
  {
    id: 3,
    name: 'Minimalist Crossbody',
    price: 120,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 4,
    name: 'Leather Weekend Duffel',
    price: 320,
    discountPrice: 280,
    image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=1000&auto=format&fit=crop',
    isNew: false,
  },
  {
    id: 5,
    name: 'Suede Bucket Bag',
    price: 190,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop',
    isNew: true,
  },
  {
    id: 6,
    name: 'Structured Satchel',
    price: 210,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop',
    isNew: false,
  }
];

const Shop = () => {
  const [activeTab, setActiveTab] = useState('All Products');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend logout endpoint if it exists
      await fetch('/users/logout', { method: 'POST' }).catch(() => {});
    } finally {
      // Navigate to login
      navigate('/login');
    }
  };

  const tabs = ['All Products', 'Discount Products', 'New Products'];

  const filteredProducts = products.filter(product => {
    if (activeTab === 'All Products') return true;
    if (activeTab === 'Discount Products') return product.discountPrice !== null;
    if (activeTab === 'New Products') return product.isNew;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-neutral-900 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-8 h-8 text-neutral-900" />
                <span className="text-xl font-medium tracking-widest uppercase text-neutral-900">LUMIÈRE</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center bg-white border border-neutral-200 rounded-full px-4 py-2 w-96">
              <Search className="w-4 h-4 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search premium bags..." 
                className="w-full bg-transparent border-none outline-none ml-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-6">
              <button className="text-neutral-600 hover:text-neutral-900 transition-colors hidden sm:block">
                <Heart className="w-6 h-6" />
              </button>
              <button className="text-neutral-600 hover:text-neutral-900 transition-colors relative">
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden border border-neutral-300 hidden sm:block">
                 <img src="https://ui-avatars.com/api/?name=User&background=171717&color=fff" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex py-8 gap-8 relative">
        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-0 md:top-28 left-0 z-50 md:z-0
          h-screen md:h-[calc(100vh-8rem)] w-64 bg-[#FAFAFA] md:bg-transparent
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          border-r md:border-r-0 border-neutral-200 p-6 md:p-0 flex flex-col
        `}>
          <div className="flex justify-between items-center md:hidden mb-8">
            <span className="text-lg font-medium tracking-widest uppercase">Menu</span>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-neutral-500 hover:text-neutral-900">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Categories</h3>
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => {
                        setActiveTab(tab);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-md text-sm transition-all duration-200 ${
                        activeTab === tab 
                          ? 'bg-neutral-900 text-white font-medium shadow-md' 
                          : 'text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                      }`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block border-t border-neutral-200 pt-8">
               <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">Filters</h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between group cursor-pointer">
                   <span className="text-sm text-neutral-600 group-hover:text-neutral-900">Price Range</span>
                   <ChevronDown className="w-4 h-4 text-neutral-400" />
                 </div>
                 <div className="flex items-center justify-between group cursor-pointer">
                   <span className="text-sm text-neutral-600 group-hover:text-neutral-900">Color</span>
                   <ChevronDown className="w-4 h-4 text-neutral-400" />
                 </div>
                 <div className="flex items-center justify-between group cursor-pointer">
                   <span className="text-sm text-neutral-600 group-hover:text-neutral-900">Material</span>
                   <ChevronDown className="w-4 h-4 text-neutral-400" />
                 </div>
               </div>
            </div>
          </div>

          <div className="mt-auto pt-8 pb-4 md:pb-0 border-t border-neutral-200 md:border-t-0">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-sm text-neutral-500 hover:text-red-500 transition-colors w-full px-4 md:px-0 py-2 md:py-0"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-neutral-900 mb-2">{activeTab}</h1>
              <p className="text-neutral-500 font-light text-sm">Showing {filteredProducts.length} premium pieces</p>
            </div>
            <button className="md:hidden flex items-center gap-2 text-sm text-neutral-600 px-4 py-2 border border-neutral-200 rounded-full">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden rounded-md mb-4">
                  {product.discountPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10 rounded-sm">
                      Sale
                    </div>
                  )}
                  {product.isNew && !product.discountPrice && (
                    <div className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10 rounded-sm">
                      New
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm text-neutral-600 hover:text-red-500 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 translate-y-2 group-hover:translate-y-0">
                    <Heart className="w-4 h-4" />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 flex justify-center">
                    <button className="w-full bg-white/90 backdrop-blur-sm text-neutral-900 font-medium py-3 px-4 rounded-sm hover:bg-white transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 text-sm">
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-neutral-900 font-medium text-base mb-1">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    {product.discountPrice ? (
                      <>
                        <span className="text-neutral-900 font-medium">${product.discountPrice}</span>
                        <span className="text-neutral-400 line-through text-sm">${product.price}</span>
                      </>
                    ) : (
                      <span className="text-neutral-900 font-medium">${product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
             <div className="py-20 text-center">
                <p className="text-neutral-500">No products found in this category.</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
