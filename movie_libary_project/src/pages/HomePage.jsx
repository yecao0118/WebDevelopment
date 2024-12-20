import Header from '../components/Header';
import MovieList from '../components/MovieList';
import Footer from '../components/Footer';
import './HomePage.css';

function HomePage({ movies, onLogin, onLogout, onRefresh, username, loginStatus, onMovieClick, onShowProfile }) {
  return (
    <div className="home-page">
      <Header 
        username={username}
        loginStatus={loginStatus}
        onLogin={onLogin}
        onLogout={onLogout}
        onRefresh={onRefresh}
        onShowProfile={onShowProfile}
      />

      <main className="home-page__main">
        <h1>WELCOME TO MOVIE LIBRARY</h1>
        <MovieList movies={movies} onMovieClick={onMovieClick} />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;