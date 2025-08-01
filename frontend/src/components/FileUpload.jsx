import React, { useState } from "react";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
