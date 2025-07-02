import { readLogs, writeLogs } from "../db/logs.js";
import { validateLogEntry } from "../utils/validation.js";

export async function ingestLog(req, res) {
  const log = req.body;
  if (!validateLogEntry(log)) {
    return res.status(400).json({ error: "Invalid log schema" });
  }
  try {
    const logs = await readLogs();
    logs.push(log);
    await writeLogs(logs);
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: "Failed to store log" });
  }
}

export async function getLogs(req, res) {
  try {
    let logs = await readLogs();
    // Filtering
    const {
      level,
      message,
      resourceId,
      timestamp_start,
      timestamp_end,
      traceId,
      spanId,
      commit
    } = req.query;

    if (level) logs = logs.filter(l => l.level === level);
    if (message) logs = logs.filter(l => l.message.toLowerCase().includes(message.toLowerCase()));
    if (resourceId) logs = logs.filter(l => l.resourceId === resourceId);
    if (timestamp_start) logs = logs.filter(l => l.timestamp >= timestamp_start);
    if (timestamp_end) logs = logs.filter(l => l.timestamp <= timestamp_end);
    if (traceId) logs = logs.filter(l => l.traceId === traceId);
    if (spanId) logs = logs.filter(l => l.spanId === spanId);
    if (commit) logs = logs.filter(l => l.commit === commit);

    // Sort reverse-chronological
    logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve logs" });
  }
}
