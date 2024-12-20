import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';

function UserProfilePage({
  viewedUser,
  viewedUserFavorites,
  onBack,
  onMovieClick,
  username,
  loginStatus,
  onLogin,
  onLogout,
  onRefresh,
  onShowProfile
}) {
  return (
    <div className="user-profile-page">
      <Header
        username={username}
        loginStatus={loginStatus}
        onLogin={onLogin}
        onLogout={onLogout}
        onRefresh={onRefresh}
        onShowProfile={onShowProfile} 
      />
      <main className= "user-profile-page-main">
        <button onClick={onBack} className="back-button">Back To Home</button>
        <h1>{viewedUser}'s Profile</h1>
        {viewedUserFavorites.length > 0 ? (
          <div className="movie-list">
            <h2>Favorite Movies</h2>
            <ul>
              {viewedUserFavorites.map(movie => (
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
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>This user has no favorites.</p>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default UserProfilePage;