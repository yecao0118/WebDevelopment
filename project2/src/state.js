import { MESSAGES } from './constants';

const state = {
  messages: [],
  users: [],    
  allUsers: [], 
  isLoggedIn: false,
  isLoginPending: false,
  isChatPending: false,
  error: '',
  username: ''
};

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = [];
  state.users = [];   
  state.error = '';
}

export function setMessages(newMessages) {
  state.messages = newMessages;
  state.isChatPending = false;
  state.error = '';
}

export function setUsers(newUsers) {
  const activeUsers = new Set(newUsers);
  state.users = state.users.filter(user => activeUsers.has(user));
  state.users = [...newUsers];
}

export function setAllUsers(newAllUsers) {
  state.allUsers = newAllUsers;
}

export function setError(error) {
  state.error = MESSAGES[error] || MESSAGES.default;
  state.isChatPending = false;
  state.isLoginPending = false;
}

export function startLoginPending() {
  state.isLoginPending = true;
  state.error = '';
}

export function startChatPending() {
  state.isChatPending = true;
  state.error = '';
}

export function clearError() {
  state.error = '';
}

export function setSession(username) {
  state.isLoggedIn = true;
  state.username = username;
  state.isLoginPending = false;
  state.error = '';
}

export default state;