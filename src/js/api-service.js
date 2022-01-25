import { pagination } from './pagination';
import axios from 'axios';

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

const moviesList = document.querySelector('.movies-list');
const paginationContainerOnSearch = document.querySelector('.tui-pagination.search');

let page = 1;

export default class ApiService {
  async getTrendingMovies() {
    const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}`;
    try {
      const { data } = await axios.get(url);
      const { page, results, total_pages, total_results } = data;
      return { results, total_pages, page, total_results };
    } catch (error) {
      console.error(error);
    }
  }
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
