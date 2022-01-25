import { clearMoviesList } from './search';
import { getMovieById } from './one-movie-modal';
import { Notify } from 'notiflix';
import refs from './refs';

import { hidePaginationContainerOnSearch, hidePaginationContainer } from './search';
// import { changeReleaseGenres, changeReleaseDate } from './api-service';
import libraryMoviesTemplate from '../templates/library-movies-list.hbs';

let arrayForMarkup = [];
let savedWatched = '';
let savedQueue = '';

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
  savedWatched = JSON.parse(localStorage.getItem('watched'));
  if (savedWatched.length === 0) {
    Notify.failure('Sorry, your list is empty');
    return;
  }
  watchedForMarkup();
}

function onQueueCheck() {
  // сообщение список фильмов пуст
  savedQueue = JSON.parse(localStorage.getItem('queued'));
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

  changeReleaseDate(arrayForMarkup);
  console.log('массив с обьектами-фильмами', arrayForMarkup);

  // строит разметку
  refs.moviesList.innerHTML = libraryMoviesTemplate(arrayForMarkup);
}

async function queuedForMarkup() {
  // перебираем массив ID фильмов и получаем объекты фильмов с API
  arrayForMarkup = [];
  for (const movieID of savedQueue) {
    const movieData = await getMovieById(movieID);

    // добавляем фильмы в объект, из которого будем строить разметку
    arrayForMarkup.push(movieData);
  }
  // changeReleaseGenres(arrayForMarkup);
  changeReleaseDate(arrayForMarkup);
  console.log('массив с обьектами-фильмами', arrayForMarkup);
  // строит разметку
  refs.moviesList.innerHTML = libraryMoviesTemplate(arrayForMarkup);
}

// function changeReleaseGenres(arrayForMarkup) {
//   console.log('change release');
//   for (let result of arrayForMarkup) {
//     const genresWord = [];

//     result.genre_ids.forEach(element => {
//       genres.find(({ id, name }) => {
//         if (id === element) {
//           genresWord.push(name);
//         }
//       });
//     });

//     if (genresWord.length > 2 || genresWord.length === 0) {
//       const extraGenres = genresWord.length - 2;
//       genresWord.splice(2, extraGenres, 'Other');
//     }

//     Object.defineProperties(result, {
//       genre_ids: {
//         value: genresWord,
//         writable: true,
//       },
//     });
//   }
// }
function changeReleaseDate(arrayForMarkup) {
  for (let result of arrayForMarkup) {
    if (result.release_date !== '' || result.genres.length >= 1) {
      let newGenre = result.genres.slice(0, 2);
      let newDate = result.release_date.slice(0, 4);
      Object.defineProperties(result, {
        release_date: {
          value: newDate,
          writable: true,
        },
        genres: {
          value: newGenre,
          writable: true,
        },
      });
    } else {
      Object.defineProperties(result, {
        release_date: {
          value: 'Unknown',
          writable: true,
        },
      });
    }
  }
}

export { onQueueBtnCLick, onWatchedBtnCLick };
