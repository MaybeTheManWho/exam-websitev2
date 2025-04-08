import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const NewLoginPage = ({ onLogin }) => {
  const { darkMode, t } = useAppContext();
  const [loginType, setLoginType] = useState('signIn'); // 'signIn' or 'signUp'
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [signUpFormData, setSignUpFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle student login
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

  // Handle admin login
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

  // Handle sign up form submission 
  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Check if passwords match
    if (signUpFormData.password !== signUpFormData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // In a real app, this would send the data to a server
    // For now, we'll just simulate a success and switch to the login panel
    setTimeout(() => {
      setIsLoading(false);
      setLoginType('signIn');
      // Show a success message
      alert('Account created successfully! Please sign in.');
    }, 1000);
  };

  // Handle form input change for sign up
  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData({
      ...signUpFormData,
      [name]: value
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gradient-to-b from-gray-900 to-blue-900' : 'bg-gradient-to-b from-gray-100 to-blue-100'}`}>
      <div className={`container ${loginType === 'signUp' ? 'active' : ''} relative overflow-hidden w-full max-w-3xl min-h-[550px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl`}>
        {/* Sign In Form */}
        <div className={`form-container sign-in absolute top-0 h-full transition-all duration-600 ease-in-out ${loginType === 'signUp' ? 'transform translate-x-full opacity-0' : 'z-20 opacity-100'}`}>
          <form onSubmit={handleAdminLogin} className="bg-white dark:bg-gray-800 flex flex-col items-center justify-center h-full p-10">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{t.login}</h1>
            <div className="social-icons flex gap-2 my-4">
              <a href="#" className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10 dark:border-gray-600 dark:text-gray-300">
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10 dark:border-gray-600 dark:text-gray-300">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10 dark:border-gray-600 dark:text-gray-300">
                <i className="fa-brands fa-microsoft"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10 dark:border-gray-600 dark:text-gray-300">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.username} & {t.password}</span>
            
            {/* Error message */}
            {error && (
              <div className="w-full mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <input
              type="text"
              placeholder={t.username}
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-lg py-3 px-4 mb-3 text-gray-900 dark:text-white"
              required
            />
            <input
              type="password"
              placeholder={t.password}
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-lg py-3 px-4 mb-3 text-gray-900 dark:text-white"
              required
            />
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Forgot your password?
            </a>
            <button
              type="submit"
              className={`w-full mt-4 py-3 px-6 rounded-lg text-white font-semibold uppercase tracking-wide 
                ${isLoading 
                  ? 'bg-blue-400 dark:bg-blue-600 cursor-wait' 
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.loading}...
                </span>
              ) : (
                t.login
              )}
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Root account: username 'root', password 'root123'</p>
              <p>Admin account: username 'admin', password 'admin123'</p>
            </div>
          </form>
        </div>
        
        {/* Sign Up Form */}
        <div className={`form-container sign-up absolute top-0 h-full transition-all duration-600 ease-in-out ${loginType === 'signUp' ? 'transform translate-x-full opacity-100 z-50' : 'opacity-0 z-10'}`}>
          <form onSubmit={handleSignUp} className="bg-white dark:bg-gray-800 flex flex-col items-center justify-center h-full p-10">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{t.createAccount || 'Create Account'}</h1>
            <div className="social-icons flex gap-2 my-4">
              <a href="#" className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10 dark:border-gray-600 dark:text-gray-300">
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10 dark:border-gray-600 dark:text-gray-300">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10 dark:border-gray-600 dark:text-gray-300">
                <i className="fa-brands fa-microsoft"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10 dark:border-gray-600 dark:text-gray-300">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.orUseEmail || 'or use your email for registration'}</span>
            
            {/* Error message */}
            {error && (
              <div className="w-full mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <input
              type="text"
              name="name"
              placeholder={t.fullName}
              value={signUpFormData.name}
              onChange={handleSignUpInputChange}
              className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-lg py-3 px-4 mb-3 text-gray-900 dark:text-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signUpFormData.email}
              onChange={handleSignUpInputChange}
              className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-lg py-3 px-4 mb-3 text-gray-900 dark:text-white"
              required
            />
            <input
              type="password"
              name="password"
              placeholder={t.password}
              value={signUpFormData.password}
              onChange={handleSignUpInputChange}
              className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-lg py-3 px-4 mb-3 text-gray-900 dark:text-white"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder={t.confirmPassword}
              value={signUpFormData.confirmPassword}
              onChange={handleSignUpInputChange}
              className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-lg py-3 px-4 mb-3 text-gray-900 dark:text-white"
              required
            />
            <button
              type="submit"
              className={`w-full mt-4 py-3 px-6 rounded-lg text-white font-semibold uppercase tracking-wide 
                ${isLoading 
                  ? 'bg-blue-400 dark:bg-blue-600 cursor-wait' 
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.loading}...
                </span>
              ) : (
                t.signUp || 'Sign Up'
              )}
            </button>
          </form>
        </div>
        
        {/* Toggle Container */}
        <div className={`toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out z-1000 ${loginType === 'signUp' ? 'transform -translate-x-full rounded-r-[150px]' : 'rounded-l-[150px]'}`}>
          <div className={`toggle bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-800 dark:to-indigo-900 h-full w-[200%] relative ${loginType === 'signUp' ? 'transform translate-x-1/2' : 'transform -translate-x-full'} transition-all duration-600 ease-in-out`}>
            {/* Left Panel (shown when on sign up) */}
            <div className={`toggle-panel toggle-left absolute w-1/2 h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-600 ease-in-out ${loginType === 'signUp' ? 'transform translate-x-0' : 'transform -translate-x-[200%]'}`}>
              <h1 className="text-3xl font-bold text-white mb-2">{t.welcomeBack || 'Welcome Back!'}</h1>
              <p className="text-white text-sm mb-6">{t.enterDetailsToUse || 'Enter your personal details to use all of site features'}</p>
              <button 
                className="bg-transparent border border-white text-white py-2 px-6 rounded-lg font-semibold uppercase tracking-wide cursor-pointer hover:bg-white/10"
                onClick={() => setLoginType('signIn')}
              >
                {t.login}
              </button>
            </div>
            
            {/* Right Panel (shown when on sign in) */}
            <div className={`toggle-panel toggle-right absolute right-0 w-1/2 h-full flex flex-col items-center justify-center p-8 text-center transition-all duration-600 ease-in-out ${loginType === 'signUp' ? 'transform translate-x-[200%]' : 'transform translate-x-0'}`}>
              <h1 className="text-3xl font-bold text-white mb-2">{t.helloFriend || 'Hello, Friend!'}</h1>
              <p className="text-white text-sm mb-6">{t.registerWithDetailsToUse || 'Register with your personal details to use all of site features'}</p>
              <button 
                className="bg-transparent border border-white text-white py-2 px-6 rounded-lg font-semibold uppercase tracking-wide cursor-pointer hover:bg-white/10"
                onClick={() => setLoginType('signUp')}
              >
                {t.signUp || 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoginPage;