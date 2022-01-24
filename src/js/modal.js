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


function onOpenModal(event) {
  event.preventDefault();  
  refs.backdropTeam.classList.remove('is-hidden');
  
  window.addEventListener('keydown', onEscKeyPress);

  disableBodyScroll(refs.modalTeam);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdropTeam.classList.add('is-hidden');
  cards.forEach(card => card.classList.remove('show-tasks'));
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

const cards = document.querySelectorAll('.team__item');

function flipCard() {
  
  this.classList.toggle('show-tasks');

}

cards.forEach(card => card.addEventListener('click', flipCard));