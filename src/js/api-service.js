import filmsTemplate from '../templates/films-list.hbs';

const axios = require('axios');

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

const filmsList = document.querySelector('.films-list');

getFilms().then(data => renderFilmsList(data));

async function getFilms() {
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

function renderFilmsList(data) {
  filmsList.insertAdjacentHTML('beforeend', filmsTemplate(data));
}
