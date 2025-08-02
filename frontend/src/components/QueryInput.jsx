import React, { useState } from "react";
import FileUpload from "./FileUpload";
import api from "../services/api";

function QueryInput() {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!file || !query) return alert("Please upload file and enter query.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", query);

    setLoading(true);

    try {
      const res = await api.post("/api/ask", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      setResponse(res.data.result);
    } catch (error) {
      console.error("Error fetching response:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setUploadProgress(0);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Upload Document</h2>

      <FileUpload onUpload={setFile} />

      {/* Progress bar */}
      {/* {uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-blue-600 h-full transition-all duration-300 ease-in-out text-xs text-center text-white"
            style={{ width: `${uploadProgress}%` }}
          >
            {uploadProgress}%
          </div>
        </div>
      )} */}

      <h2 className="text-2xl font-bold text-gray-800">Ask a Question</h2>

      <input
        type="text"
        placeholder="Enter your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleAsk}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded font-medium disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : "Ask"}
      </button>

      {loading && (
        <div className="flex flex-col items-center mt-4 gap-2">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">Please wait...</p>
        </div>
      )}

      {response && !loading && (
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mt-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📋 Response</h3>
          <div className="text-gray-700 text-sm whitespace-pre-wrap max-h-64 overflow-auto">
            {response}
          </div>
        </div>
      )}
    </div>
  );
}

export default QueryInput;
