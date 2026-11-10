# Lab Equipment Lending System

A Vue 3 + TypeScript single-page application for managing lab equipment catalog browsing and student loan requests.

## Architecture
- **Frontend:** Vue 3, Vite, TypeScript, Vue Router, Pinia, and Tailwind CSS.
- **Backend Mock:** `json-server` running a local REST API (`db.json`).

## Run It Locally

The application requires two concurrent terminal processes to run:

1. **Start the mock API server (Terminal 1):**
   ```bash
   npm run server
2. **Start the Vite development server (Terminal 2):**
   ```bash
   npm run dev