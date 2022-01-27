const refs = {
  // authorization.js
  authForm: document.querySelector('.auth'),
  authModalBackdrop: document.querySelector('.auth-backdrop'),
  authModal: document.querySelector('.auth-modal'),
  signInBtn: document.querySelector('.navigation__autorization'),
  closeAuthModalBtn: document.querySelector('.close-authmodal-btn'),
  // team-modal.js
  openModal: document.querySelector('[data-action="open-modal-team"]'),
  backdropTeam: document.querySelector('[data-action="backdrop-team"]'),
  modalTeam: document.querySelector('.team-modal'),
  closeModalBtn: document.querySelector('[data-action="close-modal__team"]'),
  cards: document.querySelectorAll('.team__item'),
  // page-header.js
  headerRef: document.querySelector('header'),
  logoRef: document.querySelector('#logo'),
  homeRef: document.querySelector('#home'),
  libraryRef: document.querySelector('#library'),
  libraryBtns: document.querySelectorAll('.library-button'),
  searchFormDiv: document.querySelector('.search'),
  // spinner.js
  spinner: document.querySelector('.loader'),
  // library.js
  queueBtn: document.querySelector('.queue-link'),
  watchedBtn: document.querySelector('.watched-link'),
  moviesList: document.querySelector('.movies-list'),
  // rendering.js
  paginationContainer: document.querySelector('.tui-pagination'),
  // one-movie-modal.js
  moviesGallery: document.querySelector('.movies-gallery'),
  movieContainer: document.querySelector('.modal-movie-template'),
  backdropMovie: document.querySelector('.movie__backdrop'),
  closeMovieModalBtn: document.querySelector('[data-action="close-modal__movie"]'),

  searchForm: document.querySelector('.search__form'),
};
export default refs;
