import React, { useState, useRef } from "react";

const FileUpload = ({ onUpload }) => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null); // for resetting input

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile?.name || "");
    onUpload(selectedFile);
  };

  const handleRemoveFile = () => {
    setFileName("");
    onUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset file input
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center gap-4">
      <label className="w-full sm:w-auto relative">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded text-center hover:bg-blue-700">
          Choose File
        </div>
      </label>

      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm truncate max-w-xs">
          {fileName || "No file chosen"}
        </span>

        {fileName && (
          <button
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
            title="Remove file"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
