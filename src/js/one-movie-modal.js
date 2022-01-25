import modalTemplate from '../templates/modal-oneMoovie.hbs';
import localStorageApi from './localStorageApi';

const axios = require('axios');
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const ID_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';

const refs = {
  moviesGallery: document.querySelector('.movies-gallery'),
  movieContainer: document.querySelector('.modal-movie-template'),
  backdropMovie: document.querySelector('.movie__backdrop'),
  closeMovieModalBtn: document.querySelector('[data-action="close-modal__movie"]'),
};

refs.moviesGallery.addEventListener('click', clickOnMovie);
refs.closeMovieModalBtn.addEventListener('click', onCloseMovieModal);
refs.backdropMovie.addEventListener('click', onBackdropMovieClick);

const watched = [];
const queued = [];

const movieData = [];

function addArrayToLocalStorage() {
  if (!localStorageApi.load('watched')) {
    localStorage.setItem('watched', JSON.stringify(watched));
  }
  if (!localStorageApi.load('queued')) {
    localStorage.setItem('queued', JSON.stringify(queued));
  }
}

function clickOnMovie(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'H3') {
    return;
  }

  const movieID = event.target.dataset.id;

  try {
    makeOneMovieModal(movieID);
  } catch (error) {
    console.error('Smt gone wrong', error);
  }

}

async function makeOneMovieModal(id) {
  const movieData = await getMovieById(id);
  renderOneMovieModal(movieData);
}

function renderOneMovieModal(data) {
  const modalMarkup = modalTemplate(data);
  refs.movieContainer.innerHTML = modalMarkup;
  refs.backdropMovie.classList.remove('is-hidden');
  disableBodyScroll(refs.movieContainer);
  window.addEventListener('keydown', escKeyPress);
  initStorageBtns();
}

async function getMovieById(id) {
    try {
    const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
    movieData.push(data);
    return data;
  } catch (error) {
    console.error('Smth wrong with api ID fetch' + error);
  }
}

function onCloseMovieModal() {
  window.removeEventListener('keydown', escKeyPress);
  refs.backdropMovie.classList.add('is-hidden');
  movieData.pop();
  enableBodyScroll(refs.movieContainer);
}

function onBackdropMovieClick(event) {
  if (event.currentTarget === event.target) {
    onCloseMovieModal();
  }
}

function escKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseMovieModal();
  }
}

//робота з кнобками бібліотеки
function initStorageBtns() {
  const storageEl = document.querySelectorAll('.add-to-library');
  const movieId = document.querySelector('.modal-img').dataset.id;

  addArrayToLocalStorage();
  checkStorage(storageEl);

  storageEl.forEach(element => element.addEventListener('click', onStorageBtnClick));

  function onStorageBtnClick(e) {
    const storageKey = e.target.dataset.action;

    if (e.target.classList.contains('active')) {
      localStorageApi.removeMovie(storageKey, movieId);
      e.target.classList.toggle('active');
      return;
    }

    if (!e.target.classList.contains('active')) {
      localStorageApi.addMovie(storageKey, ...movieData);
      e.target.classList.toggle('active');
      return;
    }
  }

  //перевіряє чи є фільм в списках
  function checkStorage(storageEl) {
    storageEl.forEach(element => {
      const storageKey = element.dataset.action;

      const arr = localStorageApi.load(storageKey);
      const movieToFind = arr.find(({ id }) => id === movieId);
      if (movieToFind) {
        console.log(movieToFind);
        element.classList.add('active');
      }
    });
  }
}
export { getMovieById };
