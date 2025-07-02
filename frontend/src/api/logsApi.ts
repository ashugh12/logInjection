import axios from "axios";

const BASE_URL = "http://localhost:3001/logs";

export async function fetchLogs(params: any) {
  const res = await axios.get(BASE_URL, { params });
  return res.data;
}

export async function postLog(log: any) {
  const res = await axios.post(BASE_URL, log);
  return res.data;
}