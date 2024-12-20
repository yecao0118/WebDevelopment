import { state } from './state.js';
import { render } from './render.js';
import { login, checkSession, logout, updateStoredWord } from './model.js';

const appEl = document.querySelector('#app');

checkSession().then(() => {
  render(appEl);
});

appEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('login-button')) {
    const username = document.querySelector('#username-input').value.trim();
    login(username)
      .then(() => render(appEl))
      .catch(() => render(appEl));
  }

  if (e.target.classList.contains('logout-button')) {
    logout()
      .then(() => render(appEl))
      .catch(() => render(appEl));
  }

  if (e.target.classList.contains('update-word-button')) {
    const newWord = document.querySelector('#word-input').value.trim();
    updateStoredWord(newWord)
      .then(() => render(appEl))
      .catch(() => render(appEl));
  }
});

appEl.addEventListener('input', (e) => {
  if (e.target.classList.contains('word-input')) {
    state.storedWord = e.target.value;
  }
});