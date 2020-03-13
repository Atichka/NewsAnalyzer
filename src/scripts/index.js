import '../pages/index.css';

// const form = document.querySelector('.search__search-field');
const buttonSend = document.querySelector('.search__button');
const error = document.querySelector('.seach__error');
const inputSend = document.querySelector('.search__input');

buttonSend.addEventListener('click', sendForm);

function sendForm(event) {
  event.preventDefault();

  if (inputSend.value==='') {
    error.textContent = "Это обязательное поле";
  }
  else {error.textContent = "";}
}
