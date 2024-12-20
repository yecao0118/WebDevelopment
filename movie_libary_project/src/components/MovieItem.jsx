import './MovieItem.css';

function MovieItem({ movie }) {
  if (!movie) {
    return <p>No movie details available.</p>;
  }

  return (
    <div className="movie-item">
      <h2>{movie.title}</h2>
      <img
        src={movie.image || 'https://via.placeholder.com/100x150'}
        alt={`${movie.title} Poster`}
        className="movie-image"
      />
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Writer:</strong> {movie.writer}</p>
      <p><strong>Storyline:</strong> {movie.storyline}</p>
    </div>
  );
}

export default MovieItem;