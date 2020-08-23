import { combineReducers } from 'redux';

import { getMovieListReducer, getMovieReducer } from './movie.reducers';

const rootReducer = combineReducers({
    movieList: getMovieListReducer,
    movie: getMovieReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
