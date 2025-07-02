import { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import LogList from "./components/LogList";
import AddLogForm from "./components/AddLogForm";
import { fetchLogs } from "./api/logsApi";
import './index.css';

type Filters = {
  level: string;
  message: string;
  resourceId: string;
  timestamp_start: string;
  timestamp_end: string;
};

export default function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState<Filters>({
    level: "",
    message: "",
    resourceId: "",
    timestamp_start: "",
    timestamp_end: ""
  });

  const refreshLogs = () => fetchLogs(filters).then(setLogs).catch(console.error);

  useEffect(() => {
    refreshLogs();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="p-4 max-w-5xl mx-auto font-sans">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 drop-shadow">Log Viewer</h1>
        <AddLogForm onLogAdded={refreshLogs} />
        <FilterBar filters={filters} setFilters={setFilters} />
        <LogList logs={logs} />
      </div>
    </div>
  );
}


// import React from "react";
// import './index.css';
// export default function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
//       <div className="p-8 bg-white rounded-lg shadow-lg text-center">
//         <h1 className="text-4xl font-bold text-blue-700 mb-2">Hello, World!</h1>
//         <p className="text-gray-600">Welcome to your Tailwind-powered app.</p>
//       </div>
//     </div>
//   );
// }
