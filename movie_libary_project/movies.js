import { randomUUID as uuid } from 'crypto';


function makeMovieList() {
  const id1 = uuid();
  const id2 = uuid();
  const id3 = uuid();
  const id4 = uuid();
  const id5 = uuid();
  const id6 = uuid();
  const id7 = uuid();
  const id8 = uuid();
  const id9 = uuid();
  

  const movieList = {};
  const movies = {
    [id1]: {
      id: id1,
      title: 'Pulp Fiction',
      image: '/images/id1.jpg',
      year: 1995,
      genre: 'Dark Comedy Crime',
      rating: 8.9,
      director: 'Quentin Tarantino',
      writer: 'Quentin Tarantino, Roger Avary',
      storyline: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.',
    },
    [id2]: {
      id: id2,
      title: 'Inception',
      image: '/images/id2.jpg',
      year: 2010,
      genre: 'Sci-Fi',
      rating: 8.8,
      director: 'Christopher Nolan',
      writer: 'Christopher Nolan',
      storyline: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb\'s rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible, inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea but to plant one. If they succeed, it could be the perfect crime.',
    },
    [id3]: {
      id: id3,
      title: 'The Dark Knight',
      image: '/images/id3.jpg',
      year: 2008,
      genre: 'Action, Crime, Drama',
      rating: 9.0,
      director: 'Christopher Nolan',
      writer: 'Jonathan Nolan, Christopher Nolan',
      storyline: 'With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague Gotham. However, their alliance is tested when a cunning criminal mastermind known as the Joker emerges, throwing the city into chaos and forcing the Dark Knight ever closer to crossing the line between hero and vigilante.',
    },
    
    [id4]: {
      id: id4,
      title: 'The Shawshank Redemption',
      image: '/images/id4.jpg',
      year: 1994,
      genre: 'Drama',
      rating: 9.3,
      director: 'Frank Darabont',
      writer: 'Stephen King (novella), Frank Darabont (screenplay)',
      storyline: 'Andy Dufresne, a successful banker, is wrongfully convicted and sentenced to life in Shawshank State Penitentiary. There, he befriends Red, a longtime inmate who understands the ins and outs of prison life. Over the years, Andy maintains hope and dignity, quietly engineering a plan that could set him free and restore his faith in humanity.',
    },
    
    [id5]: {
      id: id5,
      title: 'The Matrix',
      image: '/images/id5.jpg',
      year: 1999,
      genre: 'Sci-Fi, Action',
      rating: 8.7,
      director: 'Lana Wachowski, Lilly Wachowski',
      writer: 'Lana Wachowski, Lilly Wachowski',
      storyline: 'Computer hacker Neo is awakened to the shocking truth that the world he knows is a complex simulation created by sentient machines. Guided by the mysterious Morpheus and the skilled Trinity, Neo must embrace his role as "The One," mastering new abilities and battling formidable agents to free humanity from its digital prison.',
    },
    
    [id6]: {
      id: id6,
      title: 'Fight Club',
      image: '/images/id6.jpg',
      year: 1999,
      genre: 'Drama',
      rating: 8.8,
      director: 'David Fincher',
      writer: 'Chuck Palahniuk (novel), Jim Uhls (screenplay)',
      storyline: 'An unnamed insomniac office worker is numbed by his hollow consumerist existence. His life changes drastically after he meets Tyler Durden, a charismatic soap maker with radical philosophies. Together, they form an underground fight club that evolves into something far more sinister, challenging the foundations of social norms and identity.',
    },
    
    [id7]: {
      id: id7,
      title: 'Forrest Gump',
      image: '/images/id7.jpg',
      year: 1994,
      genre: 'Comedy, Drama, Romance',
      rating: 8.8,
      director: 'Robert Zemeckis',
      writer: 'Winston Groom (novel), Eric Roth (screenplay)',
      storyline: 'Born with a low IQ, Forrest Gump leads a life full of extraordinary events. From inspiring Elvis to meeting presidents, from fighting in Vietnam to starting a successful business, Forrest drifts through American history with unwavering kindness. Despite the twists of fate, his one constant wish remains: to be reunited with his childhood sweetheart, Jenny.',
    },
    
    [id8]: {
      id: id8,
      title: 'The Godfather',
      image: '/images/id8.jpg',
      year: 1972,
      genre: 'Crime, Drama',
      rating: 9.2,
      director: 'Francis Ford Coppola',
      writer: 'Mario Puzo (novel), Francis Ford Coppola (screenplay)',
      storyline: 'Don Vito Corleone, the aging patriarch of an Italian-American crime family, struggles to pass on his legacy to his reluctant son, Michael. As rival factions rise and the family’s enemies multiply, Michael is drawn deeper into a world of loyalty, betrayal, and violence, ultimately becoming the protector of his family’s empire.',
    },
    
    [id9]: {
      id: id9,
      title: 'Interstellar',
      image: '/images/id9.jpg',
      year: 2014,
      genre: 'Sci-Fi, Adventure, Drama',
      rating: 8.6,
      director: 'Christopher Nolan',
      writer: 'Jonathan Nolan, Christopher Nolan',
      storyline: 'As Earth’s resources dwindle and humanity faces extinction, a former pilot-turned-farmer, Cooper, joins a daring mission through a newly discovered wormhole in search of habitable worlds. The small crew navigates treacherous cosmic landscapes and shifting dimensions of time, while Cooper’s love for his daughter drives him to make impossible sacrifices to save humankind.',
    },
  };

  movieList.contains = function contains(id) {
    return !!movies[id];
  };

  movieList.getMovies = function getMovies() {
    return movies;
  };

  movieList.addMovie = function addMovie(movieData) {
    const id = uuid();
    movies[id] = { id, ...movieData };
    return id;
  };

  movieList.getMovie = function getMovie(id) {
    return movies[id];
  };

  movieList.updateMovie = function updateMovie(id, movieUpdates) {
    movies[id] = { ...movies[id], ...movieUpdates };
  };

  movieList.deleteMovie = function deleteMovie(id) {
    delete movies[id];
  };

  return movieList;
}

export default {
  makeMovieList,
};