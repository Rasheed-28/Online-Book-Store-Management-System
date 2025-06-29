
import React, { useState } from 'react';
import { BookOpen, Plus, User, Building, Tag, DollarSign, Hash, X, Check, Book, Bookmark, Pen, Feather, Upload, Image, Camera, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddNewBook = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookPrice, setBookPrice] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [bookCover, setBookCover] = useState(null);
  const [bookCoverPreview, setBookCoverPreview] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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

  const handleAuthorToggle = (author) => {
    setSelectedAuthors(prev => 
      prev.find(a => a.author_id === author.author_id)
        ? prev.filter(a => a.author_id !== author.author_id)
        : [...prev, author]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.find(c => c.category_id === category.category_id)
        ? prev.filter(c => c.category_id !== category.category_id)
        : [...prev, category]
    );
  };

  const handleBookCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookCover(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBookCover = () => {
    setBookCover(null);
    setBookCoverPreview('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookTitle || !bookPrice || !isbnNumber || !selectedPublisher || selectedAuthors.length === 0 || selectedCategories.length === 0) {
      console.log('Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessMessage(true);
      console.log('Book added successfully', {
        bookTitle,
        bookPrice: parseInt(bookPrice),
        isbnNumber,
        bookCover: bookCover ? bookCover.name : null,
        selectedPublisher,
        selectedAuthors,
        selectedCategories
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        // Reset form
        setBookTitle('');
        setBookPrice('');
        setIsbnNumber('');
        setBookCover(null);
        setBookCoverPreview('');
        setSelectedPublisher('');
        setSelectedAuthors([]);
        setSelectedCategories([]);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8 relative overflow-hidden">
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
          <span className="font-semibold">Book added successfully!</span>
        </div>
      )}

      <div className="relative bg-white backdrop-blur-2xl p-8 pt-20 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-200 hover:shadow-3xl transition-all duration-500">
        {/* Back to Store Button */}
        <button
          onClick={() => navigate('/manage_books')}
          className="absolute top-4 left-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Plus className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Add New Book
          </h1>
          <p className="text-gray-600 text-base font-medium">Expand your library collection with a new literary treasure</p>
        </div>

        <div className="space-y-6">
          {/* Book Title */}
          <div className="space-y-3">
            <label htmlFor="bookTitle" className="block text-sm font-semibold text-gray-800 tracking-wide">
              Book Title *
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-blue-400 group-focus-within:text-blue-300 transition-colors duration-200" />
              </div>
              <input
                id="bookTitle"
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm hover:bg-gray-100 focus:bg-white cursor-text"
                placeholder="Enter the book title"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Book Price and ISBN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label htmlFor="bookPrice" className="block text-sm font-semibold text-gray-800 tracking-wide">
                Book Price *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-green-400 group-focus-within:text-green-300 transition-colors duration-200" />
                </div>
                <input
                  id="bookPrice"
                  type="number"
                  value={bookPrice}
                  onChange={(e) => setBookPrice(e.target.value)}
                  required
                  min="0"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm hover:bg-gray-100 focus:bg-white cursor-text"
                  placeholder="0.00"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="isbnNumber" className="block text-sm font-semibold text-gray-800 tracking-wide">
                ISBN Number *
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Hash className="h-5 w-5 text-purple-400 group-focus-within:text-purple-300 transition-colors duration-200" />
                </div>
                <input
                  id="isbnNumber"
                  type="text"
                  value={isbnNumber}
                  onChange={(e) => setIsbnNumber(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm hover:bg-gray-100 focus:bg-white cursor-text"
                  placeholder="978-0-123456-78-9"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Book Cover Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 tracking-wide">
              Book Cover Photo
            </label>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
              {!bookCoverPreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-300 group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBookCoverChange}
                    className="hidden"
                    id="bookCover"
                  />
                  <label htmlFor="bookCover" className="cursor-pointer">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                      Upload Book Cover
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Click to select or drag and drop your book cover image
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Image className="w-4 h-4" />
                        <span>PNG, JPG, JPEG</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Camera className="w-4 h-4" />
                        <span>Max 5MB</span>
                      </div>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-start space-x-6">
                    <div className="relative group">
                      <img
                        src={bookCoverPreview}
                        alt="Book cover preview"
                        className="w-32 h-48 object-cover rounded-xl shadow-lg border border-gray-200 group-hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-300 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeBookCover}
                          className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300 transform scale-95 hover:scale-100 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-semibold text-green-700">Cover uploaded successfully!</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p><span className="font-medium">File:</span> {bookCover?.name}</p>
                        <p><span className="font-medium">Size:</span> {bookCover ? (bookCover.size / 1024 / 1024).toFixed(2) : 0} MB</p>
                      </div>
                      <div className="pt-2">
                        <label htmlFor="bookCoverReplace" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Replace Cover
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBookCoverChange}
                          className="hidden"
                          id="bookCoverReplace"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Publisher Selection */}
          <div className="space-y-3">
            <label htmlFor="publisher" className="block text-sm font-semibold text-gray-800 tracking-wide">
              Publisher *
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-teal-400 group-focus-within:text-teal-300 transition-colors duration-200" />
              </div>
              <select
                id="publisher"
                value={selectedPublisher}
                onChange={(e) => setSelectedPublisher(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all duration-300 text-gray-800 backdrop-blur-sm hover:bg-gray-100 focus:bg-white cursor-pointer"
              >
                <option value="">Select a publisher</option>
                {publishers.map(publisher => (
                  <option key={publisher.publisher_id} value={publisher.publisher_id}>
                    {publisher.publisher_name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Authors Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 tracking-wide">
              Authors * (Select one or more)
            </label>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {authors.map(author => (
                  <div key={author.author_id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white transition-colors duration-200">
                    <div className="relative">
                      <input
                        id={`author-${author.author_id}`}
                        type="checkbox"
                        checked={selectedAuthors.find(a => a.author_id === author.author_id) !== undefined}
                        onChange={() => handleAuthorToggle(author)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 cursor-pointer ${
                        selectedAuthors.find(a => a.author_id === author.author_id) 
                          ? 'bg-blue-500 border-blue-400' 
                          : 'bg-white border-gray-300 hover:border-gray-400'
                      }`} onClick={() => handleAuthorToggle(author)}>
                        {selectedAuthors.find(a => a.author_id === author.author_id) && (
                          <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleAuthorToggle(author)}>
                        {author.author_name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedAuthors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedAuthors.map(author => (
                  <span key={author.author_id} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200">
                    {author.author_name}
                    <button
                      type="button"
                      onClick={() => handleAuthorToggle(author)}
                      className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Categories Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 tracking-wide">
              Categories * (Select one or more)
            </label>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(category => (
                  <div key={category.category_id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white transition-colors duration-200">
                    <div className="relative">
                      <input
                        id={`category-${category.category_id}`}
                        type="checkbox"
                        checked={selectedCategories.find(c => c.category_id === category.category_id) !== undefined}
                        onChange={() => handleCategoryToggle(category)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 transition-all duration-200 cursor-pointer ${
                        selectedCategories.find(c => c.category_id === category.category_id) 
                          ? 'bg-purple-500 border-purple-400' 
                          : 'bg-white border-gray-300 hover:border-gray-400'
                      }`} onClick={() => handleCategoryToggle(category)}>
                        {selectedCategories.find(c => c.category_id === category.category_id) && (
                          <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleCategoryToggle(category)}>
                        {category.category_title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedCategories.map(category => (
                  <span key={category.category_id} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 border border-purple-200">
                    {category.category_title}
                    <button
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className="ml-2 text-purple-600 hover:text-purple-800 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !bookTitle || !bookPrice || !isbnNumber || !selectedPublisher || selectedAuthors.length === 0 || selectedCategories.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding Book to Library...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Add Book to Library
                </>
              )}
            </span>
          </button>
        </div>

        {/* Footer Quote */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center p-4 bg-gray-50 rounded-2xl backdrop-blur-sm">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "A room without books is like a body without a soul."
            </p>
            <p className="text-xs text-gray-400 mt-1 font-medium">— Marcus Tullius Cicero</p>
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
        
        input:focus, select:focus {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default AddNewBook;
