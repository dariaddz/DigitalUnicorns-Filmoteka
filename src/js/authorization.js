// const refs = {
//   authForm: document.querySelector('.auth'),
//   authModalBackdrop: document.querySelector('.auth-backdrop'),
//   authModal: document.querySelector('.auth-modal'),
//   signInBtn: document.querySelector('.navigation__autorization'),
//   closeAuthModalBtn: document.querySelector('.close-authmodal-btn'),
// };
import refs from './refs';

const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

refs.signInBtn.addEventListener('click', authModalOpen);
refs.authForm.addEventListener('submit', onSignInFormSubmit);
refs.authModalBackdrop.addEventListener('click', onBackdropClick);
refs.closeAuthModalBtn.addEventListener('click', authModalClose);

// проверка логина-пароля пользователя

// данные тестового юзера
// email: films@gmail.com
// password: 123456

function onSignInFormSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  authWithEmailAndPassword(email, password);
}

function authWithEmailAndPassword(email, password) {
  const authApiKey = 'AIzaSyADpY9hGz0v8th_2uF9-KsxlvvtIwPwaic';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${authApiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(data => console.log(data))
    .then(authModalClose);
}

// открытие-закрытие модалки-авторизации

function authModalOpen(event) {
  event.preventDefault();
  refs.authModalBackdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  disableBodyScroll(refs.authModal);
}

function authModalClose() {
  refs.authModalBackdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
  enableBodyScroll(refs.authModal);
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    authModalClose();
  }
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    authModalClose();
  }
}
// function onCloseBtnClick() {
//   authModalClose();
// }
