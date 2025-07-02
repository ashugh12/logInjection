import React from "react";

type Filters = {
  level: string;
  message: string;
  resourceId: string;
  timestamp_start: string;
  timestamp_end: string;
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function FilterBar({ filters, setFilters }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 font-medium text-gray-700 flex items-center gap-1">
            <span role="img" aria-label="search">🔍</span> Message
          </label>
          <input
            id="message"
            type="text"
            name="message"
            placeholder="Search Message"
            value={filters.message}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="level" className="mb-1 font-medium text-gray-700 flex items-center gap-1">
            <span role="img" aria-label="level">📊</span> Level
          </label>
          <select
            id="level"
            name="level"
            value={filters.level}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Levels</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="resourceId" className="mb-1 font-medium text-gray-700 flex items-center gap-1">
            <span role="img" aria-label="resource">🗂️</span> Resource ID
          </label>
          <input
            id="resourceId"
            type="text"
            name="resourceId"
            placeholder="Resource ID"
            value={filters.resourceId}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="timestamp_start" className="mb-1 font-medium text-gray-700 flex items-center gap-1">
            <span role="img" aria-label="start">⏰</span> Start Time
          </label>
          <input
            id="timestamp_start"
            type="datetime-local"
            name="timestamp_start"
            value={filters.timestamp_start}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="timestamp_end" className="mb-1 font-medium text-gray-700 flex items-center gap-1">
            <span role="img" aria-label="end">⏳</span> End Time
          </label>
          <input
            id="timestamp_end"
            type="datetime-local"
            name="timestamp_end"
            value={filters.timestamp_end}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col justify-end">
          <button
            onClick={() => setFilters({ level: "", message: "", resourceId: "", timestamp_start: "", timestamp_end: "" })}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold p-2 rounded transition border border-blue-200 shadow-sm"
            type="button"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}