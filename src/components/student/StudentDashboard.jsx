import React, { useState, useEffect } from 'react';
import { BookOpen, Award, BookMarked, Bell, FileText, User, Book, BarChart2, Calendar, Clock, ChevronRight, Search } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const StudentDashboard = ({ user, onStartExam, onNavigateToGat, onNavigateToGatTraining, onLogout }) => {
  const { darkMode, t } = useAppContext();
  
  // Mock data for student information and exams
  const [studentInfo, setStudentInfo] = useState(null);
  const [availableExams, setAvailableExams] = useState([]);
  const [pastExams, setPastExams] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  
  useEffect(() => {
    // In a real application, this would fetch from an API
    // Simulating data fetch
    setTimeout(() => {
      setStudentInfo({
        id: user.id,
        name: user.name,
        totalExamsTaken: 3,
        averageScore: 78.5,
        lastLogin: new Date(user.loginTime).toLocaleDateString(),
        currentStreak: 5,
        totalHours: 42,
        completionRate: 87,
        ranking: 182
      });
      
      setAvailableExams([
        {
          id: 'exam001',
          name: 'Introduction to Computer Science',
          organizer: 'Prof. Smith',
          endDate: '2025-03-15',
          addedDate: '2025-02-10',
          duration: 60, // minutes
          questionCount: 20
        },
        {
          id: 'exam002',
          name: 'Data Structures and Algorithms',
          organizer: 'Prof. Johnson',
          endDate: '2025-03-20',
          addedDate: '2025-02-15',
          duration: 90, // minutes
          questionCount: 30
        },
        {
          id: 'exam003',
          name: 'Programming Fundamentals',
          organizer: 'Prof. Williams',
          endDate: '2025-03-25',
          addedDate: '2025-02-20',
          duration: 75, // minutes
          questionCount: 25
        },
        {
          id: 'exam004',
          name: 'Web Development Basics',
          organizer: 'Prof. Davis',
          endDate: '2025-04-05',
          addedDate: '2025-02-22',
          duration: 60, // minutes
          questionCount: 20
        }
      ]);
      
      setPastExams([
        {
          id: 'past001',
          name: 'Basic Mathematics',
          date: '2025-01-15',
          score: 82,
          totalQuestions: 25,
          correctAnswers: 20
        },
        {
          id: 'past002',
          name: 'Programming Fundamentals',
          date: '2025-02-01',
          score: 75,
          totalQuestions: 20,
          correctAnswers: 15
        },
        {
          id: 'past003',
          name: 'Web Development Basics',
          date: '2025-02-20',
          score: 88,
          totalQuestions: 30,
          correctAnswers: 26
        }
      ]);
      
      setAnnouncements([
        {
          id: 'ann001',
          title: 'New GAT Training Materials Available',
          date: '2025-03-08',
          content: 'We have added 500+ new practice questions for GAT Math and Arabic sections. Check out the training section to access them.',
          isImportant: true
        },
        {
          id: 'ann002',
          title: 'System Maintenance Scheduled',
          date: '2025-03-12',
          content: 'The system will be down for maintenance from 2:00 AM to 5:00 AM on March 12th. Please plan your study sessions accordingly.',
          isImportant: false
        },
        {
          id: 'ann003',
          title: 'New Feature: Performance Analytics',
          date: '2025-03-05',
          content: 'We have launched a new feature that provides detailed analytics of your performance by topic and question type. Visit your profile to check it out.',
          isImportant: false
        },
        {
          id: 'ann004',
          title: 'GAT Exam Registration Open',
          date: '2025-03-01',
          content: 'Registration for the next GAT exam (April 15th) is now open. Make sure to register before March 25th.',
          isImportant: true
        }
      ]);
      
      setUpcomingExams([
        {
          id: 'upcoming001',
          name: 'GAT Practice Test - Math Section',
          date: '2025-03-12',
          timeRemaining: '2 days',
          difficulty: 'Medium'
        },
        {
          id: 'upcoming002',
          name: 'GAT Practice Test - Arabic Section',
          date: '2025-03-15',
          timeRemaining: '5 days',
          difficulty: 'Hard'
        },
        {
          id: 'upcoming003',
          name: 'Full GAT Mock Exam',
          date: '2025-03-20',
          timeRemaining: '10 days',
          difficulty: 'Hard'
        }
      ]);
      
      setRecentActivity([
        {
          id: 'act001',
          type: 'exam_completed',
          name: 'Web Development Basics',
          date: '2025-02-20',
          score: 88
        },
        {
          id: 'act002',
          type: 'training_completed',
          name: 'GAT Math - Geometry Practice',
          date: '2025-02-22',
          completedQuestions: 25
        },
        {
          id: 'act003',
          type: 'exam_scheduled',
          name: 'GAT Practice Test - Math Section',
          date: '2025-02-25',
          scheduledFor: '2025-03-12'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [user]);
  
  // Filter exams based on search term
  const filteredExams = availableExams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Render exam status badge
  const renderStatusBadge = (endDate) => {
    const today = new Date();
    const examEndDate = new Date(endDate);
    const daysLeft = Math.ceil((examEndDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 3) {
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
          {daysLeft <= 0 ? 'Ends Today' : `${daysLeft} Days Left`}
        </span>
      );
    } else if (daysLeft <= 7) {
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
          {daysLeft} Days Left
        </span>
      );
    } else {
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
          Open
        </span>
      );
    }
  };
  
  // Handle clicking on an upcoming exam
  const handleUpcomingExamClick = (examId) => {
    // In a real application, this would navigate to the exam details or start the exam
    // For now, we'll just show an alert
    alert(`Starting exam ${examId}`);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 shadow-gray-700/20' : 'bg-white shadow-gray-200/50'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
            <h1 className="text-2xl font-bold">{t.dashboard}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className={`h-6 w-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'} cursor-pointer hover:text-blue-500 transition-colors duration-200`} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t.welcome}, {user.name}
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
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome section */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-500 to-purple-600'} rounded-lg shadow-lg p-6 mb-6 text-white`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
              <p className="text-blue-100">Continue your preparation for the upcoming GAT exam. You've completed {studentInfo?.totalExamsTaken || 0} exams so far.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button
                onClick={onNavigateToGat}
                className="px-4 py-2 bg-white text-blue-700 rounded-md font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                Start GAT Exam
              </button>
              <button
                onClick={onNavigateToGatTraining}
                className="px-4 py-2 bg-blue-800 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Continue Training
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} mr-4`}>
              <BarChart2 className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average Score</p>
              <p className="text-xl font-semibold">{studentInfo?.averageScore || 0}%</p>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className={`p-3 rounded-full ${darkMode ? 'bg-green-900/30' : 'bg-green-100'} mr-4`}>
              <Calendar className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current Streak</p>
              <p className="text-xl font-semibold">{studentInfo?.currentStreak || 0} days</p>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className={`p-3 rounded-full ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'} mr-4`}>
              <Clock className={`h-5 w-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Study Time</p>
              <p className="text-xl font-semibold">{studentInfo?.totalHours || 0} hours</p>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 flex items-center`}>
            <div className={`p-3 rounded-full ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'} mr-4`}>
              <User className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your Ranking</p>
              <p className="text-xl font-semibold">#{studentInfo?.ranking || 0}</p>
            </div>
          </div>
        </div>
        
        {/* GAT options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div 
            onClick={onNavigateToGat}
            className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-md p-6 cursor-pointer transition-colors duration-200 flex`}
          >
            <div className={`${darkMode ? 'bg-blue-900/50' : 'bg-blue-100'} p-4 rounded-lg mr-4`}>
              <Award className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">{t.gatExam}</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Take practice exams for the General Aptitude Test (GAT) in Math and Arabic sections.
              </p>
              <button 
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white text-sm font-medium transition-colors duration-200 group`}
              >
                Start GAT Exam
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
          
          <div 
            onClick={onNavigateToGatTraining}
            className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-md p-6 cursor-pointer transition-colors duration-200 flex`}
          >
            <div className={`${darkMode ? 'bg-green-900/50' : 'bg-green-100'} p-4 rounded-lg mr-4`}>
              <BookMarked className={`h-8 w-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">{t.gatTraining}</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                Sharpen your skills with targeted practice exercises and tutorials.
              </p>
              <button 
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  darkMode
                    ? 'bg-green-600 hover:bg-green-500'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white text-sm font-medium transition-colors duration-200 group`}
              >
                Begin Training
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Announcements and Upcoming Exams */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Announcements */}
          <div className="md:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Announcements</h2>
                <button 
                  className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                  onClick={() => setShowAllAnnouncements(!showAllAnnouncements)}
                >
                  {showAllAnnouncements ? 'Show Less' : 'View All'}
                </button>
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {(showAllAnnouncements ? announcements : announcements.slice(0, 2)).map(announcement => (
                    <div 
                      key={announcement.id} 
                      className={`p-3 rounded-lg ${
                        announcement.isImportant
                          ? darkMode 
                            ? 'bg-red-900/20 border border-red-800'
                            : 'bg-red-50 border border-red-200'
                          : darkMode
                            ? 'bg-gray-700'
                            : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${
                          announcement.isImportant
                            ? darkMode ? 'text-red-300' : 'text-red-700'
                            : ''
                        }`}>
                          {announcement.title}
                          {announcement.isImportant && (
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'
                            }`}>
                              Important
                            </span>
                          )}
                        </h3>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {announcement.date}
                        </span>
                      </div>
                      <p className={`mt-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {announcement.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Upcoming Exams */}
          <div className="md:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4`}>
              <h2 className="text-lg font-bold mb-4">Upcoming Exams</h2>
              
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                </div>
              ) : upcomingExams.length > 0 ? (
                <div className="space-y-3">
                  {upcomingExams.map(exam => (
                    <div 
                      key={exam.id}
                      onClick={() => handleUpcomingExamClick(exam.id)}
                      className={`p-3 rounded-lg ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                      } cursor-pointer transition-colors duration-200`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{exam.name}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          exam.difficulty === 'Easy'
                            ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                            : exam.difficulty === 'Medium'
                              ? darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                              : darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                        }`}>
                          {exam.difficulty}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {exam.date}
                        </span>
                        <span className={`text-xs font-medium ${
                          parseInt(exam.timeRemaining) <= 2
                            ? darkMode ? 'text-red-400' : 'text-red-600'
                            : darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {exam.timeRemaining} remaining
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No upcoming exams scheduled
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar - Student info and recent activity */}
          <div className="md:col-span-1">
            {/* Student info card */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg mb-6 p-4`}>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-xl mr-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-medium">{user.name}</h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Student ID: {user.id}</p>
                </div>
              </div>
              
              {studentInfo ? (
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex justify-between">
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Exams Taken</p>
                      <p className="font-medium">{studentInfo.totalExamsTaken}</p>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex justify-between">
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average Score</p>
                      <p className="font-medium">{studentInfo.averageScore}%</p>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex justify-between">
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completion Rate</p>
                      <p className="font-medium">{studentInfo.completionRate}%</p>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex justify-between">
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Login</p>
                      <p className="font-medium">{studentInfo.lastLogin}</p>
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full mt-2 py-2 px-4 rounded-md text-sm font-medium ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    } transition-colors duration-200`}
                  >
                    View Full Profile
                  </button>
                </div>
              ) : (
                <div className="animate-pulse space-y-3">
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              )}
            </div>
            
            {/* Recent Activity */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-4`}>
              <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
              
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                </div>
              ) : recentActivity.length > 0 ? (
                <div className={`space-y-3 ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {recentActivity.map(activity => (
                    <div 
                      key={activity.id} 
                      className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-md ${
                          activity.type === 'exam_completed'
                            ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                            : activity.type === 'training_completed'
                              ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                              : darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
                        } mr-3`}>
                          {activity.type === 'exam_completed' ? (
                            <FileText className="h-5 w-5" />
                          ) : activity.type === 'training_completed' ? (
                            <Book className="h-5 w-5" />
                          ) : (
                            <Calendar className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{activity.name}</h3>
                            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {activity.date}
                            </span>
                          </div>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {activity.type === 'exam_completed' ? (
                              <>Completed with score: <span className="font-medium">{activity.score}%</span></>
                            ) : activity.type === 'training_completed' ? (
                              <>Completed {activity.completedQuestions} practice questions</>
                            ) : (
                              <>Scheduled for {activity.scheduledFor}</>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No recent activity
                </p>
              )}
            </div>
          </div>
          
          {/* Main content area - Available exams */}
          <div className="md:col-span-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-4`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{t.availableExams}</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search exams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-9 pr-4 py-2 text-sm rounded-md ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500' 
                        : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-500'
                    } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                </div>
              ) : filteredExams.length > 0 ? (
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <tr>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          {t.examName}
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          {t.organizer}
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Status
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Duration
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">{t.actions}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
                      {filteredExams.map(exam => (
                        <tr key={exam.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{exam.name}</div>
                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {exam.questionCount} questions
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{exam.organizer}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderStatusBadge(exam.endDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Clock className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-1`} />
                              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{exam.duration} min</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => onStartExam(exam)}
                              className={`${
                                darkMode 
                                  ? 'bg-blue-600 hover:bg-blue-500' 
                                  : 'bg-blue-600 hover:bg-blue-700'
                              } text-white px-4 py-2 rounded-md transition-colors duration-200`}
                            >
                              {t.start}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {searchTerm ? 'No exams found matching your search' : 'No available exams at the moment'}
                  </p>
                </div>
              )}
            </div>
            
            {/* Past exams */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-4 mt-6`}>
              <h2 className="text-lg font-bold mb-4">{t.pastExams}</h2>
              
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                  <div className="h-16 bg-gray-200 rounded w-full"></div>
                </div>
              ) : pastExams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pastExams.map(exam => (
                    <div 
                      key={exam.id} 
                      className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{exam.name}</h3>
                        <span className={`font-bold text-lg ${
                          exam.score >= 80 ? 'text-green-600' : 
                          exam.score >= 70 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {exam.score}%
                        </span>
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                        Date: {exam.date}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                        {exam.correctAnswers}/{exam.totalQuestions} correct answers
                      </div>
                      <div className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            exam.score >= 80 ? 'bg-green-600' : 
                            exam.score >= 70 ? 'bg-yellow-600' : 
                            'bg-red-600'
                          }`}
                          style={{ width: `${exam.score}%` }}
                        ></div>
                      </div>
                      <div className="mt-3 text-center">
                        <button className={`text-sm ${
                          darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                        }`}>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.noPastExams}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;