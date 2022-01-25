import refs from './refs';

export function showSpinner() {
  refs.spinner.classList.remove('is-hidden');
}

export function hideSpinner() {
  refs.spinner.classList.add('is-hidden');
}
