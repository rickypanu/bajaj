import React, { useState } from "react";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile?.name || "");
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center gap-4">
      <label className="w-full sm:w-auto">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <div className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded text-center">
          Choose File
        </div>
      </label>
      <span className="text-gray-600 text-sm truncate w-full sm:w-auto">{fileName || "No file chosen"}</span>
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
