import moviesTemplate from '../templates/movies-list.hbs';
import { genres } from './genres';
import ApiService from './api-service';
import { pagination } from './pagination';
import { paginationOnSearch } from './pagination';
import { Notify } from 'notiflix';

const moviesList = document.querySelector('.movies-list');
const searchForm = document.querySelector('.search__form');
const paginationContainer = document.querySelector('.tui-pagination');
const paginationContainerOnSearch = document.querySelector('.tui-pagination.search');

const apiService = new ApiService();

// Рендеринг трендовых фильмов на старте
renderTrendingMovies();
function renderTrendingMovies() {
  apiService.page = 1;
  hidePaginationContainerOnSearch();
  apiService.getTrendingMovies().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    moviesList.innerHTML = moviesTemplate(data.results);
    console.log('Рендеринг трендовых фильмов на старте:', data);
  });
}
// Рендеринг при пагинации трендовых фильмов
pagination.on('afterMove', function (event) {
  apiService.page = event.page;
  apiService.getTrendingMovies().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    moviesList.innerHTML = moviesTemplate(data.results);
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

function smoothScroll() {
  setTimeout(() => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }, 2000);
}

function changeReleaseDate(data) {
  for (let result of data.results) {
    if (result.release_date !== '') {
      let newDate = result.release_date.slice(0, 4);
      Object.defineProperties(result, {
        release_date: {
          value: newDate,
          writable: true,
        },
      });
    } else {
      Object.defineProperties(result, {
        release_date: {
          value: 'Unknown',
          writable: true,
        },
      });
    }
  }
}

function changeReleaseGenres(data) {
  for (let result of data.results) {
    const genresWord = [];

    result.genre_ids.forEach(element => {
      genres.find(({ id, name }) => {
        if (id === element) {
          genresWord.push(name);
        }
      });
    });

    if (genresWord.length > 2 || genresWord.length === 0) {
      const extraGenres = genresWord.length - 2;
      genresWord.splice(2, extraGenres, 'Other');
    }

    Object.defineProperties(result, {
      genre_ids: {
        value: genresWord,
        writable: true,
      },
    });
  }
}

function hidePaginationContainerOnSearch() {
  paginationContainerOnSearch.classList.add('hidden');
}

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

export {
  renderTrendingMovies,
  clearMoviesList,
  hidePaginationContainerOnSearch,
  hidePaginationContainer,
};
