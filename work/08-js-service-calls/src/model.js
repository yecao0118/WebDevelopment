import { fetchLogin, fetchSession, fetchLogout, fetchWord, updateWord } from './services.js';
import { state } from './state.js';
import { PAGES } from './constants.js';


export function login(username) {
  return fetchLogin(username)
    .then(({ username }) => {
      state.username = username;
      state.page = PAGES.WORD;
      state.error = '';
      return loadWord();
    })
    .catch(error => {
      state.error = error.error;
      throw error;
    });
}

export function checkSession() {
  return fetchSession()
    .then(({ username }) => {
      state.username = username;
      state.page = PAGES.WORD;
      return loadWord();
    })
    .catch(() => {
      state.page = PAGES.LOGIN;
    });
}

export function logout() {
  return fetchLogout()
    .then(() => {
      state.username = '';
      state.storedWord = '';
      state.error = '';
      state.page = PAGES.LOGIN;
    })
    .catch(error => {
      state.error = error.error;
      throw error;
    });
}

export function loadWord() {
  return fetchWord()
    .then(({ storedWord }) => {
      state.storedWord = storedWord;
    })
    .catch(error => {
      state.error = error.error;
      throw error;
    });
}

export function updateStoredWord(word) {
    return checkSession()
      .then(() => {
        return updateWord(word);
      })
      .then(({ storedWord }) => {
        state.storedWord = storedWord;
        state.error = '';
      })
      .catch(error => {
        state.error = error.error;
        if (error.error === 'auth-missing') {
          state.page = PAGES.LOGIN;
        }
        throw error;
      });
  }