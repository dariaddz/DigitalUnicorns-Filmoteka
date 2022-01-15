import moviesTemplate from '../templates/movies-list.hbs';

const axios = require('axios');

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

const moviesList = document.querySelector('.movies-list');

getTrendingMovies().then(results => {
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
