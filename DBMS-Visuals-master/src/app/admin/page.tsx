'use client';

import { useDatabase } from '../../components/DatabaseContext';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState, useEffect } from 'react';

// Netflix-inspired color palette
const NETFLIX_COLORS = ['#E50914', '#F5F5F1', '#564D4D', '#831010', '#B20710', '#221F1F'];
const CHART_COLORS = ['#E50914', '#F40612', '#B81D24', '#831010', '#564D4D', '#F5F5F1'];

export default function Admin() {
  const { movies, rentals, payments, users } = useDatabase();
  const [animatedStats, setAnimatedStats] = useState({ revenue: 0, rentals: 0, customers: 0, movies: 0 });

  // Calculate stats
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const activeRentals = rentals.filter(rental => rental.status === 'Active').length;
  const totalCustomers = users.filter(user => user.role === 'Customer').length;

  // Animate stats on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        revenue: Math.floor(totalRevenue * progress),
        rentals: Math.floor(activeRentals * progress),
        customers: Math.floor(totalCustomers * progress),
        movies: Math.floor(movies.length * progress)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats({ revenue: totalRevenue, rentals: activeRentals, customers: totalCustomers, movies: movies.length });
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [totalRevenue, activeRentals, totalCustomers, movies.length]);

  // Prepare data for charts
  const genreData = movies.reduce((acc, movie) => {
    const existing = acc.find(item => item.genre === movie.genre);
    if (existing) {
      existing.count += 1;
      existing.revenue += movie.price;
    } else {
      acc.push({ genre: movie.genre, count: 1, revenue: movie.price });
    }
    return acc;
  }, [] as Array<{ genre: string; count: number; revenue: number }>);

  // Revenue by date (simulated data based on payments)
  const revenueByDate = payments.reduce((acc, payment) => {
    const existing = acc.find(item => item.date === payment.date);
    if (existing) {
      existing.revenue += payment.amount;
      existing.transactions += 1;
    } else {
      acc.push({ date: payment.date, revenue: payment.amount, transactions: 1 });
    }
    return acc;
  }, [] as Array<{ date: string; revenue: number; transactions: number }>);

  // Movie status distribution
  const statusData = [
    { name: 'Available', value: movies.filter(m => m.status === 'Available').length },
    { name: 'Rented', value: movies.filter(m => m.status === 'Rented').length }
  ];

  // Payment methods distribution
  const paymentMethodData = payments.reduce((acc, payment) => {
    const existing = acc.find(item => item.method === payment.mode);
    if (existing) {
      existing.count += 1;
      existing.amount += payment.amount;
    } else {
      acc.push({ method: payment.mode, count: 1, amount: payment.amount });
    }
    return acc;
  }, [] as Array<{ method: string; count: number; amount: number }>);

  return (
    <div className="min-h-screen bg-black">
      {/* Netflix-style background with subtle red accents */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-8 space-y-8">
        {/* Netflix-style ambient lighting */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-red-600/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-red-500/2 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>

        {/* Netflix-style Header */}
        <div className="relative z-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-600 px-4 py-2 rounded-sm mr-4">
                <span className="text-white font-bold text-xl tracking-wider">NETFLIX</span>
              </div>
              <div className="text-white text-2xl font-light">ADMIN</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Dashboard
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Monitor your streaming platform's performance with real-time analytics and comprehensive insights
            </p>
          </div>

          {/* Netflix-style Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/30 transition-colors">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm6 1a1 1 0 100 2h3a1 1 0 100-2H11z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{animatedStats.movies}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Total Content</div>
              <div className="mt-2 text-xs text-red-500">Movies Available</div>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/30 transition-colors">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{animatedStats.rentals}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Active Streams</div>
              <div className="mt-2 text-xs text-red-500">Currently Watching</div>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/30 transition-colors">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a4 4 0 000 8V5z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-2">₹{animatedStats.revenue}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Total Revenue</div>
              <div className="mt-2 text-xs text-red-500">+15% This Month</div>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/30 transition-colors">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{animatedStats.customers}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Subscribers</div>
              <div className="mt-2 text-xs text-red-500">Active Members</div>
            </div>
          </div>
        </div>

        {/* Netflix-style Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Content Distribution */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:bg-gray-800/80 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-3 h-6 bg-red-600 rounded-sm mr-3"></div>
              <h2 className="text-xl font-semibold text-white">Content by Genre</h2>
            </div>
          <ResponsiveContainer width="100%" height={300}>
             <PieChart>
               <Pie
                 data={genreData}
                 cx="50%"
                 cy="50%"
                 labelLine={false}
                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                 outerRadius={80}
                 fill="#8884d8"
                 dataKey="value"
               >
                 {genreData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                 ))}
               </Pie>
               <Tooltip 
                 contentStyle={{
                   backgroundColor: 'rgba(17, 24, 39, 0.8)',
                   border: '1px solid rgba(75, 85, 99, 0.3)',
                   borderRadius: '8px',
                   color: 'white'
                 }}
               />
             </PieChart>
           </ResponsiveContainer>
        </div>

          {/* Streaming Availability */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:bg-gray-800/80 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-3 h-6 bg-red-600 rounded-sm mr-3"></div>
              <h2 className="text-xl font-semibold text-white">Content Availability</h2>
            </div>
          <ResponsiveContainer width="100%" height={300}>
             <PieChart>
               <Pie
                 data={statusData}
                 cx="50%"
                 cy="50%"
                 labelLine={false}
                 label={({ name, value }) => `${name}: ${value}`}
                 outerRadius={80}
                 fill="#8884d8"
                 dataKey="value"
               >
                 {statusData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                 ))}
               </Pie>
               <Tooltip 
                 contentStyle={{
                   backgroundColor: 'rgba(17, 24, 39, 0.8)',
                   border: '1px solid rgba(75, 85, 99, 0.3)',
                   borderRadius: '8px',
                   color: 'white'
                 }}
               />
             </PieChart>
           </ResponsiveContainer>
        </div>
      </div>

        {/* Netflix-style Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Analytics */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:bg-gray-800/80 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-3 h-6 bg-red-600 rounded-sm mr-3"></div>
              <h2 className="text-xl font-semibold text-white">Revenue Analytics</h2>
            </div>
          <ResponsiveContainer width="100%" height={300}>
             <LineChart data={revenueByDate}>
               <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />
               <XAxis dataKey="date" stroke="#9CA3AF" />
               <YAxis stroke="#9CA3AF" />
               <Tooltip 
                 contentStyle={{
                   backgroundColor: 'rgba(17, 24, 39, 0.8)',
                   border: '1px solid rgba(75, 85, 99, 0.3)',
                   borderRadius: '8px',
                   color: 'white'
                 }}
               />
               <Legend wrapperStyle={{ color: '#9CA3AF' }} />
               <Line type="monotone" dataKey="revenue" stroke="#E50914" strokeWidth={3} dot={{ fill: '#E50914', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#E50914' }} />
             </LineChart>
           </ResponsiveContainer>
        </div>

          {/* Subscription Analytics */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:bg-gray-800/80 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-3 h-6 bg-red-600 rounded-sm mr-3"></div>
              <h2 className="text-xl font-semibold text-white">Payment Methods</h2>
            </div>
          <ResponsiveContainer width="100%" height={300}>
             <BarChart data={paymentMethodData}>
               <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />
               <XAxis dataKey="mode" stroke="#9CA3AF" />
               <YAxis stroke="#9CA3AF" />
               <Tooltip 
                 contentStyle={{
                   backgroundColor: 'rgba(17, 24, 39, 0.8)',
                   border: '1px solid rgba(75, 85, 99, 0.3)',
                   borderRadius: '8px',
                   color: 'white'
                 }}
               />
               <Legend wrapperStyle={{ color: '#9CA3AF' }} />
               <Bar dataKey="amount" fill="#E50914" radius={[4, 4, 0, 0]} />
             </BarChart>
           </ResponsiveContainer>
        </div>
      </div>

        {/* Genre Performance */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:bg-gray-800/80 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-3 h-6 bg-red-600 rounded-sm mr-3"></div>
            <h2 className="text-xl font-semibold text-white">Genre Performance</h2>
          </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={genreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />
            <XAxis dataKey="genre" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Bar dataKey="revenue" fill="#E50914" name="Revenue (₹)" radius={[4, 4, 0, 0]} />
             <Bar dataKey="count" fill="#F5F5F1" name="Content Count" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

        {/* Recent Activity */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:bg-gray-800/80 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-3 h-6 bg-red-600 rounded-sm mr-3"></div>
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {rentals.slice(-5).reverse().map((rental, index) => (
              <div key={rental.rentalId} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-700/50 hover:bg-black/30 hover:border-red-600/30 transition-all duration-300 group">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    rental.status === 'Active' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-red-400 transition-colors">
                      {rental.userName} • {rental.movieTitle}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {rental.date} • {rental.status}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  Due: {rental.dueDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}