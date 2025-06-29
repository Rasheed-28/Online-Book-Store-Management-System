import React, { useState } from 'react';
import { BookOpen, Mail, Lock, Eye, EyeOff, Book, Bookmark, Pen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login submitted', { email, password, rememberMe });
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
      </div>

      <div className="relative bg-white backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200 hover:shadow-3xl transition-all duration-500">
        {/* Glassmorphism Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <BookOpen className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-base font-medium">Continue your literary adventure</p>
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
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm hover:bg-gray-100 focus:bg-white"
                placeholder="your.email@domain.com"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Enhanced Password Field */}
          <div className="space-y-3">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800 tracking-wide">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-purple-400 group-focus-within:text-purple-300 transition-colors duration-200" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-300 text-gray-800 placeholder-gray-400 backdrop-blur-sm hover:bg-gray-100 focus:bg-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Enhanced Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center group cursor-pointer">
              <div className="cursor-pointer relative">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 border-gray-300 bg-gray-50 transition-all duration-200 ${rememberMe ? 'bg-blue-500 border-blue-400' : 'group-hover:border-gray-400'}`}>
                  {rememberMe && (
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <label htmlFor="remember" className="ml-3 text-sm text-gray-600 cursor-pointer select-none group-hover:text-gray-800 transition-colors">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={() => navigate('/forgot_password')}
              className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium relative group"
            >
              Forgot password?
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>

          {/* Enhanced Sign In Button */}
          <button
            onClick={()=>navigate('/admin_dashboard')}
            type="button"
            disabled={isLoading}
            className="cursor-pointer w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                'Sign In to Your Library'
              )}
            </span>
          </button>
        </div>

        {/* Enhanced Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-6 text-sm text-gray-500 bg-gray-50 rounded-full py-1 backdrop-blur-sm">or continue with</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Enhanced Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600 text-base">
            New to our literary world?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold transition-colors relative group inline-block"
            >
              Join our community
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </button>
          </p>
        </div>

        {/* Enhanced Footer Quote */}
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
          50% { transform: translateY(-10px) rotate(2deg); }
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

export default Login;