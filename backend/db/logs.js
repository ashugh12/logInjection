import fs from "fs/promises";
const LOG_FILE = new URL("../logs.json", import.meta.url);

export async function readLogs() {
  try {
    const data = await fs.readFile(LOG_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

export async function writeLogs(logs) {
  await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));
}
