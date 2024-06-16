import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom';


function MovieList() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);
  const history = useHistory()


  const handleDescription = (movieId) => {
    history.push(`/details/${movieId}`)
    
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id} onClick={() => handleDescription(movie.id)}>
          <img src={movie.poster} alt={movie.title} data-testid="toDetails" />
        < p>{movie.title}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
