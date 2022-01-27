import moviesTemplate from '../templates/movies-list.hbs';
import refs from './refs';
import ApiService from './api-service';
import { changeReleaseGenres, changeReleaseDate } from './changingData';
import { smoothScroll } from './smoothScroll';
import { pagination, paginationStart } from './pagination';
import { Notify } from 'notiflix';

refs.searchForm.addEventListener('submit', renderMoviesbySearchQuery);

const apiService = new ApiService();

// Рендеринг трендовых фильмов на старте
renderTrendingMovies();

export function renderTrendingMovies() {
  apiService.page = 1;
  apiService.getTrendingMovies().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    markUpMoviesList(data);
    // console.log('Рендеринг трендовых фильмов на старте:', data);
    paginationStart(data);

    // Рендеринг при пагинации трендовых фильмов
    pagination.on('afterMove', function (eventData) {
      apiService.page = eventData.page;
      apiService.getTrendingMovies().then(data => {
        changeReleaseGenres(data);
        changeReleaseDate(data);
        markUpMoviesList(data);
        smoothScroll();
        // console.log('Рендеринг трендовых фильмов при пагинации:', data);
      });
    });
  });
}

// Рендеринг при поиске фильмов по ключевому слову
function renderMoviesbySearchQuery(event) {
  apiService.page = 1;
  event.preventDefault();
  apiService.searchQuery = event.currentTarget.search.value.trim();

  if (apiService.searchQuery === '') {
    clearMoviesList();
    hidePaginationContainer();
    return Notify.failure(
      'Sorry, there are no movies matching your search query. Please try again',
    );
  }
  apiService
    .getMoviesbySearchQuery()
    .then(data => {
      if (data.total_results === 0) {
        clearMoviesList();
        hidePaginationContainer();
        return Notify.failure(
          'Sorry, there are no movies matching your search query. Please try again',
        );
      }
      showPaginationContainer();
      changeReleaseGenres(data);
      changeReleaseDate(data);
      clearMoviesList();
      markUpMoviesList(data);
      paginationStart(data);

      // Рендеринг при пагинации найденных по ключевому слову фильмов
      pagination.on('afterMove', function (eventData) {
        apiService.page = eventData.page;
        apiService.getMoviesbySearchQuery().then(data => {
          changeReleaseGenres(data);
          changeReleaseDate(data);
          markUpMoviesList(data);
          smoothScroll();
          // console.log('Рендеринг найденных фильмов при пагинации:', data);
        });
      });
      // console.log('Рендеринг при поиске фильмов по ключевому слову:', data);
      return Notify.success(`Hooray! We found ${data.total_results} movies`);
    })
    .finally(() => {
      refs.searchForm.reset();
    });
}

export function markUpMoviesList(data) {
  refs.moviesList.innerHTML = moviesTemplate(data.results);
}

export function clearMoviesList() {
  refs.moviesList.innerHTML = '';
}

export function hidePaginationContainer() {
  refs.paginationContainer.classList.add('hidden');
}

export function showPaginationContainer() {
  refs.paginationContainer.classList.remove('hidden');
}
