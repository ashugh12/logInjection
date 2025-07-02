import dayjs from "dayjs";

type Log = {
  timestamp: string;
  message: string;
  level: "error" | "warn" | "info" | "debug";
  resourceId: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: Record<string, any>;
};

export default function LogList({ logs }: { logs: Log[] }) {
  if (!logs.length) return <p className="text-center text-gray-400 italic">No logs to display.</p>;

  const levelInfo: Record<Log["level"], { color: string; icon: string; label: string }> = {
    error: { color: "border-l-4 border-red-600 bg-red-50", icon: "❌", label: "Error" },
    warn: { color: "border-l-4 border-yellow-500 bg-yellow-50", icon: "⚠️", label: "Warning" },
    info: { color: "border-l-4 border-blue-500 bg-blue-50", icon: "ℹ️", label: "Info" },
    debug: { color: "border-l-4 border-gray-400 bg-gray-100", icon: "🐞", label: "Debug" }
  };

  return (
    <div className="space-y-5">
      {logs.map((log, index) => (
        <div
          key={index}
          className={`p-5 rounded-lg shadow-md transition transform hover:scale-[1.01] hover:shadow-lg ${levelInfo[log.level].color}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{levelInfo[log.level].icon}</span>
            <span className="text-sm text-gray-600">{dayjs(log.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>
            <span className="ml-auto px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide" style={{background: 'rgba(0,0,0,0.04)'}}>{levelInfo[log.level].label}</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-1">{log.message}</div>
          <div className="text-sm text-gray-700 mb-1">
            <strong>Resource:</strong> {log.resourceId} &nbsp;|&nbsp; <strong>Commit:</strong> {log.commit}
          </div>
          <div className="text-xs text-gray-500 mb-1">
            <strong>TraceId:</strong> {log.traceId} &nbsp;|&nbsp; <strong>SpanId:</strong> {log.spanId}
          </div>
          <div className="text-xs text-gray-600 rounded p-2 mt-2">
            <strong>Metadata:</strong> <span className="break-all">{JSON.stringify(log.metadata, null, 2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}