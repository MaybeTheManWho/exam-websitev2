import React, { useState, useEffect } from 'react';
import { Trash2, UserPlus, AlertCircle, Check } from 'lucide-react';

const AdminManagementTab = ({ user }) => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Check if current user is root
  const isRootUser = user.isRoot === true;
  
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setAdmins([
        { id: 'root123', username: 'root', lastLogin: '2025-03-01', isRoot: true },
        { id: 'admin001', username: 'admin1', lastLogin: '2025-03-02', isRoot: false },
        { id: 'admin002', username: 'admin2', lastLogin: '2025-02-28', isRoot: false },
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({ ...prev, [name]: value }));
    // Clear any previous messages
    setError('');
    setSuccess('');
  };
  
  const handleAddAdmin = (e) => {
    e.preventDefault();
    
    // Validate
    if (!newAdmin.username || !newAdmin.password || !newAdmin.confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (newAdmin.password !== newAdmin.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newAdmin.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    // Add new admin (in a real app, this would be an API call)
    const newAdminObj = {
      id: `admin${(admins.length + 1).toString().padStart(3, '0')}`,
      username: newAdmin.username,
      lastLogin: 'Never',
      isRoot: false
    };
    
    setAdmins(prev => [...prev, newAdminObj]);
    setSuccess(`Admin "${newAdmin.username}" added successfully`);
    setNewAdmin({ username: '', password: '', confirmPassword: '' });
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };
  
  const handleRemoveAdmin = (adminId) => {
    // Prevent removing the root user
    if (adminId === 'root123') {
      setError("Cannot remove the root administrator");
      return;
    }
    
    // Confirm before removing
    if (window.confirm("Are you sure you want to remove this administrator?")) {
      // Remove admin (in a real app, this would be an API call)
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
      setSuccess("Administrator removed successfully");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    }
  };
  
  // If not root user, show access denied
  if (!isRootUser) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
        <p className="text-gray-500 text-center max-w-md">
          Only the root administrator can access the administrator management feature.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Administrator Management</h2>
      
      {/* Success and error alerts */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-md flex items-center">
          <Check className="h-5 w-5 mr-2 text-green-500" />
          {success}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
          {error}
        </div>
      )}
      
      {/* Add new admin form */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Administrator</h3>
        
        <form onSubmit={handleAddAdmin}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={newAdmin.username}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={newAdmin.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={newAdmin.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
              />
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Administrator
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Administrators list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Current Administrators</h3>
        </div>
        
        {loading ? (
          <div className="p-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{admin.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{admin.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{admin.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.isRoot 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {admin.isRoot ? 'Root Admin' : 'Admin'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {!admin.isRoot && (
                      <button
                        onClick={() => handleRemoveAdmin(admin.id)}
                        className="text-red-600 hover:text-red-900 flex items-center justify-end w-full"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminManagementTab;