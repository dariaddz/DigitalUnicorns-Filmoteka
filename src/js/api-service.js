import axios from 'axios';

const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';

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
