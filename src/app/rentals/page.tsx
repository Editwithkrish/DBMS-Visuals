'use client';

import { useDatabase } from '../../components/DatabaseContext';
import { useState } from 'react';

export default function RentalsPage() {
  const { rentals, returnMovie } = useDatabase();
  const [filter, setFilter] = useState<'all' | 'active' | 'returned'>('all');

  const filteredRentals = rentals.filter(rental => {
    if (filter === 'active') return rental.status === 'Active';
    if (filter === 'returned') return rental.status === 'Returned';
    return true;
  });

  const handleReturn = (rentalId: number) => {
    returnMovie(rentalId);
  };

  const activeRentals = rentals.filter(rental => rental.status === 'Active');
  const returnedRentals = rentals.filter(rental => rental.status === 'Returned');
  const totalRevenue = rentals.reduce((sum, r) => sum + (r.price || 0), 0);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Netflix Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>

        {/* Netflix Header Section */}
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-600 px-4 py-2 rounded-sm mr-4">
                <span className="text-white font-bold text-xl tracking-wider">NETFLIX</span>
              </div>
              <div className="text-white text-2xl font-light">STREAMS</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Active Streams
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Monitor and manage all active streaming sessions
            </p>
          </div>

          {/* Netflix Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300">
              <div className="text-3xl font-bold text-red-500 mb-2">{activeRentals.length}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Active Streams</div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300">
              <div className="text-3xl font-bold text-green-500 mb-2">{returnedRentals.length}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Completed</div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">${totalRevenue}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Total Revenue</div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              All Rentals
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'active' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25' 
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              Active ({activeRentals.length})
            </button>
            <button
              onClick={() => setFilter('returned')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === 'returned' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25' 
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              Returned ({returnedRentals.length})
            </button>
          </div>
        </div>

        {/* Rentals Grid */}
        <div className="relative z-10">
          {filteredRentals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRentals.map((rental, index) => (
                <div 
                  key={rental.rentalId} 
                  className="glass-card p-6 hover:scale-105 transition-all duration-300 animate-slideInUp"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-sm text-gray-400">#{rental.rentalId}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      rental.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {rental.status}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🎬</span>
                      <div>
                        <div className="font-semibold text-white">{rental.movieTitle}</div>
                        <div className="text-sm text-gray-400">Movie</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">👤</span>
                      <div>
                        <div className="font-semibold text-white">{rental.userName}</div>
                        <div className="text-sm text-gray-400">Customer</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">📅</span>
                      <div>
                        <div className="font-semibold text-white">{rental.date}</div>
                        <div className="text-sm text-gray-400">Rental Date</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">⏰</span>
                      <div>
                        <div className="font-semibold text-white">{rental.dueDate}</div>
                        <div className="text-sm text-gray-400">Due Date</div>
                      </div>
                    </div>
                  </div>
                  
                  {rental.status === 'Active' && (
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <button
                        onClick={() => handleReturn(rental.rentalId)}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                      >
                        End Stream
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <div className="text-6xl mb-4 opacity-50">📭</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No Rentals Found</h3>
              <p className="text-gray-400">
                {filter === 'active' && 'No active rentals at the moment'}
                {filter === 'returned' && 'No returned rentals found'}
                {filter === 'all' && 'No rentals available'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}