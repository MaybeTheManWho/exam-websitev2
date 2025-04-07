import React, { useState, useEffect } from 'react';
import LoginPage from './components/auth/LoginPage';
import StudentDashboard from './components/student/StudentDashboard';
import ExamIntroduction from './components/student/ExamIntroduction';
import ExamQuestion from './components/student/ExamQuestion';
import ExamResults from './components/student/ExamResults';
import AdminDashboard from './components/admin/AdminDashboard';
import ExamDetailPage from './components/admin/ExamDetailPage';
import LandingPage from './components/LandingPage';
import GatExamPage from './components/student/GatExamPage';
import GatTrainingPage from './components/student/GatTrainingPage';
import { AppProvider } from './context/AppContext';

const App = () => {
  // Application state
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('landing');
  const [selectedExam, setSelectedExam] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [gatExamType, setGatExamType] = useState(null);
  const [gatExamDifficulty, setGatExamDifficulty] = useState(null);
  
  // Check if user is already logged in
  useEffect(() => {
    // Always show landing page first, then check login
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Only auto-redirect if URL has a specific parameter
        const params = new URLSearchParams(window.location.search);
        if (params.get('autologin') === 'true') {
          if (parsedUser.isAdmin) {
            setCurrentView('adminDashboard');
          } else {
            setCurrentView('studentDashboard');
          }
        }
      } catch (err) {
        console.error('Error parsing stored user data:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    if (userData.isAdmin) {
      setCurrentView('adminDashboard');
    } else {
      setCurrentView('studentDashboard');
    }
  };
  
  // Handle navigating to login page
  const navigateToLogin = () => {
    setCurrentView('login');
  };
  
  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentView('landing');
  };
  
  // Handle starting an exam
  const handleStartExam = (exam) => {
    setSelectedExam(exam);
    setCurrentView('examIntro');
  };
  
  // Handle starting the exam questions
  const handleStartExamQuestions = () => {
    setCurrentView('examQuestion');
  };
  
  // Handle canceling an exam
  const handleCancelExam = () => {
    setSelectedExam(null);
    setCurrentView('studentDashboard');
  };
  
  // Handle exam submission
  const handleSubmitExam = (results) => {
    setExamResults(results);
    setCurrentView('examResults');
  };
  
  // Handle returning to dashboard from results
  const handleReturnToDashboard = () => {
    setSelectedExam(null);
    setExamResults(null);
    setCurrentView('studentDashboard');
  };
  
  // Handle viewing exam details (for admin)
  const handleViewExamDetails = (examId) => {
    setSelectedExamId(examId);
    setCurrentView('examDetail');
  };
  
  // Handle going back from exam details to admin dashboard
  const handleBackToAdminDashboard = () => {
    setSelectedExamId(null);
    setCurrentView('adminDashboard');
  };
  
  // Handle navigating to GAT page
  const handleNavigateToGat = () => {
    setCurrentView('gatExam');
  };
  
  // Handle navigating to GAT training page
  const handleNavigateToGatTraining = () => {
    setCurrentView('gatTraining');
  };
  
  // Handle starting a GAT exam
  const handleStartGatExam = (type, difficulty) => {
    console.log(`Starting GAT exam - Type: ${type}, Difficulty: ${difficulty}`);
    
    setGatExamType(type);
    setGatExamDifficulty(difficulty);
    
    // Import needed functions
    import('./utils/ExamFunctions').then(module => {
      // Generate questions for the exam
      const questions = module.generateGatQuestions(type, difficulty);
      
      // Create a GAT exam object
      const gatExam = {
        id: `gat-${type}-${difficulty}`,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} GAT Exam (${difficulty})`,
        organizer: 'GAT System',
        endDate: '2025-12-31',
        addedDate: new Date().toISOString().split('T')[0],
        duration: difficulty === 'easy' ? 45 : difficulty === 'medium' ? 60 : 75,
        questionCount: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25,
        questions: questions,
        type: type,
        difficulty: difficulty
      };
      
      console.log(`Created GAT exam with ${questions.length} questions`);
      
      // Start the exam
      setSelectedExam(gatExam);
      setCurrentView('examIntro');
    }).catch(error => {
      console.error('Error loading exam functions:', error);
      alert('Failed to load exam. Please try again.');
    });
  };
  
  // Render the appropriate view
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onLogin={navigateToLogin} />;
        
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
        
      case 'studentDashboard':
        return (
          <StudentDashboard 
            user={user} 
            onStartExam={handleStartExam}
            onNavigateToGat={handleNavigateToGat}
            onNavigateToGatTraining={handleNavigateToGatTraining}
            onLogout={handleLogout} 
          />
        );
        
      case 'gatExam':
        return (
          <GatExamPage 
            onStartGatExam={handleStartGatExam} 
            onBack={() => setCurrentView('studentDashboard')} 
          />
        );
        
      case 'gatTraining':
        return (
          <GatTrainingPage 
            onBack={() => setCurrentView('studentDashboard')} 
          />
        );
        
      case 'examIntro':
        return (
          <ExamIntroduction 
            exam={selectedExam} 
            onStartExam={handleStartExamQuestions} 
            onCancel={handleCancelExam} 
          />
        );
        
      case 'examQuestion':
        return (
          <ExamQuestion 
            exam={selectedExam} 
            onSubmitExam={handleSubmitExam} 
          />
        );
        
      case 'examResults':
        return (
          <ExamResults 
            results={examResults} 
            onReturnToDashboard={handleReturnToDashboard} 
          />
        );
        
      case 'adminDashboard':
        return (
          <AdminDashboard 
            user={user} 
            onLogout={handleLogout} 
            onViewExamDetails={handleViewExamDetails}
          />
        );
      
      case 'examDetail':
        return (
          <ExamDetailPage 
            examId={selectedExamId} 
            onBack={handleBackToAdminDashboard} 
          />
        );
        
      default:
        return <LandingPage onLogin={navigateToLogin} />;
    }
  };
  
  return (
    <AppProvider>
      <div>
        {renderView()}
      </div>
    </AppProvider>
  );
};

export default App;