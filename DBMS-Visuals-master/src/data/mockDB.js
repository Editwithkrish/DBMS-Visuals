export const mockDB = {
  users: [
    { id: 1, name: "Krishna", email: "krishna@mail.com", role: "Customer" },
    { id: 2, name: "Divyani", email: "div@mail.com", role: "Admin" },
    { id: 3, name: "Rahul", email: "rahul@mail.com", role: "Customer" },
    { id: 4, name: "Priya", email: "priya@mail.com", role: "Customer" }
  ],
  movies: [
    { id: 101, title: "Inception", genre: "Sci-Fi", status: "Available", price: 150, description: "A mind-bending thriller about dreams within dreams", poster: "🧠", duration: "148 min", director: "Christopher Nolan", year: 2010, rating: 8.8 },
    { id: 102, title: "Avengers", genre: "Action", status: "Rented", price: 200, description: "Earth's mightiest heroes unite to save the world", poster: "⚡", duration: "143 min", director: "Joss Whedon", year: 2012, rating: 8.0 },
    { id: 103, title: "The Matrix", genre: "Sci-Fi", status: "Available", price: 180, description: "A computer hacker learns about the true nature of reality", poster: "🤖", duration: "136 min", director: "The Wachowskis", year: 1999, rating: 8.7 },
    { id: 104, title: "Titanic", genre: "Romance", status: "Available", price: 120, description: "A tragic love story aboard the ill-fated ship", poster: "🚢", duration: "195 min", director: "James Cameron", year: 1997, rating: 7.9 },
    { id: 105, title: "The Dark Knight", genre: "Action", status: "Available", price: 190, description: "Batman faces his greatest challenge yet", poster: "🦇", duration: "152 min", director: "Christopher Nolan", year: 2008, rating: 9.0 },
    { id: 106, title: "Interstellar", genre: "Sci-Fi", status: "Rented", price: 170, description: "A journey through space and time to save humanity", poster: "🚀", duration: "169 min", director: "Christopher Nolan", year: 2014, rating: 8.6 },
    { id: 107, title: "Pulp Fiction", genre: "Crime", status: "Available", price: 160, description: "Interconnected stories of crime in Los Angeles", poster: "🔫", duration: "154 min", director: "Quentin Tarantino", year: 1994, rating: 8.9 },
    { id: 108, title: "Forrest Gump", genre: "Drama", status: "Available", price: 140, description: "The extraordinary life of a simple man", poster: "🏃‍♂️", duration: "142 min", director: "Robert Zemeckis", year: 1994, rating: 8.8 },
    { id: 109, title: "Avatar", genre: "Sci-Fi", status: "Available", price: 210, description: "A marine explores an alien world called Pandora", poster: "🌍", duration: "162 min", director: "James Cameron", year: 2009, rating: 7.9 },
    { id: 110, title: "The Lion King", genre: "Animation", status: "Available", price: 130, description: "A young lion prince flees his kingdom", poster: "🦁", duration: "88 min", director: "Roger Allers", year: 1994, rating: 8.5 },
    { id: 111, title: "The Godfather", genre: "Crime", status: "Available", price: 180, description: "The aging patriarch transfers control to his son", poster: "👑", duration: "175 min", director: "Francis Ford Coppola", year: 1972, rating: 9.2 },
    { id: 112, title: "Jurassic Park", genre: "Adventure", status: "Available", price: 150, description: "Dinosaurs are brought back to life in a theme park", poster: "🦕", duration: "127 min", director: "Steven Spielberg", year: 1993, rating: 8.2 },
    { id: 113, title: "Frozen", genre: "Animation", status: "Available", price: 120, description: "A princess with ice powers learns to embrace her gift", poster: "❄️", duration: "102 min", director: "Chris Buck", year: 2013, rating: 7.4 },
    { id: 114, title: "Casablanca", genre: "Romance", status: "Available", price: 110, description: "A cynical American meets his former lover in Morocco", poster: "💔", duration: "102 min", director: "Michael Curtiz", year: 1942, rating: 8.5 },
    { id: 115, title: "Spider-Man: Into the Spider-Verse", genre: "Animation", status: "Available", price: 170, description: "Multiple Spider-People from different dimensions unite", poster: "🕷️", duration: "117 min", director: "Bob Persichetti", year: 2018, rating: 8.4 },
    { id: 116, title: "Mad Max: Fury Road", genre: "Action", status: "Available", price: 180, description: "A woman rebels against a tyrannical ruler in post-apocalyptic wasteland", poster: "🏜️", duration: "120 min", director: "George Miller", year: 2015, rating: 8.1 },
    { id: 117, title: "La La Land", genre: "Musical", status: "Available", price: 150, description: "A jazz musician and an aspiring actress fall in love", poster: "🎭", duration: "128 min", director: "Damien Chazelle", year: 2016, rating: 8.0 },
    { id: 118, title: "Parasite", genre: "Thriller", status: "Available", price: 190, description: "A poor family infiltrates a wealthy household", poster: "🏠", duration: "132 min", director: "Bong Joon-ho", year: 2019, rating: 8.5 }
  ],
  rentals: [
    {
      rentalId: 1001,
      movieId: 102,
      userId: 1,
      movieTitle: "Avengers",
      userName: "Krishna",
      date: "2024-01-15",
      status: "Active",
      dueDate: "2024-01-22"
    },
    {
      rentalId: 1002,
      movieId: 106,
      userId: 3,
      movieTitle: "Interstellar",
      userName: "Rahul",
      date: "2024-01-18",
      status: "Active",
      dueDate: "2024-01-25"
    }
  ],
  payments: [
    {
      paymentId: 2001,
      userId: 1,
      userName: "Krishna",
      amount: 200,
      date: "2024-01-15",
      mode: "UPI",
      movieTitle: "Avengers"
    },
    {
      paymentId: 2002,
      userId: 3,
      userName: "Rahul",
      amount: 170,
      date: "2024-01-18",
      mode: "Credit Card",
      movieTitle: "Interstellar"
    }
  ]
};