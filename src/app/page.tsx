'use client';

import { useDatabase } from '../components/DatabaseContext';
import { useState, useEffect } from 'react';

export default function Home() {
  const { movies, users, rentMovie } = useDatabase();
  const [selectedUser, setSelectedUser] = useState(users[0]?.id || 1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const availableMovies = movies.filter(movie => movie.status === 'Available');
  const genres = ['All', ...new Set(movies.map(movie => movie.genre))];

  const filteredMovies = availableMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating': return (b.rating || 0) - (a.rating || 0);
      case 'year': return (b.year || 0) - (a.year || 0);
      case 'price': return a.price - b.price;
      default: return a.title.localeCompare(b.title);
    }
  });

  const handleRent = (movieId: number) => {
    rentMovie(movieId, selectedUser);
  };

  const totalMovies = movies.length;
  const availableCount = availableMovies.length;
  const rentedCount = totalMovies - availableCount;
  const averageRating = (movies.reduce((sum, movie) => sum + (movie.rating || 0), 0) / movies.length).toFixed(1);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Netflix-style Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/8 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Netflix Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-600 px-4 py-2 rounded-sm mr-4">
                <span className="text-white font-bold text-xl tracking-wider">NETFLIX</span>
              </div>
              <div className="text-white text-2xl font-light">CONTENT</div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Browse Library
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-xl mt-4 font-light max-w-2xl mx-auto leading-relaxed">Discover and stream premium content from our extensive library</p>
            <div className="flex justify-center items-center mt-6 space-x-6 text-gray-400">
              <span className="flex items-center"><span className="text-red-500 mr-1">⭐</span> {averageRating} Avg Rating</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>{totalMovies} Titles Available</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>4K Ultra HD</span>
            </div>
          </div>

          {/* Netflix Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/30 transition-colors">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{totalMovies}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Total Content</div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600/30 transition-colors">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{availableCount}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Available</div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600/30 transition-colors">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{rentedCount}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Streaming</div>
            </div>
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-800/80 transition-all duration-300 group">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-600/30 transition-colors">
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{averageRating}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Avg Rating</div>
            </div>
          </div>

          {/* Enhanced Controls */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-2">🎯</span> Movie Controls
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center"
                >
                  <span className="mr-2">🔍</span>
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                <div className="flex bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
                  >
                    ⊞
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">👤 Select User</label>
                  <select 
                    value={selectedUser} 
                    onChange={(e) => setSelectedUser(Number(e.target.value))}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  >
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">🔍 Search Movies</label>
                  <input
                    type="text"
                    placeholder="Search title, director, description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">🎭 Filter by Genre</label>
                  <select 
                    value={selectedGenre} 
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">📊 Sort By</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  >
                    <option value="title">Title (A-Z)</option>
                    <option value="rating">Rating (High-Low)</option>
                    <option value="year">Year (New-Old)</option>
                    <option value="price">Price (Low-High)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Movies Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className={`group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 border border-gray-700 hover:border-purple-500 ${
                    animateCards ? 'animate-slideInUp' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative p-6">
                    <div className="absolute top-4 right-4 text-4xl group-hover:animate-bounce">{movie.poster}</div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">{movie.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">{movie.genre}</span>
                        <span className="text-gray-400 text-sm">{movie.year}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{movie.description}</p>
                      <div className="text-xs text-gray-400 mb-3">
                        <div>🎬 {movie.director}</div>
                        <div>⏱️ {movie.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">₹{movie.price}</span>
                      <div className="flex items-center bg-yellow-500/20 px-2 py-1 rounded-full">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="text-yellow-300 font-medium">{movie.rating}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRent(movie.id)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                    >
                      ▶ Stream Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMovies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className={`bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 ${
                    animateCards ? 'animate-slideInLeft' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-6xl">{movie.poster}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{movie.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">{movie.genre}</span>
                          <span>{movie.year}</span>
                          <span>🎬 {movie.director}</span>
                          <span>⏱️ {movie.duration}</span>
                        </div>
                        <p className="text-gray-300 max-w-2xl">{movie.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">₹{movie.price}</div>
                      <div className="flex items-center justify-end mb-4">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="text-yellow-300 font-medium">{movie.rating}</span>
                      </div>
                      <button
                        onClick={() => handleRent(movie.id)}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium transform hover:scale-105"
                      >
                        ▶ Stream Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredMovies.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 animate-bounce">🎬</div>
              <h3 className="text-3xl font-bold text-white mb-4">No movies found</h3>
              <p className="text-gray-400 text-lg">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('All');
                }}
                className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}