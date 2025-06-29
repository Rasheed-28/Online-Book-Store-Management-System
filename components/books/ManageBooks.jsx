import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Eye, 
  Plus, 
  User, 
  Building, 
  Tag, 
  DollarSign, 
  Hash, 
  X, 
  Check, 
  Book, 
  Bookmark, 
  Pen, 
  Feather,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Mock data - in real app, these would come from API
  const publishers = [
    { publisher_id: 1, publisher_name: 'Penguin Random House', office_address: '1745 Broadway, New York', phone: '+1-212-782-9000', email_id: 'info@penguinrandomhouse.com' },
    { publisher_id: 2, publisher_name: 'HarperCollins', office_address: '195 Broadway, New York', phone: '+1-212-207-7000', email_id: 'info@harpercollins.com' },
    { publisher_id: 3, publisher_name: 'Simon & Schuster', office_address: '1230 Avenue of the Americas', phone: '+1-212-698-7000', email_id: 'info@simonandschuster.com' },
    { publisher_id: 4, publisher_name: 'Macmillan Publishers', office_address: '120 Broadway, New York', phone: '+1-646-307-5151', email_id: 'info@macmillan.com' }
  ];

  const authors = [
    { author_id: 1, author_name: 'Stephen King', phone: '+1-207-555-0123' },
    { author_id: 2, author_name: 'J.K. Rowling', phone: '+44-20-7555-0456' },
    { author_id: 3, author_name: 'George R.R. Martin', phone: '+1-505-555-0789' },
    { author_id: 4, author_name: 'Agatha Christie', phone: '+44-20-7555-0321' },
    { author_id: 5, author_name: 'Neil Gaiman', phone: '+44-20-7555-0654' },
    { author_id: 6, author_name: 'Margaret Atwood', phone: '+1-416-555-0987' }
  ];

  const categories = [
    { category_id: 1, category_title: 'Fiction' },
    { category_id: 2, category_title: 'Non-Fiction' },
    { category_id: 3, category_title: 'Mystery & Thriller' },
    { category_id: 4, category_title: 'Science Fiction' },
    { category_id: 5, category_title: 'Fantasy' },
    { category_id: 6, category_title: 'Romance' },
    { category_id: 7, category_title: 'Biography' },
    { category_id: 8, category_title: 'History' },
    { category_id: 9, category_title: 'Self-Help' },
    { category_id: 10, category_title: 'Children\'s Books' }
  ];

  // Mock books data
  const mockBooks = [
    {
      book_id: 1,
      publisher_id: 1,
      book_title: "The Shining",
      book_price: 1299,
      isbn_number: "978-0-385-12167-8",
      book_cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      authors: [{ author_id: 1, author_name: 'Stephen King' }],
      categories: [{ category_id: 3, category_title: 'Mystery & Thriller' }, { category_id: 1, category_title: 'Fiction' }]
    },
    {
      book_id: 2,
      publisher_id: 2,
      book_title: "Harry Potter and the Philosopher's Stone",
      book_price: 899,
      isbn_number: "978-0-7475-3269-9",
      book_cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      authors: [{ author_id: 2, author_name: 'J.K. Rowling' }],
      categories: [{ category_id: 5, category_title: 'Fantasy' }, { category_id: 10, category_title: 'Children\'s Books' }]
    },
    {
      book_id: 3,
      publisher_id: 3,
      book_title: "A Game of Thrones",
      book_price: 1599,
      isbn_number: "978-0-553-10354-0",
      book_cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      authors: [{ author_id: 3, author_name: 'George R.R. Martin' }],
      categories: [{ category_id: 5, category_title: 'Fantasy' }, { category_id: 1, category_title: 'Fiction' }]
    },
    {
      book_id: 4,
      publisher_id: 1,
      book_title: "Murder on the Orient Express",
      book_price: 799,
      isbn_number: "978-0-00-711928-5",
      book_cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
      authors: [{ author_id: 4, author_name: 'Agatha Christie' }],
      categories: [{ category_id: 3, category_title: 'Mystery & Thriller' }]
    },
    {
      book_id: 5,
      publisher_id: 2,
      book_title: "American Gods",
      book_price: 1199,
      isbn_number: "978-0-380-97365-4",
      book_cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      authors: [{ author_id: 5, author_name: 'Neil Gaiman' }],
      categories: [{ category_id: 5, category_title: 'Fantasy' }, { category_id: 1, category_title: 'Fiction' }]
    },
    {
      book_id: 6,
      publisher_id: 4,
      book_title: "The Handmaid's Tale",
      book_price: 999,
      isbn_number: "978-0-385-49081-8",
      book_cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      authors: [{ author_id: 6, author_name: 'Margaret Atwood' }],
      categories: [{ category_id: 4, category_title: 'Science Fiction' }, { category_id: 1, category_title: 'Fiction' }]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setBooks(mockBooks);
      setFilteredBooks(mockBooks);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors.some(author => author.author_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        book.isbn_number.includes(searchTerm)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(book =>
        book.categories.some(cat => cat.category_id === parseInt(selectedCategory))
      );
    }

    if (selectedPublisher) {
      filtered = filtered.filter(book => book.publisher_id === parseInt(selectedPublisher));
    }

    setFilteredBooks(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedPublisher, books]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteBook = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      setBooks(books.filter(book => book.book_id !== bookToDelete.book_id));
      setShowDeleteModal(false);
      setBookToDelete(null);
      setSuccessMessage('Book deleted successfully!');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const getPublisherName = (publisherId) => {
    const publisher = publishers.find(p => p.publisher_id === publisherId);
    return publisher ? publisher.publisher_name : 'Unknown Publisher';
  };

  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Floating Book Icons */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Book className="absolute top-20 left-20 w-8 h-8 text-blue-600 animate-float" />
        <Bookmark className="absolute top-40 right-32 w-6 h-6 text-purple-600 animate-float-delayed" />
        <Pen className="absolute bottom-32 left-32 w-8 h-8 text-teal-600 animate-float-slow" />
        <BookOpen className="absolute bottom-40 right-20 w-6 h-6 text-blue-500 animate-float-delayed" />
        <Feather className="absolute top-1/3 left-1/4 w-7 h-7 text-purple-500 animate-float-slow" />
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 flex items-center space-x-2 animate-pulse">
          <Check className="w-5 h-5" />
          <span className="font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Delete Book</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{bookToDelete?.book_title}"? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <BookOpen className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Manage Books
          </h1>
          <p className="text-gray-600 text-base font-medium">Organize and maintain your library collection</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 tracking-wide">
                Search Books
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-400 group-focus-within:text-blue-300 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="Search by title, author, or ISBN..."
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 tracking-wide">
                Filter by Category
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-purple-400 group-focus-within:text-purple-300 transition-colors duration-200" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="cursor-pointer w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-300 text-gray-800"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.category_title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Publisher Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 tracking-wide">
                Filter by Publisher
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-teal-400 group-focus-within:text-teal-300 transition-colors duration-200" />
                </div>
                <select
                  value={selectedPublisher}
                  onChange={(e) => setSelectedPublisher(e.target.value)}
                  className="cursor-pointer w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all duration-300 text-gray-800"
                >
                  <option value="">All Publishers</option>
                  {publishers.map(publisher => (
                    <option key={publisher.publisher_id} value={publisher.publisher_id}>
                      {publisher.publisher_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-800">{indexOfFirstBook + 1}</span> to{' '}
              <span className="font-semibold text-gray-800">
                {Math.min(indexOfLastBook, filteredBooks.length)}
              </span>{' '}
              of <span className="font-semibold text-gray-800">{filteredBooks.length}</span> books
            </div>
            <button
              onClick={()=>navigate('/add_new_book')}  
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add New Book
            </button>
          </div>
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading books...</p>
            </div>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {currentBooks.map((book) => (
              <div key={book.book_id} className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group">
                {/* Book Cover */}
                <div className="relative overflow-hidden">
                  <img
                    src={book.book_cover}
                    alt={book.book_title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <MoreVertical className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {formatPrice(book.book_price)}
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {book.book_title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <User className="w-4 h-4 mr-1" />
                      <span>{book.authors.map(author => author.author_name).join(', ')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Building className="w-4 h-4 mr-1" />
                      <span>{getPublisherName(book.publisher_id)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Hash className="w-4 h-4 mr-1" />
                      <span>{book.isbn_number}</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {book.categories.slice(0, 2).map((category) => (
                        <span
                          key={category.category_id}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {category.category_title}
                        </span>
                      ))}
                      {book.categories.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                          +{book.categories.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="cursor-pointer flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </button>
                    <button className="cursor-pointer flex-1 bg-teal-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-teal-600 transition-colors duration-200 flex items-center justify-center">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book)}
                      className="cursor-pointer bg-red-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Quote */}
        <div className="mt-8">
          <div className="text-center p-6 bg-white backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "The library is inhabited by spirits that come out of the pages at night."
            </p>
            <p className="text-xs text-gray-400 mt-1 font-medium">— Isabel Allende</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ManageBooks;