import { clearMoviesList } from './search';
import { getMovieById } from './one-movie-modal';
import { Notify } from 'notiflix';
import refs from './refs';

import { hidePaginationContainerOnSearch, hidePaginationContainer } from './search';

import moviesTemplate from '../templates/movies-list.hbs';

let arrayForMarkup = [];

// клик по кнопкам библиотеки

refs.watchedBtn.addEventListener('click', onWatchedBtnCLick);

refs.queueBtn.addEventListener('click', onQueueBtnCLick);

function onWatchedBtnCLick() {
  refs.watchedBtn.classList.add('is-active');
  refs.queueBtn.classList.remove('is-active');
  clearMoviesList();
  hidePaginationContainer();
  hidePaginationContainerOnSearch();
  onWatchedCheck();
  // renderTrendingMovies();
}

function onQueueBtnCLick() {
  refs.queueBtn.classList.add('is-active');
  refs.watchedBtn.classList.remove('is-active');
  clearMoviesList();
  hidePaginationContainer();
  hidePaginationContainerOnSearch();
  onQueueCheck();
}

function onWatchedCheck() {
  // сообщение список фильмов пуст
  if (refs.savedWatched.length === 0) {
    Notify.failure('Sorry, your list is empty');
    return;
  }
  watchedForMarkup();
}

function onQueueCheck() {
  // сообщение список фильмов пуст
  if (refs.savedQueue.length === 0) {
    Notify.failure('Sorry, your list is empty');
    return;
  }
  queuedForMarkup();
}

async function watchedForMarkup() {
  // перебираем массив ID фильмов и получаем объекты фильмов с API
  arrayForMarkup = [];
  for (const watchedID of refs.savedWatched) {
    const movieData = await getMovieById(watchedID);

    // добавляем фильмы в объект, из которого будем строить разметку
    arrayForMarkup.push(movieData);
  }

  console.log('массив с обьектами-фильмами', arrayForMarkup);
  // строит разметку
  refs.moviesList.innerHTML = moviesTemplate(arrayForMarkup);
}

async function queuedForMarkup() {
  // перебираем массив ID фильмов и получаем объекты фильмов с API
  arrayForMarkup = [];
  for (const movieID of refs.savedQueue) {
    const movieData = await getMovieById(movieID);

    // добавляем фильмы в объект, из которого будем строить разметку
    arrayForMarkup.push(movieData);
  }
  console.log('массив с обьектами-фильмами', arrayForMarkup);
  // строит разметку
  refs.moviesList.innerHTML = moviesTemplate(arrayForMarkup);
}

export { onQueueBtnCLick, onWatchedBtnCLick };
