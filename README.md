# AI Mystery Room

AI Mystery Room is a MERN-based interactive investigation platform. A user provides a fictional scenario, Gemini establishes one authoritative solution and generates evidence, and the user investigates before making one final accusation.

## Requirements

- Node.js 20+
- MongoDB 7+ (local or hosted)
- Gemini API key

## Local setup

1. Install dependencies:

   ```powershell
   npm install
   npm run install:all
   ```

2. Copy `backend\.env.example` to `backend\.env` and set `MONGODB_URI` and `GEMINI_API_KEY`.
3. Copy `frontend\.env.example` to `frontend\.env`.
4. Start both applications:

   ```powershell
   npm run dev
   ```

The frontend runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

## Recommended deployment

Deploy the frontend to **Vercel**, the Express API to **Render**, and MongoDB to **MongoDB Atlas**. This matches the current project structure and does not require converting the backend into serverless functions.

### 1. Create the production database

1. Create a free MongoDB Atlas cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and save its password.
3. In **Network Access**, add `0.0.0.0/0` so Render can connect. For production, restrict this further if your hosting plan provides fixed outbound IPs.
4. Choose **Connect → Drivers**, copy the Node.js connection string, and replace its placeholders.

### 2. Deploy the backend to Render

1. Sign in to [Render](https://render.com) and choose **New → Blueprint**.
2. Connect `sherbo16/AI_Mystery` and select the `main` branch.
3. Render will detect [render.yaml](./render.yaml) and create the `ai-mystery-room-api` web service.
4. In the service environment variables, set:
   - `MONGODB_URI`: your Atlas connection string.
   - `GEMINI_API_KEY`: your Gemini API key.
   - `FRONTEND_URL`: the Vercel URL you will create in the next step. You can temporarily use `https://vercel.com` and update it afterward.
5. Deploy and wait for the health check to pass.
6. Open `https://<your-render-service>.onrender.com/health`. It should return:

   ```json
   { "success": true, "service": "ai-mystery-room-api" }
   ```

### 3. Deploy the frontend to Vercel

1. Sign in to [Vercel](https://vercel.com) and choose **Add New → Project**.
2. Import `sherbo16/AI_Mystery`.
3. Set **Root Directory** to `frontend`.
4. Keep the framework preset as **Vite**. The build command is `npm run build`, and the output directory is `dist`.
5. Add this environment variable:
   - `VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api/v1`
6. Deploy the project.
7. Copy the Vercel production URL and update Render’s `FRONTEND_URL` to that exact URL, without a trailing slash. Redeploy the Render service.

### 4. Verify the deployment

1. Open the Vercel URL.
2. Select **Start investigating**.
3. Submit a scenario of at least 30 characters.
4. Confirm the investigation progresses from generation to an active case.
5. Inspect evidence and submit one accusation.
6. Confirm the result page loads.

### Production environment files

Do not upload `.env` files. Use [backend/.env.example](./backend/.env.example) and [frontend/.env.example](./frontend/.env.example) only as key references. Set the real values in Render and Vercel dashboards.

## Architecture

- Authentication is intentionally disabled for this version. The API uses a shared anonymous detective workspace so users can start immediately without a login page.
- `backend\src\services\geminiService.js` owns Gemini access.
- `backend\src\services\mysteryGenerator.js` creates and validates the immutable private blueprint before publishing a case.
- Private culprit and timeline fields are excluded from normal investigation responses.
- `frontend\src\App.jsx` contains the initial route-level experience; feature components can be extracted as the UI grows.

## Important behavior

Gemini generation is not replaced with fake success data. If Gemini or MongoDB is unavailable, the API reports a failure and does not activate an incomplete investigation. Actual image/video provider integrations can be added behind the media fields and CCTV fallback described in `spec.md`.
