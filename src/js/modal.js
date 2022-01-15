const refs = {
  openModal: document.querySelector('[data-action="open-modal-team"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.js-backdrop'),
  backdropTeam: document.querySelector('[data-action="backdrop-team"]'),
};

refs.openModal.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal(event) {
  event.preventDefault();  
  window.addEventListener('keydown', onEscKeyPress);
  refs.backdropTeam.classList.add('show-modal');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('show-modal');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {

    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}