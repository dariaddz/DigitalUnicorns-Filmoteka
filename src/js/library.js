import { clearMoviesList } from './search';
import { getMovieById } from './one-movie-modal';
import { Notify } from 'notiflix';

const savedWatched = JSON.parse(localStorage.getItem('watched'));
const savedQueue = JSON.parse(localStorage.getItem('queued'));
let arrayForMarkup = [];

// клик по кнопкам библиотеки
const watchedBtn = document.querySelector('.watched-link');
watchedBtn.addEventListener('click', onWatchedBtnCLick);

const queueBtn = document.querySelector('.queue-link');
queueBtn.addEventListener('click', onQueueBtnCLick);

function onWatchedBtnCLick() {
  clearMoviesList();
  onWatchedCheck();
}

function onQueueBtnCLick() {
  clearMoviesList();
  onQueueCheck();
}

function onWatchedCheck() {
  // сообщение список фильмов пуст
  if (savedWatched.length === 0) {
    Notify.failure('Sorry, your list is empty');
    return;
  }
  watchedForMarkup();
}

function onQueueCheck() {
  // сообщение список фильмов пуст
  if (savedQueue.length === 0) {
    Notify.failure('Sorry, your list is empty');
    return;
  }
  queuedForMarkup();
}

async function watchedForMarkup() {
  // перебираем массив ID фильмов и получаем объекты фильмов с API
  arrayForMarkup = [];
  for (const watchedID of savedWatched) {
    const movieData = await getMovieById(watchedID);

    // добавляем фильмы в объект, из которого будем строить разметку
    arrayForMarkup.push(movieData);
  }
  console.log('массив с обьектами-фильмами', arrayForMarkup);
}

async function queuedForMarkup() {
  // перебираем массив ID фильмов и получаем объекты фильмов с API
  arrayForMarkup = [];
  for (const movieID of savedQueue) {
    const movieData = await getMovieById(movieID);

    // добавляем фильмы в объект, из которого будем строить разметку
    arrayForMarkup.push(movieData);
  }
  console.log('массив с обьектами-фильмами', arrayForMarkup);
}

export { getMovieById };
