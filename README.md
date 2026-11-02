# AI Mystery Room

AI Mystery Room is a MERN-based interactive investigation platform. A user provides a fictional scenario, Gemini establishes one authoritative solution and generates evidence, and the user investigates before making one final accusation.

## Requirements

- Node.js 20+
- MongoDB 7+ (local or hosted)
- Gemini API key

## Setup

1. Install dependencies:

   ```powershell
   npm install
   npm run install:all
   ```

2. Copy `backend\.env.example` to `backend\.env` and set `MONGODB_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`.
3. Copy `frontend\.env.example` to `frontend\.env`.
4. Start both applications:

   ```powershell
   npm run dev
   ```

The frontend runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

## Architecture

- Authentication is intentionally disabled for this version. The API uses a shared anonymous detective workspace so users can start immediately without a login page.
- `backend\src\services\geminiService.js` owns Gemini access.
- `backend\src\services\mysteryGenerator.js` creates and validates the immutable private blueprint before publishing a case.
- Private culprit and timeline fields are excluded from normal investigation responses.
- `frontend\src\App.jsx` contains the initial route-level experience; feature components can be extracted as the UI grows.

## Important behavior

Gemini generation is not replaced with fake success data. If Gemini or MongoDB is unavailable, the API reports a failure and does not activate an incomplete investigation. Actual image/video provider integrations can be added behind the media fields and CCTV fallback described in `spec.md`.
