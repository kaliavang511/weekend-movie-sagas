import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function MovieDetails() {

  const dispatch = useDispatch();
  const genres = useSelector(store => store.genres);
  const history = useHistory()

  const handleClick= () => {
    history.push(`/`);
  }
  useEffect(() => {
    dispatch({type:'FETCH_MOVIES'})
  }, []);
  return (
    <main>
        <p> movie details</p>
         <div data-testid="movieDetails"></div>
        {genres.map(genres => {
          return (
            <div key={genres.id} >
          <img src={genres.poster}/>
           <p>{genres.title}</p>
        < p>{genres.description}</p>
            </div>
          );
        })}
             <button data-testid="toList" onClick={handleClick}>Back</button>
    </main>
  );
}

export default MovieDetails;
