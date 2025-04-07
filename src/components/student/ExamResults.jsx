import React from 'react';
import { CheckCircle, XCircle, Clock, Award, BarChart2 } from 'lucide-react';

const ExamResults = ({ results, onReturnToDashboard }) => {
  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Get grade based on score
  const getGrade = (score) => {
    if (score >= 90) return { grade: 'A', color: 'text-green-600' };
    if (score >= 80) return { grade: 'B', color: 'text-green-500' };
    if (score >= 70) return { grade: 'C', color: 'text-yellow-500' };
    if (score >= 60) return { grade: 'D', color: 'text-orange-500' };
    return { grade: 'F', color: 'text-red-600' };
  };

  const { grade, color } = getGrade(results.score);
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Score summary card */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{results.examName}</h2>
              <p className="text-gray-500 mb-6">Completed on {new Date(results.submittedAt).toLocaleString()}</p>
              
              <div className="flex justify-center mb-6">
                <div className="h-48 w-48 rounded-full flex items-center justify-center border-8 border-blue-100">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${color}`}>{results.score}%</div>
                    <div className={`text-xl font-semibold ${color}`}>Grade: {grade}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-xl font-semibold">{results.correctAnswers}</span>
                  </div>
                  <p className="text-gray-500 text-sm text-center">Correct Answers</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <XCircle className="h-6 w-6 text-red-500 mr-2" />
                    <span className="text-xl font-semibold">{results.totalQuestions - results.correctAnswers}</span>
                  </div>
                  <p className="text-gray-500 text-sm text-center">Incorrect Answers</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-6 w-6 text-blue-500 mr-2" />
                    <span className="text-xl font-semibold">{formatTime(results.timeSpent)}</span>
                  </div>
                  <p className="text-gray-500 text-sm text-center">Time Spent</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="h-4 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500" 
                    style={{ width: `${results.score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              {results.score >= 70 ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex items-center">
                  <Award className="h-8 w-8 text-green-500 mr-3" />
                  <div className="text-left">
                    <p className="text-green-800 font-medium">Congratulations!</p>
                    <p className="text-green-700">You have successfully passed this exam.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-center">
                  <BarChart2 className="h-8 w-8 text-yellow-500 mr-3" />
                  <div className="text-left">
                    <p className="text-yellow-800 font-medium">Keep improving!</p>
                    <p className="text-yellow-700">You need a score of 70% or higher to pass this exam.</p>
                  </div>
                </div>
              )}
              
              <button
                onClick={onReturnToDashboard}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
          
          {/* Detailed answers */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-medium">Detailed Question Analysis</h3>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {results.answers.map((answer, index) => (
                  <li key={answer.questionId} className="py-4">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                        answer.isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {answer.isCorrect ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">
                          Question {index + 1}: {answer.questionText}
                        </p>
                        {answer.isCorrect ? (
                          <p className="text-green-600">
                            Correct! Your answer was right.
                          </p>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-red-600">
                              Your answer was incorrect.
                            </p>
                            <p className="text-gray-500">
                              <span className="font-medium">Your answer:</span> Option {answer.userAnswer.split('-').pop().toUpperCase()}
                            </p>
                            <p className="text-green-600">
                              <span className="font-medium">Correct answer:</span> Option {answer.correctAnswer.split('-').pop().toUpperCase()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamResults;