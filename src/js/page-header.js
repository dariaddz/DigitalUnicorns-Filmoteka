import { onQueueBtnCLick } from './library';
const refs = {
  headerRef: document.querySelector('header'),
  logoRef: document.querySelector('#logo'),
  homeRef: document.querySelector('#home'),
  libraryRef: document.querySelector('#library'),

  // кнопки library
  libraryBtns: document.querySelectorAll('.library-button'),
  // div поиска
  searchForm: document.querySelector('.search'),
};

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
  // даша добавила функцию
  libraryBtnsHide();
  searchFormShow();
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
  // даша добавила функцию
  libraryBtnsShow();
  searchFormHide();
  onQueueBtnCLick();
}

function toDetails() {
  const lib = refs.headerRef.classList.contains('page-my-library');

  if (lib) {
    refs.headerRef.classList.remove('page-my-library');
    refs.libraryRef.classList.remove('current');
  }

  refs.homeRef.classList.remove('current');
  refs.headerRef.classList.add('page-details');
}
export default function isResults() {
  const w = JSON.parse(localStorage.getItem('watched'));
  const q = JSON.parse(localStorage.getItem('queue'));

  if (w === null || w.length === 0) {
    refs.noResults.classList.add('visible');
  } else {
    refs.noResults.classList.remove('visible');
  }

  if (q === null || q.length === 0) {
    refs.noResults.classList.add('visible');
  } else {
    refs.noResults.classList.remove('visible');
  }
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
  refs.searchForm.classList.add('is-hidden');
}

function searchFormShow() {
  refs.searchForm.classList.remove('is-hidden');
}
