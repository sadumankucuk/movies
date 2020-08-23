import { Dispatch } from 'redux';
import axios from 'axios';

const apikey = "9194f94e";

export enum EReduxActionTypes {
    FETCHING_MOVIE_LIST = 'FETCHING_MOVIE_LIST',
    FETCH_MOVIE_LIST_SUCCESS = 'FETCH_MOVIE_LIST_SUCCESS',
    FETCH_MOVIE_LIST_FAIL = 'FETCH_MOVIE_LIST_FAIL',

    FETCHING_MOVIE = 'FETCHING_MOVIE',
    FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS',
    FETCH_MOVIE_FAIL = 'FETCH_MOVIE_FAIL',

    SEARCH = 'SEARCH',
    PAGINITION_SUCCESS = 'PAGINITION_SUCCESS'
}

export const getMovieList = (page: number, movieName: string) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: EReduxActionTypes.FETCHING_MOVIE_LIST });
        axios
            .get('https://www.omdbapi.com', {
                params: {
                    apikey: apikey,
                    s: movieName,
                    type: "movie",
                    page: page
                }
            })
            .then(response => {
                const formattedMovieData = formatData(response.data);
                dispatch({
                    type: EReduxActionTypes.FETCH_MOVIE_LIST_SUCCESS,
                    payload: formattedMovieData
                });
            })
            .catch(error =>
                dispatch({ type: EReduxActionTypes.FETCH_MOVIE_LIST_FAIL, payload: error })
            );
    };
};

interface IResults {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

interface IData {
    Search: Array<IResults>;
    totalResults: string;
    Response: string;
}

const formatData = (response: IData) => {
    const movies = {
        data: response.Search.sort((a: IResults, b: IResults) => a.Year > b.Year ? 1 : -1),
        totalResults: response.totalResults
    }
    return (movies);
};

export const getMovie = (imdbID: any) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: EReduxActionTypes.FETCHING_MOVIE });
        axios
            .get('https://www.omdbapi.com', {
                params: {
                    i: imdbID,
                    apikey: apikey
                }
            })
            .then(response => {
                dispatch({
                    type: EReduxActionTypes.FETCH_MOVIE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error =>
                dispatch({ type: EReduxActionTypes.FETCH_MOVIE_FAIL, payload: error })
            );
    };
};