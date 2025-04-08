import React from 'react';
import { Clock, FileText } from 'lucide-react';

const ExamIntroduction = ({ exam, onStartExam, onCancel }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Exam: {exam ? exam.name : 'Loading...'}
          </h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-4">
              {/* Time duration info */}
              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">Time Duration</h2>
                    <p className="text-xl font-bold">{exam ? exam.duration : '--'} Minutes</p>
                  </div>
                </div>
              </div>
              
              {/* Question count info */}
              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-green-100 rounded-full">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">Questions</h2>
                    <p className="text-xl font-bold">{exam ? exam.questionCount : '--'} Questions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Exam Instructions</h2>
              
              <div className="prose max-w-none">
                <p className="mb-4">Please read the following instructions carefully before starting the exam:</p>
                
                <ul className="list-disc pl-5 mb-4">
                  <li className="mb-2">This exam contains {exam ? exam.questionCount : 'multiple'} multiple-choice questions.</li>
                  <li className="mb-2">You have {exam ? exam.duration : 'a fixed amount of'} minutes to complete the exam.</li>
                  <li className="mb-2">Each question has four possible answers, but only one is correct.</li>
                  <li className="mb-2">You can navigate between questions using the next and previous buttons.</li>
                  <li className="mb-2">You can mark questions for review and come back to them later.</li>
                  <li className="mb-2">The timer will start as soon as you click the "Start Exam" button.</li>
                  <li className="mb-2">Your answers are automatically saved as you progress.</li>
                  <li className="mb-2">Once you submit the exam, you cannot return to review or change your answers.</li>
                </ul>
                
                <p className="mb-4 font-medium">Academic Integrity Statement:</p>
                <p className="mb-6">By starting this exam, you agree to abide by the academic integrity policy. Any form of cheating or unauthorized assistance will result in disciplinary action.</p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                  <p className="text-yellow-700">
                    <strong>Note:</strong> Please ensure you have a stable internet connection before starting the exam.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={onStartExam}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamIntroduction;