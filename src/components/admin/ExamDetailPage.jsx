import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, BarChart2, Users, Clock } from 'lucide-react';

const ExamDetailPage = ({ examId, onBack }) => {
  const [exam, setExam] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, this would fetch from an API
    // Simulating data fetch
    setTimeout(() => {
      // Mock exam data
      const examData = {
        id: examId,
        name: 'Introduction to Computer Science',
        organizer: 'Prof. Smith',
        createdAt: '2025-02-10',
        endDate: '2025-03-15',
        duration: 60, // minutes
        totalQuestions: 20,
        totalStudents: 45,
        averageScore: 76.8,
        highestScore: 98,
        lowestScore: 52,
        passingRate: 82.2, // percentage
      };
      
      // Mock students data
      const studentsData = Array(45)
        .fill(null)
        .map((_, index) => {
          const score = Math.floor(Math.random() * 51) + 50; // Random score between 50-100
          return {
            id: `STU${(index + 1).toString().padStart(3, '0')}`,
            name: `Student ${index + 1}`,
            score,
            completedAt: '2025-03-02',
            timeTaken: Math.floor(Math.random() * 45) + 15, // Random time between 15-60 min
            isPassed: score >= 70
          };
        })
        .sort((a, b) => b.score - a.score); // Sort by score descending
      
      setExam(examData);
      setStudents(studentsData);
      setLoading(false);
    }, 1000);
  }, [examId]);
  
  // Calculate score distribution
  const calculateScoreDistribution = () => {
    if (!students.length) return [];
    
    const scoreRanges = [
      { label: '90-100', count: 0 },
      { label: '80-89', count: 0 },
      { label: '70-79', count: 0 },
      { label: '60-69', count: 0 },
      { label: '0-59', count: 0 }
    ];
    
    students.forEach(student => {
      const score = student.score;
      if (score >= 90) scoreRanges[0].count++;
      else if (score >= 80) scoreRanges[1].count++;
      else if (score >= 70) scoreRanges[2].count++;
      else if (score >= 60) scoreRanges[3].count++;
      else scoreRanges[4].count++;
    });
    
    return scoreRanges;
  };
  
  const scoreDistribution = calculateScoreDistribution();
  const maxCount = Math.max(...scoreDistribution.map(range => range.count));
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 p-1 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {loading ? 'Loading exam details...' : `Exam: ${exam?.name}`}
          </h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Students</p>
                    <p className="text-xl font-semibold text-gray-900">{exam.totalStudents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-green-100 rounded-full">
                    <BarChart2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Average Score</p>
                    <p className="text-xl font-semibold text-gray-900">{exam.averageScore.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-full">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="text-xl font-semibold text-gray-900">{exam.duration} min</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full">
                    <div className="h-5 w-5 text-purple-600 flex items-center justify-center font-bold">%</div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Passing Rate</p>
                    <p className="text-xl font-semibold text-gray-900">{exam.passingRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Exam details */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Exam Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Exam ID</p>
                  <p className="font-medium">{exam.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Organizer</p>
                  <p className="font-medium">{exam.organizer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="font-medium">{exam.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{exam.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Questions</p>
                  <p className="font-medium">{exam.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Highest Score</p>
                  <p className="font-medium text-green-600">{exam.highestScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lowest Score</p>
                  <p className="font-medium text-red-600">{exam.lowestScore}%</p>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <Download className="h-4 w-4 mr-1" />
                  Download Exam Report
                </button>
              </div>
            </div>
            
            {/* Score distribution */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Score Distribution</h2>
              
              <div className="space-y-2">
                {scoreDistribution.map((range, index) => (
                  <div key={range.label} className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">{range.label}%</div>
                    <div className="flex-1">
                      <div 
                        className={`h-8 rounded ${
                          index === 0 ? 'bg-green-500' :
                          index === 1 ? 'bg-green-400' :
                          index === 2 ? 'bg-yellow-400' :
                          index === 3 ? 'bg-orange-400' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${(range.count / maxCount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-10 text-right text-sm font-medium">{range.count}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Student results table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Student Results</h2>
              </div>
              
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="relative mb-4 sm:mb-0">
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute left-3 top-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label htmlFor="sortBy" className="text-sm text-gray-500">Sort by:</label>
                    <select
                      id="sortBy"
                      className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="score">Score (High to Low)</option>
                      <option value="name">Name</option>
                      <option value="time">Time Taken</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completed On
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time Taken
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map(student => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${
                            student.score >= 80 ? 'text-green-600' : 
                            student.score >= 70 ? 'text-blue-600' : 
                            student.score >= 60 ? 'text-yellow-600' : 
                            'text-red-600'
                          }`}>
                            {student.score}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {student.isPassed ? 'Passed' : 'Failed'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.completedAt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.timeTaken} min</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">45</span> of <span className="font-medium">45</span> results
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamDetailPage;