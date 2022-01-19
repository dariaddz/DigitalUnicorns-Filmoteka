const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

const refs = {
  openModal: document.querySelector('[data-action="open-modal-team"]'),
  backdrop: document.querySelector('.js-backdrop'),
  backdropTeam: document.querySelector('[data-action="backdrop-team"]'),
  modal: document.querySelectorAll('.modal'),
};



refs.openModal.addEventListener('click', onOpenModal);

refs.backdrop.addEventListener('click', onBackdropClick);



function modalIsOpen() {
  window.addEventListener('keydown', onEscKeyPress);

  disableBodyScroll(refs.modal);
  }

function onOpenModal(event) {
  event.preventDefault();  
  refs.backdropTeam.classList.add('show-modal');
  
  modalIsOpen();
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.remove('show-modal');

  enableBodyScroll(refs.modal);
}

function onBackdropClick(event) {

  const isCloseBtn = event.target.classList.contains('close-modal__btn');
  const isCloseIcon = event.target.classList.contains('icon-close');

  if ((event.currentTarget === event.target) || (isCloseIcon || isCloseBtn)) {

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