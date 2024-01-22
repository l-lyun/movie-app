import { Store} from '../core/heropy.js'

const store = new Store({
    searchText: '',
    page: 1,
    pageMax: 1,
    movies: [],
    movie: {},
    loading: false,
    message: 'Search for the movie title!'
}) 

export default store
export const searchMovies = async page => {
    store.state.loading = true;
    store.state.page = page;
    if (page === 1) {
        store.state.movies = [];
        store.state.message = ''
    }
    try {
        const res = await fetch('/api/movie', {
            method: 'POST',
            body: JSON.stringify({
                    title: store.state.searchText,
                 page
                })
       })
        const {Search, totalResults, Response, Error} = await res.json()
        if (Response === 'True') {
            store.state.movies = [
                ...store.state.movies,
                ...Search
            ]  
            store.state.pageMax = Math.ceil(Number(totalResults) / 10);
        } else {
            store.state.message = Error;
            store.state.pageMax = 1;
        }
    } catch (error) {
        console.log('serachMovies error: ', error);
    } finally {
        store.state.loading = false;
    }
}   
export const getMovieDetails = async id => {
    try {
    //    const res = await fetch(`https://www.omdbapi.com?apikey=7035c60c&i=${id}&plot=full`)
        const res = await fetch('api/movie', {
            method: 'POSt',
            body: JSON.stringify({
                id
            })
        })
        store.state.movie = await res.json();
    } catch (error) {
        console.log('getMovieDetails error:', error)
    }
}