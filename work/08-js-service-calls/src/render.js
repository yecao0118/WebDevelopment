import { MESSAGES } from './constants.js';
import { state } from './state.js';

export function render(appEl) {
  if (state.page === 'LOGIN') {
    renderLogin(appEl);
  } else if (state.page === 'WORD') {
    renderWordView(appEl);
  }
}

function renderLogin(appEl) {
  const errorMessage = state.error ? MESSAGES[state.error] || MESSAGES.default : '';
  appEl.innerHTML = `
    <h2>Login</h2>
    <div class="form-group">
      <input type="text" id="username-input" placeholder="Enter your username" required>
      <div class="button-group">
      <button class="login-button">Login</button>
      </div>
    </div>
    ${errorMessage ? `<div class="error">${errorMessage}</div>` : ''}
  `;
}

function renderWordView(appEl) {
  const errorMessage = state.error ? MESSAGES[state.error] || MESSAGES.default : '';
  appEl.innerHTML = `
    <h2>Welcome, ${state.username}</h2>
    <div class="stored-word">
      <div class="stored-word-line">Your stored word: <strong>${state.storedWord}</strong></div>
      <input type="text" id="word-input" class="word-input" placeholder="Update your word" value="${state.storedWord}">
      <button class="update-word-button">Update Word</button>
    </div>
    <div class="button-group">
    <button class="logout-button">Logout</button>
    </div>
    ${errorMessage ? `<div class="error">${errorMessage}</div>` : ''}
  `;
}