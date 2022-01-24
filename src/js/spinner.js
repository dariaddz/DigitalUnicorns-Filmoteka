import refs from './refs';

function showSpinner() {
  refs.spinner.classList.remove('is-hidden');
}

function hideSpinner() {
  refs.spinner.classList.add('is-hidden');
}
