import modalTemplate from '../templates/modal-oneMoovie.hbs';
const axios = require('axios');

const ID_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '1aaaa4b4eb79ea073919ef453434f2ea';

const refs = {
    moviesGallery: document.querySelector('.movies-gallery'),
    movieContainer: document.querySelector('.modal-movie-template'),
    backdropMovie: document.querySelector('.movie__backdrop'),
};

refs.moviesGallery.addEventListener('click', clickOnMovie);

async function clickOnMovie(event) {
    event.preventDefault();
     
    if (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'H3') {
        return;
    }
    console.log("click on movie")
    
    const movieID = event.target.dataset.id;

    console.log(movieID);

    console.log(`${ID_URL}${movieID}?api_key=${API_KEY}`);
    await  makeOneMovieModal(movieID);

}

async function makeOneMovieModal(id) {

    const movieData = await getMovieById(id);
    renderOneMovieModal(movieData);

}

function renderOneMovieModal(data) {
    const modalMarkup = modalTemplate(data);
    refs.movieContainer.innerHTML = modalMarkup;
      refs.backdropMovie.classList.add('show-modal');
}

async function getMovieById(id) {
    try {
      const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
      console.log(data);
      return data;
    } catch (error) {
      console.error('Smth wrong with api ID fetch' + error);
    }
}



