import moviesTemplate from '../templates/movies-list.hbs';

const axios = require('axios');

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

const moviesList = document.querySelector('.movies-list');

getTrendingMovies().then(results => {
  changeReleaseGenres(results);
  changeReleaseDate(results);
  renderTrendingMovies(results);
});

async function getTrendingMovies() {
  const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const results = response.data.results;
    console.log(results);
    return results;
  } catch (error) {
    console.error(error);
  }
}

function renderTrendingMovies(results) {
  moviesList.insertAdjacentHTML('beforeend', moviesTemplate(results));
}

function changeReleaseDate(results) {
  for (let result of results) {
    let newDate = result.release_date.slice(0, 4);

    Object.defineProperties(result, {
      release_date: {
        value: newDate,
        writable: true,
      },
    });
  }
}

function changeReleaseGenres(results) {
  for (let result of results) {
    const genresWord = [];

    result.genre_ids.forEach(element => {
      genres.find(({ id, name }) => {
        if (id === element) {
          genresWord.push(name);
        }
      });
    });

    if (genresWord.length > 2) {
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

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];
