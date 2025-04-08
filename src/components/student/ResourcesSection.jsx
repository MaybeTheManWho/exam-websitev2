import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, FolderOpen, FileText, Download, File, Image, Video, Music, Archive, Code, Upload, ChevronDown, ChevronUp, Info, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ResourcesSection = ({ darkMode }) => {
  const { t } = useAppContext();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    category: 'documents',
    description: '',
    file: null
  });
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Load resources
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockResources = [
        {
          id: 'res1',
          title: 'GAT Math Formulas Cheat Sheet',
          category: 'documents',
          type: 'pdf',
          size: '1.2 MB',
          uploadedBy: 'Dr. Ahmed',
          uploadDate: '2025-03-02',
          downloads: 156,
          description: 'A comprehensive collection of all math formulas needed for the GAT exam.'
        },
        {
          id: 'res2',
          title: 'Arabic Grammar Rules',
          category: 'documents',
          type: 'docx',
          size: '850 KB',
          uploadedBy: 'Prof. Sarah',
          uploadDate: '2025-03-05',
          downloads: 89,
          description: 'Complete guide to Arabic grammar rules commonly tested in the GAT.'
        },
        {
          id: 'res3',
          title: 'Math Problem Solving Techniques',
          category: 'presentations',
          type: 'pptx',
          size: '3.5 MB',
          uploadedBy: 'Dr. Mohammed',
          uploadDate: '2025-02-28',
          downloads: 124,
          description: 'Presentation slides explaining techniques for solving complex math problems quickly.'
        },
        {
          id: 'res4',
          title: 'GAT Practice Test - Math Section',
          category: 'exams',
          type: 'pdf',
          size: '2.8 MB',
          uploadedBy: 'Admin',
          uploadDate: '2025-03-01',
          downloads: 210,
          description: 'Full practice test for the math section of the GAT exam with answer key and explanations.'
        },
        {
          id: 'res5',
          title: 'Reading Comprehension Strategies',
          category: 'documents',
          type: 'pdf',
          size: '1.7 MB',
          uploadedBy: 'Prof. Fatima',
          uploadDate: '2025-02-20',
          downloads: 176,
          description: 'Guide to effective strategies for mastering the reading comprehension sections in the GAT.'
        },
        {
          id: 'res6',
          title: 'Statistical Analysis Workshop',
          category: 'videos',
          type: 'mp4',
          size: '128 MB',
          uploadedBy: 'Dr. Ali',
          uploadDate: '2025-03-08',
          downloads: 67,
          description: 'Video recording of the workshop on statistical analysis techniques for the GAT exam.'
        },
        {
          id: 'res7',
          title: 'Arabic Vocabulary Flashcards',
          category: 'others',
          type: 'zip',
          size: '5.2 MB',
          uploadedBy: 'Prof. Layla',
          uploadDate: '2025-02-15',
          downloads: 142,
          description: 'Set of digital flashcards with essential Arabic vocabulary for the GAT exam.'
        },
        {
          id: 'res8',
          title: 'Geometry Visualization Models',
          category: 'images',
          type: 'png',
          size: '4.3 MB',
          uploadedBy: 'Dr. Hasan',
          uploadDate: '2025-03-10',
          downloads: 53,
          description: 'Visual models to help understand complex geometry concepts tested in the GAT.'
        }
      ];
      
      setResources(mockResources);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter resources based on search term and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get icon based on file type
  const getFileIcon = (resource) => {
    switch (resource.type) {
      case 'pdf':
        return <FileText className={`h-6 w-6 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />;
      case 'docx':
        return <File className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />;
      case 'pptx':
        return <File className={`h-6 w-6 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <Image className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />;
      case 'mp4':
      case 'webm':
        return <Video className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />;
      case 'mp3':
      case 'wav':
        return <Music className={`h-6 w-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />;
      case 'zip':
      case 'rar':
        return <Archive className={`h-6 w-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />;
      case 'js':
      case 'py':
      case 'java':
        return <Code className={`h-6 w-6 ${darkMode ? 'text-teal-400' : 'text-teal-500'}`} />;
      default:
        return <File className={`h-6 w-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />;
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!uploadData.title || !uploadData.category || !uploadData.file) {
      setUploadError('Please fill in all required fields and select a file.');
      return;
    }
    
    // Simulate file upload
    setUploadError('');
    setUploadSuccess(false);
    
    // Show loading state
    const uploadButton = document.getElementById('upload-button');
    if (uploadButton) {
      uploadButton.disabled = true;
      uploadButton.innerText = 'Uploading...';
    }
    
    // Simulate API request
    setTimeout(() => {
      // Reset form
      setUploadData({
        title: '',
        category: 'documents',
        description: '',
        file: null
      });
      
      // Show success
      setUploadSuccess(true);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadSuccess(false);
        
        // Add the "uploaded" resource to the list
        const newResource = {
          id: `res${resources.length + 1}`,
          title: uploadData.title,
          category: uploadData.category,
          type: uploadData.file.name.split('.').pop(),
          size: `${(uploadData.file.size / (1024 * 1024)).toFixed(2)} MB`,
          uploadedBy: 'You',
          uploadDate: new Date().toISOString().split('T')[0],
          downloads: 0,
          description: uploadData.description || 'No description provided.'
        };
        
        setResources([newResource, ...resources]);
      }, 2000);
      
      // Reset button
      if (uploadButton) {
        uploadButton.disabled = false;
        uploadButton.innerText = 'Upload';
      }
    }, 1500);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadData({
        ...uploadData,
        file: e.target.files[0]
      });
    }
  };

  // Handle upload form input changes
  const handleUploadInputChange = (e) => {
    const { name, value } = e.target;
    setUploadData({
      ...uploadData,
      [name]: value
    });
  };

  return (
    <>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg p-4`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-lg font-bold mb-4 md:mb-0">Resources</h2>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search resources..."
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
            
            <div className="flex space-x-2">
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
              
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? darkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-200 text-gray-800' 
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title="Grid View"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? darkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-200 text-gray-800' 
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={() => setShowUploadModal(true)}
                className={`px-3 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } transition-colors duration-200 flex items-center whitespace-nowrap`}
              >
                <Upload className="h-4 w-4 mr-1.5" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className={`p-4 mb-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-medium mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  selectedCategory === 'all'
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('documents')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  selectedCategory === 'documents'
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Documents
              </button>
              <button
                onClick={() => setSelectedCategory('presentations')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  selectedCategory === 'presentations'
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Presentations
              </button>
              <button
                onClick={() => setSelectedCategory('exams')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  selectedCategory === 'exams'
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Exams
              </button>
              <button
                onClick={() => setSelectedCategory('videos')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  selectedCategory === 'videos'
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setSelectedCategory('images')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  selectedCategory === 'images'
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setSelectedCategory('others')}
                className={`px-3 py-1.5 rounded-md text-sm ${
                  selectedCategory === 'others'
                    ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Others
              </button>
            </div>
          </div>
        )}
        
        {/* Resources list */}
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
          </div>
        ) : filteredResources.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredResources.map(resource => (
                  <div 
                    key={resource.id}
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-200 flex flex-col h-full`}
                  >
                    <div className="flex items-start mb-4">
                      <div className={`p-2 rounded-lg ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                      } mr-3`}>
                        {getFileIcon(resource)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-2">{resource.title}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {resource.type.toUpperCase()}
                          </span>
                          <span className={`ml-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {resource.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {resource.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span>By {resource.uploadedBy}</span>
                        <span className="mx-1">•</span>
                        <span>{resource.uploadDate}</span>
                      </div>
                      <button className="text-sm flex items-center px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        <span>{resource.downloads}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg overflow-hidden`}>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Resource
                      </th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Category
                      </th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Size
                      </th>
                      <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                        Uploaded
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${darkMode ? 'bg-gray-800 divide-y divide-gray-700' : 'bg-white divide-y divide-gray-200'}`}>
                    {filteredResources.map(resource => (
                      <tr key={resource.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              {getFileIcon(resource)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium">{resource.title}</div>
                              <div className="text-xs mt-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'
                                }`}>
                                  {resource.type.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm capitalize">{resource.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{resource.size}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div>{resource.uploadDate}</div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            By {resource.uploadedBy}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                            <Download className="h-3.5 w-3.5 mr-1.5" />
                            <span>{resource.downloads}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No resources found</p>
            <p className="mt-1">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Upload your first resource to get started'}
            </p>
          </div>
        )}
      </div>
      
      {/* Upload modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className={`inline-block align-bottom ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}>
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadError('');
                    setUploadSuccess(false);
                  }}
                  className={`text-gray-400 hover:text-gray-500 focus:outline-none`}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium mb-4" id="modal-title">
                  Upload a Resource
                </h3>
                
                {/* Success message */}
                {uploadSuccess && (
                  <div className={`mb-4 p-3 ${darkMode ? 'bg-green-900/30 border-green-800' : 'bg-green-100 border-green-200'} border rounded-md flex items-center`}>
                    <Info className={`h-5 w-5 mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={darkMode ? 'text-green-300' : 'text-green-700'}>
                      Resource uploaded successfully!
                    </span>
                  </div>
                )}
                
                {/* Error message */}
                {uploadError && (
                  <div className={`mb-4 p-3 ${darkMode ? 'bg-red-900/30 border-red-800' : 'bg-red-100 border-red-200'} border rounded-md flex items-center`}>
                    <Info className={`h-5 w-5 mr-2 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
                    <span className={darkMode ? 'text-red-300' : 'text-red-700'}>
                      {uploadError}
                    </span>
                  </div>
                )}
                
                <form onSubmit={handleFileUpload}>
                  <div className="mb-4">
                    <label htmlFor="title" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={uploadData.title}
                      onChange={handleUploadInputChange}
                      required
                      className={`w-full p-2 rounded-md ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                          : 'border-gray-300 focus:ring-blue-500'
                      } border focus:outline-none focus:ring-2`}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="category" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={uploadData.category}
                      onChange={handleUploadInputChange}
                      required
                      className={`w-full p-2 rounded-m