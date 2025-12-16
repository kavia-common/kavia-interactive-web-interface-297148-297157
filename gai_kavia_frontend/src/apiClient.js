const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

/**
 * Simple helper to handle fetch with JSON parsing and error surface.
 * Ensures no hard-coded URLs and uses REACT_APP_* variables.
 */
async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain;q=0.9, */*;q=0.8',
    },
    ...options,
  });

  const contentType = resp.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!resp.ok) {
    let message = `Request failed with status ${resp.status}`;
    try {
      const errBody = isJson ? await resp.json() : await resp.text();
      message += `: ${typeof errBody === 'string' ? errBody : JSON.stringify(errBody)}`;
    } catch {
      // ignore parsing error, use default message
    }
    throw new Error(message);
  }

  try {
    return isJson ? await resp.json() : await resp.text();
  } catch {
    // Fallback to text if JSON parsing fails
    return await resp.text();
  }
}

// PUBLIC_INTERFACE
export async function getHealth() {
  /** Returns backend health check response from `${API_BASE}/health`. */
  const healthPath = process.env.REACT_APP_HEALTHCHECK_PATH || '/health';
  return request(healthPath);
}

// PUBLIC_INTERFACE
export async function getInfo() {
  /** Returns backend info response from `${API_BASE}/api/info`. */
  return request('/api/info');
}

// PUBLIC_INTERFACE
export async function getWelcome() {
  /** Returns backend welcome response from `${API_BASE}/`. */
  return request('/');
}

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns the resolved API base URL derived from REACT_APP_API_BASE. */
  return API_BASE;
}
