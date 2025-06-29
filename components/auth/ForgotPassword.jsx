import React, { useState } from 'react';
import { BookOpen, Mail, ArrowLeft, Send, CheckCircle, AlertCircle, Loader2, Book, Bookmark, Pen, Feather } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setError('');
    setMessage('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage('A password reset link has been sent to your email');
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
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

      <div className="relative bg-white backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 hover:shadow-3xl transition-all duration-500">
        {/* Back Button */}
        <button
              onClick={()=>navigate('/')}
          className="cursor-pointer absolute top-6 left-6 p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Glassmorphism Header */}
        <div className="text-center mb-8 pt-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <BookOpen className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Reset Password
          </h1>
          <p className="text-gray-600 text-base font-medium leading-relaxed px-2">
            No worries! Enter your email and we'll send you a link to get back to your reading journey.
          </p>
        </div>

        <div className="space-y-6">
          {/* Enhanced Email Field */}
          <div className="space-y-3">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 tracking-wide">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-blue-400 group-focus-within:text-blue-300 transition-colors duration-200" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl shadow-lg focus:outline-none focus:ring-2 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm hover:bg-gray-100 focus:bg-white ${
                  error 
                    ? 'border-red-300 focus:ring-red-400/50 focus:border-red-400' 
                    : 'border-gray-200 focus:ring-blue-400/50 focus:border-blue-400'
                }`}
                placeholder="reader@bookstore.com"
              />
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none ${
                error 
                  ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20' 
                  : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
              }`}></div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-2xl backdrop-blur-sm animate-pulse">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-2xl backdrop-blur-sm animate-pulse">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700 text-sm font-medium">{message}</p>
            </div>
          )}

          {/* Enhanced Send Reset Link Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="cursor-pointer relative z-10 flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Reset Link</span>
                </>
              )}
            </span>
          </button>
        </div>

        {/* Enhanced Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-6 text-sm text-gray-500 bg-gray-50 rounded-full py-1 backdrop-blur-sm">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Enhanced Back to Login */}
        <div className="text-center">
          <p className="text-gray-600 text-base">
            Remember your password?{' '}
            <button 
              onClick={()=>navigate('/')}
              className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold transition-colors relative group inline-block"
            >
              Back To Sign In
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          </p>
        </div>

        {/* Enhanced Footer Quote */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center p-4 bg-gray-50 rounded-2xl backdrop-blur-sm">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "Reading is to the mind what exercise is to the body."
            </p>
            <p className="text-xs text-gray-400 mt-1 font-medium">— Joseph Addison</p>
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
        
        input:focus {
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

export default ForgotPassword;