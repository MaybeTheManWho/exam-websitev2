import React, { useState } from 'react';
import { Users, FileText, PlusCircle, UserCog, Home, BookOpen, Bell, Award, Newspaper } from 'lucide-react';
import StudentsTab from './StudentsTab';
import ExamScoresTab from './ExamScoresTab';
import CreateExamTab from './CreateExamTab';
import AdminManagementTab from './AdminManagementTab';
import GatManagementTab from './GatManagementTab';
import NewsManagementTab from './NewsManagementTab';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard = ({ user, onLogout }) => {
  const { darkMode, t } = useAppContext();
  const [activeTab, setActiveTab] = useState('students');
  
  // Check if user is root admin
  const isRootAdmin = user.isRoot === true;
  
  // Main content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentsTab />;
      case 'examScores':
        return <ExamScoresTab />;
      case 'createExam':
        return <CreateExamTab />;
      case 'adminManagement':
        return <AdminManagementTab user={user} />;
      case 'gatManagement':
        return <GatManagementTab />;
      case 'newsManagement':
        return <NewsManagementTab />;
      default:
        return <StudentsTab />;
    }
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 shadow-gray-700/20' : 'bg-white shadow-gray-200/50'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
            <h1 className="text-2xl font-bold">{t.adminDashboard}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className={`h-6 w-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'} cursor-pointer hover:text-blue-500 transition-colors duration-200`} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t.welcome}, {user.name}
              {isRootAdmin && (
                <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                  darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                }`}>
                  Root Admin
                </span>
              )}
            </span>
            <button
              onClick={onLogout}
              className={`${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white px-3 py-1 rounded-md text-sm transition-colors duration-200`}
            >
              {t.logout}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar navigation */}
          <div className={`w-full md:w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-4`}>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'students' 
                    ? darkMode 
                      ? 'bg-blue-900/50 text-blue-200' 
                      : 'bg-blue-50 text-blue-700' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                <span>{t.studentsTab}</span>
              </button>
              
              <button
                onClick={() => setActiveTab('examScores')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'examScores' 
                    ? darkMode 
                      ? 'bg-blue-900/50 text-blue-200' 
                      : 'bg-blue-50 text-blue-700' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <FileText className="mr-3 h-5 w-5" />
                <span>{t.examScoresTab}</span>
              </button>
              
              <button
                onClick={() => setActiveTab('createExam')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'createExam' 
                    ? darkMode 
                      ? 'bg-blue-900/50 text-blue-200' 
                      : 'bg-blue-50 text-blue-700' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <PlusCircle className="mr-3 h-5 w-5" />
                <span>{t.createExamTab}</span>
              </button>
              
              <button
                onClick={() => setActiveTab('gatManagement')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'gatManagement' 
                    ? darkMode 
                      ? 'bg-blue-900/50 text-blue-200' 
                      : 'bg-blue-50 text-blue-700' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Award className="mr-3 h-5 w-5" />
                <span>{t.gatManagementTab}</span>
              </button>
              
              <button
                onClick={() => setActiveTab('newsManagement')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'newsManagement' 
                    ? darkMode 
                      ? 'bg-blue-900/50 text-blue-200' 
                      : 'bg-blue-50 text-blue-700' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Newspaper className="mr-3 h-5 w-5" />
                <span>{t.newsManagementTab}</span>
              </button>
              
              {/* Only show admin management for root user */}
              {isRootAdmin && (
                <button
                  onClick={() => setActiveTab('adminManagement')}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'adminManagement' 
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-200' 
                        : 'bg-blue-50 text-blue-700' 
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <UserCog className="mr-3 h-5 w-5" />
                  <span>{t.adminManagementTab}</span>
                </button>
              )}
              
              <hr className={`my-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
              
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Home className="mr-3 h-5 w-5" />
                <span>{t.goToHomepage}</span>
              </button>
            </nav>
          </div>
          
          {/* Main content area */}
          <div className={`flex-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;