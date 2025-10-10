'use client';

import { useDatabase } from '../../components/DatabaseContext';
import { useState } from 'react';

export default function PaymentsPage() {
  const { payments } = useDatabase();
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'method'>('date');
  const [filterMethod, setFilterMethod] = useState<string>('all');

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const averagePayment = payments.length > 0 ? totalRevenue / payments.length : 0;
  const recentPayments = payments.slice(-5).reverse();

  // Payment method breakdown
  const paymentMethods = payments.reduce((acc, payment) => {
    acc[payment.mode] = (acc[payment.mode] || 0) + payment.amount;
    return acc;
  }, {} as Record<string, number>);

  const uniqueMethods = Array.from(new Set(payments.map(p => p.mode)));

  const filteredPayments = payments
    .filter(payment => filterMethod === 'all' || payment.mode === filterMethod)
    .sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'method') return a.mode.localeCompare(b.mode);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

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
              <div className="text-white text-2xl font-light">BILLING</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Subscription Management
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Monitor and manage all subscription transactions
            </p>
          </div>

          {/* Netflix Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">{payments.length}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Subscriptions</div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300">
              <div className="text-3xl font-bold text-green-500 mb-2">₹{totalRevenue}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Total Revenue</div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300">
              <div className="text-3xl font-bold text-red-500 mb-2">₹{Math.round(averagePayment)}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Avg Payment</div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300">
              <div className="text-3xl font-bold text-yellow-500 mb-2">{Object.keys(paymentMethods).length}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Payment Methods</div>
            </div>
          </div>

          {/* Payment Method Breakdown */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-8 hover:bg-gray-800/80 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <div className="w-3 h-6 bg-red-600 rounded-sm mr-3"></div>
              Payment Method Distribution
            </h2>
            <div className="space-y-4">
              {Object.entries(paymentMethods).map(([mode, amount], index) => {
                const percentage = (amount / totalRevenue) * 100;
                return (
                  <div key={mode} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {mode === 'UPI' && '📱'}
                        {mode === 'Credit Card' && '💳'}
                        {mode === 'Cash' && '💵'}
                      </div>
                      <span className="text-white font-medium">{mode}</span>
                    </div>
                    <div className="flex items-center space-x-4 flex-1 ml-6">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            mode === 'UPI' ? 'bg-green-500' : 
                            mode === 'Credit Card' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right min-w-[100px]">
                        <div className="text-white font-semibold">₹{amount}</div>
                        <div className="text-gray-400 text-sm">{percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-white font-medium">Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'method')}
                  className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:border-red-500 focus:outline-none"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="method">Payment Method</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-white font-medium">Filter:</label>
                <select 
                  value={filterMethod} 
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:border-red-500 focus:outline-none"
                >
                  <option value="all">All Methods</option>
                  {uniqueMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <div className="w-3 h-6 bg-red-600 rounded-sm mr-3"></div>
                Payment Transactions ({filteredPayments.length})
              </h2>
            </div>
            {filteredPayments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Movie</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredPayments.map((payment, index) => (
                      <tr key={payment.paymentId} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-white font-medium">{payment.userName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-300">{payment.movieTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-green-400 font-semibold">₹{payment.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-400">{payment.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            payment.mode === 'UPI' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : payment.mode === 'Credit Card'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {payment.mode === 'UPI' && '📱'}
                            {payment.mode === 'Credit Card' && '💳'}
                            {payment.mode === 'Cash' && '💵'}
                            {' '}{payment.mode}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-gray-400">
                <div className="text-4xl mb-4">💳</div>
                <p>No payments found for the selected criteria</p>
              </div>
            )}
          </div>

          {/* Recent Payments */}
          {recentPayments.length > 0 && (
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <div className="w-3 h-6 bg-red-600 rounded-sm mr-3"></div>
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentPayments.map((payment, index) => (
                  <div key={payment.paymentId} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-700/50 hover:bg-black/30 hover:border-red-600/30 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {payment.mode === 'UPI' && '📱'}
                        {payment.mode === 'Credit Card' && '💳'}
                        {payment.mode === 'Cash' && '💵'}
                      </div>
                      <div>
                        <div className="font-medium text-white">{payment.userName} • {payment.movieTitle}</div>
                        <div className="text-sm text-gray-400">{payment.date}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                      via {payment.mode}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}