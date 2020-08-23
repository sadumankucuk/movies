import { EReduxActionTypes } from '../actions/movie.actions';

export interface IReduxMoviesState {
    loadingMovies: boolean;
    movies?: any;
    totalMovies: number;
    errorMovies: any;
}

const MoviesInitialState: IReduxMoviesState = {
    loadingMovies: false,
    movies: undefined,
    totalMovies: 0,
    errorMovies: false,
};

export interface IReduxMovieState {
    loadingMovie: boolean;
    movie?: any;
    errorMovie: any;
}

const MovieInitialState: IReduxMovieState = {
    loadingMovie: false,
    movie: undefined,
    errorMovie: false,
};

const getMovieListReducer = (
    state: IReduxMoviesState = MoviesInitialState,
    action: any
) => {
    switch (action.type) {
        case EReduxActionTypes.FETCHING_MOVIE_LIST:
            return {
                ...state,
                loadingMovies: true,
            };
        case EReduxActionTypes.FETCH_MOVIE_LIST_SUCCESS:
            return {
                ...state,
                loadingMovies: false,
                movies: action.payload.data,
                totalMovies: action.payload.totalResults,
                errorMovies: false,
            };
        case EReduxActionTypes.FETCH_MOVIE_LIST_FAIL:
            return {
                ...state,
                loadingMovies: false,
                errorMovies: action.payload,
            };
        default:
            return state;
    }
};

const getMovieReducer = (
    state: IReduxMovieState = MovieInitialState,
    action: any
) => {
    switch (action.type) {
        case EReduxActionTypes.FETCHING_MOVIE:
            return {
                ...state,
                loadingMovie: true,
            };
        case EReduxActionTypes.FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                loadingMovie: false,
                movie: action.payload,
                errorMovie: false,
            };
        case EReduxActionTypes.FETCH_MOVIE_FAIL:
            return {
                ...state,
                loadingMovie: false,
                errorMovie: action.payload,
            };
        default:
            return state;
    }
};
export { getMovieListReducer, getMovieReducer };
