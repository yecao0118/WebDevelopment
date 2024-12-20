function handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return response
      .json()
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then((error) => Promise.reject(error));
  }
  
  export function fetchSession() {
    return fetch('/api/session', { method: 'GET' })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchLogout() {
    return fetch('/api/session', { method: 'DELETE' })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchWord() {
    return fetch('/api/word', { method: 'GET' })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }
  
  export function fetchUpdateWord(word) {
    return fetch('/api/word', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word }),
    })
      .catch(() => Promise.reject({ error: 'networkError' }))
      .then(handleResponse);
  }