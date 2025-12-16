# Frontend E2E Verification

1) Ensure .env has:
   REACT_APP_FRONTEND_URL=http://localhost:3000
   REACT_APP_BACKEND_URL=http://localhost:3001
   REACT_APP_API_BASE=http://localhost:3001
   REACT_APP_HEALTHCHECK_PATH=/health
   REACT_APP_BACKEND_DOCS_PATH=/swagger-ui.html

2) Start backend (port 3001): ./gradlew bootRun

3) Start frontend (port 3000): npm start

4) In the app:
   - Click "Check Health" -> should display JSON with status: "UP"
   - Click "Get Info" -> should display info JSON
   - Click "Welcome" -> should display "Welcome to GAI - KAVIA Backend"
   - Click "Docs" -> opens http://localhost:3001/swagger-ui.html in a new tab

CORS:
- Backend allows http://localhost:3000 via CorsConfig; calls should work without CORS errors in the browser console.
