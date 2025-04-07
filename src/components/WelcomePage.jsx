import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, Award, CheckCircle, Calendar, Clock, 
  Activity, BarChart2, Book, PenTool, Crown, Shield
} from 'lucide-react';
import ThemeToggle from './common/ThemeToggle';
import { useAppContext } from '../context/AppContext';

const WelcomePage = ({ onLogin }) => {
  const { t, darkMode } = useAppContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState('student'); // 'student' or 'admin'
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mock statistics
  const stats = {
    students: 1254,
    exams: 42,
    questions: 2840,
    avgScore: 78.5,
    passRate: 92.3,
    topicsAvailable: 18
  };
  
  // Mock pricing data
  const pricingPlans = [
    {
      name: 'Basic',
      price: '0',
      features: [
        'Access to 5 public exams',
        'Basic performance tracking',
        'Limited question bank access',
        'Standard support'
      ],
      recommended: false,
      buttonText: 'Start Free'
    },
    {
      name: 'Pro',
      price: '19.99',
      features: [
        'Access to all public exams',
        'Full GAT preparation materials',
        'Detailed analytics and tracking',
        'Unlimited question bank access',
        'Priority support',
        'Custom study plans'
      ],
      recommended: true,
      buttonText: 'Get Started'
    },
    {
      name: 'Enterprise',
      price: '99.99',
      features: [
        'Everything in Pro plan',
        'Custom exam creation',
        'Team collaboration tools',
        'Advanced analytics and reporting',
        'Dedicated account manager',
        'API access'
      ],
      recommended: false,
      buttonText: 'Contact Sales'
    }
  ];
  
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
      setShowLoginModal(false);
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
        setShowLoginModal(false);
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
        setShowLoginModal(false);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md relative">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"></div>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 dark:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg mr-3">
              E
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("Exam Portal")}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => {
                setLoginType('student');
                setShowLoginModal(true);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              {t("Student Login")}
            </button>
            <button
              onClick={() => {
                setLoginType('admin');
                setShowLoginModal(true);
              }}
              className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 dark:border-blue-500 dark:text-blue-400 rounded-md transition-colors duration-200"
            >
              {t("Admin Login")}
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("Prepare for Success with Our")} <span className="text-blue-600 dark:text-blue-400">{t("Exam Portal")}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t("Comprehensive preparation tools, practice exams, and analytics to help you excel in your GAT exams and beyond.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setLoginType('student');
                  setShowLoginModal(true);
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                {t("Get Started")}
              </button>
              <button
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md text-lg transition-colors duration-200 shadow flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t("Demo Tour")}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl shadow-xl overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-pattern"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-4">{t("Start Your Journey")}</h3>
                  <p className="text-xl max-w-md mx-auto mb-6">{t("Join thousands of students achieving their academic goals")}</p>
                  <div className="flex justify-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
                      <div className="font-bold text-2xl">{stats.students.toLocaleString()}+</div>
                      <div className="text-sm">{t("Students")}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
                      <div className="font-bold text-2xl">{stats.exams.toLocaleString()}+</div>
                      <div className="text-sm">{t("Exams")}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg">
                      <div className="font-bold text-2xl">{stats.questions.toLocaleString()}+</div>
                      <div className="text-sm">{t("Questions")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 dark:bg-yellow-600 rounded-2xl shadow-lg flex items-center justify-center text-yellow-900 dark:text-yellow-100 font-bold text-xl">
              <div className="text-center">
                <div className="text-3xl">{stats.passRate}%</div>
                <div className="text-sm">{t("Pass Rate")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-16 bg-white dark:bg-gray-800 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t("Why Choose Our")} <span className="text-blue-600 dark:text-blue-400">{t("Exam Portal")}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-3 bg-blue-100 dark:bg-blue-800 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t("Comprehensive Content")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("Access thousands of practice questions, covering all GAT topics for complete preparation.")}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-3 bg-purple-100 dark:bg-purple-800 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <BarChart2 className="h-7 w-7 text-purple-600 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t("Advanced Analytics")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("Track your progress with detailed performance insights and personalized recommendations.")}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-3 bg-green-100 dark:bg-green-800 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <PenTool className="h-7 w-7 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t("Realistic Exams")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("Practice with exams that simulate the real testing environment for better preparation.")}
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/30 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-3 bg-orange-100 dark:bg-orange-800 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-orange-600 dark:text-orange-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t("Expert Support")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("Get assistance from our team of experienced educators whenever you need help.")}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Dashboard */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white">
              {t("Real-Time Statistics")}
            </h2>
            <p className="text-blue-100">
              {t("Updated statistics from our platform")}
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("Total Students")}</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats.students.toLocaleString()}</h3>
                  </div>
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-md">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+14%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">{t("from last month")}</span>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("Average Score")}</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgScore}%</h3>
                  </div>
                  <div className="p-2 bg-green-100 dark:bg-green-800 rounded-md">
                    <Activity className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+3.2%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">{t("improvement")}</span>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("Total Questions")}</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats.questions.toLocaleString()}</h3>
                  </div>
                  <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-md">
                    <Book className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+82</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">{t("new this week")}</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{t("Performance Distribution")}</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{t("Last 30 days")}</span>
              </div>
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div style={{ width: '35%' }} className="bg-green-500 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">90-100%</span>
                  </div>
                  <div style={{ width: '40%' }} className="bg-blue-500 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">70-89%</span>
                  </div>
                  <div style={{ width: '20%' }} className="bg-yellow-500 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">50-69%</span>
                  </div>
                  <div style={{ width: '5%' }} className="bg-red-500 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">&lt;50%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t("Choose Your Plan")}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("Select the perfect plan for your needs. All plans include access to our core features.")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                plan.recommended ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
              }`}>
                {plan.recommended && (
                  <div className="bg-blue-500 text-white text-center py-2 font-medium">
                    {t("Recommended")}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                    {plan.price !== '0' && (
                      <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-medium ${
                    plan.recommended 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  } transition-colors duration-200`}>
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="bg-blue-600 dark:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg mr-3">
                  E
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("Exam Portal")}</h2>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {t("Empowering students to achieve academic excellence through comprehensive exam preparation.")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t("Platform")}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("About Us")}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("Features")}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("Pricing")}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("FAQ")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t("Resources")}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("Blog")}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("Tutorials")}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("Support")}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("Contact")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t("Legal")}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("Terms of Service")}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("Privacy Policy")}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">{t("Cookie Policy")}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Exam Portal. {t("All rights reserved.")}
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                        {loginType === 'student' ? t("Student Login") : t("Administrator Login")}
                      </h3>
                      <button
                        onClick={() => setShowLoginModal(false)}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Login type toggle */}
                    <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden mb-6">
                      <button
                        onClick={() => setLoginType('student')}
                        className={`flex-1 py-2 text-center text-sm font-medium ${
                          loginType === 'student' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {t("Student")}
                      </button>
                      <button
                        onClick={() => setLoginType('admin')}
                        className={`flex-1 py-2 text-center text-sm font-medium ${
                          loginType === 'admin' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {t("Administrator")}
                      </button>
                    </div>
                    
                    {/* Error message */}
                    {error && (
                      <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 rounded-md text-sm">
                        {error}
                      </div>
                    )}
                    
                    {/* Student login form */}
                    {loginType === 'student' && (
                      <form onSubmit={handleStudentLogin}>
                        <div className="mb-4">
                          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t("Student ID")}
                          </label>
                          <input
                            type="text"
                            id="studentId"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t("Full Name")}
                          </label>
                          <input
                            type="text"
                            id="studentName"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                              {t("Logging in...")}
                            </span>
                          ) : (
                            t('Login as Student')
                          )}
                        </button>
                      </form>
                    )}
                    
                    {/* Admin login form */}
                    {loginType === 'admin' && (
                      <form onSubmit={handleAdminLogin}>
                        <div className="mb-4">
                          <label htmlFor="adminUsername" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t("Username")}
                          </label>
                          <input
                            type="text"
                            id="adminUsername"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t("Password")}
                          </label>
                          <input
                            type="password"
                            id="adminPassword"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                              {t("Logging in...")}
                            </span>
                          ) : (
                            t('Login as Administrator')
                          )}
                        </button>
                        
                        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          <p>{t("Root account")}: {t("username")} 'root', {t("password")} 'root123'</p>
                          <p>{t("Admin account")}: {t("username")} 'admin', {t("password")} 'admin123'</p>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;