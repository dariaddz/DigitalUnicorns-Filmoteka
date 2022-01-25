const refs = {
  // authorization.js
  authForm: document.querySelector('.auth'),
  authModalBackdrop: document.querySelector('.auth-backdrop'),
  authModal: document.querySelector('.auth-modal'),
  signInBtn: document.querySelector('.navigation__autorization'),
  closeAuthModalBtn: document.querySelector('.close-authmodal-btn'),

  // modal.js
  //   openModal: document.querySelector('[data-action="open-modal-team"]'),
  //   backdrop: document.querySelector('.js-backdrop'),
  //   backdropTeam: document.querySelector('[data-action="backdrop-team"]'),
  //   modal: document.querySelectorAll('.modal'),

  // page-header.js
  headerRef: document.querySelector('header'),
  logoRef: document.querySelector('#logo'),
  homeRef: document.querySelector('#home'),
  libraryRef: document.querySelector('#library'),
  libraryBtns: document.querySelectorAll('.library-button'),
  searchForm: document.querySelector('.search'),

  // spinner.js
  spinner: document.querySelector('.loader'),
  // library.js
  queueBtn: document.querySelector('.queue-link'),
  watchedBtn: document.querySelector('.watched-link'),
  moviesList: document.querySelector('.movies-list'),

  paginationContainer: document.querySelector('.tui-pagination'),
};
export default refs;
