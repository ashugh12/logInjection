# Log Ingestion System

A full-stack application for ingesting, storing, filtering, and viewing logs. Built with Node.js/Express (backend) and React + TypeScript + Tailwind CSS (frontend).

---

## Features
- Add new log entries with metadata
- Filter logs by level, message, resource, and timestamp range
- View logs in a modern, responsive UI
- Backend API for log storage and retrieval
- JSON-based metadata support

---

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** JSON file (for demo; can be swapped for MongoDB, etc.)

---

## Directory Structure
```
log-ingestion-system/
  backend/           # Express backend
    controllers/     # Route controllers
    db/              # Log storage logic
    routes/          # API routes
    utils/           # Validation helpers
    logs.json        # Log data (JSON)
    server.js        # Entry point
  frontend/          # React frontend
    src/
      components/    # UI components
      api/           # API calls
      ...
    public/
    index.html
    tailwind.config.js
    postcss.config.cjs
    ...
  README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/ashugh12/logInjection.git
```

### 2. Install dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Start the servers
#### Backend
```bash
cd backend
npm start
# or: node server.js
```
#### Frontend
```bash
cd ../frontend
npm run dev
```
---

## Implementation & Logic

### Log Ingestion
- Users add logs via the frontend form (`AddLogForm`).
- Each log includes: level, message, resourceId, timestamp, traceId, spanId, commit, and metadata (JSON).
- The frontend validates and sends the log to the backend API (`POST /api/logs`).
- The backend validates, stores the log in `logs.json`, and returns success/failure.

### Log Filtering & Display
- The frontend fetches logs from the backend (`GET /api/logs`) with optional query params for filtering (level, message, resourceId, timestamp range).
- The backend filters logs based on query params and returns the result.
- Logs are displayed in a styled list (`LogList`), with color-coded levels and metadata.
- Users can filter logs using the `FilterBar` component.

---

## API Endpoints

### `POST /api/logs`
- Add a new log entry
- Body: `{ level, message, resourceId, timestamp, traceId, spanId, commit, metadata }`

### `GET /api/logs`
- Fetch logs (optionally filtered)
- Query params: `level`, `message`, `resourceId`, `timestamp_start`, `timestamp_end`

---

## Development & Troubleshooting

- **Tailwind not working?** Ensure `import './index.css'` is present in `App.tsx` or `main.tsx` and that `postcss.config.cjs` is used (not `.js`). Restart the dev server after config changes.
- **Backend not running?** Check for port conflicts or missing dependencies.
- **Logs not saving?** Ensure the backend has write permissions to `logs.json`.
- **API errors?** Check the backend console for validation or parsing errors.

---

## Credits
- Created by Ashutosh and Cursor IDE.
̌