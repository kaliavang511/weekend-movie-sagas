import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './MovieDetail.css';




function MovieDetails() {
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        
      }, []);

  
  
    const handleClick = () => {
        history.push('/')
    }
  
    return(
        <main>
            <h1>Movie Details</h1>

            <div data-testid="movieDetails">
            {genres.map(movie => (
             <div key={movie.id}>
             <img src={movie.poster} />
            <p>{movie.title}</p>
            <p>Genres: {movie.genre_names}</p>
            <p>Details: {movie.description}</p>
            </div>
         ))}
        </div>
            <button data-testid="toList" className='backBtn' onClick={handleClick}>Back</button>
        </main>
    )
}

export default MovieDetails

