import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Check } from 'lucide-react';

const ExamQuestion = ({ exam, onSubmitExam }) => {
  // Mock questions data
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(exam ? exam.duration * 60 : 3600); // in seconds
  const [examSubmitted, setExamSubmitted] = useState(false);

  // Load questions when component mounts
  useEffect(() => {
    // In a real application, this would fetch from an API
    // Simulating data fetch
    const sampleQuestions = Array(exam.questionCount)
      .fill(null)
      .map((_, index) => ({
        id: `q-${index + 1}`,
        text: `Sample question ${index + 1} for the ${exam.name} exam?`,
        options: [
          { id: `q-${index + 1}-a`, text: `Option A for question ${index + 1}` },
          { id: `q-${index + 1}-b`, text: `Option B for question ${index + 1}` },
          { id: `q-${index + 1}-c`, text: `Option C for question ${index + 1}` },
          { id: `q-${index + 1}-d`, text: `Option D for question ${index + 1}` },
        ],
        correctAnswer: `q-${index + 1}-${['a', 'b', 'c', 'd'][Math.floor(Math.random() * 4)]}`
      }));
    
    setQuestions(sampleQuestions);
    
    // Initialize empty answers
    const initialAnswers = {};
    sampleQuestions.forEach(q => {
      initialAnswers[q.id] = null;
    });
    setAnswers(initialAnswers);
  }, [exam]);

  // Timer effect
  useEffect(() => {
    if (examSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [examSubmitted]);

  // Format time for display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleSelectAnswer = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Toggle mark question for review
  const toggleMarkQuestion = (questionId) => {
    setMarkedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Handle exam submission
  const handleSubmitExam = () => {
    setExamSubmitted(true);
    
    // Calculate results
    let correctCount = 0;
    const results = questions.map(question => {
      const isCorrect = answers[question.id] === question.correctAnswer;
      if (isCorrect) correctCount++;
      
      return {
        questionId: question.id,
        questionText: question.text,
        userAnswer: answers[question.id],
        correctAnswer: question.correctAnswer,
        isCorrect
      };
    });
    
    // Pass results to parent component
    onSubmitExam({
      examId: exam.id,
      examName: exam.name,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score: Math.round((correctCount / questions.length) * 100),
      timeSpent: exam.duration * 60 - timeLeft,
      submittedAt: new Date().toISOString(),
      answers: results
    });
  };

  // Calculate progress percentage
  const answeredQuestionsCount = Object.values(answers).filter(a => a !== null).length;
  const progressPercentage = questions.length > 0 
    ? Math.round((answeredQuestionsCount / questions.length) * 100) 
    : 0;

  // Current question
  const currentQuestion = questions[currentQuestionIndex] || null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with timer */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">{exam.name}</h1>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className={`font-mono font-bold text-lg ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left sidebar - Progress and navigation */}
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg p-4 mb-4">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{answeredQuestionsCount}/{questions.length} Questions Answered</span>
                <span>{progressPercentage}%</span>
              </div>
            </div>
            
            {/* Question navigation */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-3">Questions</h2>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`
                      h-9 w-9 rounded-md flex items-center justify-center font-medium text-sm
                      ${currentQuestionIndex === index ? 'ring-2 ring-blue-500' : ''}
                      ${answers[question.id] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      ${markedQuestions.includes(question.id) ? 'border-2 border-yellow-400' : ''}
                    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-sm bg-gray-100"></div>
                  <span className="text-sm text-gray-600">Not answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-sm bg-green-100"></div>
                  <span className="text-sm text-gray-600">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-sm bg-gray-100 border-2 border-yellow-400"></div>
                  <span className="text-sm text-gray-600">Marked for review</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content area - Question */}
          <div className="md:col-span-3">
            {currentQuestion ? (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-lg font-medium">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </h2>
                  <button
                    onClick={() => toggleMarkQuestion(currentQuestion.id)}
                    className={`
                      flex items-center px-3 py-1 rounded-md text-sm
                      ${markedQuestions.includes(currentQuestion.id) 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-700'}
                    `}
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {markedQuestions.includes(currentQuestion.id) ? 'Marked' : 'Mark for review'}
                  </button>
                </div>
                
                <div className="mb-8">
                  <p className="text-lg text-gray-900 mb-6">{currentQuestion.text}</p>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map(option => (
                      <div
                        key={option.id}
                        onClick={() => handleSelectAnswer(currentQuestion.id, option.id)}
                        className={`
                          p-4 border rounded-lg cursor-pointer flex items-center
                          ${answers[currentQuestion.id] === option.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'}
                        `}
                      >
                        <div className={`
                          h-5 w-5 rounded-full border flex items-center justify-center mr-3
                          ${answers[currentQuestion.id] === option.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'}
                        `}>
                          {answers[currentQuestion.id] === option.id && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span>{option.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={goToPrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`
                      px-4 py-2 border rounded-md
                      ${currentQuestionIndex === 0
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
                    `}
                  >
                    Previous
                  </button>
                  
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to submit your exam? You cannot make changes after submission.')) {
                          handleSubmitExam();
                        }
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={goToNextQuestion}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center">
                <p>Loading questions...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamQuestion;