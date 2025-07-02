import React, { useState } from "react";
import { postLog } from "../api/logsApi";

const initialLog = {
  level: "info",
  message: "",
  resourceId: "",
  timestamp: new Date().toISOString(),
  traceId: "",
  spanId: "",
  commit: "",
  metadata: "{}"
};

export default function AddLogForm({ onLogAdded }: { onLogAdded: () => void }) {
  const [log, setLog] = useState(initialLog);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const logToSend = { ...log, metadata: JSON.parse(log.metadata) };
      await postLog(logToSend);
      setLog(initialLog);
      setError("");
      onLogAdded();
    } catch (err) {
      setError("Failed to add log. Check your input.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-6 border rounded-lg bg-white shadow-lg max-w-2xl mx-auto">
      <h2 className="font-bold mb-4 text-2xl text-blue-700">Add Log Entry</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="level" className="mb-1 font-medium">Level</label>
          <select id="level" name="level" value={log.level} onChange={handleChange} className="border p-2 rounded focus:ring-2 focus:ring-blue-400" required>
            <option value="error">Error</option>
            <option value="warn">Warn</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 font-medium">Message</label>
          <input id="message" name="message" value={log.message} onChange={handleChange} placeholder="Describe the log message" className="border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="resourceId" className="mb-1 font-medium">Resource ID</label>
          <input id="resourceId" name="resourceId" value={log.resourceId} onChange={handleChange} placeholder="e.g. server-123" className="border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="timestamp" className="mb-1 font-medium">Timestamp</label>
          <input id="timestamp" name="timestamp" value={log.timestamp} onChange={handleChange} placeholder="YYYY-MM-DDTHH:MM:SSZ" className="border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="traceId" className="mb-1 font-medium">Trace ID</label>
          <input id="traceId" name="traceId" value={log.traceId} onChange={handleChange} placeholder="Trace ID" className="border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="spanId" className="mb-1 font-medium">Span ID</label>
          <input id="spanId" name="spanId" value={log.spanId} onChange={handleChange} placeholder="Span ID" className="border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="commit" className="mb-1 font-medium">Commit</label>
          <input id="commit" name="commit" value={log.commit} onChange={handleChange} placeholder="Commit hash" className="border p-2 rounded focus:ring-2 focus:ring-blue-400" required />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="metadata" className="mb-1 font-medium">Metadata <span className="text-xs text-gray-500">(JSON format)</span></label>
          <textarea id="metadata" name="metadata" value={log.metadata} onChange={handleChange} placeholder='{"user": "john", "env": "prod"}' className="border p-2 rounded focus:ring-2 focus:ring-blue-400 min-h-[60px]" required />
          <span className="text-xs text-gray-500 mt-1">Enter additional metadata as a JSON object.</span>
        </div>
      </div>
      <button type="submit" className={`bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded mt-6 w-full font-semibold flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={loading}>
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        ) : null}
        {loading ? 'Adding...' : 'Add Log'}
      </button>
      {error && <div className="text-red-500 mt-3 text-center">{error}</div>}
    </form>
  );
}