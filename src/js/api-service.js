import moviesTemplate from '../templates/movies-list.hbs';
import { pagination } from './pagination';
import { genres } from './genres';
import axios from 'axios';

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

const moviesList = document.querySelector('.movies-list');
const paginationContainerOnSearch = document.querySelector('.tui-pagination.search');

let page = 1;

async function getTrendingMovies() {
  const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}`;
  try {
    const { data } = await axios.get(url);
    const { page, results, total_pages, total_results } = data;
    console.log(data);
    return { results, total_pages, page, total_results };
  } catch (error) {
    console.error(error);
  }
}

renderTrendingMovies();

function renderTrendingMovies() {
  page = 1;
  hidePaginationContainerOnSearch();
  // Рендеринг на старте
  getTrendingMovies().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    moviesList.innerHTML = moviesTemplate(data.results);
  });
}
// Рендеринг при пагинации
pagination.on('afterMove', function (event) {
  page = event.page;
  getTrendingMovies().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    moviesList.innerHTML = moviesTemplate(data.results);
    smoothScroll();
  });
});

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

export { renderTrendingMovies };
