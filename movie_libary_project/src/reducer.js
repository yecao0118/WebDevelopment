import { LOGIN_STATUS, ACTIONS, CLIENT } from './constants';

export const initialState = {
  error: '',
  username: '',
  loginStatus: LOGIN_STATUS.PENDING,
  isLoadingMovies: false,
  movies: {},
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {

    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: '',
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        isTodoPending: false,
        todos: {},
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        lastAddedTodoId: '',
        username: '',
      };

    case ACTIONS.START_LOADING_MOVIES:
      return {
        ...state,
        error: '',
        isLoadingMovies: true,
      };

    case ACTIONS.REPLACE_MOVIES:
      return {
        ...state,
        error: '',
        isLoadingMovies: false,
        movies: action.movies,
      };


    case ACTIONS.REPLACE_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
      };

    case ACTIONS.ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.movieId],
      };

    case ACTIONS.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.movieId),
      };



    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error || 'ERROR',
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
  }
}

export default reducer;