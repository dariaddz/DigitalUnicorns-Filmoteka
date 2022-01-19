const search__button = document.querySelector('.search__button');
const search__input = document.querySelector('.search__input');

search__button.addEventListener('click', onSearch);

search__input.addEventListener('input', event => {
  searchQuery = event.currentTarget.value;
});

let searchQuery = '';

function onSearch(event) {
  event.preventDefault();

  getMoviesbySearchQuery().then(data => {
    changeReleaseGenres(data);
    changeReleaseDate(data);
    moviesList.innerHTML = '';
    moviesList.innerHTML = moviesTemplate(data.results);
  });
}

async function getMoviesbySearchQuery() {
  const url = `${BASE_URL}search/movie?api_key=${API_KEY}&page=${page}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
  try {
    const { data } = await axios.get(url);
    const { page, results, total_pages, total_results } = data;
    console.log(data);
    return { results, total_pages, page, total_results };
  } catch (error) {
    console.error(error);
  }
}
