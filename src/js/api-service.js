import axios from 'axios';

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async getTrendingMovies() {
    const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${this.page}`;
    try {
      const { data } = await axios.get(url);
      const { page, results, total_pages, total_results } = data;
      return { results, total_pages, page, total_results };
    } catch (error) {
      console.error(error);
    }
  }
  async getMoviesbySearchQuery() {
    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}&language=en-US&include_adult=false`;
    try {
      const { data } = await axios.get(url);
      const { page, results, total_pages, total_results } = data;
      return { results, total_pages, page, total_results };
    } catch (error) {
      console.error(error);
    }
  }
}
