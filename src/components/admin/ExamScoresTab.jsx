import React, { useState, useEffect } from 'react';

const ExamScoresTab = () => {
  // Mock exam data
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // In a real application, this would fetch from an API
    // Simulating data fetch
    setTimeout(() => {
      setExams([
        {
          id: 'EX001',
          name: 'Introduction to Computer Science',
          organizer: 'Prof. Smith',
          students: 45,
          averageScore: 76.8
        },
        {
          id: 'EX002',
          name: 'Data Structures and Algorithms',
          organizer: 'Prof. Johnson',
          students: 38,
          averageScore: 72.3
        },
        {
          id: 'EX003',
          name: 'Web Development Basics',
          organizer: 'Prof. Davis',
          students: 52,
          averageScore: 81.5
        },
        {
          id: 'EX004',
          name: 'Basic Mathematics',
          organizer: 'Prof. Wilson',
          students: 60,
          averageScore: 79.2
        },
        {
          id: 'EX005',
          name: 'Programming Fundamentals',
          organizer: 'Prof. Anderson',
          students: 42,
          averageScore: 68.7
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter exams based on search term
  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Mock function for viewing exam details
  const handleViewExamDetails = (examId) => {
    alert(`Viewing details for exam ${examId}`);
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Exam Scores</h2>
      
      {/* Search */}
      <div className="mb-6 flex">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search exams by name, ID, or organizer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Exams table */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organizer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExams.length > 0 ? (
                filteredExams.map((exam) => (
                  <tr key={exam.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{exam.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.organizer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        exam.averageScore >= 80 ? 'text-green-600' : 
                        exam.averageScore >= 70 ? 'text-blue-600' : 
                        'text-yellow-600'
                      }`}>
                        {exam.averageScore.toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleViewExamDetails(exam.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Extended Info
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No exams found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExamScoresTab;