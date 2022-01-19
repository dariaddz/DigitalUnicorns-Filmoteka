import moviesTemplate from '../templates/film-template.hbs';
const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';
const BASE_URL = 'https://api.themoviedb.org/3/';
const axios = require('axios');

const dataDiv = document.querySelector('.movies-list');

const Watched = [];

const Queued = [];

async function fetchMovies() {
  const response = await fetch(`${BASE_URL}trending/all/day?api_key=${API_KEY}`);
  const data = await response.json();
  console.log(data.results);
  dataDiv.insertAdjacentHTML('afterbegin', moviesTemplate(data.results));

  // getClickedElem()
  getButtonWatched();
  getButtonQueued();
  return data;
}

function addArrayToLocalStorage(array) {
  localStorage.setItem('Watched', JSON.stringify(array));
  localStorage.setItem('Queued', JSON.stringify(array));
}
// fetchMovies(550)

addArrayToLocalStorage([]);

function addToWatched(e) {
  fetchMovies(550).then(data => {
    data.results.forEach(element => {
      if (+e.srcelementent.parentElement.attributes.value.value === element.id) {
        try {
          const savedData = localStorage.getItem('Watched');
          const parsedData = JSON.parse(savedData);

          parsedData.push(element);
          localStorage.setItem('Watched', JSON.stringify(parsedData));
          console.log(element, parsedData);
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
}

function addToQueued(e) {
  fetchMovies(550).then(data => {
    data.results.forEach(element => {
      if (+e.srcelementent.parentElement.attributes.value.value === element.id) {
        try {
          const savedData = localStorage.getItem('Queued');
          const parsedData = JSON.parse(savedData);

          parsedData.push(element);
          localStorage.setItem('Queued', JSON.stringify(parsedData));
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
}

function getButtonWatched() {
  const buttonWatched = document.querySelectorAll('.watched-link');
  buttonWatched.forEach(element => element.addEventListener('click', addToWatched));
}
function getButtonQueued() {
  const buttonQueued = document.querySelectorAll('queue-link');
  buttonQueued.forEach(element => element.addEventListener('click', addToQueued));
}

// export default function (data) {
//   const addToWatched = document.querySelector('.modal__watch-list')
//   const addToQueue = document.querySelector('.modal__queue-list')

//   let watchedList = JSON.parse(localStorage.getItem(`watchedList`)) || []
//   let queueList = JSON.parse(localStorage.getItem(`queueList`)) || []

//   let indexOfElWatched = 0
//   let indexOfElQueue = 0

//   function checkButton() {
//     watchedList.forEach((element, i) => {
//       if (element.id === data.id) {
//         addToWatched.textContent = 'REMOVE FROM WATCHED'
//         indexOfElWatched = i
//       }
//     })

//     queueList.forEach((element, i) => {
//       if (element.id === data.id) {
//         addToQueue.textContent = 'REMOVE FROM QUEUE'
//         indexOfElQueue = i
//     }
//     })
//   }

//   checkButton()
//   chekBtnStatus()
//   function addToLocalStorageWatched() {
//     if (addToWatched.textContent === 'REMOVE FROM WATCHED') {
//       watchedList.splice(indexOfElWatched, 1)
//       localStorage.setItem(`watchedList`, JSON.stringify(watchedList))
//       addToWatched.textContent = 'ADD TO WATCHED'

//       // setTimeout(e => {
//       //   notifications.removeFromWatched()
//       // }, 1000)
//       checkButton()
//       chekBtnStatus()
//     } else
//       if (addToQueue.textContent === 'ADD TO QUEUE') {
//         watchedList.push(data)
//         let watchedStr = JSON.stringify(watchedList)
//         localStorage.setItem(`watchedList`, watchedStr)

//         setTimeout(e => {
//           notifications.addToWatched()
//         }, 500)

//         checkButton()
//         chekBtnStatus()
//       } else {
//         // setTimeout(e => {
//         //   notifications.alreadyInQueued()
//         // }, 1000)

//       }
//       reloadLibraryPage()
//      }

//   function addToLocalStorageQueue() {
//     if (addToQueue.textContent === 'REMOVE FROM QUEUE') {

//       queueList.splice(indexOfElQueue, 1)
//       localStorage.setItem(`queueList`, JSON.stringify(queueList))
//       addToQueue.textContent = 'ADD TO QUEUE'

//       // setTimeout(e => {
//       //   notifications.removeFromQueue()
//       // }, 1000)

//       checkButton()
//     chekBtnStatus()
//     } else
//       if (addToWatched.textContent === 'ADD TO WATCHED') {
//         queueList.push(data)
//         let queueStr = JSON.stringify(queueList)
//         localStorage.setItem(`queueList`, queueStr)
//         setTimeout(e => {
//           notifications.addToQueue()
//         }, 500)

//       checkButton()
//       chekBtnStatus()
//       }
//       else {

//         // setTimeout(e => {
//         //   notifications.alreadyInWatched()
//         // }, 1000)

//       }
//       reloadLibraryPage()
//      }

//   function chekBtnStatus() {
//     if ((addToQueue.textContent === 'ADD TO QUEUE') && (addToWatched.textContent === 'REMOVE FROM WATCHED')) {
//       addToQueue.setAttribute('disabled', true)
//       addToQueue.style.cursor = 'not-allowed'
//       addToQueue.classList.remove('modal__queue-list')
//       addToQueue.classList.add('disabled')
//     } else {
//       addToQueue.removeAttribute('disabled', false)
//       addToQueue.style.cursor = 'pointer'
//        addToQueue.classList.remove('disabled')
//       addToQueue.classList.add('modal__queue-list')
//     }
//     if ((addToWatched.textContent === 'ADD TO WATCHED') && (addToQueue.textContent === 'REMOVE FROM QUEUE')) {
//       addToWatched.setAttribute('disabled', true)
//       addToWatched.style.cursor = 'not-allowed'
//        addToWatched.classList.remove('modal__watch-list')
//       addToWatched.classList.add('disabled')
//     } else {
//       addToWatched.removeAttribute('disabled', false)
//       addToWatched.style.cursor = 'pointer'
//        addToWatched.classList.remove('disabled')
//       addToWatched.classList.add('modal__watch-list')
//     }
//   }

//   addToWatched.addEventListener(`click`, addToLocalStorageWatched)
//   addToQueue.addEventListener('click', addToLocalStorageQueue)

//   }
