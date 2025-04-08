import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, Clock, AlertCircle, Check, X, ArrowRight, 
  Flag, Square, CheckSquare, Save, AlertTriangle, HelpCircle 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const GatExamImplementation = ({ 
  mode, // 'math' or 'arabic'
  difficulty, // 'easy', 'medium', 'hard', or 'random'
  onComplete, 
  onCancel 
}) => {
  const { t, isRTL } = useAppContext();

  // State for exam
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showQuestionList, setShowQuestionList] = useState(false);

  // Load GAT questions from localStorage
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // For now, we'll get questions from localStorage with fallback to initial set
        let allQuestions = [];
        const storedQuestions = localStorage.getItem('gatQuestions');
        
        if (storedQuestions) {
          allQuestions = JSON.parse(storedQuestions);
        } else {
          // Fallback to a few sample questions if none in localStorage
          allQuestions = [
            {
              id: 'q1',
              topic: 'topic1',
              difficulty: 'easy',
              subject: 'math',
              bankNumber: 1,
              text: 'If x + 3 = 7, what is the value of x?',
              options: [
                { id: 'a', text: '2' },
                { id: 'b', text: '3' },
                { id: 'c', text: '4', isCorrect: true },
                { id: 'd', text: '5' }
              ],
              imageUrl: null
            },
            {
              id: 'q2',
              topic: 'topic2',
              difficulty: 'medium',
              subject: 'math',
              bankNumber: 2,
              text: 'What is the area of a circle with radius 5?',
              options: [
                { id: 'a', text: '25π', isCorrect: true },
                { id: 'b', text: '10π' },
                { id: 'c', text: '5π' },
                { id: 'd', text: '15π' }
              ],
              imageUrl: null
            },
            {
              id: 'q3',
              topic: 'topic3',
              difficulty: 'hard',
              subject: 'math',
              bankNumber: 3,
              text: 'Find the derivative of f(x) = x³ + 2x² - 5x + 3',
              options: [
                { id: 'a', text: '3x² + 4x - 5', isCorrect: true },
                { id: 'b', text: '3x² + 2x - 5' },
                { id: 'c', text: '3x² + 4x - 1' },
                { id: 'd', text: '2x² + 4x - 5' }
              ],
              imageUrl: null
            },
            {
              id: 'q4',
              topic: 'topic6',
              difficulty: 'medium',
              subject: 'arabic',
              bankNumber: 1,
              text: 'أي مما يلي هو استخدام صحيح للضمير؟',
              options: [
                { id: 'a', text: 'أنا ذهبت إلى المدرسة' },
                { id: 'b', text: 'أنا ذهبتُ إلى المدرسة', isCorrect: true },
                { id: 'c', text: 'أنا ذهبتِ إلى المدرسة' },
                { id: 'd', text: 'أنا ذهبوا إلى المدرسة' }
              ],
              imageUrl: null
            }
          ];
        }
        
        // Filter questions based on selected subject (mode)
        let filteredQuestions = allQuestions.filter(q => q.subject === mode);
        
        // Filter by difficulty if not random
        if (difficulty !== 'random') {
          filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
        }
        
        // If no questions match the criteria, include all questions for that subject
        if (filteredQuestions.length < 5) {
          filteredQuestions = allQuestions.filter(q => q.subject === mode);
        }
        
        // Limit to 55 questions for a GAT exam (or fewer if not enough questions)
        // And shuffle the questions
        const examQuestions = shuffleArray(filteredQuestions).slice(0, 55);
        
        // Initialize user answers
        const initialAnswers = {};
        examQuestions.forEach(q => {
          initialAnswers[q.id] = null;
        });
        
        setQuestions(examQuestions);
        setUserAnswers(initialAnswers);
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setLoading(false);
      }
    };
    
    loadQuestions();
  }, [mode, difficulty]);
  
  // Start timer when questions are loaded
  useEffect(() => {
    if (questions.length > 0 && !examSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      // Clean up timer
      return () => clearInterval(timer);
    }
  }, [questions, examSubmitted]);
  
  // Handle time up - auto-submit
  const handleTimeUp = useCallback(() => {
    submitExam();
  }, []);
  
  // Format time for display (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Select an answer
  const handleSelectAnswer = (optionId) => {
    if (examSubmitted) return;
    
    const questionId = questions[currentQuestionIndex].id;
    setUserAnswers({
      ...userAnswers,
      [questionId]: optionId
    });
  };
  
  // Toggle flagged status for current question
  const handleToggleFlag = () => {
    if (examSubmitted) return;
    
    const questionId = questions[currentQuestionIndex].id;
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };
  
  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Jump to specific question
  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setShowQuestionList(false);
  };
  
  // Submit exam and calculate results
  const submitExam = () => {
    // Calculate results
    let correctCount = 0;
    const results = questions.map(question => {
      const userAnswer = userAnswers[question.id];
      const correctAnswer = question.options.find(opt => opt.isCorrect)?.id;
      const isCorrect = userAnswer === correctAnswer;
      
      if (isCorrect) correctCount++;
      
      return {
        questionId: question.id,
        questionText: question.text,
        questionTopic: question.topic,
        userAnswer,
        correctAnswer,
        isCorrect
      };
    });
    
    // Prepare exam summary
    const examSummary = {
      subject: mode,
      difficulty,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score: Math.round((correctCount / questions.length) * 100),
      timeSpent: 3600 - timeLeft, // 60 minutes - remaining time
      submittedAt: new Date().toISOString(),
      answers: results
    };
    
    // Store exam results in localStorage for history
    const examHistory = JSON.parse(localStorage.getItem('gatExamHistory') || '[]');
    examHistory.push(examSummary);
    localStorage.setItem('gatExamHistory', JSON.stringify(examHistory));
    
    setExamSubmitted(true);
    onComplete(examSummary);
  };
  
  // Helper function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  // Calculate progress
  const answeredCount = Object.values(userAnswers).filter(Boolean).length;
  const progressPercentage = questions.length > 0 
    ? Math.round((answeredCount / questions.length) * 100) 
    : 0;
  
  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">{t("Loading exam questions...")}</p>
        </div>
      </div>
    );
  }
  
  // Handle case when no questions are available
  if (!loading && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t("No Questions Available")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t("There are no questions available for the selected subject and difficulty. Please try a different selection or contact an administrator.")}
          </p>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {t("Go Back")}
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with timer */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={onCancel}
              className="mr-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("GAT")} - {mode === 'math' ? t('Mathematics') : t('Arabic')} ({t(difficulty.charAt(0).toUpperCase() + difficulty.slice(1))})
            </h1>
          </div>
          
          <div className="flex items-center">
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
              timeLeft < 300 
                ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' 
                : timeLeft < 600 
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300'
                  : 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
            }`}>
              <Clock className="h-5 w-5" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
            
            <div className="ml-4 text-sm flex items-center space-x-1">
              <span className="text-gray-500 dark:text-gray-400">{t("Question")}</span>
              <span className="font-bold text-gray-900 dark:text-white">{currentQuestionIndex + 1}</span>
              <span className="text-gray-500 dark:text-gray-400">{t("of")}</span>
              <span className="font-bold text-gray-900 dark:text-white">{questions.length}</span>
            </div>
            
            <button
              onClick={() => setShowQuestionList(!showQuestionList)}
              className="ml-4 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-lg text-sm font-medium"
            >
              {t("Questions List")}
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question panel */}
          <div className="lg:col-span-9">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              {/* Question */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentQuestion.difficulty === 'easy'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : currentQuestion.difficulty === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {t(currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1))}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleToggleFlag}
                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      flaggedQuestions.includes(currentQuestion.id)
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-1.5" />
                    {flaggedQuestions.includes(currentQuestion.id) ? t("Flagged") : t("Flag for Review")}
                  </button>
                </div>
                
                <h2 
                  className="text-xl font-medium text-gray-900 dark:text-white mb-4"
                  dir={currentQuestion.subject === 'arabic' ? 'rtl' : 'ltr'}
                >
                  {currentQuestion.text}
                </h2>
                
                {currentQuestion.imageUrl && (
                  <div className="my-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex justify-center">
                    <img 
                      src={currentQuestion.imageUrl} 
                      alt={t("Question image")} 
                      className="max-h-64 rounded-lg shadow-md" 
                    />
                  </div>
                )}
              </div>
              
              {/* Answer options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectAnswer(option.id)}
                    className={`w-full flex items-start p-4 rounded-lg transition-colors duration-200 ${
                      userAnswers[currentQuestion.id] === option.id
                        ? 'bg-blue-50 dark:bg-blue-900/40 border-2 border-blue-300 dark:border-blue-700'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750'
                    }`}
                    dir={currentQuestion.subject === 'arabic' ? 'rtl' : 'ltr'}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                      userAnswers[currentQuestion.id] === option.id
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {userAnswers[currentQuestion.id] === option.id ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {option.id.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className={`text-${userAnswers[currentQuestion.id] === option.id ? 'blue-700 dark:text-blue-300' : 'gray-700 dark:text-gray-300'}`}>
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  {t("Previous")}
                </button>
                
                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
                  >
                    <Save className="h-5 w-5 mr-1.5" />
                    {t("Submit Exam")}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                  >
                    {t("Next")}
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Status panel */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">{t("Exam Status")}</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t("Progress")}</h4>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                  <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{answeredCount}/{questions.length} {t("answered")}</span>
                  <span>{progressPercentage}%</span>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mb-4">
                <div className="flex items-start mb-2">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">{t("You can flag questions to review them later before submitting.")}</p>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">{t("Your answers are automatically saved as you progress.")}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t("Status Legend")}</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t("Not answered")}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t("Answered")}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t("Flagged for review")}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-yellow-400 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t("Answered and flagged")}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t("Quick Navigation")}</h4>
                <div className="grid grid-cols-5 gap-2">
                  {questions.slice(0, 10).map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => handleJumpToQuestion(index)}
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium
                        ${currentQuestionIndex === index ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
                        ${flaggedQuestions.includes(question.id) && userAnswers[question.id] 
                          ? 'bg-blue-500 text-white border-2 border-yellow-400'
                          : flaggedQuestions.includes(question.id)
                            ? 'bg-yellow-400 text-yellow-800'
                            : userAnswers[question.id]
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Questions list modal */}
      {showQuestionList && (
        <div className="fixed inset-0 z-20 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                        {t("All Questions")}
                      </h3>
                      <button
                        onClick={() => setShowQuestionList(false)}
                        className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                      >
                        <span className="sr-only">Close</span>
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4">
                      {questions.map((question, index) => (
                        <button
                          key={question.id}
                          onClick={() => handleJumpToQuestion(index)}
                          className={`h-9 w-full rounded-md flex items-center justify-center text-sm font-medium
                            ${currentQuestionIndex === index ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
                            ${flaggedQuestions.includes(question.id) && userAnswers[question.id] 
                              ? 'bg-blue-500 text-white border-2 border-yellow-400'
                              : flaggedQuestions.includes(question.id)
                                ? 'bg-yellow-400 text-yellow-800'
                                : userAnswers[question.id]
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }
                          `}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 mr-1.5"></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{t("Not answered")}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-500 mr-1.5"></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{t("Answered")}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-yellow-400 mr-1.5"></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{t("Flagged")}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{answeredCount}/{questions.length} {t("answered")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowQuestionList(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {t("Close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirm submission modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-20 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-200" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      {t("Submit Exam")}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t("Are you sure you want to submit your exam? You cannot make changes after submission.")}
                      </p>
                      
                      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700 dark:text-yellow-200">
                              {t("You have answered")} {answeredCount} {t("out of")} {questions.length} {t("questions")}.
                              {(questions.length - answeredCount > 0) && (
                                <span className="font-medium"> {t("There are still")} {questions.length - answeredCount} {t("unanswered questions.")}</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={submitExam}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {t("Yes, Submit Now")}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmSubmit(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {t("Cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GatExamImplementation;