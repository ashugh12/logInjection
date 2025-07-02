export function validateLogEntry(log) {
  if (
    !log ||
    typeof log.level !== "string" ||
    !["error", "warn", "info", "debug"].includes(log.level) ||
    typeof log.message !== "string" ||
    typeof log.resourceId !== "string" ||
    typeof log.timestamp !== "string" ||
    typeof log.traceId !== "string" ||
    typeof log.spanId !== "string" ||
    typeof log.commit !== "string" ||
    typeof log.metadata !== "object" ||
    Array.isArray(log.metadata)
  ) {
    return false;
  }
  return true;
}
