import moviesTemplate from '../templates/movies-list.hbs';
import { genres } from './genres';
import ApiService from './api-service';

const moviesList = document.querySelector('.movies-list');
const paginationContainerOnSearch = document.querySelector('.tui-pagination.search');

const apiService = new ApiService();

let page = 1;

renderTrendingMovies();

function renderTrendingMovies() {
  page = 1;
  hidePaginationContainerOnSearch();
  // Рендеринг на старте
  apiService.getTrendingMovies().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    moviesList.innerHTML = moviesTemplate(data.results);
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

export { renderTrendingMovies };
