import React, { useState } from 'react';
import { 
  BookOpen, User, Mail, Lock, Eye, EyeOff, Edit3, Save, X, 
  Book, Bookmark, Pen, Feather, ShoppingCart, Star, Calendar,
  Package, Heart, Settings, LogOut, CreditCard, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  // User data based on schema
  const [userData, setUserData] = useState({
    user_id: 12345,
    user_name: 'Sarah Johnson',
    email_id: 'sarah.johnson@email.com',
    user_role: 'Customer'
  });

  // Profile editing states
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...userData });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Mock data for user's books and orders
  const [userStats] = useState({
    totalOrders: 23,
    totalBooks: 47,
    favoriteBooks: 12,
    totalSpent: 1247
  });

  const [recentOrders] = useState([
    {
      sale_id: 1001,
      book_title: "The Great Gatsby",
      sale_date: "2024-06-15",
      sale_price: 299,
      is_shipped: "Y",
      rating_by_customer: 5
    },
    {
      sale_id: 1002,
      book_title: "To Kill a Mockingbird",
      sale_date: "2024-06-10",
      sale_price: 349,
      is_shipped: "Y",
      rating_by_customer: 4
    },
    {
      sale_id: 1003,
      book_title: "1984",
      sale_date: "2024-06-05",
      sale_price: 279,
      is_shipped: "N",
      rating_by_customer: null
    }
  ]);

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditForm({ ...userData });
  };

  const handleSaveProfile = () => {
    setUserData({ ...editForm });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({ ...userData });
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    console.log('Password change submitted', passwordForm);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordChange(false);
  };

  const navigate = useNavigate();

  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
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

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <User className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
            My Profile
          </h1>
          <p className="text-gray-600 text-base font-medium">Manage your account and reading preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={handleEditProfile}
                    className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* User ID Display */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800 tracking-wide">User ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userData.user_id}
                      disabled
                      className="w-full px-4 py-4 bg-gray-100 border border-gray-200 rounded-2xl shadow-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Full Name Field */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800 tracking-wide">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-400 group-focus-within:text-blue-300 transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                      value={isEditing ? editForm.user_name : userData.user_name}
                      onChange={(e) => isEditing && setEditForm({...editForm, user_name: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl shadow-lg transition-all duration-300 text-gray-800 ${
                        isEditing 
                          ? 'bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 hover:bg-gray-100 focus:bg-white' 
                          : 'bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800 tracking-wide">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-purple-400 group-focus-within:text-purple-300 transition-colors duration-200" />
                    </div>
                    <input
                      type="email"
                      value={isEditing ? editForm.email_id : userData.email_id}
                      onChange={(e) => isEditing && setEditForm({...editForm, email_id: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl shadow-lg transition-all duration-300 text-gray-800 ${
                        isEditing 
                          ? 'bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 hover:bg-gray-100 focus:bg-white' 
                          : 'bg-gray-50 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>

                {/* User Role Field */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800 tracking-wide">Account Type</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userData.user_role}
                      disabled
                      className="w-full px-4 py-4 bg-gray-100 border border-gray-200 rounded-2xl shadow-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Password Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800 tracking-wide">Password</label>
                  <button
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                    className="cursor-pointer w-full flex items-center justify-between px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg hover:bg-gray-100 transition-all duration-300 text-gray-800"
                  >
                    <span className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-teal-400" />
                      <span>••••••••</span>
                    </span>
                    <span className="text-blue-600 hover:text-blue-800 font-medium">Change Password</span>
                  </button>
                </div>

                {/* Password Change Form */}
                {showPasswordChange && (
                  <div className="space-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
                    
                    {/* Current Password */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                        placeholder="Current password"
                        className="w-full pl-12 pr-14 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                        className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* New Password */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-teal-400" />
                      </div>
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        placeholder="New password"
                        className="w-full pl-12 pr-14 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                        className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Confirm New Password */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-purple-400" />
                      </div>
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        placeholder="Confirm new password"
                        className="w-full pl-12 pr-14 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                        className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handlePasswordChange}
                        className="cursor-pointer flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg"
                      >
                        Update Password
                      </button>
                      <button
                        onClick={() => setShowPasswordChange(false)}
                        className="cursor-pointer flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-4 rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats and Quick Actions */}
          <div className="space-y-6">
            {/* User Stats */}
            <div className="bg-white backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent mb-6">
                Your Reading Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-2">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{userStats.totalOrders}</p>
                  <p className="text-sm text-gray-600">Orders</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full mx-auto mb-2">
                    <Book className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{userStats.totalBooks}</p>
                  <p className="text-sm text-gray-600">Books</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-2">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{userStats.favoriteBooks}</p>
                  <p className="text-sm text-gray-600">Favorites</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-2">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">₹{userStats.totalSpent}</p>
                  <p className="text-sm text-gray-600">Spent</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500">
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-teal-600 bg-clip-text text-transparent mb-6">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all duration-300 text-gray-800">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span>Track Orders</span>
                </button>
                <button className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-teal-50 to-blue-50 hover:from-teal-100 hover:to-blue-100 rounded-xl transition-all duration-300 text-gray-800">
                  <Heart className="w-5 h-5 text-teal-600" />
                  <span>My Wishlist</span>
                </button>
                <button className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-300 text-gray-800">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>Addresses</span>
                </button>
                <button className="cursor-pointer w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all duration-300 text-gray-800">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 bg-white backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-6">
            Recent Orders
          </h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.sale_id} className="cursor-pointer flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                    <Book className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{order.book_title}</h3>
                    <p className="text-sm text-gray-600 flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(order.sale_date).toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">₹{order.sale_price}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.is_shipped === 'Y' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.is_shipped === 'Y' ? 'Shipped' : 'Processing'}
                    </span>
                    {order.rating_by_customer && renderStarRating(order.rating_by_customer)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={()=>navigate('/')} 
            className="cursor-pointer flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-1 mx-auto">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
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

export default UserProfile;