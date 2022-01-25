import { clearMoviesList } from './search';
import { Notify } from 'notiflix';
import refs from './refs';

import { hidePaginationContainerOnSearch, hidePaginationContainer } from './search';
import libraryMoviesTemplate from '../templates/library-movies-list.hbs';

let savedWatched = '';
let savedQueue = '';

// клик по кнопкам библиотеки
refs.watchedBtn.addEventListener('click', onWatchedBtnCLick);
refs.queueBtn.addEventListener('click', onQueueBtnCLick);

function onLibraryLoad() {
  clearMoviesList();
  hidePaginationContainer();
  hidePaginationContainerOnSearch();
}

function onWatchedBtnCLick() {
  refs.watchedBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');
  onLibraryLoad();
  onWatchedCheck();
}

function onQueueBtnCLick() {
  refs.queueBtn.classList.add('is-active');
  refs.watchedBtn.classList.remove('is-active');
  onLibraryLoad();
  onQueueCheck();
}

function onWatchedCheck() {
  savedWatched = JSON.parse(localStorage.getItem('watched'));
  console.log(typeof savedWatched);

  if (!savedWatched) {
    Notify.failure('Sorry, your list is empty');
    return;
  }
  watchedForMarkup();
}

function onQueueCheck() {
  savedQueue = JSON.parse(localStorage.getItem('queued'));
  if (!savedQueue) {
    Notify.failure('Sorry, your list is empty');
    return;
  }
  queuedForMarkup();
}

async function watchedForMarkup() {
  changeReleaseDate(savedWatched);
  refs.moviesList.innerHTML = libraryMoviesTemplate(savedWatched);
}

async function queuedForMarkup() {
  changeReleaseDate(savedQueue);
  refs.moviesList.innerHTML = libraryMoviesTemplate(savedQueue);
}

function changeReleaseDate(arrayForMarkup) {
  for (let result of arrayForMarkup) {
    if (result.release_date !== '' || result.genres.length >= 1) {
      let newGenre = result.genres.slice(0, 2);
      let newDate = result.release_date.slice(0, 4);
      Object.defineProperties(result, {
        release_date: {
          value: newDate,
          writable: true,
        },
        genres: {
          value: newGenre,
          writable: true,
        },
      });
    } else {
      Object.defineProperties(result, {
        release_date: {
          value: 'Unknown',
          writable: true,
        },
      });
    }
  }
}

export { onQueueBtnCLick, onWatchedBtnCLick };
