import refs from './refs';
import modalTemplate from '../templates/modal-oneMoovie.hbs';
import localStorageApi from './localStorageApi';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import ApiService from './api-service';

const apiService = new ApiService();

const movieData = [];

refs.moviesGallery.addEventListener('click', clickOnMovie);
refs.closeMovieModalBtn.addEventListener('click', onCloseMovieModal);
refs.backdropMovie.addEventListener('click', onBackdropMovieClick);

//  викликається при кліку на фільмі в галереї
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

//  відсилає запит на бек, дані з беку передає в ф-ію рендерингу модалки
async function makeOneMovieModal(id) {
  const movieData = await apiService.getMovieById(id);
  // const movieData = await getMovieById(id);
  renderOneMovieModal(movieData);
}

//  рендерить модалку одного фільму, ініціалізує роботу з локалсторидж
function renderOneMovieModal(data) {
  const modalMarkup = modalTemplate(data);
  movieData.push(data);
  refs.movieContainer.innerHTML = modalMarkup;
  refs.backdropMovie.classList.remove('is-hidden');
  disableBodyScroll(refs.movieContainer);
  window.addEventListener('keydown', escKeyPress);
  initStorageBtns();
}

//  закриває модалку
function onCloseMovieModal() {
  window.removeEventListener('keydown', escKeyPress);
  refs.backdropMovie.classList.add('is-hidden');
  movieData.pop();
  enableBodyScroll(refs.movieContainer);
}

//  закриває модалку по кліку на бекдроп
function onBackdropMovieClick(event) {
  if (event.currentTarget === event.target) {
    onCloseMovieModal();
  }
}

//  закриває модалку при нажиманні клавіші Esc
function escKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseMovieModal();
  }
}

//  робота з local storage
const watched = [];
const queued = [];

//  перевіряє чи є дані в local storage
function addArrayToLocalStorage() {
  if (!localStorageApi.load('watched')) {
    localStorage.setItem('watched', JSON.stringify(watched));
  }
  if (!localStorageApi.load('queued')) {
    localStorage.setItem('queued', JSON.stringify(queued));
  }
}

//  додає/видаляє дані фільму в local storage
function initStorageBtns() {
  const storageEl = document.querySelectorAll('.add-to-library');
  const movieId = Number.parseInt(document.querySelector('.modal-img').dataset.id);

  addArrayToLocalStorage();
  checkStorage(storageEl);

  storageEl.forEach(element => element.addEventListener('click', onStorageBtnClick));

  function onStorageBtnClick(e) {
    const storageKey = e.target.dataset.action;

    //  видаляє дані з local storage
    if (e.target.classList.contains('active')) {
      localStorageApi.removeMovie(storageKey, movieId);
      e.target.classList.toggle('active');
      e.target.textContent = (`ADD TO ${e.target.dataset.action.toUpperCase()}`);
      return;
    }

    //  додає дані з local storage
    if (!e.target.classList.contains('active')) {
      localStorageApi.addMovie(storageKey, ...movieData);
      e.target.classList.toggle('active');
      e.target.textContent = (`REMOVE FROM ${e.target.dataset.action.toUpperCase()}`);
      return;
    }
  }

  //перевіряє чи є фільм в local storage
  function checkStorage(storageEl) {
    storageEl.forEach(element => {
      const storageKey = element.dataset.action;

      const arr = localStorageApi.load(storageKey);
      const movieToFind = arr.find(({ id }) => id === movieId);
      if (movieToFind) {
        element.classList.add('active');
        element.textContent = (`REMOVE FROM ${element.dataset.action.toUpperCase()}`);
      }
    });
  }
}

