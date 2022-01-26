import refs from './refs';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';


refs.openModal.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdropTeam.addEventListener('click', onBackdropClick);

//  відкриває модалку
function onOpenModal(event) {
  event.preventDefault();  
  refs.backdropTeam.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  disableBodyScroll(refs.modalTeam);
}

//  закриває модалку
function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdropTeam.classList.add('is-hidden');
  refs.cards.forEach(card => card.classList.remove('show-tasks'));
  enableBodyScroll(refs.modalTeam);
}

//  закрипає модалку при кліку по бекдропу
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  };
}

//  закриває модалку по нажиманні клавіші Esc
function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

//  показує/ховає оверфлоу(виконана робота) при кліку на картку члена команди
function flipCard(event) {

  if (event.target.nodeName === 'svg') {
    return
  }
  this.classList.toggle('show-tasks');
}

refs.cards.forEach(card => card.addEventListener('click', flipCard));