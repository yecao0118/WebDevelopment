import state, { login, logout, setMessages, setUsers, setAllUsers, setError } from './state';
import { fetchLogin, fetchLogout, fetchMessages, fetchAddMessage, fetchSession, fetchUsers, fetchAllUsers } from './services';
import render from './render';
import { addAbilityToLogin, addAbilityToLogout, addAbilityToSendMessage, startPolling, addAbilityToDeleteMessage } from './listeners';

const appEl = document.querySelector('#app');
render({ state, appEl });

addAbilityToLogin({ state, appEl });
addAbilityToLogout({ state, appEl });
addAbilityToSendMessage({ state, appEl });
startPolling({ state, appEl });
addAbilityToDeleteMessage({ state, appEl }); 
checkForSession();

function checkForSession() {
  fetchSession()
    .then(session => {
      login(session.username);
      render({ state, appEl });
      return Promise.all([fetchMessages(), fetchUsers(), fetchAllUsers()]);
    })
    .catch(err => {
      if (err?.error === 'auth-missing') {
        return Promise.reject({ error: 'noSession' });
      }
      return Promise.reject(err);
    })
    .then(([messages, users, allUsers]) => {
      setMessages(messages);
      setUsers(users);
      setAllUsers(allUsers);
      render({ state, appEl });
    })
    .catch(err => {
      if (err?.error === 'noSession') {
        logout();
        render({ state, appEl });
        return;
      }

      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });
}