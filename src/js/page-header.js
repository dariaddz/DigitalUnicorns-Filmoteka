
import refs from './refs';
import markupMovies from './renderMarkup';
import getTrendingMovies from './api-service';


refs.logoRef.addEventListener('click', toHome);
refs.homeRef.addEventListener('click', toHome);
refs.libraryRef.addEventListener('click', toLibrary);


function toHome(e) {
 e.preventDefault()
 
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
}

function toLibrary(e) {
  e.preventDefault()
  
  const det = refs.headerRef.classList.contains('page-details');

  if (det) {
    refs.headerRef.classList.remove('page-details');
  }

  refs.homeRef.classList.remove('current');
  refs.headerRef.classList.add('page-my-library');
  refs.libraryRef.classList.add('current');

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

  if (w === null || w.length === 0 ) {
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
