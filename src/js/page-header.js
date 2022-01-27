import refs from './refs';
import { renderTrendingMovies } from './rendering';
import { onQueueBtnCLick, onWatchedBtnCLick } from './library';

refs.logoRef.addEventListener('click', toHome);
refs.homeRef.addEventListener('click', toHome);
refs.libraryRef.addEventListener('click', toLibrary);

function toHome(e) {
  e.preventDefault();

  const lib = refs.headerRef.classList.contains('page-my-library');
  const det = refs.headerRef.classList.contains('page-details');

  if (lib) {
    refs.headerRef.classList.remove('page-my-library');
    refs.libraryRef.classList.remove('current');
  }
  if (det) {
    refs.headerRef.classList.remove('page-details');
  }
  refs.homeRef.classList.add('current');
  libraryBtnsHide();
  searchFormShow();
  renderTrendingMovies();
  refs.paginationContainer.classList.remove('hidden');
}

function toLibrary(e) {
  e.preventDefault();

  const det = refs.headerRef.classList.contains('page-details');
  if (det) {
    refs.headerRef.classList.remove('page-details');
  }

  refs.homeRef.classList.remove('current');
  refs.headerRef.classList.add('page-my-library');
  refs.libraryRef.classList.add('current');

  libraryBtnsShow();
  searchFormHide();

  if (!localStorage.getItem('queued') || JSON.parse(localStorage.getItem('queued')).length !== 0) {
    onQueueBtnCLick();
    return;
  }

  onWatchedBtnCLick();
}

// прячем/показываем  кнопки watched/queue

function libraryBtnsHide() {
  refs.libraryBtns.forEach(btn => btn.classList.add('is-hidden'));
}

function libraryBtnsShow() {
  refs.libraryBtns.forEach(btn => btn.classList.remove('is-hidden'));
}

// прячем/показываем  форму поиска
function searchFormHide() {
  refs.searchFormDiv.classList.add('is-hidden');
}

function searchFormShow() {
  refs.searchFormDiv.classList.remove('is-hidden');
}
