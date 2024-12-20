# Movie Library Project

## Overview

The **Movie Library Project** is a web application that allows users to browse a collection of movies, view detailed information about each movie, and interact with features like commenting, adding movies to favorites, and viewing user profiles. This project is built with React for the frontend and Express for the backend, with persistent data handling for users, sessions, and movie details.

---

## Features

- **User Authentication**:
  - Login and logout functionality using sessions and cookies.
  - Validates usernames with specific rules.

- **Movie Management**:
  - View a list of available movies.
  - Fetch and display detailed movie information.
  - Add new movies (authenticated users only).
  - Delete existing movies (authenticated users only).

- **Comments**:
  - Add and view comments for individual movies.
  - Fetch comments periodically for real-time updates.

- **Favorites**:
  - Mark movies as favorites and view them in a dedicated favorites section.
  - Remove movies from favorites.

- **User Profiles**:
  - View self AND other users' profiles and their favorite movies.
  - Seamless navigation between profiles and the main app.

---


## Project Structure

### Frontend

- **Components**:
  - `Header`, `Footer`: Reusable layout components.
  - `MovieList`, `MovieItem`: Display lists and details of movies.
  - `CommentSection`: Handles movie-specific comments.
  - `Controls`, `LoginForm`: Support login/logout and refresh actions.

- **Pages**:
  - `HomePage`: Displays the movie library and navigation options.
  - `MovieDetailPage`: Shows detailed information about a selected movie.
  - `ProfilePage`, `UserProfilePage`: Show user profiles and favorites.

- **Services**:
  - API interaction functions, e.g., `fetchMovies`, `fetchLogin`, `fetchComments`, `fetchFavourite`.

- **Reducers**:
  - State management using `useReducer`.

### Backend

#### Modules
- **`movies.js`**: Handles movie data.
- **`sessions.js`**: Manages user sessions and authentication.
- **`users.js`**: Stores user-specific data like favorites.

#### API Endpoints

##### Movies
- **GET** `/api/v1/movies`: Fetch all movies.
- **GET** `/api/v1/movies/:id`: Fetch details for a specific movie.
- **POST** `/api/v1/movies`: Add a new movie (authenticated).
- **DELETE** `/api/v1/movies/:id`: Delete a movie (authenticated).

##### Comments
- **GET** `/api/v1/movies/:id/comments`: Fetch comments for a specific movie.
- **POST** `/api/v1/movies/:id/comments`: Add a comment to a movie (authenticated).

##### Favorites
- **GET** `/api/v1/favorites`: Fetch the authenticated user’s favorites.
- **POST** `/api/v1/favorites/:movieId`: Add a movie to favorites (authenticated).
- **DELETE** `/api/v1/favorites/:movieId`: Remove a movie from favorites (authenticated).

##### User Profiles
- **GET** `/api/v1/users/:username`: Fetch a user’s profile and favorites.

##### Sessions
- **GET** `/api/v1/session`: Fetch the current session (if any).
- **POST** `/api/v1/session`: Login as a user.
- **DELETE** `/api/v1/session`: Logout the current user.

#### Data Handling
- Stores data in memory for simplicity.

---

## License

The following movie posters were used under a free-to-use license:

| Movie ID | Poster Preview | Description |
|----------|----------------|-------------|
| id1.jpg  | ![Poster](https://unsplash.com/photos/keep-your-teeth-clean-wpa-poster-7QytS-1kuIA) | Keep Your Teeth Clean - WPA Poster |
| id2.jpg  | ![Poster](https://unsplash.com/photos/photography-exhibition-photographs-by-the-wpa-poster-gIawC7CDcSg) | Photography Exhibition - WPA Poster |
| id3.jpg  | ![Poster](https://unsplash.com/photos/swim-for-health-in-safe-and-pure-pools-wpa-poster-lonORIx6Z3o) | Swim for Health - WPA Poster |
| id4.jpg  | ![Poster](https://unsplash.com/photos/washington-dc-braniff-international-airways-tqpsi_BPfCI) | Washington DC - Braniff International Airways |
| id5.jpg  | ![Poster](https://unsplash.com/photos/let-them-grow-wpa-poster-UIj6zCF5nnE) | Let Them Grow - WPA Poster |
| id6.jpg  | ![Poster](https://unsplash.com/photos/fire-wrecks-a-forest-wpa-poster-vyVM_mfK8Dg) | Fire Wrecks a Forest - WPA Poster |
| id7.jpg  | ![Poster](https://unsplash.com/photos/from-maine-to-florida-cartoon-illustration-by-gordon-ross-and-published-for-puck-magazine-1911-W8mDaOq-Cyo) | From Maine to Florida - Cartoon Illustration |
| id8.jpg  | ![Poster](https://unsplash.com/photos/woman-in-orange-dress-illustration--xleXxEcvX8) | Woman in Orange Dress - Illustration |
| id9.jpg  | ![Poster](https://unsplash.com/photos/man-in-black-suit-holding-rifle-illustration-V1IjTXINee0) | Man in Black Suit Holding Rifle - Illustration |

All rights to these images are retained by their original creators as listed on Unsplash.