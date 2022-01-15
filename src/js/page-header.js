import { doc } from 'prettier';

const refs = {
  headerRef: document.querySelector('header'),
  logoRef: document.querySelector('#logo'),
  homeRef: document.querySelector('#home'),
  libraryRef: document.querySelector('#library')
};
refs.logoRef.addEventListener('click', toHome);
refs.homeRef.addEventListener('click', toHome);
refs.libraryRef.addEventListener('click', toLibrary);

function toHome() {
  refs.paginatorElRef.classList.remove('is-hidden-pagination');

  const lib = refs.headerRef.classList.contains('page-my-library');
  const det = refs.headerRef.classList.contains('page-details');

  if (lib) {
    refs.headerRef.classList.remove('page-my-library');
    refs.libraryRef.classList.remove('is-active');
  }

  if (det) {
    refs.headerRef.classList.remove('page-details');
  }

  refs.homeRef.classList.add('is-active');
}

function toLibrary() {
  refs.paginatorElRef.classList.add('is-hidden-pagination');

  const det = refs.headerRef.classList.contains('page-details');

  if (det) {
    refs.headerRef.classList.remove('page-details');
  }

  refs.homeRef.classList.remove('is-active');
  refs.headerRef.classList.add('page-my-library');
  refs.libraryRef.classList.add('is-active');

  refs.filmContainer.innerHTML = '';

  
}

function toDetails() {
  const lib = refs.headerRef.classList.contains('page-my-library');

  if (lib) {
    refs.headerRef.classList.remove('page-my-library');
    refs.libraryRef.classList.remove('is-active');
  }

  refs.homeRef.classList.remove('is-active');
  refs.headerRef.classList.add('page-details');
}


