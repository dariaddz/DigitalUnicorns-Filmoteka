import moviesTemplate from '../templates/movies-list.hbs';

const axios = require('axios');

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

const moviesList = document.querySelector('.movies-list');

getTrendingMovies().then(data => renderTrendingMovies(data));

async function getTrendingMovies() {
  const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    const data = response.data.results;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderTrendingMovies(data) {
  moviesList.insertAdjacentHTML('beforeend', moviesTemplate(data));
}
