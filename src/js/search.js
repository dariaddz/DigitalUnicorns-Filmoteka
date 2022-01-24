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

let page = 1;

searchForm.addEventListener('submit', onSearch);

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

// const genres = [
//   { id: 28, name: 'Action' },
//   { id: 12, name: 'Adventure' },
//   { id: 16, name: 'Animation' },
//   { id: 35, name: 'Comedy' },
//   { id: 80, name: 'Crime' },
//   { id: 99, name: 'Documentary' },
//   { id: 18, name: 'Drama' },
//   { id: 10751, name: 'Family' },
//   { id: 14, name: 'Fantasy' },
//   { id: 36, name: 'History' },
//   { id: 27, name: 'Horror' },
//   { id: 10402, name: 'Music' },
//   { id: 9648, name: 'Mystery' },
//   { id: 10749, name: 'Romance' },
//   { id: 878, name: 'Science Fiction' },
//   { id: 10770, name: 'TV Movie' },
//   { id: 53, name: 'Thriller' },
//   { id: 10752, name: 'War' },
//   { id: 37, name: 'Western' },
// ];

let searchQuery = '';

function onSearch(event) {
  page = 1;
  event.preventDefault();
  searchQuery = event.currentTarget.search.value.trim();
  hidePaginationContainer();

  if (searchQuery === '') {
    hidePaginationContainerOnSearch();
    clearMoviesList();
    return Notify.failure(
      'Sorry, there are no movies matching your search query. Please try again',
    );
  }
  getMoviesbySearchQuery()
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
      return Notify.success(`Hooray! We found ${data.total_results} movies`);
    })
    .finally(() => {
      searchForm.reset();
      paginationOnSearch.reset();
    });
}
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

async function getMoviesbySearchQuery() {
  const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US&include_adult=false`;
  try {
    const { data } = await axios.get(url);
    const { page, results, total_pages, total_results } = data;
    console.log(data);
    return { results, total_pages, page, total_results };
  } catch (error) {
    console.error(error);
  }
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

function smoothScroll() {
  setTimeout(() => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  }, 2000);
}

export { clearMoviesList, hidePaginationContainerOnSearch, hidePaginationContainer };
