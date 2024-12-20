import MovieItem from '../components/MovieItem';
import CommentSection from '../components/CommentSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './MovieDetailPage.css';

function MovieDetailPage({
  movie,
  onBack,
  loginStatus,
  onLogin,
  onLogout,
  onRefresh,
  username,
  onAddFavorite,
  onRemoveFavorite,
  favorites,
  onViewUserProfile,
  onShowProfile,
  comments,
  loadComments,
  addComment,
  commentError,
}) {
  const isFavorite = favorites.includes(movie.id);

  return (
    <div className="movie-detail-page">
      <Header
        username={username}
        loginStatus={loginStatus}
        onLogin={onLogin}
        onLogout={onLogout}
        onRefresh={onRefresh}
        onShowProfile={onShowProfile}
      />

      <main className="movie-detail-page__main">
        <section className="movie-detail-page__movie">
          <button onClick={onBack} className="back-button">
            Back to Home
          </button>

          <MovieItem movie={movie} />

          {loginStatus === 'loggedIn' && (
            isFavorite ? (
              <button onClick={() => onRemoveFavorite(movie.id)}>Remove from Favorite</button>
            ) : (
              <button onClick={() => onAddFavorite(movie.id)}>Add to Favorite</button>
            )
          )}
        </section>

        <section className="movie-detail-page__comments">
          <h2>Comments</h2>
          <CommentSection
            username={username}
            comments={comments}
            loadComments={loadComments}
            addComment={addComment}
            error={commentError}
            onViewUserProfile={onViewUserProfile}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MovieDetailPage;