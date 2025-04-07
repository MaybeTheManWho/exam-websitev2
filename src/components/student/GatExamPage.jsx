import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Calculator, Clock, Award, AlertCircle, Info } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const GatExamPage = ({ onStartGatExam, onBack }) => {
  const { darkMode, t } = useAppContext();
  
  const [examType, setExamType] = useState('math');
  const [difficulty, setDifficulty] = useState('medium');
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle exam start
  const handleStartExam = () => {
    try {
      setIsStarting(true);
      
      // Log for debugging
      console.log(`Starting ${examType} GAT exam with ${difficulty} difficulty`);
      
      // Start the exam after a brief delay to show loading state
      setTimeout(() => {
        onStartGatExam(examType, difficulty);
      }, 500);
    } catch (err) {
      console.error('Error starting exam:', err);
      setError(t.errorStartingExam);
      setIsStarting(false);
    }
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <button 
            onClick={onBack}
            className={`mr-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            disabled={isStarting}
          >
            <ArrowLeft className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          </button>
          <h1 className="text-2xl font-bold">
            {t.gatExam}
          </h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Error message */}
          {error && (
            <div className={`mb-6 p-4 ${darkMode ? 'bg-red-900/30 text-red-300 border-red-800' : 'bg-red-100 text-red-800 border-red-200'} rounded-lg border flex items-start`}>
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg overflow-hidden mb-6`}>
            <div className={`px-6 py-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
              <h2 className="text-lg font-medium">{t.selectExamType}</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => !isStarting && setExamType('math')}
                  className={`cursor-pointer p-4 rounded-lg border-2 flex items-center ${
                    isStarting ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    examType === 'math' 
                      ? darkMode 
                        ? 'border-blue-500 bg-blue-900/20' 
                        : 'border-blue-500 bg-blue-50'
                      : darkMode 
                        ? 'border-gray-600 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-3 rounded-full ${
                    examType === 'math' 
                      ? darkMode ? 'bg-blue-900' : 'bg-blue-100' 
                      : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Calculator className={`h-6 w-6 ${
                      examType === 'math' 
                        ? darkMode ? 'text-blue-300' : 'text-blue-600' 
                        : darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">{t.mathSection}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.mathSectionDesc}
                    </p>
                  </div>
                </div>
                
                <div 
                  onClick={() => !isStarting && setExamType('arabic')}
                  className={`cursor-pointer p-4 rounded-lg border-2 flex items-center ${
                    isStarting ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    examType === 'arabic' 
                      ? darkMode 
                        ? 'border-blue-500 bg-blue-900/20' 
                        : 'border-blue-500 bg-blue-50'
                      : darkMode 
                        ? 'border-gray-600 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-3 rounded-full ${
                    examType === 'arabic' 
                      ? darkMode ? 'bg-blue-900' : 'bg-blue-100' 
                      : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <BookOpen className={`h-6 w-6 ${
                      examType === 'arabic' 
                        ? darkMode ? 'text-blue-300' : 'text-blue-600' 
                        : darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">{t.arabicSection}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.arabicSectionDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg overflow-hidden mb-6`}>
            <div className={`px-6 py-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
              <h2 className="text-lg font-medium">{t.selectDifficulty}</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onClick={() => !isStarting && setDifficulty('easy')}
                  className={`cursor-pointer p-4 rounded-lg border-2 text-center ${
                    isStarting ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    difficulty === 'easy' 
                      ? darkMode 
                        ? 'border-green-500 bg-green-900/20' 
                        : 'border-green-500 bg-green-50'
                      : darkMode 
                        ? 'border-gray-600 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="mb-2">
                    <div className={`h-10 w-10 rounded-full mx-auto flex items-center justify-center ${
                      difficulty === 'easy' 
                        ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-600' 
                        : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span>1</span>
                    </div>
                  </div>
                  <h3 className="font-medium">{t.easy}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.min.replace('{0}', '45')} • {t.questions.replace('{0}', '15')}
                  </p>
                </div>
                
                <div 
                  onClick={() => !isStarting && setDifficulty('medium')}
                  className={`cursor-pointer p-4 rounded-lg border-2 text-center ${
                    isStarting ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    difficulty === 'medium' 
                      ? darkMode 
                        ? 'border-blue-500 bg-blue-900/20' 
                        : 'border-blue-500 bg-blue-50'
                      : darkMode 
                        ? 'border-gray-600 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="mb-2">
                    <div className={`h-10 w-10 rounded-full mx-auto flex items-center justify-center ${
                      difficulty === 'medium' 
                        ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600' 
                        : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span>2</span>
                    </div>
                  </div>
                  <h3 className="font-medium">{t.medium}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.min.replace('{0}', '60')} • {t.questions.replace('{0}', '20')}
                  </p>
                </div>
                
                <div 
                  onClick={() => !isStarting && setDifficulty('hard')}
                  className={`cursor-pointer p-4 rounded-lg border-2 text-center ${
                    isStarting ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    difficulty === 'hard' 
                      ? darkMode 
                        ? 'border-red-500 bg-red-900/20' 
                        : 'border-red-500 bg-red-50'
                      : darkMode 
                        ? 'border-gray-600 hover:bg-gray-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="mb-2">
                    <div className={`h-10 w-10 rounded-full mx-auto flex items-center justify-center ${
                      difficulty === 'hard' 
                        ? darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-600' 
                        : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <span>3</span>
                    </div>
                  </div>
                  <h3 className="font-medium">{t.hard}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.min.replace('{0}', '75')} • {t.questions.replace('{0}', '25')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Information about the selected exam */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg overflow-hidden mb-6`}>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">{t.examSummary}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <BookOpen className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.type}</p>
                    <p className="font-medium">
                      {examType === 'math' ? t.mathSection : t.arabicSection}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Award className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.difficulty}</p>
                    <p className="font-medium">
                      {difficulty === 'easy' ? t.easy : difficulty === 'medium' ? t.medium : t.hard}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.duration}</p>
                    <p className="font-medium">
                      {difficulty === 'easy' ? '45' : difficulty === 'medium' ? '60' : '75'} {t.minutes}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-start mb-2">
                  <Info className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2 mt-0.5`} />
                  <h4 className="font-medium">{t.examInstructions}</h4>
                </div>
                <ul className={`list-disc pl-10 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                  <li>{t.examInstructions1}</li>
                  <li>{t.examInstructions2}</li>
                  <li>{t.examInstructions3}</li>
                  <li>{t.examInstructions4}</li>
                </ul>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleStartExam}
                  disabled={isStarting}
                  className={`px-6 py-2 rounded-md ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white font-medium transition-colors duration-200 relative ${
                    isStarting ? 'opacity-70 cursor-wait' : ''
                  }`}
                >
                  {isStarting ? (
                    <>
                      <span className="opacity-0">{t.startExam}</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    t.startExam
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GatExamPage;