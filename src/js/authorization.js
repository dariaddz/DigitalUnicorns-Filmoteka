const refs = {
  authForm: document.querySelector('.auth'),
  authModal: document.querySelector('.auth-backdrop'),
};

refs.authForm.addEventListener('submit', onSignInFormSubmit);

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

function authModalClose() {
  refs.authModal.classList.add('is-hidden');
}
