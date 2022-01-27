import axios from 'axios';
import { showSpinner, hideSpinner } from './spinner';

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';
const ID_URL = 'https://api.themoviedb.org/3/movie/';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async getTrendingMovies() {
    const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${this.page}`;
    try {
      await showSpinner();
      const { data } = await axios.get(url);
      const { page, results, total_pages, total_results } = data;
      await hideSpinner();
      return { results, total_pages, page, total_results };
    } catch (error) {
      console.error(error);
    }
  }
  async getMoviesbySearchQuery() {
    const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}&language=en-US&include_adult=false`;
    try {
      await showSpinner();
      const { data } = await axios.get(url);
      const { page, results, total_pages, total_results } = data;
      await hideSpinner();
      return { results, total_pages, page, total_results };
    } catch (error) {
      console.error(error);
    }
  }
  async getMovieById(id) {
    try {
      await showSpinner();
      const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
      await hideSpinner();
      return data;
    } catch (error) {
      console.error('Smth wrong with api ID fetch' + error);
    }
  }
}
