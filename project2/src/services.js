export function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  }).then(handleResponse);
}

export function fetchLogout() {
  return fetch('/api/session', { method: 'DELETE' }).then(handleResponse);
}

export function fetchMessages() {
  return fetch('/api/messages').then(handleResponse);
}

export function fetchAddMessage(message) {
  return fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  }).then(handleResponse);
}

export function fetchSession() {
  return fetch('/api/session')
    .then(handleResponse)
    .catch(err => {
      if (err.error === 'auth-missing') {
        return Promise.reject({ error: 'auth-missing' });
      }
      return Promise.reject(err);
    });
}

export function fetchUsers() {
  return fetch('/api/users')
    .then(handleResponse)
    .catch(err => {
      const error = err.error || 'Failed to fetch users';
      return Promise.reject({ error });
    });
}

export function fetchAllUsers() {
  return fetch('/api/allusers')
    .then(handleResponse)
    .catch(err => {
      const error = err.error || 'Failed to fetch all users';
      return Promise.reject({ error });
    });
}

export function fetchDeleteMessage(id) {
  return fetch(`/api/messages/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(err => {
    const error = err.error || 'Something went wrong';
    return Promise.reject({ error });
  });
}