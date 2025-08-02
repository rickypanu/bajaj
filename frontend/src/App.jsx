import React from 'react';
import FileUpload from './components/FileUpload';
import QueryInput from './components/QueryInput';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">📄 Document QA System</h1>
          <p className="text-gray-500">Upload your document and ask questions. Get instant answers powered by AI.</p>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          {/* <FileUpload /> */}
          <QueryInput />
        </div>
      </div>
    </div>
  );
}

export default App;
