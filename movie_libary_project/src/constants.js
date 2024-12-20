export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MOVIE_TITLE: 'required-movie-title',
  MOVIE_NOT_FOUND: 'movie-not-found',
  NO_SUCH_ID: 'noSuchId',            
  REQUIRED_FIELDS: 'required-fields',
  USER_NOT_FOUND: 'user-not-found',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  UNKNOWN_ACTION: 'unknownAction',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again.',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username.',
  [SERVER.REQUIRED_MOVIE_TITLE]: 'Movie title is required.',
  [SERVER.MOVIE_NOT_FOUND]: 'The requested movie could not be found.',
  [SERVER.NO_SUCH_ID]: 'No movie found with the given ID.',        
  [SERVER.REQUIRED_FIELDS]: 'Missing required movie fields (e.g., title or year).', 
  [SERVER.USER_NOT_FOUND]: 'The requested user does not exist.',
  default: 'Something went wrong. Please try again.',
};

export const ACTIONS = {
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',
  START_LOADING_MOVIES: 'startLoadingMovies',
  REPLACE_MOVIES: 'replaceMovies',
  REPORT_ERROR: 'reportError',
  ADD_FAVORITE: 'addFavorite',
  REMOVE_FAVORITE: 'removeFavorite',
  REPLACE_FAVORITES: 'replaceFavorites',
};