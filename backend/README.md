Kakao OAuth helper server (minimal)

This tiny Express server implements two endpoints used by the frontend:

- `GET /auth/kakao` — redirects the browser to Kakao's authorization page. The Kakao redirect URI is set to the frontend callback: `FRONTEND_BASE_URL/auth/kakao/callback`.
- `GET /auth/kakao/redirect?code=...` — exchanges the `code` for an access token and fetches the Kakao profile, then looks up a user in `USER_DB_URL` (default: json-server at `http://localhost:3001`). If found, returns 200 with the user JSON, otherwise returns 401.

Setup
1. Copy `.env.example` to `.env` and fill values:

```
PORT=4000
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
FRONTEND_BASE_URL=http://localhost:5173
USER_DB_URL=http://localhost:3001
```

2. Install dependencies and start the server:

```bash
cd backend
npm install
npm start
```

3. Point your frontend to the backend by setting `VITE_BASE_URL` in the frontend `.env` (root of repo):

```
VITE_BASE_URL=http://localhost:4000
```

4. Restart the Vite dev server and test:

 - Open the app, click "카카오로 로그인" — you'll be redirected to Kakao login page (if your Kakao app is configured correctly).
 - After authorizing, Kakao will redirect back to the frontend callback page which calls `/auth/kakao/redirect?code=...` on this server.

Notes
- For local testing the `redirect_uri` you register in Kakao developers must match exactly `FRONTEND_BASE_URL/auth/kakao/callback` and be accessible via HTTPS if Kakao requires it for production features. Use `ngrok` to expose your local dev server via HTTPS when needed.
- This server expects a `users` resource on `USER_DB_URL` (json-server) where users created via Kakao have properties like `{ provider: 'kakao', providerId: <kakao id>, name, username }`.
