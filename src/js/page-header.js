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
  

  if (lib) {
    refs.headerRef.classList.remove('page-my-library');
    refs.libraryRef.classList.remove('current');
  }

  refs.homeRef.classList.add('current');
}

function toLibrary() {
  refs.paginatorElRef.classList.add('is-hidden-pagination');

  refs.homeRef.classList.remove('current');
  refs.headerRef.classList.add('page-my-library');
  refs.libraryRef.classList.add('current');

  refs.filmContainer.innerHTML = '';

  
}

function toDetails() {
  const lib = refs.headerRef.classList.contains('page-my-library');

  if (lib) {
    refs.headerRef.classList.remove('page-my-library');
    refs.libraryRef.classList.remove('current');
  }

  refs.homeRef.classList.remove('current');
  
}



