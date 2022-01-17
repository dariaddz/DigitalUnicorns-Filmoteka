const refs = {
  authForm: document.querySelector('.auth'),
};

refs.authForm.addEventListener('submit', onSignInFormSubmit);

function onSignInFormSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  console.log(password);
}
