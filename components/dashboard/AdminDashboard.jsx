import React, { useState } from 'react';
import { 
  BookOpen, User, Mail, Package, Users, Building, UserCheck,
  Book, Bookmark, Pen, Feather, ShoppingCart, Star, Calendar,
  Heart, Settings, LogOut, CreditCard, MapPin, Plus, Edit3,
  Save, X, Eye, EyeOff, Search, Filter, MoreVertical, TrendingUp,
  DollarSign, FileText, Tag, Truck, Award, BarChart3, PieChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const navigate = useNavigate()

  // Mock data for dashboard stats
  const [dashboardStats] = useState({
    totalUsers: 1247,
    totalBooks: 2856,
    totalSales: 15823,
    totalRevenue: 287456,
    pendingOrders: 47,
    activePublishers: 156,
    totalAuthors: 892,
    totalCategories: 24
  });

  // Mock data for recent activities
  const [recentActivities] = useState([
    { id: 1, type: 'sale', description: 'New order #1234 placed', time: '2 minutes ago', amount: 299 },
    { id: 2, type: 'user', description: 'New user registration', time: '5 minutes ago', user: 'John Doe' },
    { id: 3, type: 'book', description: 'Book "1984" updated', time: '10 minutes ago', book: '1984' },
    { id: 4, type: 'publisher', description: 'New publisher added', time: '15 minutes ago', publisher: 'Penguin Books' }
  ]);

  // Mock data for entities
  const [entities] = useState({
    users: [
      { user_id: 1, user_name: 'Sarah Johnson', email_id: 'sarah@email.com', user_role: 'Customer' },
      { user_id: 2, user_name: 'Mike Admin', email_id: 'admin@bookstore.com', user_role: 'Admin' },
      { user_id: 3, user_name: 'Emma Reader', email_id: 'emma@email.com', user_role: 'Customer' }
    ],
    books: [
      { book_id: 1, book_title: 'The Great Gatsby', book_price: 299, isbn_number: '978-0-7432-7356-5', publisher: 'Scribner' },
      { book_id: 2, book_title: 'To Kill a Mockingbird', book_price: 349, isbn_number: '978-0-06-112008-4', publisher: 'Harper Lee' },
      { book_id: 3, book_title: '1984', book_price: 279, isbn_number: '978-0-452-28423-4', publisher: 'Plume Books' }
    ],
    publishers: [
      { publisher_id: 1, publisher_name: 'Penguin Random House', office_addresss: '1745 Broadway, NY', phone: '+1-212-782-9000', email_id: 'contact@penguin.com' },
      { publisher_id: 2, publisher_name: 'HarperCollins', office_addresss: '195 Broadway, NY', phone: '+1-212-207-7000', email_id: 'info@harpercollins.com' }
    ],
    authors: [
      { author_id: 1, author_name: 'F. Scott Fitzgerald', phone: '+1-555-0123' },
      { author_id: 2, author_name: 'Harper Lee', phone: '+1-555-0124' },
      { author_id: 3, author_name: 'George Orwell', phone: '+1-555-0125' },
      { author_id: 4, author_name: 'Faraz Inam', phone: '+1-555-0126' }
    ],
    categories: [
      { category_id: 1, category_title: 'Fiction' },
      { category_id: 2, category_title: 'Non-Fiction' },
      { category_id: 3, category_title: 'Science Fiction' },
      { category_id: 4, category_title: 'Biography' }
    ],
    sales: [
      { sale_id: 1, user_name: 'Sarah Johnson', book_title: 'The Great Gatsby', sale_date: '2024-06-15', sale_price: 299, sale_discount_pct: 10 },
      { sale_id: 2, user_name: 'Emma Reader', book_title: 'To Kill a Mockingbird', sale_date: '2024-06-14', sale_price: 349, sale_discount_pct: 5 }
    ]
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'books', label: 'Books', icon: Book },
    { id: 'publishers', label: 'Publishers', icon: Building },
    { id: 'authors', label: 'Authors', icon: Pen },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'sales', label: 'Sales', icon: ShoppingCart },
    { id: 'coupons', label: 'Coupons', icon: Award }
  ];

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${color} rounded-2xl shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  const TableRow = ({ data, columns, onEdit, onDelete }) => (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      {columns.map((column) => (
        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          {column.render ? column.render(data[column.key], data) : data[column.key]}
        </td>
      ))}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(data)}
            className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(data)}
            className="cursor-pointer text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers.toLocaleString()}
          icon={Users}
          color="from-blue-500 to-purple-500"
          change={12}
        />
        <StatCard
          title="Total Books"
          value={dashboardStats.totalBooks.toLocaleString()}
          icon={Book}
          color="from-teal-500 to-blue-500"
          change={8}
        />
        <StatCard
          title="Total Sales"
          value={dashboardStats.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="from-purple-500 to-pink-500"
          change={15}
        />
        <StatCard
          title="Revenue"
          value={`PKR ${dashboardStats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-green-500 to-emerald-500"
          change={23}
        />
      </div>

      {/* Recent Activities */}
      <div className="bg-white backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-gray-200">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-6">
          Recent Activities
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  activity.type === 'sale' ? 'bg-green-100 text-green-600' :
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'book' ? 'bg-purple-100 text-purple-600' :
                  'bg-teal-100 text-teal-600'
                }`}>
                  {activity.type === 'sale' ? <ShoppingCart className="w-5 h-5" /> :
                   activity.type === 'user' ? <User className="w-5 h-5" /> :
                   activity.type === 'book' ? <Book className="w-5 h-5" /> :
                   <Building className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.description}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
              {activity.amount && (
                <span className="font-bold text-green-600">₹{activity.amount}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEntityTable = (entityType) => {
    const data = entities[entityType] || [];
    
    const columnConfigs = {
      users: [
        { key: 'user_id', label: 'ID' },
        { key: 'user_name', label: 'Name' },
        { key: 'email_id', label: 'Email' },
        { key: 'user_role', label: 'Role', render: (value) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {value}
          </span>
        )}
      ],
      books: [
        { key: 'book_id', label: 'ID' },
        { key: 'book_title', label: 'Title' },
        { key: 'book_price', label: 'Price', render: (value) => `₹${value}` },
        { key: 'isbn_number', label: 'ISBN' },
        { key: 'publisher', label: 'Publisher' }
      ],
      publishers: [
        { key: 'publisher_id', label: 'ID' },
        { key: 'publisher_name', label: 'Name' },
        { key: 'office_addresss', label: 'Address' },
        { key: 'phone', label: 'Phone' },
        { key: 'email_id', label: 'Email' }
      ],
      authors: [
        { key: 'author_id', label: 'ID' },
        { key: 'author_name', label: 'Name' },
        { key: 'phone', label: 'Phone' }
      ],
      categories: [
        { key: 'category_id', label: 'ID' },
        { key: 'category_title', label: 'Title' }
      ],
      sales: [
        { key: 'sale_id', label: 'Sale ID' },
        { key: 'user_name', label: 'Customer' },
        { key: 'book_title', label: 'Book' },
        { key: 'sale_date', label: 'Date', render: (value) => new Date(value).toLocaleDateString() },
        { key: 'sale_price', label: 'Price', render: (value) => `₹${value}` },
        { key: 'sale_discount_pct', label: 'Discount', render: (value) => `${value}%` }
      ]
    };

    const columns = columnConfigs[entityType] || [];
    const filteredData = data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return (
      <div className="bg-white backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent capitalize">
            {entityType} Management
          </h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${entityType}...`}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <TableRow
                  key={index}
                  data={item}
                  columns={columns}
                  onEdit={(data) => console.log('Edit:', data)}
                  onDelete={(data) => console.log('Delete:', data)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No {entityType} found</p>
          </div>
        )}
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

      {/* Floating Icons */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Book className="absolute top-20 left-20 w-8 h-8 text-blue-600 animate-float" />
        <Users className="absolute top-40 right-32 w-6 h-6 text-purple-600 animate-float-delayed" />
        <BarChart3 className="absolute bottom-32 left-32 w-8 h-8 text-teal-600 animate-float-slow" />
        <ShoppingCart className="absolute bottom-40 right-20 w-6 h-6 text-blue-500 animate-float-delayed" />
        <Building className="absolute top-1/3 left-1/4 w-7 h-7 text-purple-500 animate-float-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Settings className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-base font-medium">Manage your bookstore operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white backdrop-blur-2xl p-2 rounded-3xl shadow-2xl border border-gray-200 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex items-center space-x-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-96">
          {activeTab === 'overview' ? renderOverview() : renderEntityTable(activeTab)}
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white backdrop-blur-2xl p-4 rounded-2xl shadow-lg border border-gray-200 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-2">
              <Package className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-800">{dashboardStats.pendingOrders}</p>
            <p className="text-sm text-gray-600">Pending Orders</p>
          </div>
          <div className="bg-white backdrop-blur-2xl p-4 rounded-2xl shadow-lg border border-gray-200 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-2">
              <Building className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-800">{dashboardStats.activePublishers}</p>
            <p className="text-sm text-gray-600">Publishers</p>
          </div>
          <div className="bg-white backdrop-blur-2xl p-4 rounded-2xl shadow-lg border border-gray-200 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-2">
              <Pen className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-800">{dashboardStats.totalAuthors}</p>
            <p className="text-sm text-gray-600">Authors</p>
          </div>
          <div className="bg-white backdrop-blur-2xl p-4 rounded-2xl shadow-lg border border-gray-200 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-full mx-auto mb-2">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg font-bold text-gray-800">{dashboardStats.totalCategories}</p>
            <p className="text-sm text-gray-600">Categories</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button onClick={()=>navigate('/')} className="cursor-pointer flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-1 mx-auto">
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

export default AdminDashboard;