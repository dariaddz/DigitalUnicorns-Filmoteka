const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const refs = {
  openModal: document.querySelector('[data-action="open-modal-team"]'),
  backdropTeam: document.querySelector('[data-action="backdrop-team"]'),
  modalTeam: document.querySelector('.team-modal'),
  closeModalBtn: document.querySelector('[data-action="close-modal__team"]'),  
};



refs.openModal.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdropTeam.addEventListener('click', onBackdropClick);



function modalIsOpen() {
  window.addEventListener('keydown', onEscKeyPress);

  disableBodyScroll(refs.modalTeam);
  }

function onOpenModal(event) {
  event.preventDefault();  
  refs.backdropTeam.classList.add('show-modal');
  
  modalIsOpen();
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('show-modal');

  enableBodyScroll(refs.modalTeam);
}

function onBackdropClick(event) {

  if (event.currentTarget === event.target) {
    onCloseModal();
  };

}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}