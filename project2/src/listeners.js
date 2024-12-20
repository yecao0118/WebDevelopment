import { fetchLogin, fetchLogout, fetchMessages, fetchAddMessage, fetchSession, fetchUsers, fetchAllUsers, fetchDeleteMessage } from './services';
import state, { login, logout, setMessages, setUsers, setAllUsers, setError, startLoginPending, clearError } from './state';
import render from './render';

let pollingInterval;

export function addAbilityToLogin({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('login__form')) return;
    e.preventDefault();

    const usernameInput = appEl.querySelector('.login__username');
    if (!usernameInput) {
      console.error('Login input element not found');
      setError('Login input not found');
      render({ state, appEl });
      return;
    }

    const username = usernameInput.value.trim();
    if (!username) {
      setError('Username is required');
      render({ state, appEl });
      return;
    }

    startLoginPending();
    render({ state, appEl });

    fetchLogin(username)
      .then(() => {
        login(username);
        clearError();
        return Promise.all([fetchMessages(), fetchUsers(), fetchAllUsers()]);
      })
      .then(([messages, users, allUsers]) => {
        setMessages(messages);
        setUsers(users);
        setAllUsers(allUsers);
        startPolling({ state, appEl });
        render({ state, appEl });
      })
      .catch(err => {
        setError(err.error);
        state.isLoginPending = false;
        render({ state, appEl });
      });
  });
}

export function addAbilityToLogout({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('controls__logout')) return;

    fetchLogout()
      .then(() => {
        logout();
        clearError();
        stopPolling();
        render({ state, appEl });
      })
      .catch(err => {
        setError(err.error);
        render({ state, appEl });
      });
  });
}

export function addAbilityToSendMessage({ state, appEl }) {
  appEl.addEventListener('input', (e) => {
    if (e.target.classList.contains('message__input')) {
      state.messageInputValue = e.target.value || '';
    }
  });

  appEl.addEventListener('submit', (e) => {
    if (!e.target.classList.contains('message__form')) return;
    e.preventDefault();

    const message = (state.messageInputValue || '').trim();
    if (!message) {
      setError('Message cannot be empty');
      render({ state, appEl });
      return;
    }

    fetchAddMessage(message)
      .then(() => {
        state.messageInputValue = ''; 
        clearError();
        render({ state, appEl });
      })
      .catch(err => {
        setError(err.error);
        render({ state, appEl });
      });
  });
}

export function addAbilityToDeleteMessage({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('message__delete')) {
      const messageId = e.target.getAttribute('data-id');
      fetchDeleteMessage(messageId)
        .then(response => {
          if (response.success) {
            state.messages = state.messages.filter(msg => msg.id !== messageId);
            render({ state, appEl });
          }
        })
        .catch(err => {
          setError(err.error);
          render({ state, appEl });
        });
    }
  });
}

export function startPolling({ state, appEl }) {
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
  pollingInterval = setInterval(() => {
    if (!state.isLoggedIn) {
      stopPolling();
      return;
    }
    Promise.all([fetchMessages(), fetchUsers(), fetchAllUsers()])
      .then(([newMessages, newUsers, newAllUsers]) => {
        const isMessagesUpdated = JSON.stringify(newMessages) !== JSON.stringify(state.messages);
        const isUsersUpdated = JSON.stringify(newUsers) !== JSON.stringify(state.users);
        const isAllUsersUpdated = JSON.stringify(newAllUsers) !== JSON.stringify(state.allUsers);

        if (isMessagesUpdated) {
          setMessages(newMessages);
        }
        if (isUsersUpdated) {
          setUsers(newUsers);
        }
        if (isAllUsersUpdated) {
          setAllUsers(newAllUsers);
        }

        if (isMessagesUpdated || isUsersUpdated || isAllUsersUpdated) {
          render({ state, appEl });
        }
      })
      .catch(err => {
        if (err.error === 'auth-missing') {
          logout();
          setError('Session expired. Please log in again.');
          stopPolling();
          render({ state, appEl });
          return;
        }
        if (!state.error) {
          setError(err.error);
          render({ state, appEl });
        }
      });
  }, 5000);
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}