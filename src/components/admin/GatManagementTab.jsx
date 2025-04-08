import React, { useState, useEffect } from 'react';
import { PlusCircle, X, Calculator, BookOpen, Settings, AlertCircle, Check, Edit2, Save, Upload, Download, Search, BarChart2, List, Grid, Tag } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { getGatTopics, addGatTopic, removeGatTopic } from '../../utils/ExamFunctions';

const GatManagementTab = () => {
  const { darkMode } = useTheme();
  const { language, translations } = useLanguage();
  const t = translations[language];
  
  const [activeTab, setActiveTab] = useState('math');
  const [topics, setTopics] = useState({ math: [], arabic: [] });
  const [newTopic, setNewTopic] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [statistics, setStatistics] = useState({
    math: { topics: 0, questions: { easy: 0, medium: 0, hard: 0, total: 0 } },
    arabic: { topics: 0, questions: { easy: 0, medium: 0, hard: 0, total: 0 } }
  });
  
  // Load topics on mount
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const fetchedTopics = getGatTopics();
      setTopics(fetchedTopics);
      
      // Update statistics
      setStatistics({
        math: {
          topics: fetchedTopics.math.length,
          questions: { easy: 45, medium: 60, hard: 30, total: 135 }
        },
        arabic: {
          topics: fetchedTopics.arabic.length,
          questions: { easy: 50, medium: 75, hard: 40, total: 165 }
        }
      });
      
      setLoading(false);
    }, 500);
  }, []);
  
  // Filter topics based on search term
  const filteredTopics = searchTerm.trim() === '' 
    ? topics[activeTab]
    : topics[activeTab].filter(topic => 
        topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  // Handle adding a new topic
  const handleAddTopic = (e) => {
    e.preventDefault();
    
    // Validate
    if (!newTopic.trim()) {
      setError(t.topicRequired);
      return;
    }
    
    // Check if topic already exists
    if (topics[activeTab].includes(newTopic.trim().toLowerCase())) {
      setError(t.topicExists);
      return;
    }
    
    // Add topic
    const updatedTopics = addGatTopic(
      topics, 
      activeTab, 
      newTopic.trim().toLowerCase()
    );
    
    // Update statistics
    setStatistics(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        topics: prev[activeTab].topics + 1
      }
    }));
    
    setTopics(updatedTopics);
    setSuccess(t.topicAdded);
    setNewTopic('');
    setShowAddForm(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };
  
  // Handle removing a topic
  const handleRemoveTopic = (topic) => {
    if (window.confirm(t.confirmRemoveTopic)) {
      const updatedTopics = removeGatTopic(topics, activeTab, topic);
      
      // Update statistics
      setStatistics(prev => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          topics: prev[activeTab].topics - 1
        }
      }));
      
      setTopics(updatedTopics);
      setSuccess(t.topicRemoved);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    }
  };
  
  // Handle editing a topic
  const handleStartEdit = (topic) => {
    setEditingTopic({ name: topic, newName: topic });
  };
  
  const handleUpdateEditingTopic = (e) => {
    setEditingTopic({ ...editingTopic, newName: e.target.value });
  };
  
  const handleSaveEdit = () => {
    // Validate
    if (!editingTopic.newName.trim()) {
      setError(t.topicRequired);
      return;
    }
    
    // Check if topic already exists (but not the same as current topic)
    if (
      editingTopic.name !== editingTopic.newName.trim().toLowerCase() && 
      topics[activeTab].includes(editingTopic.newName.trim().toLowerCase())
    ) {
      setError(t.topicExists);
      return;
    }
    
    // Update topic
    const updatedTopics = { ...topics };
    updatedTopics[activeTab] = topics[activeTab].map(topic => 
      topic === editingTopic.name ? editingTopic.newName.trim().toLowerCase() : topic
    );
    
    setTopics(updatedTopics);
    setSuccess(t.topicUpdated);
    setEditingTopic(null);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };
  
  // Handle toggling the add form
  const handleToggleAddForm = () => {
    setShowAddForm(prev => !prev);
    setNewTopic('');
    setError('');
  };
  
  // Export topics
  const handleExportTopics = () => {
    const dataStr = JSON.stringify(topics, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'gat-topics.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  // Import topics
  const handleImportTopics = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTopics = JSON.parse(e.target.result);
        if (importedTopics.math && importedTopics.arabic) {
          setTopics(importedTopics);
          
          // Update statistics
          setStatistics(prev => ({
            math: {
              ...prev.math,
              topics: importedTopics.math.length
            },
            arabic: {
              ...prev.arabic,
              topics: importedTopics.arabic.length
            }
          }));
          
          setSuccess(t.topicsImported);
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            setSuccess('');
          }, 3000);
        } else {
          setError(t.invalidImportFormat);
        }
      } catch (error) {
        setError(t.invalidImportFormat);
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    e.target.value = null;
  };
  
  return (
    <div>
      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
        {t.gatManagement}
      </h2>
      
      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
              <Calculator className="h-5 w-5 mr-2" />
              {t.mathStatistics}
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
              {t.mathSection}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.topicsCount}</span>
                <Tag className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <p className="text-2xl font-semibold">{statistics.math.topics}</p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.totalQuestions}</span>
                <List className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <p className="text-2xl font-semibold">{statistics.math.questions.total}</p>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-4`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
              <BookOpen className="h-5 w-5 mr-2" />
              {t.arabicStatistics}
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
              {t.arabicSection}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.topicsCount}</span>
                <Tag className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <p className="text-2xl font-semibold">{statistics.arabic.topics}</p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.totalQuestions}</span>
                <List className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <p className="text-2xl font-semibold">{statistics.arabic.questions.total}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success and error alerts */}
      {success && (
        <div className={`mb-4 p-3 ${darkMode ? 'bg-green-900/30 border-green-800' : 'bg-green-100 border-green-200'} border text-green-700 rounded-md flex items-center`}>
          <Check className={`h-5 w-5 mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
          {success}
        </div>
      )}
      
      {error && (
        <div className={`mb-4 p-3 ${darkMode ? 'bg-red-900/30 border-red-800' : 'bg-red-100 border-red-200'} border text-red-700 rounded-md flex items-center`}>
          <AlertCircle className={`h-5 w-5 mr-2 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
          {error}
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
            <span>{t.mathSection}</span>
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
            <span>{t.arabicSection}</span>
          </button>
        </div>
      </div>
      
      {/* Topic management toolbar */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-4 mb-6`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex md:w-1/3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t.searchTopics}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white' 
                    : 'border-gray-300 placeholder-gray-500 text-gray-900'
                } border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? darkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-200 text-gray-800' 
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={t.gridView}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? darkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-200 text-gray-800' 
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={t.listView}
            >
              <List className="h-5 w-5" />
            </button>
            <div className="h-5 border-r border-gray-300 mx-2"></div>
            <button
              onClick={handleToggleAddForm}
              className={`p-2 rounded-md ${
                showAddForm
                  ? darkMode 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-200 text-gray-800' 
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={showAddForm ? t.cancel : t.addNewTopic}
            >
              {showAddForm ? <X className="h-5 w-5" /> : <PlusCircle className="h-5 w-5" />}
            </button>
            <label
              className={`p-2 rounded-md cursor-pointer ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={t.importTopics}
            >
              <Upload className="h-5 w-5" />
              <input 
                type="file" 
                accept=".json" 
                className="hidden" 
                onChange={handleImportTopics}
              />
            </label>
            <button
              onClick={handleExportTopics}
              className={`p-2 rounded-md ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={t.exportTopics}
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Add topic form */}
        {showAddForm && (
          <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
              {t.addNewTopic}
            </h3>
            <form onSubmit={handleAddTopic} className="flex flex-col md:flex-row md:items-end space-y-3 md:space-y-0 md:space-x-3">
              <div className="flex-1">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  {t.topicName}
                </label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => {
                    setNewTopic(e.target.value);
                    setError('');
                  }}
                  className={`w-full p-2 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-blue-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  } border rounded-md focus:outline-none focus:ring-2`}
                  placeholder={t.enterTopicName}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleToggleAddForm}
                  className={`px-4 py-2 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  } border rounded-md transition-colors duration-200`}
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white rounded-md transition-colors duration-200 flex items-center`}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {t.addTopic}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      {/* Topics list */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
          <Settings className="h-5 w-5 mr-2" />
          {activeTab === 'math' ? t.mathTopics : t.arabicTopics}
          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            {filteredTopics.length}
          </span>
        </h3>
        
        {loading ? (
          <div className={`animate-pulse ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t.loading}...
          </div>
        ) : (
          <>
            {filteredTopics.length === 0 ? (
              <div className={`text-center py-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {searchTerm ? t.noSearchResults : t.noTopicsFound}
              </div>
            ) : (
              <>
                {/* Grid view */}
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredTopics.map((topic) => (
                      <div 
                        key={topic}
                        className={`p-3 rounded-lg ${
                          darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors duration-200`}
                      >
                        {editingTopic && editingTopic.name === topic ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editingTopic.newName}
                              onChange={handleUpdateEditingTopic}
                              className={`flex-1 p-1 ${
                                darkMode 
                                  ? 'bg-gray-800 border-gray-600 text-white' 
                                  : 'border-gray-300 text-gray-900'
                              } border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
                            />
                            <button
                              onClick={handleSaveEdit}
                              className={`p-1 rounded ${
                                darkMode 
                                  ? 'bg-green-900 text-green-300 hover:bg-green-800' 
                                  : 'bg-green-100 text-green-600 hover:bg-green-200'
                              }`}
                              title={t.save}
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setEditingTopic(null)}
                              className={`p-1 rounded ${
                                darkMode 
                                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-900' 
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                              title={t.cancel}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="font-medium capitalize">{topic}</span>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleStartEdit(topic)}
                                className={`p-1 rounded ${
                                  darkMode 
                                    ? 'hover:bg-gray-600 text-gray-300' 
                                    : 'hover:bg-gray-200 text-gray-500'
                                }`}
                                title={t.edit}
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveTopic(topic)}
                                className={`p-1 rounded ${
                                  darkMode 
                                    ? 'hover:bg-red-900 text-gray-300 hover:text-red-300' 
                                    : 'hover:bg-red-100 text-gray-500 hover:text-red-500'
                                }`}
                                title={t.remove}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* List view */}
                {viewMode === 'list' && (
                  <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                        <tr>
                          <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                            {t.topicName}
                          </th>
                          <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                            {t.section}
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">{t.actions}</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                        {filteredTopics.map((topic) => (
                          <tr key={topic} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingTopic && editingTopic.name === topic ? (
                                <input
                                  type="text"
                                  value={editingTopic.newName}
                                  onChange={handleUpdateEditingTopic}
                                  className={`w-full p-1 ${
                                    darkMode 
                                      ? 'bg-gray-700 border-gray-600 text-white' 
                                      : 'border-gray-300 text-gray-900'
                                  } border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm`}
                                />
                              ) : (
                                <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'} capitalize`}>
                                  {topic}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                activeTab === 'math'
                                  ? darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                  : darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                              }`}>
                                {activeTab === 'math' ? t.mathSection : t.arabicSection}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {editingTopic && editingTopic.name === topic ? (
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={handleSaveEdit}
                                    className={`p-1 rounded ${
                                      darkMode 
                                        ? 'bg-green-900 text-green-300 hover:bg-green-800' 
                                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                                    }`}
                                    title={t.save}
                                  >
                                    <Save className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingTopic(null)}
                                    className={`p-1 rounded ${
                                      darkMode 
                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                    }`}
                                    title={t.cancel}
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => handleStartEdit(topic)}
                                    className={`${
                                      darkMode 
                                        ? 'text-blue-400 hover:text-blue-300' 
                                        : 'text-blue-600 hover:text-blue-900'
                                    }`}
                                  >
                                    {t.edit}
                                  </button>
                                  <button
                                    onClick={() => handleRemoveTopic(topic)}
                                    className={`${
                                      darkMode 
                                        ? 'text-red-400 hover:text-red-300' 
                                        : 'text-red-600 hover:text-red-900'
                                    }`}
                                  >
                                    {t.remove}
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      
      {/* Question management section */}
      <div className={`mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-6`}>
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          {t.questionManagement}
        </h3>
        
        <div className={`p-6 rounded-lg border-2 border-dashed text-center ${
          darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'
        }`}>
          <p className="mb-2">{t.questionManagementDesc}</p>
          <p className="text-sm">{t.comingSoon}</p>
        </div>
      </div>
    </div>
  );
};

export default GatManagementTab;