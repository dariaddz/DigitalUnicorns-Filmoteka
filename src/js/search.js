import moviesTemplate from '../templates/movies-list.hbs';
import { paginationOnSearch } from './pagination';
import { Notify } from 'notiflix';
import { genres } from './genres';
import axios from 'axios';

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

const moviesList = document.querySelector('.movies-list');
const searchForm = document.querySelector('.search__form');
const paginationContainer = document.querySelector('.tui-pagination');
const paginationContainerOnSearch = document.querySelector('.tui-pagination.search');

// Пагинация найденных фильмов
paginationOnSearch.on('afterMove', function (eventData) {
  page = eventData.page;
  getMoviesbySearchQuery().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    markUpMoviesList(data);
    smoothScroll();
  });
});

function clearMoviesList() {
  moviesList.innerHTML = '';
}

function hidePaginationContainer() {
  paginationContainer.classList.add('hidden');
}

function showPaginationContainerOnSearch() {
  paginationContainerOnSearch.classList.remove('hidden');
}

function hidePaginationContainerOnSearch() {
  paginationContainerOnSearch.classList.add('hidden');
}

function markUpMoviesList(data) {
  moviesList.innerHTML = moviesTemplate(data.results);
}

function smoothScroll() {
  setTimeout(() => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }, 2000);
}

export { clearMoviesList, hidePaginationContainerOnSearch, hidePaginationContainer };
