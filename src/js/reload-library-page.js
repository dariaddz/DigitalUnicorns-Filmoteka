import filmCardsTpl from '../templates/film-template.hbs';
import moviesFromStorage from './get-movies-from-storage';
const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
import axios from 'axios';

const refs = {
    libraryPageContainer: document.querySelector('.library-filter'),
    headerQueueBtn: document.querySelector('.queue-link'),
    libraryFilmCards: document.querySelector('.movies-list'), 
};
async function MovieById(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}${id}?api_key=${API_KEY}`);
    
    return data;
  } catch (error) {
    console.log(error);
  }
}
MovieById().then(list => {
    JSON.parse(localStorage.getItem(list))
  }).then(data =>{console.log(data)})

  const { getMoviesFromQueueStorage, getMoviesFromWatchedStorage } = moviesFromStorage;


  export default function () {
    if (refs.libraryPageContainer.classList.contains('is-hidden')) {
      return
    }
    if (refs.headerQueueBtn.classList.contains('library-filter')) {
      const films = getMoviesFromQueueStorage();
      filmCardsTpl(refs.libraryFilmCards, films);
      
      if (films.length === 0) {onEmptyLibrary()}
      return
    }
    const films = getMoviesFromWatchedStorage();
    filmCardsTpl(refs.libraryFilmCards, films);
    if (films.length === 0) {onEmptyLibrary()}
  }

  function onEmptyLibrary() {
      //пустая библиотека
    const markupLibrary = `<h2>Please return to the main page and add a movie...</h2>`;
    //отрисованая из локал сторедж
    refs.libraryFilmCards.innerHTML = markupLibrary;
    refs.libraryFilmCards.classList.add('library-filter');
  }
