import { useEffect, useReducer, useState } from 'react';
import reducer, { initialState } from './reducer';
import { LOGIN_STATUS, ACTIONS, SERVER } from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchMovies,
  fetchLogout,
  fetchMovieDetails,
  fetchFavorites,
  fetchAddFavorite,
  fetchRemoveFavorite,
  fetchUserProfile,
  fetchComments,
  fetchAddComment
} from './services';

import Status from './components/Status';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import './App.css';
import { set } from 'mongoose';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [viewedUser, setViewedUser] = useState(null);
  const [viewedUserFavorites, setViewedUserFavorites] = useState([]);
  const [comments, setComments] = useState({});
  const [commentError, setCommentError] = useState('');

  function checkForSession() {
    fetchSession()
      .then(session => {
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        return Promise.all([fetchMovies(), fetchFavorites()]);
      })
      .then(([movies, favorites]) => {
        dispatch({ type: ACTIONS.REPLACE_MOVIES, movies });
        dispatch({ type: ACTIONS.REPLACE_FAVORITES, favorites });
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          fetchMovies().then(movies => dispatch({ type: ACTIONS.REPLACE_MOVIES, movies }));
        }
      });
  }

  function onLogin(username) {
    dispatch({ type: ACTIONS.START_LOADING_MOVIES });
    fetchLogin(username)
      .then(() => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        return Promise.all([fetchMovies(), fetchFavorites()]);
      })
      .then(([movies, favorites]) => {
        dispatch({ type: ACTIONS.REPLACE_MOVIES, movies });
        dispatch({ type: ACTIONS.REPLACE_FAVORITES, favorites });
      })
      .catch((err) => dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error }));
  }

  function onLogout() {
    fetchLogout()
      .then(() => dispatch({ type: ACTIONS.LOG_OUT }))
      .catch((err) => dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error }));
      setCurrentPage('home');
  }

  function onRefresh() {
    if (state.loginStatus === LOGIN_STATUS.LOGGED_IN) {
      Promise.all([fetchMovies(), fetchFavorites()])
        .then(([movies, favorites]) => {
          dispatch({ type: ACTIONS.REPLACE_MOVIES, movies });
          dispatch({ type: ACTIONS.REPLACE_FAVORITES, favorites });
        })
        .catch((err) => dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error }));
    } else {
      fetchMovies()
        .then((movies) => dispatch({ type: ACTIONS.REPLACE_MOVIES, movies }))
        .catch((err) => dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error }));
    }
  }

  function handleBackToHome() {
    setSelectedMovie(null);
    setCurrentPage('home');
  }

  function onShowProfile() {
    setCurrentPage('profile');
  }

  function handleMovieClick(movieId) {
    fetchMovieDetails(movieId)
      .then((movie) => {
        setSelectedMovie(movie);
        setCurrentPage('details');
      })
      .catch((err) => dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error }));
  }

  function handleAddFavorite(movieId) {
    fetchAddFavorite(movieId)
      .then((favorites) => dispatch({ type: ACTIONS.REPLACE_FAVORITES, favorites }))
      .catch((err) => dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error }));
  }

  function handleRemoveFavorite(movieId) {
    fetchRemoveFavorite(movieId)
      .then((favorites) => dispatch({ type: ACTIONS.REPLACE_FAVORITES, favorites }))
      .catch((err) => dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error }));
  }

  function handleViewUserProfile(username) {
    fetchUserProfile(username)
      .then((data) => {
        const favMovies = data.favorites.map((id) => state.movies[id]).filter(Boolean);
        setViewedUser(data.username);
        setViewedUserFavorites(favMovies);
        setCurrentPage('userProfile');
      })
      .catch((err) => dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error }));
  }

  function handleUserClick(clickedUsername) {
    if (clickedUsername === state.username) {
      setCurrentPage('profile');
    } else {
      handleViewUserProfile(clickedUsername);
    }
  }

  function loadComments(movieId) {
    fetchComments(movieId)
      .then((data) => {
        setComments((prev) => ({ ...prev, [movieId]: data }));
        setCommentError('');
      })
      .catch((err) => {
        console.error('Error fetching comments:', err);
        setCommentError('Failed to load comments.');
      });
  }

  function addComment(movieId, commentData) {
    fetchAddComment(movieId, commentData)
      .then((savedComment) => {
        setComments((prev) => ({
          ...prev,
          [movieId]: [...(prev[movieId] || []), savedComment],
        }));
        setCommentError('');
      })
      .catch((err) => {
        console.error('Error adding comment:', err);
        setCommentError(err?.error === SERVER.AUTH_MISSING ? 'Login first to add a comment.' : 'Failed to add comment.');
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);


  return (
    <div className="app">
      {state.error && <Status error={state.error} />}
      {state.loginStatus === LOGIN_STATUS.PENDING && <Loading>Loading user...</Loading>}

      {currentPage === 'home' && (
        <HomePage
          movies={state.movies}
          onLogin={onLogin}
          onLogout={onLogout}
          onRefresh={onRefresh}
          username={state.username}
          loginStatus={state.loginStatus}
          onMovieClick={handleMovieClick}
          onShowProfile={onShowProfile}
        />
      )}

      {currentPage === 'details' && selectedMovie && (
        <MovieDetailPage
          movie={selectedMovie}
          onBack={handleBackToHome}
          loginStatus={state.loginStatus}
          onLogin={onLogin}
          onLogout={onLogout}
          onRefresh={onRefresh}
          onShowProfile={onShowProfile}
          username={state.username}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          favorites={state.favorites}
          onViewUserProfile={handleUserClick}
          comments={comments[selectedMovie.id] || []}
          loadComments={() => loadComments(selectedMovie.id)}
          addComment={(commentData) => addComment(selectedMovie.id, commentData)}
          commentError={commentError}
        />
      )}

      {currentPage === 'profile' && (
        <ProfilePage
          favorites={state.favorites}
          movies={state.movies}
          onBack={handleBackToHome}
          onShowProfile={onShowProfile}
          onMovieClick={handleMovieClick}
          onRemoveFavorite={handleRemoveFavorite}
          username={state.username}
          loginStatus={state.loginStatus}
          onLogin={onLogin}
          onLogout={onLogout}
          onRefresh={onRefresh}
        />
      )}

      {currentPage === 'userProfile' && (
        <UserProfilePage
          viewedUser={viewedUser}
          viewedUserFavorites={viewedUserFavorites}
          onBack={handleBackToHome}
          onMovieClick={handleMovieClick}
          username={state.username}
          loginStatus={state.loginStatus}
          onLogin={onLogin}
          onLogout={onLogout}
          onRefresh={onRefresh}
          onShowProfile={onShowProfile}
        />
      )}
    </div>
  );
}

export default App;
