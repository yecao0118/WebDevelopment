import './MovieList.css';

function MovieList({ movies, onMovieClick }) {
  if (!movies || Object.keys(movies).length === 0) {
    return <p>No movies available.</p>;
  }

  return (
    <div className="movie-list">
      <ul className="movie-list__ul">
        {Object.values(movies).map(movie => (
          <li
            key={movie.id}
            className="movie-list-item"
            onClick={() => onMovieClick(movie.id)}
          >
            <img
              src={movie.image || 'https://via.placeholder.com/100x150'}
              alt={`${movie.title} Poster`}
              className="movie-image"
            />
            <div className="movie-text">
              <h3>{movie.title}</h3>
              <p>Year: {movie.year}</p>
              <p>Director: {movie.director}</p>
              <p>Rating: {movie.rating}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;