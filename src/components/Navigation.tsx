'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Content', icon: '🎬', description: 'Browse Library' },
    { href: '/rentals', label: 'Streams', icon: '📺', description: 'Active Streams' },
    { href: '/payments', label: 'Billing', icon: '💳', description: 'Subscriptions' },
    { href: '/admin', label: 'Analytics', icon: '📊', description: 'Dashboard' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-lg shadow-2xl border-b border-red-500/20' 
        : 'bg-black/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">📺</div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-600">
                  NETFLIX
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-red-600/20'
                  }`}
                >
                  <span className={`text-2xl transition-transform duration-300 ${
                    isActive ? 'animate-bounce' : 'group-hover:scale-110'
                  }`}>
                    {item.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    <span className={`text-xs transition-colors ${
                      isActive ? 'text-red-200' : 'text-gray-500 group-hover:text-gray-400'
                    }`}>
                      {item.description}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 text-sm font-medium">Live Database</span>
            </div>
            <div className="text-gray-400 text-sm">
              Real-time Updates
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <div className="space-y-1">
              <div className={`w-5 h-0.5 bg-current transition-transform ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></div>
              <div className={`w-5 h-0.5 bg-current transition-opacity ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></div>
              <div className={`w-5 h-0.5 bg-current transition-transform ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-red-500/20 animate-fadeIn">
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-red-600/20'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className={`text-sm ${
                        isActive ? 'text-red-200' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div className="pt-4 mt-4 border-t border-gray-700">
                <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 text-sm font-medium">Live Database - Real-time Updates</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}