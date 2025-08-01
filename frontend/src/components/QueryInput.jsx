import React, { useState } from "react";

function QueryInput() {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    if (!file || !query) return alert("Please upload file and enter query.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", query);

    const res = await fetch("http://localhost:8000/api/ask", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Enter your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-2 py-1 my-2 w-full"
      />
      <button onClick={handleAsk} className="bg-blue-600 text-white px-4 py-2">Ask</button>

      {response && (
        <pre className="mt-4 p-4 border bg-gray-100">{response}</pre>
      )}
    </div>
  );
}

export default QueryInput;
