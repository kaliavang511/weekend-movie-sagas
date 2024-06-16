import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {
  return(
  <div className="App">
  <header className="header">
  <h1>The Movies Saga!</h1>
  </header>
  <Router>        
    <Route path="/" exact>
      <MovieList />
    </Route>
    
    {/* Details page */}
    <Route path="/details/:id" exact>
      <MovieDetails />
    </Route>

    {/* Add Movie page */}
  </Router>
</div>
);
  
}

export default App;
