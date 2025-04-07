import React, { useState, useEffect } from 'react';
import LoginPage from './components/auth/LoginPage';
import StudentDashboard from './components/student/StudentDashboard';
import ExamIntroduction from './components/student/ExamIntroduction';
import ExamQuestion from './components/student/ExamQuestion';
import ExamResults from './components/student/ExamResults';
import AdminDashboard from './components/admin/AdminDashboard';
import ExamDetailPage from './components/admin/ExamDetailPage';

const App = () => {
  // Application state
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [selectedExam, setSelectedExam] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.isAdmin) {
        setCurrentView('adminDashboard');
      } else {
        setCurrentView('studentDashboard');
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
  
  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentView('login');
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
  
  // Render the appropriate view
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
        
      case 'studentDashboard':
        return (
          <StudentDashboard 
            user={user} 
            onStartExam={handleStartExam} 
            onLogout={handleLogout} 
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
        return <LoginPage onLogin={handleLogin} />;
    }
  };
  
  return (
    <div>
      {renderView()}
    </div>
  );
};

export default App;