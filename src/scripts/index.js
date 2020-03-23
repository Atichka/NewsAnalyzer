import '../pages/index.css';
import {ApiCard} from "./api/apiCard.js";
import {CardList} from "./modules/cardList.js";
import {card, buttonSend, error, inputSend, cardContainer, searchResult, preloader, notFound, searchError, to, from, main_url, apiKey} from "./constants/constants.js";

const apiCard = new ApiCard(main_url, apiKey);
const cardlist = new CardList(cardContainer, card);

function sendForm(event) {
  localStorage.clear();
  cardlist.clear();
  event.preventDefault();
  searchResult.style = 'display: none;';
  notFound.style = 'display: none;';
  preloader.style = 'display: block;';
  inputSend.disabled = true;
  buttonSend.disabled = true;

  if (validateInput()) {
    apiCard.getCard(from.toISOString(), to.toISOString(), inputSend.value)
    .then(result => {
      checkResults(result.articles);
      sendData(inputSend.value, result);
      console.log(result);
      preloader.style = 'display: none;';
      inputSend.disabled = false;
      buttonSend.disabled = false;
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      preloader.style = 'display: none;';
      searchError.style = 'display: block;';

    })
  } else {
    preloader.style = 'display: none;';
    searchResult.style = 'display: none;';
    inputSend.disabled = false;
    buttonSend.disabled = false;
  }
}

function validateInput() {
  if (inputSend.value === '') {
    error.textContent = "Нужно ввести ключевое слово";
    preloader.style='display: none;';
    return false;
  }
  else {
    error.textContent = '';
    return true;
  }
}

function sendData (word, data) {
  const res = JSON.stringify(data);
  localStorage.clear();
  localStorage.setItem('res', res);
  localStorage.setItem('query', word);
}

if (localStorage.getItem('res') !== null) {
  inputSend.value = localStorage.getItem('query');
  const cardsData = JSON.parse(localStorage.getItem('res'));
  searchResult.style = 'display: block;';
  checkResults(cardsData.articles);
};

function checkResults(result) {
  if(result.length == 0) {
    localStorage.clear();
    notFound.style='display: block;';
    searchResult.style='display: none;';
  } else {
    notFound.style = 'display: none;';
    searchResult.style = 'display: block;';
    cardlist.render(result);
  }
}

buttonSend.addEventListener('click', sendForm);
inputSend.addEventListener('input', validateInput);
