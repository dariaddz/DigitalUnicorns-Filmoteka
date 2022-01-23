import getTrendingMovies from './api-service';
import markupMovies from './renderMarkUp';
import refs from './refs';
import pagination from './pagination';

const moviesList = new ApiMovieService();

function showPopular(url) {
  refs.main.classList.add('spinner-is-open');
  refs.spinner.classList.add('is-open');

  return moviesList.showResult(url).then(r => {
    

    setTimeout(() => {
      deleteSpinner();
      markupMovies(r);
      refs.paginatorElRef.classList.remove('invisible');
    }, 1000);

  });
}

async function paginationSet() {
  await showPopular(moviesList.trending);

  await pagination(
    moviesList.getPage(),
    moviesList.total_result,
    moviesList.trending,
  );
}

paginationSet();


export default function deleteSpinner() {
  refs.main.classList.remove('spinner-is-open');
  refs.spinner.classList.remove('is-open');
}