import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [loginType, setLoginType] = useState('student'); // 'student' or 'admin'
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStudentLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // For now, we'll just accept any input and navigate to the dashboard
    // In a real implementation, this would validate against a database
    setTimeout(() => {
      // Create user object to pass to parent component
      const user = {
        id: studentId,
        name: studentName,
        isAdmin: false,
        isRoot: false,
        loginTime: new Date().toISOString()
      };
      
      // Call the onLogin callback with the user data
      onLogin(user);
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Check for root admin (in a real app, this would authenticate against a database)
    if (adminUsername === 'root' && adminPassword === 'root123') {
      setTimeout(() => {
        const adminUser = {
          id: 'root123',
          name: 'Root Administrator',
          isAdmin: true,
          isRoot: true,
          loginTime: new Date().toISOString()
        };
        onLogin(adminUser);
        setIsLoading(false);
      }, 1000);
    } 
    // Check for regular admin
    else if (adminUsername === 'admin' && adminPassword === 'admin123') {
      setTimeout(() => {
        const adminUser = {
          id: 'admin001',
          name: 'Administrator',
          isAdmin: true,
          isRoot: false,
          loginTime: new Date().toISOString()
        };
        onLogin(adminUser);
        setIsLoading(false);
      }, 1000);
    } 
    // Invalid credentials
    else {
      setTimeout(() => {
        setError('Invalid username or password');
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Exam Portal</h1>
          <p className="text-gray-600 mt-2">Please log in to continue</p>
        </div>
        
        {/* Login type toggle */}
        <div className="flex border border-gray-300 rounded-md overflow-hidden mb-6">
          <button
            onClick={() => setLoginType('student')}
            className={`flex-1 py-2 text-center text-sm font-medium ${
              loginType === 'student' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setLoginType('admin')}
            className={`flex-1 py-2 text-center text-sm font-medium ${
              loginType === 'admin' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Administrator
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {/* Student login form */}
        {loginType === 'student' && (
          <form onSubmit={handleStudentLogin}>
            <div className="mb-4">
              <label htmlFor="studentId" className="block text-gray-700 text-sm font-medium mb-2">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="studentName" className="block text-gray-700 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="studentName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login as Student'
              )}
            </button>
          </form>
        )}
        
        {/* Admin login form */}
        {loginType === 'admin' && (
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <label htmlFor="adminUsername" className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="adminUsername"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="adminPassword" className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="adminPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login as Administrator'
              )}
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Root account: username 'root', password 'root123'</p>
              <p>Admin account: username 'admin', password 'admin123'</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;