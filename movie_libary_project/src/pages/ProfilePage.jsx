import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';

function ProfilePage({ 
  favorites, 
  movies, 
  onBack, 
  onMovieClick, 
  onRemoveFavorite, 
  username, 
  loginStatus, 
  onLogin, 
  onLogout,
  onRefresh,
  onShowProfile
}) {

  const favoriteMovies = favorites.map(favId => movies[favId]).filter(Boolean);

  return (
    <div className="profile-page">
      <Header
        username={username}
        loginStatus={loginStatus}
        onLogin={onLogin}
        onLogout={onLogout}
        onRefresh={onRefresh}
        onShowProfile={onShowProfile}
      />
      <main className= "profile-page-main">
        <button onClick={onBack} className="back-button">Back to Home</button>
        {favoriteMovies.length > 0 ? (
          <div className="movie-list">
            <h2>Your Favorite Movies</h2>
            <ul>
              {favoriteMovies.map(movie => (
                <li
                  key={movie.id}
                  className="movie-item"
                  onClick={() => onMovieClick(movie.id)}
                >
                  <div className="movie-text">
                    <h3>{movie.title}</h3>
                    <p>Year: {movie.year}</p>
                    <p>Rating: {movie.rating}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(movie.id);
                    }}
                    className="remove-favorite-button"
                  >
                    Remove from Favorite
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>You have no favorites yet.</p>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default ProfilePage;