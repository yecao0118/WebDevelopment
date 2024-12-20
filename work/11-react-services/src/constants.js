export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
  };
  
  export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    INVALID_USERNAME: 'invalid-username',
    USER_DISALLOWED: 'user-disallowed',
    INVALID_WORD: 'invalid-word',
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
  };
  
  export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]:
      'Trouble connecting to the network. Please try again.',
    [SERVER.INVALID_USERNAME]:
      'Invalid username. Please use letters, numbers, or underscores.',
    [SERVER.USER_DISALLOWED]: 'User is disallowed. Please choose a different username.',
    [SERVER.AUTH_MISSING]: 'You must be logged in to perform this action.',
    [SERVER.INVALID_WORD]:
      'Invalid word. Please enter a word with letters only (max 20 characters).',
    default: 'An unexpected error occurred. Please try again.',
  };