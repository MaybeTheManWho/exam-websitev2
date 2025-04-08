import React from 'react';
import { PlusCircle } from 'lucide-react';

const CreateExamTab = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <PlusCircle className="h-16 w-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Create Exam Feature</h3>
      <p className="text-gray-500 text-center max-w-md">
        This feature will be implemented in the next phase. Check back soon!
      </p>
    </div>
  );
};

export default CreateExamTab;