import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, Search, Newspaper, AlertCircle, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const NewsManagementTab = () => {
  const { darkMode, t } = useAppContext();
  
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', isImportant: false });
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Load announcements
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnnouncements([
        {
          id: 'ann001',
          title: 'New GAT Training Materials Available',
          date: '2025-03-08',
          content: 'We have added 500+ new practice questions for GAT Math and Arabic sections. Check out the training section to access them.',
          isImportant: true
        },
        {
          id: 'ann002',
          title: 'System Maintenance Scheduled',
          date: '2025-03-12',
          content: 'The system will be down for maintenance from 2:00 AM to 5:00 AM on March 12th. Please plan your study sessions accordingly.',
          isImportant: false
        },
        {
          id: 'ann003',
          title: 'New Feature: Performance Analytics',
          date: '2025-03-05',
          content: 'We have launched a new feature that provides detailed analytics of your performance by topic and question type. Visit your profile to check it out.',
          isImportant: false
        },
        {
          id: 'ann004',
          title: 'GAT Exam Registration Open',
          date: '2025-03-01',
          content: 'Registration for the next GAT exam (April 15th) is now open. Make sure to register before March 25th.',
          isImportant: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter announcements by search term
  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };
  
  // Handle adding a new announcement
  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    
    // Validate
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      setError('Title and content are required');
      return;
    }
    
    const newId = `ann${(announcements.length + 1).toString().padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    if (editingId) {
      // Update existing announcement
      setAnnouncements(prev => prev.map(a => 
        a.id === editingId ? { ...newAnnouncement, id: editingId, date: today } : a
      ));
      setSuccess('Announcement updated successfully');
      setEditingId(null);
    } else {
      // Add new announcement
      setAnnouncements(prev => [
        { ...newAnnouncement, id: newId, date: today },
        ...prev
      ]);
      setSuccess('Announcement added successfully');
    }
    
    // Reset form
    setNewAnnouncement({ title: '', content: '', isImportant: false });
    setShowAddForm(false);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };
  
  // Handle editing an announcement
  const handleEditAnnouncement = (announcement) => {
    setNewAnnouncement({
      title: announcement.title,
      content: announcement.content,
      isImportant: announcement.isImportant
    });
    setEditingId(announcement.id);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle deleting an announcement
  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      setSuccess('Announcement deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    }
  };
  
  return (
    <div>
      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
        {t.newsManagementTab || 'Announcements Management'}
      </h2>
      
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
      
      {/* Add/Edit Announcement Form */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Newspaper className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
            <h3 className="text-lg font-medium">
              {editingId ? 'Edit Announcement' : 'Announcements'}
            </h3>
          </div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors duration-200`}
            >
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Add New
            </button>
          )}
        </div>
        
        {showAddForm && (
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 mb-6`}>
            <form onSubmit={handleAddAnnouncement}>
              <div className="mb-4">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newAnnouncement.title}
                  onChange={handleInputChange}
                  className={`w-full p-2 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-blue-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  } border rounded-md focus:outline-none focus:ring-2`}
                  placeholder="Enter announcement title"
                />
              </div>
              
              <div className="mb-4">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Content
                </label>
                <textarea
                  name="content"
                  value={newAnnouncement.content}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full p-2 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white focus:ring-blue-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  } border rounded-md focus:outline-none focus:ring-2`}
                  placeholder="Enter announcement content"
                ></textarea>
              </div>
              
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="isImportant"
                  name="isImportant"
                  checked={newAnnouncement.isImportant}
                  onChange={handleInputChange}
                  className={`h-4 w-4 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-blue-600 focus:ring-blue-500'
                      : 'border-gray-300 text-blue-600 focus:ring-blue-500'
                  } rounded focus:ring-2`}
                />
                <label htmlFor="isImportant" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mark as important announcement
                </label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    setNewAnnouncement({ title: '', content: '', isImportant: false });
                  }}
                  className={`px-4 py-2 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  } border rounded-md transition-colors duration-200`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white rounded-md transition-colors duration-200`}
                >
                  {editingId ? 'Update' : 'Add'} Announcement
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      {/* Search and Announcements List */}
      <div>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search announcements..."
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
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded w-full"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
          </div>
        ) : filteredAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {filteredAnnouncements.map(announcement => (
              <div 
                key={announcement.id}
                className={`p-4 rounded-lg border ${
                  announcement.isImportant
                    ? darkMode
                      ? 'border-red-800 bg-red-900/20'
                      : 'border-red-200 bg-red-50'
                    : darkMode
                      ? 'border-gray-700 bg-gray-800'
                      : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">
                      {announcement.title}
                      {announcement.isImportant && (
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          darkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800'
                        }`}>
                          Important
                        </span>
                      )}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                      Published on {announcement.date}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditAnnouncement(announcement)}
                      className={`p-1.5 rounded ${
                        darkMode 
                          ? 'hover:bg-gray-700 text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-600'
                      } transition-colors duration-200`}
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className={`p-1.5 rounded ${
                        darkMode 
                          ? 'hover:bg-red-900/30 text-gray-300' 
                          : 'hover:bg-red-100 text-gray-600'
                      } transition-colors duration-200`}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {announcement.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {searchTerm ? 'No announcements found matching your search' : 'No announcements available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagementTab;