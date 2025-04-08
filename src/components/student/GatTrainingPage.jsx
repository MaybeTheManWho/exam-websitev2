import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Calculator, Target, Award, Filter, Check, Search, ChevronDown, ChevronUp, BookMarked, Video, Clock } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const GatTrainingPage = ({ onBack }) => {
  const { darkMode, t } = useAppContext();
  const [activeTab, setActiveTab] = useState('math');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mathTopics, setMathTopics] = useState([]);
  const [arabicTopics, setArabicTopics] = useState([]);
  const [recentProgress, setRecentProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Load topics and progress
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMathTopics([
        { id: 'math-1', name: 'Algebra', completionRate: 75, questionsCount: 250, lastPracticed: '2025-03-05' },
        { id: 'math-2', name: 'Geometry', completionRate: 60, questionsCount: 180, lastPracticed: '2025-03-02' },
        { id: 'math-3', name: 'Arithmetic', completionRate: 90, questionsCount: 220, lastPracticed: '2025-03-08' },
        { id: 'math-4', name: 'Statistics', completionRate: 40, questionsCount: 120, lastPracticed: '2025-02-28' },
        { id: 'math-5', name: 'Probability', completionRate: 30, questionsCount: 100, lastPracticed: '2025-02-25' },
        { id: 'math-6', name: 'Calculus', completionRate: 20, questionsCount: 80, lastPracticed: null },
        { id: 'math-7', name: 'Trigonometry', completionRate: 15, questionsCount: 90, lastPracticed: null }
      ]);
      
      setArabicTopics([
        { id: 'arabic-1', name: 'Grammar (النحو)', completionRate: 65, questionsCount: 210, lastPracticed: '2025-03-06' },
        { id: 'arabic-2', name: 'Vocabulary (المفردات)', completionRate: 80, questionsCount: 240, lastPracticed: '2025-03-07' },
        { id: 'arabic-3', name: 'Reading Comprehension (الفهم)', completionRate: 50, questionsCount: 150, lastPracticed: '2025-03-01' },
        { id: 'arabic-4', name: 'Semantics (الدلالات)', completionRate: 45, questionsCount: 130, lastPracticed: '2025-02-27' },
        { id: 'arabic-5', name: 'Syntax (التراكيب)', completionRate: 35, questionsCount: 110, lastPracticed: '2025-02-24' },
        { id: 'arabic-6', name: 'Literature (الأدب)', completionRate: 25, questionsCount: 90, lastPracticed: null },
        { id: 'arabic-7', name: 'Poetry (الشعر)', completionRate: 20, questionsCount: 70, lastPracticed: null }
      ]);
      
      setRecentProgress({
        mathOverall: 55,
        arabicOverall: 47,
        recentSessions: 12,
        totalHours: 28,
        questionsAnswered: 845
      });
      
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter topics based on search and difficulty
  const filteredTopics = activeTab === 'math' 
    ? mathTopics.filter(topic => {
        const matchesDifficulty = selectedDifficulty === 'all' || 
          (selectedDifficulty === 'easy' && topic.completionRate >= 70) ||
          (selectedDifficulty === 'medium' && topic.completionRate >= 30 && topic.completionRate < 70) ||
          (selectedDifficulty === 'hard' && topic.completionRate < 30);
          
        const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesDifficulty && matchesSearch;
      })
    : arabicTopics.filter(topic => {
        const matchesDifficulty = selectedDifficulty === 'all' || 
          (selectedDifficulty === 'easy' && topic.completionRate >= 70) ||
          (selectedDifficulty === 'medium' && topic.completionRate >= 30 && topic.completionRate < 70) ||
          (selectedDifficulty === 'hard' && topic.completionRate < 30);
          
        const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesDifficulty && matchesSearch;
      });
  
  // Handle topic selection
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };
  
  // Handle starting practice
  const handleStartPractice = () => {
    if (!selectedTopic) return;
    alert(`Starting practice for ${selectedTopic.name}`);
    // In a real app, this would navigate to a practice session
  };
  
  // Get color based on completion rate
  const getCompletionColor = (rate) => {
    if (rate >= 70) {
      return darkMode ? 'text-green-400' : 'text-green-600';
    } else if (rate >= 30) {
      return darkMode ? 'text-yellow-400' : 'text-yellow-600';
    } else {
      return darkMode ? 'text-red-400' : 'text-red-600';
    }
  };
  
  // Get background color based on completion rate
  const getCompletionBgColor = (rate) => {
    if (rate >= 70) {
      return darkMode ? 'bg-green-900/30' : 'bg-green-100';
    } else if (rate >= 30) {
      return darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100';
    } else {
      return darkMode ? 'bg-red-900/30' : 'bg-red-100';
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
          >
            <ArrowLeft className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          </button>
          <h1 className="text-2xl font-bold">
            GAT Training
          </h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Progress overview */}
        {!loading && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 mb-6`}>
            <h2 className="text-lg font-medium mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center mb-2">
                  <Calculator className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
                  <h3 className="font-medium">Math</h3>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-bold">{recentProgress.mathOverall}%</span>
                  <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>complete</span>
                </div>
                <div className="w-full h-2 bg-gray-300 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`} 
                    style={{ width: `${recentProgress.mathOverall}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center mb-2">
                  <BookOpen className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-600'} mr-2`} />
                  <h3 className="font-medium">Arabic</h3>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-bold">{recentProgress.arabicOverall}%</span>
                  <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>complete</span>
                </div>
                <div className="w-full h-2 bg-gray-300 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full ${darkMode ? 'bg-green-600' : 'bg-green-500'}`} 
                    style={{ width: `${recentProgress.arabicOverall}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex flex-col justify-between`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recent Sessions</div>
                <div className="text-2xl font-bold">{recentProgress.recentSessions}</div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex flex-col justify-between`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Study Hours</div>
                <div className="text-2xl font-bold">{recentProgress.totalHours}</div>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex flex-col justify-between`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Questions Answered</div>
                <div className="text-2xl font-bold">{recentProgress.questionsAnswered}</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Section tabs */}
        <div className="mb-6">
          <div className={`flex border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md overflow-hidden`}>
            <button
              onClick={() => setActiveTab('math')}
              className={`flex-1 py-2 px-4 flex items-center justify-center ${
                activeTab === 'math' 
                  ? darkMode 
                    ? 'bg-blue-900 text-white border-b-2 border-blue-500' 
                    : 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' 
                  : darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Calculator className="h-4 w-4 mr-2" />
              <span>Math Training</span>
            </button>
            <button
              onClick={() => setActiveTab('arabic')}
              className={`flex-1 py-2 px-4 flex items-center justify-center ${
                activeTab === 'arabic' 
                  ? darkMode 
                    ? 'bg-blue-900 text-white border-b-2 border-blue-500' 
                    : 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' 
                  : darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Arabic Training</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left panel - Topic selection */}
          <div className={`md:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-lg font-medium mb-2 md:mb-0">
                {activeTab === 'math' ? 'Math Topics' : 'Arabic Topics'}
              </h2>
              
              <div className="w-full md:w-auto flex space-x-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2 text-sm rounded-md ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500' 
                        : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-500'
                    } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-md ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } transition-colors duration-200 flex items-center whitespace-nowrap`}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline">Filter</span>
                  {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </button>
              </div>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className={`p-3 mb-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="font-medium mb-2">Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDifficulty('all')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedDifficulty === 'all'
                        ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                        : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedDifficulty('easy')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedDifficulty === 'easy'
                        ? darkMode ? 'bg-green-600 text-white' : 'bg-green-600 text-white'
                        : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => setSelectedDifficulty('medium')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedDifficulty === 'medium'
                        ? darkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-600 text-white'
                        : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setSelectedDifficulty('hard')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedDifficulty === 'hard'
                        ? darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'
                        : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Hard
                  </button>
                </div>
              </div>
            )}
            
            {/* Topic list */}
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-16 bg-gray-200 rounded w-full"></div>
                <div className="h-16 bg-gray-200 rounded w-full"></div>
                <div className="h-16 bg-gray-200 rounded w-full"></div>
                <div className="h-16 bg-gray-200 rounded w-full"></div>
              </div>
            ) : filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTopics.map(topic => (
                  <div
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors duration-200 ${
                      selectedTopic && selectedTopic.id === topic.id
                        ? darkMode 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-blue-500 bg-blue-50'
                        : darkMode 
                          ? 'border-gray-700 hover:bg-gray-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{topic.name}</h3>
                      <div className={`px-2 py-0.5 text-xs rounded-full ${getCompletionBgColor(topic.completionRate)}`}>
                        <span className={getCompletionColor(topic.completionRate)}>{topic.completionRate}%</span>
                      </div>
                    </div>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {topic.questionsCount} questions available
                    </p>
                    <div className="w-full h-1.5 bg-gray-300 rounded-full mt-2 overflow-hidden">
                      <div 
                        className={`h-full ${
                          topic.completionRate >= 70 
                            ? darkMode ? 'bg-green-500' : 'bg-green-500' 
                            : topic.completionRate >= 30 
                              ? darkMode ? 'bg-yellow-500' : 'bg-yellow-500' 
                              : darkMode ? 'bg-red-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${topic.completionRate}%` }}
                      ></div>
                    </div>
                    {topic.lastPracticed && (
                      <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Last practiced: {topic.lastPracticed}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {searchTerm ? 'No topics found matching your search' : 'No topics available'}
              </div>
            )}
          </div>
          
          {/* Right panel - Selected topic details */}
          <div className="md:col-span-1">
            {selectedTopic ? (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4`}>
                <h2 className="text-xl font-bold mb-4">{selectedTopic.name}</h2>
                
                <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completion</div>
                    <div className={`text-lg font-bold ${getCompletionColor(selectedTopic.completionRate)}`}>
                      {selectedTopic.completionRate}%
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        selectedTopic.completionRate >= 70 
                          ? darkMode ? 'bg-green-500' : 'bg-green-500' 
                          : selectedTopic.completionRate >= 30 
                            ? darkMode ? 'bg-yellow-500' : 'bg-yellow-500' 
                            : darkMode ? 'bg-red-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${selectedTopic.completionRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Target className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Available Questions</p>
                      <p className="font-medium">{selectedTopic.questionsCount}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Award className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mastery Level</p>
                      <p className="font-medium">
                        {selectedTopic.completionRate >= 70 ? 'High' : 
                         selectedTopic.completionRate >= 30 ? 'Medium' : 'Low'}
                      </p>
                    </div>
                  </div>
                  
                  {selectedTopic.lastPracticed && (
                    <div className="flex items-center">
                      <Clock className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Practiced</p>
                        <p className="font-medium">{selectedTopic.lastPracticed}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={handleStartPractice}
                    className={`w-full py-2 px-4 rounded-md font-medium ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } transition-colors duration-200 flex items-center justify-center`}
                  >
                    <BookMarked className="h-4 w-4 mr-2" />
                    Start Practice
                  </button>
                  
                  <button
                    className={`w-full py-2 px-4 rounded-md font-medium ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    } transition-colors duration-200 flex items-center justify-center`}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Watch Tutorial
                  </button>
                </div>
              </div>
            ) : (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 text-center`}>
                <div className={`w-16 h-16 mx-auto rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                  <BookOpen className={`h-8 w-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <h3 className="text-lg font-medium mb-2">Select a Topic</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Choose a topic from the list to view details and start practicing.
                </p>
              </div>
            )}
            
            {/* Recommended topics */}
            {!loading && (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 mt-6`}>
                <h3 className="font-medium mb-4">Recommended Next Steps</h3>
                <div className="space-y-3">
                  {activeTab === 'math' ? (
                    <>
                      {mathTopics.filter(t => t.completionRate < 70 && t.completionRate > 0).slice(0, 2).map(topic => (
                        <div 
                          key={`rec-${topic.id}`}
                          onClick={() => handleTopicSelect(topic)}
                          className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer transition-colors duration-200`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Check className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
                              <span>{topic.name}</span>
                            </div>
                            <span className={`${getCompletionColor(topic.completionRate)}`}>
                              {topic.completionRate}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {arabicTopics.filter(t => t.completionRate < 70 && t.completionRate > 0).slice(0, 2).map(topic => (
                        <div 
                          key={`rec-${topic.id}`}
                          onClick={() => handleTopicSelect(topic)}
                          className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer transition-colors duration-200`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Check className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mr-2`} />
                              <span>{topic.name}</span>
                            </div>
                            <span className={`${getCompletionColor(topic.completionRate)}`}>
                              {topic.completionRate}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GatTrainingPage;