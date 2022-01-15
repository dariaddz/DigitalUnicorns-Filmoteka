const refs = {
  spinner: document.querySelector('.loader'),
};

function showSpinner() {
  refs.spinner.classList.remove('is-hidden');
}

function hideSpinner() {
  refs.spinner.classList.add('is-hidden');
}
