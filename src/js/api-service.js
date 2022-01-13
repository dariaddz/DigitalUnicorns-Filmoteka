const axios = require('axios');

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

getFilms();

async function getFilms() {
  const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
