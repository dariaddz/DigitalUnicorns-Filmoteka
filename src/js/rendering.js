import moviesTemplate from '../templates/movies-list.hbs';
import refs from './refs';
import ApiService from './api-service';
import { changeReleaseGenres, changeReleaseDate } from './changingData';
import { smoothScroll } from './smoothScroll';
import { pagination } from './pagination';
import { paginationOnSearch } from './pagination';
import { Notify } from 'notiflix';

const searchForm = document.querySelector('.search__form');

const apiService = new ApiService();

// Рендеринг трендовых фильмов на старте
renderTrendingMovies();
export function renderTrendingMovies() {
  apiService.page = 1;
  hidePaginationContainerOnSearch();
  apiService.getTrendingMovies().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    markUpMoviesList(data);
    console.log('Рендеринг трендовых фильмов на старте:', data);
  });
}
// Рендеринг при пагинации трендовых фильмов
pagination.on('afterMove', function (event) {
  apiService.page = event.page;
  apiService.getTrendingMovies().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    markUpMoviesList(data);
    smoothScroll();
    console.log('Рендеринг трендовых фильмов при пагинации:', data);
  });
});
// Рендеринг при поиске фильмов по ключевому слову
searchForm.addEventListener('submit', renderMoviesbySearchQuery);

function renderMoviesbySearchQuery(event) {
  apiService.page = 1;
  event.preventDefault();
  apiService.searchQuery = event.currentTarget.search.value.trim();
  hidePaginationContainer();

  if (apiService.searchQuery === '') {
    hidePaginationContainerOnSearch();
    clearMoviesList();
    return Notify.failure(
      'Sorry, there are no movies matching your search query. Please try again',
    );
  }
  apiService
    .getMoviesbySearchQuery()
    .then(data => {
      if (data.total_results === 0) {
        hidePaginationContainerOnSearch();
        clearMoviesList();
        return Notify.failure(
          'Sorry, there are no movies matching your search query. Please try again',
        );
      }
      changeReleaseGenres(data);
      changeReleaseDate(data);
      clearMoviesList();
      markUpMoviesList(data);
      showPaginationContainerOnSearch();
      console.log('Рендеринг при поиске фильмов по ключевому слову:', data);
      return Notify.success(`Hooray! We found ${data.total_results} movies`);
    })
    .finally(() => {
      searchForm.reset();
      paginationOnSearch.reset();
    });
}
// Рендеринг при пагинации найденных по ключевому слову фильмов
paginationOnSearch.on('afterMove', function (eventData) {
  apiService.page = eventData.page;
  apiService.getMoviesbySearchQuery().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    markUpMoviesList(data);
    smoothScroll();
    console.log('Рендеринг найденных фильмов при пагинации:', data);
  });
});

export function markUpMoviesList(data) {
  refs.moviesList.innerHTML = moviesTemplate(data.results);
}

export function clearMoviesList() {
  refs.moviesList.innerHTML = '';
}

export function showPaginationContainerOnSearch() {
  refs.paginationContainerOnSearch.classList.remove('hidden');
}

export function hidePaginationContainerOnSearch() {
  refs.paginationContainerOnSearch.classList.add('hidden');
}

export function hidePaginationContainer() {
  refs.paginationContainer.classList.add('hidden');
}
