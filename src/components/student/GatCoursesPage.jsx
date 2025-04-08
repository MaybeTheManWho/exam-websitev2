import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calculator, BookOpen, Play, Download, ThumbsUp, Send, Reply, Calendar, Clock, BookMarked, Monitor, Video, ChevronRight, FolderOpen, List, Menu, MessageSquare, User, Book } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const GatCoursesPage = ({ 
  selectedType, 
  selectedFolder, 
  selectedVideo, 
  onSelectType, 
  onSelectFolder, 
  onSelectVideo, 
  onBack 
}) => {
  const { darkMode, t } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [mathFolders, setMathFolders] = useState([]);
  const [arabicFolders, setArabicFolders] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  // Load course data
  useEffect(() => {
    // Simulated API call to fetch course data
    setTimeout(() => {
      // Math course folders
      setMathFolders([
        {
          id: 'math-algebra',
          title: '01 - Algebra',
          description: 'Learn the fundamentals of algebra for the GAT exam',
          videos: [
            {
              id: 'math-algebra-1',
              title: 'Introduction to Algebra',
              description: 'This video covers the basics of algebra, including variables, constants, expressions, and equations. It provides a foundational understanding that will be built upon in subsequent videos.',
              duration: '12:45',
              thumbnail: '/algebra-thumbnail.jpg',
              url: 'https://example.com/videos/math-algebra-1.mp4',
              downloadMaterials: [
                { name: 'Algebra Cheat Sheet', url: '#', size: '1.2 MB' },
                { name: 'Practice Problems PDF', url: '#', size: '2.8 MB' }
              ]
            },
            {
              id: 'math-algebra-2',
              title: 'Solving Linear Equations',
              description: 'Learn how to solve linear equations and understand their applications in real-world problems. This video explores step-by-step methods for solving different types of linear equations.',
              duration: '18:30',
              thumbnail: '/algebra-thumbnail.jpg',
              url: 'https://example.com/videos/math-algebra-2.mp4',
              downloadMaterials: [
                { name: 'Linear Equations Worksheet', url: '#', size: '1.5 MB' },
                { name: 'Solutions Guide', url: '#', size: '0.8 MB' }
              ]
            },
            {
              id: 'math-algebra-3',
              title: 'Quadratic Equations',
              description: 'Master quadratic equations and learn multiple methods for solving them including factoring, completing the square, and the quadratic formula.',
              duration: '24:15',
              thumbnail: '/algebra-thumbnail.jpg',
              url: 'https://example.com/videos/math-algebra-3.mp4',
              downloadMaterials: [
                { name: 'Quadratic Equations PDF', url: '#', size: '2.1 MB' },
                { name: 'Practice Test', url: '#', size: '3.2 MB' }
              ]
            }
          ]
        },
        {
          id: 'math-geometry',
          title: '02 - Geometry',
          description: 'Master geometric concepts and spatial reasoning',
          videos: [
            {
              id: 'math-geometry-1',
              title: 'Introduction to Geometry',
              description: 'An overview of geometric principles and concepts that frequently appear in the GAT exam, including points, lines, angles, and planes.',
              duration: '15:20',
              thumbnail: '/geometry-thumbnail.jpg',
              url: 'https://example.com/videos/math-geometry-1.mp4',
              downloadMaterials: [
                { name: 'Geometry Basics PDF', url: '#', size: '1.7 MB' },
                { name: 'Formulas Sheet', url: '#', size: '0.5 MB' }
              ]
            },
            {
              id: 'math-geometry-2',
              title: 'Triangles and Their Properties',
              description: 'A comprehensive look at triangles, their classifications, properties, and the various theorems related to triangles that are essential for the GAT exam.',
              duration: '22:10',
              thumbnail: '/geometry-thumbnail.jpg',
              url: 'https://example.com/videos/math-geometry-2.mp4',
              downloadMaterials: [
                { name: 'Triangle Properties PDF', url: '#', size: '2.3 MB' },
                { name: 'Practice Problems', url: '#', size: '1.8 MB' }
              ]
            }
          ]
        },
        {
          id: 'math-arithmetic',
          title: '03 - Arithmetic',
          description: 'Strengthen your fundamental arithmetic skills',
          videos: [
            {
              id: 'math-arithmetic-1',
              title: 'Number Systems and Operations',
              description: 'Learn about different number systems and the fundamental operations (addition, subtraction, multiplication, division) as they apply to the GAT exam.',
              duration: '16:45',
              thumbnail: '/arithmetic-thumbnail.jpg',
              url: 'https://example.com/videos/math-arithmetic-1.mp4',
              downloadMaterials: [
                { name: 'Number Systems Guide', url: '#', size: '1.4 MB' },
                { name: 'Quick Reference Sheet', url: '#', size: '0.7 MB' }
              ]
            }
          ]
        },
        {
          id: 'math-statistics',
          title: '04 - Statistics & Probability',
          description: 'Learn statistical analysis and probability concepts',
          videos: [
            {
              id: 'math-statistics-1',
              title: 'Introduction to Statistics',
              description: 'An overview of statistical concepts covered in the GAT exam, including measures of central tendency, dispersion, and data representation.',
              duration: '19:30',
              thumbnail: '/statistics-thumbnail.jpg',
              url: 'https://example.com/videos/math-statistics-1.mp4',
              downloadMaterials: [
                { name: 'Statistics Formulas', url: '#', size: '1.2 MB' },
                { name: 'Practice Problems', url: '#', size: '2.5 MB' }
              ]
            }
          ]
        }
      ]);
      
      // Arabic course folders
      setArabicFolders([
        {
          id: 'arabic-grammar',
          title: '01 - Grammar (النحو)',
          description: 'Master Arabic grammar rules and structures',
          videos: [
            {
              id: 'arabic-grammar-1',
              title: 'Basic Grammar Rules',
              description: 'This video covers fundamental Arabic grammar rules that frequently appear in the GAT exam, including sentence structure and word classification.',
              duration: '14:20',
              thumbnail: '/arabic-grammar-thumbnail.jpg',
              url: 'https://example.com/videos/arabic-grammar-1.mp4',
              downloadMaterials: [
                { name: 'Grammar Rules PDF', url: '#', size: '1.8 MB' },
                { name: 'Practice Worksheet', url: '#', size: '1.2 MB' }
              ]
            },
            {
              id: 'arabic-grammar-2',
              title: 'Verb Conjugation',
              description: 'Learn about Arabic verb forms and conjugation patterns that are essential for mastering the language portion of the GAT exam.',
              duration: '20:15',
              thumbnail: '/arabic-grammar-thumbnail.jpg',
              url: 'https://example.com/videos/arabic-grammar-2.mp4',
              downloadMaterials: [
                { name: 'Verb Conjugation Tables', url: '#', size: '2.1 MB' },
                { name: 'Exercise Sheet', url: '#', size: '1.5 MB' }
              ]
            }
          ]
        },
        {
          id: 'arabic-vocabulary',
          title: '02 - Vocabulary (المفردات)',
          description: 'Expand your Arabic vocabulary for better comprehension',
          videos: [
            {
              id: 'arabic-vocabulary-1',
              title: 'Essential Vocabulary for GAT',
              description: 'A comprehensive overview of key vocabulary terms and concepts that frequently appear in the Arabic section of the GAT exam.',
              duration: '16:40',
              thumbnail: '/arabic-vocabulary-thumbnail.jpg',
              url: 'https://example.com/videos/arabic-vocabulary-1.mp4',
              downloadMaterials: [
                { name: 'Vocabulary List PDF', url: '#', size: '1.4 MB' },
                { name: 'Flashcards', url: '#', size: '0.9 MB' }
              ]
            }
          ]
        },
        {
          id: 'arabic-reading',
          title: '03 - Reading Comprehension (الفهم)',
          description: 'Improve your reading comprehension skills',
          videos: [
            {
              id: 'arabic-reading-1',
              title: 'Reading Comprehension Strategies',
              description: 'Learn effective strategies for approaching and answering reading comprehension questions in the Arabic section of the GAT exam.',
              duration: '17:25',
              thumbnail: '/arabic-reading-thumbnail.jpg',
              url: 'https://example.com/videos/arabic-reading-1.mp4',
              downloadMaterials: [
                { name: 'Reading Strategies Guide', url: '#', size: '1.7 MB' },
                { name: 'Practice Passages', url: '#', size: '2.3 MB' }
              ]
            }
          ]
        },
        {
          id: 'arabic-semantics',
          title: '04 - Semantics (الدلالات)',
          description: 'Understand the meaning and context of Arabic text',
          videos: [
            {
              id: 'arabic-semantics-1',
              title: 'Introduction to Semantics',
              description: 'An overview of Arabic semantics and how understanding word relationships and contextual meanings can help you succeed in the GAT exam.',
              duration: '15:55',
              thumbnail: '/arabic-semantics-thumbnail.jpg',
              url: 'https://example.com/videos/arabic-semantics-1.mp4',
              downloadMaterials: [
                { name: 'Semantics Guide', url: '#', size: '1.3 MB' },
                { name: 'Exercise Sheet', url: '#', size: '1.1 MB' }
              ]
            }
          ]
        }
      ]);
      
      // Example comments
      setComments([
        {
          id: 'comment1',
          author: 'Ahmed',
          text: 'This video was very helpful. I especially liked the explanation about solving equations with variables on both sides.',
          date: '2025-03-05',
          likes: 12,
          replies: [
            {
              id: 'reply1',
              author: 'Sarah',
              text: 'I agree! The step-by-step approach made it much clearer for me.',
              date: '2025-03-06',
              likes: 3
            }
          ]
        },
        {
          id: 'comment2',
          author: 'Mohammed',
          text: 'Could you please explain more about the quadratic formula? I\'m still confused about when to use it vs. factoring.',
          date: '2025-03-07',
          likes: 5,
          replies: []
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);
  
  // Find current folder and video if selected
  const currentFolders = selectedType === 'math' ? mathFolders : arabicFolders;
  const currentFolder = selectedFolder 
    ? currentFolders.find(folder => folder.id === selectedFolder) 
    : null;
  const currentVideo = selectedVideo && currentFolder
    ? currentFolder.videos.find(video => video.id === selectedVideo)
    : null;
  
  // Handle posting a new comment
  const handlePostComment = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: `comment${comments.length + 1}`,
      author: 'You', // In a real app, this would be the user's name
      text: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: []
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };
  
  // Handle posting a reply
  const handlePostReply = (commentId) => {
    if (!replyText.trim()) return;
    
    const newReply = {
      id: `reply${Date.now()}`,
      author: 'You', // In a real app, this would be the user's name
      text: replyText,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyingTo(null);
    setReplyText('');
  };
  
  // Handle liking a comment
  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  // Handle liking a reply
  const handleLikeReply = (commentId, replyId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.likes + 1
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading courses...</p>
        </div>
      </div>
    );
  }
  
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
          <h1 className="text-2xl font-bold flex items-center">
            <span>GAT Courses</span>
            {selectedType && (
              <>
                <ChevronRight className="h-5 w-5 mx-1" />
                <span>{selectedType === 'math' ? 'Mathematics' : 'Arabic'}</span>
              </>
            )}
            {selectedFolder && currentFolder && (
              <>
                <ChevronRight className="h-5 w-5 mx-1" />
                <span>{currentFolder.title}</span>
              </>
            )}
          </h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Select course type (if none selected) */}
        {!selectedType ? (
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Select Course Type</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Math course card */}
              <div 
                onClick={() => onSelectType('math')}
                className={`rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'
                }`}
              >
                <div className={`relative h-64 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <Calculator className="h-24 w-24 text-white" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-3xl font-bold text-white">Mathematics</h3>
                    <p className="text-blue-100">Master mathematical concepts for the GAT exam</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Our comprehensive math course covers all topics featured in the GAT exam, including algebra, geometry, 
                    arithmetic, and statistics. Learn through video lectures, exercises, and real exam-style questions.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FolderOpen className="h-4 w-4 mr-1" />
                    <span>{mathFolders.length} modules</span>
                    <span className="mx-2">•</span>
                    <Video className="h-4 w-4 mr-1" />
                    <span>{mathFolders.reduce((count, folder) => count + folder.videos.length, 0)} videos</span>
                  </div>
                </div>
              </div>
              
              {/* Arabic course card */}
              <div 
                onClick={() => onSelectType('arabic')}
                className={`rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-green-50'
                }`}
              >
                <div className={`relative h-64 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <BookOpen className="h-24 w-24 text-white" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-3xl font-bold text-white">Arabic</h3>
                    <p className="text-green-100">Develop your Arabic language skills for the GAT exam</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Our Arabic language course focuses on the linguistic skills needed for the GAT exam, covering grammar, 
                    vocabulary, reading comprehension, and semantics through engaging video lessons and practice materials.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FolderOpen className="h-4 w-4 mr-1" />
                    <span>{arabicFolders.length} modules</span>
                    <span className="mx-2">•</span>
                    <Video className="h-4 w-4 mr-1" />
                    <span>{arabicFolders.reduce((count, folder) => count + folder.videos.length, 0)} videos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {!selectedFolder ? (
              // Display folders for the selected type
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedType === 'math' ? 'Mathematics' : 'Arabic'} Modules
                  </h2>
                  <button 
                    onClick={() => onSelectType(null)}
                    className={`flex items-center px-3 py-1 rounded-md text-sm ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1.5" />
                    Back to Courses
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentFolders.map(folder => (
                    <div 
                      key={folder.id}
                      onClick={() => onSelectFolder(folder.id)}
                      className={`p-5 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
                        darkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 hover:shadow-lg' 
                          : 'bg-white hover:bg-gray-50 hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <div className={`p-2 rounded-full mr-3 ${
                          selectedType === 'math'
                            ? darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                            : darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                        }`}>
                          <FolderOpen className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold">{folder.title}</h3>
                      </div>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {folder.description}
                      </p>
                      <div className="flex items-center text-xs">
                        <Video className={`h-3.5 w-3.5 mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {folder.videos.length} video{folder.videos.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Display videos from the selected folder
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left sidebar - List of videos */}
                <div className="md:col-span-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">{currentFolder.title}</h3>
                    <button 
                      onClick={() => onSelectFolder(null)}
                      className={`flex items-center p-1 rounded-md text-sm ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`p-3 font-medium ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="flex items-center">
                        <List className="h-4 w-4 mr-2" />
                        <span>Videos</span>
                      </div>
                    </div>
                    <div className="p-1">
                      {currentFolder.videos.map((video, index) => (
                        <div 
                          key={video.id}
                          onClick={() => onSelectVideo(video.id)}
                          className={`flex items-center p-3 rounded-md cursor-pointer ${
                            selectedVideo === video.id
                              ? darkMode 
                                ? 'bg-blue-900/30 text-blue-300' 
                                : 'bg-blue-50 text-blue-700'
                              : darkMode 
                                ? 'hover:bg-gray-700' 
                                : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 text-xs ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{video.title}</h4>
                            <div className="flex items-center text-xs mt-0.5">
                              <Clock className={`h-3 w-3 mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                {video.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Main content - Video player and comments */}
                <div className="md:col-span-2">
                  {currentVideo ? (
                    <div>
                      {/* Video player (placeholder) */}
                      <div className={`aspect-video flex items-center justify-center rounded-lg shadow-md mb-4 ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                      }`}>
                        {/* In a real application, this would be a video player */}
                        <div className="text-center p-10">
                          <Play className={`h-20 w-20 mx-auto mb-4 ${
                            darkMode ? 'text-gray-600' : 'text-gray-300'
                          }`} />
                          <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Video Player: {currentVideo.title}
                          </p>
                          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Click play to start watching
                          </p>
                        </div>
                      </div>
                      
                      {/* Video info and materials */}
                      <div className={`rounded-lg shadow-md mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <h2 className="text-xl font-bold">{currentVideo.title}</h2>
                          <div className="flex items-center mt-2 text-sm">
                            <Clock className={`h-4 w-4 mr-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                              {currentVideo.duration}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-2">Description</h3>
                          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {currentVideo.description}
                          </p>
                          
                          {currentVideo.downloadMaterials.length > 0 && (
                            <div>
                              <h3 className="font-medium mb-2">Download Materials</h3>
                              <div className="space-y-2">
                                {currentVideo.downloadMaterials.map((material, index) => (
                                  <a
                                    key={index}
                                    href={material.url}
                                    className={`flex items-center p-3 rounded-md ${
                                      darkMode 
                                        ? 'bg-gray-700 hover:bg-gray-600' 
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    } transition-colors duration-200`}
                                  >
                                    <Download className={`h-5 w-5 mr-3 ${
                                      darkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                    <div>
                                      <p className="text-sm font-medium">{material.name}</p>
                                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {material.size}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Comments section */}
                      <div className={`rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
                          <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2" />
                            <h3 className="font-medium">Comments</h3>
                          </div>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {comments.length} comment{comments.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        
                        {/* Add comment form */}
                        <div className="p-4">
                          <div className="flex">
                            <div className={`h-10 w-10 rounded-full flex-shrink-0 ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-200'
                            } flex items-center justify-center mr-3`}>
                              <User className={`h-6 w-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            </div>
                            <div className="flex-1">
                              <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className={`w-full p-3 rounded-lg resize-none ${
                                  darkMode 
                                    ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                                    : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-200'
                                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                rows="3"
                              ></textarea>
                              <div className="mt-2 flex justify-end">
                                <button
                                  onClick={handlePostComment}
                                  disabled={!newComment.trim()}
                                  className={`px-4 py-2 rounded-md ${
                                    newComment.trim()
                                      ? darkMode 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                      : darkMode 
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  }`}
                                >
                                  Post Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Comments list */}
                        <div className="p-4 space-y-4">
                          {comments.map(comment => (
                            <div 
                              key={comment.id} 
                              className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                            >
                              <div className="flex">
                                <div className={`h-10 w-10 rounded-full flex-shrink-0 ${
                                  darkMode ? 'bg-gray-600' : 'bg-gray-200'
                                } flex items-center justify-center mr-3`}>
                                  <User className={`h-6 w-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{comment.author}</h4>
                                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {comment.date}
                                    </span>
                                  </div>
                                  <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {comment.text}
                                  </p>
                                  <div className="mt-2 flex items-center space-x-4">
                                    <button 
                                      onClick={() => handleLikeComment(comment.id)}
                                      className="flex items-center text-sm"
                                    >
                                      <ThumbsUp className={`h-4 w-4 mr-1 ${
                                        darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                                      }`} />
                                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {comment.likes}
                                      </span>
                                    </button>
                                    <button 
                                      onClick={() => setReplyingTo(comment.id)}
                                      className={`text-sm ${
                                        darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                                      }`}
                                    >
                                      Reply
                                    </button>
                                  </div>
                                  
                                  {/* Reply form */}
                                  {replyingTo === comment.id && (
                                    <div className="mt-3">
                                      <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write a reply..."
                                        className={`w-full p-3 rounded-lg resize-none ${
                                          darkMode 
                                            ? 'bg-gray-600 text-white placeholder-gray-400 border-gray-500' 
                                            : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'
                                        } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        rows="2"
                                      ></textarea>
                                      <div className="mt-2 flex justify-end space-x-2">
                                        <button
                                          onClick={() => setReplyingTo(null)}
                                          className={`px-3 py-1 rounded-md text-sm ${
                                            darkMode 
                                              ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                          }`}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={() => handlePostReply(comment.id)}
                                          disabled={!replyText.trim()}
                                          className={`px-3 py-1 rounded-md text-sm ${
                                            replyText.trim()
                                              ? darkMode 
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                              : darkMode 
                                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                          }`}
                                        >
                                          Reply
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Replies */}
                                  {comment.replies.length > 0 && (
                                    <div className="mt-3 space-y-3">
                                      {comment.replies.map(reply => (
                                        <div 
                                          key={reply.id} 
                                          className={`p-3 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'} ml-6`}
                                        >
                                          <div className="flex">
                                            <div className={`h-8 w-8 rounded-full flex-shrink-0 ${
                                              darkMode ? 'bg-gray-500' : 'bg-gray-200'
                                            } flex items-center justify-center mr-3`}>
                                              <User className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                            </div>
                                            <div className="flex-1">
                                              <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-sm">{reply.author}</h4>
                                                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                  {reply.date}
                                                </span>
                                              </div>
                                              <p className={`mt-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {reply.text}
                                              </p>
                                              <div className="mt-1">
                                                <button 
                                                  onClick={() => handleLikeReply(comment.id, reply.id)}
                                                  className="flex items-center text-xs"
                                                >
                                                  <ThumbsUp className={`h-3.5 w-3.5 mr-1 ${
                                                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                                                  }`} />
                                                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {reply.likes}
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`h-64 flex flex-col items-center justify-center ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg shadow-md`}>
                      <Play className={`h-16 w-16 mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                      <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Select a video to start watching
                      </p>
                      <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Choose from the list on the left to begin learning
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default GatCoursesPage;