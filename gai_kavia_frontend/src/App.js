import React, { useEffect, useState } from 'react';
import './App.css';
import { getHealth, getInfo, getWelcome, getApiBase } from './apiClient';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the main application component.
   * Renders a layout with:
   * - Header (title and Docs link)
   * - Sidebar (buttons to call backend APIs)
   * - Main content (shows responses and current API base)
   * - Footer
   * Uses environment variables for all URLs.
   */
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [activeCall, setActiveCall] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
  const docsPath = process.env.REACT_APP_BACKEND_DOCS_PATH || '/swagger-ui.html';
  const docsHref = `${backendUrl}${docsPath}`;
  const apiBase = getApiBase();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle light/dark theme by swapping data-theme on document root. */
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleCall = async (which) => {
    setLoading(true);
    setActiveCall(which);
    setResult('');
    setError('');
    try {
      let data;
      if (which === 'health') data = await getHealth();
      if (which === 'info') data = await getInfo();
      if (which === 'welcome') data = await getWelcome();

      // Normalize to displayable string
      const output = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
      setResult(output);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <header className="app-header surface shadow">
        <div className="header-left">
          <div className="brand-mark" aria-hidden="true">🌊</div>
          <h1 className="title">GAI - KAVIA</h1>
          <span className="subtitle">Ocean Professional</span>
        </div>
        <div className="header-right">
          <a
            className="btn btn-outline"
            href={docsHref}
            target="_blank"
            rel="noreferrer"
            title="Open Backend API Docs"
          >
            Docs
          </a>
          <button
            className="btn btn-primary"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar surface shadow">
          <nav className="nav">
            <button
              className="nav-btn"
              onClick={() => handleCall('health')}
              disabled={loading}
            >
              {loading && activeCall === 'health' ? 'Checking…' : 'Check Health'}
            </button>
            <button
              className="nav-btn"
              onClick={() => handleCall('info')}
              disabled={loading}
            >
              {loading && activeCall === 'info' ? 'Fetching…' : 'Get Info'}
            </button>
            <button
              className="nav-btn"
              onClick={() => handleCall('welcome')}
              disabled={loading}
            >
              {loading && activeCall === 'welcome' ? 'Loading…' : 'Welcome'}
            </button>
          </nav>
          <div className="env-block">
            <div className="env-title">Environment</div>
            <div className="env-item">
              <span className="env-key">API Base:</span>
              <span className="env-val">{apiBase}</span>
            </div>
            <div className="env-item">
              <span className="env-key">Backend Docs:</span>
              <span className="env-val">{docsHref}</span>
            </div>
          </div>
        </aside>

        <main className="main surface shadow">
          <h2 className="section-title">Response</h2>
          {!result && !error && (
            <p className="muted">
              Use the buttons on the left to call the backend endpoints.
            </p>
          )}
          {error && (
            <div className="alert error">
              <strong>Error:</strong> {error}
            </div>
          )}
          {result && (
            <pre className="result">
{result}
            </pre>
          )}
        </main>
      </div>

      <footer className="app-footer surface">
        <span>© {new Date().getFullYear()} GAI - KAVIA. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default App;
