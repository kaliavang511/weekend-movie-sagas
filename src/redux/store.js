import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';


function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeLatest('FETCH_GENRES', fetchAllGenres)
}

function* fetchAllMovies() {
  try {
    const moviesResponse = yield axios.get('/api/movies');
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchAllGenres(action) {
  try {
    const genreResponse = yield axios.get(`/api/genres/${action.payload}`);
    yield put({
      type: 'SET_GENRES',
      payload: genreResponse.data
    });
  } catch (error) {
    console.log('fetchAllGenres', error);
  }
}


const sagaMiddleware = createSagaMiddleware();

const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}


const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
  }),

  applyMiddleware(sagaMiddleware, logger),
);


sagaMiddleware.run(rootSaga);

export default storeInstance;



