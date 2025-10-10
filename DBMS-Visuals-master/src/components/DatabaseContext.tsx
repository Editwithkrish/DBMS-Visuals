'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockDB } from '../data/mockDB';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Movie = {
  id: number;
  title: string;
  genre: string;
  status: string;
  price: number;
  description: string;
};

type Rental = {
  rentalId: number;
  movieId: number;
  userId: number;
  movieTitle: string;
  userName: string;
  date: string;
  status: string;
  dueDate: string;
};

type Payment = {
  paymentId: number;
  userId: number;
  userName: string;
  amount: number;
  date: string;
  mode: string;
  movieTitle: string;
};

type DatabaseContextType = {
  users: User[];
  movies: Movie[];
  rentals: Rental[];
  payments: Payment[];
  rentMovie: (movieId: number, userId: number) => void;
  returnMovie: (rentalId: number) => void;
};

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [db, setDb] = useState(mockDB);

  const rentMovie = (movieId: number, userId: number = 1) => {
    const movie = db.movies.find(m => m.id === movieId);
    const user = db.users.find(u => u.id === userId);
    
    if (movie && movie.status === 'Available' && user) {
      const newRentalId = Date.now();
      const newPaymentId = Date.now() + 1;
      const currentDate = new Date().toISOString().split('T')[0];
      const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      setDb(prevDb => ({
        ...prevDb,
        movies: prevDb.movies.map(m => 
          m.id === movieId ? { ...m, status: 'Rented' } : m
        ),
        rentals: [
          ...prevDb.rentals,
          {
            rentalId: newRentalId,
            movieId,
            userId,
            movieTitle: movie.title,
            userName: user.name,
            date: currentDate,
            status: 'Active',
            dueDate
          }
        ],
        payments: [
          ...prevDb.payments,
          {
            paymentId: newPaymentId,
            userId,
            userName: user.name,
            amount: movie.price,
            date: currentDate,
            mode: 'UPI',
            movieTitle: movie.title
          }
        ]
      }));
    }
  };

  const returnMovie = (rentalId: number) => {
    const rental = db.rentals.find(r => r.rentalId === rentalId);
    
    if (rental) {
      setDb(prevDb => ({
        ...prevDb,
        movies: prevDb.movies.map(m => 
          m.id === rental.movieId ? { ...m, status: 'Available' } : m
        ),
        rentals: prevDb.rentals.map(r => 
          r.rentalId === rentalId ? { ...r, status: 'Returned' } : r
        )
      }));
    }
  };

  return (
    <DatabaseContext.Provider value={{
      users: db.users,
      movies: db.movies,
      rentals: db.rentals,
      payments: db.payments,
      rentMovie,
      returnMovie
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};